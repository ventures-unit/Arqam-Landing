'use client'

import { ReactNode } from 'react'
import { AppShell } from '@/components/shell/AppShell'
import { AuthProvider } from '@/lib/auth/useAuth'
import { GeographicProvider } from '@/lib/contexts/GeographicContext'

export default function ShellLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <GeographicProvider>
        <AppShell>
          {children}
        </AppShell>
      </GeographicProvider>
    </AuthProvider>
  )
}
