# 🚀 SaaS Landing Page with Stripe + GitHub Integration

A modern SaaS landing page with full integration for Stripe payments and GitHub for automatic repository delivery.

## ✨ Features

- 🎨 **Modern Design**: Responsive interface with Tailwind CSS and DaisyUI
- 💳 **Stripe Payments**: Full integration with checkout and webhooks
- 🔐 **GitHub Authentication**: Login via GitHub OAuth
- 📦 **Automatic Delivery**: Automatic creation of repositories from template
- 📱 **Responsive**: Mobile-first design
- ⚡ **Performance**: Optimized with React Server Components

## 🛠️ Technologies

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + DaisyUI
- **Backend**: Express.js + TypeScript
- **Payments**: Stripe
- **Authentication**: Supabase
- **GitHub**: Octokit API
- **Deploy**: Vercel/Netlify

## 🚀 Quick Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-user/your-repo.git
cd your-repo
npm install
```

### 2. Configure Environment Variables

Copy the `env.example` file to `.env`:

```bash
cp env.example .env
```

Set the following variables:

#### Stripe
```env
VITE_STRIPE_SK_HOM=sk_test_your_secret_key
VITE_STRIPE_PK_HOM=pk_test_your_public_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
VITE_STRIPE_STARTERID_HOM=price_id_starter
VITE_STRIPE_PROID_HOM=price_id_pro
VITE_STRIPE_ULTIMATEID_HOM=price_id_ultimate
```

#### GitHub
```env
GITHUB_TOKEN=ghp_your_personal_token
GITHUB_TEMPLATE_REPO=your-user/your-template-repo
```

#### Supabase
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Configure Stripe

1. Create an account at [Stripe](https://stripe.com)
2. Get your API keys (test and production)
3. Create products and prices in the dashboard
4. Set up the webhook for `checkout.session.completed`

### 4. Configure GitHub

**Option A: GitHub App (Recommended for production)**
1. Create a [GitHub App](https://github.com/settings/apps) with organization permissions
2. Install the app in the organization where you want to create repositories
3. Generate an installation token

**Option B: Personal Access Token (For development)**
1. Create a [Personal Access Token](https://github.com/settings/tokens)
2. Set the template repository as public or private
3. Make sure the token has permissions for:
   - `repo` (private repositories)
   - `workflow` (if using GitHub Actions)

**Option C: Automatic Fallback**
- If the above options do not work, the system will create the repository in your account and add the client as a collaborator

📖 **See the full documentation:** [docs/GITHUB_SETUP.md](docs/GITHUB_SETUP.md)

### 5. Configure Supabase

1. Create a project at [Supabase](https://supabase.com)
2. Set up GitHub OAuth authentication
3. Get your project credentials

## 🏃‍♂️ Running the Project

### Development

```bash
npm run dev
```

The server will be available at `http://localhost:5000`

### 🧪 Test Endpoints

#### Test GitHub Configuration
```bash
curl -X POST http://localhost:5000/api/test-github \
  -H "Content-Type: application/json" \
  -d '{"email": "client@example.com"}'
```

#### Test Repository Creation
```bash
curl -X POST http://localhost:5000/api/test-create-repo \
  -H "Content-Type: application/json" \
  -d '{"email": "client@example.com", "planName": "PRO", "customerName": "John"}'
```

#### List Clients
```bash
curl http://localhost:5000/api/customers
```

### Production

```bash
npm run build
npm start
```

## 📋 How It Works

### 1. Client Visits the Landing Page
- Sees available plans
- Clicks on "CHOOSE PLAN"

### 2. Authentication
- If not logged in, redirected to GitHub login
- After login, returns to the pricing page

### 3. Checkout
- Client selects a plan
- Redirected to Stripe Checkout
- Completes payment

### 4. Success Page (Without Webhook)
- Client is redirected to `/success` with parameters
- Success page calls `/api/create-repository`
- Backend creates the repository on GitHub from the template
- Adds client as collaborator
- Creates welcome issue

### 5. Delivery
- Client sees information about the created repository
- Receives repository link
- Can clone and start developing

### 🔄 Alternative Flow with Webhook
To use webhooks (recommended for production):
1. Set up the Stripe webhook for `checkout.session.completed`
2. The webhook will automatically process repository creation
3. Client will be redirected to the success page with data ready

## 🔧 Project Structure

```
├── src/
│   ├── components/          # React Components
│   │   ├── Header.tsx      # Header with navigation
│   │   ├── Hero.tsx        # Main section
│   │   ├── Pricing.tsx     # Pricing page
│   │   ├── Success.tsx     # Success page
│   │   └── ...
│   ├── lib/
│   │   ├── supabase.ts     # Supabase configuration
│   │   └── stripe.ts       # Stripe integration
│   └── App.tsx             # Main component
├── server/
│   ├── index.ts            # Express server
│   ├── routes.ts           # API routes
│   ├── github.ts           # GitHub integration
│   ├── customers.ts        # Client management
│   └── vite.ts             # Vite configuration
└── package.json
```

## 🎯 Customization

### Edit Plans

Edit the `plans` array in `src/components/Pricing.tsx`:

```typescript
const plans = [
  {
    name: 'STARTER',
    price: '$99.90',
    oldPrice: '$149.90',
    priceId: import.meta.env.VITE_STRIPE_STARTERID_HOM,
    // ... other properties
  },
  // ... other plans
];
```

### Change GitHub Template

1. Create a template repository on GitHub
2. Set the `GITHUB_TEMPLATE_REPO` variable
3. Customize the welcome issue in `server/github.ts`

### Change Design

- Colors: Edit Tailwind CSS classes
- Components: Modify components in `src/components/`
- Global styles: Edit `src/index.css`

## 🔒 Security

- ✅ Stripe secret keys in the backend
- ✅ Webhook validation
- ✅ Authentication via GitHub OAuth
- ✅ GitHub tokens with minimal permissions
- ✅ Secure environment variables

## 🚀 Deploy

### Vercel

1. Connect your repository to Vercel
2. Set environment variables
3. Automatic deploy

### Netlify

1. Connect your repository to Netlify
2. Set environment variables
3. Automatic deploy

### Own Server

1. Build the project: `npm run build`
2. Set up a Node.js server
3. Set up reverse proxy (nginx)
4. Set up SSL/HTTPS

## 📞 Support

- 📧 Email: support@yourdomain.com
- 💬 Discord: [Server link]
- 🐛 Issues: [GitHub Issues]

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contribution

1. Fork the project
2. Create a branch for your feature
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Developed with ❤️ to accelerate your project!** 