'use client'

import { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, TrendingUp, MapPin, Building2, Tag, ChevronRight } from 'lucide-react'
import { BUSINESS_ARCHETYPES, POPULAR_ARCHETYPES, searchArchetypes, type BusinessArchetype } from '@/lib/data/businessArchetypes'
import { getTemplate, applyGeoOverrides, type BusinessTemplate } from '@/lib/data/businessTemplates'
import { useGeographic } from '@/lib/contexts/GeographicContext'

interface BusinessSelectorProps {
  onSelect: (archetype: BusinessArchetype, template: BusinessTemplate) => void
}

export function BusinessSelector({ onSelect }: BusinessSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const { country, governorate, setScope, setCountry, setGovernorate } = useGeographic()

  const filteredArchetypes = useMemo(() => {
    if (searchQuery) {
      return searchArchetypes(searchQuery)
    }
    if (selectedCategory === 'popular') {
      return POPULAR_ARCHETYPES
    }
    return BUSINESS_ARCHETYPES
  }, [searchQuery, selectedCategory])

  const handleSelectBusiness = (archetype: BusinessArchetype) => {
    const countryCode = country || 'egypt'
    const template = getTemplate(archetype.id, countryCode)

    if (!template) {
      alert(`Template not available for ${archetype.name} in ${countryCode}. Using Egypt template.`)
      const egyptTemplate = getTemplate(archetype.id, 'egypt')
      if (!egyptTemplate) return
      onSelect(archetype, egyptTemplate)
      return
    }

    const finalTemplate = governorate ? applyGeoOverrides(template, governorate) : template
    onSelect(archetype, finalTemplate)
  }

  const handleQuickSetup = (countryId: string, govId?: string) => {
    setCountry(countryId)
    if (govId) {
      setGovernorate(govId)
      setScope('governorate')
    } else {
      setScope('country')
    }
  }

  const archetypesBySector = useMemo(() => {
    const grouped: Record<string, BusinessArchetype[]> = {}
    filteredArchetypes.forEach(arch => {
      if (!grouped[arch.sector]) {
        grouped[arch.sector] = []
      }
      grouped[arch.sector].push(arch)
    })
    return grouped
  }, [filteredArchetypes])

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search and Filters */}
      <div className="bg-white rounded border border-gray-300 mb-4">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search business type (e.g., Restaurant, Pharmacy, Retail)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9 text-sm border-gray-300"
            />
          </div>
        </div>

        <div className="px-4 py-3 bg-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="h-7 text-xs"
            >
              All ({BUSINESS_ARCHETYPES.length})
            </Button>
            <Button
              variant={selectedCategory === 'popular' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('popular')}
              className="h-7 text-xs"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              Popular ({POPULAR_ARCHETYPES.length})
            </Button>
          </div>

          {!country && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Quick setup:</span>
              <Button variant="outline" size="sm" onClick={() => handleQuickSetup('egypt', 'cairo')} className="h-7 text-xs">
                Cairo
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleQuickSetup('egypt', 'alexandria')} className="h-7 text-xs">
                Alexandria
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Business Type Table */}
      <div className="space-y-4">
        {Object.entries(archetypesBySector).map(([sector, archetypes]) => (
          <div key={sector} className="bg-white rounded border border-gray-300">
            <div className="px-4 py-2 bg-gray-100 border-b border-gray-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{sector}</h3>
                <Badge className="h-5 text-[10px] bg-gray-200 text-gray-700 border-0">
                  {archetypes.length} types
                </Badge>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {archetypes.map(archetype => (
                <button
                  key={archetype.id}
                  onClick={() => handleSelectBusiness(archetype)}
                  className="w-full px-4 py-3 hover:bg-gray-50 transition-colors text-left group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <Building2 className="h-4 w-4 text-gray-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                              {archetype.name}
                            </h4>
                            <span className="text-xs text-gray-500">/</span>
                            <span className="text-xs text-gray-600">{archetype.nameAr}</span>
                            {archetype.popular && (
                              <Badge className="h-4 text-[9px] bg-blue-100 text-blue-700 border-0">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-600">
                            <div className="flex items-center gap-1">
                              <Tag className="h-3 w-3" />
                              <span>ISIC {archetype.isic_code}</span>
                            </div>
                            <span>•</span>
                            <span>{archetype.tags.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Badge className="h-5 text-[10px] bg-green-100 text-green-700 border-0">
                        Template Available
                      </Badge>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredArchetypes.length === 0 && (
        <div className="bg-white rounded border border-gray-300 p-8 text-center">
          <Search className="h-8 w-8 text-gray-400 mx-auto mb-3" />
          <h3 className="text-sm font-semibold text-gray-900 mb-1">No results found</h3>
          <p className="text-xs text-gray-600 mb-4">
            Try adjusting your search or browse all business types
          </p>
          <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
            Clear Search
          </Button>
        </div>
      )}

      {/* Location Notice */}
      {!country && (
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded p-3">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-blue-800">
              <strong className="font-semibold">Location not set.</strong> Use the geographic selector in the top navigation bar
              to set your target market, or use quick setup buttons above for faster access.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
