# Arqam - Enterprise Analytics Platform

A comprehensive analytics platform built with Next.js 14, TypeScript, and Supabase, designed for enterprise decision-making and data insights.

## 🚀 Features

### Core Modules
- **Economy** - GDP, inflation, employment metrics
- **Trade** - Import/export, trade balance, tariffs
- **Market Entry** - Market sizing, regulations, barriers
- **Price Monitor** - Price monitoring, trends, comparisons
- **Capital Access** - Funding sources, interest rates, investment
- **Regulatory Access** - Compliance, policy changes, requirements
- **Sector Intelligence** - Sector performance, trends, analysis
- **Advisor** - AI-powered insights and recommendations

### Key Capabilities
- 🔐 **Role-Based Access Control (RBAC)** - End User, Org Admin, Data Admin, Platform Admin
- 📊 **Interactive Dashboards** - Drag-and-drop dashboard builder
- 💾 **Saved Views** - Save and share custom analytics views
- 📈 **Real-time Charts** - Powered by Recharts with multiple chart types
- 📤 **Data Export** - CSV/PNG export with plan-based limits
- 🔔 **Scheduled Reports** - Automated report delivery (Pro+)
- 🏢 **Multi-tenant Architecture** - Organization and workspace isolation
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- ⌨️ **Keyboard Shortcuts** - Command palette and quick navigation
- 🌙 **Dark Mode** - Full dark mode support

## 🛠 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI, Framer Motion
- **Charts**: Recharts
- **Tables**: TanStack Table
- **State Management**: Zustand, React Query
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: Supabase Auth
- **Payments**: Stripe + Paymob
- **Monitoring**: Sentry, PostHog
- **Testing**: Vitest, Testing Library, Playwright

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Stripe account (for payments)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone <repository-url>
cd arqam-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp env.example .env.local
```

Update `.env.local` with your configuration:

```env
# App Configuration
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Database
DATABASE_URL=postgresql://postgres:password@localhost:54322/postgres

# Authentication
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Payment Processing
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
PAYMOB_API_KEY=your_paymob_api_key
PAYMOB_INTEGRATION_ID=your_paymob_integration_id

# Email Provider
EMAIL_PROVIDER_KEY=your_email_provider_key
EMAIL_FROM=noreply@arqam.com

# Monitoring & Analytics
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# External Services
SLACK_WEBHOOK_URL=your_slack_webhook_url
WEBHOOK_SECRET=your_webhook_secret

