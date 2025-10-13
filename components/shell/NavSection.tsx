'use client'

import { useState } from 'react'
import { NavItem } from './NavItem'
import { cn } from '@/lib/utils'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface NavSectionProps {
  section: {
    id: string
    label: string
    items: Array<{
      id: string
      label: string
      href: string
      icon: string
      description?: string
      badge?: string
    }>
  }
  isCollapsed: boolean
  pathname: string
}

export function NavSection({ section, isCollapsed, pathname }: NavSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  if (isCollapsed) {
    return (
      <div className="space-y-1">
        {section.items.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isCollapsed={true}
            isActive={pathname === item.href}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-1">
      <Button
        variant="ghost"
        className="w-full justify-between px-2 h-8 text-sm font-medium text-muted-foreground hover:text-foreground"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>{section.label}</span>
        {isExpanded ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
      
      {isExpanded && (
        <div className="space-y-1 ml-2">
          {section.items.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              isCollapsed={false}
              isActive={pathname === item.href}
            />
          ))}
        </div>
      )}
    </div>
  )
}
