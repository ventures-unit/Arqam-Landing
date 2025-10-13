'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { cn, formatCurrency, formatPercentage, formatNumber } from '@/lib/utils'

interface MetricCardProps {
  title: string
  value: number
  change: number
  changeType: 'increase' | 'decrease' | 'neutral'
  format: 'number' | 'currency' | 'percentage'
  description?: string
  icon?: ReactNode
}

export function MetricCard({
  title,
  value,
  change,
  changeType,
  format,
  description,
  icon
}: MetricCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val)
      case 'percentage':
        return formatPercentage(val)
      default:
        return formatNumber(val)
    }
  }

  const formatChange = (val: number) => {
    switch (format) {
      case 'currency':
        return formatCurrency(val)
      case 'percentage':
        return formatPercentage(val)
      default:
        return formatNumber(val)
    }
  }

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase':
        return <TrendingUp className="h-3 w-3" />
      case 'decrease':
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase':
        return 'text-success-600'
      case 'decrease':
        return 'text-error-600'
      default:
        return 'text-muted-foreground'
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{formatValue(value)}</div>
        <div className="flex items-center space-x-1 text-xs">
          <div className={cn("flex items-center space-x-1", getChangeColor())}>
            {getChangeIcon()}
            <span>{formatChange(Math.abs(change))}</span>
          </div>
          <span className="text-muted-foreground">from last period</span>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  )
}
