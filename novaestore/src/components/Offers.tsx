import React from 'react';
import { Flame, ArrowRight, ShieldCheck, Sparkles, Check, Monitor, Cpu } from 'lucide-react';
import { Product } from '../types';

interface OffersProps {
  onBuyProduct: (product: Product) => void;
  offerProduct: Product;
}

export const Offers: React.FC<OffersProps> = ({ onBuyProduct, offerProduct }) => {
  return (
    <section id="ofertas" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 blur-[120px] -z-10 rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <Flame className="w-4 h-4 text-rose-500" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Ofertas da semana
          </h2>
          <p className="text-slate-400 text-sm">
            Os maiores descontos selecionados com entrega imediata via PIX.
          </p>
        </div>
      </div>

      {/* Main Spotlight Banner Card */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#131322] via-[#0f0f1a] to-[#141026] border border-indigo-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
        {/* Glow corner */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/20 blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-12">
          {/* Visual Cover Side */}
          <div className="lg:col-span-6 relative group">
            <div className="relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={offerProduct.image}
                alt={offerProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Discount Tag */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-rose-600 to-rose-500 text-white font-black text-sm px-4 py-1.5 rounded-xl shadow-xl flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                {offerProduct.discount || 50}% OFF
              </div>

              {/* Included Extras badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs text-slate-300 flex items-center justify-between">
                <span className="font-semibold text-white">Edição Completa & DLCs</span>
                <span className="text-emerald-400 font-bold">Chave Original PC</span>
              </div>
            </div>
          </div>

          {/* Details & Buy Action Side */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                  {offerProduct.platform}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                  {offerProduct.category}
                </span>
                <span className="text-xs text-amber-400 font-semibold bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  {offerProduct.badge || 'Mais vendido'}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
                {offerProduct.name}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {offerProduct.description}
              </p>

              {/* Key Features Bullet List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 text-xs sm:text-sm text-slate-300">
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
                <span className="text-sm text-slate-500 line-through font-semibold">
                  R$ {offerProduct.originalPrice?.toFixed(2).replace('.', ',')}
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs text-indigo-400 font-bold uppercase">Por apenas</span>
                  <span className="text-4xl font-black text-white">
                    R$ {offerProduct.price.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>

              <button
                id="offers-cta-btn"
                onClick={() => onBuyProduct(offerProduct)}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_40px_rgba(99,102,241,0.7)] transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 group"
              >
                <span>Aproveitar oferta</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
