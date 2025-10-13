'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { User } from '@supabase/supabase-js'
import { createClientSupabase } from './supabase'

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  role: string
  org_id: string
  orgs?: {
    id: string
    name: string
    slug: string
    plan: string
  }
}

interface AuthContextType {
  user: (User & { profile: UserProfile }) | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string, orgName: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<(User & { profile: UserProfile }) | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientSupabase()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (session?.user) {
        await fetchUserProfile(session.user)
      } else {
        setUser(null)
      }
      
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          await fetchUserProfile(session.user)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [fetchUserProfile, supabase.auth])

  const fetchUserProfile = useCallback(async (user: User) => {
    try {
      // Check if we have valid Supabase config
      const hasValidConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      
      if (!hasValidConfig) {
        // Mock user profile for development
        const mockProfile = {
          id: user.id,
          email: user.email || 'demo@arqam.com',
          full_name: 'Demo User',
          avatar_url: null,
          role: 'org_admin',
          org_id: 'dev-org-1',
          orgs: {
            id: 'dev-org-1',
            name: 'Demo Organization',
            slug: 'demo-org',
            plan: 'pro'
          }
        }
        
        setUser({
          ...user,
          profile: mockProfile
        })
        return
      }

      const { data: profile, error } = await supabase
        .from('users')
        .select(`
          *,
          orgs (
            id,
            name,
            slug,
            plan
          )
        `)
        .eq('id', user.id)
        .single()

      if (error) {
        console.error('Error fetching user profile:', error)
        setUser(null)
        return
      }

      setUser({
        ...user,
        profile
      })
    } catch (error) {
      console.error('Error fetching user profile:', error)
      setUser(null)
    }
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    const hasValidConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!hasValidConfig) {
      // Mock sign in for development - simulate successful login
      const mockUser = {
        id: 'dev-user-1',
        email,
        created_at: new Date().toISOString()
      }
      
      await fetchUserProfile(mockUser as User)
      return { error: null }
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { error }
  }

  const signUp = async (email: string, password: string, fullName: string, orgName: string) => {
    const hasValidConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!hasValidConfig) {
      // Mock sign up for development - simulate successful registration
      const mockUser = {
        id: 'dev-user-1',
        email,
        created_at: new Date().toISOString()
      }
      
      await fetchUserProfile(mockUser as User)
      return { error: null }
    }
    
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
      return { error: orgError }
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
      return { error: authError }
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
      return { error: profileError }
    }

    // Create default workspace
    const { error: workspaceError } = await supabase
      .from('workspaces')
      .insert({
        name: 'Main Workspace',
        org_id: org.id
      })

    if (workspaceError) {
      return { error: workspaceError }
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
      return { error: subscriptionError }
    }

    return { error: null }
  }

  const signOut = async () => {
    const hasValidConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!hasValidConfig) {
      // Mock sign out for development
      setUser(null)
      return
    }
    
    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    const hasValidConfig = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!hasValidConfig) {
      // Mock reset password for development
      return { error: null }
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`
    })
    return { error }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
