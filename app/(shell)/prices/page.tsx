'use client'

import { useState, useMemo, useEffect } from 'react'
import { AreaChart, Area, LineChart, Line, ComposedChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Cell } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { TrendingUp, TrendingDown, DollarSign, Activity, AlertCircle, Bell, BellOff, ChevronRight, ChevronLeft, ExternalLink, Download, Share2, RefreshCw, Settings, Filter, Search, X } from 'lucide-react'
import { PageSkeleton } from '@/components/loading/PageSkeleton'

export default function PricesPage() {
  // Loading state
  const [isLoading, setIsLoading] = useState(true)

  // Left panel state
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])
  const [trackedCommodities, setTrackedCommodities] = useState([
    { id: 1, name: 'Crude Oil (WTI)', color: '#3b82f6', expanded: true, alert: true },
    { id: 2, name: 'Gold', color: '#f59e0b', expanded: false, alert: false },
    { id: 3, name: 'Wheat', color: '#10b981', expanded: false, alert: false },
    { id: 4, name: 'Natural Gas', color: '#8b5cf6', expanded: false, alert: true }
  ])

  const [alerts, setAlerts] = useState([
    { id: 1, name: 'Oil > $80', expanded: true, conditions: ['Price crosses $80/barrel', 'Email notification'] },
    { id: 2, name: 'Gold Volatility', expanded: false, conditions: ['Daily change > 3%', 'SMS alert'] }
  ])

  // Main view state
  const [selectedTab, setSelectedTab] = useState('live-prices')
  const [granularity, setGranularity] = useState('1D')
  const [chartType, setChartType] = useState('line')
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  // Mock price data
  const generateHistoricalData = () => {
    const periods = granularity === '1H' ? 60 : granularity === '1D' ? 24 : granularity === '7D' ? 7 : granularity === '30D' ? 30 : 365
    const data = []
    let oil = 76.5
    let gold = 1920
    let gas = 3.4
    let wheat = 290

    for (let i = 0; i < periods; i++) {
      oil += (Math.random() - 0.48) * 2
      gold += (Math.random() - 0.48) * 15
      gas += (Math.random() - 0.48) * 0.2
      wheat += (Math.random() - 0.48) * 5

      data.push({
        period: granularity === '1H' ? `${i}:00` : granularity === '1D' ? `${i}:00` : granularity === '7D' ? `Day ${i+1}` : granularity === '30D' ? `D${i+1}` : `M${i+1}`,
        oil: parseFloat(oil.toFixed(2)),
        gold: parseFloat(gold.toFixed(2)),
        gas: parseFloat(gas.toFixed(2)),
        wheat: parseFloat(wheat.toFixed(2))
      })
    }
    return data
  }

  const historicalData = useMemo(() => generateHistoricalData(), [granularity, generateHistoricalData])

  // Bollinger Bands data - memoized
  const bollingerData = useMemo(() => {
    const data = []
    let price = 76.5
    const ma = 78
    const stdDev = 4.2
    for (let i = 0; i < 30; i++) {
      price += (Math.random() - 0.48) * 2
      data.push({
        day: `Day ${i + 1}`,
        price: parseFloat(price.toFixed(2)),
        upper: parseFloat((ma + 2 * stdDev).toFixed(2)),
        ma: ma,
        lower: parseFloat((ma - 2 * stdDev).toFixed(2))
      })
    }
    return data
  }, [])

  // Forecast data - memoized
  const forecastData = useMemo(() => {
    const data = []
    let price = 72

    // Historical data (last 30 days)
    for (let i = -30; i <= 0; i++) {
      price += (Math.random() - 0.48) * 1.5
      data.push({
        day: i,
        label: i === 0 ? 'Today' : `${Math.abs(i)}d ago`,
        actual: parseFloat(price.toFixed(2)),
        forecast: null,
        upper: null,
        lower: null,
        isForecast: false
      })
    }

    // Forecast data (next 30 days)
    let forecastPrice = price
    for (let i = 1; i <= 30; i++) {
      forecastPrice += (Math.random() - 0.45) * 1.2 + 0.08
      const confidence = 4 + (i * 0.15)
      data.push({
        day: i,
        label: `+${i}d`,
        actual: null,
        forecast: parseFloat(forecastPrice.toFixed(2)),
        upper: parseFloat((forecastPrice + confidence).toFixed(2)),
        lower: parseFloat((forecastPrice - confidence).toFixed(2)),
        isForecast: true
      })
    }

    return data
  }, [])

  // Live price data
  const priceData = [
    { commodity: 'Crude Oil (WTI)', price: 78.45, change: 2.3, volatility: 'Medium', forecast: '+3.5%', source: 'NYMEX', unit: '$/bbl', volume: '2.1M bbl', alert: true },
    { commodity: 'Brent Crude', price: 82.10, change: 1.8, volatility: 'Medium', forecast: '+2.8%', source: 'ICE', unit: '$/bbl', volume: '1.8M bbl', alert: false },
    { commodity: 'Natural Gas', price: 3.25, change: -4.2, volatility: 'High', forecast: '-2.1%', source: 'NYMEX', unit: '$/MMBtu', volume: '890K MMBtu', alert: true },
    { commodity: 'Gold', price: 1925.50, change: 0.5, volatility: 'Low', forecast: '+1.2%', source: 'COMEX', unit: '$/oz', volume: '145K oz', alert: false },
    { commodity: 'Silver', price: 23.15, change: -1.2, volatility: 'Medium', forecast: '+0.8%', source: 'COMEX', unit: '$/oz', volume: '89K oz', alert: false },
    { commodity: 'Copper', price: 8.75, change: 3.1, volatility: 'Low', forecast: '+2.5%', source: 'COMEX', unit: '$/lb', volume: '520K lbs', alert: false },
    { commodity: 'Wheat', price: 295.25, change: 5.4, volatility: 'High', forecast: '+4.2%', source: 'CBOT', unit: '$/bu', volume: '67K bu', alert: false },
    { commodity: 'Corn', price: 185.50, change: -2.1, volatility: 'Medium', forecast: '-1.5%', source: 'CBOT', unit: '$/bu', volume: '54K bu', alert: false }
  ]

  // Metric cards data
  const metricsData = [
    { title: 'Crude Oil (WTI)', value: '$78.45', change: '+2.3%', changeType: 'up', period: 'Per Barrel', sparkline: historicalData.slice(-15).map(d => ({ x: d.period, y: d.oil })), alert: true, icon: <DollarSign className="h-3 w-3" /> },
    { title: 'Gold', value: '$1,925', change: '+0.5%', changeType: 'up', period: 'Per Ounce', sparkline: historicalData.slice(-15).map(d => ({ x: d.period, y: d.gold })), alert: false, icon: <TrendingUp className="h-3 w-3" /> },
    { title: 'Natural Gas', value: '$3.25', change: '-4.2%', changeType: 'down', period: 'Per MMBtu', sparkline: historicalData.slice(-15).map(d => ({ x: d.period, y: d.gas })), alert: true, icon: <Activity className="h-3 w-3" /> },
    { title: 'Wheat', value: '$295', change: '+5.4%', changeType: 'up', period: 'Per Bushel', sparkline: historicalData.slice(-15).map(d => ({ x: d.period, y: d.wheat })), alert: false, icon: <TrendingUp className="h-3 w-3" /> },
    { title: 'Copper', value: '$8.75', change: '+3.1%', changeType: 'up', period: 'Per Pound', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 8.5 + Math.random() * 0.5 })), alert: false, icon: <DollarSign className="h-3 w-3" /> },
    { title: 'Avg Volatility', value: '18.5%', change: '+2.1%', changeType: 'up', period: '30-day Average', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 15 + Math.random() * 5 })), alert: false, icon: <Activity className="h-3 w-3" /> }
  ]

  // MetricCard component
  const MetricCard = ({ title, value, change, changeType, period, sparkline, alert, icon }: any) => (
    <div className="bg-white rounded-lg p-2 border border-gray-200 hover:shadow-md transition-all group relative">
      {alert && (
        <div className="absolute top-1.5 right-1.5">
          <Bell className="h-2.5 w-2.5 text-orange-500" />
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
    setSelectedRows(prev => prev.length === priceData.length ? [] : priceData.map((_, i) => i))
  }

  if (isLoading) return <PageSkeleton />

  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
      {/* Left Analysis Panel */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${leftPanelCollapsed ? 'w-0' : 'w-64'} flex-shrink-0 overflow-hidden`}>
        <div className="h-full flex flex-col">
          <div className="px-2 py-1.5 border-b border-gray-200 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-gray-700">Price Monitor</span>
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
            {/* Tracked Commodities */}
            <div className="space-y-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-semibold text-gray-600 uppercase">Tracked Commodities</span>
                <Button variant="ghost" size="sm" className="h-4 px-1 text-[9px]">
                  <Settings className="h-2.5 w-2.5" />
                </Button>
              </div>
              {trackedCommodities.map(commodity => (
                <div key={commodity.id} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 flex-1">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: commodity.color }} />
                      <span className="text-[10px] font-medium text-gray-700">{commodity.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {commodity.alert ? (
                        <Bell className="h-2.5 w-2.5 text-orange-500" />
                      ) : (
                        <BellOff className="h-2.5 w-2.5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full h-5 text-[9px] mt-1">
                + Add Commodity
              </Button>
            </div>

            {/* Alert Configuration */}
            <div className="space-y-1 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-semibold text-gray-600 uppercase">Price Alerts</span>
                <Badge className="h-3.5 text-[8px] px-1 bg-orange-50 text-orange-700 border-0">
                  {alerts.filter(a => a.expanded).length} Active
                </Badge>
              </div>
              {alerts.map(alert => (
                <div key={alert.id} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-1">
                      <AlertCircle className="h-2.5 w-2.5 text-orange-500" />
                      <span className="text-[10px] font-medium text-gray-700">{alert.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => {
                        setAlerts(alerts.map(a =>
                          a.id === alert.id ? { ...a, expanded: !a.expanded } : a
                        ))
                      }}
                    >
                      {alert.expanded ? <ChevronRight className="h-2.5 w-2.5" /> : <ChevronLeft className="h-2.5 w-2.5" />}
                    </Button>
                  </div>
                  {alert.expanded && (
                    <div className="mt-1.5 pl-4 space-y-0.5">
                      {alert.conditions.map((condition, idx) => (
                        <div key={idx} className="text-[9px] text-gray-600 flex items-center gap-1">
                          <div className="w-1 h-1 rounded-full bg-orange-400" />
                          {condition}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full h-5 text-[9px] mt-1">
                + Create Alert
              </Button>
            </div>

            {/* Data Sources */}
            <div className="space-y-1 pt-2 border-t border-gray-200">
              <span className="text-[9px] font-semibold text-gray-600 uppercase">Data Sources</span>
              <div className="space-y-1">
                {['NYMEX', 'COMEX', 'ICE', 'CBOT'].map(source => (
                  <div key={source} className="flex items-center justify-between p-1 border border-gray-200 rounded bg-gray-50">
                    <span className="text-[10px] text-gray-700">{source}</span>
                    <Badge className="h-3 text-[8px] px-1 bg-green-50 text-green-700 border-0">Live</Badge>
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
              <Activity className="h-3.5 w-3.5 text-blue-600" />
              <h1 className="text-sm font-semibold text-gray-900">Price Monitor</h1>
            </div>
            <Badge className="h-4 text-[9px] px-1.5 bg-green-50 text-green-700 border-green-200">
              Live
            </Badge>
            <Badge className="h-4 text-[9px] px-1.5 bg-blue-50 text-blue-700 border-blue-200">
              87% Confidence
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-gray-500">Updated 30s ago</span>
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
              Data Sources
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

          {/* Price Chart */}
          <div className="bg-white rounded-lg p-2.5 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-[11px] font-semibold text-gray-900">Commodity Prices</h3>
                <Badge className="h-3.5 text-[8px] px-1 bg-gray-100 text-gray-700 border-0">
                  Real-time
                </Badge>
                <div className="flex items-center gap-2 text-[10px]">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
                    <span className="text-gray-600">Crude Oil</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div>
                    <span className="text-gray-600">Gold</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#8b5cf6]"></div>
                    <span className="text-gray-600">Natural Gas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                    <span className="text-gray-600">Wheat</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="flex items-center border border-gray-200 rounded">
                  {['1H', '1D', '7D', '30D', '1Y'].map(g => (
                    <Button
                      key={g}
                      variant={granularity === g ? 'default' : 'ghost'}
                      size="sm"
                      className={`h-5 text-[9px] px-1.5 rounded-none border-0 ${granularity === g ? 'bg-blue-50 text-blue-700' : ''}`}
                      onClick={() => setGranularity(g)}
                    >
                      {g}
                    </Button>
                  ))}
                </div>
                <Select value={chartType} onValueChange={setChartType}>
                  <SelectTrigger className="h-5 w-20 text-[10px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">Line</SelectItem>
                    <SelectItem value="area">Area</SelectItem>
                    <SelectItem value="bar">Bar</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="period"
                    tick={{ fill: '#6b7280', fontSize: 9 }}
                    tickMargin={5}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: '#6b7280', fontSize: 9 }}
                    tickMargin={5}
                    label={{ value: 'Oil/Gas ($)', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#6b7280' } }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: '#6b7280', fontSize: 9 }}
                    tickMargin={5}
                    label={{ value: 'Gold/Wheat ($)', angle: 90, position: 'insideRight', style: { fontSize: 9, fill: '#6b7280' } }}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 10, padding: 4 }}
                    labelStyle={{ fontSize: 9 }}
                  />
                  <ReferenceLine yAxisId="left" y={80} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Oil Alert $80', fontSize: 9, fill: '#f59e0b' }} />

                  {chartType === 'line' && (
                    <>
                      <Line yAxisId="left" type="monotone" dataKey="oil" stroke="#3b82f6" strokeWidth={2} name="Crude Oil" dot={false} />
                      <Line yAxisId="right" type="monotone" dataKey="gold" stroke="#f59e0b" strokeWidth={2} name="Gold" dot={false} />
                      <Line yAxisId="left" type="monotone" dataKey="gas" stroke="#8b5cf6" strokeWidth={2} name="Natural Gas" dot={false} />
                      <Line yAxisId="right" type="monotone" dataKey="wheat" stroke="#10b981" strokeWidth={2} name="Wheat" dot={false} />
                    </>
                  )}

                  {chartType === 'area' && (
                    <>
                      <Area yAxisId="left" type="monotone" dataKey="oil" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Crude Oil" />
                      <Area yAxisId="right" type="monotone" dataKey="gold" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} name="Gold" />
                      <Area yAxisId="left" type="monotone" dataKey="gas" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} name="Natural Gas" />
                      <Area yAxisId="right" type="monotone" dataKey="wheat" stroke="#10b981" fill="#10b981" fillOpacity={0.2} name="Wheat" />
                    </>
                  )}

                  {chartType === 'bar' && (
                    <>
                      <Bar yAxisId="left" dataKey="oil" fill="#3b82f6" name="Crude Oil" />
                      <Bar yAxisId="right" dataKey="gold" fill="#f59e0b" name="Gold" />
                      <Bar yAxisId="left" dataKey="gas" fill="#8b5cf6" name="Natural Gas" />
                      <Bar yAxisId="right" dataKey="wheat" fill="#10b981" name="Wheat" />
                    </>
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-2">
            <TabsList className="h-6 bg-gray-100 p-0.5">
              <TabsTrigger value="live-prices" className="h-5 text-[11px] px-2">
                Live Prices
              </TabsTrigger>
              <TabsTrigger value="volatility" className="h-5 text-[11px] px-2">
                Volatility Analysis
              </TabsTrigger>
              <TabsTrigger value="correlation" className="h-5 text-[11px] px-2">
                Correlation Matrix
              </TabsTrigger>
              <TabsTrigger value="forecast" className="h-5 text-[11px] px-2">
                Price Forecast
              </TabsTrigger>
            </TabsList>

            <TabsContent value="live-prices" className="mt-2 space-y-2">
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[11px] font-semibold text-gray-900">Live Commodity Prices</h3>
                  {selectedRows.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-gray-600">{selectedRows.length} selected</span>
                      <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                        Compare
                      </Button>
                      <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                        Create Watchlist
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
                            checked={selectedRows.length === priceData.length}
                            onChange={toggleAllRows}
                          />
                        </th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">Commodity</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Price</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Change</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Volatility</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Forecast</th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">Source</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Volume</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Alert</th>
                      </tr>
                    </thead>
                    <tbody>
                      {priceData.map((row, index) => (
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
                          <td className="p-1.5 font-medium text-gray-900">{row.commodity}</td>
                          <td className="p-1.5 text-right font-semibold text-gray-900">
                            {row.price.toFixed(2)} <span className="text-gray-500 font-normal">{row.unit}</span>
                          </td>
                          <td className="p-1.5 text-right">
                            <span className={row.change >= 0 ? 'text-green-700' : 'text-red-700'}>
                              {row.change >= 0 ? '+' : ''}{row.change.toFixed(1)}%
                            </span>
                          </td>
                          <td className="p-1.5 text-center">
                            <Badge className={`h-4 text-[9px] px-1.5 border-0 ${
                              row.volatility === 'Low' ? 'bg-green-50 text-green-700' :
                              row.volatility === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                              'bg-red-50 text-red-700'
                            }`}>
                              {row.volatility}
                            </Badge>
                          </td>
                          <td className="p-1.5 text-right text-gray-700">{row.forecast}</td>
                          <td className="p-1.5 text-gray-600">{row.source}</td>
                          <td className="p-1.5 text-right text-gray-600">{row.volume}</td>
                          <td className="p-1.5 text-center">
                            {row.alert ? (
                              <Bell className="h-3 w-3 text-orange-500 mx-auto" />
                            ) : (
                              <BellOff className="h-3 w-3 text-gray-300 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="volatility" className="mt-2 space-y-2">
              {/* Volatility Metrics */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-0.5">Average Volatility</div>
                  <div className="text-lg font-semibold text-gray-900">18.5%</div>
                  <div className="text-[9px] text-gray-500">30-day rolling</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-0.5">Std Deviation</div>
                  <div className="text-lg font-semibold text-gray-900">$4.23</div>
                  <div className="text-[9px] text-gray-500">Crude Oil WTI</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-0.5">VIX Equivalent</div>
                  <div className="text-lg font-semibold text-gray-900">24.8</div>
                  <div className="text-[9px] text-gray-500">Commodity VIX</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-0.5">Risk Level</div>
                  <div className="text-lg font-semibold text-orange-600">Elevated</div>
                  <div className="text-[9px] text-gray-500">Market condition</div>
                </div>
              </div>

              {/* Bollinger Bands Chart */}
              <div className="bg-white rounded-lg p-2.5 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[11px] font-semibold text-gray-900">Bollinger Bands - Crude Oil WTI</h3>
                    <Badge className="h-3.5 text-[8px] px-1 bg-gray-100 text-gray-700 border-0">
                      20-day MA, 2σ bands
                    </Badge>
                    <div className="flex items-center gap-2 text-[10px]">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#3b82f6]" style={{ opacity: 0.1 }}></div>
                        <span className="text-gray-600">Upper Band</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#3b82f6]" style={{ opacity: 0.1 }}></div>
                        <span className="text-gray-600">Lower Band</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#93c5fd]"></div>
                        <span className="text-gray-600">Upper (2σ)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
                        <span className="text-gray-600">20-day MA</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#93c5fd]"></div>
                        <span className="text-gray-600">Lower (2σ)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div>
                        <span className="text-gray-600">Price</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={bollingerData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="day"
                        tick={{ fill: '#6b7280', fontSize: 9 }}
                        tickMargin={5}
                      />
                      <YAxis
                        tick={{ fill: '#6b7280', fontSize: 9 }}
                        tickMargin={5}
                        domain={['dataMin - 5', 'dataMax + 5']}
                      />
                      <Tooltip
                        contentStyle={{ fontSize: 10, padding: 4 }}
                        labelStyle={{ fontSize: 9 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="upper"
                        stroke="none"
                        fill="#3b82f6"
                        fillOpacity={0.1}
                        name="Upper Band"
                      />
                      <Area
                        type="monotone"
                        dataKey="lower"
                        stroke="none"
                        fill="#3b82f6"
                        fillOpacity={0.1}
                        name="Lower Band"
                      />
                      <Line
                        type="monotone"
                        dataKey="upper"
                        stroke="#93c5fd"
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        dot={false}
                        name="Upper (2σ)"
                      />
                      <Line
                        type="monotone"
                        dataKey="ma"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        name="20-day MA"
                      />
                      <Line
                        type="monotone"
                        dataKey="lower"
                        stroke="#93c5fd"
                        strokeWidth={1}
                        strokeDasharray="3 3"
                        dot={false}
                        name="Lower (2σ)"
                      />
                      <Line
                        type="monotone"
                        dataKey="price"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        dot={{ fill: '#f59e0b', r: 2 }}
                        name="Price"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Volatility Table */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Volatility Metrics by Commodity</h3>
                <div className="border border-gray-200 rounded overflow-hidden">
                  <table className="w-full text-[10px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-1.5 font-semibold text-gray-700">Commodity</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Std Dev</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Variance</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">30D Volatility</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">90D Volatility</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Risk Level</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Beta</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { commodity: 'Crude Oil (WTI)', stdDev: 4.23, variance: 17.89, vol30: 18.5, vol90: 21.2, risk: 'Medium', beta: 1.15 },
                        { commodity: 'Natural Gas', stdDev: 0.42, variance: 0.18, vol30: 28.4, vol90: 32.1, risk: 'High', beta: 1.52 },
                        { commodity: 'Gold', stdDev: 28.5, variance: 812.25, vol30: 12.3, vol90: 14.8, risk: 'Low', beta: 0.68 },
                        { commodity: 'Wheat', stdDev: 15.2, variance: 231.04, vol30: 24.1, vol90: 26.5, risk: 'High', beta: 1.38 },
                        { commodity: 'Copper', stdDev: 0.35, variance: 0.12, vol30: 16.2, vol90: 18.9, risk: 'Medium', beta: 1.05 },
                        { commodity: 'Silver', stdDev: 1.18, variance: 1.39, vol30: 20.7, vol90: 23.4, risk: 'Medium', beta: 1.22 }
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-1.5 font-medium text-gray-900">{row.commodity}</td>
                          <td className="p-1.5 text-right text-gray-700">{row.stdDev.toFixed(2)}</td>
                          <td className="p-1.5 text-right text-gray-700">{row.variance.toFixed(2)}</td>
                          <td className="p-1.5 text-right text-gray-700">{row.vol30}%</td>
                          <td className="p-1.5 text-right text-gray-700">{row.vol90}%</td>
                          <td className="p-1.5 text-center">
                            <Badge className={`h-4 text-[9px] px-1.5 border-0 ${
                              row.risk === 'Low' ? 'bg-green-50 text-green-700' :
                              row.risk === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                              'bg-red-50 text-red-700'
                            }`}>
                              {row.risk}
                            </Badge>
                          </td>
                          <td className="p-1.5 text-right text-gray-700">{row.beta.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="correlation" className="mt-2 space-y-2">
              {/* Correlation Heatmap */}
              <div className="bg-white rounded-lg p-2.5 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[11px] font-semibold text-gray-900">Commodity Price Correlation Matrix</h3>
                    <Badge className="h-3.5 text-[8px] px-1 bg-gray-100 text-gray-700 border-0">
                      90-day correlation
                    </Badge>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  {(() => {
                    const commodities = ['Crude Oil', 'Gold', 'Nat Gas', 'Wheat', 'Copper', 'Silver', 'Corn', 'Brent'];
                    const correlationMatrix = [
                      [1.00, 0.23, 0.45, 0.12, 0.67, 0.34, 0.18, 0.92],
                      [0.23, 1.00, -0.15, 0.08, 0.41, 0.78, -0.05, 0.19],
                      [0.45, -0.15, 1.00, 0.32, 0.28, -0.12, 0.25, 0.41],
                      [0.12, 0.08, 0.32, 1.00, 0.15, 0.09, 0.82, 0.14],
                      [0.67, 0.41, 0.28, 0.15, 1.00, 0.52, 0.19, 0.63],
                      [0.34, 0.78, -0.12, 0.09, 0.52, 1.00, 0.11, 0.31],
                      [0.18, -0.05, 0.25, 0.82, 0.19, 0.11, 1.00, 0.16],
                      [0.92, 0.19, 0.41, 0.14, 0.63, 0.31, 0.16, 1.00]
                    ];

                    const getColor = (value: number) => {
                      if (value > 0.7) return 'bg-green-600 text-white';
                      if (value > 0.4) return 'bg-green-400 text-white';
                      if (value > 0.2) return 'bg-green-200 text-gray-900';
                      if (value > -0.2) return 'bg-gray-100 text-gray-900';
                      if (value > -0.4) return 'bg-red-200 text-gray-900';
                      if (value > -0.7) return 'bg-red-400 text-white';
                      return 'bg-red-600 text-white';
                    };

                    return (
                      <table className="w-full text-[10px] border-collapse">
                        <thead>
                          <tr>
                            <th className="p-1 text-left font-semibold text-gray-700 border border-gray-200 bg-gray-50"></th>
                            {commodities.map((c, i) => (
                              <th key={i} className="p-1 text-center font-semibold text-gray-700 border border-gray-200 bg-gray-50 min-w-[60px]">
                                {c}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {commodities.map((commodity, i) => (
                            <tr key={i}>
                              <td className="p-1 font-semibold text-gray-700 border border-gray-200 bg-gray-50 whitespace-nowrap">
                                {commodity}
                              </td>
                              {correlationMatrix[i].map((value, j) => (
                                <td
                                  key={j}
                                  className={`p-1 text-center font-semibold border border-gray-200 ${getColor(value)}`}
                                >
                                  {value.toFixed(2)}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    );
                  })()}
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[9px] text-gray-600">
                    <span>Legend:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-3 bg-green-600 border border-gray-300"></div>
                      <span>Strong +</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-3 bg-green-200 border border-gray-300"></div>
                      <span>Weak +</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-3 bg-gray-100 border border-gray-300"></div>
                      <span>Neutral</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-3 bg-red-200 border border-gray-300"></div>
                      <span>Weak -</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-3 bg-red-600 border border-gray-300"></div>
                      <span>Strong -</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Correlation Insights */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-1">Strongest Correlation</div>
                  <div className="text-sm font-semibold text-green-700">Crude Oil ↔ Brent</div>
                  <div className="text-[9px] text-gray-500">r = 0.92 (very strong)</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-1">Best Diversification</div>
                  <div className="text-sm font-semibold text-blue-700">Gold ↔ Nat Gas</div>
                  <div className="text-[9px] text-gray-500">r = -0.15 (inverse)</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-1">Agricultural Link</div>
                  <div className="text-sm font-semibold text-orange-700">Wheat ↔ Corn</div>
                  <div className="text-[9px] text-gray-500">r = 0.82 (strong)</div>
                </div>
              </div>

              {/* Diversification Suggestions */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Portfolio Diversification Suggestions</h3>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2 p-1.5 bg-green-50 rounded border border-green-200">
                    <Badge className="h-4 text-[9px] px-1.5 bg-green-600 text-white border-0 mt-0.5">
                      Low Risk
                    </Badge>
                    <div className="flex-1">
                      <div className="text-[10px] font-semibold text-gray-900 mb-0.5">Gold + Natural Gas</div>
                      <div className="text-[9px] text-gray-600">Inverse correlation (-0.15) provides natural hedge against market volatility</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-1.5 bg-blue-50 rounded border border-blue-200">
                    <Badge className="h-4 text-[9px] px-1.5 bg-blue-600 text-white border-0 mt-0.5">
                      Balanced
                    </Badge>
                    <div className="flex-1">
                      <div className="text-[10px] font-semibold text-gray-900 mb-0.5">Copper + Silver + Gold</div>
                      <div className="text-[9px] text-gray-600">Precious and industrial metals mix with moderate correlations (0.41-0.52)</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-1.5 bg-orange-50 rounded border border-orange-200">
                    <Badge className="h-4 text-[9px] px-1.5 bg-orange-600 text-white border-0 mt-0.5">
                      Caution
                    </Badge>
                    <div className="flex-1">
                      <div className="text-[10px] font-semibold text-gray-900 mb-0.5">Avoid: Crude Oil + Brent</div>
                      <div className="text-[9px] text-gray-600">Very high correlation (0.92) offers no diversification benefit</div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="forecast" className="mt-2 space-y-2">
              {/* Forecast Parameters */}
              <div className="bg-white rounded-lg p-2 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-semibold text-gray-700">Forecast Model:</span>
                    <Badge className="h-4 text-[9px] px-1.5 bg-blue-50 text-blue-700 border-0">ARIMA (2,1,2)</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-600">Confidence Level:</span>
                    <Badge className="h-4 text-[9px] px-1.5 bg-green-50 text-green-700 border-0">95%</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-600">Forecast Horizon:</span>
                    <Badge className="h-4 text-[9px] px-1.5 bg-purple-50 text-purple-700 border-0">30 days</Badge>
                  </div>
                </div>
              </div>

              {/* Price Forecast Chart */}
              <div className="bg-white rounded-lg p-2.5 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-[11px] font-semibold text-gray-900">Crude Oil WTI - 30 Day Price Forecast</h3>
                    <Badge className="h-3.5 text-[8px] px-1 bg-gray-100 text-gray-700 border-0">
                      Historical + Predicted
                    </Badge>
                    <div className="flex items-center gap-2 text-[10px]">
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#dbeafe]" style={{ opacity: 0.4 }}></div>
                        <span className="text-gray-600">95% Confidence Upper</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#dbeafe]" style={{ opacity: 0.4 }}></div>
                        <span className="text-gray-600">95% Confidence Lower</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
                        <span className="text-gray-600">Historical Price</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div>
                        <span className="text-gray-600">Forecast</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#93c5fd]"></div>
                        <span className="text-gray-600">Upper Bound</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-[#93c5fd]"></div>
                        <span className="text-gray-600">Lower Bound</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Select defaultValue="oil">
                      <SelectTrigger className="h-5 w-28 text-[10px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oil">Crude Oil WTI</SelectItem>
                        <SelectItem value="gold">Gold</SelectItem>
                        <SelectItem value="gas">Natural Gas</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis
                        dataKey="label"
                        tick={{ fill: '#6b7280', fontSize: 9 }}
                        tickMargin={5}
                        interval={4}
                      />
                      <YAxis
                        tick={{ fill: '#6b7280', fontSize: 9 }}
                        tickMargin={5}
                        label={{ value: 'Price ($/bbl)', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#6b7280' } }}
                      />
                      <Tooltip
                        contentStyle={{ fontSize: 10, padding: 4 }}
                        labelStyle={{ fontSize: 9 }}
                        formatter={(value: any, name: string) => {
                          if (value === null) return [null, name]
                          return [`$${value.toFixed(2)}`, name]
                        }}
                      />

                      {/* Confidence interval area */}
                      <Area
                        type="monotone"
                        dataKey="upper"
                        stroke="none"
                        fill="#dbeafe"
                        fillOpacity={0.4}
                        name="95% Confidence Upper"
                      />
                      <Area
                        type="monotone"
                        dataKey="lower"
                        stroke="none"
                        fill="#dbeafe"
                        fillOpacity={0.4}
                        name="95% Confidence Lower"
                      />

                      {/* Historical price line */}
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        name="Historical Price"
                        connectNulls={false}
                      />

                      {/* Forecast line */}
                      <Line
                        type="monotone"
                        dataKey="forecast"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={false}
                        name="Forecast"
                        connectNulls={false}
                      />

                      {/* Confidence bounds */}
                      <Line
                        type="monotone"
                        dataKey="upper"
                        stroke="#93c5fd"
                        strokeWidth={1}
                        strokeDasharray="2 2"
                        dot={false}
                        name="Upper Bound"
                        connectNulls={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="lower"
                        stroke="#93c5fd"
                        strokeWidth={1}
                        strokeDasharray="2 2"
                        dot={false}
                        name="Lower Bound"
                        connectNulls={false}
                      />

                      <ReferenceLine x={30} stroke="#6b7280" strokeDasharray="3 3" label={{ value: 'Today', fontSize: 9, fill: '#6b7280', position: 'top' }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Forecast Summary Cards */}
              <div className="grid grid-cols-4 gap-2">
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-0.5">7-Day Forecast</div>
                  <div className="text-lg font-semibold text-green-700">$79.20</div>
                  <div className="text-[9px] text-gray-500">+1.0% from current</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-0.5">30-Day Forecast</div>
                  <div className="text-lg font-semibold text-green-700">$81.45</div>
                  <div className="text-[9px] text-gray-500">+3.8% from current</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-0.5">Forecast Accuracy</div>
                  <div className="text-lg font-semibold text-blue-700">87.2%</div>
                  <div className="text-[9px] text-gray-500">30-day backtesting</div>
                </div>
                <div className="bg-white rounded-lg p-2 border border-gray-200">
                  <div className="text-[10px] text-gray-600 mb-0.5">Trend Direction</div>
                  <div className="text-lg font-semibold text-green-700 flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    Bullish
                  </div>
                  <div className="text-[9px] text-gray-500">High confidence</div>
                </div>
              </div>

              {/* Forecast Details Table */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Multi-Commodity Forecast Summary</h3>
                <div className="border border-gray-200 rounded overflow-hidden">
                  <table className="w-full text-[10px]">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left p-1.5 font-semibold text-gray-700">Commodity</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Current</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">7D Forecast</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">30D Forecast</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Expected Change</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Confidence</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Trend</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { commodity: 'Crude Oil (WTI)', current: 78.45, forecast7: 79.20, forecast30: 81.45, change: 3.8, confidence: 87, trend: 'up' },
                        { commodity: 'Gold', current: 1925.50, forecast7: 1932.15, forecast30: 1948.80, change: 1.2, confidence: 92, trend: 'up' },
                        { commodity: 'Natural Gas', current: 3.25, forecast7: 3.18, forecast30: 3.05, change: -6.2, confidence: 79, trend: 'down' },
                        { commodity: 'Wheat', current: 295.25, forecast7: 302.40, forecast30: 315.60, change: 6.9, confidence: 84, trend: 'up' },
                        { commodity: 'Copper', current: 8.75, forecast7: 8.82, forecast30: 8.95, change: 2.3, confidence: 88, trend: 'up' },
                        { commodity: 'Silver', current: 23.15, forecast7: 23.05, forecast30: 22.80, change: -1.5, confidence: 86, trend: 'down' }
                      ].map((row, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="p-1.5 font-medium text-gray-900">{row.commodity}</td>
                          <td className="p-1.5 text-right text-gray-700">${row.current.toFixed(2)}</td>
                          <td className="p-1.5 text-right text-gray-700">${row.forecast7.toFixed(2)}</td>
                          <td className="p-1.5 text-right font-semibold text-gray-900">${row.forecast30.toFixed(2)}</td>
                          <td className={`p-1.5 text-right font-semibold ${row.change >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                            {row.change >= 0 ? '+' : ''}{row.change.toFixed(1)}%
                          </td>
                          <td className="p-1.5 text-center">
                            <Badge className={`h-4 text-[9px] px-1.5 border-0 ${
                              row.confidence >= 85 ? 'bg-green-50 text-green-700' :
                              row.confidence >= 75 ? 'bg-blue-50 text-blue-700' :
                              'bg-orange-50 text-orange-700'
                            }`}>
                              {row.confidence}%
                            </Badge>
                          </td>
                          <td className="p-1.5 text-center">
                            {row.trend === 'up' ? (
                              <TrendingUp className="h-3.5 w-3.5 text-green-600 mx-auto" />
                            ) : (
                              <TrendingDown className="h-3.5 w-3.5 text-red-600 mx-auto" />
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Model Information */}
              <div className="bg-blue-50 rounded-lg border border-blue-200 p-2">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-3.5 w-3.5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] font-semibold text-blue-900 mb-0.5">Forecast Methodology</div>
                    <div className="text-[9px] text-blue-800">
                      Forecasts generated using ARIMA (AutoRegressive Integrated Moving Average) models trained on 2 years of historical data.
                      Confidence intervals calculated at 95% level. Model accuracy validated through 30-day rolling backtests.
                      Predictions should be used for informational purposes and not as sole basis for trading decisions.
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
