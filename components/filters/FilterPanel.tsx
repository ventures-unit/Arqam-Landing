'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DatePicker } from '@/components/ui/date-picker'
import { Filter, X, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FilterOption {
  value: string
  label: string
}

interface FilterConfig {
  [key: string]: FilterOption[]
}

interface FilterPanelProps {
  filters: Record<string, any>
  onFiltersChange: (filters: Record<string, any>) => void
  options: FilterConfig
  className?: string
}

export function FilterPanel({
  filters,
  onFiltersChange,
  options,
  className
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleFilterChange = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const clearFilters = () => {
    const clearedFilters: Record<string, any> = {}
    Object.keys(filters).forEach(key => {
      clearedFilters[key] = options[key]?.[0]?.value || ''
    })
    onFiltersChange(clearedFilters)
  }

  const hasActiveFilters = Object.values(filters).some(value => 
    value && value !== '' && value !== 'All'
  )

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </CardTitle>
          <div className="flex items-center space-x-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Collapse' : 'Expand'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className={cn(
          "grid gap-4",
          isExpanded ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-2 md:grid-cols-4"
        )}>
          {Object.entries(options).map(([key, optionList]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="text-sm font-medium">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Label>
              <Select
                value={filters[key] || ''}
                onValueChange={(value) => handleFilterChange(key, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${key}`} />
                </SelectTrigger>
                <SelectContent>
                  {optionList.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateFrom" className="text-sm font-medium">
                  From Date
                </Label>
                <DatePicker
                  value={filters.dateFrom}
                  onChange={(date) => handleFilterChange('dateFrom', date)}
                  placeholder="Select start date"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateTo" className="text-sm font-medium">
                  To Date
                </Label>
                <DatePicker
                  value={filters.dateTo}
                  onChange={(date) => handleFilterChange('dateTo', date)}
                  placeholder="Select end date"
                />
              </div>
            </div>
          </div>
        )}

        {hasActiveFilters && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([key, value]) => {
                if (!value || value === '' || value === 'All') return null
                
                const option = options[key]?.find(opt => opt.value === value)
                const label = option?.label || value
                
                return (
                  <div
                    key={key}
                    className="flex items-center space-x-1 bg-muted px-2 py-1 rounded-md text-sm"
                  >
                    <span className="font-medium">{key}:</span>
                    <span>{label}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-muted-foreground/20"
                      onClick={() => handleFilterChange(key, '')}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
