import express from 'express';
import { createPayment, updateTransactionStatus } from '../services/paymentService.js';

const router = express.Router();

/**
 * Rota para criar um novo pagamento/checkout
 * POST /api/payments/checkout
 */
router.post('/checkout', async (req, res) => {
    try {
        const result = await createPayment(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * Webhook para receber atualizações de status da PushinPay
 * POST /api/payments/webhook
 */
router.post('/webhook', async (req, res) => {
    try {
        const payload = req.body;
        
        // Em um cenário real de produção, é ideal verificar a assinatura/token do webhook aqui.
        
        // Adaptar essas chaves conforme a documentação exata da PushinPay
        const transactionId = payload.id; 
        const status = payload.status; 
        const customerId = payload.customer_id; // Identificador retornado ou guardado no metadata

        if (transactionId && status && customerId) {
            await updateTransactionStatus(transactionId, status, customerId);
        }

        // Retornar 200 OK rapidamente para a PushinPay parar de tentar reenviar o evento
        res.status(200).json({ received: true });
    } catch (error) {
        console.error("Erro no processamento do webhook:", error);
        res.status(500).json({ error: "Erro interno ao processar webhook" });
    }
});

export default router;

