'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/useAuth'
import { getCommandPaletteItemsForRole, keyboardShortcuts } from '@/lib/nav/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Command, 
  ArrowRight,
  HelpCircle,
  LucideIcon
} from 'lucide-react'
import { cn } from '@/lib/utils'

const iconMap: Record<string, LucideIcon> = {
  TrendingUp: require('lucide-react').TrendingUp,
  Globe: require('lucide-react').Globe,
  Target: require('lucide-react').Target,
  DollarSign: require('lucide-react').DollarSign,
  Banknote: require('lucide-react').Banknote,
  Shield: require('lucide-react').Shield,
  BarChart3: require('lucide-react').BarChart3,
  Bot: require('lucide-react').Bot,
  Bookmark: require('lucide-react').Bookmark,
  Layout: require('lucide-react').Layout,
  Database: require('lucide-react').Database,
  Bell: require('lucide-react').Bell,
  HelpCircle: require('lucide-react').HelpCircle,
  Layers: require('lucide-react').Layers,
  Settings: require('lucide-react').Settings,
  Users: require('lucide-react').Users,
  CreditCard: require('lucide-react').CreditCard,
  Palette: require('lucide-react').Palette,
  Lock: require('lucide-react').Lock,
  FileText: require('lucide-react').FileText,
  Upload: require('lucide-react').Upload,
  Grid: require('lucide-react').Grid,
  CheckCircle: require('lucide-react').CheckCircle,
  GitBranch: require('lucide-react').GitBranch,
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()
  const { user } = useAuth()

  const userRole = user?.profile?.role as any
  const items = getCommandPaletteItemsForRole(userRole || 'end_user')

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.description?.toLowerCase().includes(query.toLowerCase())
  )

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        e.preventDefault()
        setIsOpen(true)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
        setQuery('')
        setSelectedIndex(0)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setSelectedIndex(0)
    }
  }, [isOpen, query])

  const handleSelect = (item: any) => {
    router.push(item.href)
    setIsOpen(false)
    setQuery('')
    setSelectedIndex(0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => 
        prev < filteredItems.length - 1 ? prev + 1 : 0
      )
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => 
        prev > 0 ? prev - 1 : filteredItems.length - 1
      )
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex])
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-[10vh]">
      <div className="w-full max-w-2xl mx-4">
        <div className="bg-popover border border-border rounded-lg shadow-lg">
          {/* Search Input */}
          <div className="flex items-center border-b border-border px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground mr-3" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search modules, views, dashboards..."
              className="border-0 shadow-none focus-visible:ring-0 text-base"
              autoFocus
            />
            <div className="ml-2">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {filteredItems.length === 0 ? (
              <div className="px-4 py-8 text-center text-muted-foreground">
                <Command className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No results found</p>
                <p className="text-sm">Try searching for modules, views, or dashboards</p>
              </div>
            ) : (
              <div className="py-2">
                {filteredItems.map((item, index) => {
                  const Icon = iconMap[item.icon] || HelpCircle
                  const isSelected = index === selectedIndex
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className={cn(
                        "w-full flex items-center px-4 py-3 text-left transition-colors",
                        "hover:bg-accent hover:text-accent-foreground",
                        isSelected && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.label}</span>
                          {item.badge && (
                            <Badge variant="secondary" className="text-xs">
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                        {item.description && (
                          <p className="text-sm text-muted-foreground truncate">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Keyboard Shortcuts Help */}
          <div className="border-t border-border px-4 py-3 bg-muted/50">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    ↵
                  </kbd>
                  <span>Select</span>
                </div>
                <div className="flex items-center space-x-1">
                  <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    esc
                  </kbd>
                  <span>Close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
