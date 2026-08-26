import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Gamepad2 } from 'lucide-react';

interface FinalCTAProps {
  onExploreClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onExploreClick }) => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background glow and decorative circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-pink-500/10 dark:from-indigo-600/20 dark:via-violet-600/20 dark:to-pink-600/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-gradient-to-b from-slate-900 to-indigo-950 dark:from-[#131322] dark:to-[#0d0d16] border border-indigo-500/30 text-white rounded-3xl p-8 sm:p-14 text-center shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            Comece a jogar agora mesmo
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-6">
            Encontre seu próximo jogo.
          </h2>

          <p className="text-slate-200 dark:text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Escolha seu produto, faça o pagamento e tenha uma experiência de compra simples e rápida com liberação automática.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="final-cta-explore-btn"
              onClick={onExploreClick}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-base px-10 py-4 rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:shadow-[0_0_40px_rgba(99,102,241,0.8)] transition-all duration-300 flex items-center justify-center gap-2 group active:scale-95"
            >
              <Gamepad2 className="w-5 h-5" />
              <span>Explorar produtos</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

