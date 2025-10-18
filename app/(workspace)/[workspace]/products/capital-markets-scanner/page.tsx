'use client'

import { useState } from 'react'
import { LineChart as LineChartIcon, TrendingUp, TrendingDown, Activity, DollarSign, AlertCircle, Download, Share2, Save, RefreshCw, ChevronDown, ChevronRight, CheckCircle, Target, Shield, Zap } from 'lucide-react'
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
  Scatter,
  ScatterChart,
  ZAxis
} from 'recharts'

export default function CapitalMarketsScanner() {
  const [selectedAssetClass, setSelectedAssetClass] = useState<'all' | 'equities' | 'bonds' | 'commodities' | 'forex'>('all')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<'all' | 'low' | 'medium' | 'high'>('all')
  const [selectedRegion, setSelectedRegion] = useState<'all' | 'gcc' | 'emerging' | 'developed'>('all')
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState<'opportunities' | 'portfolio' | 'alerts'>('opportunities')

  // Market indices performance
  const marketIndicesData = [
    { time: '9:00', sp500: 4200, nasdaq: 13000, dow: 33500, tadawul: 11200 },
    { time: '10:00', sp500: 4215, nasdaq: 13050, dow: 33600, tadawul: 11250 },
    { time: '11:00', sp500: 4225, nasdaq: 13100, dow: 33650, tadawul: 11280 },
    { time: '12:00', sp500: 4210, nasdaq: 13080, dow: 33580, tadawul: 11240 },
    { time: '13:00', sp500: 4230, nasdaq: 13120, dow: 33700, tadawul: 11300 },
    { time: '14:00', sp500: 4245, nasdaq: 13150, dow: 33750, tadawul: 11320 },
    { time: '15:00', sp500: 4260, nasdaq: 13180, dow: 33800, tadawul: 11350 },
    { time: '16:00', sp500: 4255, nasdaq: 13170, dow: 33780, tadawul: 11340 }
  ]

  // Investment opportunities
  const opportunitiesData = [
    {
      asset: 'SABIC',
      ticker: '2010.SR',
      type: 'Equity',
      sector: 'Materials',
      price: 'SR 98.40',
      change: '+2.8%',
      volume: '8.2M',
      score: 92,
      rating: 'Strong Buy',
      targetPrice: 'SR 112',
      upside: '+13.8%',
      risk: 'Medium',
      pe: 15.2,
      dividend: '4.2%'
    },
    {
      asset: 'Saudi Aramco',
      ticker: '2222.SR',
      type: 'Equity',
      sector: 'Energy',
      price: 'SR 32.50',
      change: '+1.5%',
      volume: '42.5M',
      score: 89,
      rating: 'Buy',
      targetPrice: 'SR 36',
      upside: '+10.8%',
      risk: 'Low',
      pe: 12.8,
      dividend: '5.1%'
    },
    {
      asset: 'Al Rajhi Bank',
      ticker: '1120.SR',
      type: 'Equity',
      sector: 'Financials',
      price: 'SR 87.20',
      change: '+3.2%',
      volume: '5.8M',
      score: 87,
      rating: 'Buy',
      targetPrice: 'SR 95',
      upside: '+8.9%',
      risk: 'Low',
      pe: 18.5,
      dividend: '3.8%'
    },
    {
      asset: 'STC',
      ticker: '7010.SR',
      type: 'Equity',
      sector: 'Telecom',
      price: 'SR 42.30',
      change: '+1.8%',
      volume: '3.2M',
      score: 84,
      rating: 'Buy',
      targetPrice: 'SR 48',
      upside: '+13.5%',
      risk: 'Medium',
      pe: 14.2,
      dividend: '4.5%'
    },
    {
      asset: 'ACWA Power',
      ticker: '2082.SR',
      type: 'Equity',
      sector: 'Utilities',
      price: 'SR 156.80',
      change: '+4.2%',
      volume: '1.8M',
      score: 91,
      rating: 'Strong Buy',
      targetPrice: 'SR 180',
      upside: '+14.8%',
      risk: 'Medium',
      pe: 22.5,
      dividend: '2.8%'
    },
    {
      asset: 'Saudi Bonds 2035',
      ticker: 'SA.GOV.2035',
      type: 'Bond',
      sector: 'Government',
      price: 'SR 98.5',
      change: '+0.3%',
      volume: '250M',
      score: 78,
      rating: 'Hold',
      targetPrice: 'SR 100',
      upside: '+1.5%',
      risk: 'Low',
      pe: null,
      dividend: '4.8%'
    },
    {
      asset: 'Gold Futures',
      ticker: 'GC',
      type: 'Commodity',
      sector: 'Precious Metals',
      price: '$2,042',
      change: '+1.2%',
      volume: '180K',
      score: 82,
      rating: 'Buy',
      targetPrice: '$2,150',
      upside: '+5.3%',
      risk: 'High',
      pe: null,
      dividend: null
    },
    {
      asset: 'Brent Crude',
      ticker: 'BZ',
      type: 'Commodity',
      sector: 'Energy',
      price: '$84.20',
      change: '+2.5%',
      volume: '420K',
      score: 85,
      rating: 'Buy',
      targetPrice: '$92',
      upside: '+9.3%',
      risk: 'High',
      pe: null,
      dividend: null
    }
  ]

  // Portfolio holdings
  const portfolioData = [
    { asset: 'Saudi Aramco', allocation: 28, value: 2800000, return: '+12.5%', risk: 'Low' },
    { asset: 'SABIC', allocation: 15, value: 1500000, return: '+18.2%', risk: 'Medium' },
    { asset: 'Al Rajhi Bank', allocation: 12, value: 1200000, return: '+8.5%', risk: 'Low' },
    { asset: 'STC', allocation: 10, value: 1000000, return: '+15.8%', risk: 'Medium' },
    { asset: 'ACWA Power', allocation: 8, value: 800000, return: '+22.4%', risk: 'Medium' },
    { asset: 'Saudi Bonds', allocation: 18, value: 1800000, return: '+4.2%', risk: 'Low' },
    { asset: 'Cash & Equivalents', allocation: 9, value: 900000, return: '+2.8%', risk: 'Low' }
  ]

  // Active alerts
  const alertsData = [
    {
      asset: 'SABIC',
      type: 'Price Target',
      message: 'Price crossed SR 95 resistance level',
      severity: 'high',
      time: '2 minutes ago',
      action: 'Consider taking profit'
    },
    {
      asset: 'Tadawul All Share',
      type: 'Market Alert',
      message: 'Index up +2.5%, approaching 52-week high',
      severity: 'medium',
      time: '15 minutes ago',
      action: 'Monitor for reversal signals'
    },
    {
      asset: 'Al Rajhi Bank',
      type: 'Volume Spike',
      message: 'Trading volume 3x above average',
      severity: 'medium',
      time: '28 minutes ago',
      action: 'Investigate institutional activity'
    },
    {
      asset: 'Brent Crude',
      type: 'News Alert',
      message: 'OPEC+ announces production cut extension',
      severity: 'high',
      time: '1 hour ago',
      action: 'Review energy sector positions'
    },
    {
      asset: 'Portfolio',
      type: 'Risk Alert',
      message: 'Portfolio volatility increased to 18%',
      severity: 'low',
      time: '3 hours ago',
      action: 'Consider rebalancing to reduce risk'
    }
  ]

  // Risk-return scatter data
  const riskReturnData = [
    { name: 'Saudi Aramco', risk: 12, return: 15, size: 2800, color: '#10b981' },
    { name: 'SABIC', risk: 18, return: 22, size: 1500, color: '#3b82f6' },
    { name: 'Al Rajhi', risk: 14, return: 18, size: 1200, color: '#10b981' },
    { name: 'STC', risk: 16, return: 19, size: 1000, color: '#3b82f6' },
    { name: 'ACWA', risk: 22, return: 28, size: 800, color: '#f59e0b' },
    { name: 'Bonds', risk: 5, return: 6, size: 1800, color: '#10b981' }
  ]

  const MetricCard = ({ title, value, change, changeType, period, icon: Icon, alert, sparkline }: any) => (
    <div className="bg-white rounded-lg p-2 border border-gray-200 hover:shadow-md transition-all group relative">
      {alert && (
        <div className="absolute top-1.5 right-1.5">
          <AlertCircle className="h-2.5 w-2.5 text-orange-500" />
        </div>
      )}
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-0.5">
            <Icon className="h-3 w-3 text-blue-600" />
            <span className="text-[10px] font-medium text-gray-600">{title}</span>
          </div>
          <div className="text-lg font-semibold text-gray-900 mb-0.5">{value}</div>
          <div className="text-[9px] text-gray-500">{period}</div>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <Badge className={`h-3.5 text-[9px] px-1 border-0 ${changeType === 'up' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {changeType === 'up' ? '↑' : '↓'} {change}
          </Badge>
          {sparkline && (
            <div className="w-14 h-5">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={sparkline}>
                  <Area type="monotone" dataKey="y" stroke={changeType === 'up' ? '#10b981' : '#ef4444'} strokeWidth={1} fill={changeType === 'up' ? '#d1fae5' : '#fee2e2'} fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const sparklineUp = [{ y: 100 }, { y: 105 }, { y: 103 }, { y: 108 }, { y: 112 }]
  const sparklineDown = [{ y: 100 }, { y: 98 }, { y: 95 }, { y: 97 }, { y: 93 }]

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
            <span className="text-[10px] font-semibold text-gray-700">Market Scanner</span>
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
              <p className="text-[11px] text-gray-500">Real-time screening and analysis</p>
            </div>

          {/* Asset Class Filter */}
          <div className="mb-4">
            <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Asset Class</label>
            <div className="space-y-1">
              {(['all', 'equities', 'bonds', 'commodities', 'forex'] as const).map((asset) => (
                <button
                  key={asset}
                  onClick={() => setSelectedAssetClass(asset)}
                  className={`w-full px-2 py-1.5 text-[11px] font-medium rounded border text-left transition-colors ${
                    selectedAssetClass === asset
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {asset === 'all' ? 'All Assets' : asset.charAt(0).toUpperCase() + asset.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Risk Level */}
          <div className="mb-4">
            <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Risk Level</label>
            <div className="grid grid-cols-2 gap-1.5">
              {(['all', 'low', 'medium', 'high'] as const).map((risk) => (
                <button
                  key={risk}
                  onClick={() => setSelectedRiskLevel(risk)}
                  className={`px-2 py-1.5 text-[11px] font-medium rounded border transition-colors ${
                    selectedRiskLevel === risk
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {risk === 'all' ? 'All' : risk.charAt(0).toUpperCase() + risk.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Region Filter */}
          <div className="mb-4">
            <label className="block text-[11px] font-medium text-gray-700 mb-1.5">Region</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value as any)}
              className="w-full px-2 py-1.5 text-[11px] border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Markets</option>
              <option value="gcc">GCC Markets</option>
              <option value="emerging">Emerging Markets</option>
              <option value="developed">Developed Markets</option>
            </select>
          </div>

          {/* Screening Criteria */}
          <div className="mt-auto pt-4 border-t border-gray-200">
            <h4 className="text-[11px] font-semibold text-gray-900 mb-2">Active Filters</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-1.5">
                <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600">P/E ratio {'<'} 20</p>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600">Dividend yield {'>'} 3%</p>
              </div>
              <div className="flex items-start gap-1.5">
                <CheckCircle className="h-3 w-3 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gray-600">Volume {'>'} 1M shares</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-3 h-7 text-[11px]">
              <Target className="h-3 w-3 mr-1" />
              Customize Filters
            </Button>
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
              <h1 className="text-base font-semibold text-gray-900">Capital Markets Scanner</h1>
              <p className="text-[11px] text-gray-500">Real-time market intelligence • Last updated: 1 minute ago</p>
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
                title="Portfolio Value"
                value="$10.0M"
                change="8.2%"
                changeType="up"
                period="Total value"
                icon={DollarSign}
                sparkline={sparklineUp}
              />
              <MetricCard
                title="Tadawul Index"
                value="11,340"
                change="2.5%"
                changeType="up"
                period="Today's performance"
                icon={TrendingUp}
                sparkline={sparklineUp}
              />
              <MetricCard
                title="Portfolio Return"
                value="+12.8%"
                change="3.2pp"
                changeType="up"
                period="YTD performance"
                icon={LineChartIcon}
                sparkline={sparklineUp}
              />
              <MetricCard
                title="Active Positions"
                value="42"
                change="3"
                changeType="up"
                period="Holdings"
                icon={Activity}
                sparkline={null}
              />
              <MetricCard
                title="Daily Volume"
                value="$2.8B"
                change="18%"
                changeType="up"
                period="Trading activity"
                icon={TrendingUp}
                sparkline={sparklineUp}
              />
              <MetricCard
                title="Risk Score"
                value="68/100"
                change="5pts"
                changeType="up"
                period="Portfolio risk"
                icon={Shield}
                alert={true}
              />
            </div>

            {/* Market Indices Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xs font-semibold text-gray-900">Major Indices Performance</h2>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="h-4 text-[9px]">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mr-1"></div>
                    S&P 500
                  </Badge>
                  <Badge variant="outline" className="h-4 text-[9px]">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-1"></div>
                    NASDAQ
                  </Badge>
                  <Badge variant="outline" className="h-4 text-[9px]">
                    <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                    Tadawul
                  </Badge>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={marketIndicesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ fontSize: '11px' }} />
                  <Area type="monotone" dataKey="sp500" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="nasdaq" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="tadawul" stroke="#10b981" fill="#10b981" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Dual Charts */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-xs font-semibold text-gray-900 mb-2">Portfolio Allocation</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={portfolioData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="asset" tick={{ fontSize: 9 }} angle={-45} textAnchor="end" height={80} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="allocation" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-xs font-semibold text-gray-900 mb-2">Risk vs Return Analysis</h3>
                <ResponsiveContainer width="100%" height={180}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis type="number" dataKey="risk" name="Risk" tick={{ fontSize: 10 }} label={{ value: 'Risk (%)', position: 'bottom', fontSize: 10 }} />
                    <YAxis type="number" dataKey="return" name="Return" tick={{ fontSize: 10 }} label={{ value: 'Return (%)', angle: -90, position: 'left', fontSize: 10 }} />
                    <ZAxis dataKey="size" range={[100, 800]} />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ fontSize: '11px' }} />
                    <Scatter data={riskReturnData}>
                      {riskReturnData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="border-b border-gray-200 px-3 py-2 flex items-center gap-4">
                {(['opportunities', 'portfolio', 'alerts'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-[11px] font-medium px-2 py-1 rounded transition-colors ${
                      activeTab === tab
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab === 'opportunities' ? 'Investment Opportunities' : tab === 'portfolio' ? 'Portfolio Holdings' : 'Active Alerts'}
                  </button>
                ))}
              </div>

              <div className="p-3">
                {activeTab === 'opportunities' && (
                  <DataTable
                    data={opportunitiesData}
                    columns={[
                      {
                        header: 'Asset',
                        accessorKey: 'asset',
                        cell: ({ row }: any) => (
                          <div>
                            <div className="text-[11px] font-medium">{row.asset}</div>
                            <div className="text-[9px] text-gray-500">{row.ticker}</div>
                          </div>
                        )
                      },
                      {
                        header: 'Type',
                        accessorKey: 'type',
                        cell: ({ row }: any) => (
                          <Badge className="h-4 text-[9px] bg-gray-100 text-gray-700 border-0">
                            {row.original.type}
                          </Badge>
                        )
                      },
                      {
                        header: 'Price',
                        accessorKey: 'price',
                        cell: ({ row }: any) => <span className="text-[11px] font-medium">{row.original.price}</span>
                      },
                      {
                        header: 'Change',
                        accessorKey: 'change',
                        cell: ({ row }: any) => {
                          const isPositive = row.original.change.startsWith('+')
                          return (
                            <Badge className={`h-4 text-[9px] ${isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} border-0`}>
                              {row.original.change}
                            </Badge>
                          )
                        }
                      },
                      {
                        header: 'Score',
                        accessorKey: 'score',
                        cell: ({ row }: any) => (
                          <div className="flex items-center gap-1.5">
                            <div className="w-16 bg-gray-100 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${row.original.score >= 85 ? 'bg-green-500' : 'bg-blue-500'}`}
                                style={{ width: `${row.original.score}%` }}
                              />
                            </div>
                            <span className="text-[10px] font-medium text-gray-700">{row.original.score}</span>
                          </div>
                        )
                      },
                      {
                        header: 'Rating',
                        accessorKey: 'rating',
                        cell: ({ row }: any) => (
                          <Badge className={`h-4 text-[9px] ${row.original.rating.includes('Strong') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'} border-0`}>
                            {row.original.rating}
                          </Badge>
                        )
                      },
                      {
                        header: 'Target',
                        accessorKey: 'targetPrice',
                        cell: ({ row }: any) => (
                          <div>
                            <div className="text-[11px] font-medium text-blue-600">{row.targetPrice}</div>
                            <div className="text-[9px] text-green-600">{row.upside}</div>
                          </div>
                        )
                      },
                      {
                        header: 'Risk',
                        accessorKey: 'risk',
                        cell: ({ row }: any) => (
                          <Badge className={`h-4 text-[9px] ${
                            row.risk === 'Low' ? 'bg-green-50 text-green-700' :
                            row.risk === 'Medium' ? 'bg-orange-50 text-orange-700' :
                            'bg-red-50 text-red-700'
                          } border-0`}>
                            {row.risk}
                          </Badge>
                        )
                      },
                      {
                        header: 'P/E',
                        accessorKey: 'pe',
                        cell: ({ row }: any) => <span className="text-[10px] text-gray-600">{row.pe || 'N/A'}</span>
                      },
                      {
                        header: 'Div Yield',
                        accessorKey: 'dividend',
                        cell: ({ row }: any) => <span className="text-[10px] text-gray-600">{row.dividend || 'N/A'}</span>
                      }
                    ]}
                  />
                )}

                {activeTab === 'portfolio' && (
                  <DataTable
                    data={portfolioData}
                    columns={[
                      {
                        header: 'Asset',
                        accessorKey: 'asset',
                        cell: ({ row }: any) => <span className="text-[11px] font-medium">{row.asset}</span>
                      },
                      {
                        header: 'Allocation',
                        accessorKey: 'allocation',
                        cell: ({ row }: any) => (
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-100 rounded-full h-1.5 w-24">
                              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${row.allocation}%` }} />
                            </div>
                            <span className="text-[10px] text-gray-600 w-8">{row.allocation}%</span>
                          </div>
                        )
                      },
                      {
                        header: 'Value',
                        accessorKey: 'value',
                        cell: ({ row }: any) => <span className="text-[11px] font-medium">${(row.value / 1000000).toFixed(1)}M</span>
                      },
                      {
                        header: 'Return',
                        accessorKey: 'return',
                        cell: ({ row }: any) => {
                          const isPositive = row.return.startsWith('+')
                          return (
                            <Badge className={`h-4 text-[9px] ${isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'} border-0`}>
                              {row.return}
                            </Badge>
                          )
                        }
                      },
                      {
                        header: 'Risk Level',
                        accessorKey: 'risk',
                        cell: ({ row }: any) => (
                          <Badge className={`h-4 text-[9px] ${
                            row.risk === 'Low' ? 'bg-green-50 text-green-700' :
                            row.risk === 'Medium' ? 'bg-orange-50 text-orange-700' :
                            'bg-red-50 text-red-700'
                          } border-0`}>
                            {row.risk}
                          </Badge>
                        )
                      }
                    ]}
                  />
                )}

                {activeTab === 'alerts' && (
                  <DataTable
                    data={alertsData}
                    columns={[
                      {
                        header: 'Asset',
                        accessorKey: 'asset',
                        cell: ({ row }: any) => <span className="text-[11px] font-medium">{row.asset}</span>
                      },
                      {
                        header: 'Type',
                        accessorKey: 'type',
                        cell: ({ row }: any) => (
                          <Badge className="h-4 text-[9px] bg-blue-50 text-blue-700 border-0">
                            {row.type}
                          </Badge>
                        )
                      },
                      {
                        header: 'Message',
                        accessorKey: 'message',
                        cell: ({ row }: any) => <span className="text-[11px]">{row.message}</span>
                      },
                      {
                        header: 'Severity',
                        accessorKey: 'severity',
                        cell: ({ row }: any) => (
                          <Badge className={`h-4 text-[9px] ${
                            row.severity === 'high' ? 'bg-red-50 text-red-700' :
                            row.severity === 'medium' ? 'bg-orange-50 text-orange-700' :
                            'bg-gray-100 text-gray-700'
                          } border-0`}>
                            {row.severity.toUpperCase()}
                          </Badge>
                        )
                      },
                      {
                        header: 'Time',
                        accessorKey: 'time',
                        cell: ({ row }: any) => <span className="text-[10px] text-gray-500">{row.time}</span>
                      },
                      {
                        header: 'Recommended Action',
                        accessorKey: 'action',
                        cell: ({ row }: any) => <span className="text-[10px] text-gray-600">{row.action}</span>
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
