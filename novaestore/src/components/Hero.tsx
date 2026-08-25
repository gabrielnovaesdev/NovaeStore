import React from 'react';
import { Zap, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, Flame, Tag, Clock } from 'lucide-react';
import { Product } from '../types';

interface HeroProps {
  onExploreClick: () => void;
  onOffersClick: () => void;
  onSelectProduct: (product: Product) => void;
  featuredProducts: Product[];
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOffersClick,
  onSelectProduct,
  featuredProducts
}) => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Glow & Atmospheric Background Elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-violet-600/15 to-pink-500/10 blur-[130px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-500/10 blur-[90px] -z-10 pointer-events-none" />
      <div className="absolute top-40 right-10 w-80 h-80 bg-violet-600/10 blur-[100px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161626] border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-semibold mb-8 shadow-[0_0_20px_rgba(99,102,241,0.15)] animate-in fade-in duration-500">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Loja Oficial de Games & Ativações Digitais
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
            Seu próximo nível <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-200">
              começa aqui.
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-normal max-w-2xl mx-auto">
            Encontre games e produtos digitais, pague de forma rápida e tenha acesso ao seu produto imediatamente após a confirmação do pagamento.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              id="hero-explore-btn"
              onClick={onExploreClick}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:shadow-[0_0_35px_rgba(99,102,241,0.6)] transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
            >
              Explorar produtos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              id="hero-offers-btn"
              onClick={onOffersClick}
              className="w-full sm:w-auto bg-[#12121c] hover:bg-[#1a1a28] text-slate-200 hover:text-white border border-white/10 hover:border-indigo-500/40 font-semibold text-base px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 active:scale-95"
            >
              <Flame className="w-4 h-4 text-amber-400" />
              Ver ofertas
            </button>
          </div>

          {/* Trust Seals */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 border-t border-white/5 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.02] border border-white/5">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              <span>Pagamento via <strong>PIX</strong></span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.02] border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Confirmação <strong>automática</strong></span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.02] border border-white/5">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              <span>Entrega <strong>100% digital</strong></span>
            </div>
          </div>
        </div>

        {/* Featured Games Showcase Grid */}
        <div className="mt-16 sm:mt-20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <h2 className="text-sm uppercase tracking-wider font-bold text-slate-400">
                Mais Procurados no Momento
              </h2>
            </div>
            <span className="text-xs text-indigo-400 font-medium hidden sm:inline">
              Preços promocionais por tempo limitado
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.slice(0, 4).map((product) => {
              const badgeColors: Record<string, string> = {
                'Mais vendido': 'bg-amber-500/90 text-black shadow-amber-500/30',
                'Lançamento': 'bg-indigo-500 text-white shadow-indigo-500/30',
                'Oferta': 'bg-rose-500 text-white shadow-rose-500/30',
                'Destaque': 'bg-violet-600 text-white shadow-violet-500/30',
              };

              return (
                <div
                  key={product.id}
                  id={`hero-card-${product.id}`}
                  onClick={() => onSelectProduct(product)}
                  className="group relative bg-[#11111a] border border-white/10 hover:border-indigo-500/50 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(99,102,241,0.25)] cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Image Box */}
                    <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-900">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
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
                        <div className="absolute top-2.5 right-2.5 bg-rose-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-md shadow-md">
                          -{product.discount}%
                        </div>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider mb-1 flex items-center justify-between">
                      <span>{product.platform.split(' ')[0]}</span>
                      <span className="text-slate-400">{product.category}</span>
                    </div>

                    <h3 className="font-bold text-white text-base leading-snug group-hover:text-indigo-300 transition-colors line-clamp-1 mb-2">
                      {product.name}
                    </h3>
                  </div>

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-white/5 flex items-center justify-between mt-2">
                    <div>
                      {product.originalPrice && (
                        <span className="text-xs text-slate-500 line-through block -mb-0.5">
                          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                      <span className="text-lg font-black text-white">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>

                    <button
                      id={`hero-buy-${product.id}`}
                      className="bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 border border-indigo-500/30 hover:border-transparent"
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
