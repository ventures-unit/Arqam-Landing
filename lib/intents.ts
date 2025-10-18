import { UserIntent } from './products/products'

export interface IntentMetadata {
  id: UserIntent
  label: string
  description: string
  heroMessage: string
  color: string
  gradientFrom: string
  gradientTo: string
}

export const INTENTS: Record<UserIntent, IntentMetadata> = {
  analyze: {
    id: 'analyze',
    label: 'Analyze',
    description: 'Data-driven insights',
    heroMessage: 'Make data-driven decisions with real-time intelligence',
    color: 'blue',
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-blue-600'
  },
  explore: {
    id: 'explore',
    label: 'Explore',
    description: 'Discover opportunities',
    heroMessage: 'Discover opportunities across markets and sectors',
    color: 'purple',
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-purple-600'
  },
  build: {
    id: 'build',
    label: 'Build',
    description: 'Plan & execute',
    heroMessage: 'Plan and execute your strategy with confidence',
    color: 'emerald',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-emerald-600'
  }
}

export function getIntentMetadata(intent: UserIntent): IntentMetadata {
  return INTENTS[intent]
}
