'use client'

import { Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ViewsPage() {
  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-3 py-1.5">
          <div className="flex items-center gap-2">
            <Bookmark className="h-3.5 w-3.5 text-blue-600" />
            <h1 className="text-sm font-semibold text-gray-900">Saved Views</h1>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <Bookmark className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Saved Views</h2>
            <p className="text-gray-600 mb-4">
              Save and manage your favorite views across all modules for quick access.
            </p>
            <Button>Create First View</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
