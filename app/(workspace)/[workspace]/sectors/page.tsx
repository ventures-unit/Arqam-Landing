'use client'

import { useState, useEffect } from 'react'
import { AreaChart, Area, LineChart, Line, ComposedChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell, Scatter, ScatterChart } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { BarChart3, TrendingUp, TrendingDown, Leaf, Users, Zap, AlertCircle, ChevronRight, ChevronLeft, ExternalLink, Download, Share2, RefreshCw, Target, DollarSign, PieChart, Network } from 'lucide-react'
import { PageSkeleton } from '@/components/loading/PageSkeleton'

export default function SectorsPage() {
  // Loading state
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('app_loaded')
    }
    return true
  })

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('app_loaded', 'true')
      }
    }, 800)
    return () => clearTimeout(timer)
  }, [])
  // Left panel state
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [selectedSector, setSelectedSector] = useState('technology')
  const [analysisView, setAnalysisView] = useState('overview')

  // Main view state
  const [selectedTab, setSelectedTab] = useState('benchmarking')
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  // Sector benchmarking data
  const benchmarkingData = [
    { sector: 'Technology', growth: 12.5, esg: 78, investment: 45.2, pe: 28.5, marketCap: 8500, employees: 2.5, trend: 'up' },
    { sector: 'Healthcare', growth: 8.2, esg: 82, investment: 38.5, pe: 22.3, marketCap: 5200, employees: 3.2, trend: 'up' },
    { sector: 'Finance', growth: 5.8, esg: 65, investment: 28.8, pe: 15.2, marketCap: 4800, employees: 2.1, trend: 'neutral' },
    { sector: 'Manufacturing', growth: 4.5, esg: 58, investment: 22.5, pe: 18.5, marketCap: 3200, employees: 4.5, trend: 'down' },
    { sector: 'Retail', growth: 3.2, esg: 62, investment: 18.2, pe: 16.8, marketCap: 2100, employees: 5.8, trend: 'neutral' },
    { sector: 'Energy', growth: 2.8, esg: 48, investment: 32.5, pe: 12.5, marketCap: 6500, employees: 1.8, trend: 'up' },
    { sector: 'Real Estate', growth: 6.5, esg: 55, investment: 42.8, pe: 20.5, marketCap: 3800, employees: 1.2, trend: 'up' },
    { sector: 'Transportation', growth: 4.8, esg: 52, investment: 25.5, pe: 14.2, marketCap: 2800, employees: 3.5, trend: 'neutral' }
  ]

  // ESG Rating data
  const esgData = [
    { category: 'Environmental', score: 72 },
    { category: 'Social', score: 68 },
    { category: 'Governance', score: 82 },
    { category: 'Sustainability', score: 75 },
    { category: 'Transparency', score: 78 }
  ]

  // Funding trends
  const fundingTrends = [
    { quarter: 'Q1 23', vc: 12.5, pe: 28.5, debt: 15.2 },
    { quarter: 'Q2 23', vc: 15.2, pe: 32.8, debt: 18.5 },
    { quarter: 'Q3 23', vc: 18.5, pe: 38.2, debt: 22.5 },
    { quarter: 'Q4 23', vc: 22.8, pe: 42.5, debt: 25.8 },
    { quarter: 'Q1 24', vc: 25.5, pe: 45.2, debt: 28.2 },
    { quarter: 'Q2 24', vc: 28.2, pe: 48.5, debt: 32.5 }
  ]

  // Metric cards data
  const metricsData = [
    { title: 'Avg Sector Growth', value: '6.8%', change: '+1.2%', changeType: 'up', period: 'YoY', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 5.5 + i * 0.1 })), alert: false, icon: <TrendingUp className="h-3 w-3" /> },
    { title: 'Avg ESG Score', value: '68.5', change: '+4.2', changeType: 'up', period: 'Out of 100', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 62 + i * 0.45 })), alert: false, icon: <Leaf className="h-3 w-3" /> },
    { title: 'Total Investment', value: '$254B', change: '+12.5%', changeType: 'up', period: 'Last 12 months', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 225 + i * 2 })), alert: false, icon: <DollarSign className="h-3 w-3" /> },
    { title: 'Avg P/E Ratio', value: '19.8', change: '-1.5', changeType: 'down', period: 'Market Average', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 21.5 - i * 0.12 })), alert: false, icon: <BarChart3 className="h-3 w-3" /> },
    { title: 'Total Employment', value: '24.6M', change: '+2.8%', changeType: 'up', period: 'Across Sectors', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 23.8 + i * 0.06 })), alert: false, icon: <Users className="h-3 w-3" /> },
    { title: 'Active Deals', value: '385', change: '+42', changeType: 'up', period: 'Last Quarter', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 340 + i * 3 })), alert: false, icon: <Target className="h-3 w-3" /> }
  ]

  // MetricCard component
  const MetricCard = ({ title, value, change, changeType, period, sparkline, alert, icon }: any) => (
    <div className="bg-white rounded-lg p-2 border border-gray-200 hover:shadow-md transition-all group relative">
      {alert && (
        <div className="absolute top-1.5 right-1.5">
          <AlertCircle className="h-2.5 w-2.5 text-orange-500" />
        </div>
      )}
      <div className="flex items-start justify-between mb-1">
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-0.5">
            {icon && <span className="text-gray-500">{icon}</span>}
            <span className="text-[10px] font-medium text-gray-600">{title}</span>
          </div>
          <div className="text-lg font-semibold text-gray-900 mb-0.5">{value}</div>
          <div className="text-[9px] text-gray-500">{period}</div>
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <Badge className={`h-3.5 text-[9px] px-1 border-0 ${
            changeType === 'up' ? 'bg-green-50 text-green-700' :
            changeType === 'down' ? 'bg-red-50 text-red-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {changeType === 'up' && '↑'} {changeType === 'down' && '↓'} {change}
          </Badge>
          <div className="w-14 h-5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline}>
                <Area type="monotone" dataKey="y" stroke={changeType === 'up' ? '#10b981' : '#ef4444'} strokeWidth={1} fill={changeType === 'up' ? '#d1fae5' : '#fee2e2'} fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )

  const toggleRowSelection = (index: number) => {
    setSelectedRows(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const toggleAllRows = () => {
    setSelectedRows(prev => prev.length === benchmarkingData.length ? [] : benchmarkingData.map((_, i) => i))
  }

  if (isLoading) return <PageSkeleton />

  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
      {/* Left Analysis Panel */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${leftPanelCollapsed ? 'w-0' : 'w-64'} flex-shrink-0 overflow-hidden`}>
        <div className="h-full flex flex-col">
          <div className="px-2 py-1.5 border-b border-gray-200 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-gray-700">Sector Analysis</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0"
              onClick={() => setLeftPanelCollapsed(true)}
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 pb-4 space-y-2">
            {/* Sector Selector */}
            <div className="space-y-1">
              <span className="text-[9px] font-semibold text-gray-600 uppercase">Focus Sector</span>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="h-6 text-[10px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="energy">Energy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Analysis View */}
            <div className="space-y-1">
              <span className="text-[9px] font-semibold text-gray-600 uppercase">Analysis Type</span>
              <Select value={analysisView} onValueChange={setAnalysisView}>
                <SelectTrigger className="h-6 text-[10px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="overview">Overview</SelectItem>
                  <SelectItem value="esg">ESG Analysis</SelectItem>
                  <SelectItem value="funding">Funding Trends</SelectItem>
                  <SelectItem value="supply-chain">Supply Chain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Quick Stats */}
            <div className="space-y-1 pt-2 border-t border-gray-200">
              <span className="text-[9px] font-semibold text-gray-600 uppercase">Quick Stats</span>
              <div className="space-y-1">
                {[
                  { label: 'Growth Rate', value: '12.5%', color: 'text-green-700' },
                  { label: 'ESG Score', value: '78/100', color: 'text-blue-700' },
                  { label: 'Investment', value: '$45.2B', color: 'text-purple-700' },
                  { label: 'P/E Ratio', value: '28.5', color: 'text-orange-700' }
                ].map((stat, idx) => (
                  <div key={idx} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-gray-700">{stat.label}</span>
                      <span className={`text-[10px] font-semibold ${stat.color}`}>{stat.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Subsectors */}
            <div className="space-y-1 pt-2 border-t border-gray-200">
              <span className="text-[9px] font-semibold text-gray-600 uppercase">Top Subsectors</span>
              <div className="space-y-1">
                {[
                  { name: 'AI & Machine Learning', growth: '+18.5%' },
                  { name: 'Cloud Computing', growth: '+15.2%' },
                  { name: 'Cybersecurity', growth: '+12.8%' }
                ].map((sub, idx) => (
                  <div key={idx} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[9px] font-medium text-gray-700">{sub.name}</span>
                      <Badge className="h-3 text-[8px] px-1 bg-green-50 text-green-700 border-0">
                        {sub.growth}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full h-5 text-[9px] mt-1">
                View All Subsectors
              </Button>
            </div>

            {/* ESG Rating Breakdown */}
            <div className="space-y-1 pt-2 border-t border-gray-200">
              <span className="text-[9px] font-semibold text-gray-600 uppercase">ESG Breakdown</span>
              <div className="space-y-1">
                {[
                  { category: 'Environmental', score: 72, color: 'bg-green-500' },
                  { category: 'Social', score: 68, color: 'bg-blue-500' },
                  { category: 'Governance', score: 82, color: 'bg-purple-500' }
                ].map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] text-gray-700">{item.category}</span>
                      <span className="text-[9px] font-semibold text-gray-900">{item.score}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full ${item.color}`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expand button when collapsed */}
      {leftPanelCollapsed && (
        <Button
          variant="ghost"
          size="sm"
          className="absolute left-0 top-1/2 -translate-y-1/2 h-10 w-4 rounded-r-md bg-white border border-l-0 border-gray-200 hover:bg-gray-50 z-10"
          onClick={() => setLeftPanelCollapsed(false)}
        >
          <ChevronRight className="h-3 w-3" />
        </Button>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-3 py-1.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <BarChart3 className="h-3.5 w-3.5 text-blue-600" />
              <h1 className="text-sm font-semibold text-gray-900">Sector Intelligence</h1>
            </div>
            <Badge className="h-4 text-[9px] px-1.5 bg-green-50 text-green-700 border-green-200">
              Live
            </Badge>
            <Badge className="h-4 text-[9px] px-1.5 bg-blue-50 text-blue-700 border-blue-200">
              89% Confidence
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-gray-500">Updated 3m ago</span>
            <Button variant="ghost" size="sm" className="h-5 text-[9px] px-1.5">
              <RefreshCw className="h-2.5 w-2.5 mr-1" />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" className="h-5 text-[9px] px-1.5">
              <Download className="h-2.5 w-2.5 mr-1" />
              Export
            </Button>
            <Button variant="ghost" size="sm" className="h-5 text-[9px] px-1.5">
              <Share2 className="h-2.5 w-2.5 mr-1" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="h-5 text-[9px] px-1.5">
              <ExternalLink className="h-2.5 w-2.5 mr-1" />
              Industry Reports
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-3 pb-6 space-y-2.5">
          {/* Metric Cards */}
          <div className="grid grid-cols-6 gap-2">
            {metricsData.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-2">
            {/* Funding Trends */}
            <div className="bg-white rounded-lg p-2.5 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-[11px] font-semibold text-gray-900">Funding Trends</h3>
                  <Badge className="h-3.5 text-[8px] px-1 bg-gray-100 text-gray-700 border-0">
                    Last 6 quarters
                  </Badge>
                  <div className="flex items-center gap-2 text-[10px]">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
                      <span className="text-gray-600">VC Funding</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#8b5cf6]"></div>
                      <span className="text-gray-600">PE Investment</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                      <span className="text-gray-600">Debt Financing</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={fundingTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="quarter"
                      tick={{ fill: '#6b7280', fontSize: 9 }}
                      tickMargin={5}
                    />
                    <YAxis
                      tick={{ fill: '#6b7280', fontSize: 9 }}
                      tickMargin={5}
                      label={{ value: 'Investment ($B)', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#6b7280' } }}
                    />
                    <Tooltip
                      contentStyle={{ fontSize: 10, padding: 4 }}
                      labelStyle={{ fontSize: 9 }}
                    />
                    <Area type="monotone" dataKey="vc" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} name="VC Funding" />
                    <Area type="monotone" dataKey="pe" stackId="1" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.8} name="PE Investment" />
                    <Area type="monotone" dataKey="debt" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.8} name="Debt Financing" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* ESG Radar Chart */}
            <div className="bg-white rounded-lg p-2.5 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-[11px] font-semibold text-gray-900">ESG Rating Analysis</h3>
                  <Badge className="h-3.5 text-[8px] px-1 bg-gray-100 text-gray-700 border-0">
                    Technology Sector
                  </Badge>
                </div>
              </div>

              <div className="h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={esgData}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis dataKey="category" tick={{ fill: '#6b7280', fontSize: 9 }} />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280', fontSize: 8 }} />
                    <Radar name="ESG Score" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Tooltip
                      contentStyle={{ fontSize: 10, padding: 4 }}
                      labelStyle={{ fontSize: 9 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-2">
            <TabsList className="h-6 bg-gray-100 p-0.5">
              <TabsTrigger value="benchmarking" className="h-5 text-[11px] px-2">
                Sector Benchmarking
              </TabsTrigger>
              <TabsTrigger value="esg-materiality" className="h-5 text-[11px] px-2">
                ESG Materiality
              </TabsTrigger>
              <TabsTrigger value="supply-chain" className="h-5 text-[11px] px-2">
                Supply Chain Map
              </TabsTrigger>
              <TabsTrigger value="news" className="h-5 text-[11px] px-2">
                Industry News
              </TabsTrigger>
            </TabsList>

            <TabsContent value="benchmarking" className="mt-2 space-y-2">
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[11px] font-semibold text-gray-900">Cross-Sector Performance Benchmarking</h3>
                  {selectedRows.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-gray-600">{selectedRows.length} selected</span>
                      <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                        Compare Metrics
                      </Button>
                      <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                        Export Report
                      </Button>
                    </div>
                  )}
                </div>

                <div className="border border-gray-200 rounded overflow-hidden">
                  <table className="w-full text-[10px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-1.5 font-semibold text-gray-700 w-8">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300"
                            checked={selectedRows.length === benchmarkingData.length}
                            onChange={toggleAllRows}
                          />
                        </th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">Sector</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Growth %</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">ESG Score</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Investment ($B)</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">P/E Ratio</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Market Cap ($B)</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Employment (M)</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {benchmarkingData.map((row, index) => (
                        <tr
                          key={index}
                          className={`border-b border-gray-100 hover:bg-gray-50 ${selectedRows.includes(index) ? 'bg-blue-50' : ''}`}
                        >
                          <td className="p-1.5">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300"
                              checked={selectedRows.includes(index)}
                              onChange={() => toggleRowSelection(index)}
                            />
                          </td>
                          <td className="p-1.5 font-medium text-gray-900">{row.sector}</td>
                          <td className="p-1.5 text-right">
                            <span className={row.growth > 7 ? 'text-green-700' : 'text-gray-900'}>
                              {row.growth.toFixed(1)}%
                            </span>
                          </td>
                          <td className="p-1.5 text-right">
                            <Badge className={`h-4 text-[9px] px-1.5 border-0 ${
                              row.esg >= 75 ? 'bg-green-50 text-green-700' :
                              row.esg >= 60 ? 'bg-yellow-50 text-yellow-700' :
                              'bg-red-50 text-red-700'
                            }`}>
                              {row.esg}/100
                            </Badge>
                          </td>
                          <td className="p-1.5 text-right text-gray-900">${row.investment.toFixed(1)}B</td>
                          <td className="p-1.5 text-right text-gray-900">{row.pe.toFixed(1)}</td>
                          <td className="p-1.5 text-right text-gray-900">${row.marketCap.toFixed(0)}B</td>
                          <td className="p-1.5 text-right text-gray-900">{row.employees.toFixed(1)}M</td>
                          <td className="p-1.5 text-center">
                            {row.trend === 'up' ? (
                              <TrendingUp className="h-3 w-3 text-green-600 mx-auto" />
                            ) : row.trend === 'down' ? (
                              <TrendingDown className="h-3 w-3 text-red-600 mx-auto" />
                            ) : (
                              <div className="w-3 h-0.5 bg-gray-400 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="esg-materiality" className="mt-2 space-y-2">
              {/* ESG Materiality Matrix */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-[11px] font-semibold text-gray-900 mb-2">ESG Materiality Matrix - Technology Sector</h3>

                <div className="grid grid-cols-[100px_1fr] gap-2">
                  {/* Y-axis label */}
                  <div className="flex items-center justify-center">
                    <div className="text-[9px] font-semibold text-gray-700 transform -rotate-90 whitespace-nowrap">
                      Impact on Business →
                    </div>
                  </div>

                  {/* Matrix */}
                  <div className="space-y-1">
                    {['High', 'Medium', 'Low'].map((impact, rowIdx) => (
                      <div key={impact} className="flex items-center gap-1">
                        <div className="w-16 text-[9px] font-medium text-gray-700 text-right">{impact}</div>
                        <div className="flex-1 grid grid-cols-3 gap-1">
                          {['Low', 'Medium', 'High'].map((stakeholder, colIdx) => {
                            const cellColor =
                              (rowIdx === 0 && colIdx === 2) || (rowIdx === 2 && colIdx === 0) ? 'bg-red-100 border-red-300' :
                              (rowIdx === 0 && colIdx === 1) || (rowIdx === 1 && colIdx === 2) ? 'bg-orange-100 border-orange-300' :
                              (rowIdx === 1 && colIdx === 1) ? 'bg-yellow-100 border-yellow-300' :
                              'bg-green-100 border-green-300'

                            // Define ESG issues in each cell
                            const issues: Record<string, string[]> = {
                              '0-2': ['Data Privacy', 'AI Ethics'],
                              '0-1': ['Cybersecurity'],
                              '1-2': ['E-Waste', 'Energy Use'],
                              '1-1': ['Labor Rights'],
                              '2-2': ['Board Diversity']
                            }

                            const cellIssues = issues[`${rowIdx}-${colIdx}`] || []

                            return (
                              <div
                                key={`${rowIdx}-${colIdx}`}
                                className={`h-24 border-2 rounded p-1 ${cellColor} flex flex-col justify-center`}
                              >
                                {cellIssues.map((issue, idx) => (
                                  <div key={idx} className="text-[8px] font-medium text-gray-900 mb-0.5 bg-white/60 px-1 py-0.5 rounded">
                                    {issue}
                                  </div>
                                ))}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                    {/* X-axis label */}
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-16"></div>
                      <div className="flex-1 grid grid-cols-3 gap-1 text-[9px] font-medium text-gray-700 text-center">
                        <div>Low</div>
                        <div>Medium</div>
                        <div>High</div>
                      </div>
                    </div>
                    <div className="text-[9px] font-semibold text-gray-700 text-center mt-1">
                      ← Stakeholder Concern
                    </div>
                  </div>
                </div>
              </div>

              {/* ESG Priority Issues */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                  <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Material ESG Issues (Priority)</h3>
                  <div className="space-y-1.5">
                    {[
                      { issue: 'Data Privacy & Security', business: 95, stakeholder: 92, trend: 'increasing', action: 'Enhanced protocols' },
                      { issue: 'AI Ethics & Bias', business: 88, stakeholder: 85, trend: 'increasing', action: 'Ethical guidelines' },
                      { issue: 'Cybersecurity Risks', business: 82, stakeholder: 78, trend: 'stable', action: 'Regular audits' },
                      { issue: 'E-Waste Management', business: 72, stakeholder: 88, trend: 'increasing', action: 'Recycling programs' }
                    ].map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <div className="text-[10px] font-semibold text-gray-900 mb-0.5">{item.issue}</div>
                            <div className="text-[8px] text-gray-600">Action: {item.action}</div>
                          </div>
                          <Badge className={`h-3 text-[8px] px-1 border-0 ${
                            item.trend === 'increasing' ? 'bg-red-50 text-red-700' :
                            item.trend === 'stable' ? 'bg-blue-50 text-blue-700' :
                            'bg-green-50 text-green-700'
                          }`}>
                            {item.trend}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[8px]">
                          <div>
                            <span className="text-gray-600">Business: </span>
                            <span className="font-semibold text-gray-900">{item.business}%</span>
                          </div>
                          <div>
                            <span className="text-gray-600">Stakeholder: </span>
                            <span className="font-semibold text-gray-900">{item.stakeholder}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                  <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Sustainability Performance Scorecard</h3>
                  <div className="space-y-2">
                    {[
                      { metric: 'Carbon Footprint Reduction', current: 72, target: 90, unit: '%' },
                      { metric: 'Renewable Energy Usage', current: 65, target: 80, unit: '%' },
                      { metric: 'Diversity & Inclusion', current: 58, target: 75, unit: 'score' },
                      { metric: 'Supply Chain Transparency', current: 68, target: 85, unit: 'score' }
                    ].map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[9px] font-medium text-gray-700">{item.metric}</span>
                          <div className="flex items-center gap-1">
                            <span className="text-[9px] font-semibold text-gray-900">{item.current}</span>
                            <span className="text-[8px] text-gray-600">/ {item.target}{item.unit}</span>
                          </div>
                        </div>
                        <div className="relative w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`absolute h-full rounded-full ${
                              item.current >= item.target ? 'bg-green-500' :
                              item.current >= item.target * 0.7 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${(item.current / item.target) * 100}%` }}
                          />
                          <div
                            className="absolute top-0 h-full w-0.5 bg-blue-600"
                            style={{ left: '100%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="supply-chain" className="mt-2 space-y-2">
              {/* Supply Chain Overview */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-1">Total Suppliers</div>
                  <div className="text-2xl font-bold text-blue-700">2,458</div>
                  <div className="text-[9px] text-gray-500">Across 45 countries</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-1">Tier 1 Partners</div>
                  <div className="text-2xl font-bold text-purple-700">186</div>
                  <div className="text-[9px] text-gray-500">Direct relationships</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-1">Risk Score</div>
                  <div className="text-2xl font-bold text-orange-700">6.2</div>
                  <div className="text-[9px] text-gray-500">Medium risk level</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-1">ESG Compliance</div>
                  <div className="text-2xl font-bold text-green-700">82%</div>
                  <div className="text-[9px] text-gray-500">Certified suppliers</div>
                </div>
              </div>

              {/* Network Visualization Placeholder */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[11px] font-semibold text-gray-900">Supply Chain Network Map</h3>
                  <div className="flex items-center gap-1.5">
                    <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                      Show Dependencies
                    </Button>
                    <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                      Risk Overlay
                    </Button>
                  </div>
                </div>

                <div className="h-[240px] border-2 border-dashed border-gray-300 rounded flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <Network className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <div className="text-[11px] font-semibold text-gray-700 mb-1">Interactive Network Visualization</div>
                    <div className="text-[9px] text-gray-600 max-w-md mx-auto">
                      Force-directed graph showing supplier relationships, material flows, and dependency chains.
                      Click nodes to explore connections and view risk assessments.
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Suppliers & Partners */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Key Suppliers & Partners</h3>
                <div className="border border-gray-200 rounded overflow-hidden">
                  <table className="w-full text-[10px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-1.5 font-semibold text-gray-700">Supplier</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Tier</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">Category</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Annual Value</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">ESG Rating</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Risk Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Tech Components Inc', tier: 1, category: 'Electronics', value: 125.5, esg: 85, risk: 'Low' },
                        { name: 'Global Materials Ltd', tier: 1, category: 'Raw Materials', value: 98.2, esg: 78, risk: 'Medium' },
                        { name: 'Assembly Partners Co', tier: 2, category: 'Manufacturing', value: 82.5, esg: 72, risk: 'Low' },
                        { name: 'Logistics Express', tier: 1, category: 'Transportation', value: 65.8, esg: 68, risk: 'Medium' },
                        { name: 'Packaging Solutions', tier: 2, category: 'Packaging', value: 45.2, esg: 82, risk: 'Low' }
                      ].map((supplier, idx) => (
                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-1.5 font-medium text-gray-900">{supplier.name}</td>
                          <td className="p-1.5 text-center">
                            <Badge className="h-4 text-[9px] px-1.5 bg-blue-50 text-blue-700 border-0">
                              Tier {supplier.tier}
                            </Badge>
                          </td>
                          <td className="p-1.5 text-gray-700">{supplier.category}</td>
                          <td className="p-1.5 text-right text-gray-900">${supplier.value}M</td>
                          <td className="p-1.5 text-center">
                            <Badge className={`h-4 text-[9px] px-1.5 border-0 ${
                              supplier.esg >= 80 ? 'bg-green-50 text-green-700' :
                              supplier.esg >= 70 ? 'bg-yellow-50 text-yellow-700' :
                              'bg-red-50 text-red-700'
                            }`}>
                              {supplier.esg}
                            </Badge>
                          </td>
                          <td className="p-1.5 text-center">
                            <Badge className={`h-4 text-[9px] px-1.5 border-0 ${
                              supplier.risk === 'Low' ? 'bg-green-50 text-green-700' :
                              supplier.risk === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                              'bg-red-50 text-red-700'
                            }`}>
                              {supplier.risk}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="news" className="mt-2">
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[11px] font-semibold text-gray-900">Industry News & Insights</h3>
                  <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                    Filter by Sentiment
                  </Button>
                </div>

                <div className="space-y-2">
                  {[
                    { title: 'AI Investment Surge: Tech Sector Sees Record $45B in Q2', sentiment: 'positive', date: '2025-10-10', source: 'TechCrunch' },
                    { title: 'Healthcare ESG Ratings Improve Across Major Markets', sentiment: 'positive', date: '2025-10-09', source: 'Bloomberg' },
                    { title: 'Manufacturing Sector Faces Supply Chain Challenges', sentiment: 'negative', date: '2025-10-08', source: 'WSJ' },
                    { title: 'Energy Sector Transition: Renewable Investment Doubles', sentiment: 'positive', date: '2025-10-07', source: 'Reuters' },
                    { title: 'Retail Sector Adapts to Changing Consumer Behavior', sentiment: 'neutral', date: '2025-10-06', source: 'CNBC' }
                  ].map((news, idx) => (
                    <div key={idx} className="border border-gray-200 rounded p-2 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[11px] font-semibold text-gray-900">{news.title}</h4>
                            <Badge className={`h-3.5 text-[8px] px-1 border-0 ${
                              news.sentiment === 'positive' ? 'bg-green-50 text-green-700' :
                              news.sentiment === 'negative' ? 'bg-red-50 text-red-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {news.sentiment}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-[9px] text-gray-600">
                            <span>{news.date}</span>
                            <span>•</span>
                            <span>{news.source}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-5 text-[9px] px-1.5">
                          Read <ChevronRight className="h-2.5 w-2.5 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
