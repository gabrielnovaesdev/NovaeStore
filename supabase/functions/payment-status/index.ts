import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders, buildCorsResponse } from '../_shared/cors.ts'
import { getSupabaseAdmin } from '../_shared/supabase.ts'

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const charge_id = url.searchParams.get('charge_id')

    if (!charge_id) {
      return buildCorsResponse({ error: 'INVALID_REQUEST', message: 'charge_id é obrigatório.' }, 400)
    }

    const supabaseAdmin = getSupabaseAdmin()

    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .select('status')
      .eq('charge_id', charge_id)
      .single()

    if (error || !order) {
      return buildCorsResponse({ error: 'PAYMENT_NOT_FOUND', message: 'Pedido não encontrado.' }, 404)
    }

    return buildCorsResponse({ status: order.status })

  } catch (error) {
    console.error('Payment Status Error:', error)
    return buildCorsResponse({ error: 'INTERNAL_ERROR', message: 'Erro interno.' }, 500)
  }
})
