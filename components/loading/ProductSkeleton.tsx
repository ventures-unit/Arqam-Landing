export function ProductSkeleton() {
  return (
    <div className="p-6 max-w-7xl mx-auto animate-pulse">
      {/* Hero Section */}
      <div className="mb-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-gray-200"></div>
          <div className="flex-1">
            <div className="h-8 w-64 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-full max-w-2xl bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Section Title */}
      <div className="mb-3">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <div className="h-3 w-24 bg-gray-200 rounded"></div>
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-20 bg-gray-200 rounded mb-1"></div>
            <div className="h-3 w-16 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Section Title */}
      <div className="mb-3">
        <div className="h-4 w-32 bg-gray-200 rounded"></div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[1, 2].map((i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-7 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 rounded-lg border border-gray-200 p-4">
        <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i}>
              <div className="h-3 w-32 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
