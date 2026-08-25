import { useEffect, useRef } from 'react';
import { getPaymentStatus } from '../services/api';

/**
 * Hook para polling do status de pagamento via PIX a cada 3 segundos
 * com cleanup rigoroso de intervalos e proteção contra memory leaks.
 */
export const usePaymentPolling = (
  chargeId: string | null,
  isPolling: boolean,
  onSuccess: () => void,
  onError: () => void
) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const activeRef = useRef<boolean>(false);

  useEffect(() => {
    activeRef.current = isPolling && Boolean(chargeId);

    if (!activeRef.current || !chargeId) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const checkStatus = async () => {
      if (!activeRef.current || !chargeId) return;

      try {
        const response = await getPaymentStatus(chargeId);
        
        if (response.status === 'paid') {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          activeRef.current = false;
          onSuccess();
        } else if (response.status === 'failed') {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          activeRef.current = false;
          onError();
        }
      } catch (err) {
        console.error('Erro no polling de pagamento:', err);
      }
    };

    // Primeira verificação rápida após 1.5s
    const initialTimeout = setTimeout(checkStatus, 1500);

    // Polling a cada 3000ms (3 segundos)
    timerRef.current = setInterval(checkStatus, 3000);

    return () => {
      clearTimeout(initialTimeout);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      activeRef.current = false;
    };
  }, [chargeId, isPolling, onSuccess, onError]);
};
