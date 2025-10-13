'use client'

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/utils'

interface BarChartProps {
  data: any[]
  xKey: string
  yKeys: string[]
  height?: number
  title?: string
  colors?: string[]
}

const defaultColors = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#06b6d4', // cyan
  '#84cc16', // lime
  '#f97316'  // orange
]

export function BarChart({
  data,
  xKey,
  yKeys,
  height = 300,
  title,
  colors = defaultColors
}: BarChartProps) {
  const formatValue = (value: number, key: string) => {
    if (key.includes('rate') || key.includes('percent') || key.includes('growth')) {
      return formatPercentage(value)
    }
    if (key.includes('price') || key.includes('value') || key.includes('revenue') || key.includes('size')) {
      return formatCurrency(value)
    }
    return formatNumber(value)
  }

  return (
    <div className="w-full">
      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent>
        <ResponsiveContainer width="100%" height={height}>
          <RechartsBarChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey={xKey}
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={{ stroke: '#e2e8f0' }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-medium mb-2">{label}</p>
                      {payload.map((entry, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: entry.color }}
                          />
                          <span className="text-sm">
                            {entry.name}: {formatValue(entry.value as number, entry.dataKey as string)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )
                }
                return null
              }}
            />
            <Legend />
            {yKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                radius={[2, 2, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </div>
  )
}
