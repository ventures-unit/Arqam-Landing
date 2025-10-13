'use client'

import { Skeleton } from "@/components/ui/skeleton"

export function PageSkeleton() {
  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
      {/* Left Panel Skeleton */}
      <div className="bg-white border-r border-gray-200 w-64 flex-shrink-0 animate-fade-in">
        <div className="px-2 py-1.5 border-b border-gray-200">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="p-2 space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-1" style={{ animationDelay: `${i * 50}ms` }}>
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col animate-fade-in" style={{ animationDelay: '100ms' }}>
        {/* Header Skeleton */}
        <div className="bg-white border-b border-gray-200 px-3 py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-20" />
            ))}
          </div>
        </div>

        {/* Content Area Skeleton */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
          {/* Metric Cards Skeleton */}
          <div className="grid grid-cols-6 gap-2 animate-fade-in" style={{ animationDelay: '200ms' }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-2 border border-gray-200" style={{ animationDelay: `${200 + i * 50}ms` }}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>

          {/* Chart Skeleton */}
          <div className="bg-white rounded-lg p-2.5 border border-gray-200 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-[220px] w-full" />
          </div>

          {/* Tabs Skeleton */}
          <div className="animate-fade-in" style={{ animationDelay: '700ms' }}>
            <Skeleton className="h-6 w-full max-w-md mb-2" />
            <div className="bg-white rounded-lg p-2.5 border border-gray-200">
              <Skeleton className="h-[300px] w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
