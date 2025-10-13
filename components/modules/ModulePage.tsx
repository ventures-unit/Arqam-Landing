'use client'

import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Save, 
  Download, 
  Share2, 
  Calendar,
  Filter,
  Settings,
  RefreshCw
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModulePageProps {
  title: string
  description: string
  icon: ReactNode
  children: ReactNode
  filters?: ReactNode
  metrics?: ReactNode
  chart?: ReactNode
  table?: ReactNode
  onSave?: () => void
  onExport?: () => void
  onShare?: () => void
  onSchedule?: () => void
  onRefresh?: () => void
  isLoading?: boolean
  lastUpdated?: Date
}

export function ModulePage({
  title,
  description,
  icon,
  children,
  filters,
  metrics,
  chart,
  table,
  onSave,
  onExport,
  onShare,
  onSchedule,
  onRefresh,
  isLoading = false,
  lastUpdated
}: ModulePageProps) {
  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {lastUpdated && (
            <div className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleString()}
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Filters */}
      {filters && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filters}
          </CardContent>
        </Card>
      )}

      {/* Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics}
        </div>
      )}

      {/* Chart */}
      {chart && (
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            {chart}
          </CardContent>
        </Card>
      )}

      {/* Table */}
      {table && (
        <Card>
          <CardHeader>
            <CardTitle>Data Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {table}
          </CardContent>
        </Card>
      )}

      {/* Actions Bar */}
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSave}
            disabled={isLoading}
          >
            <Save className="h-4 w-4 mr-2" />
            Save View
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
            disabled={isLoading}
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onShare}
            disabled={isLoading}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onSchedule}
            disabled={isLoading}
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Badge variant="outline">
            <Settings className="h-3 w-3 mr-1" />
            Auto-refresh: 5m
          </Badge>
        </div>
      </div>

      {/* Additional Content */}
      {children}
    </div>
  )
}
