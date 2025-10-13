'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { 
  TrendingUp, 
  Globe, 
  Target, 
  DollarSign, 
  Banknote, 
  Shield, 
  BarChart3, 
  Bot,
  Bookmark,
  Layout,
  Database,
  Bell,
  HelpCircle,
  LucideIcon
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  TrendingUp,
  Globe,
  Target,
  DollarSign,
  Banknote,
  Shield,
  BarChart3,
  Bot,
  Bookmark,
  Layout,
  Database,
  Bell,
  HelpCircle,
}

interface NavItemProps {
  item: {
    id: string
    label: string
    href: string
    icon: string
    description?: string
    badge?: string
  }
  isCollapsed: boolean
  isActive: boolean
}

export function NavItem({ item, isCollapsed, isActive }: NavItemProps) {
  const Icon = iconMap[item.icon] || HelpCircle

  if (isCollapsed) {
    return (
      <Link
        href={item.href}
        className={cn(
          "flex items-center justify-center h-10 w-10 rounded-md transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive && "bg-accent text-accent-foreground"
        )}
        title={item.label}
      >
        <Icon className="h-4 w-4" />
      </Link>
    )
  }

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        isActive && "bg-accent text-accent-foreground"
      )}
    >
      <div className="flex items-center space-x-3">
        <Icon className="h-4 w-4 flex-shrink-0" />
        <span className="truncate">{item.label}</span>
      </div>
      {item.badge && (
        <Badge variant="secondary" className="text-xs">
          {item.badge}
        </Badge>
      )}
    </Link>
  )
}
