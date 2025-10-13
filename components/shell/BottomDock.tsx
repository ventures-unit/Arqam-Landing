'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { bottomDock, getNavItemsForRole } from '@/lib/nav/navigation'
import { useAuth } from '@/lib/auth/useAuth'
import { 
  Layers, 
  Settings, 
  Shield,
  LucideIcon
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Settings,
  Shield,
}

export function BottomDock() {
  const pathname = usePathname()
  const { user } = useAuth()

  if (!user) return null

  const userRole = user.profile?.role as any
  const dockItems = getNavItemsForRole(userRole).bottomDock

  return (
    <div className="hidden lg:flex fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex items-center space-x-1 bg-card border border-border rounded-lg p-1 shadow-lg">
        {dockItems.map((item) => {
          const Icon = iconMap[item.icon] || Settings
          const isActive = pathname.startsWith(item.href)
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center space-x-2 px-3 py-2 rounded-md text-sm transition-colors",
                "hover:bg-accent hover:text-accent-foreground",
                isActive && "bg-accent text-accent-foreground"
              )}
              title={item.description}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden xl:inline">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
