'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

const PROTOTYPE_PASSWORD = "We-Said-Data-Driven-Not-Data-Drowning-But-Here-We-Are-Prototype-Rabena-yostor"

export function PrototypeGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Don't protect landing and password pages
    if (pathname === '/landing' || pathname === '/') {
      setIsChecking(false)
      setIsAuthenticated(true)
      return
    }

    // Check if user has logged in from landing page
    const userLoggedIn = sessionStorage.getItem('user_logged_in') === 'true'

    if (!userLoggedIn) {
      // Not logged in, redirect to landing
      router.push('/landing')
      setIsChecking(false)
      return
    }

    // Check prototype password authentication
    const authenticated = sessionStorage.getItem('prototype_authenticated') === 'true'

    if (!authenticated) {
      // Logged in but no password, redirect to password page
      router.push('/')
    } else {
      setIsAuthenticated(true)
    }

    setIsChecking(false)
  }, [pathname, router])

  // Show loading while checking auth
  if (isChecking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  // If not on root and not authenticated, show nothing (will redirect)
  if (pathname !== '/' && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Redirecting...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

