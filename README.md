# 🚀 SaaS Landing Page com Integração Stripe + GitHub

Uma landing page moderna para SaaS com integração completa com Stripe para pagamentos e GitHub para entrega automática de repositórios.

## ✨ Funcionalidades

- 🎨 **Design Moderno**: Interface responsiva com Tailwind CSS e DaisyUI
- 💳 **Pagamentos Stripe**: Integração completa com checkout e webhooks
- 🔐 **Autenticação GitHub**: Login via OAuth do GitHub
- 📦 **Entrega Automática**: Criação automática de repositórios a partir de template
- 📱 **Responsivo**: Design mobile-first
- ⚡ **Performance**: Otimizado com React Server Components

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + DaisyUI
- **Backend**: Express.js + TypeScript
- **Pagamentos**: Stripe
- **Autenticação**: Supabase
- **GitHub**: Octokit API
- **Deploy**: Vercel/Netlify

## 🚀 Configuração Rápida

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repo.git
cd seu-repo
npm install
```

### 2. Configure as Variáveis de Ambiente

Copie o arquivo `env.example` para `.env`:

```bash
cp env.example .env
```

Configure as seguintes variáveis:

#### Stripe
```env
VITE_STRIPE_SK_HOM=sk_test_sua_chave_secreta
VITE_STRIPE_PK_HOM=pk_test_sua_chave_publica
STRIPE_WEBHOOK_SECRET=whsec_seu_webhook_secret
VITE_STRIPE_STARTERID_HOM=price_id_starter
VITE_STRIPE_PROID_HOM=price_id_pro
VITE_STRIPE_ULTIMATEID_HOM=price_id_ultimate
```

#### GitHub
```env
GITHUB_TOKEN=ghp_seu_token_pessoal
GITHUB_TEMPLATE_REPO=seu-usuario/seu-template-repo
```

#### Supabase
```env
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima
```

### 3. Configure o Stripe

1. Crie uma conta no [Stripe](https://stripe.com)
2. Obtenha suas chaves de API (teste e produção)
3. Crie os produtos e preços no dashboard
4. Configure o webhook para `checkout.session.completed`

### 4. Configure o GitHub

**Opção A: GitHub App (Recomendado para produção)**
1. Crie um [GitHub App](https://github.com/settings/apps) com permissões de organização
2. Instale o app na organização onde quer criar repositórios
3. Gere um token de instalação

**Opção B: Personal Access Token (Para desenvolvimento)**
1. Crie um [Personal Access Token](https://github.com/settings/tokens)
2. Configure o repositório template como público ou privado
3. Certifique-se de que o token tem permissões para:
   - `repo` (repositórios privados)
   - `workflow` (se usar GitHub Actions)

**Opção C: Fallback Automático**
- Se as opções acima não funcionarem, o sistema criará o repositório na sua conta e adicionará o cliente como colaborador

📖 **Veja a documentação completa:** [docs/GITHUB_SETUP.md](docs/GITHUB_SETUP.md)

### 5. Configure o Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Configure a autenticação GitHub OAuth
3. Obtenha as credenciais do projeto

## 🏃‍♂️ Executando o Projeto

### Desenvolvimento

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:5000`

### 🧪 Endpoints de Teste

#### Testar Configuração GitHub
```bash
curl -X POST http://localhost:5000/api/test-github \
  -H "Content-Type: application/json" \
  -d '{"email": "cliente@exemplo.com"}'
```

#### Testar Criação de Repositório
```bash
curl -X POST http://localhost:5000/api/test-create-repo \
  -H "Content-Type: application/json" \
  -d '{"email": "cliente@exemplo.com", "planName": "PRO", "customerName": "João"}'
```

#### Listar Clientes
```bash
curl http://localhost:5000/api/customers
```

### Produção

```bash
npm run build
npm start
```

## 📋 Fluxo de Funcionamento

### 1. Cliente Acessa a Landing Page
- Visualiza os planos disponíveis
- Clica em "CHOOSE PLAN"

### 2. Autenticação
- Se não logado, é redirecionado para login GitHub
- Após login, volta para a página de preços

### 3. Checkout
- Cliente seleciona o plano
- É redirecionado para o Stripe Checkout
- Completa o pagamento

### 4. Página de Sucesso (Sem Webhook)
- Cliente é redirecionado para `/success` com parâmetros
- Página de sucesso chama `/api/create-repository`
- Backend cria repositório no GitHub a partir do template
- Adiciona cliente como colaborador
- Cria issue de boas-vindas

### 5. Entrega
- Cliente vê informações do repositório criado
- Recebe link do repositório
- Pode clonar e começar a desenvolver

### 🔄 Fluxo Alternativo com Webhook
Para usar webhooks (recomendado para produção):
1. Configure o webhook Stripe para `checkout.session.completed`
2. O webhook processará automaticamente a criação do repositório
3. Cliente será redirecionado para página de sucesso com dados já prontos

## 🔧 Estrutura do Projeto

```
├── src/
│   ├── components/          # Componentes React
│   │   ├── Header.tsx      # Header com navegação
│   │   ├── Hero.tsx        # Seção principal
│   │   ├── Pricing.tsx     # Página de preços
│   │   ├── Success.tsx     # Página de sucesso
│   │   └── ...
│   ├── lib/
│   │   ├── supabase.ts     # Configuração Supabase
│   │   └── stripe.ts       # Integração Stripe
│   └── App.tsx             # Componente principal
├── server/
│   ├── index.ts            # Servidor Express
│   ├── routes.ts           # Rotas da API
│   ├── github.ts           # Integração GitHub
│   ├── customers.ts        # Gerenciamento de clientes
│   └── vite.ts             # Configuração Vite
└── package.json
```

## 🎯 Personalização

### Modificar Planos

Edite o array `plans` em `src/components/Pricing.tsx`:

```typescript
const plans = [
  {
    name: 'STARTER',
    price: '$99.90',
    oldPrice: '$149.90',
    priceId: import.meta.env.VITE_STRIPE_STARTERID_HOM,
    // ... outras propriedades
  },
  // ... outros planos
];
```

### Modificar Template GitHub

1. Crie um repositório template no GitHub
2. Configure a variável `GITHUB_TEMPLATE_REPO`
3. Personalize o issue de boas-vindas em `server/github.ts`

### Modificar Design

- Cores: Edite as classes Tailwind CSS
- Componentes: Modifique os componentes em `src/components/`
- Estilos globais: Edite `src/index.css`

## 🔒 Segurança

- ✅ Chaves secretas do Stripe no backend
- ✅ Validação de webhooks
- ✅ Autenticação via GitHub OAuth
- ✅ Tokens GitHub com permissões mínimas
- ✅ Variáveis de ambiente seguras

## 🚀 Deploy

### Vercel

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente
3. Deploy automático

### Netlify

1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente
3. Deploy automático

### Servidor Próprio

1. Build do projeto: `npm run build`
2. Configure um servidor Node.js
3. Configure proxy reverso (nginx)
4. Configure SSL/HTTPS

## 📞 Suporte

- 📧 Email: suporte@seudominio.com
- 💬 Discord: [Link do servidor]
- 🐛 Issues: [GitHub Issues]

## 📄 Licença

MIT License - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Desenvolvido com ❤️ para acelerar seu projeto!** 