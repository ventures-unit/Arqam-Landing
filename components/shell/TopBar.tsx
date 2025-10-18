'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/useAuth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { GeographicSelector } from '@/components/navigation/GeographicSelector'
import {
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  ChevronDown,
  Command,
  ArrowLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'

export function TopBar() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="h-12 border-b border-gray-200 bg-white">
      <div className="flex h-full items-center justify-between px-4 gap-4">
        {/* Back to Suite Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/suite')}
          className="text-xs h-7"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          Back to Suite
        </Button>

        {/* Geographic Selector */}
        <GeographicSelector />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right side */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative h-7">
            <Bell className="h-3.5 w-3.5" />
            <Badge
              className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[9px] bg-red-500 text-white border-0"
            >
              3
            </Badge>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="h-7">
            <Settings className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
