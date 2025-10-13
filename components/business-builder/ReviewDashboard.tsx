'use client'

import { useMemo } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Shield,
  Package,
  AlertTriangle,
  Building2,
  CreditCard,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Zap,
  Globe
} from 'lucide-react'
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import type { BusinessArchetype } from '@/lib/data/businessArchetypes'
import type { BusinessTemplate } from '@/lib/data/businessTemplates'

interface ReviewDashboardProps {
  archetype: BusinessArchetype
  template: BusinessTemplate
}

export function ReviewDashboard({ archetype, template }: ReviewDashboardProps) {
  // Calculate financials
  const financials = useMemo(() => {
    const { assumptions, market } = template
    const avgPrice = Object.values(assumptions.pricing)[0]
    const unitPrice = Array.isArray(avgPrice) ? (avgPrice[0] + avgPrice[1]) / 2 : avgPrice
    const avgTransaction = (market.avg_transaction[0] + market.avg_transaction[1]) / 2
    const customersPerDay = 30
    const monthlyRevenue = avgTransaction * customersPerDay * 30

    const cogs = assumptions.cogs_percentage
      ? monthlyRevenue * assumptions.cogs_percentage
      : customersPerDay * 30 * (assumptions.cogs_per_unit || 0)

    const rent = (assumptions.space_m2_required[0] + assumptions.space_m2_required[1]) / 2 * assumptions.rent_m2.secondary
    const totalCosts = cogs + assumptions.labor_month + rent + assumptions.energy_month
    const profit = monthlyRevenue - totalCosts
    const margin = (profit / monthlyRevenue) * 100

    const breakEvenRevenue = totalCosts / (1 - (assumptions.cogs_percentage || 0.3))
    const breakEvenDays = (breakEvenRevenue / (monthlyRevenue / 30))

    return {
      monthlyRevenue,
      cogs,
      labor: assumptions.labor_month,
      rent,
      energy: assumptions.energy_month,
      totalCosts,
      profit,
      margin,
      breakEvenDays: Math.round(breakEvenDays),
      initialInvestment: (assumptions.initial_investment[0] + assumptions.initial_investment[1]) / 2,
      roi: ((profit * 12) / ((assumptions.initial_investment[0] + assumptions.initial_investment[1]) / 2)) * 100
    }
  }, [template])

  // Generate projections
  const projections = useMemo(() => {
    const months = []
    let cumRevenue = 0
    let cumCosts = 0

    for (let i = 0; i < 6; i++) {
      const growth = 1 + (template.market.market_growth_rate / 12) * i
      const revenue = financials.monthlyRevenue * growth
      const costs = financials.totalCosts * (1 + 0.02 * i) // 2% cost inflation/month
      cumRevenue += revenue
      cumCosts += costs

      months.push({
        month: `M${i + 1}`,
        revenue: Math.round(revenue),
        costs: Math.round(costs),
        profit: Math.round(revenue - costs),
        cumProfit: Math.round(cumRevenue - cumCosts)
      })
    }

    return months
  }, [financials, template])

  // Entry Score calculation
  const entryScore = useMemo(() => {
    const { weights } = template
    const scores = {
      regulatory: template.regulatory.difficulty === 'easy' ? 85 : template.regulatory.difficulty === 'medium' ? 65 : 45,
      market: template.market.market_growth_rate > 0.1 ? 90 : template.market.market_growth_rate > 0.05 ? 70 : 50,
      competition: template.competition.market_concentration === 'low' ? 85 : template.competition.market_concentration === 'medium' ? 65 : 40,
      cost: financials.margin > 20 ? 90 : financials.margin > 10 ? 70 : 50,
      talent: 70, // Default
      finance: financials.initialInvestment < 300000 ? 85 : financials.initialInvestment < 500000 ? 70 : 55
    }

    const weighted = Object.entries(weights).reduce((sum, [key, weight]) => {
      return sum + (scores[key as keyof typeof scores] * weight)
    }, 0)

    return Math.round(weighted)
  }, [template, financials])

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

  // Calculate unit economics
  const unitEconomics = useMemo(() => {
    const avgTransaction = (template.market.avg_transaction[0] + template.market.avg_transaction[1]) / 2
    const cogs = template.assumptions.cogs_percentage
      ? avgTransaction * template.assumptions.cogs_percentage
      : template.assumptions.cogs_per_unit || 0
    const grossProfit = avgTransaction - cogs
    const grossMargin = (grossProfit / avgTransaction) * 100

    return {
      avgTransaction,
      cogs,
      grossProfit,
      grossMargin
    }
  }, [template])

  // Calculate working capital
  const workingCapital = useMemo(() => {
    const monthlyRevenue = financials.monthlyRevenue
    const monthlyCogs = financials.cogs
    const receivablesDays = 15 // Assume 15 days AR
    const inventoryDays = 20 // Assume 20 days inventory
    const payablesDays = 30 // Assume 30 days AP

    const ar = (monthlyRevenue / 30) * receivablesDays
    const inventory = (monthlyCogs / 30) * inventoryDays
    const ap = (monthlyCogs / 30) * payablesDays

    return Math.round(ar + inventory - ap)
  }, [financials])

  // Calculate payback period
  const paybackPeriod = useMemo(() => {
    const monthlyProfit = financials.profit
    const initialInvestment = financials.initialInvestment
    return (initialInvestment / monthlyProfit).toFixed(1)
  }, [financials])

  return (
    <div className="space-y-4">
      {/* KPI Cards - More Compact */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <div className="bg-white rounded border border-gray-200 p-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-600 uppercase font-medium">Entry Score</span>
            <Zap className="h-3 w-3 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">{entryScore}/100</div>
          <Badge className={`mt-1 h-4 text-[9px] border-0 ${
            entryScore >= 75 ? 'bg-green-100 text-green-700' :
            entryScore >= 50 ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {entryScore >= 75 ? 'High' : entryScore >= 50 ? 'Med' : 'Low'}
          </Badge>
        </div>

        <div className="bg-white rounded border border-gray-200 p-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-600 uppercase font-medium">Monthly Profit</span>
            <TrendingUp className="h-3 w-3 text-green-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            {(financials.profit / 1000).toFixed(0)}K
          </div>
          <Badge className="mt-1 h-4 text-[9px] bg-green-100 text-green-700 border-0">
            {financials.margin.toFixed(1)}% margin
          </Badge>
        </div>

        <div className="bg-white rounded border border-gray-200 p-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-600 uppercase font-medium">Break-even</span>
            <Target className="h-3 w-3 text-orange-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">{financials.breakEvenDays}d</div>
          <Badge className="mt-1 h-4 text-[9px] bg-orange-100 text-orange-700 border-0">
            {Math.ceil(financials.breakEvenDays / 7)} weeks
          </Badge>
        </div>

        <div className="bg-white rounded border border-gray-200 p-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-600 uppercase font-medium">Investment</span>
            <DollarSign className="h-3 w-3 text-blue-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            {(financials.initialInvestment / 1000).toFixed(0)}K
          </div>
          <Badge className="mt-1 h-4 text-[9px] bg-blue-100 text-blue-700 border-0">
            {financials.roi.toFixed(0)}% ROI
          </Badge>
        </div>

        <div className="bg-white rounded border border-gray-200 p-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-600 uppercase font-medium">Payback</span>
            <Clock className="h-3 w-3 text-purple-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">{paybackPeriod}m</div>
          <Badge className="mt-1 h-4 text-[9px] bg-purple-100 text-purple-700 border-0">
            months
          </Badge>
        </div>

        <div className="bg-white rounded border border-gray-200 p-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] text-gray-600 uppercase font-medium">Working Cap</span>
            <CreditCard className="h-3 w-3 text-indigo-600" />
          </div>
          <div className="text-xl font-bold text-gray-900">
            {(workingCapital / 1000).toFixed(0)}K
          </div>
          <Badge className="mt-1 h-4 text-[9px] bg-indigo-100 text-indigo-700 border-0">
            cycle
          </Badge>
        </div>
      </div>

      {/* Main Grid - 2 columns, more compact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 1. Financial Model */}
        <div className="bg-white rounded border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase">Financial Model</h3>
              <p className="text-[10px] text-gray-600">Monthly P&L + Unit Economics</p>
            </div>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700 font-medium">Revenue</span>
                  <span className="font-semibold text-green-600">
                    +{(financials.monthlyRevenue / 1000).toFixed(0)}K
                  </span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-600 pl-2">• COGS</span>
                  <span className="text-red-600">-{(financials.cogs / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-600 pl-2">• Labor</span>
                  <span className="text-red-600">-{(financials.labor / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-600 pl-2">• Rent</span>
                  <span className="text-red-600">-{(financials.rent / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-600 pl-2">• Energy</span>
                  <span className="text-red-600">-{(financials.energy / 1000).toFixed(0)}K</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-gray-200 font-semibold text-xs">
                  <span className="text-gray-900">Net Profit</span>
                  <span className={financials.profit > 0 ? 'text-green-600' : 'text-red-600'}>
                    {financials.profit > 0 ? '+' : ''}{(financials.profit / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-medium text-gray-700 mb-1.5 uppercase">Unit Economics</div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-600">Avg Transaction</span>
                  <span className="font-semibold text-gray-900">{unitEconomics.avgTransaction.toFixed(0)} EGP</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-600">Unit COGS</span>
                  <span className="text-red-600">-{unitEconomics.cogs.toFixed(0)} EGP</span>
                </div>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-gray-600">Gross Profit</span>
                  <span className="text-green-600">+{unitEconomics.grossProfit.toFixed(0)} EGP</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-gray-200 font-semibold text-[10px]">
                  <span className="text-gray-900">Gross Margin</span>
                  <span className="text-green-600">{unitEconomics.grossMargin.toFixed(1)}%</span>
                </div>
                <div className="mt-2 text-[10px]">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-gray-600">COGS %</span>
                    <span className="font-medium">{((financials.cogs / financials.monthlyRevenue) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">OpEx %</span>
                    <span className="font-medium">{(((financials.labor + financials.rent + financials.energy) / financials.monthlyRevenue) * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-24 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'COGS', value: financials.cogs },
                    { name: 'Labor', value: financials.labor },
                    { name: 'Rent', value: financials.rent },
                    { name: 'Energy', value: financials.energy },
                    { name: 'Profit', value: Math.max(0, financials.profit) }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={20}
                  outerRadius={40}
                  paddingAngle={1}
                  dataKey="value"
                >
                  {[0, 1, 2, 3, 4].map((index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ fontSize: 9, padding: 3 }}
                  formatter={(value: number) => `${(value / 1000).toFixed(0)}K EGP`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. 6-Month Projections */}
        <div className="bg-white rounded border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase">6-Month Projections</h3>
              <p className="text-[10px] text-gray-600">Revenue, costs & cumulative cash</p>
            </div>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </div>

          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projections}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 8 }} />
                <YAxis tick={{ fontSize: 8 }} />
                <Tooltip contentStyle={{ fontSize: 8, padding: 2 }} />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fill="url(#colorRevenue)" strokeWidth={1.5} />
                <Area type="monotone" dataKey="profit" stroke="#10b981" fill="url(#colorProfit)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-2 text-[10px]">
            <div className="bg-blue-50 rounded p-1.5">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-gray-600">Total Revenue</span>
              </div>
              <div className="font-semibold text-gray-900">
                {(projections.reduce((sum, m) => sum + m.revenue, 0) / 1000).toFixed(0)}K EGP
              </div>
            </div>
            <div className="bg-green-50 rounded p-1.5">
              <div className="flex items-center gap-1 mb-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-gray-600">Cum. Profit</span>
              </div>
              <div className="font-semibold text-green-600">
                {(projections[projections.length - 1].cumProfit / 1000).toFixed(0)}K EGP
              </div>
            </div>
            <div className="bg-gray-50 rounded p-1.5">
              <div className="text-gray-600 mb-0.5">Growth Rate</div>
              <div className="font-semibold text-gray-900">
                {(template.market.market_growth_rate * 100).toFixed(1)}% YoY
              </div>
            </div>
          </div>
        </div>

        {/* 3. Market Opportunity */}
        <div className="bg-white rounded border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase">Market Opportunity</h3>
              <p className="text-[10px] text-gray-600">TAM ${template.market.tam_range_local_b[0]}-{template.market.tam_range_local_b[1]}B</p>
            </div>
            <Target className="h-4 w-4 text-gray-400" />
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-green-50 rounded p-2">
                <div className="text-[9px] text-green-700 mb-0.5 uppercase font-medium">Growth</div>
                <div className="text-sm font-bold text-green-600">
                  {(template.market.market_growth_rate * 100).toFixed(1)}%
                </div>
                <div className="text-[8px] text-green-600">YoY</div>
              </div>
              <div className="bg-blue-50 rounded p-2">
                <div className="text-[9px] text-blue-700 mb-0.5 uppercase font-medium">Ticket</div>
                <div className="text-sm font-bold text-blue-600">
                  {((template.market.avg_transaction[0] + template.market.avg_transaction[1]) / 2).toFixed(0)}
                </div>
                <div className="text-[8px] text-blue-600">EGP</div>
              </div>
              <div className="bg-purple-50 rounded p-2">
                <div className="text-[9px] text-purple-700 mb-0.5 uppercase font-medium">Freq</div>
                <div className="text-sm font-bold text-purple-600">
                  {((template.market.customer_freq_per_month[0] + template.market.customer_freq_per_month[1]) / 2).toFixed(1)}x
                </div>
                <div className="text-[8px] text-purple-600">/month</div>
              </div>
            </div>

            <div>
              <div className="text-[9px] text-gray-600 mb-1 uppercase font-medium">Target Segments</div>
              <div className="flex flex-wrap gap-1">
                {template.market.target_customers.map(customer => (
                  <Badge key={customer} className="h-4 text-[9px] bg-purple-100 text-purple-700 border-0 px-1.5">
                    {customer}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100">
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span className="text-gray-600">Market Size</span>
                  <div className="font-semibold text-gray-900">${template.market.tam_range_local_b[1]}B</div>
                </div>
                <div>
                  <span className="text-gray-600">Your Potential</span>
                  <div className="font-semibold text-blue-600">{((financials.monthlyRevenue * 12) / (template.market.tam_range_local_b[1] * 1000000000) * 100).toFixed(3)}%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Competition Landscape */}
        <div className="bg-white rounded border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase">Competition</h3>
              <p className="text-[10px] text-gray-600">{template.competition.intl.length + template.competition.local.length} players identified</p>
            </div>
            <Users className="h-4 w-4 text-gray-400" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-gray-600 uppercase font-medium">Concentration</span>
              <Badge className={`h-4 text-[9px] border-0 ${
                template.competition.market_concentration === 'low' ? 'bg-green-100 text-green-700' :
                template.competition.market_concentration === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {template.competition.market_concentration.toUpperCase()}
              </Badge>
            </div>

            <div>
              <div className="text-[9px] text-gray-600 mb-1 flex items-center gap-1 uppercase font-medium">
                <Globe className="h-2.5 w-2.5" />
                International ({template.competition.intl.length})
              </div>
              <div className="flex flex-wrap gap-1">
                {template.competition.intl.map(comp => (
                  <Badge key={comp} className="h-4 text-[9px] bg-blue-100 text-blue-700 border-0 px-1.5">
                    {comp}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <div className="text-[9px] text-gray-600 mb-1 flex items-center gap-1 uppercase font-medium">
                <Building2 className="h-2.5 w-2.5" />
                Local ({template.competition.local.length})
              </div>
              <div className="flex flex-wrap gap-1">
                {template.competition.local.map(comp => (
                  <Badge key={comp} className="h-4 text-[9px] bg-gray-100 text-gray-700 border-0 px-1.5">
                    {comp}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="pt-1.5 border-t border-gray-100 text-[10px] text-gray-600">
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="h-3 w-3 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>
                  {template.competition.market_concentration === 'high'
                    ? 'High competition - differentiation required'
                    : 'Moderate competition - opportunity exists'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Regulatory Roadmap */}
        <div className="bg-white rounded border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase">Regulatory</h3>
              <p className="text-[10px] text-gray-600">{template.regulatory.permits.length} permits · {template.regulatory.sla_days} days</p>
            </div>
            <Shield className="h-4 w-4 text-gray-400" />
          </div>

          <div className="space-y-1.5 mb-2">
            {template.regulatory.permits.map((permit, index) => (
              <div key={permit} className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-gray-900 leading-tight">{permit}</div>
                </div>
                <span className="text-[9px] text-gray-500">#{index + 1}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
            <div className="bg-gray-50 rounded p-1.5">
              <div className="text-[9px] text-gray-600 mb-0.5 uppercase font-medium">Fees</div>
              <div className="font-semibold text-gray-900 text-[10px]">
                {(template.regulatory.fees_range[0] / 1000).toFixed(0)}-{(template.regulatory.fees_range[1] / 1000).toFixed(0)}K
              </div>
            </div>
            <div className="bg-gray-50 rounded p-1.5">
              <div className="text-[9px] text-gray-600 mb-0.5 uppercase font-medium">Timeline</div>
              <div className="font-semibold text-gray-900 text-[10px]">
                {template.regulatory.sla_days}d
              </div>
            </div>
            <div className="bg-gray-50 rounded p-1.5">
              <div className="text-[9px] text-gray-600 mb-0.5 uppercase font-medium">Level</div>
              <Badge className={`h-3.5 text-[8px] border-0 ${
                template.regulatory.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                template.regulatory.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {template.regulatory.difficulty.toUpperCase()}
              </Badge>
            </div>
          </div>
        </div>

        {/* 6. Risk Assessment */}
        <div className="bg-white rounded border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase">Risk Assessment</h3>
              <p className="text-[10px] text-gray-600">{template.risk_rules.length} risks · {template.risk_rules.filter(r => r.severity === 'high').length} high severity</p>
            </div>
            <AlertTriangle className="h-4 w-4 text-gray-400" />
          </div>

          <div className="space-y-1.5">
            {template.risk_rules.map((risk, index) => (
              <div
                key={risk.key}
                className={`p-2 rounded border ${
                  risk.severity === 'high' ? 'border-red-200 bg-red-50' :
                  risk.severity === 'med' ? 'border-yellow-200 bg-yellow-50' :
                  'border-green-200 bg-green-50'
                }`}
              >
                <div className="flex items-start gap-1.5">
                  <AlertTriangle className={`h-3 w-3 flex-shrink-0 mt-0.5 ${
                    risk.severity === 'high' ? 'text-red-600' :
                    risk.severity === 'med' ? 'text-yellow-600' :
                    'text-green-600'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-medium text-gray-900 leading-tight">{risk.description}</div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Badge className="h-3.5 text-[8px] bg-white border-gray-300 px-1">
                        S:{risk.severity.toUpperCase()}
                      </Badge>
                      <Badge className="h-3.5 text-[8px] bg-white border-gray-300 px-1">
                        L:{risk.likelihood.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Supply Chain */}
        <div className="bg-white rounded border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase">Supply Chain</h3>
              <p className="text-[10px] text-gray-600">{Object.keys(template.supply_inputs).length} inputs tracked</p>
            </div>
            <Package className="h-4 w-4 text-gray-400" />
          </div>

          <div className="space-y-1.5">
            {Object.entries(template.supply_inputs).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-[10px] text-gray-700 capitalize">
                  {key.replace(/_/g, ' ')}
                </span>
                <Badge className={`h-3.5 text-[8px] border-0 px-1.5 ${
                  value === 'high' || value === 'local' ? 'bg-green-100 text-green-700' :
                  value === 'imported' || value === 'regulated' ? 'bg-yellow-100 text-yellow-700' :
                  value === true ? 'bg-blue-100 text-blue-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {typeof value === 'boolean' ? (value ? 'REQ' : 'OPT') : value.toString().toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-gray-100">
            <Button variant="outline" size="sm" className="w-full text-[10px] h-6">
              <ExternalLink className="h-2.5 w-2.5 mr-1" />
              Find Suppliers
            </Button>
          </div>
        </div>

        {/* 8. Financing Options */}
        <div className="bg-white rounded border border-gray-200 p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-xs font-semibold text-gray-900 uppercase">Financing</h3>
              <p className="text-[10px] text-gray-600">3 SME loan matches</p>
            </div>
            <CreditCard className="h-4 w-4 text-gray-400" />
          </div>

          <div className="space-y-1.5">
            {[
              { bank: 'NBE', product: 'SME Growth', rate: '12.5%', amount: '50K-500K', term: '5y' },
              { bank: 'Banque Misr', product: 'Biz Starter', rate: '13.0%', amount: '100K-1M', term: '7y' },
              { bank: 'CIB', product: 'Entrepreneur', rate: '11.5%', amount: '250K-2M', term: '10y' }
            ].map((loan, index) => (
              <div key={index} className="border border-gray-200 rounded p-2 hover:border-blue-500 transition-colors">
                <div className="flex items-start justify-between mb-0.5">
                  <div>
                    <div className="text-[10px] font-medium text-gray-900">{loan.bank}</div>
                    <div className="text-[9px] text-gray-600">{loan.product}</div>
                  </div>
                  <Badge className="h-3.5 text-[8px] bg-green-100 text-green-700 border-0 px-1.5">
                    {loan.rate}
                  </Badge>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] text-gray-600 mt-1">
                  <span>{loan.amount}</span>
                  <span>•</span>
                  <span>{loan.term}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-gray-100">
            <Button variant="outline" size="sm" className="w-full text-[10px] h-6">
              <ChevronRight className="h-2.5 w-2.5 mr-1" />
              View All Loans
            </Button>
          </div>
        </div>
      </div>

      {/* Confidence Indicator - Compact */}
      <div className="bg-blue-50 border border-blue-200 rounded p-3">
        <div className="flex items-start gap-2">
          <CheckCircle2 className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900 mb-0.5 text-xs uppercase">Data Confidence: High</h4>
            <p className="text-[10px] text-blue-800 leading-relaxed">
              Based on verified templates (updated {template.last_verified}). Market data current as of Q4 2025. Customize in Step 3 for your scenario.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
