import {
  LayoutGrid,
  TrendingUp,
  ShoppingCart,
  Briefcase,
  Shield,
  Globe,
  LineChart,
  BarChart3,
  Wallet,
  PieChart,
  Home,
  Target,
  Package,
  Rocket,
  Building2,
  Coins
} from 'lucide-react'
import React from 'react'

export type UserType = 'individual' | 'entity'

export type UserIntent = 'analyze' | 'explore' | 'build'

export type PricingModel = 'one-time' | 'monthly' | 'premium' | 'pay-per-use'

export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  userTypes: UserType[]
  intents: UserIntent[]
  pricingModel: PricingModel[]
  features: string[]
  category: string
  isPremium?: boolean
  comingSoon?: boolean
  route?: string // If it's an existing module
}

export const PRODUCTS: Product[] = [
  // Entity/Business Products
  {
    id: 'economic-forecaster',
    slug: 'economic-forecaster',
    name: 'Economic Forecaster',
    tagline: 'Predict economic trends with confidence',
    description: 'Advanced AI-powered predictive analytics for GDP, inflation, and key economic indicators with scenario modeling and 87% forecast accuracy.',
    icon: TrendingUp,
    userTypes: ['entity'],
    intents: ['analyze'],
    pricingModel: ['one-time', 'monthly'],
    features: [
      'AI-powered ARIMA forecasting',
      'GDP growth predictions (18-month horizon)',
      'Inflation & unemployment forecasts',
      'Multi-scenario analysis (Base/Optimistic/Pessimistic)',
      'Historical trend analysis with 12-month data',
      'Confidence scoring & model accuracy metrics',
      'Interactive forecast visualization',
      'Quarterly breakdown tables'
    ],
    category: 'Analytics',
    isPremium: true,
    route: '/products/economic-forecaster'
  },
  {
    id: 'procurement-optimizer',
    slug: 'procurement-optimizer',
    name: 'Procurement Optimizer',
    tagline: 'Optimize procurement & reduce costs',
    description: 'Intelligent procurement optimization platform analyzing $3.4M+ spend with supplier performance tracking, cost reduction strategies, and automated savings identification.',
    icon: ShoppingCart,
    userTypes: ['entity'],
    intents: ['build'],
    pricingModel: ['monthly', 'premium'],
    features: [
      'Real-time cost & savings tracking',
      'Supplier performance analytics (47 active suppliers)',
      'Multi-strategy optimization (Bulk/Multi-supplier/JIT)',
      'Lead time & efficiency monitoring',
      'Automated opportunity detection ($245K YTD savings)',
      'Contract renewal management',
      'Quality score tracking (4.6/5 average)',
      'Interactive cost trend visualization'
    ],
    category: 'Operations',
    isPremium: true,
    route: '/products/procurement-optimizer'
  },
  {
    id: 'business-planner',
    slug: 'business-planner',
    name: 'Business Planner',
    tagline: 'Build your business strategy',
    description: 'Comprehensive business planning platform with SR 2.8M investment modeling, 18-month breakeven analysis, and 5-year financial projections across multiple industries.',
    icon: Briefcase,
    userTypes: ['entity'],
    intents: ['build'],
    pricingModel: ['one-time'],
    features: [
      'Multi-industry feasibility analysis (78/100 scoring)',
      '5-year financial projections with 31% margin modeling',
      'Competitor landscape mapping (8 major players tracked)',
      '4-phase market entry strategy with timeline & budget',
      'SWOT & business readiness radar analysis',
      'Revenue stream breakdown & allocation planning',
      'Implementation milestone tracking with progress bars',
      'SR 1.6B market size analysis with 12% YoY growth'
    ],
    category: 'Strategy',
    isPremium: true,
    route: '/products/business-planner'
  },
  {
    id: 'regulatory-monitor',
    slug: 'regulatory-monitor',
    name: 'Regulatory Compliance Monitor',
    tagline: 'Stay compliant, stay ahead',
    description: 'Track regulatory changes in real-time with compliance checklists and automated alerts for your industry.',
    icon: Shield,
    userTypes: ['entity'],
    intents: ['build'],
    pricingModel: ['monthly'],
    features: [
      'Real-time regulatory updates',
      'Compliance checklists',
      'Industry-specific regulations',
      'Alert system',
      'Document management',
      'Audit trail'
    ],
    category: 'Compliance',
    comingSoon: true
  },
  {
    id: 'trade-flow-analyzer',
    slug: 'trade-flow-analyzer',
    name: 'Trade Flow Analyzer',
    tagline: 'Understand global trade patterns',
    description: 'Real-time import/export flow tracking across 187 countries with partner analysis, product category breakdowns, and AI-powered market opportunity detection.',
    icon: Globe,
    userTypes: ['entity'],
    intents: ['analyze', 'explore'],
    pricingModel: ['one-time', 'monthly'],
    features: [
      'Real-time trade flow monitoring ($48.2B exports tracked)',
      '187 active trading partner analysis',
      '42 product category breakdowns with trade balance',
      'Regional distribution insights (Asia, EU, Americas, GCC)',
      'Market opportunity scoring (87+ potential markets)',
      'Import/export trend forecasting',
      'Trade surplus/deficit tracking',
      'Supply chain risk detection'
    ],
    category: 'Analytics',
    isPremium: true,
    route: '/products/trade-flow-analyzer'
  },
  {
    id: 'capital-markets-scanner',
    slug: 'capital-markets-scanner',
    name: 'Capital Markets Scanner',
    tagline: 'Investment intelligence',
    description: 'Real-time market intelligence platform tracking $10M+ portfolios across equities, bonds, and commodities with AI-powered opportunity screening and risk analysis.',
    icon: LineChart,
    userTypes: ['entity'],
    intents: ['analyze', 'explore'],
    pricingModel: ['monthly'],
    features: [
      'Real-time market indices monitoring (Tadawul, S&P 500, NASDAQ)',
      '42 active position tracking with portfolio analytics',
      'Investment opportunity scoring (92+ score algorithm)',
      'Risk vs return scatter analysis with portfolio visualization',
      'Multi-asset screening (equities, bonds, commodities, forex)',
      'Custom alert system with severity classification',
      'P/E ratio and dividend yield filtering',
      'Daily volume tracking ($2.8B+ monitored)'
    ],
    category: 'Investment',
    isPremium: true,
    route: '/products/capital-markets-scanner'
  },
  {
    id: 'sector-intelligence',
    slug: 'sector-intelligence',
    name: 'Sector Intelligence Reports',
    tagline: 'Deep industry insights',
    description: 'Industry-specific analysis with sector performance metrics, competitor tracking, and growth forecasts.',
    icon: BarChart3,
    userTypes: ['entity'],
    intents: ['analyze', 'explore'],
    pricingModel: ['one-time', 'monthly'],
    features: [
      'Sector performance metrics',
      'Industry trends',
      'Competitor analysis',
      'Growth forecasts',
      'Market share data',
      'Customizable reports'
    ],
    category: 'Analytics',
    comingSoon: true
  },

  // Individual Products
  {
    id: 'personal-finance',
    slug: 'personal-finance',
    name: 'Personal Finance Dashboard',
    tagline: 'Your financial overview',
    description: 'Track economic indicators that matter to your wallet with inflation monitoring and cost of living insights.',
    icon: Wallet,
    userTypes: ['individual'],
    intents: ['build'],
    pricingModel: ['monthly'],
    features: [
      'Inflation tracking',
      'Interest rate monitoring',
      'Cost of living index',
      'Personal budget impact',
      'Savings recommendations',
      'Financial health score'
    ],
    category: 'Finance',
    comingSoon: true
  },
  {
    id: 'investment-advisor',
    slug: 'investment-advisor',
    name: 'Investment Advisor',
    tagline: 'Smart investment guidance',
    description: 'Get personalized portfolio recommendations based on real market data and risk profiling.',
    icon: PieChart,
    userTypes: ['individual'],
    intents: ['analyze'],
    pricingModel: ['monthly'],
    features: [
      'Investment suggestions',
      'Market trend alerts',
      'Portfolio diversification tips',
      'Risk profiling',
      'Performance tracking',
      'Goal-based investing'
    ],
    category: 'Investment',
    route: '/products/investment-advisor'
  },
  {
    id: 'cost-living-calculator',
    slug: 'cost-living-calculator',
    name: 'Cost of Living Calculator',
    tagline: 'Budget with confidence',
    description: 'Track price trends for essential goods and plan your budget with regional cost comparisons.',
    icon: Home,
    userTypes: ['individual'],
    intents: ['build'],
    pricingModel: ['one-time', 'monthly'],
    features: [
      'Essential goods price tracking',
      'Regional cost comparisons',
      'Budget planning tools',
      'Expense forecasts',
      'Inflation impact calculator',
      'Savings goals'
    ],
    category: 'Finance',
    comingSoon: true
  },
  {
    id: 'career-insights',
    slug: 'career-insights',
    name: 'Career Market Insights',
    tagline: 'Navigate your career path',
    description: 'Salary benchmarking, growing sectors, and skills demand analysis for informed career decisions.',
    icon: Briefcase,
    userTypes: ['individual'],
    intents: ['explore'],
    pricingModel: ['one-time', 'monthly'],
    features: [
      'Salary benchmarking',
      'Growing sectors identification',
      'Skills demand analysis',
      'Career path recommendations',
      'Industry trends',
      'Job market forecasts'
    ],
    category: 'Career',
    comingSoon: true
  },
  {
    id: 'import-cost-estimator',
    slug: 'import-cost-estimator',
    name: 'Import Cost Estimator',
    tagline: 'Know before you buy',
    description: 'Calculate import duties, shipping costs, and restrictions for personal purchases from abroad.',
    icon: Package,
    userTypes: ['individual'],
    intents: ['build'],
    pricingModel: ['pay-per-use', 'monthly'],
    features: [
      'Duty calculator',
      'Shipping cost estimates',
      'Product restrictions checker',
      'Currency conversion',
      'Total landed cost',
      'Customs guidance'
    ],
    category: 'Tools',
    comingSoon: true
  },
  {
    id: 'sme-starter-kit',
    slug: 'sme-starter-kit',
    name: 'SME Starter Kit',
    tagline: 'Launch your small business',
    description: 'Simplified business tools for freelancers and small businesses with market analysis and financial projections.',
    icon: Rocket,
    userTypes: ['individual'],
    intents: ['build'],
    pricingModel: ['one-time'],
    features: [
      'Basic market analysis',
      'Pricing strategies',
      'Startup cost calculator',
      'Simple financial projections',
      'Business plan template',
      'Registration guidance'
    ],
    category: 'Business',
    comingSoon: true
  },
  {
    id: 'property-tracker',
    slug: 'property-tracker',
    name: 'Property Market Tracker',
    tagline: 'Real estate intelligence',
    description: 'Track property prices, mortgage rates, and regional market trends for smart real estate decisions.',
    icon: Building2,
    userTypes: ['individual'],
    intents: ['analyze', 'explore'],
    pricingModel: ['monthly'],
    features: [
      'Property price trends',
      'Mortgage rate tracking',
      'Regional market analysis',
      'Investment potential scoring',
      'Neighborhood comparisons',
      'Price predictions'
    ],
    category: 'Investment',
    comingSoon: true
  },
  {
    id: 'savings-planner',
    slug: 'savings-planner',
    name: 'Savings Goal Planner',
    tagline: 'Reach your financial goals',
    description: 'Plan and track savings goals with inflation-adjusted projections and investment recommendations.',
    icon: Target,
    userTypes: ['individual'],
    intents: ['build'],
    pricingModel: ['one-time', 'monthly'],
    features: [
      'Inflation-adjusted goals',
      'Timeline projections',
      'Investment recommendations',
      'Progress tracking',
      'Automated savings tips',
      'Multiple goal management'
    ],
    category: 'Finance',
    comingSoon: true
  }
]

export function getProductsByUserType(userType: UserType): Product[] {
  return PRODUCTS.filter(product => product.userTypes.includes(userType))
}

export function getProductsByUserTypeAndIntent(userType: UserType, intent: UserIntent): Product[] {
  return PRODUCTS.filter(
    product => product.userTypes.includes(userType) && product.intents.includes(intent)
  )
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(product => product.slug === slug)
}

export function getProductCategories(userType: UserType): string[] {
  const products = getProductsByUserType(userType)
  return [...new Set(products.map(p => p.category))]
}
