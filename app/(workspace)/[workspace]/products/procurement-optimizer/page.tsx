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
  BarChart as BarChartIcon,
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
  Package,
  DollarSign,
  ShoppingCart,
  TruckIcon,
  ArrowUpRight,
  ArrowDownRight,
  Search
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ComposedChart, ReferenceLine, Line, PieChart, Pie, Cell } from 'recharts'
import { DataTable } from '@/components/tables/DataTable'
import { PageSkeleton } from '@/components/loading/PageSkeleton'

// Generate procurement data
const generateProcurementData = () => {
  return [
    { month: 'Jan', cost: 285000, savings: 15000, volume: 1250, efficiency: 92 },
    { month: 'Feb', cost: 290000, savings: 18000, volume: 1280, efficiency: 93 },
    { month: 'Mar', cost: 275000, savings: 22000, volume: 1200, efficiency: 95 },
    { month: 'Apr', cost: 295000, savings: 16000, volume: 1300, efficiency: 91 },
    { month: 'May', cost: 280000, savings: 21000, volume: 1240, efficiency: 94 },
    { month: 'Jun', cost: 270000, savings: 25000, volume: 1190, efficiency: 96 },
    { month: 'Jul', cost: 288000, savings: 19000, volume: 1270, efficiency: 93 },
    { month: 'Aug', cost: 282000, savings: 20000, volume: 1235, efficiency: 94 },
    { month: 'Sep', cost: 265000, savings: 27000, volume: 1175, efficiency: 97 },
    { month: 'Oct', cost: 292000, savings: 17000, volume: 1285, efficiency: 92 },
    { month: 'Nov', cost: 278000, savings: 23000, volume: 1220, efficiency: 95 },
    { month: 'Dec', cost: 273000, savings: 26000, volume: 1205, efficiency: 96 }
  ]
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

const MetricCard = ({ title, value, change, changeType, period, sparkline, icon: Icon, alert }: any) => (
  <div className="bg-white rounded-lg p-2 border border-gray-200 hover:shadow-md transition-all group relative">
    {alert && (
      <div className="absolute top-1.5 right-1.5">
        <AlertCircle className="h-2.5 w-2.5 text-orange-500" />
      </div>
    )}
    <div className="flex items-start justify-between mb-1">
      <div className="flex-1">
        <div className="flex items-center gap-1 mb-0.5">
          {Icon && <Icon className="h-3 w-3 text-gray-500" />}
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

export default function ProcurementOptimizerPage() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('app_loaded')
    }
    return true
  })
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [timeframe, setTimeframe] = useState('30d')
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [chartType, setChartType] = useState('bar')
  const [granularity, setGranularity] = useState('monthly')
  const [optimizationMode, setOptimizationMode] = useState('cost')

  const [indicators, setIndicators] = useState([
    { id: 1, name: 'Cost Optimization', color: '#10b981', expanded: true, filters: [] },
    { id: 2, name: 'Supplier Performance', color: '#3b82f6', expanded: false, filters: [] },
    { id: 3, name: 'Delivery Efficiency', color: '#8b5cf6', expanded: false, filters: [] }
  ])

  const [strategies, setStrategies] = useState([
    { id: 1, name: 'Bulk Purchasing', expanded: true, conditions: ['Min order: 1000 units', 'Discount: 12%'] },
    { id: 2, name: 'Multi-Supplier', expanded: false, conditions: ['Risk diversification', 'Price competition'] },
    { id: 3, name: 'Just-in-Time', expanded: false, conditions: ['Reduced inventory', 'Lower holding costs'] }
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

  const procurementData = useMemo(() => generateProcurementData(), [])

  const supplierData = [
    { name: 'Supplier A', value: 35, color: '#3b82f6' },
    { name: 'Supplier B', value: 28, color: '#10b981' },
    { name: 'Supplier C', value: 22, color: '#8b5cf6' },
    { name: 'Supplier D', value: 15, color: '#f59e0b' }
  ]

  const tableData = [
    {
      supplier: 'Global Materials Inc',
      category: 'Raw Materials',
      monthlyCost: 125000,
      potential: 18000,
      rating: 4.5,
      leadTime: '14 days',
      status: 'Optimized'
    },
    {
      supplier: 'TechParts Co',
      category: 'Components',
      monthlyCost: 95000,
      potential: 12000,
      rating: 4.8,
      leadTime: '7 days',
      status: 'Review'
    },
    {
      supplier: 'LogiSupply Ltd',
      category: 'Logistics',
      monthlyCost: 45000,
      potential: 5500,
      rating: 4.2,
      leadTime: '3 days',
      status: 'Optimized'
    },
    {
      supplier: 'Quality Goods SA',
      category: 'Packaging',
      monthlyCost: 28000,
      potential: 3200,
      rating: 4.6,
      leadTime: '5 days',
      status: 'Optimized'
    },
    {
      supplier: 'FastShip Express',
      category: 'Shipping',
      monthlyCost: 52000,
      potential: 8500,
      rating: 4.0,
      leadTime: '2 days',
      status: 'Action Needed'
    }
  ]

  const columns = [
    {
      accessorKey: 'supplier',
      header: 'Supplier',
      cell: ({ row }: any) => (
        <div>
          <div className="font-medium text-gray-900">{row.getValue('supplier')}</div>
          <div className="text-[10px] text-gray-500">{row.original.category}</div>
        </div>
      ),
    },
    {
      accessorKey: 'monthlyCost',
      header: 'Monthly Cost',
      cell: ({ row }: any) => (
        <div className="font-medium text-gray-900">
          ${row.getValue('monthlyCost').toLocaleString()}
        </div>
      ),
    },
    {
      accessorKey: 'potential',
      header: 'Savings Potential',
      cell: ({ row }: any) => {
        const value = row.getValue('potential')
        return (
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-green-600">${value.toLocaleString()}</span>
            <ArrowDownRight className="h-3.5 w-3.5 text-green-600" />
          </div>
        )
      },
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }: any) => {
        const value = parseFloat(row.getValue('rating'))
        return (
          <div className="flex items-center gap-1">
            <span className="font-medium text-gray-900">{value}</span>
            <span className="text-yellow-500">★</span>
          </div>
        )
      },
    },
    {
      accessorKey: 'leadTime',
      header: 'Lead Time',
      cell: ({ row }: any) => (
        <span className="text-[11px] text-gray-600">{row.getValue('leadTime')}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => {
        const status = row.getValue('status')
        return (
          <Badge className={`text-[10px] ${
            status === 'Optimized' ? 'bg-green-50 text-green-700' :
            status === 'Review' ? 'bg-blue-50 text-blue-700' :
            'bg-orange-50 text-orange-700'
          }`}>
            {status}
          </Badge>
        )
      },
    },
  ]

  if (isLoading) return <PageSkeleton />

  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
      {/* LEFT ANALYSIS PANEL */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${leftPanelCollapsed ? 'w-0' : 'w-64'} flex-shrink-0 overflow-hidden`}>
        <div className="h-full flex flex-col">
          <div className="px-2 py-1.5 border-b border-gray-200 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-gray-700">Optimization</span>
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
            {/* Optimization Mode */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Mode</span>
              <Select value={optimizationMode} onValueChange={setOptimizationMode}>
                <SelectTrigger className="h-7 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cost">Cost Minimization</SelectItem>
                  <SelectItem value="quality">Quality Maximization</SelectItem>
                  <SelectItem value="speed">Speed Optimization</SelectItem>
                  <SelectItem value="balanced">Balanced Approach</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Indicators */}
            <div className="space-y-1.5 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Metrics</span>
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
                      <div className="text-[10px] text-gray-600">Target: Top quartile</div>
                      <div className="text-[10px] text-gray-600">Current: 94%</div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Strategies */}
            <div className="space-y-1.5 pt-2 border-t border-gray-200">
              <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Strategies</span>
              {strategies.map((strategy, idx) => (
                <div key={strategy.id} className="bg-gray-50 rounded-md p-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-gray-400">{idx + 1}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => setStrategies(strategies.map(s =>
                        s.id === strategy.id ? { ...s, expanded: !s.expanded } : s
                      ))}
                    >
                      <ChevronDown className={`h-3 w-3 transition-transform ${strategy.expanded ? '' : '-rotate-90'}`} />
                    </Button>
                    <span className="text-[11px] font-medium text-gray-900 flex-1">{strategy.name}</span>
                  </div>
                  {strategy.expanded && (
                    <div className="mt-2 pl-6 space-y-1">
                      {strategy.conditions.map((condition, idx) => (
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
                Add Strategy
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
                <ShoppingCart className="h-4 w-4 text-emerald-600" />
                <h1 className="text-sm font-semibold text-gray-900">Procurement Optimizer</h1>
                <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0 bg-green-50 border-green-200 text-green-700">
                  <CheckCircle2 className="w-1.5 h-1.5 mr-1" />
                  Active
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
                <span className="text-green-600">$245K saved YTD</span>
                <span className="text-gray-300">•</span>
                <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Suppliers <ExternalLink className="h-2.5 w-2.5" />
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
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50">Export as PDF</button>
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50">Export as CSV</button>
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
                    <BarChartIcon className="h-3 w-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar chart</SelectItem>
                    <SelectItem value="line">Line chart</SelectItem>
                    <SelectItem value="pie">Pie chart</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={granularity} onValueChange={setGranularity}>
                  <SelectTrigger className="h-7 w-24 text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="sm" className="h-7 text-[11px] px-3">
                  <Target className="h-3 w-3 mr-1" />
                  Run Optimization
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
                      timeframe === period
                        ? 'bg-emerald-50 text-emerald-700 font-medium'
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
                title="Total Spend"
                value="$3.4M"
                change="-8.5%"
                changeType="down"
                period="This Year"
                sparkline={generateSparkline('down')}
                icon={DollarSign}
              />
              <MetricCard
                title="Cost Savings"
                value="$245K"
                change="+12%"
                changeType="up"
                period="YTD"
                sparkline={generateSparkline('up')}
                icon={TrendingDown}
              />
              <MetricCard
                title="Active Suppliers"
                value="47"
                change="-3"
                changeType="down"
                period="Optimized"
                sparkline={generateSparkline('flat')}
                icon={Package}
              />
              <MetricCard
                title="Avg Lead Time"
                value="8.5d"
                change="-1.2d"
                changeType="down"
                period="Improved"
                sparkline={generateSparkline('down')}
                icon={TruckIcon}
              />
              <MetricCard
                title="Quality Score"
                value="4.6/5"
                change="+0.3"
                changeType="up"
                period="Excellent"
                sparkline={generateSparkline('up')}
                icon={CheckCircle2}
              />
              <MetricCard
                title="Efficiency"
                value="94%"
                change="+5%"
                changeType="up"
                period="High"
                sparkline={generateSparkline('up')}
                icon={Zap}
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-2 gap-2">
              {/* Cost & Savings Chart */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-gray-900">Cost & Savings Trend</h3>
                  <div className="flex items-center gap-2 text-[10px]">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-gray-600">Cost</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-gray-600">Savings</span>
                    </div>
                  </div>
                </div>
                <div className="h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={procurementData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
                      <XAxis dataKey="month" tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} />
                      <YAxis tick={{ fill: '#9ca3af', fontSize: 10 }} tickLine={false} width={50} />
                      <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '11px' }} />
                      <Bar dataKey="cost" fill="#ef4444" />
                      <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2} dot={false} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Supplier Distribution */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-semibold text-gray-900">Supplier Distribution</h3>
                </div>
                <div className="h-[180px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={supplierData}
                        cx="50%"
                        cy="50%"
                        outerRadius={60}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                        labelLine={false}
                      >
                        {supplierData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Supplier Table */}
            <Tabs defaultValue="suppliers" className="w-full">
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-3 py-2 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <TabsList className="h-7 bg-transparent p-0">
                      <TabsTrigger value="suppliers" className="h-6 px-3 text-[11px]">
                        Supplier Analysis
                      </TabsTrigger>
                      <TabsTrigger value="opportunities" className="h-6 px-3 text-[11px]">
                        Optimization Opportunities
                        <Badge className="ml-1 h-3 px-1 text-[9px] bg-green-100 text-green-700 border-0">5</Badge>
                      </TabsTrigger>
                      <TabsTrigger value="contracts" className="h-6 px-3 text-[11px]">
                        Contract Renewals
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600">
                        <Search className="h-3 w-3 mr-1" />
                        Search
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="suppliers" className="m-0 p-2">
                  <DataTable columns={columns} data={tableData} />
                </TabsContent>

                <TabsContent value="opportunities" className="m-0 p-4">
                  <div className="space-y-3">
                    {[
                      { title: 'Consolidate shipping vendors', savings: '$18K/year', priority: 'High' },
                      { title: 'Renegotiate bulk pricing', savings: '$12K/year', priority: 'Medium' },
                      { title: 'Switch to local supplier', savings: '$8K/year', priority: 'Low' }
                    ].map((opp, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm text-gray-900">{opp.title}</div>
                          <div className="text-xs text-gray-600">Potential savings: {opp.savings}</div>
                        </div>
                        <Badge className={`text-[10px] ${
                          opp.priority === 'High' ? 'bg-red-50 text-red-700' :
                          opp.priority === 'Medium' ? 'bg-orange-50 text-orange-700' :
                          'bg-blue-50 text-blue-700'
                        }`}>
                          {opp.priority}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="contracts" className="m-0 p-4">
                  <div className="text-center text-sm text-gray-500">
                    Upcoming contract renewals and negotiations
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
