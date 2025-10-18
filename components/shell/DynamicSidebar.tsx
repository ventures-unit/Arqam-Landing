'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { UserType, getProductsByUserTypeAndIntent } from '@/lib/products/products'
import { Workspace } from './AppShell'
import { useAuth } from '@/lib/auth/useAuth'
import {
  TrendingUp,
  Building2,
  LayoutGrid,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Database,
  Bell,
  HelpCircle,
  Settings,
  DollarSign,
  Lightbulb,
  Globe,
  Target,
  Wallet,
  Shield,
  BarChart3,
  Briefcase
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface DynamicSidebarProps {
  activeWorkspace: Workspace
  activeModule: string
}

export function DynamicSidebar({ activeWorkspace, activeModule }: DynamicSidebarProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [userType, setUserType] = useState<UserType | null>(null)
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    const storedUserType = sessionStorage.getItem('arqam_user_type') as UserType
    setUserType(storedUserType)
  }, [])

  if (!userType) return null

  const buildProducts = getProductsByUserTypeAndIntent(userType, 'build')
  const analyzeProducts = getProductsByUserTypeAndIntent(userType, 'analyze')
  const exploreProducts = getProductsByUserTypeAndIntent(userType, 'explore')

  // Intelligence workspace modules
  const intelligenceModules = [
    { id: 'economy', name: 'Economy', icon: TrendingUp },
    { id: 'trade', name: 'Trade', icon: Globe },
    { id: 'market-entry', name: 'Market Entry', icon: Target },
    { id: 'business-builder', name: 'Business Builder', icon: HelpCircle },
    { id: 'prices', name: 'Price Monitor', icon: DollarSign },
    { id: 'capital', name: 'Capital Access', icon: Wallet },
    { id: 'regulatory', name: 'Regulatory Access', icon: Shield },
    { id: 'sectors', name: 'Sector Intelligence', icon: BarChart3 }
  ]

  // Navigate using Next.js router
  const handleNavigation = (workspace: Workspace, moduleId: string) => {
    // Intelligence workspace modules are direct routes
    if (workspace === 'intelligence') {
      router.push(`/${workspace}/${moduleId}`)
    } else {
      // Other workspaces use products/ prefix
      router.push(`/${workspace}/products/${moduleId}`)
    }
  }

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex-shrink-0",
        isCollapsed ? "w-16" : "w-56"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className={cn(
          "flex h-14 items-center border-b border-gray-200",
          isCollapsed ? "justify-center px-2" : "justify-between px-3"
        )}>
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <img
                src="/Branding/Arqam - logo-neon blue.svg"
                alt="Arqam"
                width={28}
                height={28}
              />
              <span className="font-semibold text-sm text-gray-900">Arqam</span>
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
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
        <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-4">
          {activeWorkspace === 'intelligence' && (
            <>
              {!isCollapsed && (
                <div className="px-2 mb-2">
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Intelligence · {intelligenceModules.length}
                  </p>
                </div>
              )}
              {intelligenceModules.map((module) => {
                const isActive = activeModule === module.id
                const Icon = module.icon
                return (
                  <button
                    key={module.id}
                    onClick={() => handleNavigation('intelligence', module.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    title={isCollapsed ? module.name : ''}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="text-[13px] font-medium">{module.name}</span>
                    )}
                  </button>
                )
              })}
            </>
          )}

          {activeWorkspace === 'build' && (
            <>
              {!isCollapsed && (
                <div className="px-2 mb-2">
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Build · {buildProducts.length}
                  </p>
                </div>
              )}
              {buildProducts.map((product) => {
                const isActive = activeModule === product.slug
                return (
                  <button
                    key={product.id}
                    onClick={() => handleNavigation('build', product.slug)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    title={isCollapsed ? product.name : ''}
                  >
                    <product.icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="text-[13px] font-medium truncate">{product.name}</span>
                    )}
                  </button>
                )
              })}
            </>
          )}

          {activeWorkspace === 'analyze' && (
            <>
              {!isCollapsed && (
                <div className="px-2 mb-2">
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Analyze · {analyzeProducts.length}
                  </p>
                </div>
              )}
              {analyzeProducts.map((product) => {
                const isActive = activeModule === product.slug
                return (
                  <button
                    key={product.id}
                    onClick={() => handleNavigation('analyze', product.slug)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    title={isCollapsed ? product.name : ''}
                  >
                    <product.icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="text-[13px] font-medium truncate">{product.name}</span>
                    )}
                  </button>
                )
              })}
            </>
          )}

          {activeWorkspace === 'explore' && (
            <>
              {!isCollapsed && (
                <div className="px-2 mb-2">
                  <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                    Explore · {exploreProducts.length}
                  </p>
                </div>
              )}
              {exploreProducts.map((product) => {
                const isActive = activeModule === product.slug
                return (
                  <button
                    key={product.id}
                    onClick={() => handleNavigation('explore', product.slug)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-purple-50 text-purple-700"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                    title={isCollapsed ? product.name : ''}
                  >
                    <product.icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="text-[13px] font-medium truncate">{product.name}</span>
                    )}
                  </button>
                )
              })}
            </>
          )}

          {/* Global Features - Available in all workspaces */}
          <div>
            {!isCollapsed && (
              <div className="px-2 mb-2 mt-4">
                <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                  Features
                </p>
              </div>
            )}
            <div className="space-y-1">
              {[
                { id: 'advisor', name: 'Advisor', icon: Lightbulb },
                { id: 'dashboards', name: 'Dashboards', icon: LayoutGrid },
                { id: 'datasets', name: 'Datasets', icon: Database },
                { id: 'views', name: 'Saved Views', icon: Bookmark },
                { id: 'notifications', name: 'Notifications', icon: Bell },
                { id: 'help', name: 'Help', icon: HelpCircle }
              ].map((feature) => {
                const isActive = activeModule === feature.id
                const Icon = feature.icon
                return (
                  <button
                    key={feature.id}
                    onClick={() => router.push(`/${activeWorkspace}/${feature.id}`)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md transition-colors",
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                    title={isCollapsed ? feature.name : ''}
                  >
                    <Icon className="h-4 w-4 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="text-[13px] font-medium">{feature.name}</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </nav>

        {/* User Info */}
        {!isCollapsed && (
          <div className="p-3 border-t border-gray-200">
            <div className="flex items-center space-x-2.5">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-medium text-blue-700">
                  {user?.profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'D'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium truncate text-gray-900">
                  {user?.profile?.full_name || 'Demo User'}
                </p>
                <p className="text-[11px] text-gray-500 truncate">
                  {user?.profile?.orgs?.name || 'Demo Org'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
