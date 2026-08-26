import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, CheckCircle2, X, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartToast: React.FC = () => {
  const { lastAddedItem, dismissToast, openCart, totalItems } = useCart();

  useEffect(() => {
    if (!lastAddedItem) return;

    const timer = setTimeout(() => {
      dismissToast();
    }, 4000);

    return () => clearTimeout(timer);
  }, [lastAddedItem, dismissToast]);

  return (
    <AnimatePresence>
      {lastAddedItem && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full sm:w-auto bg-[#141424]/95 border border-indigo-500/40 backdrop-blur-xl rounded-2xl p-4 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(99,102,241,0.25)] flex items-center gap-3 text-white"
        >
          <div className="w-12 h-10 rounded-xl overflow-hidden shrink-0 border border-white/10">
            <img
              src={lastAddedItem.product.image}
              alt={lastAddedItem.product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Adicionado ao carrinho</span>
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-white truncate">
              {lastAddedItem.product.name}
            </h4>
            <span className="text-[11px] text-slate-400">
              Total no carrinho: {totalItems} {totalItems === 1 ? 'jogo' : 'jogos'}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                dismissToast();
                openCart();
              }}
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition-colors flex items-center gap-1 shrink-0"
            >
              <span>Ver</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            <button
              onClick={dismissToast}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
