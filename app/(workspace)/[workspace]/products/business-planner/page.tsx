'use client'

import { useState } from 'react'
import { Briefcase, TrendingUp, Target, Users, DollarSign, AlertCircle, Download, Share2, Save, RefreshCw, ChevronDown, ChevronRight, CheckCircle, Building2, BarChart3, FileText, Lightbulb, Shield, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DataTable } from '@/components/tables/DataTable'
import {
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  Cell,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts'

export default function BusinessBuilderToolkit() {
  const [selectedIndustry, setSelectedIndustry] = useState<'retail' | 'hospitality' | 'manufacturing' | 'services' | 'tech'>('retail')
  const [selectedMarket, setSelectedMarket] = useState<'riyadh' | 'jeddah' | 'dammam' | 'nationwide'>('riyadh')
  const [selectedTimeline, setSelectedTimeline] = useState<'6m' | '1y' | '3y' | '5y'>('3y')
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<'feasibility' | 'competitors' | 'projections'>('feasibility')

  // Financial projections over 5 years
  const financialProjectionsData = [
    { year: 'Y1', revenue: 1200, costs: 980, profit: 220, margin: 18 },
    { year: 'Y2', revenue: 1850, costs: 1350, profit: 500, margin: 27 },
    { year: 'Y3', revenue: 2600, costs: 1820, profit: 780, margin: 30 },
    { year: 'Y4', revenue: 3450, costs: 2380, profit: 1070, margin: 31 },
    { year: 'Y5', revenue: 4200, costs: 2890, profit: 1310, margin: 31 }
  ]

  // Icon mapping
  const iconMap: Record<string, any> = {
    'Market Demand': Users,
    'Competition Level': Target,
    'Regulatory Environment': Shield,
    'Capital Requirements': DollarSign,
    'Market Entry Barriers': AlertCircle,
    'Growth Potential': TrendingUp
  }

  // Feasibility metrics
  const feasibilityData = [
    {
      factor: 'Market Demand',
      score: 85,
      status: 'Strong',
      insight: 'Growing consumer base with 12% YoY increase',
      color: 'green'
    },
    {
      factor: 'Competition Level',
      score: 62,
      status: 'Moderate',
      insight: '8 major competitors, 45% market concentration',
      color: 'orange'
    },
    {
      factor: 'Regulatory Environment',
      score: 78,
      status: 'Favorable',
      insight: 'Clear licensing process, supportive SME policies',
      color: 'green'
    },
    {
      factor: 'Capital Requirements',
      score: 70,
      status: 'Moderate',
      insight: 'SR 2.5M initial investment, 18-month breakeven',
      color: 'orange'
    },
    {
      factor: 'Market Entry Barriers',
      score: 55,
      status: 'Moderate',
      insight: 'Established brands, moderate switching costs',
      color: 'orange'
    },
    {
      factor: 'Growth Potential',
      score: 92,
      status: 'Excellent',
      insight: 'Vision 2030 aligned, 25% projected CAGR',
      color: 'green'
    }
  ]

  // Competitor landscape
  const competitorsData = [
    {
      company: 'Market Leader Co.',
      marketShare: 28,
      revenue: '~SR 450M',
      strengths: 'Brand recognition, wide distribution',
      weaknesses: 'Higher prices, legacy systems',
      threat: 'High',
      strategy: 'Differentiate on service & technology'
    },
    {
      company: 'Growth Star Inc.',
      marketShare: 18,
      revenue: '~SR 290M',
      strengths: 'Digital presence, younger demographic',
      weaknesses: 'Limited offline presence',
      threat: 'Medium',
      strategy: 'Focus on omnichannel experience'
    },
    {
      company: 'Traditional Player',
      marketShare: 15,
      revenue: '~SR 240M',
      strengths: 'Established relationships, loyalty',
      weaknesses: 'Slow innovation, aging customer base',
      threat: 'Low',
      strategy: 'Target emerging segments'
    },
    {
      company: 'Budget Option Ltd.',
      marketShare: 12,
      revenue: '~SR 190M',
      strengths: 'Low prices, cost efficiency',
      weaknesses: 'Quality perception, limited services',
      threat: 'Medium',
      strategy: 'Compete on value-added services'
    },
    {
      company: 'Premium Brand',
      marketShare: 10,
      revenue: '~SR 160M',
      strengths: 'Quality, premium positioning',
      weaknesses: 'Limited market reach, high costs',
      threat: 'Low',
      strategy: 'Middle-market positioning'
    }
  ]

  // Market entry strategy phases
  const strategyPhasesData = [
    {
      phase: 'Phase 1: Foundation',
      duration: '3-6 months',
      investment: 'SR 800K',
      milestones: ['Business registration', 'Location secured', 'Initial hiring', 'Brand development'],
      status: 'ready',
      risk: 'Low'
    },
    {
      phase: 'Phase 2: Setup',
      duration: '3-4 months',
      investment: 'SR 1.2M',
      milestones: ['Infrastructure build-out', 'Inventory procurement', 'Staff training', 'Systems integration'],
      status: 'pending',
      risk: 'Medium'
    },
    {
      phase: 'Phase 3: Soft Launch',
      duration: '2-3 months',
      investment: 'SR 300K',
      milestones: ['Beta operations', 'Customer feedback', 'Process optimization', 'Marketing campaign'],
      status: 'pending',
      risk: 'Medium'
    },
    {
      phase: 'Phase 4: Scale',
      duration: '6-12 months',
      investment: 'SR 500K',
      milestones: ['Full operations', 'Market expansion', 'Partnership development', 'Revenue growth'],
      status: 'pending',
      risk: 'Medium-High'
    }
  ]

  // SWOT Analysis data
  const swotData = [
    { category: 'Market Opportunity', value: 95, color: '#10b981' },
    { category: 'Team Capability', value: 82, color: '#3b82f6' },
    { category: 'Financial Strength', value: 75, color: '#8b5cf6' },
    { category: 'Brand Position', value: 68, color: '#f59e0b' },
    { category: 'Operational Readiness', value: 78, color: '#06b6d4' },
    { category: 'Risk Management', value: 85, color: '#10b981' }
  ]

  // Revenue breakdown by category
  const revenueBreakdownData = [
    { category: 'Product Sales', value: 45, color: '#3b82f6' },
    { category: 'Services', value: 30, color: '#10b981' },
    { category: 'Subscriptions', value: 15, color: '#8b5cf6' },
    { category: 'Other', value: 10, color: '#f59e0b' }
  ]

  // Key milestones
  const milestonesData = [
    { milestone: 'Business Plan Finalized', target: 'Month 1', status: 'completed', progress: 100 },
    { milestone: 'Funding Secured', target: 'Month 2', status: 'completed', progress: 100 },
    { milestone: 'Location Acquired', target: 'Month 3', status: 'in_progress', progress: 75 },
    { milestone: 'Team Hired', target: 'Month 4', status: 'in_progress', progress: 40 },
    { milestone: 'Operations Launch', target: 'Month 6', status: 'pending', progress: 0 },
    { milestone: 'Break-even Point', target: 'Month 18', status: 'pending', progress: 0 }
  ]

  const MetricCard = ({ title, value, change, changeType, period, icon: Icon, alert }: any) => (
    <div className="bg-white rounded-lg p-2 border border-gray-200 hover:shadow-md transition-all group relative">
      {alert && (
        <div className="absolute top-1.5 right-1.5">
          <AlertCircle className="h-2.5 w-2.5 text-orange-500" />
        </div>
      )}
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-0.5">
            <Icon className="h-3 w-3 text-emerald-600" />
            <span className="text-[10px] font-medium text-gray-600">{title}</span>
          </div>
          <div className="text-lg font-semibold text-gray-900 mb-0.5">{value}</div>
          <div className="text-[9px] text-gray-500">{period}</div>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          {change && (
            <Badge className={`h-3.5 text-[9px] px-1 border-0 ${changeType === 'up' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
              {changeType === 'up' ? '↑' : '→'} {change}
            </Badge>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-full bg-gray-50 flex" style={{ zoom: 0.85 }}>
      {/* Analysis Panel */}
      <div
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex-shrink-0 ${
          leftPanelCollapsed ? 'w-0' : 'w-64'
        } overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          <div className="px-2 py-1.5 border-b border-gray-200 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-gray-700">Business Builder</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0"
              onClick={() => setLeftPanelCollapsed(true)}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 pb-4">
            <div className="mb-4">
              <p className="text-[11px] text-gray-500">Configure your business strategy analysis</p>
            </div>

          {/* Industry Selection */}
          <div className="mb-4">
            <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Industry</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value as any)}
              className="w-full px-2 py-1.5 text-[11px] border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="retail">Retail & E-commerce</option>
              <option value="hospitality">Hospitality & Tourism</option>
              <option value="manufacturing">Manufacturing</option>
              <option value="services">Professional Services</option>
              <option value="tech">Technology & SaaS</option>
            </select>
          </div>

          {/* Market Selection */}
          <div className="mb-4">
            <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Target Market</label>
            <div className="space-y-1">
              {(['riyadh', 'jeddah', 'dammam', 'nationwide'] as const).map((market) => (
                <button
                  key={market}
                  onClick={() => setSelectedMarket(market)}
                  className={`w-full px-2 py-1.5 text-[11px] font-medium rounded border text-left transition-colors ${
                    selectedMarket === market
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {market === 'riyadh' ? 'Riyadh' : market === 'jeddah' ? 'Jeddah' : market === 'dammam' ? 'Dammam' : 'Nationwide'}
                </button>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-4">
            <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Planning Horizon</label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['6m', '1y', '3y', '5y'] as const).map((timeline) => (
                <button
                  key={timeline}
                  onClick={() => setSelectedTimeline(timeline)}
                  className={`px-2 py-1.5 text-[11px] font-medium rounded border transition-colors ${
                    selectedTimeline === timeline
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {timeline === '6m' ? '6 Months' : timeline === '1y' ? '1 Year' : timeline === '3y' ? '3 Years' : '5 Years'}
                </button>
              ))}
            </div>
          </div>

          {/* Strategy Checklist */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <h4 className="text-[11px] font-semibold text-gray-900 mb-2">Strategy Checklist</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-1.5">
                <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600">Market research completed</p>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600">Financial model validated</p>
              </div>
              <div className="flex items-start gap-1.5">
                <Clock className="h-3 w-3 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600">Regulatory approval pending</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            {leftPanelCollapsed && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setLeftPanelCollapsed(false)}
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </Button>
            )}
            <div>
              <h1 className="text-base font-semibold text-gray-900">Business Builder Toolkit</h1>
              <p className="text-[11px] text-gray-500">Comprehensive market entry & feasibility analysis • Last updated: 1 hour ago</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 text-[11px]">
              <Download className="h-3 w-3 mr-1" />
              Export Plan
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-[11px]">
              <Share2 className="h-3 w-3 mr-1" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-[11px]">
              <Save className="h-3 w-3 mr-1" />
              Save
            </Button>
            <Button variant="outline" size="sm" className="h-7 text-[11px]">
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-3">
            {/* Key Metrics */}
            <div className="grid grid-cols-6 gap-2">
              <MetricCard
                title="Total Investment"
                value="SR 2.8M"
                change="Moderate"
                changeType="neutral"
                period="Initial capital"
                icon={DollarSign}
              />
              <MetricCard
                title="Breakeven Point"
                value="18 Months"
                change={null}
                changeType={null}
                period="Projected timeline"
                icon={Clock}
              />
              <MetricCard
                title="Market Size"
                value="SR 1.6B"
                change="12% YoY"
                changeType="up"
                period="Target segment"
                icon={Target}
              />
              <MetricCard
                title="Competition"
                value="Moderate"
                change="8 players"
                changeType="neutral"
                period="Market landscape"
                icon={Users}
              />
              <MetricCard
                title="5Y Revenue"
                value="SR 4.2M"
                change="31% margin"
                changeType="up"
                period="Year 5 projection"
                icon={TrendingUp}
              />
              <MetricCard
                title="Feasibility Score"
                value="78/100"
                change="Strong"
                changeType="up"
                period="Overall rating"
                icon={CheckCircle}
              />
            </div>

            {/* Financial Projections Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold text-gray-900">5-Year Financial Projections</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="h-4 text-[9px]">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></div>
                    Revenue
                  </Badge>
                  <Badge variant="outline" className="h-4 text-[9px]">
                    <div className="w-2 h-2 rounded-full bg-orange-500 mr-1"></div>
                    Costs
                  </Badge>
                  <Badge variant="outline" className="h-4 text-[9px]">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                    Profit
                  </Badge>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={financialProjectionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="costs" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Dual Charts */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-xs font-semibold text-gray-900 mb-2">Business Readiness Analysis</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <RadarChart data={swotData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="category" tick={{ fontSize: 9 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 9 }} />
                    <Radar dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Tooltip contentStyle={{ fontSize: '11px' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-xs font-semibold text-gray-900 mb-2">Revenue Stream Breakdown</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={revenueBreakdownData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                      label={({ category, value }) => `${category}: ${value}%`}
                    >
                      {revenueBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 px-3 py-2 flex items-center gap-4">
                {(['feasibility', 'competitors', 'projections'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[11px] font-medium px-2 py-1 rounded transition-colors ${
                      activeTab === tab
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab === 'feasibility' ? 'Feasibility Analysis' : tab === 'competitors' ? 'Competitive Landscape' : 'Strategy & Milestones'}
                  </button>
                ))}
              </div>

              <div className="p-3">
                {activeTab === 'feasibility' && (
                  <DataTable
                    data={feasibilityData}
                    columns={[
                      {
                        header: 'Factor',
                        accessorKey: 'factor',
                        cell: ({ row }: any) => {
                          const Icon = iconMap[row.factor] || Users
                          return (
                            <div className="flex items-center gap-2">
                              {Icon && <Icon className="h-3.5 w-3.5 text-emerald-600" />}
                              <span className="text-[11px] font-medium">{row.factor}</span>
                            </div>
                          )
                        }
                      },
                      {
                        header: 'Score',
                        accessorKey: 'score',
                        cell: ({ row }: any) => (
                          <div className="flex items-center gap-1.5">
                            <div className="w-20 bg-gray-100 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${
                                  row.score >= 80 ? 'bg-green-500' :
                                  row.score >= 60 ? 'bg-orange-500' :
                                  'bg-red-500'
                                }`}
                                style={{ width: `${row.score}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-medium text-gray-700 w-8">{row.score}</span>
                          </div>
                        )
                      },
                      {
                        header: 'Status',
                        accessorKey: 'status',
                        cell: ({ row }: any) => (
                          <Badge className={`h-4 text-[9px] ${
                            row.status === 'Strong' || row.status === 'Favorable' || row.status === 'Excellent' ? 'bg-green-50 text-green-700' :
                            row.status === 'Moderate' ? 'bg-orange-50 text-orange-700' :
                            'bg-red-50 text-red-700'
                          } border-0`}>
                            {row.status}
                          </Badge>
                        )
                      },
                      {
                        header: 'Insight',
                        accessorKey: 'insight',
                        cell: ({ row }: any) => <span className="text-[10px] text-gray-600">{row.insight}</span>
                      }
                    ]}
                  />
                )}

                {activeTab === 'competitors' && (
                  <DataTable
                    data={competitorsData}
                    columns={[
                      {
                        header: 'Company',
                        accessorKey: 'company',
                        cell: ({ row }: any) => (
                          <div>
                            <div className="text-[11px] font-medium">{row.company}</div>
                            <div className="text-[9px] text-gray-500">{row.revenue}</div>
                          </div>
                        )
                      },
                      {
                        header: 'Market Share',
                        accessorKey: 'marketShare',
                        cell: ({ row }: any) => (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-16">
                              <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${row.marketShare}%` }} />
                            </div>
                            <span className="text-[10px] text-gray-700 w-8">{row.marketShare}%</span>
                          </div>
                        )
                      },
                      {
                        header: 'Strengths',
                        accessorKey: 'strengths',
                        cell: ({ row }: any) => <span className="text-[10px] text-gray-600">{row.strengths}</span>
                      },
                      {
                        header: 'Weaknesses',
                        accessorKey: 'weaknesses',
                        cell: ({ row }: any) => <span className="text-[10px] text-gray-600">{row.weaknesses}</span>
                      },
                      {
                        header: 'Threat Level',
                        accessorKey: 'threat',
                        cell: ({ row }: any) => (
                          <Badge className={`h-4 text-[9px] ${
                            row.threat === 'High' ? 'bg-red-50 text-red-700' :
                            row.threat === 'Medium' ? 'bg-orange-50 text-orange-700' :
                            'bg-green-50 text-green-700'
                          } border-0`}>
                            {row.threat}
                          </Badge>
                        )
                      },
                      {
                        header: 'Counter Strategy',
                        accessorKey: 'strategy',
                        cell: ({ row }: any) => <span className="text-[10px] text-emerald-600 font-medium">{row.strategy}</span>
                      }
                    ]}
                  />
                )}

                {activeTab === 'projections' && (
                  <div className="space-y-3">
                    <DataTable
                      data={strategyPhasesData}
                      columns={[
                        {
                          header: 'Phase',
                          accessorKey: 'phase',
                          cell: ({ row }: any) => (
                            <div>
                              <div className="text-[11px] font-medium">{row.phase}</div>
                              <div className="text-[9px] text-gray-500">{row.duration}</div>
                            </div>
                          )
                        },
                        {
                          header: 'Investment',
                          accessorKey: 'investment',
                          cell: ({ row }: any) => <span className="text-[11px] font-medium text-emerald-600">{row.investment}</span>
                        },
                        {
                          header: 'Status',
                          accessorKey: 'status',
                          cell: ({ row }: any) => (
                            <Badge className={`h-4 text-[9px] ${
                              row.status === 'ready' ? 'bg-green-50 text-green-700' :
                              row.status === 'pending' ? 'bg-gray-100 text-gray-700' :
                              'bg-blue-50 text-blue-700'
                            } border-0`}>
                              {row.status === 'ready' ? 'Ready' : 'Pending'}
                            </Badge>
                          )
                        },
                        {
                          header: 'Risk',
                          accessorKey: 'risk',
                          cell: ({ row }: any) => (
                            <Badge className={`h-4 text-[9px] ${
                              row.risk.includes('Low') ? 'bg-green-50 text-green-700' :
                              row.risk.includes('High') ? 'bg-red-50 text-red-700' :
                              'bg-orange-50 text-orange-700'
                            } border-0`}>
                              {row.risk}
                            </Badge>
                          )
                        },
                        {
                          header: 'Key Milestones',
                          accessorKey: 'milestones',
                          cell: ({ row }: any) => (
                            <div className="text-[10px] text-gray-600">
                              {row.milestones.slice(0, 2).join(', ')} +{row.milestones.length - 2} more
                            </div>
                          )
                        }
                      ]}
                    />

                    <div className="bg-white rounded-lg border border-gray-200 p-3">
                      <h3 className="text-xs font-semibold text-gray-900 mb-2">Implementation Timeline</h3>
                      <div className="space-y-2">
                        {milestonesData.map((milestone, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-32 text-[10px] text-gray-600">{milestone.milestone}</div>
                            <div className="flex-1 bg-gray-100 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  milestone.status === 'completed' ? 'bg-green-500' :
                                  milestone.status === 'in_progress' ? 'bg-blue-500' :
                                  'bg-gray-300'
                                }`}
                                style={{ width: `${milestone.progress}%` }}
                              />
                            </div>
                            <span className="text-[10px] text-gray-500 w-16">{milestone.target}</span>
                            <Badge className={`h-3.5 text-[9px] ${
                              milestone.status === 'completed' ? 'bg-green-50 text-green-700' :
                              milestone.status === 'in_progress' ? 'bg-blue-50 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            } border-0`}>
                              {milestone.status === 'completed' ? 'Done' : milestone.status === 'in_progress' ? 'In Progress' : 'Pending'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
