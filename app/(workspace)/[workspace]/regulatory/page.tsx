'use client'

import { useState, useEffect } from 'react'
import { AreaChart, Area, LineChart, Line, ComposedChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Shield, FileText, Clock, AlertTriangle, CheckCircle2, XCircle, ChevronRight, ChevronLeft, ExternalLink, Download, Share2, RefreshCw, Bell, Calendar, FileCheck, MapPin, DollarSign, TrendingUp } from 'lucide-react'
import { PageSkeleton } from '@/components/loading/PageSkeleton'

export default function RegulatoryPage() {
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
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('federal')

  // Main view state
  const [selectedTab, setSelectedTab] = useState('licensing')
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  // Licensing pathway data
  const licensingSteps = [
    { step: 1, name: 'Business Registration', status: 'completed', duration: '2-3 weeks', cost: '$500' },
    { step: 2, name: 'Tax ID Application', status: 'completed', duration: '1-2 weeks', cost: '$0' },
    { step: 3, name: 'Industry License', status: 'in-progress', duration: '4-6 weeks', cost: '$2,500' },
    { step: 4, name: 'Environmental Permit', status: 'pending', duration: '6-8 weeks', cost: '$3,000' },
    { step: 5, name: 'Health & Safety', status: 'pending', duration: '3-4 weeks', cost: '$1,200' },
    { step: 6, name: 'Final Inspection', status: 'pending', duration: '2-3 weeks', cost: '$800' }
  ]

  // Regulatory requirements by sector
  const requirementsData = [
    { requirement: 'Business License', complexity: 'Low', timeframe: '2-4 weeks', cost: '$250-$500', renewal: 'Annual', jurisdiction: 'State' },
    { requirement: 'Health Permit', complexity: 'Medium', timeframe: '4-6 weeks', cost: '$800-$1,500', renewal: 'Annual', jurisdiction: 'Local' },
    { requirement: 'Environmental Compliance', complexity: 'High', timeframe: '8-12 weeks', cost: '$5K-$15K', renewal: 'Every 3 years', jurisdiction: 'Federal' },
    { requirement: 'Safety Certification', complexity: 'Medium', timeframe: '3-5 weeks', cost: '$1K-$3K', renewal: 'Every 2 years', jurisdiction: 'State' },
    { requirement: 'Data Privacy Registration', complexity: 'High', timeframe: '6-8 weeks', cost: '$2K-$8K', renewal: 'Annual', jurisdiction: 'Federal' },
    { requirement: 'Import/Export License', complexity: 'Medium', timeframe: '4-6 weeks', cost: '$1.5K-$4K', renewal: 'Every 2 years', jurisdiction: 'Federal' },
    { requirement: 'Professional Insurance', complexity: 'Low', timeframe: '1-2 weeks', cost: '$3K-$10K/year', renewal: 'Annual', jurisdiction: 'State' },
    { requirement: 'Employee Background Checks', complexity: 'Low', timeframe: '1-3 weeks', cost: '$50-$200/employee', renewal: 'As needed', jurisdiction: 'Federal' }
  ]

  // Recent policy updates
  const policyUpdates = [
    { date: '2025-10-08', title: 'New Data Privacy Requirements', impact: 'High', sector: 'Technology', status: 'Active' },
    { date: '2025-10-05', title: 'Environmental Standards Update', impact: 'Medium', sector: 'Manufacturing', status: 'Pending' },
    { date: '2025-10-01', title: 'Import Tariff Changes', impact: 'High', sector: 'Trade', status: 'Active' },
    { date: '2025-09-28', title: 'Labor Compliance Amendment', impact: 'Medium', sector: 'All', status: 'Active' },
    { date: '2025-09-25', title: 'Financial Reporting Rules', impact: 'High', sector: 'Finance', status: 'Active' },
    { date: '2025-09-20', title: 'Health & Safety Protocol', impact: 'Low', sector: 'Healthcare', status: 'Review' }
  ]

  // Metric cards data
  const metricsData = [
    { title: 'Active Licenses', value: '12', change: '+2', changeType: 'up', period: '8 Pending Renewal', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 10 + i * 0.15 })), alert: false, icon: <FileCheck className="h-3 w-3" /> },
    { title: 'Compliance Score', value: '87%', change: '+3%', changeType: 'up', period: 'Industry Avg: 82%', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 82 + i * 0.35 })), alert: false, icon: <Shield className="h-3 w-3" /> },
    { title: 'Avg Processing Time', value: '42 days', change: '-5 days', changeType: 'down', period: 'Last 6 months', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 50 - i * 0.6 })), alert: false, icon: <Clock className="h-3 w-3" /> },
    { title: 'Total Compliance Cost', value: '$18.5K', change: '+$2.1K', changeType: 'up', period: 'Annual estimate', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 15 + i * 0.25 })), alert: true, icon: <DollarSign className="h-3 w-3" /> },
    { title: 'Policy Updates', value: '24', change: '+6', changeType: 'up', period: 'Last 30 days', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 18 + Math.random() * 8 })), alert: false, icon: <FileText className="h-3 w-3" /> },
    { title: 'Upcoming Deadlines', value: '5', change: '2 Critical', changeType: 'neutral', period: 'Next 30 days', sparkline: Array.from({ length: 15 }, (_, i) => ({ x: i, y: 3 + Math.random() * 4 })), alert: true, icon: <Calendar className="h-3 w-3" /> }
  ]

  // MetricCard component
  const MetricCard = ({ title, value, change, changeType, period, sparkline, alert, icon }: any) => (
    <div className="bg-white rounded-lg p-2 border border-gray-200 hover:shadow-md transition-all group relative">
      {alert && (
        <div className="absolute top-1.5 right-1.5">
          <AlertTriangle className="h-2.5 w-2.5 text-orange-500" />
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
            changeType === 'up' ? 'bg-blue-50 text-blue-700' :
            changeType === 'down' ? 'bg-green-50 text-green-700' :
            'bg-gray-100 text-gray-700'
          }`}>
            {changeType === 'up' && '↑'} {changeType === 'down' && '↓'} {change}
          </Badge>
          <div className="w-14 h-5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline}>
                <Area type="monotone" dataKey="y" stroke={changeType === 'up' ? '#3b82f6' : '#10b981'} strokeWidth={1} fill={changeType === 'up' ? '#dbeafe' : '#d1fae5'} fillOpacity={0.3} />
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
    setSelectedRows(prev => prev.length === requirementsData.length ? [] : requirementsData.map((_, i) => i))
  }

  if (isLoading) return <PageSkeleton />

  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
      {/* Left Analysis Panel */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${leftPanelCollapsed ? 'w-0' : 'w-64'} flex-shrink-0 overflow-hidden`}>
        <div className="h-full flex flex-col">
          <div className="px-2 py-1.5 border-b border-gray-200 flex items-center justify-between">
            <span className="text-[10px] font-semibold text-gray-700">Licensing Pathway</span>
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
              <span className="text-[9px] font-semibold text-gray-600 uppercase">Sector</span>
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="h-6 text-[10px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Jurisdiction */}
            <div className="space-y-1">
              <span className="text-[9px] font-semibold text-gray-600 uppercase">Jurisdiction</span>
              <Select value={selectedJurisdiction} onValueChange={setSelectedJurisdiction}>
                <SelectTrigger className="h-6 text-[10px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="federal">Federal</SelectItem>
                  <SelectItem value="state">State</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Licensing Progress */}
            <div className="space-y-1 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-semibold text-gray-600 uppercase">Progress Tracker</span>
                <Badge className="h-3.5 text-[8px] px-1 bg-blue-50 text-blue-700 border-0">
                  33% Complete
                </Badge>
              </div>
              <div className="space-y-1.5">
                {licensingSteps.map((step) => (
                  <div key={step.step} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          step.status === 'completed' ? 'bg-green-100' :
                          step.status === 'in-progress' ? 'bg-blue-100' :
                          'bg-gray-100'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle2 className="h-2.5 w-2.5 text-green-600" />
                          ) : step.status === 'in-progress' ? (
                            <Clock className="h-2.5 w-2.5 text-blue-600" />
                          ) : (
                            <span className="text-[8px] text-gray-500">{step.step}</span>
                          )}
                        </div>
                        <span className="text-[9px] font-medium text-gray-700">{step.name}</span>
                      </div>
                    </div>
                    <div className="pl-5 space-y-0.5">
                      <div className="text-[8px] text-gray-600">Duration: {step.duration}</div>
                      <div className="text-[8px] text-gray-600">Cost: {step.cost}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full h-5 text-[9px] mt-1">
                View Full Timeline
              </Button>
            </div>

            {/* Upcoming Deadlines */}
            <div className="space-y-1 pt-2 border-t border-gray-200">
              <span className="text-[9px] font-semibold text-gray-600 uppercase">Upcoming Deadlines</span>
              <div className="space-y-1">
                {[
                  { name: 'Health Permit Renewal', date: 'Oct 25', priority: 'high' },
                  { name: 'Tax Filing', date: 'Oct 30', priority: 'high' },
                  { name: 'Safety Inspection', date: 'Nov 05', priority: 'medium' }
                ].map((deadline, idx) => (
                  <div key={idx} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] text-gray-700">{deadline.name}</span>
                      <Badge className={`h-3 text-[8px] px-1 border-0 ${
                        deadline.priority === 'high' ? 'bg-red-50 text-red-700' : 'bg-yellow-50 text-yellow-700'
                      }`}>
                        {deadline.date}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="w-full h-5 text-[9px] mt-1">
                <Bell className="h-2.5 w-2.5 mr-1" />
                Set Alerts
              </Button>
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
              <Shield className="h-3.5 w-3.5 text-blue-600" />
              <h1 className="text-sm font-semibold text-gray-900">Regulatory Access</h1>
            </div>
            <Badge className="h-4 text-[9px] px-1.5 bg-green-50 text-green-700 border-green-200">
              Live
            </Badge>
            <Badge className="h-4 text-[9px] px-1.5 bg-blue-50 text-blue-700 border-blue-200">
              91% Confidence
            </Badge>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] text-gray-500">Updated 5m ago</span>
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
              Government Portals
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

          {/* Compliance Timeline Chart */}
          <div className="bg-white rounded-lg p-2.5 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-[11px] font-semibold text-gray-900">Compliance Score Trend</h3>
                <Badge className="h-3.5 text-[8px] px-1 bg-gray-100 text-gray-700 border-0">
                  Last 12 months
                </Badge>
                <div className="flex items-center gap-2 text-[10px]">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#3b82f6]"></div>
                    <span className="text-gray-600">Compliance Score</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#f59e0b]"></div>
                    <span className="text-gray-600">Policy Updates</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={Array.from({ length: 12 }, (_, i) => ({
                  month: `M${i + 1}`,
                  score: 75 + i * 1.2 + Math.random() * 5,
                  target: 85,
                  updates: Math.floor(15 + Math.random() * 10)
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fill: '#6b7280', fontSize: 9 }}
                    tickMargin={5}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: '#6b7280', fontSize: 9 }}
                    tickMargin={5}
                    label={{ value: 'Score (%)', angle: -90, position: 'insideLeft', style: { fontSize: 9, fill: '#6b7280' } }}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: '#6b7280', fontSize: 9 }}
                    tickMargin={5}
                    label={{ value: 'Policy Updates', angle: 90, position: 'insideRight', style: { fontSize: 9, fill: '#6b7280' } }}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 10, padding: 4 }}
                    labelStyle={{ fontSize: 9 }}
                  />
                  <ReferenceLine yAxisId="left" y={85} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Target', fontSize: 9, fill: '#10b981' }} />
                  <Area yAxisId="left" type="monotone" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} name="Compliance Score" />
                  <Bar yAxisId="right" dataKey="updates" fill="#f59e0b" opacity={0.6} name="Policy Updates" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-2">
            <TabsList className="h-6 bg-gray-100 p-0.5">
              <TabsTrigger value="licensing" className="h-5 text-[11px] px-2">
                Licensing Requirements
              </TabsTrigger>
              <TabsTrigger value="updates" className="h-5 text-[11px] px-2">
                Policy Updates
              </TabsTrigger>
              <TabsTrigger value="timeline" className="h-5 text-[11px] px-2">
                Implementation Timeline
              </TabsTrigger>
              <TabsTrigger value="risk" className="h-5 text-[11px] px-2">
                Risk Assessment
              </TabsTrigger>
              <TabsTrigger value="chatbot" className="h-5 text-[11px] px-2">
                Regulatory Q&A
                <Badge className="ml-1 h-3 text-[8px] px-1 bg-purple-100 text-purple-700 border-0">Beta</Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="licensing" className="mt-2 space-y-2">
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[11px] font-semibold text-gray-900">Licensing & Permit Requirements</h3>
                  {selectedRows.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] text-gray-600">{selectedRows.length} selected</span>
                      <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                        Track Selected
                      </Button>
                      <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                        Generate Checklist
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
                            checked={selectedRows.length === requirementsData.length}
                            onChange={toggleAllRows}
                          />
                        </th>
                        <th className="text-left p-1.5 font-semibold text-gray-700">Requirement</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Complexity</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Timeframe</th>
                        <th className="text-right p-1.5 font-semibold text-gray-700">Cost</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Renewal</th>
                        <th className="text-center p-1.5 font-semibold text-gray-700">Jurisdiction</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requirementsData.map((row, index) => (
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
                          <td className="p-1.5 font-medium text-gray-900">{row.requirement}</td>
                          <td className="p-1.5 text-center">
                            <Badge className={`h-4 text-[9px] px-1.5 border-0 ${
                              row.complexity === 'Low' ? 'bg-green-50 text-green-700' :
                              row.complexity === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                              'bg-red-50 text-red-700'
                            }`}>
                              {row.complexity}
                            </Badge>
                          </td>
                          <td className="p-1.5 text-center text-gray-700">{row.timeframe}</td>
                          <td className="p-1.5 text-right text-gray-900">{row.cost}</td>
                          <td className="p-1.5 text-center text-gray-700">{row.renewal}</td>
                          <td className="p-1.5 text-center">
                            <Badge className="h-4 text-[9px] px-1.5 bg-gray-100 text-gray-700 border-0">
                              {row.jurisdiction}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="updates" className="mt-2">
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[11px] font-semibold text-gray-900">Recent Policy Updates</h3>
                  <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                    <Bell className="h-2.5 w-2.5 mr-1" />
                    Subscribe to Updates
                  </Button>
                </div>

                <div className="space-y-2">
                  {policyUpdates.map((update, idx) => (
                    <div key={idx} className="border border-gray-200 rounded p-2 hover:shadow-md transition-all">
                      <div className="flex items-start justify-between mb-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-[11px] font-semibold text-gray-900">{update.title}</h4>
                            <Badge className={`h-3.5 text-[8px] px-1 border-0 ${
                              update.impact === 'High' ? 'bg-red-50 text-red-700' :
                              update.impact === 'Medium' ? 'bg-yellow-50 text-yellow-700' :
                              'bg-green-50 text-green-700'
                            }`}>
                              {update.impact} Impact
                            </Badge>
                            <Badge className={`h-3.5 text-[8px] px-1 border-0 ${
                              update.status === 'Active' ? 'bg-green-50 text-green-700' :
                              update.status === 'Pending' ? 'bg-yellow-50 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {update.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-[9px] text-gray-600">
                            <span>{update.date}</span>
                            <span>•</span>
                            <span>{update.sector}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="h-5 text-[9px] px-1.5">
                          View Details <ChevronRight className="h-2.5 w-2.5 ml-1" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-2 space-y-2">
              {/* Gantt-Style Timeline */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[11px] font-semibold text-gray-900">Licensing Implementation Timeline</h3>
                  <div className="flex items-center gap-2">
                    <Badge className="h-3.5 text-[8px] px-1 bg-blue-50 text-blue-700 border-0">
                      18-24 weeks total
                    </Badge>
                    <Button variant="outline" size="sm" className="h-5 text-[9px] px-1.5">
                      Export Timeline
                    </Button>
                  </div>
                </div>

                <div className="space-y-1">
                  {[
                    { name: 'Business Registration', start: 0, duration: 3, status: 'completed', cost: '$500' },
                    { name: 'Tax ID Application', start: 2, duration: 2, status: 'completed', cost: '$0' },
                    { name: 'Industry License', start: 4, duration: 5, status: 'in-progress', cost: '$2,500' },
                    { name: 'Environmental Permit', start: 9, duration: 7, status: 'pending', cost: '$3,000' },
                    { name: 'Health & Safety Cert', start: 16, duration: 4, status: 'pending', cost: '$1,200' },
                    { name: 'Final Inspection', start: 20, duration: 3, status: 'pending', cost: '$800' }
                  ].map((task, idx) => {
                    const totalWeeks = 24
                    const startPercent = (task.start / totalWeeks) * 100
                    const durationPercent = (task.duration / totalWeeks) * 100

                    return (
                      <div key={idx} className="flex items-center gap-2 text-[10px]">
                        <div className="w-40 flex-shrink-0">
                          <div className="font-medium text-gray-900">{task.name}</div>
                          <div className="text-[9px] text-gray-600">{task.duration} weeks • {task.cost}</div>
                        </div>
                        <div className="flex-1 relative h-6 bg-gray-100 rounded">
                          <div
                            className={`absolute h-full rounded flex items-center justify-center text-[9px] font-medium ${
                              task.status === 'completed' ? 'bg-green-500 text-white' :
                              task.status === 'in-progress' ? 'bg-blue-500 text-white' :
                              'bg-gray-300 text-gray-700'
                            }`}
                            style={{
                              left: `${startPercent}%`,
                              width: `${durationPercent}%`
                            }}
                          >
                            {task.status === 'completed' ? '✓' :
                             task.status === 'in-progress' ? '⏳' : ''}
                          </div>
                        </div>
                        <Badge className={`h-4 text-[8px] px-1.5 border-0 w-20 justify-center ${
                          task.status === 'completed' ? 'bg-green-50 text-green-700' :
                          task.status === 'in-progress' ? 'bg-blue-50 text-blue-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {task.status}
                        </Badge>
                      </div>
                    )
                  })}
                </div>

                {/* Timeline Scale */}
                <div className="mt-2 flex items-center gap-2 text-[9px] text-gray-600">
                  <div className="w-40 flex-shrink-0"></div>
                  <div className="flex-1 flex justify-between border-t border-gray-300 pt-1">
                    {Array.from({ length: 7 }, (_, i) => (
                      <span key={i}>Week {i * 4}</span>
                    ))}
                  </div>
                  <div className="w-20"></div>
                </div>
              </div>

              {/* Complexity Scoring */}
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white rounded-lg border border-gray-200 p-2">
                  <div className="text-[10px] text-gray-600 mb-1">Overall Complexity</div>
                  <div className="flex items-end gap-1 mb-1">
                    <div className="text-2xl font-bold text-orange-700">6.8</div>
                    <div className="text-[9px] text-gray-600 mb-1">/ 10</div>
                  </div>
                  <Badge className="h-3.5 text-[8px] px-1 bg-orange-50 text-orange-700 border-0">
                    Moderate-High
                  </Badge>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-2">
                  <div className="text-[10px] text-gray-600 mb-1">Est. Total Cost</div>
                  <div className="text-2xl font-bold text-blue-700">$8.0K</div>
                  <div className="text-[9px] text-gray-600 mt-1">Licensing + Compliance</div>
                </div>
                <div className="bg-white rounded-lg border border-gray-200 p-2">
                  <div className="text-[10px] text-gray-600 mb-1">Est. Completion</div>
                  <div className="text-2xl font-bold text-green-700">22 wks</div>
                  <div className="text-[9px] text-gray-600 mt-1">≈ 5.5 months</div>
                </div>
              </div>

              {/* Dependencies */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Task Dependencies</h3>
                <div className="space-y-1.5">
                  {[
                    { task: 'Industry License', depends: ['Business Registration', 'Tax ID'], blocking: ['Environmental Permit'] },
                    { task: 'Environmental Permit', depends: ['Industry License'], blocking: ['Health & Safety'] },
                    { task: 'Final Inspection', depends: ['All previous'], blocking: [] }
                  ].map((dep, idx) => (
                    <div key={idx} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                      <div className="text-[10px] font-semibold text-gray-900 mb-1">{dep.task}</div>
                      <div className="flex items-start gap-3 text-[9px]">
                        <div className="flex-1">
                          <span className="text-gray-600">Depends on: </span>
                          <span className="text-gray-900">{dep.depends.join(', ')}</span>
                        </div>
                        {dep.blocking.length > 0 && (
                          <div className="flex-1">
                            <span className="text-gray-600">Blocking: </span>
                            <span className="text-orange-700">{dep.blocking.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="risk" className="mt-2 space-y-2">
              {/* Risk Assessment Matrix */}
              <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Regulatory Risk Assessment Matrix</h3>

                <div className="grid grid-cols-[100px_1fr] gap-2">
                  {/* Y-axis label */}
                  <div className="flex items-center justify-center">
                    <div className="text-[9px] font-semibold text-gray-700 transform -rotate-90 whitespace-nowrap">
                      Impact / Severity →
                    </div>
                  </div>

                  {/* Matrix */}
                  <div className="space-y-1">
                    {['Critical', 'High', 'Medium', 'Low'].map((impact, rowIdx) => (
                      <div key={impact} className="flex items-center gap-1">
                        <div className="w-16 text-[9px] font-medium text-gray-700 text-right">{impact}</div>
                        <div className="flex-1 grid grid-cols-4 gap-1">
                          {['Low', 'Medium', 'High', 'Critical'].map((prob, colIdx) => {
                            const riskLevel = 4 - rowIdx + colIdx
                            const bgColor =
                              riskLevel <= 2 ? 'bg-green-100 border-green-300' :
                              riskLevel <= 4 ? 'bg-yellow-100 border-yellow-300' :
                              riskLevel <= 6 ? 'bg-orange-100 border-orange-300' :
                              'bg-red-100 border-red-300'

                            // Define risks in each cell
                            const risks: Record<string, string[]> = {
                              '0-3': rowIdx === 3 && colIdx === 3 ? ['Late Filing'] : [],
                              '1-2': rowIdx === 2 && colIdx === 2 ? ['License Delay'] : [],
                              '2-1': rowIdx === 1 && colIdx === 1 ? ['Audit Finding'] : [],
                              '0-2': rowIdx === 0 && colIdx === 2 ? ['Non-Compliance', 'Fine Risk'] : []
                            }

                            const cellRisks = risks[`${rowIdx}-${colIdx}`] || []

                            return (
                              <div
                                key={`${rowIdx}-${colIdx}`}
                                className={`h-20 border-2 rounded p-1 ${bgColor} flex flex-col justify-center`}
                              >
                                {cellRisks.map((risk, idx) => (
                                  <div key={idx} className="text-[8px] font-medium text-gray-900 mb-0.5 bg-white/60 px-1 py-0.5 rounded">
                                    {risk}
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
                      <div className="flex-1 grid grid-cols-4 gap-1 text-[9px] font-medium text-gray-700 text-center">
                        <div>Low</div>
                        <div>Medium</div>
                        <div>High</div>
                        <div>Critical</div>
                      </div>
                    </div>
                    <div className="text-[9px] font-semibold text-gray-700 text-center mt-1">
                      ← Probability / Likelihood
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Details */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                  <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Top Regulatory Risks</h3>
                  <div className="space-y-1.5">
                    {[
                      { risk: 'Environmental Non-Compliance', probability: 'High', impact: 'Critical', score: 9.2, mitigation: 'Early permit application' },
                      { risk: 'License Expiration', probability: 'Medium', impact: 'High', score: 7.5, mitigation: 'Auto-renewal tracking' },
                      { risk: 'Documentation Gaps', probability: 'High', impact: 'Medium', score: 6.8, mitigation: 'Weekly audit reviews' },
                      { risk: 'Audit Findings', probability: 'Medium', impact: 'Medium', score: 5.2, mitigation: 'Pre-audit assessment' }
                    ].map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <div className="text-[10px] font-semibold text-gray-900">{item.risk}</div>
                            <div className="text-[8px] text-gray-600 mt-0.5">{item.mitigation}</div>
                          </div>
                          <div className="text-[11px] font-bold text-red-700">{item.score}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="h-3 text-[8px] px-1 bg-orange-50 text-orange-700 border-0">
                            {item.probability} Prob
                          </Badge>
                          <Badge className="h-3 text-[8px] px-1 bg-red-50 text-red-700 border-0">
                            {item.impact} Impact
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-2.5">
                  <h3 className="text-[11px] font-semibold text-gray-900 mb-2">Risk Mitigation Actions</h3>
                  <div className="space-y-1.5">
                    {[
                      { action: 'Submit environmental application 2 weeks early', status: 'in-progress', owner: 'Compliance Team', due: 'Oct 20' },
                      { action: 'Set up auto-renewal reminders for all licenses', status: 'completed', owner: 'Legal', due: 'Oct 15' },
                      { action: 'Conduct internal compliance audit', status: 'pending', owner: 'Audit Team', due: 'Oct 30' },
                      { action: 'Update document management system', status: 'pending', owner: 'IT', due: 'Nov 05' }
                    ].map((item, idx) => (
                      <div key={idx} className="border border-gray-200 rounded p-1.5 bg-gray-50">
                        <div className="flex items-start justify-between mb-1">
                          <div className="flex-1">
                            <div className="text-[10px] font-medium text-gray-900">{item.action}</div>
                            <div className="text-[8px] text-gray-600 mt-0.5">Owner: {item.owner} • Due: {item.due}</div>
                          </div>
                          <Badge className={`h-3 text-[8px] px-1 border-0 ${
                            item.status === 'completed' ? 'bg-green-50 text-green-700' :
                            item.status === 'in-progress' ? 'bg-blue-50 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="chatbot" className="mt-2">
              <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
                <FileText className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Regulatory Q&A Chatbot</h3>
                <p className="text-xs text-gray-600 mb-3">
                  AI-powered chatbot to answer licensing questions, explain requirements, and guide you through compliance processes
                </p>
                <Badge className="h-5 text-[10px] px-2 bg-purple-50 text-purple-700 border-purple-200">
                  Coming Soon
                </Badge>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
