import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const FloatingCartButton: React.FC = () => {
  const { totalItems, totalPrice, openCart, isCartOpen } = useCart();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Exibe o botão flutuante quando o usuário descer 250px e houver itens no carrinho
      setIsVisible(window.scrollY > 250);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isCartOpen || totalItems === 0 || !isVisible) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.button
        id="floating-cart-btn"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={openCart}
        className="fixed bottom-6 left-6 sm:left-auto sm:right-6 z-40 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white px-4 py-3 rounded-2xl shadow-[0_10px_25px_rgba(99,102,241,0.5)] border border-indigo-400/30 flex items-center gap-3 cursor-pointer backdrop-blur-md"
        aria-label={`Ver carrinho com ${totalItems} itens`}
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5 text-indigo-100" />
          <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-indigo-700 shadow">
            {totalItems}
          </span>
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase font-bold text-indigo-200 tracking-wider">
            Seu Carrinho
          </span>
          <span className="text-sm font-black text-white leading-tight">
            R$ {totalPrice.toFixed(2).replace('.', ',')}
          </span>
        </div>

        <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center ml-1">
          <Zap className="w-3.5 h-3.5 text-white" />
        </div>
      </motion.button>
    </AnimatePresence>
  );
};
