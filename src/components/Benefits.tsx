import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Zap, CheckCircle2, Gamepad2 } from 'lucide-react';

export const Benefits: React.FC = () => {
  const benefits = [
    {
      title: 'Compra simples',
      desc: 'Escolha seu produto e informe seu e-mail sem burocracia.',
      icon: <ShoppingCart className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      glowColor: 'group-hover:border-indigo-500/50 group-hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]',
      iconBg: 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20',
    },
    {
      title: 'PIX rápido',
      desc: 'Faça o pagamento diretamente pelo PIX com QR Code ou Copia e Cola.',
      icon: <Zap className="w-6 h-6 text-amber-500 dark:text-amber-400" />,
      glowColor: 'group-hover:border-amber-500/50 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.15)]',
      iconBg: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
    },
    {
      title: 'Confirmação automática',
      desc: 'O status do pagamento é verificado em tempo real pelo sistema.',
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      glowColor: 'group-hover:border-emerald-500/50 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.15)]',
      iconBg: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    },
    {
      title: 'Entrega digital',
      desc: 'Após a confirmação, o acesso ao produto será liberado na hora.',
      icon: <Gamepad2 className="w-6 h-6 text-violet-600 dark:text-violet-400" />,
      glowColor: 'group-hover:border-violet-500/50 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.15)]',
      iconBg: 'bg-violet-50 dark:bg-violet-500/10 border-violet-200 dark:border-violet-500/20',
    },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/20 mb-3 inline-block">
          Diferenciais
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Por que escolher a NovaeStore?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Construímos uma experiência de compra direta, sem cadastros longos ou espera desnecessária.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((b, idx) => (
          <motion.div
            key={idx}
            id={`benefit-card-${idx}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: idx * 0.1, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
            className={`group bg-white dark:bg-[#11111a] border border-slate-200/90 dark:border-white/5 rounded-2xl p-6 transition-all duration-300 shadow-sm hover:shadow-lg ${b.glowColor}`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${b.iconBg} group-hover:scale-110 transition-transform duration-300`}>
              {b.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              {b.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed">
              {b.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

