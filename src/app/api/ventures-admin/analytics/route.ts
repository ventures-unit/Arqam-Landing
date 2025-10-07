import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { checkRateLimit } from '@/lib/security'

// Simple admin authentication
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'arqam2025admin'

function verifyAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  const adminPassword = request.headers.get('x-admin-password')
  
  // Check for basic auth or custom header
  if (authHeader?.startsWith('Basic ')) {
    const credentials = Buffer.from(authHeader.slice(6), 'base64').toString()
    const [username, password] = credentials.split(':')
    return username === 'admin' && password === ADMIN_PASSWORD
  }
  
  return adminPassword === ADMIN_PASSWORD
}

export async function GET(request: NextRequest) {
  try {
    // Rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    
    if (!checkRateLimit(ip, 30, 60000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Admin authentication
    if (!verifyAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const exportFormat = searchParams.get('export')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')

    // Validate date inputs
    if (dateFrom && !isValidDate(dateFrom)) {
      return NextResponse.json(
        { error: 'Invalid dateFrom parameter' },
        { status: 400 }
      )
    }
    
    if (dateTo && !isValidDate(dateTo)) {
      return NextResponse.json(
        { error: 'Invalid dateTo parameter' },
        { status: 400 }
      )
    }

    // Build query with optional date filters
    let query = supabase
      .from('arqam_signups')
      .select('*')
      .order('created_at', { ascending: false })

    if (dateFrom) {
      query = query.gte('created_at', dateFrom)
    }
    if (dateTo) {
      query = query.lte('created_at', dateTo)
    }

    const { data: signups, error } = await query

    if (error) {
      console.error('Error fetching signups:', error)
      return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
    }

    // Handle CSV export
    if (exportFormat === 'csv') {
      const csvData = generateCSV(signups || [])
      return new NextResponse(csvData, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="arqam-signups-${new Date().toISOString().split('T')[0]}.csv"`
        }
      })
    }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
    const yearAgo = new Date(today.getTime() - 365 * 24 * 60 * 60 * 1000)

    // Calculate basic metrics
    const totalSignups = signups?.length || 0
    const signupsToday = signups?.filter(s => new Date(s.created_at) >= today).length || 0
    const signupsThisWeek = signups?.filter(s => new Date(s.created_at) >= weekAgo).length || 0
    const signupsThisMonth = signups?.filter(s => new Date(s.created_at) >= monthAgo).length || 0
    const signupsThisYear = signups?.filter(s => new Date(s.created_at) >= yearAgo).length || 0

    // Calculate growth rates
    const lastWeek = signups?.filter(s => {
      const signupDate = new Date(s.created_at)
      const twoWeeksAgo = new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000)
      return signupDate >= twoWeeksAgo && signupDate < weekAgo
    }).length || 0

    const lastMonth = signups?.filter(s => {
      const signupDate = new Date(s.created_at)
      const twoMonthsAgo = new Date(today.getTime() - 60 * 24 * 60 * 60 * 1000)
      return signupDate >= twoMonthsAgo && signupDate < monthAgo
    }).length || 0

    const weeklyGrowthRate = lastWeek > 0 ? ((signupsThisWeek - lastWeek) / lastWeek * 100) : 0
    const monthlyGrowthRate = lastMonth > 0 ? ((signupsThisMonth - lastMonth) / lastMonth * 100) : 0

    // Group by organization type
    const signupsByRole = signups?.reduce((acc: Record<string, number>, signup) => {
      const role = signup.organization_type || 'Unknown'
      acc[role] = (acc[role] || 0) + 1
      return acc
    }, {}) || {}

    const signupsByRoleArray = Object.entries(signupsByRole).map(([role, count]) => ({
      role,
      count: count as number,
      percentage: totalSignups > 0 ? ((count as number / totalSignups) * 100).toFixed(1) : '0'
    })).sort((a, b) => b.count - a.count)

    // Group by nationality
    const signupsByNationality = signups?.reduce((acc: Record<string, number>, signup) => {
      const nationality = signup.nationality || 'Unknown'
      acc[nationality] = (acc[nationality] || 0) + 1
      return acc
    }, {}) || {}

    const signupsByNationalityArray = Object.entries(signupsByNationality)
      .map(([nationality, count]) => ({
        nationality,
        count: count as number,
        percentage: totalSignups > 0 ? ((count as number / totalSignups) * 100).toFixed(1) : '0'
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10) // Top 10 nationalities

    // Group by interested sectors (now text field)
    const sectorKeywords = signups?.reduce((acc: Record<string, number>, signup) => {
      const sectors = signup.interested_sectors?.toLowerCase() || ''
      const keywords = sectors.split(/[,\s]+/).filter((word: string) => word.length > 2)
      keywords.forEach((keyword: string) => {
        acc[keyword] = (acc[keyword] || 0) + 1
      })
      return acc
    }, {}) || {}

    const topSectorKeywords = Object.entries(sectorKeywords)
      .map(([keyword, count]) => ({ keyword, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15)

    // Group by date for trend analysis
    const signupsByDate = signups?.reduce((acc: Record<string, number>, signup) => {
      const date = new Date(signup.created_at).toISOString().split('T')[0]
      acc[date] = (acc[date] || 0) + 1
      return acc
    }, {}) || {}

    const signupsByDateArray = Object.entries(signupsByDate)
      .map(([date, count]) => ({ date, count: count as number }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-30) // Last 30 days

    // Hourly distribution
    const signupsByHour = signups?.reduce((acc: Record<number, number>, signup) => {
      const hour = new Date(signup.created_at).getHours()
      acc[hour] = (acc[hour] || 0) + 1
      return acc
    }, {}) || {}

    const signupsByHourArray = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: signupsByHour[i] || 0
    }))

    // Recent signups (last 20)
    const recentSignups = signups?.slice(0, 20).map(signup => ({
      id: signup.id,
      name: signup.full_name,
      email: signup.email,
      organization: signup.organization_name,
      organizationType: signup.organization_type,
      nationality: signup.nationality,
      interestedSectors: signup.interested_sectors,
      createdAt: signup.created_at
    })) || []

    // Peak signup times
    const peakHour = signupsByHourArray.reduce((max, current) => 
      current.count > max.count ? current : max, { hour: 0, count: 0 }
    )

    // Average signups per day (last 30 days)
    const avgSignupsPerDay = signupsByDateArray.length > 0 
      ? (signupsByDateArray.reduce((sum, day) => sum + day.count, 0) / signupsByDateArray.length).toFixed(1)
      : '0'

    const analytics = {
      // Basic metrics
      totalSignups,
      signupsToday,
      signupsThisWeek,
      signupsThisMonth,
      signupsThisYear,
      
      // Growth metrics
      weeklyGrowthRate: weeklyGrowthRate.toFixed(1),
      monthlyGrowthRate: monthlyGrowthRate.toFixed(1),
      avgSignupsPerDay,
      
      // Distribution data
      signupsByRole: signupsByRoleArray,
      signupsByNationality: signupsByNationalityArray,
      topSectorKeywords,
      signupsByDate: signupsByDateArray,
      signupsByHour: signupsByHourArray,
      
      // Recent activity
      recentSignups,
      
      // Insights
      peakHour: peakHour.hour,
      peakHourCount: peakHour.count,
      
      // Data quality
      dataQuality: {
        totalRecords: totalSignups,
        recordsWithEmail: signups?.filter(s => s.email).length || 0,
        recordsWithPhone: signups?.filter(s => s.mobile_number).length || 0,
        recordsWithOrganization: signups?.filter(s => s.organization_name).length || 0
      }
    }

    return NextResponse.json(analytics)
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function generateCSV(signups: Array<{
  id: string;
  full_name: string;
  email: string;
  mobile_number: string;
  nationality: string;
  organization_name: string;
  organization_type: string;
  organization_type_other: string | null;
  position_title: string;
  interested_sectors: string;
  interested_datasets: string[];
  interested_datasets_other: string | null;
  data_usage: string[];
  data_usage_other: string | null;
  created_at: string;
}>): string {
  const headers = [
    'ID',
    'Full Name',
    'Email',
    'Mobile Number',
    'Nationality',
    'Organization Name',
    'Organization Type',
    'Organization Type Other',
    'Position Title',
    'Interested Sectors',
    'Interested Datasets',
    'Interested Datasets Other',
    'Data Usage',
    'Data Usage Other',
    'Created At'
  ]

  const csvRows = [headers.join(',')]

  signups.forEach(signup => {
    const row = [
      signup.id,
      `"${signup.full_name || ''}"`,
      `"${signup.email || ''}"`,
      `"${signup.mobile_number || ''}"`,
      `"${signup.nationality || ''}"`,
      `"${signup.organization_name || ''}"`,
      `"${signup.organization_type || ''}"`,
      `"${signup.organization_type_other || ''}"`,
      `"${signup.position_title || ''}"`,
      `"${signup.interested_sectors || ''}"`,
      `"${(signup.interested_datasets || []).join('; ')}"`,
      `"${signup.interested_datasets_other || ''}"`,
      `"${(signup.data_usage || []).join('; ')}"`,
      `"${signup.data_usage_other || ''}"`,
      signup.created_at
    ]
    csvRows.push(row.join(','))
  })

  return csvRows.join('\n')
}

function isValidDate(dateString: string): boolean {
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(dateString)
}
