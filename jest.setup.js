import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }
  },
}))

// Mock Framer Motion
jest.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    section: 'section',
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    p: 'p',
    button: 'button',
    form: 'form',
    input: 'input',
    textarea: 'textarea',
    select: 'select',
    option: 'option',
  },
  AnimatePresence: ({ children }) => children,
}))

// Mock Lucide React icons
jest.mock('lucide-react', () => ({
  Search: () => 'SearchIcon',
  Sparkles: () => 'SparklesIcon',
  Database: () => 'DatabaseIcon',
  Map: () => 'MapIcon',
  Globe: () => 'GlobeIcon',
  Wrench: () => 'WrenchIcon',
  ChevronDown: () => 'ChevronDownIcon',
  Rocket: () => 'RocketIcon',
  User: () => 'UserIcon',
  BarChart3: () => 'BarChart3Icon',
  Brain: () => 'BrainIcon',
  Users: () => 'UsersIcon',
  TrendingUp: () => 'TrendingUpIcon',
  Shield: () => 'ShieldIcon',
  Zap: () => 'ZapIcon',
  CheckCircle: () => 'CheckCircleIcon',
  Menu: () => 'MenuIcon',
  X: () => 'XIcon',
}))

// Mock fetch
global.fetch = jest.fn()

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock crypto for CSRF tokens
Object.defineProperty(global, 'crypto', {
  value: {
    getRandomValues: (arr) => arr.map(() => Math.floor(Math.random() * 256)),
  },
})
