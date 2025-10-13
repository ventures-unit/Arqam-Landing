'use client'

import { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Download,
  Share2,
  Calendar,
  ChevronDown,
  ChevronRight,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Bookmark,
  Plus,
  SlidersHorizontal,
  TrendingUp,
  TrendingDown,
  FileText,
  Image,
  FileSpreadsheet,
  Eye,
  EyeOff,
  RefreshCw,
  BarChart3,
  LineChart as LineChartIcon,
  Info,
  ExternalLink,
  MoreVertical,
  X,
  Filter,
  Settings,
  AlertCircle,
  CheckCircle2,
  Clock,
  Zap,
  Target,
  Activity,
  PieChart as PieChartIcon,
  BarChart2
} from 'lucide-react'
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ComposedChart, ReferenceLine, Dot } from 'recharts'
import { DataTable } from '@/components/tables/DataTable'
import { generateEconomyData } from '@/lib/modules/mockData'
import { PageSkeleton } from '@/components/loading/PageSkeleton'
import { useGeographicData, useGeographicLabel } from '@/lib/hooks/useGeographicData'

const data = generateEconomyData()

// Sparkline generator
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

// Generate forecast data
const generateForecastData = (baseData: any[]) => {
  const lastValue = baseData[baseData.length - 1]
  const forecastPoints = 8
  const forecast = []
  let value = parseFloat(lastValue.gdp)

  for (let i = 0; i < forecastPoints; i++) {
    value += (Math.random() - 0.4) * 0.5
    forecast.push({
      period: `F${i + 1}`,
      gdp: value,
      isForecast: true
    })
  }
  return forecast
}

