import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ShieldCheck,
  QrCode,
  ArrowRight,
  Sparkles,
  Zap,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, CheckoutState, CreatePaymentResponse } from '../types';
import { createPayment, forceApprovePayment, MOCK_PAYMENT_DELAY } from '../services/api';
import { usePaymentPolling } from '../hooks/usePaymentPolling';

interface CheckoutModalProps {
  product: Product;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ product, onClose }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [state, setState] = useState<CheckoutState>('idle');
  const [paymentData, setPaymentData] = useState<CreatePaymentResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState<number>(MOCK_PAYMENT_DELAY / 1000);

  // Polling via custom hook seguro
  usePaymentPolling(
    paymentData?.charge_id || null,
    state === 'payment_pending',
    () => {
      setState('payment_paid');
      triggerConfetti();
    },
    () => setState('payment_error')
  );

  // Efeito de celebração ao confirmar pagamento
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#a855f7', '#f59e0b'],
      });
    } catch {
      // Confetti fail silently if canvas context unavailable
    }
  };

  // Temporizador visual regressivo do mock
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state === 'payment_pending') {
      setCountdown(Math.round(MOCK_PAYMENT_DELAY / 1000));
      timer = setInterval(() => {
        setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [state]);

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

  // Validação de e-mail estrita
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
      const data = await createPayment(email, product.id);
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
    } catch (err) {
      // Fallback para seleção de texto
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

  // Simular aprovação imediata
  const handleSimulateInstant = () => {
    if (paymentData?.charge_id) {
      forceApprovePayment(paymentData.charge_id);
      setState('payment_paid');
      triggerConfetti();
    }
  };

  // Reiniciar fluxo caso o usuário queira trocar e-mail
  const handleResetCheckout = () => {
    setState('idle');
    setPaymentData(null);
    setCopied(false);
  };

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      {/* Modal / Bottom-sheet Card */}
      <div className="relative w-full max-w-lg bg-[#0e0e16] border border-white/10 sm:rounded-3xl rounded-t-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh]">
        {/* Glow Accent Header */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-emerald-400" />

        {/* Modal Topbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#12121e]/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <h2 id="modal-headline" className="text-base font-bold text-white tracking-tight">
              Checkout Seguro — NovaeStore
            </h2>
          </div>

          <button
            id="close-checkout-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fechar checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Selected Product Summary Header */}
          <div className="flex gap-4 p-4 rounded-2xl bg-[#141422] border border-white/5 items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-20 h-16 sm:w-24 sm:h-20 rounded-xl object-cover shrink-0 border border-white/10"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[11px] font-semibold text-indigo-400 mb-0.5">
                <span>{product.platform.split(' ')[0]}</span>
                <span>•</span>
                <span className="truncate">{product.category}</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight truncate">
                {product.name}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                {product.description}
              </p>
              <div className="mt-1 flex items-baseline gap-2">
                {product.originalPrice && (
                  <span className="text-xs text-slate-500 line-through">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
                <span className="text-base sm:text-lg font-black text-white">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* STATE 1: IDLE / CREATING PAYMENT (FORM) */}
          {(state === 'idle' || state === 'creating_payment' || state === 'payment_error') && (
            <form onSubmit={handleCreatePayment} className="space-y-5">
              <div>
                <label
                  htmlFor="checkout-email"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2"
                >
                  Seu e-mail <span className="text-rose-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="checkout-email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError('');
                    }}
                    placeholder="Digite seu melhor e-mail"
                    disabled={state === 'creating_payment'}
                    className={`w-full bg-[#12121e] border rounded-xl px-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors ${
                      emailError
                        ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                        : 'border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
                    }`}
                  />
                </div>

                {emailError ? (
                  <p className="text-rose-400 text-xs font-semibold mt-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {emailError}
                  </p>
                ) : (
                  <p className="text-slate-400 text-xs mt-1.5 leading-normal">
                    Seu e-mail será utilizado para identificar sua compra e enviar o comprovante.
                  </p>
                )}
              </div>

              {/* Error Box if creation failed */}
              {state === 'payment_error' && (
                <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Não foi possível gerar o pagamento. Tente novamente.</span>
                </div>
              )}

              {/* Security info pills */}
              <div className="flex items-center justify-between text-xs text-slate-400 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                <span className="flex items-center gap-1.5 text-emerald-400">
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
                    <span>Gerando PIX...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-indigo-200 fill-indigo-200" />
                    <span>Gerar PIX e Comprar</span>
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  Aguardando transferência PIX
                </div>
                <h3 className="text-2xl font-black text-white">
                  Pagamento via PIX
                </h3>
              </div>

              {/* Purchase Details Summary */}
              <div className="bg-[#12121e] border border-white/5 rounded-2xl p-4 text-xs sm:text-sm text-left space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Seu e-mail:</span>
                  <span className="font-semibold text-white truncate max-w-[200px]">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Produto:</span>
                  <span className="font-semibold text-white truncate max-w-[200px]">{product.name}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-white/5">
                  <span className="text-slate-400 font-bold">Valor Total:</span>
                  <span className="font-black text-emerald-400 text-base">
                    R$ {product.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              {/* QR Code Container */}
              <div className="flex flex-col items-center">
                <div className="p-3 bg-white rounded-2xl shadow-xl border-4 border-indigo-500/30">
                  <img
                    src={paymentData.qr_code_image}
                    alt="QR Code PIX para pagamento"
                    className="w-48 h-48 sm:w-52 sm:h-52 object-contain"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Abra o aplicativo do seu banco e escaneie o código acima.
                </p>
              </div>

              {/* PIX Copia e Cola */}
              <div className="text-left space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  PIX Copia e Cola
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={paymentData.pix_copy_paste}
                    className="flex-1 bg-[#12121e] border border-white/10 rounded-xl px-3.5 py-3 text-xs text-slate-300 font-mono select-all focus:outline-none truncate"
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
                        <span>Copiar código PIX</span>
                      </>
                    )}
                  </button>
                </div>

                {copied && (
                  <p className="text-emerald-400 text-xs font-semibold mt-1">
                    ✓ Código PIX copiado para a área de transferência!
                  </p>
                )}
              </div>

              {/* Status Polling Bar */}
              <div className="bg-[#141424] border border-indigo-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
                <div className="flex items-center gap-2.5">
                  <Loader2 className="w-4 h-4 text-indigo-400 animate-spin shrink-0" />
                  <div className="text-left">
                    <p className="font-bold text-white flex items-center gap-1">
                      🟡 Aguardando pagamento...
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Estamos verificando automaticamente seu pagamento.
                    </p>
                  </div>
                </div>

                {/* Instant simulation helper button */}
                <button
                  type="button"
                  id="simulate-instant-paid-btn"
                  onClick={handleSimulateInstant}
                  className="shrink-0 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
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
                className="text-xs text-slate-400 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Corrigir e-mail ou escolher outro método</span>
              </button>
            </div>
          )}

          {/* STATE 3: PAYMENT PAID (SUCCESS) */}
          {state === 'payment_paid' && (
            <div className="py-4 text-center space-y-6 animate-in zoom-in-95 duration-300">
              {/* Success Badge */}
              <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-1.5">
                  ✅ Pagamento confirmado!
                </h3>
                <p className="text-slate-300 text-sm">
                  Seu pagamento foi aprovado com sucesso.
                </p>
              </div>

              {/* Receipt / Order details */}
              <div className="bg-[#12121e] border border-white/5 rounded-2xl p-5 text-left text-xs sm:text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Produto:</span>
                  <span className="font-bold text-white">{product.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="font-black text-emerald-400">Pago</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">E-mail:</span>
                  <span className="font-medium text-white">{email}</span>
                </div>
                <div className="pt-2 border-t border-white/5 flex justify-between items-center text-indigo-400 text-xs">
                  <span>Chave Original:</span>
                  <span className="font-mono font-bold bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20">
                    NOVAE-{Math.random().toString(36).substring(2, 6).toUpperCase()}-{Math.random().toString(36).substring(2, 6).toUpperCase()}-KEY
                  </span>
                </div>
              </div>

              {/* Big CTA to Access Product */}
              <button
                type="button"
                id="access-product-btn"
                onClick={() => {
                  // FUTURE:
                  // A URL real de entrega será fornecida pelo backend após confirmação do pagamento.
                  alert(`Acesso ao produto liberado! As instruções de ativação foram enviadas para: ${email}`);
                  onClose();
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-lg py-4 rounded-xl shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Acessar meu produto</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <p className="text-[11px] text-slate-400">
                Uma cópia de segurança com sua chave de ativação foi enviada para o seu e-mail.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
