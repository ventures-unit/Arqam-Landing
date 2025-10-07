'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  BarChart3, 
  Eye,
  Download,
  RefreshCw
} from 'lucide-react'
import Head from 'next/head'

interface AnalyticsData {
  // Basic metrics
  totalSignups: number
  signupsToday: number
  signupsThisWeek: number
  signupsThisMonth: number
  signupsThisYear: number
  
  // Growth metrics
  weeklyGrowthRate: string
  monthlyGrowthRate: string
  avgSignupsPerDay: string
  
  // Distribution data
  signupsByRole: Array<{ role: string; count: number; percentage: string }>
  signupsByNationality: Array<{ nationality: string; count: number; percentage: string }>
  topSectorKeywords: Array<{ keyword: string; count: number }>
  signupsByDate: Array<{ date: string; count: number }>
  signupsByHour: Array<{ hour: number; count: number }>
  
  // Recent activity
  recentSignups: Array<{
    id: string
    name: string
    email: string
    organization: string
    organizationType: string
    nationality: string
    interestedSectors: string
    createdAt: string
  }>
  
  // Insights
  peakHour: number
  peakHourCount: number
  
  // Data quality
  dataQuality: {
    totalRecords: number
    recordsWithEmail: number
    recordsWithPhone: number
    recordsWithOrganization: number
  }
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [exporting, setExporting] = useState(false)