# Feature Flags
NEXT_PUBLIC_FEATURE_FLAGS_ENABLED=true
```

### 4. Set up Supabase

1. Create a new Supabase project
2. Run the database schema:

```bash
npm run db:generate
```

3. Seed the database with sample data:

```bash
npm run db:seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
arqam-platform/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   └── auth/
│   │       ├── login/
│   │       ├── signup/
│   │       ├── forgot/
│   │       └── mfa/
│   ├── (shell)/                  # Main application shell
│   │   ├── economy/              # Economy module
│   │   ├── trade/                # Trade module
│   │   ├── market-entry/         # Market Entry module
│   │   ├── prices/               # Price Monitor module
│   │   ├── capital/              # Capital Access module
│   │   ├── regulatory/           # Regulatory Access module
│   │   ├── sectors/              # Sector Intelligence module
│   │   ├── advisor/              # Advisor module
│   │   ├── views/                # Saved Views
│   │   ├── dashboards/           # Dashboards
│   │   ├── datasets/             # Datasets (optional)
│   │   ├── notifications/        # Notifications
│   │   ├── help/                 # Help & Support
│   │   ├── org/                  # Organization Console
│   │   │   ├── overview/
│   │   │   ├── team/
│   │   │   ├── billing/
│   │   │   ├── settings/
│   │   │   ├── security/
│   │   │   └── audit/
│   │   ├── data/                 # Data Console
│   │   │   ├── sources/
│   │   │   ├── uploads/
│   │   │   ├── catalog/
│   │   │   ├── policies/
│   │   │   ├── quality/
│   │   │   └── lineage/
│   │   ├── admin/                # Admin Hub
│   │   ├── settings/             # User Settings
│   │   └── workspaces/           # Workspace Management
│   └── api/                      # API Routes
├── components/                   # React Components
│   ├── ui/                      # Base UI components (shadcn/ui)
│   ├── shell/                   # Application shell components
│   ├── modules/                 # Module-specific components
│   ├── charts/                  # Chart components
│   ├── tables/                  # Table components
│   ├── filters/                 # Filter components
│   ├── forms/                   # Form components
│   ├── nav/                     # Navigation components
│   ├── org/                     # Organization components
│   ├── billing/                 # Billing components
│   └── audit/                   # Audit components
├── lib/                         # Utility libraries
│   ├── auth/                    # Authentication utilities
│   ├── rbac/                    # Role-based access control
│   ├── entitlements/            # Feature flags and entitlements
│   ├── nav/                     # Navigation configuration
│   ├── modules/                 # Module data and utilities
│   ├── export/                  # Export utilities
│   ├── monitoring/              # Monitoring and analytics
│   └── utils.ts                 # General utilities
├── db/                          # Database files
│   ├── schema.sql               # Database schema
│   ├── seeds.ts                 # Seed data
│   └── migrations/              # Database migrations
├── docs/                        # Documentation
│   ├── BUILD_CHECKLIST.md       # Build progress tracking
│   ├── ARCHITECTURE.md          # System architecture
│   ├── API.md                   # API documentation
│   ├── RBAC.md                  # RBAC documentation
│   └── DEVELOPMENT.md           # Development guide
├── scripts/                     # Build and utility scripts
│   └── checklist.ts             # Build checklist CLI
├── tests/                       # Unit and integration tests
├── e2e/                         # End-to-end tests
└── public/                      # Static assets
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

### Test Coverage

```bash
npm run test:coverage
```

## 📦 Build & Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🔧 Development

### Code Style

This project uses ESLint and Prettier for code formatting:

```bash
npm run lint
npm run lint:fix
```

### Database Management

Generate types from Supabase:

```bash
npm run db:generate
```

Reset database:

```bash
npm run db:reset
```

### Build Checklist

Track development progress using the built-in checklist CLI:

```bash
# Add a new task
npm run checklist add "P1" "Implement user authentication" --owner @dev --due 2024-01-15

# Mark task as done
npm run checklist done "Implement user authentication"

# Link to PR
npm run checklist link "Implement user authentication" --pr https://github.com/org/repo/pull/123

# View progress
npm run checklist list
```

## 🏗 Architecture

### Authentication & Authorization

- **Supabase Auth** for user authentication
- **JWT tokens** with role and organization claims
- **Row Level Security (RLS)** for data isolation
- **Role-based permissions** with granular access control

### Data Layer

- **PostgreSQL** with Supabase
- **Real-time subscriptions** for live data updates
- **Row Level Security** for multi-tenant data isolation
- **Database functions** for complex queries

### Frontend Architecture

- **Next.js 14** with App Router
- **Server Components** for optimal performance
- **Client Components** for interactivity
- **React Query** for data fetching and caching
- **Zustand** for client state management

### UI/UX

- **shadcn/ui** component library
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Responsive design** for all screen sizes
- **Accessibility** (WCAG 2.1 AA compliant)

## 📊 Plans & Pricing

### Free Plan
- 3 saved views
- 1 dashboard
- 1,000 export rows
- 1 seat
- Community support

### Pro Plan ($29/month)
- Unlimited views and dashboards
- 100,000 export rows
- Scheduled reports
- API access (read)
- 5 seats
- Email support

### Enterprise Plan (Custom)
- Unlimited everything
- SSO integration
- Custom roles
- RLS/FLS policies
- Priority support
- Custom branding

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@arqam.com
- 📚 Documentation: [docs.arqam.com](https://docs.arqam.com)
- 🐛 Issues: [GitHub Issues](https://github.com/arqam/platform/issues)
- 💬 Discord: [Arqam Community](https://discord.gg/arqam)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Recharts](https://recharts.org/) - Chart library
- [TanStack Table](https://tanstack.com/table) - Table library
