import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Basic validation
    if (!body.name || !body.timestamp) {
      return NextResponse.json(
        { error: 'Invalid analytics data' },
        { status: 400 }
      )
    }

    // Rate limiting (simple implementation)
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitKey = `analytics_${ip}`
    
    // In production, you'd use Redis or similar for rate limiting
    // For now, we'll just log the data
    
    // Log analytics data
    console.log('Analytics Event:', {
      ...body,
      ip,
      userAgent: request.headers.get('user-agent'),
      timestamp: new Date().toISOString()
    })

    // In production, you would:
    // 1. Store in your analytics database
    // 2. Send to external analytics service
    // 3. Process for insights and reporting

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Analytics API Error:', error)
    return NextResponse.json(
      { error: 'Failed to process analytics data' },
      { status: 500 }
    )
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
