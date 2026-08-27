import { CreatePaymentResponse, PaymentStatusResponse } from '../types';

/**
 * SERVIÇOS DE API DA NOVAESTORE
 * 
 * Chamadas reais para as Edge Functions do Supabase.
 */

// Puxa a URL do Supabase configurada no .env do Vite
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

if (!SUPABASE_URL) {
  console.warn("VITE_SUPABASE_URL não configurada no .env!");
}

const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;

export const createPayment = async (
  email: string,
  target: { id?: string; name?: string; price?: number } | { items: { id: string; name: string; price: number; quantity: number }[]; totalAmount: number } | string,
  optionalPrice?: number
): Promise<CreatePaymentResponse> => {
  let productId = 'single_item';

  if (typeof target === 'string') {
    productId = target;
  } else if ('items' in target && Array.isArray(target.items)) {
    // A integração real no momento foi construída para produtos únicos.
    // Futuro: Expandir para checkout de carrinho.
    productId = 'cart'; 
  } else if ('name' in target && target.name) {
    productId = target.id || 'single_item';
  }

  const response = await fetch(`${FUNCTIONS_URL}/create-payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      product_id: productId
    })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao criar pagamento.');
  }

  return {
    charge_id: data.charge_id,
    qr_code_image: data.qr_code_image || `data:image/png;base64,${data.qr_code_base64}`,
    pix_copy_paste: data.pix_copy_paste,
    product_id: data.product_id,
    total_amount: data.amount_cents / 100, // Converte centavos para reais
    items_count: 1,
    item_names: ['Produto'],
  };
};

export const getPaymentStatus = async (chargeId: string): Promise<PaymentStatusResponse> => {
  const response = await fetch(`${FUNCTIONS_URL}/payment-status?charge_id=${chargeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao consultar status do pagamento.');
  }

  return {
    status: data.status
  };
};

export const getDelivery = async (chargeId: string): Promise<{ delivery_url: string; product_name: string }> => {
  const response = await fetch(`${FUNCTIONS_URL}/get-delivery`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ charge_id: chargeId })
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Erro ao obter entrega.');
  }

  return {
    delivery_url: data.delivery_url,
    product_name: data.product_name
  };
};

// Mantido apenas para não quebrar componentes que possam importar, mas não tem efeito real no backend
export const forceApprovePayment = (chargeId: string): void => {
  console.log('Force approve desabilitado no ambiente de produção.');
};
