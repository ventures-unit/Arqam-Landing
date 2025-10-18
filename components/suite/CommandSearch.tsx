'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  Bell,
  Target,
  Bookmark,
  BarChart3,
  DollarSign,
  Globe,
  Building2,
  User,
  Flame,
  Eye
} from 'lucide-react'
import { UserType } from '@/lib/products/products'

interface CommandSearchProps {
  isOpen: boolean
  onClose: () => void
  userType: UserType
}

interface SearchItem {
  id: string
  title: string
  subtitle?: string
  icon: React.ReactNode
  category: 'recent' | 'trending' | 'product' | 'action'
  action: () => void
  badge?: string
  userCount?: number
}

export function CommandSearch({ isOpen, onClose, userType }: CommandSearchProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const isEntity = userType === 'entity'

  // Define search items
  const allItems: SearchItem[] = [
    // Recent
    {
      id: 'recent-1',
      title: 'GDP Growth Forecast',
      subtitle: 'Viewed 2 hours ago',
      icon: <TrendingUp className="w-4 h-4 text-slate-600" />,
      category: 'recent',
      action: () => router.push('/economy')
    },
    {
      id: 'recent-2',
      title: 'Healthcare Sector Analysis',
      subtitle: 'Viewed yesterday',
      icon: <Clock className="w-4 h-4 text-slate-600" />,
      category: 'recent',
      action: () => router.push('/sectors')
    },
    {
      id: 'recent-3',
      title: 'Inflation Data',
      subtitle: 'Viewed 3 days ago',
      icon: <Clock className="w-4 h-4 text-slate-600" />,
      category: 'recent',
      action: () => router.push('/prices')
    },

    // Trending
    {
      id: 'trending-1',
      title: 'Tech Sector Surge',
      subtitle: '2,847 users viewing',
      icon: <Flame className="w-4 h-4 text-orange-600" />,
      category: 'trending',
      action: () => router.push('/sectors'),
      badge: 'HOT',
      userCount: 2847
    },
    {
      id: 'trending-2',
      title: 'Central Bank Rate Decision',
      subtitle: '1,932 users tracking',
      icon: <Eye className="w-4 h-4 text-blue-600" />,
      category: 'trending',
      action: () => router.push('/economy'),
      userCount: 1932
    },
    {
      id: 'trending-3',
      title: 'Employment Report Analysis',
      subtitle: '1,456 users viewing',
      icon: <TrendingUp className="w-4 h-4 text-emerald-600" />,
      category: 'trending',
      action: () => router.push('/economy'),
      userCount: 1456
    },

    // Products
    {
      id: 'product-1',
      title: isEntity ? 'Economic Forecaster' : 'Investment Advisor',
      subtitle: 'AI-powered predictions',
      icon: <Sparkles className="w-4 h-4 text-purple-600" />,
      category: 'product',
      action: () => router.push(isEntity ? '/products/economic-forecaster' : '/products/investment-advisor'),
      badge: 'PREMIUM'
    },
    {
      id: 'product-2',
      title: 'Intelligence Hub',
      subtitle: 'Complete economic dashboard',
      icon: <BarChart3 className="w-4 h-4 text-blue-600" />,
      category: 'product',
      action: () => router.push('/economy')
    },
    {
      id: 'product-3',
      title: 'Trade Analytics',
      subtitle: 'Import/export insights',
      icon: <Globe className="w-4 h-4 text-emerald-600" />,
      category: 'product',
      action: () => router.push('/trade')
    },
    {
      id: 'product-4',
      title: 'Price Intelligence',
      subtitle: 'Market pricing & inflation',
      icon: <DollarSign className="w-4 h-4 text-amber-600" />,
      category: 'product',
      action: () => router.push('/prices')
    },

    // Quick Actions
    {
      id: 'action-1',
      title: 'Set Custom Alert',
      subtitle: 'Price or event triggers',
      icon: <Bell className="w-4 h-4 text-blue-600" />,
      category: 'action',
      action: () => {
        onClose()
        // Would open alert modal in real implementation
      }
    },
    {
      id: 'action-2',
      title: 'Create Goal Tracker',
      subtitle: 'Monitor your progress',
      icon: <Target className="w-4 h-4 text-emerald-600" />,
      category: 'action',
      action: () => {
        onClose()
        // Would open goal tracker modal
      }
    },
    {
      id: 'action-3',
      title: 'Save to Collection',
      subtitle: 'Bookmark insights',
      icon: <Bookmark className="w-4 h-4 text-purple-600" />,
      category: 'action',
      action: () => {
        onClose()
        // Would open collections modal
      }
    }
  ]

  // Filter items based on search query
  const filteredItems = searchQuery.trim() === ''
    ? allItems
    : allItems.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(searchQuery.toLowerCase())
      )

  // Group by category
  const groupedItems = {
    recent: filteredItems.filter(item => item.category === 'recent'),
    trending: filteredItems.filter(item => item.category === 'trending'),
    product: filteredItems.filter(item => item.category === 'product'),
    action: filteredItems.filter(item => item.category === 'action')
  }

  const totalItems = filteredItems.length

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev + 1) % totalItems)
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => (prev - 1 + totalItems) % totalItems)
          break
        case 'Enter':
          e.preventDefault()
          if (filteredItems[selectedIndex]) {
            filteredItems[selectedIndex].action()
            onClose()
          }
          break
        case 'Escape':
          e.preventDefault()
          onClose()
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, selectedIndex, totalItems, filteredItems, onClose])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen])

  if (!isOpen) return null

  const renderCategory = (title: string, items: SearchItem[], icon: React.ReactNode) => {
    if (items.length === 0) return null

    return (
      <div className="mb-4 last:mb-0">
        <div className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          {icon}
          {title}
        </div>
        <div className="space-y-0.5">
          {items.map((item, index) => {
            const globalIndex = filteredItems.indexOf(item)
            const isSelected = globalIndex === selectedIndex

            return (
              <button
                key={item.id}
                onClick={() => {
                  item.action()
                  onClose()
                }}
                onMouseEnter={() => setSelectedIndex(globalIndex)}
                className={`w-full text-left px-3 py-2.5 rounded-md transition-colors ${
                  isSelected ? 'bg-blue-50 border border-blue-200' : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex-shrink-0 ${isSelected ? 'scale-110' : ''} transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-900">{item.title}</span>
                      {item.badge && (
                        <Badge className="bg-purple-100 text-purple-700 text-[8px] px-1.5 py-0 font-bold">
                          {item.badge}
                        </Badge>
                      )}
                      {item.userCount && (
                        <span className="text-[10px] text-slate-500">· {item.userCount.toLocaleString()} viewing</span>
                      )}
                    </div>
                    {item.subtitle && (
                      <div className="text-[10px] text-slate-600 mt-0.5">{item.subtitle}</div>
                    )}
                  </div>
                  {isSelected && (
                    <ArrowRight className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Command Modal */}
      <div className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4 animate-in zoom-in-95 duration-200">
        <Card className="border-slate-300 shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="border-b border-slate-200 bg-white">
            <div className="flex items-center gap-3 px-4 py-3">
              <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for data, products, or actions..."
                className="flex-1 text-sm text-slate-900 placeholder:text-slate-400 outline-none bg-transparent"
              />
              <div className="flex items-center gap-2 flex-shrink-0">
                <kbd className="px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-100 border border-slate-300 rounded">
                  ESC
                </kbd>
              </div>
            </div>
          </div>

          {/* Results */}
          <CardContent className="p-3 bg-slate-50 max-h-[60vh] overflow-y-auto">
            {totalItems === 0 ? (
              <div className="text-center py-12">
                <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                <div className="text-sm font-semibold text-slate-900 mb-1">No results found</div>
                <div className="text-xs text-slate-500">Try searching for something else</div>
              </div>
            ) : (
              <>
                {renderCategory('Recent', groupedItems.recent, <Clock className="w-3 h-3" />)}
                {renderCategory('Trending Today', groupedItems.trending, <Flame className="w-3 h-3" />)}
                {renderCategory('Products', groupedItems.product, <Sparkles className="w-3 h-3" />)}
                {renderCategory('Quick Actions', groupedItems.action, <Target className="w-3 h-3" />)}
              </>
            )}
          </CardContent>

          {/* Footer */}
          <div className="border-t border-slate-200 bg-white px-3 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] text-slate-500">
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 font-semibold bg-slate-100 border border-slate-300 rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 font-semibold bg-slate-100 border border-slate-300 rounded">↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 font-semibold bg-slate-100 border border-slate-300 rounded">↵</kbd>
                <span>Select</span>
              </div>
            </div>
            <div className="text-[10px] text-slate-400">
              {totalItems} result{totalItems !== 1 ? 's' : ''}
            </div>
          </div>
        </Card>
      </div>
    </>
  )
}
