import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Star, Check, Zap } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useSpotlight } from '../hooks/useSpotlight';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy, index = 0 }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { cardRef, handleMouseMove, handleMouseLeave } = useSpotlight();
  const inCart = isInCart(product.id);
  const qtyInCart = getItemQuantity(product.id);

  const badgeStyles: Record<string, string> = {
    'Mais vendido': 'bg-amber-500 text-black font-extrabold shadow-amber-500/20',
    'Lançamento': 'bg-indigo-500 text-white font-bold shadow-indigo-500/20',
    'Oferta': 'bg-rose-500 text-white font-extrabold shadow-rose-500/20',
    'Destaque': 'bg-violet-600 text-white font-bold shadow-violet-500/20',
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.article
      ref={cardRef as React.RefObject<HTMLElement>}
      id={`product-card-${product.id}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay: (index % 4) * 0.08,
        ease: 'easeOut',
      }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white dark:bg-[#101018] border border-slate-200 dark:border-white/10 hover:border-indigo-500/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(99,102,241,0.15)] flex flex-col justify-between transition-all duration-300"
    >
      {/* Dynamic Cursor-Tracked Spotlight Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.14), transparent 70%)`,
        }}
      />

      {/* Top Cover Image Box - 100% uncropped & unzoomed */}
      <div className="relative z-10 aspect-[16/10] overflow-hidden bg-slate-950 flex items-center justify-center p-1.5 cursor-pointer" onClick={() => onBuy(product)}>
        {/* Ambient Blur Fill to fill background harmoniously */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-xl scale-125 opacity-40 dark:opacity-30 pointer-events-none"
          style={{ backgroundImage: `url(${product.image})` }}
        />

        {/* Crisp Main Cover Artwork - Complete full view */}
        <img
          src={product.image}
          alt={product.name}
          className="relative z-10 max-h-full max-w-full object-contain rounded-lg shadow-md group-hover:scale-[1.02] transition-transform duration-500"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* Subtle Edge Shade */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/40 via-transparent to-slate-950/10 pointer-events-none rounded-xl" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 z-30 flex flex-wrap gap-1.5 pointer-events-none">
          {product.badge && (
            <span
              className={`text-[11px] px-2.5 py-0.5 rounded-md shadow-md uppercase tracking-wider ${
                badgeStyles[product.badge] || 'bg-indigo-600 text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
        </div>

        {product.discount && (
          <div className="absolute top-2.5 right-2.5 z-30 bg-rose-600 text-white text-xs font-black px-2.5 py-0.5 rounded-md shadow-lg shadow-rose-950/60 pointer-events-none">
            -{product.discount}%
          </div>
        )}

        {/* In Cart Pill Overlay */}
        {inCart && (
          <div className="absolute bottom-2.5 left-2.5 z-30 flex items-center gap-1 bg-indigo-600/95 backdrop-blur-md px-2.5 py-0.5 rounded-md text-xs font-bold text-white shadow-md">
            <Check className="w-3 h-3" />
            <span>No carrinho ({qtyInCart})</span>
          </div>
        )}

        {/* Rating if available */}
        {product.rating && (
          <div className="absolute bottom-2.5 right-2.5 z-30 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-xs font-bold text-amber-400 border border-white/10">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="relative z-10 p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Platform & Category info */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 mb-1.5">
            <span className="bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/20">
              {product.platform}
            </span>
            <span className="text-slate-500 dark:text-slate-400">{product.category}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onBuy(product)}
            className="font-bold text-slate-900 dark:text-white text-lg leading-tight mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-2 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Footer with Price and Action Buttons */}
        <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
          <div className="flex items-end justify-between">
            <div>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 dark:text-slate-500 line-through block font-medium">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">R$</span>
                <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {product.price.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              PIX
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              id={`add-cart-btn-${product.id}`}
              onClick={handleAddToCart}
              className={`py-2.5 px-3 rounded-xl font-bold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 border cursor-pointer ${
                inCart
                  ? 'bg-indigo-50 dark:bg-indigo-600/20 border-indigo-200 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-600/30'
                  : 'bg-slate-100 dark:bg-[#181828] border-slate-200 dark:border-white/10 hover:border-indigo-500/40 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-[#202035]'
              } active:scale-95`}
              aria-label={`Adicionar ${product.name} ao carrinho`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>{inCart ? '+ Adicionar' : '+ Carrinho'}</span>
            </button>

            <button
              id={`buy-btn-${product.id}`}
              onClick={() => onBuy(product)}
              className="btn-sheen bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-95 whitespace-nowrap cursor-pointer"
              aria-label={`Comprar ${product.name} agora`}
            >
              <Zap className="w-3.5 h-3.5 text-indigo-200 fill-indigo-200" />
              <span>Comprar</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
};


