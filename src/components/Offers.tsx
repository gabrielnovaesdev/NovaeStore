import React from 'react';
import { motion } from 'motion/react';
import { Flame, ArrowRight, Sparkles, Check, ShoppingBag, Zap } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useSpotlight } from '../hooks/useSpotlight';

interface OffersProps {
  onBuyProduct: (product: Product) => void;
  offerProduct: Product;
}

export const Offers: React.FC<OffersProps> = ({ onBuyProduct, offerProduct }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { cardRef, handleMouseMove, handleMouseLeave } = useSpotlight();
  const inCart = isInCart(offerProduct.id);
  const qtyInCart = getItemQuantity(offerProduct.id);

  return (
    <section id="ofertas" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-600/10 blur-[120px] -z-10 rounded-full pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex items-center gap-3 mb-8"
      >
        <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shadow-inner">
          <Flame className="w-5 h-5 text-rose-500" />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            <span>Seleção Especial</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Ofertas da semana
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Os maiores descontos selecionados com entrega imediata via PIX.
          </p>
        </div>
      </motion.div>

      {/* Main Spotlight Banner Card */}
      <motion.div
        ref={cardRef as React.RefObject<HTMLDivElement>}
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 dark:from-[#131322] dark:via-[#0f0f1a] dark:to-[#141026] border border-indigo-500/30 text-white shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
      >
        {/* Dynamic Cursor-Tracked Spotlight Glow Overlay */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.2), transparent 70%)`,
          }}
        />

        {/* Glow corner */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 blur-[80px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
          {/* Visual Cover Side */}
          <div className="lg:col-span-6 relative group">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-950 flex items-center justify-center p-2">
              {/* Ambient Blur Fill */}
              <div
                className="absolute inset-0 bg-cover bg-center blur-xl scale-125 opacity-40 pointer-events-none"
                style={{ backgroundImage: `url(${offerProduct.image})` }}
              />

              <img
                src={offerProduct.image}
                alt={offerProduct.name}
                className="relative z-10 max-h-full max-w-full object-contain rounded-xl shadow-lg group-hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none rounded-xl" />

              {/* Discount Tag */}
              <div className="absolute top-4 left-4 z-30 bg-gradient-to-r from-rose-600 to-rose-500 text-white font-black text-sm px-4 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5 pointer-events-none">
                <Sparkles className="w-4 h-4" />
                {offerProduct.discount || 50}% OFF
              </div>

              {/* Included Extras badge */}
              <div className="absolute bottom-4 left-4 right-4 z-30 bg-black/70 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs text-slate-300 flex items-center justify-between">
                <span className="font-semibold text-white">Edição Completa & DLCs</span>
                <span className="text-emerald-400 font-bold">Chave Original PC</span>
              </div>
            </div>
          </div>

          {/* Details & Buy Action Side */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 dark:text-indigo-400 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">
                  {offerProduct.platform}
                </span>
                <span className="text-xs text-slate-300 dark:text-slate-400 font-medium">
                  {offerProduct.category}
                </span>
                <span className="text-xs text-amber-300 dark:text-amber-400 font-semibold bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  {offerProduct.badge || 'Mais vendido'}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                {offerProduct.name}
              </h3>

              <p className="text-slate-200 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {offerProduct.description}
              </p>

              {/* Key Features Bullet List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs sm:text-sm text-slate-200 dark:text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Código de ativação vitalício</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Download oficial nos servidores</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Modo Multiplayer Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Suporte a Conquistas e Nuvem</span>
                </div>
              </div>
            </div>

            {/* Price Box & Action */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block font-medium">De</span>
                <span className="text-sm text-slate-400 line-through font-semibold">
                  R$ {offerProduct.originalPrice?.toFixed(2).replace('.', ',')}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-indigo-300 dark:text-indigo-400 font-bold uppercase">Por apenas</span>
                  <span className="text-4xl font-black text-white">
                    R$ {offerProduct.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  id="offer-add-cart-btn"
                  onClick={() => addToCart(offerProduct, 1)}
                  className="bg-white/10 hover:bg-white/20 dark:bg-[#181828] dark:hover:bg-[#222238] border border-white/15 dark:border-white/10 hover:border-indigo-500/40 text-white font-bold text-sm px-5 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-indigo-300 dark:text-indigo-400" />
                  <span>{inCart ? `No Carrinho (${qtyInCart})` : 'Adicionar'}</span>
                </button>

                <button
                  id="offers-cta-btn"
                  onClick={() => onBuyProduct(offerProduct)}
                  className="btn-sheen bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base px-7 py-3.5 rounded-xl shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.7)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 group cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-indigo-200 fill-indigo-200" />
                  <span>Comprar Agora</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};


