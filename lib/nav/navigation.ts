import { UserRole } from '@/lib/rbac/roles'

export interface NavItem {
  id: string
  label: string
  href: string
  icon: string
  description?: string
  badge?: string
  roles?: UserRole[]
  permissions?: string[]
  children?: NavItem[]
}

export interface NavSection {
  id: string
  label: string
  items: NavItem[]
  roles?: UserRole[]
  permissions?: string[]
}

// Main navigation sections
export const navigation: NavSection[] = [
  {
    id: 'modules',
    label: 'Modules',
    items: [
      {
        id: 'economy',
        label: 'Economy',
        href: '/economy',
        icon: 'TrendingUp',
        description: 'GDP, inflation, employment metrics',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      },
      {
        id: 'trade',
        label: 'Trade',
        href: '/trade',
        icon: 'Globe',
        description: 'Import/export, trade balance, tariffs',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      },
      {
        id: 'market-entry',
        label: 'Market Entry',
        href: '/market-entry',
        icon: 'Target',
        description: 'Market sizing, regulations, barriers',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      },
      {
        id: 'business-builder',
        label: 'Business Builder',
        href: '/business-builder',
        icon: 'Rocket',
        description: 'Build data-driven business plans',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      },
      {
        id: 'prices',
        label: 'Price Monitor',
        href: '/prices',
        icon: 'DollarSign',
        description: 'Price monitoring, trends, comparisons',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      },
      {
        id: 'capital',
        label: 'Capital Access',
        href: '/capital',
        icon: 'Banknote',
        description: 'Funding sources, interest rates, investment',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      },
      {
        id: 'regulatory',
        label: 'Regulatory Access',
        href: '/regulatory',
        icon: 'Shield',
        description: 'Compliance, policy changes, requirements',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      },
      {
        id: 'sectors',
        label: 'Sector Intelligence',
        href: '/sectors',
        icon: 'BarChart3',
        description: 'Sector performance, trends, analysis',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      },
      {
        id: 'advisor',
        label: 'Advisor',
        href: '/advisor',
        icon: 'Bot',
        description: 'AI-powered insights and recommendations',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      }
    ]
  },
  {
    id: 'utilities',
    label: 'Utilities',
    items: [
      {
        id: 'views',
        label: 'Saved Views',
        href: '/views',
        icon: 'Bookmark',
        description: 'Manage your saved views',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      },
      {
        id: 'dashboards',
        label: 'Dashboards',
        href: '/dashboards',
        icon: 'Layout',
        description: 'Create and manage dashboards',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      },
      {
        id: 'datasets',
        label: 'Datasets',
        href: '/datasets',
        icon: 'Database',
        description: 'Browse available datasets',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin'],
        badge: 'Optional'
      },
      {
        id: 'notifications',
        label: 'Notifications',
        href: '/notifications',
        icon: 'Bell',
        description: 'View notifications and alerts',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      },
      {
        id: 'help',
        label: 'Help',
        href: '/help',
        icon: 'HelpCircle',
        description: 'Documentation and support',
        roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
      }
    ]
  }
]

// Bottom dock items
export const bottomDock: NavItem[] = [
  {
    id: 'workspaces',
    label: 'Workspace Switcher',
    href: '/workspaces',
    icon: 'Layers',
    description: 'Switch between workspaces',
    roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/settings/profile',
    icon: 'Settings',
    description: 'User preferences and settings',
    roles: ['end_user', 'org_admin', 'data_admin', 'platform_admin']
  },
  {
    id: 'admin',
    label: 'Admin Hub',
    href: '/admin',
    icon: 'Shield',
    description: 'Organization and data administration',
    roles: ['org_admin', 'data_admin', 'platform_admin']
  }
]

