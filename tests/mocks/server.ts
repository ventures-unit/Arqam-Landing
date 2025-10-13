import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

// Mock API handlers
export const handlers = [
  // Auth endpoints
  http.post('/api/auth/signup', () => {
    return HttpResponse.json({
      user: {
        id: '1',
        email: 'test@example.com',
        full_name: 'Test User'
      }
    })
  }),

  http.post('/api/auth/login', () => {
    return HttpResponse.json({
      user: {
        id: '1',
        email: 'test@example.com',
        full_name: 'Test User'
      }
    })
  }),

  // Views endpoints
  http.get('/api/views', () => {
    return HttpResponse.json({
      views: [
        {
          id: '1',
          name: 'Test View',
          module: 'economy',
          created_at: new Date().toISOString()
        }
      ]
    })
  }),

  http.post('/api/views', () => {
    return HttpResponse.json({
      view: {
        id: '2',
        name: 'New View',
        module: 'economy',
        created_at: new Date().toISOString()
      }
    })
  }),

  // Dashboards endpoints
  http.get('/api/dashboards', () => {
    return HttpResponse.json({
      dashboards: [
        {
          id: '1',
          name: 'Test Dashboard',
          created_at: new Date().toISOString()
        }
      ]
    })
  }),

  // Export endpoints
  http.post('/api/export/csv', () => {
    return HttpResponse.json({
      downloadUrl: '/api/download/test.csv'
    })
  }),

  http.post('/api/export/png', () => {
    return HttpResponse.json({
      downloadUrl: '/api/download/test.png'
    })
  }),

  // Entitlements endpoints
  http.get('/api/entitlements', () => {
    return HttpResponse.json({
      plan: 'free',
      entitlements: {
        views: { max: 3, unlimited: false },
        dashboards: { max: 1, unlimited: false },
        exports: { rows: { max: 1000, unlimited: false } }
      }
    })
  })
]

export const server = setupServer(...handlers)
