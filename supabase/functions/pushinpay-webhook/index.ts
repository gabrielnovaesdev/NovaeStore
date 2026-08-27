import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { getSupabaseAdmin } from '../_shared/supabase.ts'
import { timingSafeEqual } from 'https://deno.land/std@0.168.0/crypto/timing_safe_equal.ts'

// Função para comparação segura (previne timing attacks)
function secureCompare(a: string, b: string): boolean {
  const encoder = new TextEncoder();
  const aBuffer = encoder.encode(a);
  const bBuffer = encoder.encode(b);
  
  // Impede comparação de tempos caso a string não tenha nem o mesmo tamanho
  if (aBuffer.byteLength !== bBuffer.byteLength) {
    return false;
  }
  
  return timingSafeEqual(aBuffer, bBuffer);
}

serve(async (req) => {
  try {
    const rawBody = await req.text() // Precisamos do corpo cru (string) para validar a assinatura
    
    // Verifica se está em modo Demo (sem token configurado)
    const pushinPayToken = Deno.env.get('PUSHINPAY_TOKEN')
    const isDemoMode = !pushinPayToken || pushinPayToken.trim() === ''

    if (isDemoMode) {
      console.log('Modo Demo Ativo: Validação de assinatura ignorada (PUSHINPAY_TOKEN ausente).')
    } else {
      // Integração Real - Validação Rigorosa por Header Customizado
      const headerName = Deno.env.get('PUSHINPAY_WEBHOOK_HEADER_NAME') || 'x-webhook-secret'
      const receivedSecret = req.headers.get(headerName)
      const webhookSecret = Deno.env.get('PUSHINPAY_WEBHOOK_SECRET')

      if (!webhookSecret) {
        console.error('WEBHOOK_SECRET não configurado nas variáveis de ambiente do Supabase.')
        return new Response(JSON.stringify({ error: 'SERVER_MISCONFIGURED' }), { status: 500 })
      }

      if (!receivedSecret) {
        console.error(`Tentativa de acesso não autorizado: Header customizado '${headerName}' ausente.`)
        return new Response(JSON.stringify({ error: 'UNAUTHORIZED' }), { status: 401 })
      }

      const isValid = secureCompare(receivedSecret, webhookSecret)
      
      if (!isValid) {
        console.error('Segredo inválido! Possível tentativa de fraude.')
        return new Response(JSON.stringify({ error: 'UNAUTHORIZED' }), { status: 401 })
      }
    }

    const payload = JSON.parse(rawBody)
    console.log('Webhook received:', payload)

    const charge_id = payload.id
    const status = payload.status
    const value = parseInt(payload.value, 10)

    if (!charge_id || !status) {
      return new Response(JSON.stringify({ error: 'WEBHOOK_INVALID' }), { status: 400 })
    }

    const supabaseAdmin = getSupabaseAdmin()

    // 1. Log event
    await supabaseAdmin.from('payment_events').insert({
      charge_id,
      event_type: 'webhook_received',
      payload
    })

    // 2. Process webhook only if status is paid
    if (status === 'paid') {
      const { data: order, error: orderError } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('charge_id', charge_id)
        .single()

      if (orderError || !order) {
        console.error('Order not found for charge:', charge_id)
        return new Response('Order not found', { status: 404 })
      }

      // Check idempotency
      if (order.status === 'paid') {
        console.log('Order already paid:', charge_id)
        return new Response('Already paid', { status: 200 })
      }

      // Validate value
      if (value !== order.amount_cents) {
        console.error(`Value mismatch for charge ${charge_id}. Expected ${order.amount_cents}, got ${value}`)
        return new Response('Value mismatch', { status: 400 })
      }

      // Update order status
      const { error: updateError } = await supabaseAdmin
        .from('orders')
        .update({ status: 'paid', paid_at: new Date().toISOString() })
        .eq('charge_id', charge_id)

      if (updateError) {
        console.error('Failed to update order status:', updateError)
        return new Response('Internal error', { status: 500 })
      }

      // Update payment_events processed_at
      await supabaseAdmin.from('payment_events')
        .update({ processed_at: new Date().toISOString() })
        .eq('charge_id', charge_id)
        .eq('event_type', 'webhook_received')
        .is('processed_at', null)
    }

    return new Response('OK', { status: 200 })

  } catch (error) {
    console.error('Webhook Error:', error)
    return new Response('Internal error', { status: 500 })
  }
})
