import { createClient } from '@supabase/supabase-js'
import { faker } from '@faker-js/faker'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Helper function to generate mock data
function generateMockData() {
  return {
    // Free plan org
    freeOrg: {
      name: 'StartupCo',
      slug: 'startupco',
      plan: 'free' as const,
      settings: {
        timezone: 'UTC',
        dateFormat: 'MM/DD/YYYY',
        currency: 'USD'
      },
      branding: {
        logo: null,
        primaryColor: '#3b82f6',
        secondaryColor: '#1e40af'
      }
    },
    
    // Pro plan org
    proOrg: {
      name: 'GrowthCorp',
      slug: 'growthcorp',
      plan: 'pro' as const,
      settings: {
        timezone: 'America/New_York',
        dateFormat: 'DD/MM/YYYY',
        currency: 'USD'
      },
      branding: {
        logo: null,
        primaryColor: '#10b981',
        secondaryColor: '#059669'
      }
    },
    
    // Enterprise plan org
    enterpriseOrg: {
      name: 'Enterprise Solutions Inc',
      slug: 'enterprise-solutions',
      plan: 'enterprise' as const,
      settings: {
        timezone: 'UTC',
        dateFormat: 'YYYY-MM-DD',
        currency: 'USD'
      },
      branding: {
        logo: null,
        primaryColor: '#8b5cf6',
        secondaryColor: '#7c3aed'
      }
    }
  }
}

