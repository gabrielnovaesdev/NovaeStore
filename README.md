<div align="center">
# 🛍️ NovaeStore

**E-commerce moderno com integração de IA, pagamentos e backend serverless**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_API-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)

[Ver no AI Studio](https://ai.studio/apps/d67834cc-8b81-4812-bc2f-1bab6052e3df) · [Reportar Bug](../../issues) · [Sugerir Feature](../../issues)

</div>

---

## 📋 Sobre o Projeto

O **NovaeStore** é uma aplicação de e-commerce que combina uma interface moderna com recursos de inteligência artificial (via **Gemini API**) e um backend serverless construído sobre **Supabase**, incluindo funções para processamento de pagamentos, status de entrega e webhooks.

## ✨ Funcionalidades

- 🤖 Integração com **Google Gemini** para recursos de IA
- 💳 Processamento de pagamentos (**PushinPay**)
- 📦 Acompanhamento de status de entrega
- 🔔 Webhooks para eventos de pagamento em tempo real
- ⚡ Backend serverless com **Supabase Functions**

## 🛠️ Tecnologias Utilizadas

| Camada | Tecnologia |
|---|---|
| Frontend | Vite + TypeScript |
| IA | Google Gemini API |
| Backend | Supabase (Functions, Migrations) |
| Pagamentos | PushinPay |

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

Crie (ou edite) o arquivo [`.env.local`](.env.local) na raiz do projeto e adicione sua chave da API do Gemini:
```env
GEMINI_API_KEY=sua_chave_aqui
```

**4. Rode a aplicação**
```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou na porta indicada no terminal).

## 📁 Estrutura do Projeto

```
NovaeStore/
├── supabase/
│   ├── functions/
│   │   ├── _shared/
│   │   ├── create-payment/
│   │   ├── get-delivery/
│   │   ├── payment-status/
│   │   └── pushinpay-webhook/
│   ├── migrations/
│   └── config.toml
├── .env.local
└── package.json
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

</div>
