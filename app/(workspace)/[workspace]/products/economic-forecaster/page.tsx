'use client'

import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Download,
  Share2,
  Calendar,
  ChevronDown,
  ChevronRight,
  Bookmark,
  Plus,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  LineChart as LineChartIcon,
  Info,
  ExternalLink,
  MoreVertical,
  X,
  Settings,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Activity,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ComposedChart, ReferenceLine } from 'recharts'
import { DataTable } from '@/components/tables/DataTable'
import { PageSkeleton } from '@/components/loading/PageSkeleton'

// Generate forecast data
const generateForecastData = () => {
  const historical = []
  const forecast = []
  let gdp = 2.5
  let inflation = 3.2
  let unemployment = 4.1

  // Historical data (12 months)
  for (let i = 0; i < 12; i++) {
    gdp += (Math.random() - 0.5) * 0.3
    inflation += (Math.random() - 0.5) * 0.2
    unemployment += (Math.random() - 0.5) * 0.15

    historical.push({
      period: `M${i + 1}`,
      gdp: parseFloat(gdp.toFixed(2)),
      inflation: parseFloat(inflation.toFixed(2)),
      unemployment: parseFloat(unemployment.toFixed(2)),
      confidence: 100,
      isForecast: false
    })
  }

  // Forecast data (8 months)
  for (let i = 0; i < 8; i++) {
    gdp += (Math.random() - 0.45) * 0.4
    inflation += (Math.random() - 0.48) * 0.25
    unemployment += (Math.random() - 0.5) * 0.2

    forecast.push({
      period: `F${i + 1}`,
      gdp: parseFloat(gdp.toFixed(2)),
      inflation: parseFloat(inflation.toFixed(2)),
      unemployment: parseFloat(unemployment.toFixed(2)),
      confidence: Math.max(60, 95 - i * 4),
      isForecast: true
    })
  }

  return [...historical, ...forecast]
}

const generateSparkline = (trend: 'up' | 'down' | 'flat') => {
  const points = 12
  const data = []
  let value = 50
  for (let i = 0; i < points; i++) {
    if (trend === 'up') value += Math.random() * 5 - 1
    else if (trend === 'down') value -= Math.random() * 5 - 1
    else value += Math.random() * 4 - 2
    data.push({ x: i, y: Math.max(0, value) })
  }
  return data
}

const MetricCard = ({ title, value, change, changeType, period, sparkline, alert, forecast }: any) => (
  <div className="bg-white rounded-lg p-2 border border-gray-200 hover:shadow-md transition-all group relative">
    {alert && (
      <div className="absolute top-1.5 right-1.5">
        <AlertCircle className="h-2.5 w-2.5 text-orange-500" />
      </div>
    )}
    {forecast && (
      <div className="absolute top-1.5 right-1.5">
        <Zap className="h-2.5 w-2.5 text-purple-500" />
      </div>
    )}
    <div className="flex items-start justify-between mb-1">
      <div className="flex-1">
        <div className="flex items-center gap-1 mb-0.5">
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
              <Area
                type="monotone"
                dataKey="y"
                stroke={changeType === 'up' ? '#10b981' : changeType === 'down' ? '#ef4444' : '#6b7280'}
                strokeWidth={1}
                fill={changeType === 'up' ? '#d1fae5' : changeType === 'down' ? '#fee2e2' : '#f3f4f6'}
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>
)

