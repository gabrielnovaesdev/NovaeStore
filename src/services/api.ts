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
  return new Promise((resolve) => {
    setTimeout(() => {
      let productId = 'single_item';
      let amount = 0;
      let itemsCount = 1;
      let itemNames = ['Produto'];

      if (typeof target === 'string') {
        productId = target;
        amount = optionalPrice || 99.90;
      } else if ('items' in target && Array.isArray(target.items)) {
        productId = 'cart';
        amount = target.totalAmount;
        itemsCount = target.items.length;
        itemNames = target.items.map(i => i.name);
      } else if ('name' in target && target.name) {
        productId = target.id || 'single_item';
        amount = target.price || 99.90;
        itemNames = [target.name];
      }

      resolve({
        charge_id: `ch_${Math.random().toString(36).substr(2, 9)}`,
        qr_code_image: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426655440000520400005303986540510.005802BR5913NovaeStore BR6009Sao Paulo62070503***6304A1B2',
        pix_copy_paste: '00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426655440000520400005303986540510.005802BR5913NovaeStore BR6009Sao Paulo62070503***6304A1B2',
        product_id: productId,
        total_amount: amount,
        items_count: itemsCount,
        item_names: itemNames,
      });
    }, 1500);
  });
};

export const getPaymentStatus = async (chargeId: string): Promise<PaymentStatusResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Retorna 'pending' indefinidamente no mock, forçando o uso do botão "Aprovar agora"
      resolve({ status: 'pending' });
    }, 800);
  });
};

export const getDelivery = async (chargeId: string): Promise<{ delivery_url: string; product_name: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        delivery_url: 'https://google.com',
        product_name: 'Chave de Ativação do Jogo'
      });
    }, 1000);
  });
};

// Mantido apenas para não quebrar componentes que possam importar, mas não tem efeito real no backend
export const forceApprovePayment = (chargeId: string): void => {
  console.log('Force approve desabilitado no ambiente de produção.');
};
