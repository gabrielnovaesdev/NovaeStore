import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  Zap,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Key,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, CartItem, CheckoutState, CreatePaymentResponse } from '../types';
import { createPayment, forceApprovePayment } from '../services/api';
import { usePaymentPolling } from '../hooks/usePaymentPolling';

interface CheckoutModalProps {
  product?: Product | null;
  items?: CartItem[];
  onClose: () => void;
  onSuccess?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  product,
  items,
  onClose,
  onSuccess
}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [state, setState] = useState<CheckoutState>('idle');
  const [paymentData, setPaymentData] = useState<CreatePaymentResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [completedNotification, setCompletedNotification] = useState(false);

  // Normalize order items list
  const orderItems: CartItem[] = useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }
    if (product) {
      return [{ product, quantity: 1 }];
    }
    return [];
  }, [items, product]);

  const totalItemsCount = useMemo(() => {
    return orderItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [orderItems]);

  const totalPrice = useMemo(() => {
    return orderItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }, [orderItems]);

  const originalTotalPrice = useMemo(() => {
    return orderItems.reduce(
      (acc, item) => acc + (item.product.originalPrice || item.product.price) * item.quantity,
      0
    );
  }, [orderItems]);

  const totalSavings = Math.max(0, originalTotalPrice - totalPrice);

  // Generate unique keys for each purchased item
  const activationKeys = useMemo(() => {
    const keysMap: { title: string; key: string; platform: string }[] = [];
    orderItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        const prefix = item.product.name.replace(/[^A-Za-z0-9]/g, '').substring(0, 4).toUpperCase() || 'GAME';
        const randomPart1 = Math.random().toString(36).substring(2, 6).toUpperCase();
        const randomPart2 = Math.random().toString(36).substring(2, 6).toUpperCase();
        const randomPart3 = Math.random().toString(36).substring(2, 6).toUpperCase();
        keysMap.push({
          title: item.quantity > 1 ? `${item.product.name} (#${i + 1})` : item.product.name,
          key: `NOVAE-${prefix}-${randomPart1}-${randomPart2}-${randomPart3}`,
          platform: item.product.platform.split(' ')[0] || 'PC',
        });
      }
    });
    return keysMap;
  }, [orderItems]);

  // Polling via custom hook
  usePaymentPolling(
    paymentData?.charge_id || null,
    state === 'payment_pending',
    () => {
      setState('payment_paid');
      triggerConfetti();
      if (onSuccess) onSuccess();
    },
    () => setState('payment_error')
  );

  // Efeito de celebração ao confirmar pagamento
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#a855f7', '#f59e0b', '#38bdf8'],
      });
    } catch {
      // Confetti silent fallback
    }
  };

  // Fechar com tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Validação de e-mail
  const validateEmail = (val: string): string => {
    if (!val || val.trim() === '') {
      return 'Digite seu e-mail.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(val.trim())) {
      return 'Digite um e-mail válido.';
    }
    return '';
  };

  // Gerar PIX
  const handleCreatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    const errorMsg = validateEmail(email);
    if (errorMsg) {
      setEmailError(errorMsg);
      return;
    }

    setEmailError('');
    setState('creating_payment');

    try {
      const itemsPayload = orderItems.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }));

      const data = await createPayment(email, {
        items: itemsPayload,
        totalAmount: totalPrice,
      });

      setPaymentData(data);
      setState('payment_pending');
    } catch (err) {
      console.error('Erro ao criar pagamento:', err);
      setState('payment_error');
    }
  };

  // Copiar código PIX
  const handleCopyPix = async () => {
    if (!paymentData?.pix_copy_paste) return;

    try {
      await navigator.clipboard.writeText(paymentData.pix_copy_paste);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = paymentData.pix_copy_paste;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Copiar chave de jogo individual
  const handleCopyKey = async (gameKey: string) => {
    try {
      await navigator.clipboard.writeText(gameKey);
      setCopiedKey(gameKey);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch {
      // ignore
    }
  };

  // Simular aprovação imediata
  const handleSimulateInstant = () => {
    if (paymentData?.charge_id) {
      forceApprovePayment(paymentData.charge_id);
      setState('payment_paid');
      triggerConfetti();
      if (onSuccess) onSuccess();
    }
  };

  // Reiniciar fluxo caso queira alterar dados
  const handleResetCheckout = () => {
    setState('idle');
    setPaymentData(null);
    setCopied(false);
  };

  if (orderItems.length === 0) {
    return null;
  }

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      {/* Modal / Bottom-sheet Card */}
      <div className="relative w-full max-w-xl bg-white dark:bg-[#0e0e16] border border-slate-200 dark:border-white/10 sm:rounded-3xl rounded-t-3xl shadow-2xl dark:shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh]">
        {/* Glow Accent Header */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400" />

        {/* Modal Topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-slate-50/90 dark:bg-[#12121e]/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-500/20 border border-indigo-200 dark:border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-headline" className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Checkout Seguro — NovaeStore
              </h2>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                PIX com ativação instantânea
              </span>
            </div>
          </div>

          <button
            id="close-checkout-btn"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Fechar checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* ORDER ITEMS SUMMARY BOX */}
          <div className="bg-slate-50 dark:bg-[#131320] border border-slate-200 dark:border-white/5 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/5 pb-2">
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <ShoppingBag className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                Resumo do Pedido ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'itens'})
              </span>
              <span>Entrega Digital</span>
            </div>

            {/* Scrollable list if multiple items */}
            <div className="max-h-48 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin">
              {orderItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 bg-white dark:bg-[#181828]/60 p-2.5 rounded-xl border border-slate-200 dark:border-white/5"
                >
                  <div className="relative w-14 h-11 sm:w-16 sm:h-12 rounded-lg overflow-hidden shrink-0 bg-slate-950 border border-slate-200 dark:border-white/10 flex items-center justify-center p-0.5">
                    <div
                      className="absolute inset-0 bg-cover bg-center blur-xs opacity-40 scale-125"
                      style={{ backgroundImage: `url(${item.product.image})` }}
                    />
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="relative z-10 max-w-full max-h-full object-contain rounded"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold">
                      <span>{item.product.platform.split(' ')[0]}</span>
                      <span>•</span>
                      <span className="truncate">{item.product.category}</span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center justify-between text-xs mt-0.5">
                      <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                        Qtd: {item.quantity}x
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        {item.product.originalPrice && (
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 line-through">
                            R$ {(item.product.originalPrice * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                        )}
                        <span className="font-black text-slate-900 dark:text-white text-xs sm:text-sm">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Row */}
            <div className="pt-2 border-t border-slate-200 dark:border-white/5 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 block font-medium">Total do Pedido:</span>
                {totalSavings > 0 && (
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                    Você economiza R$ {totalSavings.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                  R$ {totalPrice.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* STATE 1: IDLE / FORM */}
          {(state === 'idle' || state === 'creating_payment' || state === 'payment_error') && (
            <form onSubmit={handleCreatePayment} className="space-y-5">
              <div>
                <label
                  htmlFor="checkout-email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                >
                  Seu e-mail de entrega <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  id="checkout-email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError('');
                  }}
                  placeholder="exemplo@gmail.com"
                  disabled={state === 'creating_payment'}
                  className={`w-full bg-slate-50 dark:bg-[#12121e] border rounded-xl px-4 py-3.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none transition-colors ${
                    emailError
                      ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                      : 'border-slate-300 dark:border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                  }`}
                />

                {emailError ? (
                  <p className="text-rose-500 dark:text-rose-400 text-xs font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {emailError}
                  </p>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 text-xs mt-1.5 leading-normal">
                    As chaves originais de ativação e o comprovante serão enviados para este endereço imediatamente após a confirmação.
                  </p>
                )}
              </div>

              {/* Error Box if creation failed */}
              {state === 'payment_error' && (
                <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Não foi possível gerar o pagamento PIX. Tente novamente.</span>
                </div>
              )}

              {/* Security info pills */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-white/[0.02] p-3 rounded-xl border border-slate-200 dark:border-white/5">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4" /> Pagamento criptografado
                </span>
                <span>PIX Banco Central</span>
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                id="generate-pix-btn"
                disabled={state === 'creating_payment'}
                className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-bold text-base py-4 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2 active:scale-98 cursor-pointer disabled:cursor-not-allowed"
              >
                {state === 'creating_payment' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Gerando chave PIX...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-indigo-200 fill-indigo-200" />
                    <span>Gerar PIX e Pagar R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* STATE 2: PAYMENT PENDING (QR CODE & PIX COPIA E COLA) */}
          {state === 'payment_pending' && paymentData && (
            <div className="space-y-6 text-center animate-in fade-in duration-300">
              {/* Top Header */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  Aguardando transferência PIX
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Pague com seu Banco
                </h3>
              </div>

              {/* Details Summary */}
              <div className="bg-slate-50 dark:bg-[#12121e] border border-slate-200 dark:border-white/5 rounded-2xl p-4 text-xs sm:text-sm text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">E-mail de envio:</span>
                  <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Quantidade de itens:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{totalItemsCount}</span>
                </div>
                <div className="flex justify-between pt-1.5 border-t border-slate-200 dark:border-white/5">
                  <span className="text-slate-600 dark:text-slate-400 font-bold">Valor Total a Transferir:</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-base sm:text-lg">
                    R$ {totalPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center">
                <div className="p-3.5 bg-white rounded-2xl shadow-xl border-4 border-indigo-500/20">
                  <img
                    src={paymentData.qr_code_image}
                    alt="QR Code PIX para pagamento"
                    className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2.5">
                  Abra o aplicativo do seu banco, escolha <strong>Pagar com PIX</strong> e escaneie o código.
                </p>
              </div>

              {/* PIX Copia e Cola */}
              <div className="text-left space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  PIX Copia e Cola
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={paymentData.pix_copy_paste}
                    className="flex-1 bg-slate-50 dark:bg-[#12121e] border border-slate-300 dark:border-white/10 rounded-xl px-3.5 py-3 text-xs text-slate-800 dark:text-slate-300 font-mono select-all focus:outline-none truncate"
                  />
                  <button
                    type="button"
                    id="copy-pix-btn"
                    onClick={handleCopyPix}
                    className={`px-4 py-3 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                      copied
                        ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copiar</span>
                      </>
                    )}
                  </button>
                </div>

                {copied && (
                  <p className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold mt-1">
                    ✓ Código PIX copiado com sucesso!
                  </p>
                )}
              </div>

              {/* Status Polling Bar */}
              <div className="bg-indigo-50/50 dark:bg-[#141424] border border-indigo-200 dark:border-indigo-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Loader2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin shrink-0" />
                  <div className="text-left">
                    <p className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                      🟡 Verificando pagamento...
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Liberação automática e imediata.
                    </p>
                  </div>
                </div>

                {/* Instant simulation helper button */}
                <button
                  type="button"
                  id="simulate-instant-paid-btn"
                  onClick={handleSimulateInstant}
                  className="shrink-0 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
                  title="Simula a confirmação imediata sem esperar o timer do mock"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Aprovar agora</span>
                </button>
              </div>

              {/* Action to change email */}
              <button
                type="button"
                onClick={handleResetCheckout}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Corrigir e-mail ou voltar</span>
              </button>
            </div>
          )}

          {/* STATE 3: PAYMENT PAID (SUCCESS) */}
          {state === 'payment_paid' && (
            <div className="py-3 text-center space-y-6 animate-in zoom-in-95 duration-300">
              {/* Success Badge */}
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1.5">
                  ✅ Pagamento Confirmado!
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm">
                  Suas chaves originais foram geradas e enviadas para <strong>{email}</strong>.
                </p>
              </div>

              {/* Generated Keys Section */}
              <div className="bg-slate-50 dark:bg-[#12121e] border border-emerald-500/30 rounded-2xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/5 pb-2">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    Chaves de Ativação Liberadas:
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">100% Originais</span>
                </div>

                <div className="space-y-2.5 max-h-52 overflow-y-auto pr-1">
                  {activationKeys.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white dark:bg-[#181828] border border-slate-200 dark:border-white/5 p-3 rounded-xl space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-900 dark:text-white truncate max-w-[240px]">
                          {item.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-semibold">
                          {item.platform}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 bg-slate-100 dark:bg-[#0d0d15] p-2 rounded-lg border border-slate-200 dark:border-white/5 font-mono text-xs text-indigo-600 dark:text-indigo-300">
                        <span className="truncate select-all">{item.key}</span>
                        <button
                          onClick={() => handleCopyKey(item.key)}
                          className="text-slate-400 hover:text-slate-900 dark:hover:text-white shrink-0 p-1"
                          title="Copiar chave"
                        >
                          {copiedKey === item.key ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {completedNotification && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                  Comprovante e instruções completas foram enviadas para {email}!
                </div>
              )}

              {/* Big CTA */}
              <button
                type="button"
                id="access-product-btn"
                onClick={() => {
                  setCompletedNotification(true);
                  setTimeout(() => {
                    onClose();
                  }, 1200);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base sm:text-lg py-4 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Concluir e Acessar Jogos</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Uma cópia de segurança e a nota do pedido foram enviadas para o seu e-mail.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

