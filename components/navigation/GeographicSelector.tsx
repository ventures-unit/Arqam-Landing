'use client'

import { useState } from 'react'
import { useGeographic } from '@/lib/contexts/GeographicContext'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Globe, MapPin, Map } from 'lucide-react'

const REGIONS = [
  { id: 'mena', name: 'MENA' },
  { id: 'gcc', name: 'GCC' },
  { id: 'levant', name: 'Levant' },
  { id: 'north-africa', name: 'North Africa' },
]

const COUNTRIES = [
  { id: 'saudi-arabia', name: 'Saudi Arabia', region: 'gcc' },
  { id: 'uae', name: 'UAE', region: 'gcc' },
  { id: 'egypt', name: 'Egypt', region: 'mena', hasGovernorates: true },
  { id: 'jordan', name: 'Jordan', region: 'levant' },
  { id: 'qatar', name: 'Qatar', region: 'gcc' },
  { id: 'kuwait', name: 'Kuwait', region: 'gcc' },
  { id: 'bahrain', name: 'Bahrain', region: 'gcc' },
  { id: 'oman', name: 'Oman', region: 'gcc' },
  { id: 'morocco', name: 'Morocco', region: 'north-africa' },
  { id: 'tunisia', name: 'Tunisia', region: 'north-africa' },
]

const EGYPT_GOVERNORATES = [
  { id: 'all', name: 'All Governorates' },
  { id: 'cairo', name: 'Cairo' },
  { id: 'alexandria', name: 'Alexandria' },
  { id: 'giza', name: 'Giza' },
  { id: 'qalyubia', name: 'Qalyubia' },
  { id: 'port-said', name: 'Port Said' },
  { id: 'suez', name: 'Suez' },
  { id: 'dakahlia', name: 'Dakahlia' },
  { id: 'sharqia', name: 'Sharqia' },
  { id: 'gharbia', name: 'Gharbia' },
  { id: 'minya', name: 'Minya' },
  { id: 'asyut', name: 'Asyut' },
  { id: 'sohag', name: 'Sohag' },
  { id: 'luxor', name: 'Luxor' },
  { id: 'aswan', name: 'Aswan' },
  { id: 'red-sea', name: 'Red Sea' },
  { id: 'north-sinai', name: 'North Sinai' },
  { id: 'south-sinai', name: 'South Sinai' },
]

export function GeographicSelector() {
  const { scope, setScope, region, setRegion, country, setCountry, governorate, setGovernorate } = useGeographic()
  const [localScope, setLocalScope] = useState<string>('global')

  const handleScopeChange = (value: string) => {
    setLocalScope(value)

    if (value === 'global') {
      setScope('global')
      setRegion(null)
      setCountry(null)
      setGovernorate(null)
    } else if (value === 'regional') {
      setScope('regional')
      setCountry(null)
      setGovernorate(null)
    } else if (value === 'country') {
      setScope('country')
      setGovernorate(null)
    } else if (value === 'governorate') {
      setScope('governorate')
    }
  }

  const handleRegionChange = (value: string) => {
    setRegion(value)
    setCountry(null)
    setGovernorate(null)
  }

  const handleCountryChange = (value: string) => {
    setCountry(value)
    setGovernorate(null)

    // If selecting a country with governorates available, show governorate option
    const selectedCountry = COUNTRIES.find(c => c.id === value)
    if (selectedCountry?.hasGovernorates) {
      setLocalScope('country')
    }
  }

  const handleGovernorateChange = (value: string) => {
    if (value === 'all') {
      setGovernorate(null)
      setScope('country')
    } else {
      setGovernorate(value)
      setScope('governorate')
    }
  }

  const selectedCountryData = COUNTRIES.find(c => c.id === country)
  const showGovernorateSelector = country === 'egypt' && (localScope === 'country' || localScope === 'governorate')

  return (
    <div className="flex items-center gap-2">
      {/* Scope Selector */}
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1 text-[10px] text-gray-600">
          <Globe className="h-3.5 w-3.5" />
          <span className="font-medium">Scope:</span>
        </div>
        <Select value={localScope} onValueChange={handleScopeChange}>
          <SelectTrigger className="h-7 w-[110px] text-[11px] border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="global" className="text-[11px]">
              <div className="flex items-center gap-1.5">
                <Globe className="h-3 w-3" />
                Global
              </div>
            </SelectItem>
            <SelectItem value="regional" className="text-[11px]">
              <div className="flex items-center gap-1.5">
                <Map className="h-3 w-3" />
                Regional
              </div>
            </SelectItem>
            <SelectItem value="country" className="text-[11px]">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                Country
              </div>
            </SelectItem>
            {selectedCountryData?.hasGovernorates && (
              <SelectItem value="governorate" className="text-[11px]">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" />
                  Governorate
                </div>
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Region Selector */}
      {localScope === 'regional' && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-600 font-medium">Region:</span>
          <Select value={region || ''} onValueChange={handleRegionChange}>
            <SelectTrigger className="h-7 w-[120px] text-[11px] border-gray-300">
              <SelectValue placeholder="Select region" />
            </SelectTrigger>
            <SelectContent>
              {REGIONS.map(r => (
                <SelectItem key={r.id} value={r.id} className="text-[11px]">
                  {r.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Country Selector */}
      {(localScope === 'country' || localScope === 'governorate') && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-600 font-medium">Country:</span>
          <Select value={country || ''} onValueChange={handleCountryChange}>
            <SelectTrigger className="h-7 w-[140px] text-[11px] border-gray-300">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              {COUNTRIES.map(c => (
                <SelectItem key={c.id} value={c.id} className="text-[11px]">
                  {c.name}
                  {c.hasGovernorates && (
                    <Badge className="ml-1.5 h-3 text-[8px] px-1 bg-blue-100 text-blue-700 border-0">
                      Has regions
                    </Badge>
                  )}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Governorate Selector */}
      {showGovernorateSelector && (
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-gray-600 font-medium">Governorate:</span>
          <Select value={governorate || ''} onValueChange={handleGovernorateChange}>
            <SelectTrigger className="h-7 w-[140px] text-[11px] border-gray-300">
              <SelectValue placeholder="Select governorate" />
            </SelectTrigger>
            <SelectContent>
              {EGYPT_GOVERNORATES.map(g => (
                <SelectItem key={g.id} value={g.id} className="text-[11px]">
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Current Selection Badge */}
      <Badge className="h-6 text-[10px] px-2 bg-blue-50 text-blue-700 border border-blue-200">
        {scope === 'global' && 'Global View'}
        {scope === 'regional' && region && `${REGIONS.find(r => r.id === region)?.name} Region`}
        {scope === 'country' && country && !governorate && COUNTRIES.find(c => c.id === country)?.name}
        {scope === 'country' && country === 'egypt' && !governorate && 'Egypt - All Governorates'}
        {scope === 'governorate' && governorate && `${EGYPT_GOVERNORATES.find(g => g.id === governorate)?.name}, Egypt`}
      </Badge>
    </div>
  )
}
