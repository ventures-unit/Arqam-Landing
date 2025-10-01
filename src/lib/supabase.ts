import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-id.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here'

// Debug logging
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key exists:', !!supabaseAnonKey)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false
  }
})

// Database schema for arqam_signups table
export interface SignupData {
  id?: string
  name: string
  email: string
  role: 'Founder' | 'Government' | 'Researcher' | 'Investor' | 'Other'
  notes?: string
  created_at?: string
}

// Function to submit signup data
export async function submitSignup(data: Omit<SignupData, 'id' | 'created_at'>) {
  try {
    // Basic input validation
    if (!data.email || !data.email.includes('@')) {
      throw new Error('Please enter a valid email address.')
    }

    if (!data.name || data.name.trim().length < 2) {
      throw new Error('Please enter your full name.')
    }

    // Sanitize inputs
    const sanitizedData = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      role: data.role,
      notes: data.notes?.trim() || null
    }

    console.log('Attempting to insert:', sanitizedData)

    const { data: result, error } = await supabase
      .from('arqam_signups')
      .insert([sanitizedData])
      .select()

    if (error) {
      console.error('Supabase error details:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      
      // More specific error messages
      if (error.code === '23505') {
        throw new Error('This email is already registered.')
      } else if (error.message.includes('fetch failed')) {
        throw new Error('Unable to connect to database. Please check your internet connection.')
      } else {
        throw new Error(`Database error: ${error.message}`)
      }
    }

    console.log('Successfully inserted:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('Signup error:', error)
    throw error
  }
}

// Rate limiting helper (basic implementation)
const rateLimitMap = new Map<string, number>()

export function checkRateLimit(ip: string, maxRequests: number = 5, windowMs: number = 60000): boolean {
  const now = Date.now()
  const windowStart = now - windowMs
  
  // Clean old entries
  for (const [key, timestamp] of rateLimitMap.entries()) {
    if (timestamp < windowStart) {
      rateLimitMap.delete(key)
    }
  }
  
  // Check current IP
  const requests = Array.from(rateLimitMap.entries())
    .filter(([key, timestamp]) => key.startsWith(ip) && timestamp > windowStart)
    .length
  
  if (requests >= maxRequests) {
    return false
  }
  
  // Add current request
  rateLimitMap.set(`${ip}-${now}`, now)
  return true
}