  // Simple password protection
  const ADMIN_PASSWORD = 'arqam2025admin'

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Invalid password')
    }
  }

  const fetchAnalytics = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const params = new URLSearchParams()
      if (dateFrom) params.append('dateFrom', dateFrom)
      if (dateTo) params.append('dateTo', dateTo)
      
      console.log('Fetching analytics from:', `/api/ventures-admin/analytics?${params.toString()}`)
      
      // Add timeout to prevent infinite loading
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout
      
      const response = await fetch(`/api/ventures-admin/analytics?${params.toString()}`, {
        headers: {
          'x-admin-password': ADMIN_PASSWORD
        },
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('Response error:', errorData)
        
        if (response.status === 401) {
          throw new Error('Unauthorized access. Please log in again.')
        }
        if (response.status === 429) {
          throw new Error('Too many requests. Please wait a moment and try again.')
        }
        throw new Error(errorData.error || 'Failed to fetch analytics')
      }
      const data = await response.json()
      console.log('Analytics data received:', data)
      setAnalytics(data)
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again.')
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load analytics')
      }
      console.error('Analytics fetch error:', err)
    } finally {
      setLoading(false)
    }
  }, [dateFrom, dateTo])

  const handleExport = async () => {
    try {
      setExporting(true)
      const params = new URLSearchParams()
      params.append('export', 'csv')
      if (dateFrom) params.append('dateFrom', dateFrom)
      if (dateTo) params.append('dateTo', dateTo)
      
      const response = await fetch(`/api/ventures-admin/analytics?${params.toString()}`, {
        headers: {
          'x-admin-password': ADMIN_PASSWORD
        }
      })
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized access. Please log in again.')
        }
        throw new Error('Failed to export data')
      }
      
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `arqam-signups-${new Date().toISOString().split('T')[0]}.csv`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to export data')
    } finally {
      setExporting(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      const timeoutId = setTimeout(() => {
        fetchAnalytics()
      }, 500) // 500ms debounce
      
      return () => clearTimeout(timeoutId)
    }
  }, [isAuthenticated, fetchAnalytics])

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Admin Dashboard - Arqam</title>
          <meta name="description" content="Arqam Analytics Dashboard" />
          <meta name="robots" content="noindex, nofollow" />
        </Head>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
        >
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Enter password to access analytics</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 bg-white"
                required
              />
            </div>
            {error && (
              <p className="text-red-600 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
        </div>
      </>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={fetchAnalytics}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Admin Dashboard - Arqam</title>
        <meta name="description" content="Arqam Analytics Dashboard" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Arqam Analytics</h1>
            <p className="text-gray-600">Real-time signup and engagement metrics</p>
          </div>
          
          {/* Date Filters */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <div className="flex space-x-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                placeholder="From Date"
              />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 bg-white"
                placeholder="To Date"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={fetchAnalytics}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleExport}
                disabled={exporting}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors text-sm"
              >
                <Download className="w-4 h-4" />
                <span>{exporting ? 'Exporting...' : 'Export CSV'}</span>
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Signups</p>
                <p className="text-3xl font-bold text-gray-900">{analytics?.totalSignups || 0}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today</p>
                <p className="text-3xl font-bold text-green-600">{analytics?.signupsToday || 0}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-3xl font-bold text-purple-600">{analytics?.signupsThisWeek || 0}</p>
                <p className="text-xs text-gray-500">
                  {analytics?.weeklyGrowthRate && parseFloat(analytics.weeklyGrowthRate) > 0 ? '+' : ''}
                  {analytics?.weeklyGrowthRate}% vs last week
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-orange-600">{analytics?.signupsThisMonth || 0}</p>
                <p className="text-xs text-gray-500">
                  {analytics?.monthlyGrowthRate && parseFloat(analytics.monthlyGrowthRate) > 0 ? '+' : ''}
                  {analytics?.monthlyGrowthRate}% vs last month
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-orange-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg/Day</p>
                <p className="text-3xl font-bold text-indigo-600">{analytics?.avgSignupsPerDay || '0'}</p>
                <p className="text-xs text-gray-500">Last 30 days</p>
              </div>
              <Eye className="w-8 h-8 text-indigo-600" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Peak Hour</p>
                <p className="text-3xl font-bold text-red-600">{analytics?.peakHour || 0}:00</p>
                <p className="text-xs text-gray-500">{analytics?.peakHourCount || 0} signups</p>
              </div>
              <TrendingUp className="w-8 h-8 text-red-600" />
            </div>
          </motion.div>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Signups by Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Signups by Organization Type</h3>
            <div className="space-y-3">
              {analytics?.signupsByRole.map((item) => (
                <div key={item.role} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.role}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(item.count / Math.max(...(analytics?.signupsByRole.map(r => r.count) || [1])) * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12 text-right">{item.count} ({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Signups by Nationality */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Nationalities</h3>
            <div className="space-y-3">
              {analytics?.signupsByNationality.slice(0, 8).map((item) => (
                <div key={item.nationality} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{item.nationality}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(item.count / Math.max(...(analytics?.signupsByNationality.map(n => n.count) || [1])) * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-12 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Sector Keywords */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Interest Keywords</h3>
            <div className="space-y-3">
              {analytics?.topSectorKeywords.slice(0, 10).map((item) => (
                <div key={item.keyword} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 capitalize">{item.keyword}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${(item.count / Math.max(...(analytics?.topSectorKeywords.map(k => k.count) || [1])) * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900 w-8 text-right">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Signups */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Signups</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {analytics?.recentSignups.map((signup) => (
                <div key={signup.id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{signup.name}</p>
                    <p className="text-xs text-gray-500">{signup.organization} • {signup.nationality}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{new Date(signup.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Hourly Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Signups by Hour of Day</h3>
            <div className="space-y-2">
              {analytics?.signupsByHour.map((item) => (
                <div key={item.hour} className="flex items-center space-x-3">
                  <span className="text-sm text-gray-600 w-12">{item.hour}:00</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-orange-500 h-3 rounded-full" 
                      style={{ width: `${(item.count / Math.max(...(analytics?.signupsByHour.map(h => h.count) || [1])) * 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-8 text-right">{item.count}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Data Quality */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Quality</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Records</span>
                <span className="text-sm font-medium text-gray-900">{analytics?.dataQuality.totalRecords || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">With Email</span>
                <span className="text-sm font-medium text-green-600">
                  {analytics?.dataQuality.recordsWithEmail || 0} 
                  ({analytics?.dataQuality.totalRecords ? ((analytics.dataQuality.recordsWithEmail / analytics.dataQuality.totalRecords) * 100).toFixed(1) : 0}%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">With Phone</span>
                <span className="text-sm font-medium text-green-600">
                  {analytics?.dataQuality.recordsWithPhone || 0} 
                  ({analytics?.dataQuality.totalRecords ? ((analytics.dataQuality.recordsWithPhone / analytics.dataQuality.totalRecords) * 100).toFixed(1) : 0}%)
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">With Organization</span>
                <span className="text-sm font-medium text-green-600">
                  {analytics?.dataQuality.recordsWithOrganization || 0} 
                  ({analytics?.dataQuality.totalRecords ? ((analytics.dataQuality.recordsWithOrganization / analytics.dataQuality.totalRecords) * 100).toFixed(1) : 0}%)
                </span>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
      </div>
    </>
  )
}