const MetricCard = ({ title, value, change, changeType, period, sparkline, alert }: any) => (
  <div className="bg-white rounded-lg p-2 border border-gray-200 hover:shadow-md transition-all group relative">
    {alert && (
      <div className="absolute top-1.5 right-1.5">
        <AlertCircle className="h-2.5 w-2.5 text-orange-500" />
      </div>
    )}
    <div className="flex items-start justify-between mb-1">
      <div className="flex-1">
        <div className="flex items-center gap-1 mb-0.5">
          <span className="text-[10px] font-medium text-gray-600">{title}</span>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Info className="h-2.5 w-2.5 text-gray-400 hover:text-gray-600" />
          </button>
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

const CustomDot = (props: any) => {
  const { cx, cy, payload } = props
  if (payload.anomaly) {
    return (
      <circle cx={cx} cy={cy} r={4} fill="#f59e0b" stroke="#fff" strokeWidth={2} />
    )
  }
  return null
}

export default function EconomyPage() {
  // Loading state
  const [isLoading, setIsLoading] = useState(true)

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const [selectedCountry, setSelectedCountry] = useState('all')
  const [selectedMetric, setSelectedMetric] = useState('gdp')
  const [searchTerm, setSearchTerm] = useState('')
  const [timeframe, setTimeframe] = useState('30d')
  const [activeTab, setActiveTab] = useState('summary')
  const [showExportMenu, setShowExportMenu] = useState(false)
  const [compareMode, setCompareMode] = useState(false)
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [showForecast, setShowForecast] = useState(true)
  const [chartType, setChartType] = useState('line')
  const [granularity, setGranularity] = useState('daily')
  const [breakdownBy, setBreakdownBy] = useState('top4')
  const [indicators, setIndicators] = useState([
    { id: 1, name: 'GDP Growth', color: '#3b82f6', expanded: true, filters: [] },
    { id: 2, name: 'Inflation Rate', color: '#8b5cf6', expanded: false, filters: [] }
  ])
  const [segments, setSegments] = useState([
    { id: 1, name: 'All Countries', expanded: true, conditions: [] },
    { id: 2, name: 'Developed Markets', expanded: false, conditions: ['GDP per capita > $40k'] }
  ])

  // Apply geographic filtering first, then apply local filters
  const geographicFilteredData = useGeographicData(data.tableData)
  const geographicLabel = useGeographicLabel()

  const filteredData = useMemo(() =>
    geographicFilteredData.filter(item =>
      (selectedCountry === 'all' || item.country.toLowerCase() === selectedCountry) &&
      (searchTerm === '' || item.country.toLowerCase().includes(searchTerm.toLowerCase()))
    ), [geographicFilteredData, selectedCountry, searchTerm]
  )

  const chartData = useMemo(() => {
    const base = data.chartData.map((item, idx) => ({
      ...item,
      gdp: parseFloat(item.gdp),
      inflation: parseFloat(item.inflation),
      unemployment: parseFloat(item.unemployment),
      anomaly: idx === 5 || idx === 12 ? true : false
    }))

    if (showForecast) {
      return [...base, ...generateForecastData(base)]
    }
    return base
  }, [showForecast])

  const columns = [
    {
      accessorKey: 'country',
      header: 'Country',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            className="w-3 h-3 rounded border-gray-300"
            checked={selectedCountries.includes(row.getValue('country'))}
            onChange={() => {
              const country = row.getValue('country')
              setSelectedCountries(prev =>
                prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
              )
            }}
          />
          <div>
            <div className="font-medium text-gray-900">{row.getValue('country')}</div>
            {row.original.governorate && (
              <div className="text-[10px] text-gray-500">{row.original.governorate}</div>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'gdpGrowth',
      header: 'GDP Growth',
      cell: ({ row }: any) => {
        const value = parseFloat(row.getValue('gdpGrowth'))
        return (
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-gray-900">{value}%</span>
            {value > 2.5 ? (
              <ArrowUpRight className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5 text-red-600" />
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'inflation',
      header: 'Inflation',
      cell: ({ row }: any) => {
        const value = parseFloat(row.getValue('inflation'))
        return (
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-gray-900">{value}%</span>
            {value < 3 ? (
              <ArrowDownRight className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <ArrowUpRight className="h-3.5 w-3.5 text-red-600" />
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'unemployment',
      header: 'Unemployment',
      cell: ({ row }: any) => {
        const value = parseFloat(row.getValue('unemployment'))
        return (
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-gray-900">{value}%</span>
            {value < 4 ? (
              <ArrowDownRight className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <ArrowUpRight className="h-3.5 w-3.5 text-red-600" />
            )}
          </div>
        )
      },
    },
    {
      accessorKey: 'population',
      header: 'Population (M)',
      cell: ({ row }: any) => (
        <div className="text-gray-700">{row.getValue('population')}</div>
      ),
    },
    {
      accessorKey: 'gdpPerCapita',
      header: 'GDP per Capita',
      cell: ({ row }: any) => (
        <div className="font-mono text-sm text-gray-900">${parseFloat(row.getValue('gdpPerCapita')).toLocaleString()}</div>
      ),
    },
  ]

  if (isLoading) {
    return <PageSkeleton />
  }

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
                <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">Indicators</span>
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
                      {indicator.filters.length > 0 && (
                        <div className="text-[10px] text-gray-500 mt-1">
                          {indicator.filters.map((filter, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              <span>↳ {filter}</span>
                            </div>
                          ))}
                        </div>
                      )}
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
              <div className="flex items-center gap-1 mb-2">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Measured as</span>
                <Info className="h-3 w-3 text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-1">
                <Button variant="outline" size="sm" className="h-6 text-[10px]">Uniques</Button>
                <Button variant="outline" size="sm" className="h-6 text-[10px]">Totals</Button>
                <Button variant="outline" size="sm" className="h-6 text-[10px]">Average</Button>
                <Button variant="outline" size="sm" className="h-6 text-[10px]">Frequency</Button>
              </div>
              <Select defaultValue="none">
                <SelectTrigger className="h-6 text-[10px]">
                  <SelectValue placeholder="Properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="sum">Sum</SelectItem>
                  <SelectItem value="median">Median</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-500">ƒx</span>
                <Button variant="ghost" size="sm" className="h-5 text-[10px] px-1 text-blue-600">
                  Formula
                </Button>
                <Select defaultValue="none">
                  <SelectTrigger className="h-5 text-[10px] flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Segment By Section */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Segment by</span>
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
                  <Select defaultValue="none">
                    <SelectTrigger className="h-5 w-20 text-[10px]">
                      <SelectValue placeholder="Saved" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="saved1">Saved 1</SelectItem>
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
                        <Button variant="outline" size="sm" className="h-5 text-[10px] px-2 text-gray-600">
                          <Plus className="h-2.5 w-2.5 mr-1" />
                          Performed
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
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <h1 className="text-sm font-semibold text-gray-900">Economy Analytics</h1>
                <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0 bg-green-50 border-green-200 text-green-700">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                  Live
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <Clock className="h-3 w-3" />
                <span>Computed 4 min ago</span>
                <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                  <RefreshCw className="h-3 w-3" />
                </Button>
                <span className="text-gray-300">•</span>
                <CheckCircle2 className="h-3 w-3 text-green-600" />
                <span className="text-green-600">95% confidence</span>
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
                      <Image className="h-3 w-3 text-gray-500" />
                      Export as PNG
                    </button>
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50 flex items-center gap-2">
                      <FileSpreadsheet className="h-3 w-3 text-gray-500" />
                      Export as CSV
                    </button>
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50 flex items-center gap-2">
                      <FileSpreadsheet className="h-3 w-3 text-gray-500" />
                      Export as Excel
                    </button>
                    <button className="w-full px-3 py-1.5 text-[11px] text-left hover:bg-gray-50 flex items-center gap-2">
                      <FileText className="h-3 w-3 text-gray-500" />
                      Export as PDF
                    </button>
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
            {/* Analysis Controls Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Select value="anomaly-forecast">
                  <SelectTrigger className="h-7 w-40 text-[11px] border-orange-300 bg-orange-50 text-orange-700">
                    <Zap className="h-3 w-3 mr-1" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="anomaly">Anomaly Detection</SelectItem>
                    <SelectItem value="forecast">Forecast Only</SelectItem>
                    <SelectItem value="anomaly-forecast">Anomaly + Forecast</SelectItem>
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

                <div className="border-l border-gray-200 pl-2 ml-1 flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-[11px] px-2 text-blue-600"
                    onClick={() => setShowForecast(!showForecast)}
                  >
                    <Target className="h-3 w-3 mr-1" />
                    {showForecast ? 'Hide' : 'Show'} forecast
                  </Button>
                </div>
              </div>

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
                  </SelectContent>
                </Select>

                <Select value={granularity} onValueChange={setGranularity}>
                  <SelectTrigger className="h-7 w-24 text-[11px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-0.5 border-l border-gray-200 pl-2 ml-1">
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
            </div>

            {/* Compact Metrics with Alerts */}
            <div className="grid grid-cols-6 gap-2">
              <MetricCard
                title="GDP Growth"
                value="2.4%"
                change="+0.3%"
                changeType="up"
                period="Q4 2024"
                sparkline={generateSparkline('up')}
                alert={false}
              />
              <MetricCard
                title="Inflation"
                value="3.2%"
                change="-0.5%"
                changeType="down"
                period="Q4 2024"
                sparkline={generateSparkline('down')}
                alert={true}
              />
              <MetricCard
                title="Unemployment"
                value="4.1%"
                change="-0.2%"
                changeType="down"
                period="Q4 2024"
                sparkline={generateSparkline('down')}
                alert={false}
              />
              <MetricCard
                title="Interest Rate"
                value="5.5%"
                change="0.0%"
                changeType="flat"
                period="Current"
                sparkline={generateSparkline('flat')}
                alert={false}
              />
              <MetricCard
                title="Trade Balance"
                value="$45B"
                change="+2.1%"
                changeType="up"
                period="Monthly"
                sparkline={generateSparkline('up')}
                alert={false}
              />
              <MetricCard
                title="Consumer Conf."
                value="102.3"
                change="+1.8%"
                changeType="up"
                period="Index"
                sparkline={generateSparkline('up')}
                alert={false}
              />
            </div>

            {/* Advanced Chart with Forecast & Anomalies */}
            <div className="bg-white rounded-lg border border-gray-200 p-2.5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h3 className="text-xs font-semibold text-gray-900">Economic Indicators Trend</h3>
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
                      <div className="w-3 border-t-2 border-dashed border-gray-400"></div>
                      <span className="text-gray-500">Forecast</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertCircle className="h-3 w-3 text-orange-500" />
                      <span className="text-orange-600">Anomaly</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={chartData}>
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
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        fontSize: '11px',
                        padding: '6px 8px'
                      }}
                    />
                    <ReferenceLine y={2.5} stroke="#fbbf24" strokeDasharray="3 3" label={{ value: 'Target', position: 'right', fontSize: 10, fill: '#f59e0b' }} />
                    <Area
                      type="monotone"
                      dataKey="gdp"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      strokeDasharray={(payload: any) => payload?.isForecast ? '5 5' : '0'}
                      fill="url(#colorGdp)"
                      fillOpacity={1}
                      dot={<CustomDot />}
                    />
                    <Line
                      type="monotone"
                      dataKey="inflation"
                      stroke="#8b5cf6"
                      strokeWidth={2}
                      strokeDasharray={(payload: any) => payload?.isForecast ? '5 5' : '0'}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="unemployment"
                      stroke="#10b981"
                      strokeWidth={2}
                      strokeDasharray={(payload: any) => payload?.isForecast ? '5 5' : '0'}
                      dot={false}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                <div className="text-[10px] text-gray-500">
                  <span className="font-medium text-gray-700">2 anomalies detected</span> • Based on ARIMA forecasting model
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" className="h-5 text-[10px] px-2 text-gray-600">
                    <Settings className="h-3 w-3 mr-1" />
                    Configure
                  </Button>
                </div>
              </div>
            </div>

            {/* Breakdown Table with Root Cause Analysis */}
            <Tabs defaultValue="breakdown" className="w-full">
              <div className="bg-white rounded-lg border border-gray-200">
                <div className="px-3 py-2 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <TabsList className="h-7 bg-transparent p-0">
                      <TabsTrigger value="breakdown" className="h-6 px-3 text-[11px] data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                        Breakdown Table
                      </TabsTrigger>
                      <TabsTrigger value="root-cause" className="h-6 px-3 text-[11px] data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
                        Root Cause Analysis
                        <Badge className="ml-1 h-3 px-1 text-[9px] bg-purple-100 text-purple-700 border-0">Beta</Badge>
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500">Breakdown by:</span>
                      <Select value={breakdownBy} onValueChange={setBreakdownBy}>
                        <SelectTrigger className="h-6 w-32 text-[10px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="top4">Top 4 (Default)</SelectItem>
                          <SelectItem value="top10">Top 10</SelectItem>
                          <SelectItem value="all">All</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Info className="h-3 w-3 text-gray-400" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600">
                        <Download className="h-3 w-3 mr-1" />
                        Export CSV
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Search className="h-3 w-3 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                </div>

                <TabsContent value="breakdown" className="m-0 p-2">
                  {selectedCountries.length > 0 && (
                    <div className="mb-2 flex items-center gap-2 px-2 py-1.5 bg-blue-50 rounded-md">
                      <Badge className="text-[10px] px-2 py-0 bg-blue-600 text-white border-0">
                        {selectedCountries.length} selected
                      </Badge>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-blue-600">
                        <Activity className="h-3 w-3 mr-1" />
                        Compare selected
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-blue-600">
                        <Target className="h-3 w-3 mr-1" />
                        Create segment
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-gray-600" onClick={() => setSelectedCountries([])}>
                        <X className="h-3 w-3 mr-1" />
                        Clear
                      </Button>
                    </div>
                  )}
                  <DataTable columns={columns} data={filteredData} />
                </TabsContent>

                <TabsContent value="root-cause" className="m-0 p-4">
                  <div className="text-center max-w-xl mx-auto space-y-3">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 mb-2">
                      <Zap className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">AI-Powered Root Cause Analysis</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Automatically detect significant changes in your economic indicators and identify the underlying factors driving those changes.
                    </p>
                    <div className="bg-gray-50 rounded-lg p-4 text-left mt-4">
                      <div className="text-[11px] font-medium text-gray-700 mb-2">Why did GDP Growth increase by 0.3% this quarter?</div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-[10px]">
                          <ArrowUpRight className="h-3 w-3 text-green-600 mt-0.5" />
                          <div>
                            <span className="font-medium text-gray-900">Manufacturing output</span>
                            <span className="text-gray-600"> increased by 1.2% (+40% contribution)</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-[10px]">
                          <ArrowUpRight className="h-3 w-3 text-green-600 mt-0.5" />
                          <div>
                            <span className="font-medium text-gray-900">Export volume</span>
                            <span className="text-gray-600"> rose by 0.8% (+27% contribution)</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-[10px]">
                          <ArrowUpRight className="h-3 w-3 text-green-600 mt-0.5" />
                          <div>
                            <span className="font-medium text-gray-900">Consumer spending</span>
                            <span className="text-gray-600"> grew by 0.5% (+17% contribution)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="mt-4 h-7 text-[11px]">
                      <Zap className="h-3 w-3 mr-1" />
                      Generate Analysis
                    </Button>
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
