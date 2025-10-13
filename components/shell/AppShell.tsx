'use client'

import { ReactNode } from 'react'
import { LeftSidebar } from './LeftSidebar'
import { TopBar } from './TopBar'
import { BottomDock } from './BottomDock'
import { CommandPalette } from '@/components/nav/CommandPalette'
import { useAuth } from '@/lib/auth/useAuth'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const { user, loading } = useAuth()

  // For development: Always show the shell with sidebar
  // Remove the auth check to show sidebar even when not logged in
  const showShell = true // Change this to !!user in production

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!showShell) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Sidebar */}
      <LeftSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar with Geographic Selector */}
        <TopBar />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette />
    </div>
  )
}
