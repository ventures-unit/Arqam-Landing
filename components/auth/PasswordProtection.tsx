'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

const PROTOTYPE_PASSWORD = "We-Said-Data-Driven-Not-Data-Drowning-But-Here-We-Are-Prototype-Rabena-yostor"

export function PasswordProtection() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user has logged in from landing page
    const userLoggedIn = sessionStorage.getItem('user_logged_in') === 'true'
    if (!userLoggedIn) {
      // No login, redirect to landing
      router.push('/landing')
      return
    }

    // Check if user is already authenticated with password
    const authenticated = sessionStorage.getItem('prototype_authenticated') === 'true'
    if (authenticated) {
      setIsAuthenticated(true)
      router.push('/select-user-type')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    if (password === PROTOTYPE_PASSWORD) {
      // Store authentication in sessionStorage
      sessionStorage.setItem('prototype_authenticated', 'true')
      setIsAuthenticated(true)
      router.push('/select-user-type')
    } else {
      setError('Incorrect password. Please try again.')
    }
    
    setIsLoading(false)
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-lg">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 flex items-center justify-center">
              <Image
                src="/Branding/Arqam - logo-neon blue.svg"
                alt="Arqam Logo"
                width={64}
                height={64}
                priority
              />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Arqam Prototype
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Enter the prototype password to access the Data Products Suite
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter prototype password"
                    className="pr-10"
                    disabled={isLoading}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading || !password.trim()}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  'Access Prototype'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                This is a prototype version of Arqam - Data Products Suite
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
