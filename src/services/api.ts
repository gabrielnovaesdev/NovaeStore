import { CreatePaymentResponse, PaymentStatusResponse } from '../types';

/**
 * SERVIÇOS DE API DA NOVAESTORE
 * 
 * Configuração centralizada para requisições de pagamento.
 */

// Utiliza a variável de ambiente para o backend ou localhost no desenvolvimento
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:54321/functions/v1';

/**
 * Cria uma cobrança PIX comunicando com a Supabase Edge Function
 */
export const createPayment = async (email: string, productId: string): Promise<CreatePaymentResponse> => {
  try {
    const response = await fetch(`${API_URL}/create-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, product_id: productId }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao criar pagamento');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error (createPayment):', error);
    throw error;
  }
};

/**
 * Consulta o status atual de uma cobrança PIX
 */
export const getPaymentStatus = async (chargeId: string): Promise<PaymentStatusResponse> => {
  try {
    const response = await fetch(`${API_URL}/payment-status?charge_id=${chargeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao consultar status');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error (getPaymentStatus):', error);
    // Retorna pending por padrão em caso de falha de rede para que o frontend continue tentando
    return { status: 'pending' };
  }
};

/**
 * Utilitário para forçar aprovação (Apenas Dev/Testes locais se houver rota)
 */
export const forceApprovePayment = (chargeId: string): void => {
  console.warn('Aprovação forçada no frontend não é mais suportada (usando backend real). Aguarde o Webhook processar o charge:', chargeId);
};
