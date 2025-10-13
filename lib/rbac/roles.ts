export type UserRole = 'end_user' | 'org_admin' | 'data_admin' | 'platform_admin'

export interface RolePermissions {
  // Module access
  canAccessModules: boolean
  canAccessEconomy: boolean
  canAccessTrade: boolean
  canAccessMarketEntry: boolean
  canAccessPrices: boolean
  canAccessCapital: boolean
  canAccessRegulatory: boolean
  canAccessSectors: boolean
  canAccessAdvisor: boolean

  // Utilities
  canAccessViews: boolean
  canAccessDashboards: boolean
  canAccessDatasets: boolean
  canAccessNotifications: boolean
  canAccessHelp: boolean

  // Admin areas
  canAccessOrgConsole: boolean
  canAccessDataConsole: boolean
  canAccessAdminHub: boolean

  // Org management
  canManageTeam: boolean
  canManageBilling: boolean
  canManageOrgSettings: boolean
  canManageSecurity: boolean
  canViewAuditLogs: boolean

  // Data management
  canManageDataSources: boolean
  canManageDataUploads: boolean
  canManageDataCatalog: boolean
  canManageDataPolicies: boolean
  canManageDataQuality: boolean
  canManageDataLineage: boolean

  // Content management
  canCreateViews: boolean
  canEditViews: boolean
  canDeleteViews: boolean
  canShareViews: boolean
  canCreateDashboards: boolean
  canEditDashboards: boolean
  canDeleteDashboards: boolean
  canShareDashboards: boolean

  // Exports and sharing
  canExportData: boolean
  canScheduleReports: boolean
  canShareContent: boolean

  // API access
  canUseAPI: boolean
  canUseAPIRead: boolean
  canUseAPIWrite: boolean

  // Platform admin
  canManagePlatform: boolean
  canViewAllOrgs: boolean
  canManageFeatureFlags: boolean
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  end_user: {
    // Module access
    canAccessModules: true,
    canAccessEconomy: true,
    canAccessTrade: true,
    canAccessMarketEntry: true,
    canAccessPrices: true,
    canAccessCapital: true,
    canAccessRegulatory: true,
    canAccessSectors: true,
    canAccessAdvisor: true,

    // Utilities
    canAccessViews: true,
    canAccessDashboards: true,
    canAccessDatasets: true,
    canAccessNotifications: true,
    canAccessHelp: true,

    // Admin areas
    canAccessOrgConsole: false,
    canAccessDataConsole: false,
    canAccessAdminHub: false,

    // Org management
    canManageTeam: false,
    canManageBilling: false,
    canManageOrgSettings: false,
    canManageSecurity: false,
    canViewAuditLogs: false,

    // Data management
    canManageDataSources: false,
    canManageDataUploads: false,
    canManageDataCatalog: false,
    canManageDataPolicies: false,
    canManageDataQuality: false,
    canManageDataLineage: false,

    // Content management
    canCreateViews: true,
    canEditViews: true,
    canDeleteViews: true,
    canShareViews: false,
    canCreateDashboards: true,
    canEditDashboards: true,
    canDeleteDashboards: true,
    canShareDashboards: false,

    // Exports and sharing
    canExportData: true,
    canScheduleReports: false,
    canShareContent: false,

    // API access
    canUseAPI: false,
    canUseAPIRead: false,
    canUseAPIWrite: false,

    // Platform admin
    canManagePlatform: false,
    canViewAllOrgs: false,
    canManageFeatureFlags: false,
  },

  org_admin: {
    // Module access
    canAccessModules: true,
    canAccessEconomy: true,
    canAccessTrade: true,
    canAccessMarketEntry: true,
    canAccessPrices: true,
    canAccessCapital: true,
    canAccessRegulatory: true,
    canAccessSectors: true,
    canAccessAdvisor: true,

    // Utilities
    canAccessViews: true,
    canAccessDashboards: true,
    canAccessDatasets: true,
    canAccessNotifications: true,
    canAccessHelp: true,

    // Admin areas
    canAccessOrgConsole: true,
    canAccessDataConsole: false,
    canAccessAdminHub: true,

    // Org management
    canManageTeam: true,
    canManageBilling: true,
    canManageOrgSettings: true,
    canManageSecurity: true,
    canViewAuditLogs: true,

    // Data management
    canManageDataSources: false,
    canManageDataUploads: false,
    canManageDataCatalog: false,
    canManageDataPolicies: false,
    canManageDataQuality: false,
    canManageDataLineage: false,

    // Content management
    canCreateViews: true,
    canEditViews: true,
    canDeleteViews: true,
    canShareViews: true,
    canCreateDashboards: true,
    canEditDashboards: true,
    canDeleteDashboards: true,
    canShareDashboards: true,

    // Exports and sharing
    canExportData: true,
    canScheduleReports: true,
    canShareContent: true,

    // API access
    canUseAPI: true,
    canUseAPIRead: true,
    canUseAPIWrite: false,

    // Platform admin
    canManagePlatform: false,
    canViewAllOrgs: false,
    canManageFeatureFlags: false,
  },

