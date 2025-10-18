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
  Target,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Info,
  ExternalLink,
  MoreVertical,
  X,
  CheckCircle2,
  Clock,
  Zap,
  Activity,
  Shield,
  BarChart3,
  AlertCircle,
  DollarSign,
  Users,
  Building2,
  Gauge,
  LineChart as LineChartIcon
} from 'lucide-react'
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Bar, BarChart, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie } from 'recharts'
import { DataTable } from '@/components/tables/DataTable'
import { PageSkeleton } from '@/components/loading/PageSkeleton'

const generateSparkline = (trend: string) => {
  const points = 12
  const data = []
  for (let i = 0; i < points; i++) {
    const base = trend === 'up' ? 50 + i * 3 : trend === 'down' ? 100 - i * 3 : 70
    data.push({ x: i, y: base + Math.random() * 10 })
  }
  return data
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
        {sparkline && (
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
        )}
      </div>
    </div>
  </div>
)

export default function MarketEntryPage() {
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

  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([])
  const [timeframe, setTimeframe] = useState('30d')
  const [analysisMode, setAnalysisMode] = useState('opportunity')

  const [frameworks, setFrameworks] = useState([
    { id: 1, name: 'SWOT Analysis', color: '#3b82f6', expanded: true },
    { id: 2, name: "Porter's 5 Forces", color: '#8b5cf6', expanded: false },
    { id: 3, name: 'PESTEL', color: '#10b981', expanded: false }
  ])

  const [segments, setSegments] = useState([
    { id: 1, name: 'High-Growth Markets', expanded: true, conditions: ['GDP Growth > 5%', 'Market Size > $100B'] },
    { id: 2, name: 'Low Barrier Entry', expanded: false, conditions: ['Ease of Doing Business > 7/10', 'FDI Index > 70'] }
  ])

  // TAM/SAM/SOM data for visualization
  const marketSizingData = [
    { name: 'TAM', value: 500, fill: '#3b82f6', label: '$500B' },
    { name: 'SAM', value: 150, fill: '#8b5cf6', label: '$150B' },
    { name: 'SOM', value: 25, fill: '#10b981', label: '$25B' }
  ]

  // Porter's 5 Forces radar data
  const portersData = [
    { force: 'Supplier Power', value: 65 },
    { force: 'Buyer Power', value: 72 },
    { force: 'Rivalry', value: 80 },
    { force: 'Substitutes', value: 55 },
    { force: 'New Entrants', value: 48 }
  ]

  const opportunityData = [
    { market: 'UAE', score: 8.5, marketSize: 245, growth: 6.2, barriers: 'Low', competition: 'Medium', roi: '18-24 mo' },
    { market: 'Saudi Arabia', score: 8.2, marketSize: 892, growth: 5.8, barriers: 'Low', competition: 'High', roi: '12-18 mo' },
    { market: 'Singapore', score: 7.8, marketSize: 152, growth: 4.5, barriers: 'Low', competition: 'High', roi: '12-18 mo' },
    { market: 'India', score: 7.5, marketSize: 3280, growth: 7.8, barriers: 'Medium', competition: 'High', roi: '24-36 mo' },
    { market: 'Germany', score: 7.2, marketSize: 4560, growth: 2.1, barriers: 'Medium', competition: 'Very High', roi: '24-36 mo' },
    { market: 'Brazil', score: 6.8, marketSize: 2180, growth: 3.5, barriers: 'High', competition: 'Medium', roi: '36+ mo' },
    { market: 'Japan', score: 6.5, marketSize: 5250, growth: 1.2, barriers: 'High', competition: 'Very High', roi: '36+ mo' },
    { market: 'China', score: 6.2, marketSize: 17890, growth: 5.2, barriers: 'Very High', competition: 'Very High', roi: '36+ mo' }
  ]

  const columns = [
    {
      accessorKey: 'market',
      header: 'Market',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-3 h-3 rounded border-gray-300"
            checked={selectedMarkets.includes(row.getValue('market'))}
            onChange={() => {
              const market = row.getValue('market')
              setSelectedMarkets(prev =>
                prev.includes(market) ? prev.filter(m => m !== market) : [...prev, market]
              )
            }}
          />
          <span className="font-medium text-gray-900">{row.getValue('market')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'score',
      header: 'Opportunity Score',
      cell: ({ row }: any) => {
        const score = parseFloat(row.getValue('score'))
        const color = score >= 8 ? 'text-green-600' : score >= 7 ? 'text-blue-600' : 'text-orange-600'
        return (
          <div className={`flex items-center gap-1.5 ${color}`}>
            <div className="font-semibold">{score}/10</div>
            <Gauge className="h-3.5 w-3.5" />
          </div>
        )
      },
    },
    {
      accessorKey: 'marketSize',
      header: 'Market Size ($B)',
      cell: ({ row }: any) => (
        <div className="text-right font-medium text-gray-900">${row.getValue('marketSize')}</div>
      ),
    },
    {
      accessorKey: 'growth',
      header: 'Growth Rate',
      cell: ({ row }: any) => {
        const value = parseFloat(row.getValue('growth'))
        return (
          <div className="flex items-center gap-1.5 justify-end text-green-600">
            <span className="font-medium">{value}%</span>
            <TrendingUp className="h-3.5 w-3.5" />
          </div>
        )
      },
    },
    {
      accessorKey: 'barriers',
      header: 'Entry Barriers',
      cell: ({ row }: any) => {
        const value = row.getValue('barriers')
        const colorMap: any = {
          'Low': 'bg-green-100 text-green-700',
          'Medium': 'bg-yellow-100 text-yellow-700',
          'High': 'bg-orange-100 text-orange-700',
          'Very High': 'bg-red-100 text-red-700'
        }
        return (
          <div className="flex justify-end">
            <Badge className={`text-[9px] px-1.5 border-0 ${colorMap[value]}`}>{value}</Badge>
          </div>
        )
      },
    },
    {
      accessorKey: 'competition',
      header: 'Competition',
      cell: ({ row }: any) => {
        const value = row.getValue('competition')
        const colorMap: any = {
          'Low': 'bg-green-100 text-green-700',
          'Medium': 'bg-yellow-100 text-yellow-700',
          'High': 'bg-orange-100 text-orange-700',
          'Very High': 'bg-red-100 text-red-700'
        }
        return (
          <div className="flex justify-end">
            <Badge className={`text-[9px] px-1.5 border-0 ${colorMap[value]}`}>{value}</Badge>
          </div>
        )
      },
    },
    {
      accessorKey: 'roi',
      header: 'Est. ROI Timeline',
      cell: ({ row }: any) => (
        <div className="text-right text-gray-700 text-xs">{row.getValue('roi')}</div>
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
            <span className="text-[10px] font-semibold text-gray-700">Analysis Frameworks</span>
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
            {/* Frameworks Section */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Frameworks</span>
              </div>

              {frameworks.map((framework) => (
                <div key={framework.id} className="bg-gray-50 rounded-md p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => setFrameworks(frameworks.map(f =>
                        f.id === framework.id ? { ...f, expanded: !f.expanded } : f
                      ))}
                    >
                      <ChevronDown className={`h-3 w-3 transition-transform ${framework.expanded ? '' : '-rotate-90'}`} />
                    </Button>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: framework.color }}></div>
                    <span className="text-[11px] font-medium text-gray-900 flex-1">{framework.name}</span>
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                      <MoreVertical className="h-3 w-3 text-gray-400" />
                    </Button>
                  </div>
                  {framework.expanded && (
                    <div className="mt-2 pl-6 space-y-1">
                      <Button variant="outline" size="sm" className="w-full h-5 text-[10px] px-2 text-gray-600">
                        <Zap className="h-2.5 w-2.5 mr-1" />
                        Generate Analysis
                      </Button>
                    </div>
                  )}
                </div>
              ))}

              <Button variant="outline" size="sm" className="w-full h-6 text-[10px] text-gray-600">
                <Plus className="h-3 w-3 mr-1" />
                Add Framework
              </Button>
            </div>

            {/* Analysis Mode */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Analysis Mode</span>
              </div>

              <div className="space-y-1">
                <Button
                  variant={analysisMode === 'opportunity' ? 'default' : 'outline'}
                  size="sm"
                  className="w-full h-6 text-[10px] justify-start"
                  onClick={() => setAnalysisMode('opportunity')}
                >
                  <Target className="h-3 w-3 mr-1.5" />
                  Opportunity Assessment
                </Button>
                <Button
                  variant={analysisMode === 'risk' ? 'default' : 'outline'}
                  size="sm"
                  className="w-full h-6 text-[10px] justify-start"
                  onClick={() => setAnalysisMode('risk')}
                >
                  <Shield className="h-3 w-3 mr-1.5" />
                  Risk Analysis
                </Button>
                <Button
                  variant={analysisMode === 'sizing' ? 'default' : 'outline'}
                  size="sm"
                  className="w-full h-6 text-[10px] justify-start"
                  onClick={() => setAnalysisMode('sizing')}
                >
                  <BarChart3 className="h-3 w-3 mr-1.5" />
                  Market Sizing
                </Button>
              </div>
            </div>

            {/* Segments */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Market Segments</span>
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
                  </div>
                  {segment.expanded && (
                    <div className="mt-2 pl-6 space-y-1">
                      {segment.conditions.map((condition, idx) => (
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
                <Target className="h-4 w-4 text-blue-600" />
                <h1 className="text-sm font-semibold text-gray-900">Market Entry Intelligence</h1>
                <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0 bg-green-50 border-green-200 text-green-700">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                  Live
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <Clock className="h-3 w-3" />
                <span>Updated 5 min ago</span>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                  <RefreshCw className="h-3 w-3" />
                </Button>
                <span className="text-gray-300">•</span>
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span className="text-green-600">92% confidence</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600">
                <Plus className="h-3 w-3 mr-1" />
                Add View
              </Button>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600">
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
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50">Export as PDF</button>
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50">Export as CSV</button>
                  </div>
                )}
              </div>
              <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600">
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
                <Select value="auto">
                  <SelectTrigger className="h-7 w-40 text-[11px] border-purple-300 bg-purple-50 text-purple-700">
                    <Zap className="h-3 w-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto-Assessment</SelectItem>
                    <SelectItem value="manual">Manual Analysis</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm" className="h-7 text-[11px] px-3">
                  <Activity className="h-3 w-3 mr-1" />
                  Compare Markets
                </Button>
              </div>

              <div className="flex gap-0.5">
                {['7d', '30d', '90d', '1Y'].map((period) => (
                  <Button
                    key={period}
                    variant="ghost"
                    size="sm"
                    onClick={() => setTimeframe(period)}
                    className={`h-6 text-[10px] px-2 ${
                      timeframe === period ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600'
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
                title="TAM"
                value="$500B"
                change="Total Market"
                changeType="up"
                period="Addressable"
                icon={<DollarSign className="h-3 w-3" />}
              />
              <MetricCard
                title="SAM"
                value="$150B"
                change="30% of TAM"
                changeType="up"
                period="Serviceable"
                icon={<Target className="h-3 w-3" />}
              />
              <MetricCard
                title="SOM"
                value="$25B"
                change="5% of TAM"
                changeType="up"
                period="Obtainable"
                icon={<Activity className="h-3 w-3" />}
              />
              <MetricCard
                title="Avg Entry Cost"
                value="$2.5M"
                change="+5%"
                changeType="up"
                period="Initial Capital"
                sparkline={generateSparkline('up')}
                icon={<DollarSign className="h-3 w-3" />}
              />
              <MetricCard
                title="Markets Analyzed"
                value="45"
                change="+8"
                changeType="up"
                period="Countries"
                icon={<Building2 className="h-3 w-3" />}
              />
              <MetricCard
                title="Avg ROI Time"
                value="22 mo"
                change="-3 mo"
                changeType="down"
                period="Breakeven"
                sparkline={generateSparkline('down')}
                icon={<TrendingUp className="h-3 w-3" />}
              />
            </div>

            {/* Visualization Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* TAM/SAM/SOM Chart */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-gray-900">Market Sizing (TAM/SAM/SOM)</h3>
                </div>
                <div className="h-[180px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={marketSizingData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {marketSizingData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 text-[10px] mt-2">
                  {marketSizingData.map((item) => (
                    <div key={item.name} className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></div>
                      <span className="text-gray-600">{item.name}: {item.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Porter's 5 Forces Radar */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-gray-900">Porter's Five Forces Analysis</h3>
                </div>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={portersData}>
                      <PolarGrid stroke="#e5e7eb" />
                      <PolarAngleAxis dataKey="force" tick={{ fill: '#6b7280', fontSize: 9 }} />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 8 }} />
                      <Radar
                        name="Intensity"
                        dataKey="value"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                      />
                      <Tooltip />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Opportunity Assessment Table */}
            <Tabs defaultValue="assessment" className="w-full">
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-3 py-2 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <TabsList className="h-7 bg-transparent p-0">
                      <TabsTrigger value="assessment" className="h-6 px-3 text-[11px] data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                        Opportunity Assessment
                      </TabsTrigger>
                      <TabsTrigger value="swot" className="h-6 px-3 text-[11px] data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                        SWOT Analysis
                      </TabsTrigger>
                      <TabsTrigger value="timeline" className="h-6 px-3 text-[11px] data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                        Entry Timeline
                        <Badge className="ml-1 h-3 px-1 text-[9px] bg-purple-100 text-purple-700 border-0">Beta</Badge>
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500">Sort by:</span>
                      <Select defaultValue="score">
                        <SelectTrigger className="h-6 w-28 text-[10px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="score">Opp. Score</SelectItem>
                          <SelectItem value="size">Market Size</SelectItem>
                          <SelectItem value="growth">Growth Rate</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="assessment" className="m-0 p-2">
                  {selectedMarkets.length > 0 && (
                    <div className="mb-2 flex items-center gap-2 px-2 py-1.5 bg-blue-50 rounded-md">
                      <Badge className="text-[10px] px-2 py-0 bg-blue-600 text-white border-0">
                        {selectedMarkets.length} selected
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-blue-600">
                        <Activity className="h-3 w-3 mr-1" />
                        Compare markets
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-blue-600">
                        <Zap className="h-3 w-3 mr-1" />
                        Generate report
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600" onClick={() => setSelectedMarkets([])}>
                        <X className="h-3 w-3 mr-1" />
                        Clear
                      </Button>
                    </div>
                  )}
                  <DataTable columns={columns} data={opportunityData} />
                </TabsContent>

                <TabsContent value="swot" className="m-0 p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-green-200 rounded-lg p-3 bg-green-50">
                      <h4 className="text-xs font-semibold text-green-900 mb-2 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Strengths
                      </h4>
                      <ul className="text-[10px] text-green-800 space-y-1">
                        <li>• Strong digital infrastructure</li>
                        <li>• Favorable FDI policies</li>
                        <li>• Growing middle class</li>
                      </ul>
                    </div>
                    <div className="border border-red-200 rounded-lg p-3 bg-red-50">
                      <h4 className="text-xs font-semibold text-red-900 mb-2 flex items-center gap-1">
                        <TrendingDown className="h-3 w-3" />
                        Weaknesses
                      </h4>
                      <ul className="text-[10px] text-red-800 space-y-1">
                        <li>• High entry costs</li>
                        <li>• Complex regulations</li>
                        <li>• Language barriers</li>
                      </ul>
                    </div>
                    <div className="border border-blue-200 rounded-lg p-3 bg-blue-50">
                      <h4 className="text-xs font-semibold text-blue-900 mb-2 flex items-center gap-1">
                        <Target className="h-3 w-3" />
                        Opportunities
                      </h4>
                      <ul className="text-[10px] text-blue-800 space-y-1">
                        <li>• Untapped market segments</li>
                        <li>• Government incentives</li>
                        <li>• Strategic partnerships</li>
                      </ul>
                    </div>
                    <div className="border border-orange-200 rounded-lg p-3 bg-orange-50">
                      <h4 className="text-xs font-semibold text-orange-900 mb-2 flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        Threats
                      </h4>
                      <ul className="text-[10px] text-orange-800 space-y-1">
                        <li>• Intense local competition</li>
                        <li>• Political instability</li>
                        <li>• Currency fluctuations</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="timeline" className="m-0 p-4">
                  <div className="text-center text-sm text-gray-500">
                    Interactive entry timeline and milestone tracker coming soon
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
