import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../types';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Como recebo meu produto?',
      answer: 'Após a confirmação automática do pagamento via PIX, o acesso ao produto (código de ativação ou instruções) é liberado imediatamente na mesma tela de checkout e também enviado para o seu e-mail cadastrado.',
    },
    {
      question: 'Preciso criar uma conta?',
      answer: 'Não! Nossa proposta é proporcionar um checkout ágil e sem atrito. Você só precisa escolher o produto, informar seu e-mail para identificação da compra e realizar o pagamento via PIX.',
    },
    {
      question: 'Preciso informar meu e-mail?',
      answer: 'Sim, o e-mail é fundamental para identificar sua compra de forma segura, enviar o comprovante de pagamento e garantir que você tenha um backup de acesso à sua chave digital a qualquer momento.',
    },
    {
      question: 'Como funciona o pagamento via PIX?',
      answer: 'Ao clicar em "Gerar PIX", o sistema gera um QR Code dinâmico e o código "PIX Copia e Cola". Você pode escanear o QR Code pelo aplicativo do seu banco ou copiar o código e colar na opção "PIX Copia e Cola" do seu app bancário.',
    },
    {
      question: 'Quanto tempo demora para confirmar?',
      answer: 'A confirmação do PIX é praticamente instantânea. Nosso sistema realiza a verificação contínua do status e atualiza a tela automaticamente em poucos segundos após o banco processar a transferência.',
    },
    {
      question: 'Posso comprar pelo celular?',
      answer: 'Com certeza! A plataforma NovaeStore foi 100% projetada com foco em dispositivos móveis. Você pode copiar o código PIX com um toque e alternar para o app do seu banco sem perder o progresso da compra.',
    },
    {
      question: 'Como acesso meu produto?',
      answer: 'Assim que o pagamento for aprovado, a interface exibirá a confirmação verde com o botão "Acessar meu produto", disponibilizando a chave digital e o link direto para ativação na plataforma correspondente (Steam, EA App, Epic Games, etc.).',
    },
    {
      question: 'Como entro em contato com o suporte?',
      answer: 'Nosso time de suporte está disponível pelo e-mail oficial: suporte@novaestore.com. Responderemos suas dúvidas sobre ativação, pedidos ou dúvidas gerais no menor tempo possível.',
    },
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="text-center mb-16"
      >
        <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-500/20 mb-3 inline-block">
          Tire suas dúvidas
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Perguntas Frequentes (FAQ)
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
          Tudo o que você precisa saber sobre o processo de compra, PIX e entrega digital.
        </p>
      </motion.div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <motion.div
              key={idx}
              id={`faq-item-${idx}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: 'easeOut' }}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                isOpen
                  ? 'bg-white dark:bg-[#12121e] border-indigo-500/50 shadow-md dark:shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                  : 'bg-white/80 dark:bg-[#0f0f18] border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/10 hover:bg-white dark:hover:bg-[#12121c]'
              }`}
            >
              <button
                id={`faq-toggle-${idx}`}
                onClick={() => toggleAccordion(idx)}
                className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-slate-900 dark:text-white text-base sm:text-lg">
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? 'bg-indigo-600 text-white rotate-180'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out px-6 overflow-hidden ${
                  isOpen ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 pb-0 opacity-0'
                }`}
              >
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed border-t border-slate-100 dark:border-white/5 pt-4">
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

