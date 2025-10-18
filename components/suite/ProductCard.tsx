'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/products/products'
import { ArrowRight, Lock, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const router = useRouter()

  const handleProductClick = () => {
    if (product.comingSoon) return

    if (product.route) {
      router.push(product.route)
    } else {
      router.push(`/suite/${product.slug}`)
    }
  }

  const getPricingLabel = () => {
    if (product.pricingModel.includes('premium')) return 'Premium Access'
    if (product.pricingModel.includes('monthly')) return 'Subscription'
    if (product.pricingModel.includes('one-time')) return 'One-time Purchase'
    if (product.pricingModel.includes('pay-per-use')) return 'Pay-per-use'
    return 'Available'
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-200 border-slate-200 hover:border-slate-300 bg-white h-full flex flex-col">
      <CardContent className="p-4 flex flex-col h-full">
        {/* Header with icon and badges */}
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center border border-slate-200 group-hover:from-blue-50 group-hover:to-blue-100 group-hover:border-blue-200 transition-all">
            <product.icon className="w-5 h-5 text-slate-700 group-hover:text-blue-600 transition-colors" />
          </div>
          <div className="flex flex-col gap-1.5 items-end">
            {product.comingSoon && (
              <Badge variant="outline" className="border-slate-300 text-slate-600 text-[9px] font-semibold px-1.5 py-0">
                COMING SOON
              </Badge>
            )}
            <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wide">
              {product.category}
            </span>
          </div>
        </div>

        {/* Title and description */}
        <div className="mb-3 flex-grow">
          <h3 className="text-sm font-bold text-slate-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
          <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Features list - compact */}
        <div className="mb-3 space-y-1">
          {product.features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-start gap-1.5">
              <Check className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />
              <span className="text-[10px] text-slate-600 leading-tight">{feature}</span>
            </div>
          ))}
          {product.features.length > 4 && (
            <p className="text-[10px] text-blue-600 font-semibold pl-4">
              +{product.features.length - 4} more capabilities
            </p>
          )}
        </div>

        {/* Footer with pricing and CTA */}
        <div className="pt-3 border-t border-slate-100 mt-auto">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide block mb-0.5">
                Pricing
              </span>
              <span className="text-[11px] font-semibold text-slate-900">
                {getPricingLabel()}
              </span>
            </div>

            <Button
              size="sm"
              onClick={handleProductClick}
              disabled={product.comingSoon}
              variant={product.comingSoon ? "outline" : "default"}
              className={`h-8 text-[11px] font-semibold ${
                product.comingSoon
                  ? 'cursor-not-allowed border-slate-300 text-slate-400'
                  : 'bg-slate-900 hover:bg-slate-800'
              }`}
            >
              {product.comingSoon ? (
                <>
                  <Lock className="w-3 h-3 mr-1" />
                  Soon
                </>
              ) : (
                <>
                  {product.route ? 'Launch' : 'View Details'}
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
