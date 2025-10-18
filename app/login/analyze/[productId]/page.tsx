'use client'

import { notFound } from 'next/navigation'
import EconomicForecasterPage from '@/app/(suite)/products/economic-forecaster/page'
import InvestmentAdvisorPage from '@/app/(suite)/products/investment-advisor/page'

export default function AnalyzeProductPage({ params }: { params: { productId: string } }) {
  const { productId } = params

  switch (productId) {
    case 'economic-forecaster':
      return <EconomicForecasterPage />
    case 'investment-advisor':
      return <InvestmentAdvisorPage />
    default:
      return (
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {productId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h2>
              <p className="text-gray-600">This product is under development</p>
            </div>
          </div>
        </div>
      )
  }
}
