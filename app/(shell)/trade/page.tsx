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
  ArrowUpRight,
  ArrowDownRight,
  Bookmark,
  Plus,
  Globe,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  LineChart as LineChartIcon,
  Info,
  ExternalLink,
  MoreVertical,
  X,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Activity,
  Ship,
  Package,
  DollarSign,
  AlertCircle,
  Eye,
  Filter
} from 'lucide-react'
import { PageSkeleton } from '@/components/loading/PageSkeleton'
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Bar, BarChart, Cell, Sankey as RechartsSankey } from 'recharts'
import { DataTable } from '@/components/tables/DataTable'

const generateSparkline = (trend: string) => {
  const points = 12
  const data = []
  for (let i = 0; i < points; i++) {
    const base = trend === 'up' ? 50 + i * 3 : trend === 'down' ? 100 - i * 3 : 70
    data.push({ x: i, y: base + Math.random() * 10 })
  }
  return data
}

const generateTradeFlowData = () => {
  return [
    { period: 'Jan', exports: 245, imports: 198, balance: 47, volume: 443 },
    { period: 'Feb', exports: 252, imports: 205, balance: 47, volume: 457 },
    { period: 'Mar', exports: 268, imports: 218, balance: 50, volume: 486 },
    { period: 'Apr', exports: 271, imports: 225, balance: 46, volume: 496 },
    { period: 'May', exports: 285, imports: 238, balance: 47, volume: 523 },
    { period: 'Jun', exports: 292, imports: 245, balance: 47, volume: 537 },
    { period: 'Jul', exports: 305, imports: 258, balance: 47, volume: 563 },
    { period: 'Aug', exports: 298, imports: 252, balance: 46, volume: 550 },
    { period: 'Sep', exports: 312, imports: 265, balance: 47, volume: 577 },
    { period: 'Oct', exports: 325, imports: 275, balance: 50, volume: 600 },
    { period: 'Nov', exports: 318, imports: 268, balance: 50, volume: 586 },
    { period: 'Dec', exports: 335, imports: 282, balance: 53, volume: 617 }
  ]
}

const generateSankeyData = () => {
  // Sankey data format for Recharts
  return {
    nodes: [
      { name: 'Saudi Arabia' },
      { name: 'USA' },
      { name: 'China' },
      { name: 'Germany' },
      { name: 'India' },
      { name: 'Japan' }
    ],
    links: [
      { source: 0, target: 1, value: 85 },
      { source: 0, target: 2, value: 125 },
      { source: 0, target: 3, value: 45 },
      { source: 0, target: 4, value: 68 },
      { source: 0, target: 5, value: 52 }
    ]
  }
}

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

