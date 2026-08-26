import React from 'react';
import { 
  Gamepad2, 
  ShieldCheck, 
  Zap, 
  Award, 
  Sparkles, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  Globe2,
  Key
} from 'lucide-react';

interface MarqueeItem {
  name: string;
  category: string;
  icon: React.ReactNode;
  accent: string;
}

export const TechMarquee: React.FC = () => {
  const items: MarqueeItem[] = [
    {
      name: 'Steam',
      category: 'Ativação Oficial',
      icon: <Gamepad2 className="w-4 h-4 text-sky-400" />,
      accent: 'group-hover:border-sky-500/40 group-hover:bg-sky-500/10',
    },
    {
      name: 'PlayStation Network',
      category: 'PS4 & PS5',
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
      accent: 'group-hover:border-indigo-500/40 group-hover:bg-indigo-500/10',
    },
    {
      name: 'Xbox Game Pass',
      category: 'Console & PC',
      icon: <Cpu className="w-4 h-4 text-emerald-400" />,
      accent: 'group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10',
    },
    {
      name: 'Epic Games Store',
      category: 'PC Keys',
      icon: <Sparkles className="w-4 h-4 text-purple-400" />,
      accent: 'group-hover:border-purple-500/40 group-hover:bg-purple-500/10',
    },
    {
      name: 'PIX Instantâneo',
      category: '24 Horas por Dia',
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      accent: 'group-hover:border-amber-500/40 group-hover:bg-amber-500/10',
    },
    {
      name: 'Battle.net & EA App',
      category: 'Download Oficial',
      icon: <Key className="w-4 h-4 text-cyan-400" />,
      accent: 'group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10',
    },
    {
      name: 'Criptografia SSL 256-bit',
      category: 'Segurança Bancária',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
      accent: 'group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10',
    },
    {
      name: 'Entrega Automática',
      category: 'Pós-confirmação',
      icon: <CheckCircle2 className="w-4 h-4 text-violet-400" />,
      accent: 'group-hover:border-violet-500/40 group-hover:bg-violet-500/10',
    },
    {
      name: 'Suporte Humanizado',
      category: '7 dias por semana',
      icon: <Globe2 className="w-4 h-4 text-rose-400" />,
      accent: 'group-hover:border-rose-500/40 group-hover:bg-rose-500/10',
    },
    {
      name: 'Garantia Vitalícia',
      category: 'Chave 100% Original',
      icon: <Award className="w-4 h-4 text-amber-400" />,
      accent: 'group-hover:border-amber-500/40 group-hover:bg-amber-500/10',
    },
  ];

  // Duplicate for seamless infinite loop
  const marqueeList = [...items, ...items];

  return (
    <section className="relative py-8 overflow-hidden border-y border-slate-200/60 dark:border-white/5 bg-slate-100/50 dark:bg-[#0b0b12]/80 backdrop-blur-sm">
      {/* Left/Right Smooth Alpha Fade Masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-slate-50 dark:from-[#08080c] to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-slate-50 dark:from-[#08080c] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 mb-3 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400 dark:text-slate-500">
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
        <span>Plataformas Compatíveis & Garantias Oficiais</span>
      </div>

      <div className="flex overflow-hidden select-none">
        <div className="animate-marquee py-2 flex items-center gap-4">
          {marqueeList.map((item, index) => (
            <div
              key={index}
              className={`group flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-[#12121e] border border-slate-200 dark:border-white/10 ${item.accent} shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer shrink-0`}
            >
              <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/5 transition-transform group-hover:scale-110">
                {item.icon}
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors whitespace-nowrap">
                  {item.name}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
