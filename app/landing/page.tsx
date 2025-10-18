'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, Globe, Shield, BarChart3 } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()

  const handleGetStarted = () => {
    sessionStorage.setItem('user_logged_in', 'true')
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center space-y-8">
            <div className="mx-auto w-20 h-20 flex items-center justify-center">
              <img
                src="/Branding/Arqam - logo-neon blue.svg"
                alt="Arqam"
                className="w-full h-full"
              />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              Arqam
            </h1>

            <p className="text-xl md:text-2xl text-blue-200 max-w-3xl mx-auto">
              Data Products Suite
            </p>

            <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
              Transform raw data into actionable intelligence with our comprehensive suite of analytical tools
            </p>

            <div className="pt-8">
              <Button
                onClick={handleGetStarted}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="bg-white/10 backdrop-blur-sm border-blue-400/20">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-blue-400 mb-4" />
              <CardTitle className="text-white">Economic Intelligence</CardTitle>
              <CardDescription className="text-blue-200">
                Real-time economic data and forecasting
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-400/20">
            <CardHeader>
              <Globe className="w-12 h-12 text-blue-400 mb-4" />
              <CardTitle className="text-white">Trade Analytics</CardTitle>
              <CardDescription className="text-blue-200">
                Global trade flows and market insights
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-400/20">
            <CardHeader>
              <Shield className="w-12 h-12 text-blue-400 mb-4" />
              <CardTitle className="text-white">Regulatory Intelligence</CardTitle>
              <CardDescription className="text-blue-200">
                Stay compliant with regulatory changes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-blue-400/20">
            <CardHeader>
              <BarChart3 className="w-12 h-12 text-blue-400 mb-4" />
              <CardTitle className="text-white">Sector Analysis</CardTitle>
              <CardDescription className="text-blue-200">
                Deep industry and sector intelligence
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to dive in?
          </h2>
          <p className="text-lg text-blue-100/80 max-w-2xl mx-auto">
            Access powerful data analytics and intelligence tools
          </p>
          <Button
            onClick={handleGetStarted}
            size="lg"
            className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-6 text-lg"
          >
            Access Platform
          </Button>
        </div>
      </div>
    </div>
  )
}
