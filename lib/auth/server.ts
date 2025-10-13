import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Server-side Supabase client
export const createServerSupabase = () => {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Server-side Supabase client with service role
export const createServerSupabaseAdmin = () => {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}

// Auth helpers for server components
export async function getCurrentUser() {
  const supabase = createServerSupabase()
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    return null
  }

  // Get user profile with org and role info
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*, orgs(*)')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    return null
  }

  return {
    ...user,
    profile
  }
}

export async function getCurrentOrg() {
  const user = await getCurrentUser()
  return user?.profile?.orgs || null
}

export async function getCurrentWorkspace() {
  const user = await getCurrentUser()
  if (!user?.profile) return null

  // For now, return the first workspace of the org
  // In a real app, you'd track the current workspace in session/localStorage
  const supabase = createServerSupabase()
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('*')
    .eq('org_id', user.profile.org_id)
    .limit(1)
    .single()

  return workspace
}
