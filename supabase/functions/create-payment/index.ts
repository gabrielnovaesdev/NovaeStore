import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders, buildCorsResponse } from '../_shared/cors.ts'
import { isValidEmail } from '../_shared/validation.ts'
import { createPixCharge } from '../_shared/pushinpay.ts'
import { getSupabaseAdmin } from '../_shared/supabase.ts'

const rateLimitCache = new Map<string, { count: number, resetAt: number }>();

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Rate Limit & Bot Protection (Max 5 requests per minute per IP)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'unknown_ip';
    const now = Date.now();
    const record = rateLimitCache.get(ip);
    
    if (record && now < record.resetAt) {
      if (record.count >= 5) {
        console.warn(`Rate limit exceeded for IP: ${ip}`);
        return buildCorsResponse({ error: 'RATE_LIMIT_EXCEEDED', message: 'Muitas requisições. Tente novamente em 1 minuto.' }, 429)
      }
      record.count++;
    } else {
      rateLimitCache.set(ip, { count: 1, resetAt: now + 60000 });
    }

    // Cleanup very large maps periodically to prevent memory leaks in the edge node
    if (rateLimitCache.size > 1000) {
      for (const [key, value] of rateLimitCache.entries()) {
        if (now > value.resetAt) rateLimitCache.delete(key);
      }
    }
    const { email, product_id } = await req.json()

    // Validation
    if (!isValidEmail(email)) {
      return buildCorsResponse({ error: 'INVALID_EMAIL', message: 'E-mail inválido.' }, 400)
    }

    if (!product_id) {
      return buildCorsResponse({ error: 'INVALID_PRODUCT', message: 'ID do produto não fornecido.' }, 400)
    }

    const supabaseAdmin = getSupabaseAdmin()

    // Fetch product
    const { data: product, error: productError } = await supabaseAdmin
      .from('products')
      .select('*')
      .eq('id', product_id)
      .single()

    if (productError || !product) {
      return buildCorsResponse({ error: 'PRODUCT_NOT_FOUND', message: 'Produto não encontrado.' }, 404)
    }

    if (!product.active) {
      return buildCorsResponse({ error: 'PRODUCT_INACTIVE', message: 'Produto indisponível.' }, 400)
    }

    // Determine webhook URL based on environment or request origin
    // For development, you may need a tunnel (like ngrok) to receive webhooks
    const webhookUrl = Deno.env.get('WEBHOOK_URL') || `https://${Deno.env.get('SUPABASE_REFERENCE_ID')}.supabase.co/functions/v1/pushinpay-webhook`

    // Create PIX charge using product price
    let charge;
    try {
      charge = await createPixCharge(product.price_cents, webhookUrl)
    } catch (e: any) {
      console.error('PushinPay Error:', e)
      return buildCorsResponse({ error: 'PAYMENT_CREATION_FAILED', message: 'Erro ao gerar pagamento.' }, 500)
    }

    // Save order
    const { error: insertError } = await supabaseAdmin
      .from('orders')
      .insert({
        charge_id: charge.id,
        email: email,
        product_id: product.id,
        amount_cents: product.price_cents,
        status: 'pending'
      })

    if (insertError) {
      console.error('Order Insert Error:', insertError)
      return buildCorsResponse({ error: 'INTERNAL_ERROR', message: 'Erro interno ao salvar pedido.' }, 500)
    }

    return buildCorsResponse({
      charge_id: charge.id,
      qr_code_image: charge.qr_code_base64,
      pix_copy_paste: charge.qr_code,
      product_id: product.id,
      amount_cents: product.price_cents
    })

  } catch (error) {
    console.error('Create Payment Error:', error)
    return buildCorsResponse({ error: 'INTERNAL_ERROR', message: 'Erro interno.' }, 500)
  }
})
