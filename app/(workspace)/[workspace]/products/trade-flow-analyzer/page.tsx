'use client'

import { useState, useMemo } from 'react'
import { Globe, TrendingUp, TrendingDown, Package, Users, MapPin, Download, Share2, Save, RefreshCw, ChevronDown, ChevronRight, AlertTriangle, CheckCircle, BarChart3, ArrowUpRight, ArrowDownRight } from 'lucide-react'
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
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
  Cell,
  PieChart,
  Pie,
  Sankey
} from 'recharts'

export default function TradeFlowAnalyzer() {
  const [selectedTimeRange, setSelectedTimeRange] = useState<'6m' | '1y' | '2y' | '5y'>('1y')
  const [selectedView, setSelectedView] = useState<'imports' | 'exports' | 'both'>('both')
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'gcc' | 'asia' | 'eu' | 'americas'>('all')
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<'partners' | 'products' | 'opportunities'>('partners')

  // Trade flow data over time
  const tradeFlowData = [
    { month: 'Jan', imports: 2400, exports: 3200, balance: 800 },
    { month: 'Feb', imports: 2600, exports: 3100, balance: 500 },
    { month: 'Mar', imports: 2800, exports: 3400, balance: 600 },
    { month: 'Apr', imports: 2700, exports: 3600, balance: 900 },
    { month: 'May', imports: 2900, exports: 3800, balance: 900 },
    { month: 'Jun', imports: 3100, exports: 4000, balance: 900 },
    { month: 'Jul', imports: 3000, exports: 4200, balance: 1200 },
    { month: 'Aug', imports: 3200, exports: 4100, balance: 900 },
    { month: 'Sep', imports: 3400, exports: 4300, balance: 900 },
    { month: 'Oct', imports: 3300, exports: 4500, balance: 1200 },
    { month: 'Nov', imports: 3500, exports: 4400, balance: 900 },
    { month: 'Dec', imports: 3600, exports: 4600, balance: 1000 }
  ]

  // Top trading partners data
  const tradingPartnersData = [
    {
      country: 'China',
      flag: '🇨🇳',
      imports: 850,
      exports: 620,
      balance: -230,
      growth: '+12%',
      trend: 'up',
      topProducts: 'Electronics, Machinery',
      tradeVolume: 1470
    },
    {
      country: 'United States',
      flag: '🇺🇸',
      imports: 680,
      exports: 920,
      balance: 240,
      growth: '+8%',
      trend: 'up',
      topProducts: 'Oil & Gas, Chemicals',
      tradeVolume: 1600
    },
    {
      country: 'India',
      flag: '🇮🇳',
      imports: 520,
      exports: 780,
      balance: 260,
      growth: '+15%',
      trend: 'up',
      topProducts: 'Textiles, Food Products',
      tradeVolume: 1300
    },
    {
      country: 'Germany',
      flag: '🇩🇪',
      imports: 450,
      exports: 380,
      balance: -70,
      growth: '+5%',
      trend: 'up',
      topProducts: 'Machinery, Automotive',
      tradeVolume: 830
    },
    {
      country: 'Japan',
      flag: '🇯🇵',
      imports: 420,
      exports: 290,
      balance: -130,
      growth: '-2%',
      trend: 'down',
      topProducts: 'Electronics, Vehicles',
      tradeVolume: 710
    },
    {
      country: 'South Korea',
      flag: '🇰🇷',
      imports: 380,
      exports: 340,
      balance: -40,
      growth: '+6%',
      trend: 'up',
      topProducts: 'Electronics, Steel',
      tradeVolume: 720
    },
    {
      country: 'UAE',
      flag: '🇦🇪',
      imports: 310,
      exports: 560,
      balance: 250,
      growth: '+18%',
      trend: 'up',
      topProducts: 'Re-exports, Services',
      tradeVolume: 870
    },
    {
      country: 'United Kingdom',
      flag: '🇬🇧',
      imports: 290,
      exports: 410,
      balance: 120,
      growth: '+4%',
      trend: 'up',
      topProducts: 'Services, Chemicals',
      tradeVolume: 700
    }
  ]

  // Product categories trade data
  const productCategoriesData = [
    { category: 'Oil & Gas', imports: 850, exports: 1820, balance: 970, share: 28 },
    { category: 'Chemicals', imports: 680, exports: 980, balance: 300, share: 18 },
    { category: 'Machinery', imports: 920, exports: 620, balance: -300, share: 15 },
    { category: 'Electronics', imports: 780, exports: 450, balance: -330, share: 12 },
    { category: 'Food Products', imports: 520, exports: 680, balance: 160, share: 11 },
    { category: 'Textiles', imports: 310, exports: 420, balance: 110, share: 8 },
    { category: 'Automotive', imports: 290, exports: 180, balance: -110, share: 5 },
    { category: 'Other', imports: 250, exports: 250, balance: 0, share: 3 }
  ]

  // Market opportunities
  const opportunitiesData = [
    {
      market: 'Vietnam',
      flag: '🇻🇳',
      opportunity: 'Chemicals Export',
      potential: 'High',
      score: 87,
      growth: '+24% YoY',
      reason: 'Rapidly growing manufacturing sector, low current penetration',
      category: 'Chemicals',
      estimatedValue: '$145M'
    },
    {
      market: 'Brazil',
      flag: '🇧🇷',
      opportunity: 'Machinery Export',
      potential: 'High',
      score: 82,
      growth: '+18% YoY',
      reason: 'Infrastructure development boom, strong demand signals',
      category: 'Machinery',
      estimatedValue: '$120M'
    },
    {
      market: 'Indonesia',
      flag: '🇮🇩',
      opportunity: 'Food Products',
      potential: 'Medium',
      score: 76,
      growth: '+15% YoY',
      reason: 'Population growth, rising middle class consumption',
      category: 'Food',
      estimatedValue: '$98M'
    },
    {
      market: 'Turkey',
      flag: '🇹🇷',
      opportunity: 'Textiles Export',
      potential: 'Medium',
      score: 73,
      growth: '+12% YoY',
      reason: 'Strategic location, growing fashion industry',
      category: 'Textiles',
      estimatedValue: '$85M'
    },
    {
      market: 'Egypt',
      flag: '🇪🇬',
      opportunity: 'Construction Materials',
      potential: 'Medium',
      score: 71,
      growth: '+20% YoY',
      reason: 'Mega infrastructure projects, expanding construction sector',
      category: 'Materials',
      estimatedValue: '$76M'
    }
  ]

  // Regional distribution
  const regionalData = [
    { name: 'Asia', value: 45, color: '#3b82f6' },
    { name: 'Europe', value: 25, color: '#8b5cf6' },
    { name: 'Americas', value: 18, color: '#10b981' },
    { name: 'GCC', value: 8, color: '#f59e0b' },
    { name: 'Africa', value: 4, color: '#ef4444' }
  ]

  const MetricCard = ({ title, value, change, changeType, period, icon: Icon, alert }: any) => (
    <div className="bg-white rounded-lg p-2 border border-gray-200 hover:shadow-md transition-all group relative">
      {alert && (
        <div className="absolute top-1.5 right-1.5">
          <AlertTriangle className="h-2.5 w-2.5 text-orange-500" />
        </div>
      )}
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-0.5">
            <Icon className="h-3 w-3 text-purple-600" />
            <span className="text-[10px] font-medium text-gray-600">{title}</span>
          </div>
          <div className="text-lg font-semibold text-gray-900 mb-0.5">{value}</div>
          <div className="text-[9px] text-gray-500">{period}</div>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <Badge className={`h-3.5 text-[9px] px-1 border-0 ${changeType === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {changeType === 'up' ? '↑' : '↓'} {change}
          </Badge>
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
            <span className="text-[10px] font-semibold text-gray-700">Trade Flow Analysis</span>
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
              <p className="text-[11px] text-gray-500">Configure your trade flow analysis parameters</p>
            </div>

          {/* Time Range */}
          <div className="mb-4">
            <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Time Range</label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['6m', '1y', '2y', '5y'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedTimeRange(range)}
                  className={`px-2 py-1.5 text-[11px] font-medium rounded border transition-colors ${
                    selectedTimeRange === range
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {range === '6m' ? '6 Months' : range === '1y' ? '1 Year' : range === '2y' ? '2 Years' : '5 Years'}
                </button>
              ))}
            </div>
          </div>

          {/* View Selection */}
          <div className="mb-4">
            <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Trade View</label>
            <div className="space-y-1">
              {(['imports', 'exports', 'both'] as const).map((view) => (
                <button
                  key={view}
                  onClick={() => setSelectedView(view)}
                  className={`w-full px-2 py-1.5 text-[11px] font-medium rounded border text-left transition-colors ${
                    selectedView === view
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {view === 'imports' ? 'Imports Only' : view === 'exports' ? 'Exports Only' : 'Imports & Exports'}
                </button>
              ))}
            </div>
          </div>

          {/* Region Filter */}
          <div className="mb-4">
            <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Region Filter</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as any)}
              className="w-full px-2 py-1.5 text-[11px] border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="all">All Regions</option>
              <option value="gcc">GCC Countries</option>
              <option value="asia">Asia Pacific</option>
              <option value="eu">European Union</option>
              <option value="americas">Americas</option>
            </select>
          </div>

          {/* Trade Insights */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <h4 className="text-[11px] font-semibold text-gray-900 mb-2">Quick Insights</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-1.5">
                <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600">Trade surplus maintained for 8 consecutive months</p>
              </div>
              <div className="flex items-start gap-1.5">
                <TrendingUp className="h-3 w-3 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600">Export growth accelerating in Q4 (+18% QoQ)</p>
              </div>
              <div className="flex items-start gap-1.5">
                <AlertTriangle className="h-3 w-3 text-orange-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600">Import dependency risk in electronics sector</p>
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
              <h1 className="text-base font-semibold text-gray-900">Trade Flow Analyzer</h1>
              <p className="text-[11px] text-gray-500">Comprehensive import/export analysis • Last updated: 2 hours ago</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-7 text-[11px]">
              <Download className="h-3 w-3 mr-1" />
              Export
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
                title="Total Exports"
                value="$48.2B"
                change="14.2%"
                changeType="up"
                period="Last 12 months"
                icon={TrendingUp}
              />
              <MetricCard
                title="Total Imports"
                value="$37.5B"
                change="8.5%"
                changeType="up"
                period="Last 12 months"
                icon={TrendingDown}
              />
              <MetricCard
                title="Trade Balance"
                value="$10.7B"
                change="24.3%"
                changeType="up"
                period="Surplus"
                icon={BarChart3}
              />
              <MetricCard
                title="Trading Partners"
                value="187"
                change="12"
                changeType="up"
                period="Active countries"
                icon={Globe}
              />
              <MetricCard
                title="Product Categories"
                value="42"
                change="3"
                changeType="up"
                period="Major categories"
                icon={Package}
              />
              <MetricCard
                title="Export Growth"
                value="14.2%"
                change="2.8pp"
                changeType="up"
                period="YoY acceleration"
                icon={ArrowUpRight}
                alert={false}
              />
            </div>

            {/* Trade Flow Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold text-gray-900">Monthly Trade Flow</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="h-4 text-[9px]">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                    Imports
                  </Badge>
                  <Badge variant="outline" className="h-4 text-[9px]">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    Exports
                  </Badge>
                  <Badge variant="outline" className="h-4 text-[9px]">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                    Balance
                  </Badge>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={tradeFlowData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="imports" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="exports" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Line type="monotone" dataKey="balance" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            {/* Dual Charts: Regional Distribution + Top Products */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-xs font-semibold text-gray-900 mb-2">Regional Trade Distribution</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <PieChart>
                    <Pie
                      data={regionalData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      dataKey="value"
                      label={({ name, value }) => `${name} ${value}%`}
                    >
                      {regionalData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: '11px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-xs font-semibold text-gray-900 mb-2">Top Product Categories by Value</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={productCategoriesData.slice(0, 6)} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" tick={{ fontSize: 10 }} />
                    <YAxis dataKey="category" type="category" tick={{ fontSize: 10 }} width={80} />
                    <Tooltip contentStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="exports" fill="#10b981" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="imports" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 px-3 py-2 flex items-center gap-4">
                {(['partners', 'products', 'opportunities'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[11px] font-medium px-2 py-1 rounded transition-colors ${
                      activeTab === tab
                        ? 'bg-purple-50 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab === 'partners' ? 'Trading Partners' : tab === 'products' ? 'Product Categories' : 'Market Opportunities'}
                  </button>
                ))}
              </div>

              <div className="p-3">
                {activeTab === 'partners' && (
                  <DataTable
                    data={tradingPartnersData}
                    columns={[
                      {
                        header: 'Country',
                        accessorKey: 'country',
                        cell: ({ row }: any) => (
                          <div className="flex items-center gap-2">
                            <span className="text-base">{row.flag}</span>
                            <span className="text-[11px] font-medium">{row.country}</span>
                          </div>
                        )
                      },
                      {
                        header: 'Trade Volume',
                        accessorKey: 'tradeVolume',
                        cell: ({ row }: any) => <span className="text-[11px]">${row.tradeVolume}M</span>
                      },
                      {
                        header: 'Imports',
                        accessorKey: 'imports',
                        cell: ({ row }: any) => <span className="text-[11px] text-blue-600">${row.imports}M</span>
                      },
                      {
                        header: 'Exports',
                        accessorKey: 'exports',
                        cell: ({ row }: any) => <span className="text-[11px] text-green-600">${row.exports}M</span>
                      },
                      {
                        header: 'Balance',
                        accessorKey: 'balance',
                        cell: ({ row }: any) => (
                          <span className={`text-[11px] font-medium ${row.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${Math.abs(row.balance)}M {row.balance >= 0 ? '↑' : '↓'}
                          </span>
                        )
                      },
                      {
                        header: 'Growth',
                        accessorKey: 'growth',
                        cell: ({ row }: any) => (
                          <Badge className={`h-4 text-[9px] ${row.trend === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} border-0`}>
                            {row.growth}
                          </Badge>
                        )
                      },
                      {
                        header: 'Top Products',
                        accessorKey: 'topProducts',
                        cell: ({ row }: any) => <span className="text-[10px] text-gray-500">{row.topProducts}</span>
                      }
                    ]}
                  />
                )}

                {activeTab === 'products' && (
                  <DataTable
                    data={productCategoriesData}
                    columns={[
                      {
                        header: 'Category',
                        accessorKey: 'category',
                        cell: ({ row }: any) => <span className="text-[11px] font-medium">{row.category}</span>
                      },
                      {
                        header: 'Imports',
                        accessorKey: 'imports',
                        cell: ({ row }: any) => <span className="text-[11px] text-blue-600">${row.imports}M</span>
                      },
                      {
                        header: 'Exports',
                        accessorKey: 'exports',
                        cell: ({ row }: any) => <span className="text-[11px] text-green-600">${row.exports}M</span>
                      },
                      {
                        header: 'Balance',
                        accessorKey: 'balance',
                        cell: ({ row }: any) => (
                          <span className={`text-[11px] font-medium ${row.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ${Math.abs(row.balance)}M {row.balance >= 0 ? '↑' : '↓'}
                          </span>
                        )
                      },
                      {
                        header: 'Market Share',
                        accessorKey: 'share',
                        cell: ({ row }: any) => (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                              <div className="bg-purple-600 h-1.5 rounded-full" style={{ width: `${row.share}%` }} />
                            </div>
                            <span className="text-[10px] text-gray-600 w-8">{row.share}%</span>
                          </div>
                        )
                      }
                    ]}
                  />
                )}

                {activeTab === 'opportunities' && (
                  <DataTable
                    data={opportunitiesData}
                    columns={[
                      {
                        header: 'Market',
                        accessorKey: 'market',
                        cell: ({ row }: any) => (
                          <div className="flex items-center gap-2">
                            <span className="text-base">{row.flag}</span>
                            <div>
                              <div className="text-[11px] font-medium">{row.market}</div>
                              <div className="text-[9px] text-gray-500">{row.category}</div>
                            </div>
                          </div>
                        )
                      },
                      {
                        header: 'Opportunity',
                        accessorKey: 'opportunity',
                        cell: ({ row }: any) => <span className="text-[11px]">{row.opportunity}</span>
                      },
                      {
                        header: 'Score',
                        accessorKey: 'score',
                        cell: ({ row }: any) => (
                          <div className="flex items-center gap-1.5">
                            <div className="w-16 bg-gray-100 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${row.score >= 80 ? 'bg-green-500' : 'bg-orange-500'}`}
                                style={{ width: `${row.score}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-medium text-gray-700">{row.score}</span>
                          </div>
                        )
                      },
                      {
                        header: 'Potential',
                        accessorKey: 'potential',
                        cell: ({ row }: any) => (
                          <Badge className={`h-4 text-[9px] ${row.potential === 'High' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'} border-0`}>
                            {row.potential}
                          </Badge>
                        )
                      },
                      {
                        header: 'Est. Value',
                        accessorKey: 'estimatedValue',
                        cell: ({ row }: any) => <span className="text-[11px] font-medium text-purple-600">{row.estimatedValue}</span>
                      },
                      {
                        header: 'Growth',
                        accessorKey: 'growth',
                        cell: ({ row }: any) => <span className="text-[10px] text-gray-600">{row.growth}</span>
                      },
                      {
                        header: 'Reason',
                        accessorKey: 'reason',
                        cell: ({ row }: any) => <span className="text-[10px] text-gray-500">{row.reason}</span>
                      }
                    ]}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
