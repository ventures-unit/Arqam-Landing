/**
 * Dynamic counter utilities for the Arqam landing page
 * Handles real-time signup count updates
 */

import { supabase } from './supabase'

export interface CounterData {
  currentCount: number
  maxCount: number
  isNearLimit: boolean
  isAtLimit: boolean
}

const BASE_COUNT = 500
const MAX_EARLY_ACCESS = 750

/**
 * Get the current signup count from the database
 */
export async function getSignupCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('arqam_signups')
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Error fetching signup count:', error)
      return BASE_COUNT
    }

    return (count || 0) + BASE_COUNT
  } catch (error) {
    console.error('Error in getSignupCount:', error)
    return BASE_COUNT
  }
}

/**
 * Get counter data with status information
 */
export async function getCounterData(): Promise<CounterData> {
  const currentCount = await getSignupCount()
  const isNearLimit = currentCount >= MAX_EARLY_ACCESS * 0.8 // 80% of limit
  const isAtLimit = currentCount >= MAX_EARLY_ACCESS

  return {
    currentCount,
    maxCount: MAX_EARLY_ACCESS,
    isNearLimit,
    isAtLimit
  }
}

/**
 * Format number with proper suffix
 */
export function formatCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K+`
  }
  return `${count}+`
}

/**
 * Get progress percentage for the early access limit
 */
export function getProgressPercentage(currentCount: number): number {
  return Math.min((currentCount / MAX_EARLY_ACCESS) * 100, 100)
}
