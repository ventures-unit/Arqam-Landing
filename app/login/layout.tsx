'use client'

import { ReactNode } from 'react'
import { AuthProvider } from '@/lib/auth/useAuth'
import { GeographicProvider } from '@/lib/contexts/GeographicContext'
import { AppShell } from '@/components/shell/AppShell'

export default function LoginLayout({ children }: { children: ReactNode }) {
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