async function seedDatabase() {
  console.log('🌱 Starting database seeding...')
  
  const mockData = generateMockData()
  
  try {
    // Create organizations
    console.log('Creating organizations...')
    const { data: freeOrg, error: freeOrgError } = await supabase
      .from('orgs')
      .insert(mockData.freeOrg)
      .select()
      .single()
    
    if (freeOrgError) throw freeOrgError
    
    const { data: proOrg, error: proOrgError } = await supabase
      .from('orgs')
      .insert(mockData.proOrg)
      .select()
      .single()
    
    if (proOrgError) throw proOrgError
    
    const { data: enterpriseOrg, error: enterpriseOrgError } = await supabase
      .from('orgs')
      .insert(mockData.enterpriseOrg)
      .select()
      .single()
    
    if (enterpriseOrgError) throw enterpriseOrgError
    
    // Create workspaces for each org
    console.log('Creating workspaces...')
    const workspaces = [
      { name: 'Main Workspace', org_id: freeOrg.id },
      { name: 'Analytics Hub', org_id: proOrg.id },
      { name: 'Research Lab', org_id: proOrg.id },
      { name: 'Global Operations', org_id: enterpriseOrg.id },
      { name: 'Regional Analysis', org_id: enterpriseOrg.id },
      { name: 'Strategic Planning', org_id: enterpriseOrg.id }
    ]
    
    const { data: createdWorkspaces, error: workspacesError } = await supabase
      .from('workspaces')
      .insert(workspaces)
      .select()
    
    if (workspacesError) throw workspacesError
    
    // Create users for each org
    console.log('Creating users...')
    const users = [
      // Free org users
      {
        email: 'admin@startupco.com',
        full_name: 'Alice Johnson',
        role: 'org_admin' as const,
        org_id: freeOrg.id
      },
      {
        email: 'analyst@startupco.com',
        full_name: 'Bob Smith',
        role: 'end_user' as const,
        org_id: freeOrg.id
      },
      
      // Pro org users
      {
        email: 'ceo@growthcorp.com',
        full_name: 'Carol Davis',
        role: 'org_admin' as const,
        org_id: proOrg.id
      },
      {
        email: 'data@growthcorp.com',
        full_name: 'David Wilson',
        role: 'data_admin' as const,
        org_id: proOrg.id
      },
      {
        email: 'analyst1@growthcorp.com',
        full_name: 'Eva Brown',
        role: 'end_user' as const,
        org_id: proOrg.id
      },
      {
        email: 'analyst2@growthcorp.com',
        full_name: 'Frank Miller',
        role: 'end_user' as const,
        org_id: proOrg.id
      },
      
      // Enterprise org users
      {
        email: 'admin@enterprise.com',
        full_name: 'Grace Lee',
        role: 'org_admin' as const,
        org_id: enterpriseOrg.id
      },
      {
        email: 'data@enterprise.com',
        full_name: 'Henry Chen',
        role: 'data_admin' as const,
        org_id: enterpriseOrg.id
      },
      {
        email: 'analyst@enterprise.com',
        full_name: 'Ivy Rodriguez',
        role: 'end_user' as const,
        org_id: enterpriseOrg.id
      }
    ]
    
    const { data: createdUsers, error: usersError } = await supabase
      .from('users')
      .insert(users)
      .select()
    
    if (usersError) throw usersError
    
    // Create workspace memberships
    console.log('Creating workspace memberships...')
    const memberships = [
      // Free org - all users in main workspace
      { workspace_id: createdWorkspaces[0].id, user_id: createdUsers[0].id, role: 'org_admin' as const },
      { workspace_id: createdWorkspaces[0].id, user_id: createdUsers[1].id, role: 'end_user' as const },
      
      // Pro org - users in both workspaces
      { workspace_id: createdWorkspaces[1].id, user_id: createdUsers[2].id, role: 'org_admin' as const },
      { workspace_id: createdWorkspaces[1].id, user_id: createdUsers[3].id, role: 'data_admin' as const },
      { workspace_id: createdWorkspaces[1].id, user_id: createdUsers[4].id, role: 'end_user' as const },
      { workspace_id: createdWorkspaces[2].id, user_id: createdUsers[2].id, role: 'org_admin' as const },
      { workspace_id: createdWorkspaces[2].id, user_id: createdUsers[3].id, role: 'data_admin' as const },
      { workspace_id: createdWorkspaces[2].id, user_id: createdUsers[5].id, role: 'end_user' as const },
      
      // Enterprise org - users in all workspaces
      { workspace_id: createdWorkspaces[3].id, user_id: createdUsers[6].id, role: 'org_admin' as const },
      { workspace_id: createdWorkspaces[3].id, user_id: createdUsers[7].id, role: 'data_admin' as const },
      { workspace_id: createdWorkspaces[3].id, user_id: createdUsers[8].id, role: 'end_user' as const },
      { workspace_id: createdWorkspaces[4].id, user_id: createdUsers[6].id, role: 'org_admin' as const },
      { workspace_id: createdWorkspaces[4].id, user_id: createdUsers[7].id, role: 'data_admin' as const },
      { workspace_id: createdWorkspaces[4].id, user_id: createdUsers[8].id, role: 'end_user' as const },
      { workspace_id: createdWorkspaces[5].id, user_id: createdUsers[6].id, role: 'org_admin' as const },
      { workspace_id: createdWorkspaces[5].id, user_id: createdUsers[7].id, role: 'data_admin' as const },
      { workspace_id: createdWorkspaces[5].id, user_id: createdUsers[8].id, role: 'end_user' as const }
    ]
    
    const { error: membershipsError } = await supabase
      .from('workspace_members')
      .insert(memberships)
    
    if (membershipsError) throw membershipsError
    
    // Create subscriptions
    console.log('Creating subscriptions...')
    const subscriptions = [
      {
        org_id: freeOrg.id,
        plan: 'free' as const,
        status: 'active' as const,
        current_period_start: new Date(),
        current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
      },
      {
        org_id: proOrg.id,
        plan: 'pro' as const,
        status: 'active' as const,
        current_period_start: new Date(),
        current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      },
      {
        org_id: enterpriseOrg.id,
        plan: 'enterprise' as const,
        status: 'active' as const,
        current_period_start: new Date(),
        current_period_end: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
      }
    ]
    
    const { error: subscriptionsError } = await supabase
      .from('subscriptions')
      .insert(subscriptions)
    
    if (subscriptionsError) throw subscriptionsError
    
    // Create sample datasets
    console.log('Creating sample datasets...')
    const datasets = [
      {
        name: 'Economic Indicators',
        description: 'GDP, inflation, and employment data',
        org_id: freeOrg.id,
        workspace_id: createdWorkspaces[0].id,
        source_type: 'csv' as const,
        row_count: 1000,
        schema: {
          columns: [
            { name: 'date', type: 'date' },
            { name: 'gdp', type: 'number' },
            { name: 'inflation', type: 'number' },
            { name: 'unemployment', type: 'number' }
          ]
        }
      },
      {
        name: 'Trade Data',
        description: 'Import/export statistics by country',
        org_id: proOrg.id,
        workspace_id: createdWorkspaces[1].id,
        source_type: 'api' as const,
        row_count: 5000,
        schema: {
          columns: [
            { name: 'country', type: 'string' },
            { name: 'imports', type: 'number' },
            { name: 'exports', type: 'number' },
            { name: 'balance', type: 'number' }
          ]
        }
      }
    ]
    
    const { error: datasetsError } = await supabase
      .from('datasets')
      .insert(datasets)
    
    if (datasetsError) throw datasetsError
    
    // Create sample views
    console.log('Creating sample views...')
    const views = [
      {
        id: 'view-1',
        name: 'GDP Trends',
        description: 'Quarterly GDP growth analysis',
        module: 'economy',
        filters: { country: 'US', period: 'quarterly' },
        chart_spec: { type: 'line', x: 'date', y: 'gdp' },
        org_id: freeOrg.id,
        workspace_id: createdWorkspaces[0].id,
        created_by: createdUsers[0].id,
        is_public: false
      },
      {
        id: 'view-2',
        name: 'Trade Balance by Country',
        description: 'Monthly trade balance comparison',
        module: 'trade',
        filters: { period: 'monthly' },
        chart_spec: { type: 'bar', x: 'country', y: 'balance' },
        org_id: proOrg.id,
        workspace_id: createdWorkspaces[1].id,
        created_by: createdUsers[2].id,
        is_public: true
      }
    ]
    
    const { error: viewsError } = await supabase
      .from('views')
      .insert(views)
    
    if (viewsError) throw viewsError
    
    // Create sample dashboards
    console.log('Creating sample dashboards...')
    const dashboards = [
      {
        name: 'Executive Dashboard',
        description: 'High-level metrics and KPIs',
        layout: [
          { i: '1', x: 0, y: 0, w: 6, h: 4 },
          { i: '2', x: 6, y: 0, w: 6, h: 4 }
        ],
        org_id: proOrg.id,
        workspace_id: createdWorkspaces[1].id,
        created_by: createdUsers[2].id,
        is_public: false
      }
    ]
    
    const { error: dashboardsError } = await supabase
      .from('dashboards')
      .insert(dashboards)
    
    if (dashboardsError) throw dashboardsError
    
    // Create feature flags
    console.log('Creating feature flags...')
    const featureFlags = [
      { name: 'scheduler_enabled', description: 'Enable scheduled reports', is_enabled: false, org_id: freeOrg.id },
      { name: 'scheduler_enabled', description: 'Enable scheduled reports', is_enabled: true, org_id: proOrg.id },
      { name: 'scheduler_enabled', description: 'Enable scheduled reports', is_enabled: true, org_id: enterpriseOrg.id },
      { name: 'api_enabled', description: 'Enable API access', is_enabled: false, org_id: freeOrg.id },
      { name: 'api_enabled', description: 'Enable API access', is_enabled: true, org_id: proOrg.id },
      { name: 'api_enabled', description: 'Enable API access', is_enabled: true, org_id: enterpriseOrg.id },
      { name: 'sso_enabled', description: 'Enable SSO', is_enabled: false, org_id: freeOrg.id },
      { name: 'sso_enabled', description: 'Enable SSO', is_enabled: false, org_id: proOrg.id },
      { name: 'sso_enabled', description: 'Enable SSO', is_enabled: true, org_id: enterpriseOrg.id }
    ]
    
    const { error: featureFlagsError } = await supabase
      .from('feature_flags')
      .insert(featureFlags)
    
    if (featureFlagsError) throw featureFlagsError
    
    // Create sample audit logs
    console.log('Creating sample audit logs...')
    const auditLogs = [
      {
        user_id: createdUsers[0].id,
        org_id: freeOrg.id,
        workspace_id: createdWorkspaces[0].id,
        action: 'user_login' as const,
        details: { ip: '192.168.1.1', user_agent: 'Mozilla/5.0...' }
      },
      {
        user_id: createdUsers[2].id,
        org_id: proOrg.id,
        workspace_id: createdWorkspaces[1].id,
        action: 'view_created' as const,
        resource_type: 'view',
        resource_id: views[1].id,
        details: { view_name: 'Trade Balance by Country' }
      }
    ]
    
    const { error: auditLogsError } = await supabase
      .from('audits')
      .insert(auditLogs)
    
    if (auditLogsError) throw auditLogsError
    
    console.log('✅ Database seeding completed successfully!')
    console.log('\n📊 Created:')
    console.log('- 3 organizations (Free, Pro, Enterprise)')
    console.log('- 6 workspaces')
    console.log('- 9 users with different roles')
    console.log('- 2 sample datasets')
    console.log('- 2 sample views')
    console.log('- 1 sample dashboard')
    console.log('- 9 feature flags')
    console.log('- 2 sample audit logs')
    
    console.log('\n🔑 Test credentials:')
    console.log('Free Org: admin@startupco.com / analyst@startupco.com')
    console.log('Pro Org: ceo@growthcorp.com / data@growthcorp.com')
    console.log('Enterprise Org: admin@enterprise.com / data@enterprise.com')
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

// Run the seeding
if (require.main === module) {
  seedDatabase()
}

export { seedDatabase }
