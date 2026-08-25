import { CreatePaymentResponse, PaymentStatusResponse } from '../types';

/**
 * SERVIÇOS DE API DA NOVAESTORE
 * 
 * Configuração centralizada para requisições de pagamento.
 * Quando o backend no Antigravity for conectado, as funções abaixo
 * farão chamadas reais:
 * - POST /api/create-payment { email, product_id }
 * - GET /api/payment-status?charge_id={charge_id}
 */

// FUTURE: Substituir pela URL do backend real no Antigravity
// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const MOCK_PAYMENT_DELAY = 10000; // 10 segundos para confirmação automática simulada

// Armazenamento em memória do status de charges ativas para a simulação do frontend
const chargeStore: Record<string, { status: 'pending' | 'paid' | 'failed'; createdAt: number }> = {};

/**
 * Cria uma cobrança PIX (Simulada para desenvolvimento)
 */
export const createPayment = async (email: string, productId: string): Promise<CreatePaymentResponse> => {
  // Simula latência de rede realista (1.2s)
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const chargeId = `charge_pix_${Math.random().toString(36).substring(2, 10)}_${Date.now().toString().slice(-4)}`;
  
  // Registra a charge como pendente
  chargeStore[chargeId] = {
    status: 'pending',
    createdAt: Date.now()
  };

  // Agenda aprovação automática do mock após o delay estipulado
  setTimeout(() => {
    if (chargeStore[chargeId]) {
      chargeStore[chargeId].status = 'paid';
    }
  }, MOCK_PAYMENT_DELAY);

  // String PIX no formato padrão Banco Central (EMV Copia e Cola simulada)
  const sanitizedEmail = email.toLowerCase().trim();
  const pixPayload = `00020126580014BR.GOV.BCB.PIX0114${sanitizedEmail}0224NovaeStore_${productId}520400005303986540549.905802BR5910NovaeStore6009Sao_Paulo62070503***6304${Math.random().toString(16).substring(2, 6).toUpperCase()}`;

  // QR Code URL pública de alta resolução e contraste
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=10&color=050508&bgcolor=ffffff&data=${encodeURIComponent(pixPayload)}`;

  return {
    charge_id: chargeId,
    qr_code_image: qrCodeUrl,
    pix_copy_paste: pixPayload,
    product_id: productId
  };
};

/**
 * Consulta o status atual de uma cobrança PIX
 */
export const getPaymentStatus = async (chargeId: string): Promise<PaymentStatusResponse> => {
  // Simulação rápida de polling (300ms)
  await new Promise((resolve) => setTimeout(resolve, 300));

  const charge = chargeStore[chargeId];
  if (!charge) {
    return { status: 'pending' };
  }

  return {
    status: charge.status
  };
};

/**
 * Utilitário de simulação instantânea (para demonstração imediata sem esperar 10s)
 */
export const forceApprovePayment = (chargeId: string): void => {
  if (chargeStore[chargeId]) {
    chargeStore[chargeId].status = 'paid';
  }
};
