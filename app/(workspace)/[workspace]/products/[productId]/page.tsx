'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { getProductBySlug, UserType } from '@/lib/products/products'
import { PageSkeleton } from '@/components/loading/PageSkeleton'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Lock } from 'lucide-react'

type Params = {
  workspace: string
  productId: string
}

export default function ProductPage() {
  const params = useParams() as Params
  const router = useRouter()
  const [userType, setUserType] = useState<UserType | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUserType = sessionStorage.getItem('arqam_user_type') as UserType
    setUserType(storedUserType)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <PageSkeleton />
  }

  const product = getProductBySlug(params.productId)

  if (!product) {
    return (
      <div className="flex items-center justify-center h-full min-h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-4">
            The product "{params.productId}" could not be found.
          </p>
          <Button onClick={() => router.push(`/${params.workspace}/dashboards`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Workspace
          </Button>
        </div>
      </div>
    )
  }

  // Check if user type matches product
  if (userType && !product.userTypes.includes(userType)) {
    return (
      <div className="flex items-center justify-center h-full min-h-screen bg-gray-50">
        <div className="text-center max-w-md">
          <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600 mb-4">
            This product is not available for your account type.
          </p>
          <Button onClick={() => router.push(`/${params.workspace}/dashboards`)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Workspace
          </Button>
        </div>
      </div>
    )
  }

  const Icon = product.icon

  return (
    <div className="h-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Product Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Icon className="h-8 w-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                {product.isPremium && (
                  <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                    Premium
                  </Badge>
                )}
                {product.comingSoon && (
                  <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                    Coming Soon
                  </Badge>
                )}
              </div>
              <p className="text-lg text-gray-600 mb-4">{product.tagline}</p>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
          <div className="grid grid-cols-2 gap-3">
            {product.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-green-600 text-xs">✓</span>
                </div>
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h2>
          <div className="flex gap-3">
            {product.pricingModel.map((model, idx) => (
              <Badge key={idx} variant="outline" className="text-sm py-1 px-3">
                {model === 'one-time' && 'One-time Purchase'}
                {model === 'monthly' && 'Monthly Subscription'}
                {model === 'premium' && 'Premium Tier'}
                {model === 'pay-per-use' && 'Pay Per Use'}
              </Badge>
            ))}
          </div>
        </div>

        {/* Coming Soon State */}
        {product.comingSoon && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mt-6 text-center">
            <h3 className="text-lg font-semibold text-orange-900 mb-2">
              This product is coming soon!
            </h3>
            <p className="text-orange-700">
              We're working hard to bring this product to you. Check back soon for updates.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