// Admin console navigation
export const adminConsole: NavSection[] = [
  {
    id: 'org',
    label: 'Organization Console',
    roles: ['org_admin', 'platform_admin'],
    items: [
      {
        id: 'org-overview',
        label: 'Overview',
        href: '/org/overview',
        icon: 'BarChart',
        description: 'Organization statistics and usage',
        roles: ['org_admin', 'platform_admin']
      },
      {
        id: 'org-team',
        label: 'Team & Roles',
        href: '/org/team',
        icon: 'Users',
        description: 'Manage team members and roles',
        roles: ['org_admin', 'platform_admin']
      },
      {
        id: 'org-billing',
        label: 'Billing',
        href: '/org/billing',
        icon: 'CreditCard',
        description: 'Manage subscription and billing',
        roles: ['org_admin', 'platform_admin']
      },
      {
        id: 'org-settings',
        label: 'Branding & Settings',
        href: '/org/settings',
        icon: 'Palette',
        description: 'Organization branding and preferences',
        roles: ['org_admin', 'platform_admin']
      },
      {
        id: 'org-security',
        label: 'Security',
        href: '/org/security',
        icon: 'Lock',
        description: 'Security policies and MFA settings',
        roles: ['org_admin', 'platform_admin']
      },
      {
        id: 'org-audit',
        label: 'Audit Logs',
        href: '/org/audit',
        icon: 'FileText',
        description: 'View audit logs and activity',
        roles: ['org_admin', 'platform_admin']
      }
    ]
  },
  {
    id: 'data',
    label: 'Data Console',
    roles: ['data_admin', 'platform_admin'],
    items: [
      {
        id: 'data-sources',
        label: 'Data Sources',
        href: '/data/sources',
        icon: 'Database',
        description: 'Manage data connectors and sources',
        roles: ['data_admin', 'platform_admin']
      },
      {
        id: 'data-uploads',
        label: 'Data Uploads',
        href: '/data/uploads',
        icon: 'Upload',
        description: 'Upload and manage data files',
        roles: ['data_admin', 'platform_admin']
      },
      {
        id: 'data-catalog',
        label: 'Data Catalog',
        href: '/data/catalog',
        icon: 'Grid',
        description: 'Browse and manage datasets',
        roles: ['data_admin', 'platform_admin']
      },
      {
        id: 'data-policies',
        label: 'Data Policies',
        href: '/data/policies',
        icon: 'Shield',
        description: 'Manage RLS and FLS policies',
        roles: ['data_admin', 'platform_admin']
      },
      {
        id: 'data-quality',
        label: 'Data Quality',
        href: '/data/quality',
        icon: 'CheckCircle',
        description: 'Monitor data quality metrics',
        roles: ['data_admin', 'platform_admin']
      },
      {
        id: 'data-lineage',
        label: 'Data Lineage',
        href: '/data/lineage',
        icon: 'GitBranch',
        description: 'Visualize data lineage and dependencies',
        roles: ['data_admin', 'platform_admin']
      }
    ]
  }
]

// Command palette items
export const commandPaletteItems: NavItem[] = [
  // Modules
  ...navigation[0].items,
  // Utilities
  ...navigation[1].items,
  // Admin items
  ...adminConsole.flatMap(section => section.items),
  // Bottom dock
  ...bottomDock
]

// Keyboard shortcuts
export const keyboardShortcuts = {
  'cmd+k': 'Open command palette',
  'cmd+/': 'Show keyboard shortcuts',
  'g e': 'Go to Economy',
  'g t': 'Go to Trade',
  'g m': 'Go to Market Entry',
  'g p': 'Go to Price Monitor',
  'g c': 'Go to Capital Access',
  'g r': 'Go to Regulatory Access',
  'g s': 'Go to Sector Intelligence',
  'g a': 'Go to Advisor',
  'g v': 'Go to Saved Views',
  'g d': 'Go to Dashboards',
  'g n': 'Go to Notifications',
  'g h': 'Go to Help',
  'g w': 'Go to Workspaces',
  'g ,': 'Go to Settings',
  'g admin': 'Go to Admin Hub'
}

// Helper functions
export function getNavItemByHref(href: string): NavItem | null {
  const allItems = [
    ...navigation.flatMap(section => section.items),
    ...adminConsole.flatMap(section => section.items),
    ...bottomDock
  ]
  
  return allItems.find(item => item.href === href) || null
}

export function getNavItemsForRole(role: UserRole): {
  modules: NavItem[]
  utilities: NavItem[]
  admin: NavItem[]
  bottomDock: NavItem[]
} {
  return {
    modules: navigation[0].items.filter(item => 
      !item.roles || item.roles.includes(role)
    ),
    utilities: navigation[1].items.filter(item => 
      !item.roles || item.roles.includes(role)
    ),
    admin: adminConsole.flatMap(section => 
      section.items.filter(item => 
        !item.roles || item.roles.includes(role)
      )
    ),
    bottomDock: bottomDock.filter(item => 
      !item.roles || item.roles.includes(role)
    )
  }
}

export function getCommandPaletteItemsForRole(role: UserRole): NavItem[] {
  return commandPaletteItems.filter(item => 
    !item.roles || item.roles.includes(role)
  )
}
