'use client'

import { useState, useEffect } from 'react'
import { PasswordProtection } from './PasswordProtection'

interface PrototypeGuardProps {
  children: React.ReactNode
}

export function PrototypeGuard({ children }: PrototypeGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const authenticated = sessionStorage.getItem('prototype_authenticated') === 'true'
    setIsAuthenticated(authenticated)
    setIsLoading(false)
  }, [])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <PasswordProtection onSuccess={handleAuthSuccess} />
  }

  return <>{children}</>
}
