'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { getCounterData, formatCount, getProgressPercentage } from '@/lib/counter'

interface DynamicCounterProps {
  className?: string
}

export default function DynamicCounter({ className = '' }: DynamicCounterProps) {
  const [counterData, setCounterData] = useState({
    currentCount: 500,
    maxCount: 750,
    isNearLimit: false,
    isAtLimit: false
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCounterData = async () => {
      try {
        const data = await getCounterData()
        setCounterData(data)
      } catch (error) {
        console.error('Error fetching counter data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCounterData()

    // Refresh counter every 30 seconds
    const interval = setInterval(fetchCounterData, 30000)
    return () => clearInterval(interval)
  }, [])

  const progressPercentage = getProgressPercentage(counterData.currentCount)

  if (isLoading) {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-2xl md:text-4xl font-bold text-blue-600 mb-1 md:mb-2">500+</div>
        <div className="text-gray-600 font-medium text-sm md:text-base">Early Users</div>
      </div>
    )
  }

  return (
    <div className={`text-center ${className}`}>
      <motion.div 
        key={counterData.currentCount}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className={`text-2xl md:text-4xl font-bold mb-1 md:mb-2 ${
          counterData.isAtLimit 
            ? 'text-red-600' 
            : counterData.isNearLimit 
            ? 'text-orange-600' 
            : 'text-blue-600'
        }`}
      >
        {formatCount(counterData.currentCount)}
      </motion.div>
      <div className="text-gray-600 font-medium text-sm md:text-base">Early Users</div>
      
      {/* Progress bar */}
      <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
        <motion.div
          className={`h-1.5 rounded-full ${
            counterData.isAtLimit 
              ? 'bg-red-500' 
              : counterData.isNearLimit 
              ? 'bg-orange-500' 
              : 'bg-blue-500'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
      
      {/* Status message */}
      {counterData.isAtLimit ? (
        <div className="mt-2 text-xs text-red-600 font-medium">
          Early Access Full!
        </div>
      ) : counterData.isNearLimit ? (
        <div className="mt-2 text-xs text-orange-600 font-medium">
          {750 - counterData.currentCount} spots left
        </div>
      ) : (
        <div className="mt-2 text-xs text-gray-500">
          Limited to 750 people
        </div>
      )}
    </div>
  )
}
