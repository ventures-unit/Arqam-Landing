import { createClient } from '@supabase/supabase-js'

// Development mode - use mock Supabase client
const isDevelopment = process.env.NODE_ENV === 'development'
const hasValidConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabaseUrl = 'https://placeholder.supabase.co'
let supabaseAnonKey = 'placeholder-anon-key'
let supabaseServiceKey = 'placeholder-service-key'

if (hasValidConfig) {
  supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'
}

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  }
})

// Server-side Supabase client with service role
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Client component client
export const createClientSupabase = () => supabase

// Client-side auth helpers
export async function signOut() {
  if (!hasValidConfig) {
    // Mock sign out for development
    return { error: null }
  }
  const supabase = createClientSupabase()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function signInWithEmail(email: string, password: string) {
  if (!hasValidConfig) {
    // Mock sign in for development
    return { 
      data: { 
        user: { 
          id: 'dev-user-1', 
          email, 
          created_at: new Date().toISOString() 
        }, 
        session: null 
      }, 
      error: null 
    }
  }
  const supabase = createClientSupabase()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  return { data, error }
}

export async function signUpWithEmail(email: string, password: string, fullName: string, orgName: string) {
  if (!hasValidConfig) {
    // Mock sign up for development
    return { 
      data: { 
        user: { 
          id: 'dev-user-1', 
          email, 
          created_at: new Date().toISOString() 
        }, 
        session: null 
      }, 
      error: null 
    }
  }
  
  const supabase = createClientSupabase()
  
  // First create the organization
  const { data: org, error: orgError } = await supabase
    .from('orgs')
    .insert({
      name: orgName,
      slug: orgName.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      plan: 'free'
    })
    .select()
    .single()

  if (orgError) {
    return { data: null, error: orgError }
  }

  // Create the user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        org_id: org.id
      }
    }
  })

  if (authError) {
    return { data: null, error: authError }
  }

  // Create user profile
  const { error: profileError } = await supabase
    .from('users')
    .insert({
      id: authData.user?.id,
      email,
      full_name: fullName,
      role: 'org_admin',
      org_id: org.id
    })

  if (profileError) {
    return { data: null, error: profileError }
  }

  // Create default workspace
  const { error: workspaceError } = await supabase
    .from('workspaces')
    .insert({
      name: 'Main Workspace',
      org_id: org.id
    })

  if (workspaceError) {
    return { data: null, error: workspaceError }
  }

  // Create subscription
  const { error: subscriptionError } = await supabase
    .from('subscriptions')
    .insert({
      org_id: org.id,
      plan: 'free',
      status: 'active',
      current_period_start: new Date().toISOString(),
      current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
    })

  if (subscriptionError) {
    return { data: null, error: subscriptionError }
  }

  return { data: authData, error: null }
}

export async function resetPassword(email: string) {
  if (!hasValidConfig) {
    // Mock reset password for development
    return { data: null, error: null }
  }
  const supabase = createClientSupabase()
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`
  })
  return { data, error }
}

export async function updatePassword(password: string) {
  if (!hasValidConfig) {
    // Mock update password for development
    return { data: null, error: null }
  }
  const supabase = createClientSupabase()
  const { data, error } = await supabase.auth.updateUser({
    password
  })
  return { data, error }
}