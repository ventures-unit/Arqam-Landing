'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function SelectUserTypePage() {
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleSelectUserType = (type: 'individual' | 'entity') => {
    // Store user type in sessionStorage
    sessionStorage.setItem('arqam_user_type', type)
    // Show loading state
    setIsRedirecting(true)
    // Redirect to dashboard
    setTimeout(() => {
      router.push('/intelligence/economy')
    }, 300)
  }

  // Loading overlay
  if (isRedirecting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading your workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Image
              src="/Branding/arqam-logo-white.svg"
              alt="Arqam Logo"
              width={48}
              height={48}
              priority
            />
            <h1 className="text-4xl font-bold text-white">
              Arqam
            </h1>
          </div>
          <p className="text-xl text-white/80">
            Choose your account type to get started
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Individual Card */}
          <Card
            className="relative overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 cursor-pointer group hover:shadow-2xl"
            onClick={() => handleSelectUserType('individual')}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

            <CardHeader className="space-y-4 pb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Individual</CardTitle>
                <CardDescription className="text-base">
                  Personal finance, investment insights, and career planning tools
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Personal Finance Dashboard</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Investment Advisor</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Cost of Living Calculator</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Career Market Insights</span>
                </p>
                <p className="flex items-start text-blue-600">
                  <span className="mr-2">+</span>
                  <span className="font-medium">4 more products</span>
                </p>
              </div>

              <Button
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectUserType('individual')
                }}
              >
                Continue as Individual
              </Button>
            </CardContent>
          </Card>

          {/* Entity Card */}
          <Card
            className="relative overflow-hidden border-2 hover:border-purple-500 transition-all duration-300 cursor-pointer group hover:shadow-2xl"
            onClick={() => handleSelectUserType('entity')}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500" />

            <CardHeader className="space-y-4 pb-4">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl mb-2">Entity / Business</CardTitle>
                <CardDescription className="text-base">
                  Comprehensive analytics, forecasting, and business intelligence tools
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm text-muted-foreground">
                <p className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Arqam Intelligence Hub</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Economic Forecaster</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Procurement Optimizer</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">✓</span>
                  <span>Business Builder Toolkit</span>
                </p>
                <p className="flex items-start text-purple-600">
                  <span className="mr-2">+</span>
                  <span className="font-medium">4 more products</span>
                </p>
              </div>

              <Button
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700"
                size="lg"
                onClick={(e) => {
                  e.stopPropagation()
                  handleSelectUserType('entity')
                }}
              >
                Continue as Entity
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-white/60 text-sm">
            You can change your account type anytime from settings
          </p>
        </div>
      </div>
    </div>
  )
}
