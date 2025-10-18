'use client'

import { useState, useMemo, useEffect } from 'react'
import { AreaChart, Area, LineChart, Line, ComposedChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Banknote, TrendingUp, TrendingDown, Percent, Calculator, Building2, CreditCard, AlertCircle, ChevronRight, ChevronLeft, ExternalLink, Download, Share2, RefreshCw, Settings, DollarSign, ArrowRight } from 'lucide-react'
import { PageSkeleton } from '@/components/loading/PageSkeleton'

export default function CapitalPage() {
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
  const [loanType, setLoanType] = useState('mortgage')
  const [loanAmount, setLoanAmount] = useState(500000)
  const [loanTerm, setLoanTerm] = useState(30)
  const [interestRate, setInterestRate] = useState(6.5)

  // Main view state
  const [selectedTab, setSelectedTab] = useState('interest-rates')
  const [bankingSegment, setBankingSegment] = useState('all-banks')
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  // Calculate loan payment
  const monthlyPayment = useMemo(() => {
    const r = interestRate / 100 / 12
    const n = loanTerm * 12
    return loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  }, [loanAmount, loanTerm, interestRate])

  const totalPayment = monthlyPayment * loanTerm * 12
  const totalInterest = totalPayment - loanAmount

  // Interest rate data
  const interestRateData = [
    { bank: 'Chase Bank', mortgage: 6.25, personal: 9.5, business: 7.8, auto: 5.2, creditCard: 18.5, rating: 'A+', approval: '85%' },
    { bank: 'Bank of America', mortgage: 6.35, personal: 9.8, business: 8.1, auto: 5.5, creditCard: 19.2, rating: 'A', approval: '82%' },
    { bank: 'Wells Fargo', mortgage: 6.45, personal: 10.2, business: 8.5, auto: 5.8, creditCard: 19.8, rating: 'A', approval: '80%' },
    { bank: 'Citi Bank', mortgage: 6.15, personal: 9.2, business: 7.5, auto: 5.0, creditCard: 17.9, rating: 'A+', approval: '87%' },
    { bank: 'US Bank', mortgage: 6.55, personal: 10.5, business: 8.8, auto: 6.0, creditCard: 20.1, rating: 'A-', approval: '78%' },
    { bank: 'PNC Bank', mortgage: 6.65, personal: 10.8, business: 9.0, auto: 6.2, creditCard: 20.5, rating: 'B+', approval: '75%' },
    { bank: 'Capital One', mortgage: 6.85, personal: 11.2, business: 9.5, auto: 6.5, creditCard: 21.2, rating: 'B+', approval: '72%' },
    { bank: 'TD Bank', mortgage: 6.75, personal: 11.0, business: 9.2, auto: 6.3, creditCard: 20.8, rating: 'B', approval: '70%' }
  ]

  // Fintech products
  const fintechData = [
    { name: 'SoFi', type: 'Personal Loan', rate: 8.5, minCredit: 680, maxAmount: '$100K', features: 'No fees', rating: 4.5 },
    { name: 'Marcus by Goldman', type: 'Savings', rate: 4.5, minCredit: 0, maxAmount: 'Unlimited', features: 'High yield', rating: 4.7 },
    { name: 'Rocket Mortgage', type: 'Mortgage', rate: 6.0, minCredit: 620, maxAmount: '$3M', features: 'Fast approval', rating: 4.6 },
    { name: 'LendingClub', type: 'Business Loan', rate: 9.2, minCredit: 600, maxAmount: '$500K', features: 'Flexible terms', rating: 4.2 },
    { name: 'Affirm', type: 'Consumer Credit', rate: 12.0, minCredit: 550, maxAmount: '$17.5K', features: 'Point of sale', rating: 4.1 },
    { name: 'Upstart', type: 'Personal Loan', rate: 9.8, minCredit: 580, maxAmount: '$50K', features: 'AI underwriting', rating: 4.3 }
  ]

  // Banking health data
  const bankingHealthData = [
    { metric: 'Liquidity Ratio', value: 85, target: 80 },
    { metric: 'Capital Adequacy', value: 14.5, target: 10.5 },
    { metric: 'NPL Ratio', value: 1.8, target: 3.0 },
    { metric: 'ROE', value: 12.5, target: 10.0 },
    { metric: 'Efficiency Ratio', value: 58, target: 60 }
  ]

  // Metric cards data
  const metricsData = [
    { title: 'Avg Mortgage Rate', value: '6.45%', change: '+0.15%', changeType: 'up', period: '30-Year Fixed', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 6.2 + Math.random() * 0.5 })), alert: false, icon: <Banknote className="h-3 w-3" /> },
    { title: 'Avg Personal Loan', value: '10.2%', change: '+0.22%', changeType: 'up', period: '5-Year Term', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 9.8 + Math.random() * 0.8 })), alert: false, icon: <Percent className="h-3 w-3" /> },
    { title: 'Business Loan Rate', value: '8.55%', change: '+0.18%', changeType: 'up', period: '10-Year Term', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 8.2 + Math.random() * 0.7 })), alert: false, icon: <Building2 className="h-3 w-3" /> },
    { title: 'Credit Card APR', value: '19.8%', change: '+0.35%', changeType: 'up', period: 'National Average', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 19.2 + Math.random() * 1.2 })), alert: true, icon: <CreditCard className="h-3 w-3" /> },
    { title: 'Approval Rate', value: '78.6%', change: '-2.1%', changeType: 'down', period: 'All Loan Types', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 80 - i * 0.3 + Math.random() * 2 })), alert: false, icon: <TrendingUp className="h-3 w-3" /> },
    { title: 'Avg Loan Amount', value: '$285K', change: '+4.5%', changeType: 'up', period: 'All Products', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 265 + i * 1.5 + Math.random() * 10 })), alert: false, icon: <DollarSign className="h-3 w-3" /> }
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
            changeType === 'up' ? 'bg-red-50 text-red-700' :
            changeType === 'down' ? 'bg-green-50 text-green-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {changeType === 'up' && '↑'} {changeType === 'down' && '↓'} {change}
          </Badge>
          <div className="w-14 h-5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline}>
                <Area type="monotone" dataKey="y" stroke={changeType === 'up' ? '#ef4444' : '#10b981'} strokeWidth={1} fill={changeType === 'up' ? '#fee2e2' : '#d1fae5'} fillOpacity={0.3} />
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
    setSelectedRows(prev => prev.length === interestRateData.length ? [] : interestRateData.map((_, i) => i))
  }

  if (isLoading) return <PageSkeleton />

  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
      {/* Left Analysis Panel */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${leftPanelCollapsed ? 'w-0' : 'w-64'} flex-shrink-0 overflow-hidden`}>
        <div className="h-full flex flex-col">
          <div className="px-2 py-1.5 border-b border-gray-200 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-gray-700">Loan Calculator</span>
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
            {/* Loan Type Selector */}
            <div className="space-y-1">
              <span className="text-[9px] font-semibold text-gray-600 uppercase">Loan Type</span>
              <Select value={loanType} onValueChange={setLoanType}>
                <SelectTrigger className="h-6 text-[10px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mortgage">Mortgage</SelectItem>
                  <SelectItem value="personal">Personal Loan</SelectItem>
                  <SelectItem value="business">Business Loan</SelectItem>
                  <SelectItem value="auto">Auto Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Loan Amount */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold text-gray-600 uppercase">Loan Amount</span>
                <span className="text-[10px] font-semibold text-gray-900">${(loanAmount / 1000).toFixed(0)}K</span>
              </div>
              <input
                type="range"
                min="50000"
                max="2000000"
                step="10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Loan Term */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold text-gray-600 uppercase">Term (Years)</span>
                <span className="text-[10px] font-semibold text-gray-900">{loanTerm} years</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={loanTerm}
                onChange={(e) => setLoanTerm(parseInt(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Interest Rate */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-semibold text-gray-600 uppercase">Interest Rate</span>
                <span className="text-[10px] font-semibold text-gray-900">{interestRate.toFixed(2)}%</span>
              </div>
              <input
                type="range"
                min="3"
                max="15"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Calculation Results */}
            <div className="border border-gray-200 rounded p-2 bg-blue-50 space-y-1.5 mt-2">
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-gray-600">Monthly Payment</span>
                <span className="text-[11px] font-bold text-blue-900">${monthlyPayment.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-gray-600">Total Payment</span>
                <span className="text-[10px] font-semibold text-gray-900">${(totalPayment / 1000).toFixed(1)}K</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[9px] text-gray-600">Total Interest</span>
                <span className="text-[10px] font-semibold text-orange-700">${(totalInterest / 1000).toFixed(1)}K</span>
              </div>
            </div>

            {/* Banking Health Indicators */}
            <div className="space-y-1 pt-2 border-t border-gray-200">
              <span className="text-[9px] font-semibold text-gray-600 uppercase">Banking Health</span>
              <div className="space-y-1">
                {bankingHealthData.map((item, idx) => (
                  <div key={idx} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] text-gray-700">{item.metric}</span>
                      <Badge className={`h-3 text-[8px] px-1 border-0 ${
                        item.metric === 'NPL Ratio'
                          ? (item.value < item.target ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700')
                          : (item.value > item.target ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700')
                      }`}>
                        {item.value}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full ${
                          item.metric === 'NPL Ratio'
                            ? (item.value < item.target ? 'bg-green-500' : 'bg-red-500')
                            : (item.value > item.target ? 'bg-green-500' : 'bg-yellow-500')
                        }`}
                        style={{ width: `${(item.value / (item.target * 1.5)) * 100}%` }}
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
              <Banknote className="h-3.5 w-3.5 text-blue-600" />
              <h1 className="text-sm font-semibold text-gray-900">Capital Access</h1>
            </div>
            <Badge className="h-4 text-[9px] px-1.5 bg-green-50 text-green-700 border-green-200">
              Live
            </Badge>
            <Badge className="h-4 text-[9px] px-1.5 bg-blue-50 text-blue-700 border-blue-200">
              92% Confidence
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-gray-500">Updated 2m ago</span>
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
              Regulatory Updates
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

          {/* Interest Rate Trends Chart */}
          <div className="bg-white rounded-lg p-2.5 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h3 className="text-[11px] font-semibold text-gray-900">Interest Rate Trends</h3>
                <div className="flex items-center gap-2 text-[10px]">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
                    <span className="text-gray-600">Mortgage</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#8b5cf6]"></div>
                    <span className="text-gray-600">Personal Loan</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                    <span className="text-gray-600">Business Loan</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div>
                    <span className="text-gray-600">Credit Card</span>
                  </div>
                </div>
                <Badge className="h-3.5 text-[8px] px-1 bg-gray-100 text-gray-700 border-0">
                  Historical 12 months
                </Badge>
              </div>
            </div>

            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={Array.from({ length: 12 }, (_, i) => ({
                  month: `M${i + 1}`,
                  mortgage: 6.0 + i * 0.04 + Math.random() * 0.2,
                  personal: 9.5 + i * 0.05 + Math.random() * 0.3,
                  business: 7.8 + i * 0.06 + Math.random() * 0.25,
                  creditCard: 18.5 + i * 0.08 + Math.random() * 0.4
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#6b7280', fontSize: 9 }}
                    tickMargin={5}
                  />
                  <YAxis
                    tick={{ fill: '#6b7280', fontSize: 9 }}
                    tickMargin={5}
                    label={{ value: 'Rate (%)', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#6b7280' } }}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 10, padding: 4 }}
                    labelStyle={{ fontSize: 9 }}
                  />
                  <Line type="monotone" dataKey="mortgage" stroke="#3b82f6" strokeWidth={2} name="Mortgage" dot={false} />
                  <Line type="monotone" dataKey="personal" stroke="#8b5cf6" strokeWidth={2} name="Personal Loan" dot={false} />
                  <Line type="monotone" dataKey="business" stroke="#10b981" strokeWidth={2} name="Business Loan" dot={false} />
                  <Line type="monotone" dataKey="creditCard" stroke="#f59e0b" strokeWidth={2} name="Credit Card" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-2">
            <TabsList className="h-6 bg-gray-100 p-0.5">
              <TabsTrigger value="interest-rates" className="h-5 text-[11px] px-2">
                Interest Rate Comparison
              </TabsTrigger>
              <TabsTrigger value="fintech" className="h-5 text-[11px] px-2">
                Fintech Products
              </TabsTrigger>
              <TabsTrigger value="eligibility" className="h-5 text-[11px] px-2">
                Eligibility Tools
                <Badge className="ml-1 h-3 text-[8px] px-1 bg-purple-100 text-purple-700 border-0">Beta</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="interest-rates" className="mt-2 space-y-2">
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[11px] font-semibold text-gray-900">Bank Interest Rate Comparison</h3>
                  {selectedRows.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-gray-600">{selectedRows.length} selected</span>
                      <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                        Compare Details
                      </Button>
                      <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                        Apply Now
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
                            checked={selectedRows.length === interestRateData.length}
                            onChange={toggleAllRows}
                          />
                        </th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">Bank</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Mortgage</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Personal</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Business</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Auto</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Credit Card</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Rating</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Approval Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {interestRateData.map((row, index) => (
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
                          <td className="p-1.5 font-medium text-gray-900">{row.bank}</td>
                          <td className="p-1.5 text-right text-gray-900">{row.mortgage.toFixed(2)}%</td>
                          <td className="p-1.5 text-right text-gray-900">{row.personal.toFixed(2)}%</td>
                          <td className="p-1.5 text-right text-gray-900">{row.business.toFixed(2)}%</td>
                          <td className="p-1.5 text-right text-gray-900">{row.auto.toFixed(2)}%</td>
                          <td className="p-1.5 text-right text-gray-900">{row.creditCard.toFixed(2)}%</td>
                          <td className="p-1.5 text-center">
                            <Badge className={`h-4 text-[9px] px-1.5 border-0 ${
                              row.rating.startsWith('A') ? 'bg-green-50 text-green-700' :
                              row.rating.startsWith('B') ? 'bg-yellow-50 text-yellow-700' :
                              'bg-red-50 text-red-700'
                            }`}>
                              {row.rating}
                            </Badge>
                          </td>
                          <td className="p-1.5 text-center text-gray-700">{row.approval}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fintech" className="mt-2">
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[11px] font-semibold text-gray-900">Fintech Products & Services</h3>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {fintechData.map((product, idx) => (
                    <div key={idx} className="border border-gray-200 rounded p-2 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h4 className="text-[11px] font-semibold text-gray-900">{product.name}</h4>
                          <p className="text-[9px] text-gray-600">{product.type}</p>
                        </div>
                        <Badge className="h-3.5 text-[8px] px-1 bg-blue-50 text-blue-700 border-0">
                          ★ {product.rating}
                        </Badge>
                      </div>
                      <div className="space-y-1 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-gray-600">Rate</span>
                          <span className="text-[10px] font-semibold text-gray-900">{product.rate}%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-gray-600">Min Credit</span>
                          <span className="text-[10px] font-medium text-gray-900">{product.minCredit}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-gray-600">Max Amount</span>
                          <span className="text-[10px] font-medium text-gray-900">{product.maxAmount}</span>
                        </div>
                        <div className="mt-1.5 pt-1.5 border-t border-gray-200">
                          <span className="text-[9px] text-blue-600">{product.features}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full h-5 text-[9px] mt-2">
                        Learn More <ArrowRight className="h-2.5 w-2.5 ml-1" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="eligibility" className="mt-2 space-y-2">
              {/* Credit Score Simulator */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Credit Score Simulator</h3>

                <div className="grid grid-cols-3 gap-2">
                  {/* Credit Score Gauge */}
                  <div className="col-span-1 flex flex-col items-center justify-center border border-gray-200 rounded p-2">
                    <div className="relative w-32 h-32">
                      <svg viewBox="0 0 100 100" className="transform -rotate-90">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="8"
                        />
                        {/* Score circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeDasharray={`${(720 / 850) * 251.2} 251.2`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold text-gray-900">720</span>
                        <span className="text-[9px] text-gray-600">Good</span>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <div className="text-[9px] text-gray-600">Current Score</div>
                      <div className="text-[10px] font-semibold text-green-700">Top 40%</div>
                    </div>
                  </div>

                  {/* Score Impact Factors */}
                  <div className="col-span-2 space-y-1.5">
                    <div className="text-[10px] font-semibold text-gray-700 mb-1">Impact Factors</div>
                    {[
                      { factor: 'Payment History', impact: 35, current: 100, status: 'excellent' },
                      { factor: 'Credit Utilization', impact: 30, current: 25, status: 'good' },
                      { factor: 'Credit Age', impact: 15, current: 8.5, status: 'average' },
                      { factor: 'Credit Mix', impact: 10, current: 85, status: 'good' },
                      { factor: 'New Credit', impact: 10, current: 2, status: 'excellent' }
                    ].map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded p-1.5">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[9px] font-medium text-gray-700">{item.factor}</span>
                            <Badge className="h-3 text-[8px] px-1 bg-gray-100 text-gray-700 border-0">
                              {item.impact}%
                            </Badge>
                          </div>
                          <Badge className={`h-3 text-[8px] px-1 border-0 ${
                            item.status === 'excellent' ? 'bg-green-50 text-green-700' :
                            item.status === 'good' ? 'bg-blue-50 text-blue-700' :
                            'bg-yellow-50 text-yellow-700'
                          }`}>
                            {item.status}
                          </Badge>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className={`h-1 rounded-full ${
                              item.status === 'excellent' ? 'bg-green-500' :
                              item.status === 'good' ? 'bg-blue-500' :
                              'bg-yellow-500'
                            }`}
                            style={{ width: `${item.current}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What-If Scenarios */}
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <div className="text-[10px] font-semibold text-gray-700 mb-1.5">Score Improvement Scenarios</div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="border border-green-200 rounded p-1.5 bg-green-50">
                      <div className="text-[9px] text-gray-600 mb-0.5">Pay Down 50% of Debt</div>
                      <div className="text-lg font-bold text-green-700">+45 pts</div>
                      <div className="text-[8px] text-gray-600">New Score: 765</div>
                    </div>
                    <div className="border border-blue-200 rounded p-1.5 bg-blue-50">
                      <div className="text-[9px] text-gray-600 mb-0.5">Make 6 On-Time Payments</div>
                      <div className="text-lg font-bold text-blue-700">+20 pts</div>
                      <div className="text-[8px] text-gray-600">New Score: 740</div>
                    </div>
                    <div className="border border-orange-200 rounded p-1.5 bg-orange-50">
                      <div className="text-[9px] text-gray-600 mb-0.5">Open New Credit Card</div>
                      <div className="text-lg font-bold text-orange-700">-15 pts</div>
                      <div className="text-[8px] text-gray-600">New Score: 705</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loan Eligibility Checker */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Loan Eligibility Assessment</h3>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { type: 'Mortgage', eligible: true, maxAmount: '$850K', rate: '6.25%', confidence: 92 },
                    { type: 'Personal Loan', eligible: true, maxAmount: '$75K', rate: '9.5%', confidence: 88 },
                    { type: 'Business Loan', eligible: true, maxAmount: '$500K', rate: '7.8%', confidence: 85 },
                    { type: 'Auto Loan', eligible: true, maxAmount: '$65K', rate: '5.2%', confidence: 95 }
                  ].map((loan, idx) => (
                    <div key={idx} className={`border rounded p-2 ${
                      loan.eligible ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-semibold text-gray-900">{loan.type}</span>
                        <Badge className={`h-3 text-[8px] px-1 border-0 ${
                          loan.eligible ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                        }`}>
                          {loan.eligible ? '✓ Eligible' : '✗ Not Eligible'}
                        </Badge>
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] text-gray-600">Max Amount</span>
                          <span className="text-[9px] font-semibold text-gray-900">{loan.maxAmount}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] text-gray-600">Est. Rate</span>
                          <span className="text-[9px] font-semibold text-gray-900">{loan.rate}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[8px] text-gray-600">Confidence</span>
                          <span className="text-[9px] font-semibold text-blue-700">{loan.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Loan Payment Breakdown */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                  <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Payment Breakdown</h3>
                  <div className="h-[180px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'Principal', value: loanAmount, fill: '#3b82f6' },
                            { name: 'Interest', value: totalInterest, fill: '#f59e0b' }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={2}
                          dataKey="value"
                          label={(entry) => `${entry.name}: $${(entry.value / 1000).toFixed(0)}K`}
                          labelLine={false}
                        >
                        </Pie>
                        <Tooltip
                          contentStyle={{ fontSize: 10, padding: 4 }}
                          formatter={(value: any) => `$${(value / 1000).toFixed(1)}K`}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-[9px]">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Principal: ${(loanAmount / 1000).toFixed(0)}K</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span>Interest: ${(totalInterest / 1000).toFixed(0)}K</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                  <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Amortization Schedule</h3>
                  <div className="h-[180px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={Array.from({ length: loanTerm }, (_, i) => {
                        const year = i + 1
                        const remainingBalance = loanAmount * (1 - (year / loanTerm))
                        const principalPaid = loanAmount - remainingBalance
                        return {
                          year: `Y${year}`,
                          principal: principalPaid,
                          remaining: remainingBalance
                        }
                      })}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="year"
                          tick={{ fill: '#6b7280', fontSize: 9 }}
                          interval={4}
                        />
                        <YAxis
                          tick={{ fill: '#6b7280', fontSize: 9 }}
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                        />
                        <Tooltip
                          contentStyle={{ fontSize: 10, padding: 4 }}
                          formatter={(value: any) => `$${(value / 1000).toFixed(1)}K`}
                        />
                        <Area
                          type="monotone"
                          dataKey="principal"
                          stackId="1"
                          stroke="#3b82f6"
                          fill="#3b82f6"
                          fillOpacity={0.6}
                          name="Principal Paid"
                        />
                        <Area
                          type="monotone"
                          dataKey="remaining"
                          stackId="1"
                          stroke="#f59e0b"
                          fill="#f59e0b"
                          fillOpacity={0.6}
                          name="Remaining Balance"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
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