export default function TradePage() {
  // Loading state
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])
  const [selectedCountry, setSelectedCountry] = useState('all')
  const [timeframe, setTimeframe] = useState('30d')
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedPartners, setSelectedPartners] = useState<string[]>([])
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [chartType, setChartType] = useState('line')
  const [granularity, setGranularity] = useState('monthly')
  const [tradeType, setTradeType] = useState('both')

  const [indicators, setIndicators] = useState([
    { id: 1, name: 'Export Volume', color: '#3b82f6', expanded: true, filters: [] },
    { id: 2, name: 'Import Volume', color: '#8b5cf6', expanded: false, filters: [] },
    { id: 3, name: 'Trade Balance', color: '#10b981', expanded: false, filters: [] }
  ])

  const [segments, setSegments] = useState([
    { id: 1, name: 'Top Trading Partners', expanded: true, conditions: ['Volume > $50B/year'] },
    { id: 2, name: 'Emerging Markets', expanded: false, conditions: ['Growth > 15% YoY', 'Volume $5B-$50B'] }
  ])

  const chartData = useMemo(() => generateTradeFlowData(), [])
  const sankeyData = useMemo(() => generateSankeyData(), [])

  const tableData = [
    { partner: 'China', exports: 125.2, imports: 450.8, balance: -325.6, volume: 576.0, growth: 8.2, hsCode: '8471' },
    { partner: 'Canada', exports: 292.6, imports: 315.1, balance: -22.5, volume: 607.7, growth: 3.5, hsCode: '2709' },
    { partner: 'Mexico', exports: 256.6, imports: 358.3, balance: -101.7, volume: 614.9, growth: 5.1, hsCode: '8703' },
    { partner: 'Japan', exports: 75.0, imports: 132.1, balance: -57.1, volume: 207.1, growth: -2.1, hsCode: '8703' },
    { partner: 'Germany', exports: 57.7, imports: 125.8, balance: -68.1, volume: 183.5, growth: 4.3, hsCode: '3004' },
    { partner: 'S. Korea', exports: 56.7, imports: 74.3, balance: -17.6, volume: 131.0, growth: 6.8, hsCode: '8542' },
    { partner: 'UK', exports: 61.5, imports: 57.3, balance: 4.2, volume: 118.8, growth: 2.9, hsCode: '2710' },
    { partner: 'India', exports: 27.9, imports: 73.3, balance: -45.4, volume: 101.2, growth: 12.5, hsCode: '7102' }
  ]

  const columns = [
    {
      accessorKey: 'partner',
      header: 'Trading Partner',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-3 h-3 rounded border-gray-300"
            checked={selectedPartners.includes(row.getValue('partner'))}
            onChange={() => {
              const partner = row.getValue('partner')
              setSelectedPartners(prev =>
                prev.includes(partner) ? prev.filter(p => p !== partner) : [...prev, partner]
              )
            }}
          />
          <span className="font-medium text-gray-900">{row.getValue('partner')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'exports',
      header: 'Exports ($B)',
      cell: ({ row }: any) => (
        <div className="text-right font-medium text-gray-900">${row.getValue('exports')}</div>
      ),
    },
    {
      accessorKey: 'imports',
      header: 'Imports ($B)',
      cell: ({ row }: any) => (
        <div className="text-right font-medium text-gray-900">${row.getValue('imports')}</div>
      ),
    },
    {
      accessorKey: 'balance',
      header: 'Balance ($B)',
      cell: ({ row }: any) => {
        const value = parseFloat(row.getValue('balance'))
        return (
          <div className={`flex items-center gap-1.5 justify-end ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">${Math.abs(value)}</span>
            {value >= 0 ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'volume',
      header: 'Total Volume ($B)',
      cell: ({ row }: any) => (
        <div className="text-right text-gray-700">${row.getValue('volume')}</div>
      ),
    },
    {
      accessorKey: 'growth',
      header: 'YoY Growth',
      cell: ({ row }: any) => {
        const value = parseFloat(row.getValue('growth'))
        return (
          <div className={`flex items-center gap-1.5 justify-end ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">{value}%</span>
            {value >= 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          </div>
        )
      },
    },
    {
      accessorKey: 'hsCode',
      header: 'Top HS Code',
      cell: ({ row }: any) => (
        <div className="font-mono text-xs text-gray-600">{row.getValue('hsCode')}</div>
      ),
    },
  ]

  if (isLoading) return <PageSkeleton />

  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
      {/* LEFT ANALYSIS PANEL */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${leftPanelCollapsed ? 'w-0' : 'w-64'} flex-shrink-0 overflow-hidden`}>
        <div className="h-full flex flex-col">
          {/* Panel Header */}
          <div className="px-2 py-1.5 border-b border-gray-200 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-gray-700">Analysis</span>
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
            {/* Indicators Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Trade Indicators</span>
                <Button variant="ghost" size="sm" className="h-4 text-[9px] px-1 text-blue-600">
                  Explorer
                </Button>
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
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                      <MoreVertical className="h-3 w-3 text-gray-400" />
                    </Button>
                  </div>
                  {indicator.expanded && (
                    <div className="mt-2 pl-6 space-y-1">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="h-5 text-[10px] px-2 text-gray-600">
                          <Plus className="h-2.5 w-2.5 mr-1" />
                          Filter by
                        </Button>
                        <Button variant="outline" size="sm" className="h-5 text-[10px] px-2 text-gray-600">
                          <Plus className="h-2.5 w-2.5 mr-1" />
                          Group-by
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Button variant="outline" size="sm" className="w-full h-6 text-[10px] text-gray-600">
                <Plus className="h-3 w-3 mr-1" />
                Add Indicator
              </Button>
            </div>

            {/* Measured As Section */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Trade Type</span>
                <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                  <Info className="h-3 w-3 text-gray-400" />
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-1">
                <Button
                  variant={tradeType === 'exports' ? 'default' : 'outline'}
                  size="sm"
                  className="h-6 text-[10px]"
                  onClick={() => setTradeType('exports')}
                >
                  Exports
                </Button>
                <Button
                  variant={tradeType === 'imports' ? 'default' : 'outline'}
                  size="sm"
                  className="h-6 text-[10px]"
                  onClick={() => setTradeType('imports')}
                >
                  Imports
                </Button>
              </div>
              <Button
                variant={tradeType === 'both' ? 'default' : 'outline'}
                size="sm"
                className="w-full h-6 text-[10px]"
                onClick={() => setTradeType('both')}
              >
                Both (Balance)
              </Button>
            </div>

            {/* Segment By Section */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Segment by</span>
                <div className="flex gap-1">
                  <Select defaultValue="any">
                    <SelectTrigger className="h-5 w-16 text-[10px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="all">All</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {segments.map((segment, idx) => (
                <div key={segment.id} className="bg-gray-50 rounded-md p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-400">{idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => setSegments(segments.map(s =>
                        s.id === segment.id ? { ...s, expanded: !s.expanded } : s
                      ))}
                    >
                      <ChevronDown className={`h-3 w-3 transition-transform ${segment.expanded ? '' : '-rotate-90'}`} />
                    </Button>
                    <span className="text-[11px] font-medium text-gray-900 flex-1">{segment.name}</span>
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                      <X className="h-3 w-3 text-gray-400" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                      <MoreVertical className="h-3 w-3 text-gray-400" />
                    </Button>
                  </div>
                  {segment.expanded && (
                    <div className="mt-2 pl-6 space-y-1">
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm" className="h-5 text-[10px] px-2 text-gray-600">
                          <Plus className="h-2.5 w-2.5 mr-1" />
                          Filter by
                        </Button>
                      </div>
                      {segment.conditions.map((condition, idx) => (
                        <div key={idx} className="text-[10px] text-gray-600 flex items-center gap-1 mt-1">
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
                Add Segment
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
                <Globe className="h-4 w-4 text-blue-600" />
                <h1 className="text-sm font-semibold text-gray-900">Trade Analytics</h1>
                <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0 bg-green-50 border-green-200 text-green-700">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                  Live
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
                <span className="text-green-600">98% confidence</span>
                <span className="text-gray-300">•</span>
                <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Data sources <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600 hover:text-gray-900">
                <Plus className="h-3 w-3 mr-1" />
                Add View
              </Button>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600 hover:text-gray-900">
                <Bookmark className="h-3 w-3 mr-1" />
                Save
              </Button>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 text-[10px] px-2 text-gray-600"
                  onClick={() => setShowExportMenu(!showExportMenu)}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Export
                  <ChevronDown className="h-3 w-3 ml-1" />
                </Button>
                {showExportMenu && (
                  <div className="absolute right-0 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50 flex items-center gap-2">
                      Export as PNG
                    </button>
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50 flex items-center gap-2">
                      Export as CSV
                    </button>
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50 flex items-center gap-2">
                      Export as PDF
                    </button>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600 hover:text-gray-900">
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-3 pb-6 space-y-2.5">
            {/* Analysis Controls Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="h-7 w-32 text-[11px]">
                    <LineChartIcon className="h-3 w-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line chart</SelectItem>
                    <SelectItem value="bar">Bar chart</SelectItem>
                    <SelectItem value="area">Area chart</SelectItem>
                    <SelectItem value="sankey">Flow diagram</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={granularity} onValueChange={setGranularity}>
                  <SelectTrigger className="h-7 w-24 text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant={compareMode ? "default" : "outline"}
                  size="sm"
                  className={`h-7 text-[11px] px-3 ${compareMode ? 'bg-blue-600 text-white' : ''}`}
                  onClick={() => setCompareMode(!compareMode)}
                >
                  Compare
                </Button>
              </div>

              <div className="flex gap-0.5">
                {['7d', '30d', '60d', '90d', '1Y'].map((period) => (
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

            {/* Compact Metrics */}
            <div className="grid grid-cols-6 gap-2">
              <MetricCard
                title="Total Exports"
                value="$335B"
                change="+5.3%"
                changeType="up"
                period="Dec 2024"
                sparkline={generateSparkline('up')}
                alert={false}
                icon={<Ship className="h-3 w-3" />}
              />
              <MetricCard
                title="Total Imports"
                value="$282B"
                change="+3.8%"
                changeType="up"
                period="Dec 2024"
                sparkline={generateSparkline('up')}
                alert={false}
                icon={<Package className="h-3 w-3" />}
              />
              <MetricCard
                title="Trade Balance"
                value="$53B"
                change="+6.0%"
                changeType="up"
                period="Surplus"
                sparkline={generateSparkline('up')}
                alert={false}
                icon={<DollarSign className="h-3 w-3" />}
              />
              <MetricCard
                title="Trade Volume"
                value="$617B"
                change="+4.5%"
                changeType="up"
                period="Total"
                sparkline={generateSparkline('up')}
                alert={false}
                icon={<Activity className="h-3 w-3" />}
              />
              <MetricCard
                title="Top Export"
                value="Oil & Gas"
                change="$85B"
                changeType="up"
                period="HS 2709"
                sparkline={generateSparkline('up')}
                alert={false}
              />
              <MetricCard
                title="YoY Growth"
                value="+4.7%"
                change="vs 2023"
                changeType="up"
                period="Annual"
                sparkline={generateSparkline('up')}
                alert={false}
                icon={<TrendingUp className="h-3 w-3" />}
              />
            </div>

            {/* Trade Flow Chart */}
            <div className="bg-white rounded-lg border border-gray-200 p-2.5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-xs font-semibold text-gray-900">Trade Flow Trends</h3>
                  <div className="flex items-center gap-2 text-[10px]">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="text-gray-600">Exports</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-gray-600">Imports</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-gray-600">Balance</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData}>
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
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        fontSize: '11px',
                        padding: '6px 8px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="exports"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="imports"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                <div className="text-[10px] text-gray-500">
                  Trade data from World Trade Organization & National Statistics
                </div>
                <Button variant="ghost" size="sm" className="h-5 text-[10px] px-2 text-gray-600">
                  <Zap className="h-3 w-3 mr-1" />
                  Configure
                </Button>
              </div>
            </div>

            {/* Trading Partners Table */}
            <Tabs defaultValue="partners" className="w-full">
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-3 py-2 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <TabsList className="h-7 bg-transparent p-0">
                      <TabsTrigger value="partners" className="h-6 px-3 text-[11px] data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                        Trading Partners
                      </TabsTrigger>
                      <TabsTrigger value="products" className="h-6 px-3 text-[11px] data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                        Top Products
                      </TabsTrigger>
                      <TabsTrigger value="flows" className="h-6 px-3 text-[11px] data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                        Trade Flows
                        <Badge className="ml-1 h-3 px-1 text-[9px] bg-purple-100 text-purple-700 border-0">New</Badge>
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600">
                        <Download className="h-3 w-3 mr-1" />
                        Export CSV
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600">
                        <Filter className="h-3 w-3 mr-1" />
                        Filters
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="partners" className="m-0 p-2">
                  {selectedPartners.length > 0 && (
                    <div className="mb-2 flex items-center gap-2 px-2 py-1.5 bg-blue-50 rounded-md">
                      <Badge className="text-[10px] px-2 py-0 bg-blue-600 text-white border-0">
                        {selectedPartners.length} selected
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-blue-600">
                        <Activity className="h-3 w-3 mr-1" />
                        Compare selected
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-blue-600">
                        <Target className="h-3 w-3 mr-1" />
                        Create watchlist
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600" onClick={() => setSelectedPartners([])}>
                        <X className="h-3 w-3 mr-1" />
                        Clear
                      </Button>
                    </div>
                  )}
                  <DataTable columns={columns} data={tableData} />
                </TabsContent>

                <TabsContent value="products" className="m-0 p-4">
                  <div className="text-center text-sm text-gray-500">
                    Top products by HS code analysis coming soon
                  </div>
                </TabsContent>

                <TabsContent value="flows" className="m-0 p-4">
                  <div className="text-center text-sm text-gray-500">
                    Interactive Sankey flow diagram coming soon
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
