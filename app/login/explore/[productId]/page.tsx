'use client'

export default function ExploreProductPage({ params }: { params: { productId: string } }) {
  const { productId } = params

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
