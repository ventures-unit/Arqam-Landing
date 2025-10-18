'use client'

import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: string
  change?: number
  trend?: 'up' | 'down' | 'neutral'
  icon?: React.ReactNode
  subtitle?: string
}

export function MetricCard({ title, value, change, trend, icon, subtitle }: MetricCardProps) {
  const getTrendIcon = () => {
    if (!trend) return null

    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3" />
      case 'down':
        return <TrendingDown className="w-3 h-3" />
      case 'neutral':
        return <Minus className="w-3 h-3" />
    }
  }

  const getTrendColor = () => {
    if (!trend) return 'text-slate-600'

    switch (trend) {
      case 'up':
        return 'text-emerald-600'
      case 'down':
        return 'text-rose-600'
      case 'neutral':
        return 'text-slate-600'
    }
  }

  return (
    <Card className="hover:shadow-md transition-all border-slate-200 bg-white">
      <CardContent className="p-3.5">
        <div className="flex items-start justify-between mb-2">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{title}</p>
          {icon && <div className="text-slate-400">{icon}</div>}
        </div>

        <div className="space-y-1">
          <p className="text-2xl font-bold tracking-tight text-slate-900">{value}</p>

          {(change !== undefined || subtitle) && (
            <div className="flex items-center gap-2 text-xs">
              {change !== undefined && (
                <div className={`flex items-center gap-0.5 ${getTrendColor()} font-semibold`}>
                  {getTrendIcon()}
                  <span>
                    {change > 0 ? '+' : ''}{change}%
                  </span>
                </div>
              )}
              {subtitle && (
                <span className="text-slate-500">{subtitle}</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
