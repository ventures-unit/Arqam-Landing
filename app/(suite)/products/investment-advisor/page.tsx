'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  PieChart,
  Target,
  TrendingUp,
  Shield,
  Sparkles,
  AlertCircle
} from 'lucide-react'

export default function InvestmentAdvisorPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
            <PieChart className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Investment Advisor</h1>
            <p className="text-sm text-gray-600">
              AI-powered portfolio recommendations based on real-time market data and personalized risk profiling.
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio Overview */}
      <section className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Your Portfolio Insights</h2>
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-gray-200">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Portfolio Health</span>
                <Shield className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl font-bold text-gray-900">Excellent</div>
              <div className="text-xs text-gray-500 mt-1">Risk Score: 7.2/10</div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Projected Returns</span>
                <TrendingUp className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-gray-900">8.4%</div>
              <div className="text-xs text-gray-500 mt-1">Annual Return (est.)</div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Goals Progress</span>
                <Target className="w-4 h-4 text-amber-600" />
              </div>
              <div className="text-xl font-bold text-gray-900">62%</div>
              <div className="text-xs text-gray-500 mt-1">On Track</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Recommendations</h2>
        </div>

        <Card className="border-blue-200 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Rebalance Tech Allocation</h3>
                  <p className="text-xs text-gray-700 mb-2">
                    Tech allocation at 32% is above optimal. Consider reducing by 5-7% to healthcare and emerging markets.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-700 text-xs border-blue-200">
                      Impact: Medium
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="h-px bg-blue-200" />

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Increase Bond Allocation</h3>
                  <p className="text-xs text-gray-700 mb-2">
                    Increase bonds from 15% to 20% to improve stability while maintaining growth potential.
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs border-emerald-200">
                      Impact: High
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Investment Tools */}
      <section className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Investment Tools</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-gray-200 hover:border-gray-300 transition-all">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
                  <Target className="w-4 h-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Goal Tracker</h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Set and monitor investment goals with timeline projections and progress tracking.
                  </p>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Manage Goals
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:border-gray-300 transition-all">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Risk Analysis</h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Comprehensive risk assessment with stress testing under different market conditions.
                  </p>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Analyze Risk
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">What You Get</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-xs">
              <div className="font-semibold text-gray-900 mb-0.5">Real-time Market Data</div>
              <div className="text-gray-600">Live updates on all assets</div>
            </div>
            <div className="text-xs">
              <div className="font-semibold text-gray-900 mb-0.5">Personalized Alerts</div>
              <div className="text-gray-600">Opportunities and risks</div>
            </div>
            <div className="text-xs">
              <div className="font-semibold text-gray-900 mb-0.5">Tax Optimization</div>
              <div className="text-gray-600">Minimize tax burden</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
