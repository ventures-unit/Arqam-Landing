'use client'

import { useEffect, useState } from 'react'
import { Monitor, Smartphone } from 'lucide-react'

export function MobileBlocker({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkIfMobile = () => {
      // Check if device is mobile using user agent and screen size
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isMobileScreen = window.innerWidth < 1024 // Less than 1024px width
      
      // Consider it mobile if user agent indicates mobile OR screen is too small
      const isMobileDevice = isMobileUserAgent || isMobileScreen
      
      setIsMobile(isMobileDevice)
      setIsChecking(false)
    }

    checkIfMobile()

    // Re-check on window resize
    const handleResize = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileUserAgent = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isMobileScreen = window.innerWidth < 1024
      setIsMobile(isMobileUserAgent || isMobileScreen)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  if (isChecking) {
    return null // Or a minimal loader
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center">
            {/* Icon Animation */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <Smartphone className="w-16 h-16 text-red-500 animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 animate-fade-in-delay">
                <div className="absolute w-20 h-20 border-4 border-red-500/30 rounded-full animate-ping" />
              </div>
            </div>

            <div className="mt-20 mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
                <Monitor className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Message */}
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Desktop Required
            </h1>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Arqam - Data Products Suite is optimized for desktop and laptop computers for the best experience.
            </p>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900 font-medium">
                Please access this platform from:
              </p>
              <ul className="mt-2 text-sm text-blue-800 space-y-1">
                <li>💻 Desktop Computer</li>
                <li>🖥️ Laptop</li>
                <li>📊 Large Screen (1024px+)</li>
              </ul>
            </div>

            {/* Additional Info */}
            <div className="text-xs text-gray-500 border-t pt-4">
              <p>Screen size detected: {typeof window !== 'undefined' ? window.innerWidth : 0}px</p>
              <p className="mt-1">Minimum required: 1024px</p>
            </div>

            {/* Override Button (for testing) */}
            <button
              onClick={() => setIsMobile(false)}
              className="mt-4 text-xs text-gray-400 hover:text-gray-600 underline"
            >
              Continue anyway (not recommended)
            </button>
          </div>

          {/* Branding */}
          <div className="mt-6 text-center">
            <p className="text-white/80 text-sm">
              Arqam - Data Products Suite
            </p>
            <p className="text-white/60 text-xs mt-1">
              Professional business intelligence requires a professional display
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

