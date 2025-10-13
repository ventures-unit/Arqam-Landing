'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/lib/auth/useAuth'
import { UserRole, hasPermission } from './roles'

interface AbilityGuardProps {
  children: ReactNode
  roleIn?: UserRole[]
  permission?: keyof import('./roles').RolePermissions
  fallback?: ReactNode
  requireAll?: boolean
}

export function withAbility({ 
  children, 
  roleIn = [], 
  permission, 
  fallback = null,
  requireAll = false 
}: AbilityGuardProps) {
  return function AbilityGuard() {
    const { user, loading } = useAuth()
    
    if (loading) {
      return <div>Loading...</div>
    }
    
    if (!user) {
      return <>{fallback}</>
    }
    
    const userRole = user.profile?.role as UserRole
    
    // Check role requirements
    if (roleIn.length > 0) {
      const hasRequiredRole = requireAll 
        ? roleIn.every(role => userRole === role)
        : roleIn.includes(userRole)
      
      if (!hasRequiredRole) {
        return <>{fallback}</>
      }
    }
    
    // Check permission requirements
    if (permission && !hasPermission(userRole, permission)) {
      return <>{fallback}</>
    }
    
    return <>{children}</>
  }
}

export function useAbility() {
  const { user, loading } = useAuth()
  
  if (loading || !user) {
    return {
      can: () => false,
      hasRole: () => false,
      hasAnyRole: () => false,
      hasAllRoles: () => false,
      role: null as UserRole | null,
      loading: true
    }
  }
  
  const userRole = user.profile?.role as UserRole
  
  return {
    can: (permission: keyof import('./roles').RolePermissions) => 
      hasPermission(userRole, permission),
    
    hasRole: (role: UserRole) => userRole === role,
    
    hasAnyRole: (roles: UserRole[]) => roles.includes(userRole),
    
    hasAllRoles: (roles: UserRole[]) => roles.every(role => userRole === role),
    
    role: userRole,
    loading: false
  }
}

// Higher-order component for protecting pages
export function withAuth<T extends object>(
  Component: React.ComponentType<T>,
  options: {
    roleIn?: UserRole[]
    permission?: keyof import('./roles').RolePermissions
    redirectTo?: string
  } = {}
) {
  return function AuthenticatedComponent(props: T) {
    const { user, loading } = useAuth()
    
    if (loading) {
      return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }
    
    if (!user) {
      // Redirect to login
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login'
      }
      return null
    }
    
    const userRole = user.profile?.role as UserRole
    
    // Check role requirements
    if (options.roleIn && options.roleIn.length > 0) {
      if (!options.roleIn.includes(userRole)) {
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
              <p className="text-gray-600">You don't have permission to access this page.</p>
            </div>
          </div>
        )
      }
    }
    
    // Check permission requirements
    if (options.permission && !hasPermission(userRole, options.permission)) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
            <p className="text-gray-600">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    }
    
    return <Component {...props} />
  }
}

// Hook for checking specific permissions
export function usePermission(permission: keyof import('./roles').RolePermissions) {
  const { can } = useAbility()
  return can(permission)
}

// Hook for checking roles
export function useRole(role: UserRole) {
  const { hasRole } = useAbility()
  return hasRole(role)
}

// Hook for checking multiple roles
export function useRoles(roles: UserRole[], requireAll = false) {
  const { hasAnyRole, hasAllRoles } = useAbility()
  return requireAll ? hasAllRoles(roles) : hasAnyRole(roles)
}

// Component for conditional rendering based on permissions
export function PermissionGate({ 
  children, 
  permission, 
  roleIn, 
  fallback = null 
}: {
  children: ReactNode
  permission?: keyof import('./roles').RolePermissions
  roleIn?: UserRole[]
  fallback?: ReactNode
}) {
  const { can, hasAnyRole } = useAbility()
  
  if (permission && !can(permission)) {
    return <>{fallback}</>
  }
  
  if (roleIn && roleIn.length > 0 && !hasAnyRole(roleIn)) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}

// Component for conditional rendering based on roles
export function RoleGate({ 
  children, 
  role, 
  roles, 
  requireAll = false, 
  fallback = null 
}: {
  children: ReactNode
  role?: UserRole
  roles?: UserRole[]
  requireAll?: boolean
  fallback?: ReactNode
}) {
  const { hasRole, hasAnyRole, hasAllRoles } = useAbility()
  
  if (role && !hasRole(role)) {
    return <>{fallback}</>
  }
  
  if (roles && roles.length > 0) {
    const hasRequiredRoles = requireAll ? hasAllRoles(roles) : hasAnyRole(roles)
    if (!hasRequiredRoles) {
      return <>{fallback}</>
    }
  }
  
  return <>{children}</>
}
