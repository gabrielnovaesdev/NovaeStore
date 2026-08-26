import React from 'react';
import { motion } from 'motion/react';
import { 
  Zap, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  ShoppingBag, 
  Check,
  Activity
} from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { HeroFeaturedSkeleton } from './skeletons/HeroSkeleton';
import { ParticleWaveCanvas } from './ParticleWaveCanvas';
import { useSpotlight } from '../hooks/useSpotlight';

interface HeroProps {
  onExploreClick: () => void;
  onOffersClick: () => void;
  onSelectProduct: (product: Product) => void;
  featuredProducts: Product[];
  isLoading?: boolean;
}

interface HeroCardItemProps {
  product: Product;
  idx: number;
  onSelectProduct: (p: Product) => void;
}

const HeroFeaturedCard: React.FC<HeroCardItemProps> = ({ product, idx, onSelectProduct }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { cardRef, handleMouseMove, handleMouseLeave } = useSpotlight();
  const inCart = isInCart(product.id);
  const qtyInCart = getItemQuantity(product.id);

  const badgeColors: Record<string, string> = {
    'Mais vendido': 'bg-amber-500/90 text-black shadow-amber-500/30',
    'Lançamento': 'bg-indigo-500 text-white shadow-indigo-500/30',
    'Oferta': 'bg-rose-500 text-white shadow-rose-500/30',
    'Destaque': 'bg-violet-600 text-white shadow-violet-500/30',
  };

  return (
    <motion.div
      ref={cardRef as React.RefObject<HTMLDivElement>}
      id={`hero-card-${product.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white dark:bg-[#11111a] border border-slate-200 dark:border-white/10 hover:border-indigo-500/50 rounded-2xl p-4 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-[0_15px_35px_-10px_rgba(99,102,241,0.25)] flex flex-col justify-between overflow-hidden"
    >
      {/* Dynamic Cursor-Tracked Spotlight Glow Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 -z-0 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(380px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(99, 102, 241, 0.16), transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Image Box - 100% uncropped & unzoomed */}
        <div
          onClick={() => onSelectProduct(product)}
          className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-950 flex items-center justify-center p-1.5 cursor-pointer"
        >
          {/* Ambient Blur Fill */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-xl scale-125 opacity-40 dark:opacity-30 pointer-events-none"
            style={{ backgroundImage: `url(${product.image})` }}
          />

          <img
            src={product.image}
            alt={product.name}
            className="relative z-10 max-h-full max-w-full object-contain rounded-lg shadow-md group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Subtle Bottom Shade */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none rounded-xl" />

          {/* Top Badges */}
          <div className="absolute top-2.5 left-2.5 z-30 flex flex-wrap gap-1.5 pointer-events-none">
            {product.badge && (
              <span
                className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md uppercase tracking-wider ${
                  badgeColors[product.badge] || 'bg-indigo-600 text-white'
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>
          {product.discount && (
            <div className="absolute top-2.5 right-2.5 z-30 bg-rose-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-md pointer-events-none">
              -{product.discount}%
            </div>
          )}
          {inCart && (
            <div className="absolute bottom-2 left-2 z-30 bg-indigo-600/95 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-bold text-white flex items-center gap-1 shadow">
              <Check className="w-3 h-3" />
              <span>No carrinho ({qtyInCart})</span>
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1 flex items-center justify-between">
          <span>{product.platform.split(' ')[0]}</span>
          <span className="text-slate-500 dark:text-slate-400">{product.category}</span>
        </div>

        <h3
          onClick={() => onSelectProduct(product)}
          className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors line-clamp-1 mb-2 cursor-pointer"
        >
          {product.name}
        </h3>
      </div>

      {/* Pricing and Actions */}
      <div className="relative z-10 pt-3 border-t border-slate-100 dark:border-white/5 space-y-2 mt-2">
        <div className="flex items-baseline justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 dark:text-slate-500 line-through block -mb-0.5">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
              </span>
            )}
            <span className="text-lg font-black text-slate-900 dark:text-white">
              R$ {product.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
          <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
            PIX
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            id={`hero-add-cart-${product.id}`}
            onClick={() => addToCart(product, 1)}
            className="bg-slate-100 hover:bg-slate-200 dark:bg-[#181828] dark:hover:bg-[#222238] border border-slate-200 dark:border-white/10 hover:border-indigo-500/30 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white px-2 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 active:scale-95"
            title="Adicionar ao carrinho"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{inCart ? '+1' : '+ Carrinho'}</span>
          </button>

          <button
            id={`hero-buy-${product.id}`}
            onClick={() => onSelectProduct(product)}
            className="btn-sheen bg-indigo-600 hover:bg-indigo-500 text-white px-2 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-md shadow-indigo-600/30 active:scale-95"
          >
            <Zap className="w-3 h-3 text-indigo-200 fill-indigo-200" />
            <span>Comprar</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOffersClick,
  onSelectProduct,
  featuredProducts,
  isLoading = false,
}) => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Interactive Anti-Gravity Particle Wave Canvas */}
      <ParticleWaveCanvas />

      {/* Cybernetic Tech Grid Background with Radial Fade Mask */}
      <div 
        className="absolute inset-0 -z-20 opacity-25 dark:opacity-15 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, #000 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 35%, #000 30%, transparent 80%)',
        }}
      />

      {/* Deep Volumetric Ambient Glow & Nebulas */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[450px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/15 to-fuchsia-600/10 dark:from-indigo-600/30 dark:via-violet-600/20 dark:to-fuchsia-500/15 blur-[130px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pointer-events-none">
        <div className="text-center max-w-3xl mx-auto relative z-10 pointer-events-auto">
          {/* Top Pill with Live Pulsing Status Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 dark:bg-[#151524]/90 backdrop-blur-xl border border-indigo-200/80 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 text-xs sm:text-sm font-semibold mb-8 shadow-sm hover:shadow-lg dark:shadow-[0_0_25px_rgba(99,102,241,0.2)] hover:border-indigo-400 dark:hover:border-indigo-400/50 hover:scale-[1.03] transition-all cursor-default"
          >
            <span className="flex h-2.5 w-2.5 relative items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider text-[10px]">
              Sistema Online
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Loja Oficial de Games & Ativações Digitais</span>
            </div>
          </motion.div>

          {/* Main Headline with Smooth Text Shimmer */}
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
              className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6"
            >
              Seu próximo nível <br className="hidden sm:inline" />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-800 dark:from-indigo-400 dark:via-violet-300 dark:to-cyan-300 animate-text-shimmer">
                começa aqui.
                {/* Glowing underline shimmer */}
                <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-70 blur-[1px]" />
              </span>
            </motion.h1>
          </div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-normal max-w-2xl mx-auto"
          >
            Encontre games e produtos digitais, monte seu carrinho e pague de forma rápida com ativação imediata pós-PIX.
          </motion.p>

          {/* CTA Buttons with Sheen Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
          >
            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="btn-sheen w-full sm:w-auto bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.55)] transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
            >
              <span>Explorar catálogo completo</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-offers-btn"
              onClick={onOffersClick}
              className="w-full sm:w-auto bg-white/90 hover:bg-slate-100 dark:bg-[#12121c]/90 dark:hover:bg-[#1a1a28] text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white border border-slate-200 dark:border-white/10 hover:border-indigo-500/40 font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 shadow-sm backdrop-blur-md cursor-pointer hover:shadow-md"
            >
              <Flame className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              <span>Ver ofertas da semana</span>
            </button>
          </motion.div>

          {/* Trust Seals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 border-t border-slate-200 dark:border-white/5 text-xs sm:text-sm text-slate-600 dark:text-slate-400"
          >
            <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-colors">
              <Zap className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-amber-500/20" />
              <span>Pagamento via <strong>PIX 24/7</strong></span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200 dark:border-white/5 hover:border-emerald-500/30 transition-colors">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Confirmação <strong>automática</strong></span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-100/80 dark:bg-white/[0.03] backdrop-blur-sm border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 transition-colors">
              <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Entrega <strong>100% digital</strong></span>
            </div>
          </motion.div>
        </div>

        {/* Featured Games Showcase Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-16 sm:mt-20 pointer-events-auto"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500 animate-pulse" />
              <h2 className="text-sm uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                Mais Procurados no Momento
              </h2>
            </div>
            <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hidden sm:inline">
              Preços promocionais por tempo limitado
            </span>
          </div>

          {isLoading ? (
            <HeroFeaturedSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredProducts.slice(0, 4).map((product, idx) => (
                <HeroFeaturedCard
                  key={product.id}
                  product={product}
                  idx={idx}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Ultra-Soft Scrim Gradient Transition to Solid Background */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-64 sm:h-80 md:h-[420px] pointer-events-none z-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              rgba(8, 8, 12, 0.02) 20%,
              rgba(8, 8, 12, 0.08) 38%,
              rgba(8, 8, 12, 0.22) 54%,
              rgba(8, 8, 12, 0.46) 68%,
              rgba(8, 8, 12, 0.72) 82%,
              rgba(8, 8, 12, 0.92) 93%,
              #08080c 100%
            )
          `,
        }}
      />
      {/* Light Mode Complementary Scrim */}
      <div 
        className="dark:hidden absolute bottom-0 left-0 right-0 h-64 sm:h-80 md:h-[420px] pointer-events-none z-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              transparent 0%,
              rgba(248, 250, 252, 0.02) 20%,
              rgba(248, 250, 252, 0.08) 38%,
              rgba(248, 250, 252, 0.22) 54%,
              rgba(248, 250, 252, 0.46) 68%,
              rgba(248, 250, 252, 0.72) 82%,
              rgba(248, 250, 252, 0.92) 93%,
              #f8fafc 100%
            )
          `,
        }}
      />
    </section>
  );
};


