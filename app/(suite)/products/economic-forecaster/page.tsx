'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  TrendingUp,
  TrendingDown,
  Activity,
  BarChart3,
  LineChart,
  Zap
} from 'lucide-react'

export default function EconomicForecasterPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Economic Forecaster</h1>
            <p className="text-sm text-gray-600">
              Advanced predictive analytics for GDP, inflation, and key economic indicators with scenario modeling.
            </p>
          </div>
        </div>
      </div>

      {/* Live Forecasts Grid */}
      <section className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Live Economic Forecasts</h2>
        <div className="grid grid-cols-3 gap-3">
          <Card className="border-gray-200">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">GDP Growth</span>
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="text-xl font-bold text-gray-900">+3.8%</div>
              <div className="text-xs text-gray-500 mt-1">Q2 2026</div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Inflation</span>
                <TrendingDown className="w-4 h-4 text-rose-600" />
              </div>
              <div className="text-xl font-bold text-gray-900">2.1%</div>
              <div className="text-xs text-gray-500 mt-1">12-Month</div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardContent className="p-3">
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Unemployment</span>
                <Activity className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-xl font-bold text-gray-900">4.2%</div>
              <div className="text-xs text-gray-500 mt-1">Next Quarter</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Forecasting Tools */}
      <section className="mb-6">
        <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Forecasting Tools</h2>
        <div className="grid grid-cols-2 gap-3">
          <Card className="border-gray-200 hover:border-gray-300 transition-all">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Scenario Modeling</h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Create custom scenarios with adjustable parameters and model different outcomes.
                  </p>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Launch Tool
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 hover:border-gray-300 transition-all">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <LineChart className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 mb-1">Trend Analysis</h3>
                  <p className="text-xs text-gray-600 mb-2">
                    Historical data visualization with predictive overlays and pattern identification.
                  </p>
                  <Button size="sm" variant="outline" className="h-7 text-xs">
                    Launch Tool
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Overview */}
      <section>
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
          <div className="flex items-start gap-3 mb-3">
            <Zap className="w-4 h-4 text-gray-600" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">Advanced Capabilities</h3>
              <p className="text-xs text-gray-600">
                Powered by machine learning algorithms trained on decades of economic data
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-xs">
              <div className="font-semibold text-gray-900 mb-0.5">Multi-variable Analysis</div>
              <div className="text-gray-600">50+ indicators</div>
            </div>
            <div className="text-xs">
              <div className="font-semibold text-gray-900 mb-0.5">Custom Time Periods</div>
              <div className="text-gray-600">1 month to 10 years</div>
            </div>
            <div className="text-xs">
              <div className="font-semibold text-gray-900 mb-0.5">Export & Integration</div>
              <div className="text-gray-600">API access & reports</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
