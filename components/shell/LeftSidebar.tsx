'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { navigation, getNavItemsForRole } from '@/lib/nav/navigation'
import { useAuth } from '@/lib/auth/useAuth'
import { NavSection } from './NavSection'
import { NavItem } from './NavItem'
import { Button } from '@/components/ui/button'
import { 
  ChevronLeft, 
  ChevronRight, 
  Menu,
  X
} from 'lucide-react'

export function LeftSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()

  // For development: show sidebar always with mock role
  const userRole = user?.profile?.role || 'end_user'
  const navItems = getNavItemsForRole(userRole as any)

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          "lg:relative lg:translate-x-0 lg:z-auto",
          isCollapsed ? "lg:w-16" : "lg:w-64",
          isMobileOpen
            ? "fixed inset-y-0 left-0 z-40 w-64 translate-x-0"
            : "fixed inset-y-0 left-0 z-40 w-64 -translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            {!isCollapsed && (
              <div className="flex items-center space-x-2.5">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-semibold text-lg text-gray-900">Arqam</span>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex text-gray-500 hover:text-gray-700"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
            {/* Modules Section */}
            <NavSection
              section={navigation[0]}
              isCollapsed={isCollapsed}
              pathname={pathname}
            />

            {/* Utilities Section */}
            <NavSection
              section={navigation[1]}
              isCollapsed={isCollapsed}
              pathname={pathname}
            />
          </nav>

          {/* User Info */}
          {!isCollapsed && (
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-blue-700">
                    {user?.profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'D'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-gray-900">
                    {user?.profile?.full_name || 'Demo User'}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.profile?.orgs?.name || 'Demo Org'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}
