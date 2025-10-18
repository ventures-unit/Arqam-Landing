export function IntelligenceModuleSkeleton() {
  return (
    <div className="p-6 max-w-7xl mx-auto animate-pulse">
      {/* Header Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="h-8 w-64 bg-gray-200 rounded"></div>
          <div className="flex gap-2">
            <div className="h-9 w-28 bg-gray-200 rounded"></div>
            <div className="h-9 w-28 bg-gray-200 rounded"></div>
            <div className="h-9 w-28 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <div className="flex gap-3 mb-4">
          <div className="h-10 flex-1 bg-gray-200 rounded"></div>
          <div className="h-10 w-40 bg-gray-200 rounded"></div>
          <div className="h-10 w-40 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
            <div className="h-8 w-32 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white border border-gray-200 rounded-lg">
        {/* Tab Headers */}
        <div className="border-b border-gray-200 px-4">
          <div className="flex gap-4 py-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-6 w-24 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Chart Placeholder */}
          <div className="h-96 bg-gray-100 rounded-lg mb-6"></div>

          {/* Table Header */}
          <div className="flex gap-4 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-1 h-4 bg-gray-200 rounded"></div>
            ))}
          </div>

          {/* Table Rows */}
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex gap-4 mb-3">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="flex-1 h-4 bg-gray-100 rounded"></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
