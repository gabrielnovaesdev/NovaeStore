import supabase from '../config/supabaseClient.js';

// No JS nativo ou Node fetch pode ser usado. O Express v4+ já roda no Node 18+ que suporta fetch nativamente, 
// então não precisamos instalar o axios se quisermos evitar dependências extras, mas o usuário não se importa.
// Para simplicidade, usaremos fetch nativo (disponível no Node 18+).

const PUSHINPAY_TOKEN = process.env.PUSHINPAY_TOKEN;

/**
 * Processa a criação de um pagamento na API da PushinPay.
 * Se o token não estiver presente nas variáveis de ambiente, 
 * simula o pagamento para não interromper o fluxo da página.
 */
export async function createPayment(orderData) {
    if (!PUSHINPAY_TOKEN) {
        console.warn("⚠️ Aviso: PUSHINPAY_TOKEN não configurado. Ignorando processamento de pagamento e simulando sucesso.");
        // Retorna um fluxo funcional falso
        return {
            success: true,
            message: "Modo de teste: Pagamento ignorado pois o token não está configurado.",
            mocked: true,
            transactionId: `mock_${Date.now()}`
        };
    }

    try {
        const response = await fetch('https://api.pushinpay.com.br/v1/transactions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${PUSHINPAY_TOKEN}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Erro na PushinPay:", data);
            throw new Error(data.message || "Falha ao processar pagamento com a PushinPay.");
        }

        return {
            success: true,
            data
        };
    } catch (error) {
        console.error("Erro na integração com PushinPay:", error.message);
        throw new Error("Falha de comunicação com o gateway de pagamento.");
    }
}

/**
 * Atualiza o status da transação no banco de dados e libera o acesso se pago.
 */
export async function updateTransactionStatus(transactionId, status, customerId) {
    if (!supabase) {
        console.warn("⚠️ Aviso: Banco de dados não configurado. Status da transação ignorado.");
        return;
    }

    // Atualiza o status
    const { data, error } = await supabase
        .from('transactions')
        .update({ status: status })
        .eq('pushinpay_transaction_id', transactionId)
        .select()
        .single();

    if (error) {
        console.error("Erro ao atualizar transação no Supabase:", error);
        throw error;
    }

    console.log(`Transação ${transactionId} atualizada para o status: ${status}`);

    // Se o pagamento foi aprovado, libera o acesso ao produto
    if (status === 'PAID' || status === 'approved') {
        await releaseProductAccess(customerId);
    }

    return data;
}

/**
 * Libera o acesso ao produto para o cliente no banco de dados
 */
async function releaseProductAccess(customerId) {
    if (!supabase) return;

    const { data, error } = await supabase
        .from('customers')
        .update({ has_access: true })
        .eq('id', customerId);
        
    if (error) {
        console.error("Erro ao liberar acesso ao produto no Supabase:", error);
    } else {
        console.log(`🎉 Acesso liberado para o cliente ID: ${customerId}`);
    }
}

