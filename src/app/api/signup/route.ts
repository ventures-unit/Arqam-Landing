import { NextRequest, NextResponse } from 'next/server'
import { submitSignup, checkRateLimit } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown'
    
    // Check rate limit (5 requests per minute per IP)
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    
    // Validate required fields
    if (!body.email || !body.name) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      )
    }

    // Submit to Supabase
    const result = await submitSignup({
      name: body.name,
      email: body.email,
      role: body.role || 'Founder',
      notes: body.notes || null
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully joined the waitlist!',
      data: result.data 
    })

    } catch (error: unknown) {
    console.error('API Error:', error)
    
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Something went wrong. Please try again.' },
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
