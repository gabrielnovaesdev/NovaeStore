import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Star, ShieldCheck, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onBuy: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onBuy }) => {
  const badgeStyles: Record<string, string> = {
    'Mais vendido': 'bg-amber-500 text-black font-extrabold shadow-amber-500/20',
    'Lançamento': 'bg-indigo-500 text-white font-bold shadow-indigo-500/20',
    'Oferta': 'bg-rose-500 text-white font-extrabold shadow-rose-500/20',
    'Destaque': 'bg-violet-600 text-white font-bold shadow-violet-500/20',
  };

  return (
    <motion.article
      id={`product-card-${product.id}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group bg-[#101018] border border-white/10 hover:border-indigo-500/40 rounded-2xl overflow-hidden hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.8),0_0_20px_rgba(99,102,241,0.15)] flex flex-col justify-between"
    >
      {/* Top Cover Image Box */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101018] via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
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
          <div className="absolute top-3 right-3 bg-rose-600 text-white text-xs font-black px-2.5 py-0.5 rounded-md shadow-lg shadow-rose-950/60">
            -{product.discount}%
          </div>
        )}

        {/* Rating if available */}
        {product.rating && (
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md text-xs font-bold text-amber-400 border border-white/10">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Platform & Category info */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-indigo-400 mb-1.5">
            <span className="bg-indigo-500/10 px-2 py-0.5 rounded text-indigo-300 border border-indigo-500/20">
              {product.platform}
            </span>
            <span className="text-slate-400">{product.category}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-bold text-white text-lg leading-tight mb-2 group-hover:text-indigo-300 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Footer with Price and CTA */}
        <div className="pt-4 border-t border-white/5 flex items-end justify-between gap-3">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-slate-500 line-through block font-medium">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <div className="flex items-baseline gap-1">
              <span className="text-xs text-slate-400 font-semibold">R$</span>
              <span className="text-2xl font-black text-white tracking-tight">
                {product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          <button
            id={`buy-btn-${product.id}`}
            onClick={() => onBuy(product)}
            className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 active:scale-95 whitespace-nowrap"
            aria-label={`Comprar ${product.name} agora`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
};
