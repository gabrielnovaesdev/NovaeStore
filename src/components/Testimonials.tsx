import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Testimonial } from '../types';

export const Testimonials: React.FC = () => {
  // PLACEHOLDER — SUBSTITUIR POR DEPOIMENTO REAL (Demonstração de layout)
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Gabriel M.',
      role: 'Gamer PC',
      game: 'Grand Theft Auto VI',
      comment: 'A compra foi simples e a interface é muito fácil de usar. O PIX confirmou em segundos e recebi o acesso na mesma hora!',
      rating: 5,
      avatar: 'GM',
    },
    {
      id: '2',
      name: 'Lucas S.',
      role: 'Jogador Competitivo',
      game: 'EA SPORTS FC 27',
      comment: 'Processo direto sem precisar criar contas longas. Muito prático para quem só quer pegar a chave e começar a jogar.',
      rating: 5,
      avatar: 'LS',
    },
    {
      id: '3',
      name: 'Beatriz R.',
      role: 'Entusiasta de RPG',
      game: 'Cyberpunk 2077',
      comment: 'Excelente experiência no celular. Copiei o código do PIX, paguei no app do banco e a tela atualizou na hora.',
      rating: 5,
      avatar: 'BR',
    },
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/20 mb-3 inline-block">
          Avaliações
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          O que nossos clientes dizem
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Opiniões de quem já comprou e ativou seus jogos na NovaeStore.
        </p>

        {/* Developer / Demonstration notice banner */}
        <div className="mt-4 inline-flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/[0.03] px-3 py-1 rounded-md border border-slate-200 dark:border-white/5 font-mono">
          <span>PLACEHOLDER — SUBSTITUIR POR DEPOIMENTO REAL</span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, idx) => (
          <motion.div
            key={t.id}
            id={`testimonial-card-${t.id}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.12, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
            className="bg-white dark:bg-[#11111a] border border-slate-200/90 dark:border-white/5 hover:border-indigo-500/30 rounded-3xl p-8 transition-all duration-300 shadow-sm hover:shadow-lg flex flex-col justify-between"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4 text-amber-500 dark:text-amber-400">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote text */}
              <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed italic mb-6">
                &ldquo;{t.comment}&rdquo;
              </p>
            </div>

            {/* Author details */}
            <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                    {t.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{t.role}</p>
                </div>
              </div>

              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-500/20">
                {t.game.split(' ')[0]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

