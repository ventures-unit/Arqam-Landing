import { useMemo } from 'react'
import { useGeographic } from '@/lib/contexts/GeographicContext'

// Country mapping for data filtering
const COUNTRY_MAPPING: Record<string, string[]> = {
  'saudi-arabia': ['Saudi Arabia', 'KSA', 'SA'],
  'uae': ['UAE', 'United Arab Emirates', 'Emirates'],
  'egypt': ['Egypt', 'EG'],
  'jordan': ['Jordan', 'JO'],
  'qatar': ['Qatar', 'QA'],
  'kuwait': ['Kuwait', 'KW'],
  'bahrain': ['Bahrain', 'BH'],
  'oman': ['Oman', 'OM'],
  'morocco': ['Morocco', 'MA'],
  'tunisia': ['Tunisia', 'TN'],
}

const REGION_COUNTRIES: Record<string, string[]> = {
  'mena': ['Saudi Arabia', 'UAE', 'Egypt', 'Jordan', 'Qatar', 'Kuwait', 'Bahrain', 'Oman', 'Morocco', 'Tunisia', 'Lebanon', 'Iraq', 'Yemen'],
  'gcc': ['Saudi Arabia', 'UAE', 'Qatar', 'Kuwait', 'Bahrain', 'Oman'],
  'levant': ['Jordan', 'Lebanon', 'Syria', 'Palestine'],
  'north-africa': ['Morocco', 'Tunisia', 'Algeria', 'Libya', 'Egypt'],
}

export function useGeographicData<T extends { country?: string; governorate?: string; region?: string }>(
  data: T[]
): T[] {
  const { scope, region, country, governorate } = useGeographic()

  return useMemo(() => {
    if (scope === 'global') {
      return data
    }

    if (scope === 'regional' && region) {
      const allowedCountries = REGION_COUNTRIES[region] || []
      return data.filter(item =>
        item.country && allowedCountries.some(c =>
          item.country?.toLowerCase().includes(c.toLowerCase())
        )
      )
    }

    if (scope === 'country' && country) {
      const countryVariants = COUNTRY_MAPPING[country] || [country]
      return data.filter(item =>
        item.country && countryVariants.some(variant =>
          item.country?.toLowerCase().includes(variant.toLowerCase())
        )
      )
    }

    if (scope === 'governorate' && governorate && country) {
      // Filter by both country and governorate
      const countryVariants = COUNTRY_MAPPING[country] || [country]
      return data.filter(item => {
        const matchesCountry = item.country && countryVariants.some(variant =>
          item.country?.toLowerCase().includes(variant.toLowerCase())
        )
        const matchesGovernorate = item.governorate &&
          item.governorate.toLowerCase().includes(governorate.toLowerCase())

        return matchesCountry && matchesGovernorate
      })
    }

    return data
  }, [data, scope, region, country, governorate])
}

// Helper to get display label for current scope
export function useGeographicLabel(): string {
  const { scope, region, country, governorate } = useGeographic()

  if (scope === 'global') return 'Global'
  if (scope === 'regional' && region) return `${region.toUpperCase()} Region`
  if (scope === 'country' && country) {
    const countryName = Object.entries(COUNTRY_MAPPING).find(([key]) => key === country)?.[1][0] || country
    return countryName
  }
  if (scope === 'governorate' && governorate) {
    return `${governorate.charAt(0).toUpperCase() + governorate.slice(1)} Governorate`
  }

  return 'Global'
}
