'use client'

import { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { DynamicSidebar } from './DynamicSidebar'
import { WorkspaceToggle } from './WorkspaceToggle'
import { CommandPalette } from '@/components/nav/CommandPalette'
import { useAuth } from '@/lib/auth/useAuth'

export type Workspace = 'intelligence' | 'build' | 'analyze' | 'explore'

interface AppShellProps {
  children?: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const [activeWorkspace, setActiveWorkspace] = useState<Workspace>('intelligence')
  const [activeModule, setActiveModule] = useState<string>('economy')

  // Detect workspace and module from URL
  useEffect(() => {
    const pathParts = pathname.split('/').filter(Boolean)

    // Handle /login routes (preview mode)
    if (pathParts.length >= 2 && pathParts[0] === 'login') {
      const workspace = pathParts[1] as Workspace
      const modulePath = pathParts[2] || ''

      setActiveWorkspace(workspace)
      setActiveModule(modulePath)
      return
    }

    // Handle /{workspace} routes (authenticated mode)
    if (pathParts.length >= 1) {
      const workspace = pathParts[0] as Workspace

      // Valid workspaces
      if (['intelligence', 'analyze', 'build', 'explore'].includes(workspace)) {
        setActiveWorkspace(workspace)

        // Determine active module
        if (pathParts.length >= 2) {
          // For product routes: /workspace/products/productId
          if (pathParts[1] === 'products' && pathParts.length >= 3) {
            setActiveModule(pathParts[2])
          } else {
            // For intelligence modules and global features: /workspace/moduleName
            setActiveModule(pathParts[1])
          }
        }
      }
    }
  }, [pathname])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Dynamic Sidebar */}
      <DynamicSidebar
        activeWorkspace={activeWorkspace}
        activeModule={activeModule}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Workspace Toggle Bar */}
        <WorkspaceToggle activeWorkspace={activeWorkspace} />

        {/* Page Content - Next.js automatically handles loading.tsx */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette />
    </div>
  )
}
