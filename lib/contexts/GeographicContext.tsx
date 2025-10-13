'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

export type GeographicScope = 'global' | 'regional' | 'country' | 'governorate'

export interface GeographicContextType {
  scope: GeographicScope
  setScope: (scope: GeographicScope) => void
  region: string | null
  setRegion: (region: string | null) => void
  country: string | null
  setCountry: (country: string | null) => void
  governorate: string | null
  setGovernorate: (governorate: string | null) => void
  resetContext: () => void
}

const GeographicContext = createContext<GeographicContextType | undefined>(undefined)

export function GeographicProvider({ children }: { children: ReactNode }) {
  const [scope, setScope] = useState<GeographicScope>('global')
  const [region, setRegion] = useState<string | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [governorate, setGovernorate] = useState<string | null>(null)

  const resetContext = () => {
    setScope('global')
    setRegion(null)
    setCountry(null)
    setGovernorate(null)
  }

  return (
    <GeographicContext.Provider
      value={{
        scope,
        setScope,
        region,
        setRegion,
        country,
        setCountry,
        governorate,
        setGovernorate,
        resetContext,
      }}
    >
      {children}
    </GeographicContext.Provider>
  )
}

export function useGeographic() {
  const context = useContext(GeographicContext)
  if (context === undefined) {
    throw new Error('useGeographic must be used within a GeographicProvider')
  }
  return context
}
