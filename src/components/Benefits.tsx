import React from 'react';
import { ShoppingCart, Zap, CheckCircle2, Gamepad2, Shield } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      title: 'Compra simples',
      desc: 'Escolha seu produto e informe seu e-mail sem burocracia.',
      icon: <ShoppingCart className="w-6 h-6 text-indigo-400" />,
      glowColor: 'group-hover:border-indigo-500/50 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.2)]',
      iconBg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'PIX rápido',
      desc: 'Faça o pagamento diretamente pelo PIX com QR Code ou Copia e Cola.',
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      glowColor: 'group-hover:border-amber-500/50 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]',
      iconBg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Confirmação automática',
      desc: 'O status do pagamento é verificado em tempo real pelo sistema.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
      glowColor: 'group-hover:border-emerald-500/50 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Entrega digital',
      desc: 'Após a confirmação, o acesso ao produto será liberado na hora.',
      icon: <Gamepad2 className="w-6 h-6 text-violet-400" />,
      glowColor: 'group-hover:border-violet-500/50 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]',
      iconBg: 'bg-violet-500/10 border-violet-500/20',
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20 mb-3 inline-block">
          Diferenciais
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-4">
          Por que escolher a NovaeStore?
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Construímos uma experiência de compra direta, sem cadastros longos ou espera desnecessária.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, idx) => (
          <div
            key={idx}
            id={`benefit-card-${idx}`}
            className={`group bg-[#11111a] border border-white/5 rounded-2xl p-6 transition-all duration-300 ${b.glowColor} hover:-translate-y-1`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${b.iconBg}`}>
              {b.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              {b.title}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {b.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
