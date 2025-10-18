'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { UserType, getProductsByUserTypeAndIntent, type Product } from '@/lib/products/products'
import { Workspace } from './AppShell'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ProductTabsProps {
  workspace: Workspace
}

export function ProductTabs({ workspace }: ProductTabsProps) {
  const router = useRouter()
  const pathname = usePathname()
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [userType, setUserType] = useState<UserType | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const storedUserType = sessionStorage.getItem('arqam_user_type') as UserType
    setUserType(storedUserType)
  }, [])

  const intentMap: Record<Workspace, 'build' | 'analyze' | 'explore'> = {
    intelligence: 'analyze', // Not used
    build: 'build',
    analyze: 'analyze',
    explore: 'explore'
  }

  const products = userType ? getProductsByUserTypeAndIntent(userType, intentMap[workspace]) : []

  // Check scroll position
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }

  useEffect(() => {
    if (products.length > 0) {
      checkScroll()
      window.addEventListener('resize', checkScroll)
      return () => window.removeEventListener('resize', checkScroll)
    }
  }, [products])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
      setTimeout(checkScroll, 300)
    }
  }

  // Extract active product slug from pathname
  const pathParts = pathname.split('/').filter(Boolean)
  const activeProductSlug = pathParts[pathParts.length - 1]

  // Don't show for intelligence workspace or when no user type/products
  if (workspace === 'intelligence' || !userType || products.length === 0) {
    return null
  }

  return (
    <div className="bg-white border-b border-gray-200 px-3 py-2 flex items-center gap-2">
      {/* Scroll Left Button */}
      {canScrollLeft && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 flex-shrink-0"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
      )}

      {/* Scrollable Product Tabs */}
      <div
        ref={scrollContainerRef}
        className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-hide"
        onScroll={checkScroll}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => {
          const isActive = activeProductSlug === product.slug
          const Icon = product.icon

          return (
            <button
              key={product.id}
              onClick={() => router.push(`/${workspace}/products/${product.slug}`)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap flex-shrink-0",
                isActive
                  ? workspace === 'build'
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : workspace === 'analyze'
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : "bg-purple-50 text-purple-700 border border-purple-200"
                  : "text-gray-600 hover:bg-gray-50 border border-transparent"
              )}
            >
              <Icon className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="text-[12px] font-medium">{product.name}</span>
              {product.comingSoon && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-100 text-orange-700">
                  Soon
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Scroll Right Button */}
      {canScrollRight && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 flex-shrink-0"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
