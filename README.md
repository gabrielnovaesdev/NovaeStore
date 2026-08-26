<div align="center">

# 🛍️ NovaeStore

**Loja virtual moderna com checkout integrado e pagamentos via Pix**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)

[Reportar Bug](../../issues) · [Sugerir Feature](../../issues)

</div>

---

## 📋 Sobre o Projeto

O **NovaeStore** é uma loja virtual (landing page + checkout) construída em **React + TypeScript**, com backend serverless em **Supabase**. O fluxo de compra inclui geração de pagamento via **Pix** (PushinPay), acompanhamento do status do pagamento em tempo real e consulta de entrega.

## ✨ Funcionalidades

- 🏠 Landing page completa (Hero, Benefícios, Como Funciona, Depoimentos, FAQ)
- 🛒 Vitrine de produtos com grid, cards e carrinho lateral (Cart Drawer)
- 🔔 Notificações de carrinho (Cart Toast) e botão flutuante de carrinho
- 🌗 Alternância de tema claro/escuro (Theme Toggle)
- ✨ Animações e efeitos visuais (fundo com partículas, spotlight, marquee de tecnologias)
- 💀 Skeleton loading para melhor percepção de carregamento
- 💳 Checkout com geração de pagamento Pix (PushinPay)
- ⏱️ Polling automático de status do pagamento
- 📦 Consulta de status de entrega
- 🔔 Webhook para confirmação de pagamento em tempo real
- 🗄️ Banco de dados com migrations (produtos, pedidos, eventos de pagamento) e RLS habilitado

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Frontend | React + TypeScript + Vite |
| Backend | Supabase (Edge Functions + Postgres) |
| Pagamentos | PushinPay (Pix) |
| Build | npm / Bun |

## 🚀 Como Rodar Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão LTS recomendada)

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/gabrielnovaesdev/NovaeStore.git
cd NovaeStore
```

**2. Instale as dependências**
```bash
npm install
```

**3. Configure as variáveis de ambiente**

Copie o arquivo de exemplo e preencha com suas chaves:
```bash
cp .env.example .env.local
```

**4. Rode a aplicação**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou na porta indicada no terminal).

### Build de produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

## 📁 Estrutura do Projeto

```
NovaeStore/
├── public/               # Arquivos estáticos públicos
├── src/
│   ├── assets/           # Imagens e arquivos usados no código
│   ├── components/       # Componentes da interface
│   │   ├── skeletons/        # Estados de carregamento (skeleton loading)
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── CartDrawer.tsx    # Carrinho lateral
│   │   ├── CartToast.tsx     # Notificação de item no carrinho
│   │   ├── FloatingCartButton.tsx
│   │   ├── ThemeToggle.tsx   # Alternância claro/escuro
│   │   ├── ParticleWaveCanvas.tsx  # Efeito visual de fundo
│   │   ├── TechMarquee.tsx   # Marquee de tecnologias
│   │   └── ...
│   ├── context/          # Contextos globais (ex: carrinho, tema)
│   ├── data/             # Dados estáticos (produtos)
│   ├── hooks/            # Hooks customizados (polling de pagamento, spotlight)
│   ├── services/         # Integração com API/backend
│   ├── types/            # Tipagens TypeScript
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── functions/        # Edge Functions
│   │   ├── _shared/          # Código compartilhado (cors, validação, clients)
│   │   ├── create-payment/   # Geração do pagamento Pix
│   │   ├── get-delivery/     # Consulta de status de entrega
│   │   ├── payment-status/   # Consulta de status do pagamento
│   │   └── pushinpay-webhook/# Webhook de confirmação de pagamento
│   ├── migrations/       # Migrations do banco (produtos, pedidos, RLS)
│   └── config.toml
├── .env.example
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

1. Faça um fork do projeto
2. Crie sua branch (`git checkout -b feature/nova-feature`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Envie para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença especificada no arquivo `LICENSE` (adicione um arquivo de licença caso ainda não tenha um).

---

<div align="center">

Feito por [Gabriel Novaes](https://github.com/gabrielnovaesdev)

</div>
