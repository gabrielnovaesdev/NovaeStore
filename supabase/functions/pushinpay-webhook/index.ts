import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { getSupabaseAdmin } from '../_shared/supabase.ts'

serve(async (req) => {
  // PushinPay webhook does not need CORS as it is called server-to-server
  try {
    const signature = req.headers.get('x-pushinpay-signature')
    // TODO: Verify signature if PushinPay provides a secret for it.
    // For now, we process the payload if it's well-formed.

    const payload = await req.json()
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
