import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  id?: string;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  id = 'theme-toggle-btn',
  className = '',
}) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id={id}
      type="button"
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-xl sm:rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#141422] dark:hover:bg-[#1e1e32] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-all duration-200 active:scale-95 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${className}`}
      aria-label={isDark ? 'Ativar modo claro' : 'Ativar modo escuro'}
      title={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center text-indigo-400"
            >
              <Moon className="w-5 h-5 fill-indigo-400/20" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center text-amber-500"
            >
              <Sun className="w-5 h-5 fill-amber-500/30 stroke-[2.2]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
};