export default function EconomicForecasterPage() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('app_loaded')
    }
    return true
  })
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [timeframe, setTimeframe] = useState('30d')
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [showForecast, setShowForecast] = useState(true)
  const [chartType, setChartType] = useState('line')
  const [granularity, setGranularity] = useState('monthly')
  const [model, setModel] = useState('arima')

  const [indicators, setIndicators] = useState([
    { id: 1, name: 'GDP Growth Forecast', color: '#3b82f6', expanded: true, filters: [] },
    { id: 2, name: 'Inflation Projection', color: '#8b5cf6', expanded: false, filters: [] },
    { id: 3, name: 'Unemployment Trend', color: '#10b981', expanded: false, filters: [] }
  ])

  const [scenarios, setScenarios] = useState([
    { id: 1, name: 'Base Case', expanded: true, conditions: ['Historical trends', '95% confidence'] },
    { id: 2, name: 'Optimistic', expanded: false, conditions: ['Strong growth', 'Low inflation'] },
    { id: 3, name: 'Pessimistic', expanded: false, conditions: ['Economic downturn', 'High inflation'] }
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('app_loaded', 'true')
      }
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const forecastData = useMemo(() => generateForecastData(), [])

  const tableData = [
    { period: 'Q1 2025', gdp: 2.8, inflation: 3.0, unemployment: 3.9, confidence: 92, scenario: 'Base' },
    { period: 'Q2 2025', gdp: 2.9, inflation: 2.9, unemployment: 3.8, confidence: 88, scenario: 'Base' },
    { period: 'Q3 2025', gdp: 3.0, inflation: 2.8, unemployment: 3.7, confidence: 84, scenario: 'Base' },
    { period: 'Q4 2025', gdp: 3.1, inflation: 2.7, unemployment: 3.6, confidence: 80, scenario: 'Base' },
    { period: 'Q1 2026', gdp: 3.2, inflation: 2.6, unemployment: 3.5, confidence: 75, scenario: 'Base' },
    { period: 'Q2 2026', gdp: 3.2, inflation: 2.6, unemployment: 3.5, confidence: 70, scenario: 'Base' }
  ]

  const columns = [
    {
      accessorKey: 'period',
      header: 'Period',
      cell: ({ row }: any) => (
        <div className="font-medium text-gray-900">{row.getValue('period')}</div>
      ),
    },
    {
      accessorKey: 'gdp',
      header: 'GDP Growth %',
      cell: ({ row }: any) => {
        const value = parseFloat(row.getValue('gdp'))
        return (
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-gray-900">{value}%</span>
            {value > 3.0 ? (
              <ArrowUpRight className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5 text-gray-600" />
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'inflation',
      header: 'Inflation %',
      cell: ({ row }: any) => (
        <span className="font-medium text-gray-900">{row.getValue('inflation')}%</span>
      ),
    },
    {
      accessorKey: 'unemployment',
      header: 'Unemployment %',
      cell: ({ row }: any) => (
        <span className="font-medium text-gray-900">{row.getValue('unemployment')}%</span>
      ),
    },
    {
      accessorKey: 'confidence',
      header: 'Confidence',
      cell: ({ row }: any) => {
        const value = parseFloat(row.getValue('confidence'))
        return (
          <Badge className={`text-[10px] ${
            value >= 85 ? 'bg-green-50 text-green-700' :
            value >= 70 ? 'bg-blue-50 text-blue-700' :
            'bg-orange-50 text-orange-700'
          }`}>
            {value}%
          </Badge>
        )
      },
    },
    {
      accessorKey: 'scenario',
      header: 'Scenario',
      cell: ({ row }: any) => (
        <span className="text-[11px] text-gray-600">{row.getValue('scenario')}</span>
      ),
    },
  ]

  if (isLoading) return <PageSkeleton />

  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
      {/* LEFT ANALYSIS PANEL */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${leftPanelCollapsed ? 'w-0' : 'w-64'} flex-shrink-0 overflow-hidden`}>
        <div className="h-full flex flex-col">
          <div className="px-2 py-1.5 border-b border-gray-200 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-gray-700">Forecast Settings</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-5 w-5 p-0"
              onClick={() => setLeftPanelCollapsed(true)}
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-2 pb-4 space-y-2">
            {/* Forecast Model */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Model</span>
              <Select value={model} onValueChange={setModel}>
                <SelectTrigger className="h-7 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arima">ARIMA</SelectItem>
                  <SelectItem value="prophet">Prophet</SelectItem>
                  <SelectItem value="lstm">LSTM Neural Network</SelectItem>
                  <SelectItem value="ensemble">Ensemble</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Indicators */}
            <div className="space-y-1.5 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Indicators</span>
              </div>
              {indicators.map((indicator) => (
                <div key={indicator.id} className="bg-gray-50 rounded-md p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => setIndicators(indicators.map(i =>
                        i.id === indicator.id ? { ...i, expanded: !i.expanded } : i
                      ))}
                    >
                      <ChevronDown className={`h-3 w-3 transition-transform ${indicator.expanded ? '' : '-rotate-90'}`} />
                    </Button>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: indicator.color }}></div>
                    <span className="text-[11px] font-medium text-gray-900 flex-1">{indicator.name}</span>
                  </div>
                  {indicator.expanded && (
                    <div className="mt-2 pl-6 space-y-1">
                      <div className="text-[10px] text-gray-600">Horizon: 12 months</div>
                      <div className="text-[10px] text-gray-600">Accuracy: 87%</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Scenarios */}
            <div className="space-y-1.5 pt-2 border-t border-gray-200">
              <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Scenarios</span>
              {scenarios.map((scenario, idx) => (
                <div key={scenario.id} className="bg-gray-50 rounded-md p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-400">{idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => setScenarios(scenarios.map(s =>
                        s.id === scenario.id ? { ...s, expanded: !s.expanded } : s
                      ))}
                    >
                      <ChevronDown className={`h-3 w-3 transition-transform ${scenario.expanded ? '' : '-rotate-90'}`} />
                    </Button>
                    <span className="text-[11px] font-medium text-gray-900 flex-1">{scenario.name}</span>
                  </div>
                  {scenario.expanded && (
                    <div className="mt-2 pl-6 space-y-1">
                      {scenario.conditions.map((condition, idx) => (
                        <div key={idx} className="text-[10px] text-gray-600 flex items-center gap-1">
                          <span className="text-gray-400">↳</span>
                          <span>{condition}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full h-6 text-[10px] text-gray-600">
                <Plus className="h-3 w-3 mr-1" />
                Add Scenario
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-2 flex-shrink-0">
          <div className="flex items-center justify-between">
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
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <h1 className="text-sm font-semibold text-gray-900">Economic Forecaster</h1>
                <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0 bg-purple-50 border-purple-200 text-purple-700">
                  <Zap className="w-1.5 h-1.5 mr-1" />
                  AI-Powered
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <Clock className="h-3 w-3" />
                <span>Updated 2 min ago</span>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                  <RefreshCw className="h-3 w-3" />
                </Button>
                <span className="text-gray-300">•</span>
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span className="text-green-600">87% accuracy</span>
                <span className="text-gray-300">•</span>
                <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Model info <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2">
                <Bookmark className="h-3 w-3 mr-1" />
                Save
              </Button>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px] px-2"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
                {showExportMenu && (
                  <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50">Export as PNG</button>
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50">Export as CSV</button>
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50">Export as PDF</button>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2">
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-3 pb-6 space-y-2.5">
            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="h-7 w-32 text-[11px]">
                    <LineChartIcon className="h-3 w-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line chart</SelectItem>
                    <SelectItem value="area">Area chart</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={granularity} onValueChange={setGranularity}>
                  <SelectTrigger className="h-7 w-24 text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-[11px] px-2 text-purple-600"
                  onClick={() => setShowForecast(!showForecast)}
                >
                  <Target className="h-3 w-3 mr-1" />
                  {showForecast ? 'Hide' : 'Show'} forecast
                </Button>
              </div>

              <div className="flex gap-0.5">
                {['7d', '30d', '60d', '90d'].map((period) => (
                  <Button
                    key={period}
                    variant="ghost"
                    size="sm"
                    onClick={() => setTimeframe(period)}
                    className={`h-6 text-[10px] px-2 ${
                      timeframe === period
                        ? 'bg-blue-50 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {period}
                  </Button>
                ))}
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Calendar className="h-3 w-3 text-gray-500" />
                </Button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-6 gap-2">
              <MetricCard
                title="GDP Forecast"
                value="3.2%"
                change="+0.4%"
                changeType="up"
                period="Q4 2025"
                sparkline={generateSparkline('up')}
                forecast={true}
              />
              <MetricCard
                title="Inflation Forecast"
                value="2.6%"
                change="-0.6%"
                changeType="down"
                period="Q4 2025"
                sparkline={generateSparkline('down')}
                forecast={true}
              />
              <MetricCard
                title="Unemployment"
                value="3.5%"
                change="-0.6%"
                changeType="down"
                period="Q4 2025"
                sparkline={generateSparkline('down')}
                forecast={true}
              />
              <MetricCard
                title="Model Accuracy"
                value="87%"
                change="+2%"
                changeType="up"
                period="Last 12M"
                sparkline={generateSparkline('up')}
              />
              <MetricCard
                title="Confidence Score"
                value="92%"
                change="High"
                changeType="up"
                period="Base Case"
                sparkline={generateSparkline('up')}
              />
              <MetricCard
                title="Forecast Horizon"
                value="18M"
                change="Extended"
                changeType="up"
                period="Maximum"
                sparkline={generateSparkline('flat')}
              />
            </div>

            {/* Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-2.5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-xs font-semibold text-gray-900">Economic Indicators Forecast</h3>
                  <div className="flex items-center gap-2 text-[10px]">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-gray-600">GDP Growth</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-gray-600">Inflation</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-gray-600">Unemployment</span>
                    </div>
                    <div className="border-l border-gray-200 pl-2 ml-1 flex items-center gap-1">
                      <div className="w-3 border-t-2 border-dashed border-purple-400"></div>
                      <span className="text-purple-600">Forecast</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={forecastData}>
                    <defs>
                      <linearGradient id="colorGdp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                    <XAxis
                      dataKey="period"
                      tick={{ fill: '#9ca3af', fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                    />
                    <YAxis
                      tick={{ fill: '#9ca3af', fontSize: 10 }}
                      tickLine={false}
                      axisLine={{ stroke: '#e5e7eb' }}
                      width={35}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontSize: '11px',
                        padding: '6px 8px'
                      }}
                    />
                    <ReferenceLine x="M12" stroke="#9ca3af" strokeDasharray="3 3" />
                    <Line
                      type="monotone"
                      dataKey="gdp"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="inflation"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="unemployment"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                <div className="text-[10px] text-gray-500">
                  <span className="font-medium text-gray-700">ARIMA(2,1,2)</span> model • 87% accuracy over 24 months
                </div>
                <Button variant="ghost" size="sm" className="h-5 text-[10px] px-2 text-gray-600">
                  <Settings className="h-3 w-3 mr-1" />
                  Configure Model
                </Button>
              </div>
            </div>

            {/* Forecast Table */}
            <Tabs defaultValue="forecast" className="w-full">
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-3 py-2 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <TabsList className="h-7 bg-transparent p-0">
                      <TabsTrigger value="forecast" className="h-6 px-3 text-[11px]">
                        Forecast Breakdown
                      </TabsTrigger>
                      <TabsTrigger value="scenarios" className="h-6 px-3 text-[11px]">
                        Scenario Analysis
                      </TabsTrigger>
                      <TabsTrigger value="accuracy" className="h-6 px-3 text-[11px]">
                        Model Accuracy
                        <Badge className="ml-1 h-3 px-1 text-[9px] bg-green-100 text-green-700 border-0">87%</Badge>
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="forecast" className="m-0 p-2">
                  <DataTable columns={columns} data={tableData} />
                </TabsContent>

                <TabsContent value="scenarios" className="m-0 p-4">
                  <div className="text-center text-sm text-gray-500">
                    Compare multiple forecast scenarios side-by-side
                  </div>
                </TabsContent>

                <TabsContent value="accuracy" className="m-0 p-4">
                  <div className="text-center text-sm text-gray-500">
                    Historical accuracy metrics and backtesting results
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
