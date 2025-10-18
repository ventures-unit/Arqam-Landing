'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { LayoutGrid, Wrench, TrendingUp, Search, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Workspace } from './AppShell'
import { cn } from '@/lib/utils'
import { getProductsByUserTypeAndIntent, UserType, UserIntent } from '@/lib/products/products'

interface WorkspaceToggleProps {
  activeWorkspace: Workspace
}

export function WorkspaceToggle({ activeWorkspace }: WorkspaceToggleProps) {
  const router = useRouter()
  const [userType, setUserType] = useState<UserType | null>(null)

  useEffect(() => {
    const storedUserType = sessionStorage.getItem('arqam_user_type') as UserType
    setUserType(storedUserType)
  }, [])

  const handleLogout = () => {
    sessionStorage.clear()
    router.push('/')
  }

  const handleWorkspaceChange = (workspace: Workspace) => {
    if (workspace === 'intelligence') {
      router.push('/intelligence/economy')
      return
    }

    // For other workspaces, get first product for user's intent
    if (!userType) {
      router.push(`/${workspace}/dashboards`)
      return
    }

    const intentMap: Record<Workspace, UserIntent> = {
      intelligence: 'analyze', // Not used
      build: 'build',
      analyze: 'analyze',
      explore: 'explore'
    }

    const intent = intentMap[workspace]
    const products = getProductsByUserTypeAndIntent(userType, intent)

    if (products.length > 0) {
      // Navigate to first product
      router.push(`/${workspace}/products/${products[0].slug}`)
    } else {
      // Fallback to dashboards if no products
      router.push(`/${workspace}/dashboards`)
    }
  }

  const workspaces = [
    { id: 'intelligence' as Workspace, label: 'Intelligence', icon: LayoutGrid },
    { id: 'build' as Workspace, label: 'Build', icon: Wrench },
    { id: 'analyze' as Workspace, label: 'Analyze', icon: TrendingUp },
    { id: 'explore' as Workspace, label: 'Explore', icon: Search }
  ]

  return (
    <header className="h-12 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center px-4 gap-3">
        {/* Workspace Toggle Buttons */}
        <div className="flex items-center gap-1">
          {workspaces.map((workspace) => {
            const Icon = workspace.icon
            const isActive = activeWorkspace === workspace.id
            return (
              <Button
                key={workspace.id}
                variant="ghost"
                size="sm"
                onClick={() => handleWorkspaceChange(workspace.id)}
                className={cn(
                  "h-7 px-2.5 text-xs font-medium transition-colors",
                  isActive
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <Icon className="h-3.5 w-3.5 mr-1.5" />
                {workspace.label}
              </Button>
            )
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Logout Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="h-7 text-xs"
        >
          <LogOut className="h-3.5 w-3.5 mr-1.5" />
          Logout
        </Button>
      </div>
    </header>
  )
}
