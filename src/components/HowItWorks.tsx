import React from 'react';
import { motion } from 'motion/react';
import { Gamepad2, QrCode, KeyRound, ArrowRight, ArrowDown } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Escolha seu produto',
      desc: 'Navegue pelo catálogo completo e escolha o game ou produto digital desejado.',
      icon: <Gamepad2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      tag: 'Catálogo instantâneo',
    },
    {
      num: '02',
      title: 'Pague via PIX',
      desc: 'Informe seu e-mail e gere o pagamento com QR Code dinâmico ou PIX Copia e Cola.',
      icon: <QrCode className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      tag: 'Sem taxas extras',
    },
    {
      num: '03',
      title: 'Receba seu acesso',
      desc: 'Após a confirmação automática do PIX, sua chave e instruções são liberadas na hora.',
      icon: <KeyRound className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      tag: 'Entrega imediata',
    },
  ];

  return (
    <section id="como-funciona" className="py-24 bg-slate-100/70 dark:bg-[#0a0a10] border-y border-slate-200 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      {/* Background glow lines */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-indigo-500/5 dark:bg-indigo-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/20 mb-3 inline-block">
            Passo a Passo
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
            Como funciona a NovaeStore
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            Compre seu jogo em menos de 1 minuto em apenas três passos simples.
          </p>
        </motion.div>

        {/* Steps Grid with Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className="relative flex flex-col"
            >
              <div
                id={`how-it-works-step-${idx + 1}`}
                className="bg-white dark:bg-[#12121e] border border-slate-200 dark:border-white/10 hover:border-indigo-500/40 rounded-3xl p-8 transition-all duration-300 shadow-sm hover:shadow-xl dark:hover:shadow-[0_10px_30px_rgba(99,102,241,0.15)] flex-1 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number & Icon Header */}
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-500 font-mono">
                      {step.num}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-indigo-600 dark:text-indigo-300 font-semibold">
                  <span>{step.tag}</span>
                  <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-500" />
                </div>
              </div>

              {/* Desktop arrow connector */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-[#161626] border border-slate-200 dark:border-indigo-500/30 items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-md">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}

              {/* Mobile down arrow */}
              {idx < steps.length - 1 && (
                <div className="flex md:hidden justify-center my-2 text-indigo-600 dark:text-indigo-400">
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