  data_admin: {
    // Module access
    canAccessModules: true,
    canAccessEconomy: true,
    canAccessTrade: true,
    canAccessMarketEntry: true,
    canAccessPrices: true,
    canAccessCapital: true,
    canAccessRegulatory: true,
    canAccessSectors: true,
    canAccessAdvisor: true,

    // Utilities
    canAccessViews: true,
    canAccessDashboards: true,
    canAccessDatasets: true,
    canAccessNotifications: true,
    canAccessHelp: true,

    // Admin areas
    canAccessOrgConsole: false,
    canAccessDataConsole: true,
    canAccessAdminHub: true,

    // Org management
    canManageTeam: false,
    canManageBilling: false,
    canManageOrgSettings: false,
    canManageSecurity: false,
    canViewAuditLogs: true,

    // Data management
    canManageDataSources: true,
    canManageDataUploads: true,
    canManageDataCatalog: true,
    canManageDataPolicies: true,
    canManageDataQuality: true,
    canManageDataLineage: true,

    // Content management
    canCreateViews: true,
    canEditViews: true,
    canDeleteViews: true,
    canShareViews: true,
    canCreateDashboards: true,
    canEditDashboards: true,
    canDeleteDashboards: true,
    canShareDashboards: true,

    // Exports and sharing
    canExportData: true,
    canScheduleReports: true,
    canShareContent: true,

    // API access
    canUseAPI: true,
    canUseAPIRead: true,
    canUseAPIWrite: true,

    // Platform admin
    canManagePlatform: false,
    canViewAllOrgs: false,
    canManageFeatureFlags: false,
  },

  platform_admin: {
    // Module access
    canAccessModules: true,
    canAccessEconomy: true,
    canAccessTrade: true,
    canAccessMarketEntry: true,
    canAccessPrices: true,
    canAccessCapital: true,
    canAccessRegulatory: true,
    canAccessSectors: true,
    canAccessAdvisor: true,

    // Utilities
    canAccessViews: true,
    canAccessDashboards: true,
    canAccessDatasets: true,
    canAccessNotifications: true,
    canAccessHelp: true,

    // Admin areas
    canAccessOrgConsole: true,
    canAccessDataConsole: true,
    canAccessAdminHub: true,

    // Org management
    canManageTeam: true,
    canManageBilling: true,
    canManageOrgSettings: true,
    canManageSecurity: true,
    canViewAuditLogs: true,

    // Data management
    canManageDataSources: true,
    canManageDataUploads: true,
    canManageDataCatalog: true,
    canManageDataPolicies: true,
    canManageDataQuality: true,
    canManageDataLineage: true,

    // Content management
    canCreateViews: true,
    canEditViews: true,
    canDeleteViews: true,
    canShareViews: true,
    canCreateDashboards: true,
    canEditDashboards: true,
    canDeleteDashboards: true,
    canShareDashboards: true,

    // Exports and sharing
    canExportData: true,
    canScheduleReports: true,
    canShareContent: true,

    // API access
    canUseAPI: true,
    canUseAPIRead: true,
    canUseAPIWrite: true,

    // Platform admin
    canManagePlatform: true,
    canViewAllOrgs: true,
    canManageFeatureFlags: true,
  },
}

export function getRolePermissions(role: UserRole): RolePermissions {
  return ROLE_PERMISSIONS[role]
}

export function hasPermission(role: UserRole, permission: keyof RolePermissions): boolean {
  const permissions = getRolePermissions(role)
  return permissions[permission] === true
}

export function canAccessModule(role: UserRole, module: string): boolean {
  const permissions = getRolePermissions(role)
  
  switch (module) {
    case 'economy':
      return permissions.canAccessEconomy
    case 'trade':
      return permissions.canAccessTrade
    case 'market-entry':
      return permissions.canAccessMarketEntry
    case 'prices':
      return permissions.canAccessPrices
    case 'capital':
      return permissions.canAccessCapital
    case 'regulatory':
      return permissions.canAccessRegulatory
    case 'sectors':
      return permissions.canAccessSectors
    case 'advisor':
      return permissions.canAccessAdvisor
    default:
      return false
  }
}

export function canAccessAdminArea(role: UserRole, area: 'org' | 'data' | 'admin'): boolean {
  const permissions = getRolePermissions(role)
  
  switch (area) {
    case 'org':
      return permissions.canAccessOrgConsole
    case 'data':
      return permissions.canAccessDataConsole
    case 'admin':
      return permissions.canAccessAdminHub
    default:
      return false
  }
}

export function getRoleDisplayName(role: UserRole): string {
  switch (role) {
    case 'end_user':
      return 'End User'
    case 'org_admin':
      return 'Organization Admin'
    case 'data_admin':
      return 'Data Admin'
    case 'platform_admin':
      return 'Platform Admin'
    default:
      return 'Unknown Role'
  }
}

export function getRoleDescription(role: UserRole): string {
  switch (role) {
    case 'end_user':
      return 'Can access all modules, create views and dashboards, export data'
    case 'org_admin':
      return 'Can manage team, billing, org settings, and access all user features'
    case 'data_admin':
      return 'Can manage data sources, policies, quality, and access all user features'
    case 'platform_admin':
      return 'Can manage platform settings, all organizations, and access all features'
    default:
      return 'Unknown role capabilities'
  }
}
