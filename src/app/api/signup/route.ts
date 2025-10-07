import { NextRequest, NextResponse } from 'next/server'
import { submitSignup, checkRateLimit } from '@/lib/supabase'
import { validateInput, isDisposableEmail, detectSuspiciousActivity } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown'
    
    // Check rate limit (3 requests per minute per IP for signup)
    if (!checkRateLimit(ip, 3, 60000)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    
    // Detect suspicious activity
    if (detectSuspiciousActivity(body)) {
      return NextResponse.json(
        { error: 'Invalid request detected.' },
        { status: 400 }
      )
    }
    
    // Enhanced validation
    const validation = validateInput({
      email: body.email,
      name: body.fullName,
      role: body.organizationType || 'Other'
    })
    
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errors.join(', ') },
        { status: 400 }
      )
    }
    
    // Check for disposable email
    if (isDisposableEmail(body.email)) {
      return NextResponse.json(
        { error: 'Please use a valid business email address.' },
        { status: 400 }
      )
    }
    
    // Validate required fields for new multi-step form
    if (!body.email || !body.fullName || !body.mobileNumber || !body.nationality) {
      return NextResponse.json(
        { error: 'All required fields must be filled.' },
        { status: 400 }
      )
    }

    // Submit to Supabase with new data structure
    const result = await submitSignup(body)

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
