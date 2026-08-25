import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders, buildCorsResponse } from '../_shared/cors.ts'
import { getSupabaseAdmin } from '../_shared/supabase.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { charge_id } = await req.json()

    if (!charge_id) {
      return buildCorsResponse({ error: 'INVALID_REQUEST', message: 'charge_id é obrigatório.' }, 400)
    }

    const supabaseAdmin = getSupabaseAdmin()

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .select('status, product_id, products ( name, delivery_url )')
      .eq('charge_id', charge_id)
      .single()

    if (orderError || !order) {
      return buildCorsResponse({ error: 'PAYMENT_NOT_FOUND', message: 'Pedido não encontrado.' }, 404)
    }

    if (order.status !== 'paid') {
      return buildCorsResponse({ error: 'FORBIDDEN', message: 'Pagamento ainda não confirmado.' }, 403)
    }

    const product = Array.isArray(order.products) ? order.products[0] : order.products;
    
    if (!product) {
       return buildCorsResponse({ error: 'PRODUCT_NOT_FOUND', message: 'Produto vinculado ao pedido não encontrado.' }, 404)
    }

    return buildCorsResponse({
      status: 'paid',
      product_id: order.product_id,
      product_name: product.name,
      delivery_url: product.delivery_url
    })

  } catch (error) {
    console.error('Get Delivery Error:', error)
    return buildCorsResponse({ error: 'INTERNAL_ERROR', message: 'Erro interno.' }, 500)
  }
})
