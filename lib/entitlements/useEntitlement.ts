'use client'

import { useAuth } from '@/lib/auth/useAuth'
import entitlements from './entitlements.json'

export type PlanType = 'free' | 'pro' | 'enterprise'

export interface EntitlementValue {
  max?: number
  unlimited?: boolean
  enabled?: boolean
  read?: boolean
  write?: boolean
  level?: string
}

export interface Entitlements {
  views: { max: number; unlimited: boolean }
  dashboards: { max: number; unlimited: boolean }
  exports: {
    rows: { max: number; unlimited: boolean }
    formats: string[]
  }
  scheduler: { enabled: boolean }
  api: { enabled: boolean; read: boolean; write: boolean }
  seats: { max: number; unlimited: boolean }
  connectors: { max: number; unlimited: boolean }
  sso: { enabled: boolean }
  roles: { custom: boolean }
  rls: { fls: boolean }
  audit: { export: boolean }
  branding: { whitelabel: boolean }
  support: { level: string }
}

export function useEntitlement() {
  const { user } = useAuth()
  
  if (!user?.profile?.orgs) {
    return {
      plan: 'free' as PlanType,
      entitlements: entitlements.free as Entitlements,
      canUse: () => false,
      getLimit: () => 0,
      isUnlimited: () => false,
      hasFeature: () => false
    }
  }
  
  const plan = user.profile.orgs.plan as PlanType
  const userEntitlements = entitlements[plan] as Entitlements
  
  return {
    plan,
    entitlements: userEntitlements,
    
    // Check if a feature is enabled
    canUse: (feature: string): boolean => {
      const featurePath = feature.split('.')
      let value: any = userEntitlements
      
      for (const key of featurePath) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key]
        } else {
          return false
        }
      }
      
      return Boolean(value)
    },
    
    // Get the limit for a resource
    getLimit: (resource: string): number => {
      const resourcePath = resource.split('.')
      let value: any = userEntitlements
      
      for (const key of resourcePath) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key]
        } else {
          return 0
        }
      }
      
      if (typeof value === 'object' && 'max' in value) {
        return value.max
      }
      
      return 0
    },
    
    // Check if a resource is unlimited
    isUnlimited: (resource: string): boolean => {
      const resourcePath = resource.split('.')
      let value: any = userEntitlements
      
      for (const key of resourcePath) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key]
        } else {
          return false
        }
      }
      
      if (typeof value === 'object' && 'unlimited' in value) {
        return value.unlimited
      }
      
      return false
    },
    
    // Check if a feature is available
    hasFeature: (feature: string): boolean => {
      const featurePath = feature.split('.')
      let value: any = userEntitlements
      
      for (const key of featurePath) {
        if (value && typeof value === 'object' && key in value) {
          value = value[key]
        } else {
          return false
        }
      }
      
      return Boolean(value)
    }
  }
}

// Hook for checking specific entitlements
export function useFeatureFlag(flag: string): boolean {
  const { canUse } = useEntitlement()
  return canUse(flag)
}

// Hook for checking resource limits
export function useResourceLimit(resource: string): { limit: number; unlimited: boolean; canUse: boolean } {
  const { getLimit, isUnlimited, canUse } = useEntitlement()
  
  return {
    limit: getLimit(resource),
    unlimited: isUnlimited(resource),
    canUse: canUse(resource)
  }
}

// Hook for checking export limits
export function useExportLimits(): {
  maxRows: number
  unlimitedRows: boolean
  formats: string[]
  canExport: boolean
} {
  const { entitlements } = useEntitlement()
  
  return {
    maxRows: entitlements.exports.rows.max,
    unlimitedRows: entitlements.exports.rows.unlimited,
    formats: entitlements.exports.formats,
    canExport: true // All plans can export
  }
}

// Hook for checking view limits
export function useViewLimits(): {
  maxViews: number
  unlimitedViews: boolean
  canCreateViews: boolean
} {
  const { entitlements } = useEntitlement()
  
  return {
    maxViews: entitlements.views.max,
    unlimitedViews: entitlements.views.unlimited,
    canCreateViews: true // All plans can create views
  }
}

// Hook for checking dashboard limits
export function useDashboardLimits(): {
  maxDashboards: number
  unlimitedDashboards: boolean
  canCreateDashboards: boolean
} {
  const { entitlements } = useEntitlement()
  
  return {
    maxDashboards: entitlements.dashboards.max,
    unlimitedDashboards: entitlements.dashboards.unlimited,
    canCreateDashboards: true // All plans can create dashboards
  }
}

// Hook for checking seat limits
export function useSeatLimits(): {
  maxSeats: number
  unlimitedSeats: boolean
  canAddSeats: boolean
} {
  const { entitlements } = useEntitlement()
  
  return {
    maxSeats: entitlements.seats.max,
    unlimitedSeats: entitlements.seats.unlimited,
    canAddSeats: true // All plans can add seats (within limits)
  }
}

// Hook for checking API access
export function useApiAccess(): {
  enabled: boolean
  canRead: boolean
  canWrite: boolean
  canUseApi: boolean
} {
  const { entitlements } = useEntitlement()
  
  return {
    enabled: entitlements.api.enabled,
    canRead: entitlements.api.read,
    canWrite: entitlements.api.write,
    canUseApi: entitlements.api.enabled
  }
}

// Hook for checking scheduler access
export function useSchedulerAccess(): {
  enabled: boolean
  canSchedule: boolean
} {
  const { entitlements } = useEntitlement()
  
  return {
    enabled: entitlements.scheduler.enabled,
    canSchedule: entitlements.scheduler.enabled
  }
}

// Utility function to check if user can perform an action
export function canPerformAction(
  action: string,
  currentCount: number,
  plan: PlanType
): { allowed: boolean; reason?: string; upgradeRequired?: boolean } {
  const userEntitlements = entitlements[plan] as Entitlements
  
  switch (action) {
    case 'create_view':
      if (userEntitlements.views.unlimited) {
        return { allowed: true }
      }
      if (currentCount >= userEntitlements.views.max) {
        return {
          allowed: false,
          reason: `You've reached the limit of ${userEntitlements.views.max} views`,
          upgradeRequired: true
        }
      }
      return { allowed: true }
      
    case 'create_dashboard':
      if (userEntitlements.dashboards.unlimited) {
        return { allowed: true }
      }
      if (currentCount >= userEntitlements.dashboards.max) {
        return {
          allowed: false,
          reason: `You've reached the limit of ${userEntitlements.dashboards.max} dashboards`,
          upgradeRequired: true
        }
      }
      return { allowed: true }
      
    case 'export_data':
      return { allowed: true } // All plans can export
      
    case 'schedule_report':
      if (!userEntitlements.scheduler.enabled) {
        return {
          allowed: false,
          reason: 'Scheduled reports are not available on your plan',
          upgradeRequired: true
        }
      }
      return { allowed: true }
      
    case 'use_api':
      if (!userEntitlements.api.enabled) {
        return {
          allowed: false,
          reason: 'API access is not available on your plan',
          upgradeRequired: true
        }
      }
      return { allowed: true }
      
    case 'add_seat':
      if (userEntitlements.seats.unlimited) {
        return { allowed: true }
      }
      if (currentCount >= userEntitlements.seats.max) {
        return {
          allowed: false,
          reason: `You've reached the limit of ${userEntitlements.seats.max} seats`,
          upgradeRequired: true
        }
      }
      return { allowed: true }
      
    default:
      return { allowed: false, reason: 'Unknown action' }
  }
}
