import React from 'react';
import { Gamepad2, Mail, ShieldCheck, Zap } from 'lucide-react';

export const Footer: React.FC = () => {
  const footerLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'Produtos', href: '#produtos' },
    { label: 'Ofertas', href: '#ofertas' },
    { label: 'Como funciona', href: '#como-funciona' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Termos de Uso', href: '#termos' },
    { label: 'Privacidade', href: '#privacidade' },
  ];

  return (
    <footer className="bg-slate-100 dark:bg-[#060609] border-t border-slate-200 dark:border-white/5 pt-16 pb-12 text-slate-600 dark:text-slate-400 text-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200 dark:border-white/5">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-600/30">
                <Gamepad2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Novae<span className="text-indigo-600 dark:text-indigo-400">Store</span>
              </span>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm leading-relaxed">
              Games e produtos digitais em um só lugar. Plataforma moderna, segura e com entrega automatizada via PIX.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5" /> Pagamento 100% Protegido
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
                <Zap className="w-3.5 h-3.5" /> Liberação Imediata
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-slate-900 dark:text-white font-bold text-sm tracking-wider uppercase">
              Navegação Rápida
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              {footerLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-slate-900 dark:text-white font-bold text-sm tracking-wider uppercase">
              Atendimento & Suporte
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Dúvidas sobre sua compra ou chave digital? Entre em contato conosco:
            </p>
            <a
              href="mailto:suporte@novaestore.com"
              className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-semibold text-sm transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>suporte@novaestore.com</span>
            </a>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} NovaeStore. Todos os direitos reservados.
          </p>

          <p className="text-center md:text-right max-w-xl text-slate-500 dark:text-slate-400 leading-normal">
            Aviso Legal: Os nomes de jogos, marcas registradas e artes de capa são propriedades de seus respectivos detentores e desenvolvedores.
          </p>
        </div>
      </div>
    </footer>
  );
};

