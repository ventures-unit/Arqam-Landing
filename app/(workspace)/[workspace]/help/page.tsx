'use client'

import { HelpCircle, Book, Video, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HelpPage() {
  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-3 py-1.5">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-3.5 w-3.5 text-blue-600" />
            <h1 className="text-sm font-semibold text-gray-900">Help & Support</h1>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">How can we help you?</h2>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer">
                <Book className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Documentation</h3>
                <p className="text-xs text-gray-600">Browse comprehensive guides and tutorials</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer">
                <Video className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Video Tutorials</h3>
                <p className="text-xs text-gray-600">Watch step-by-step video guides</p>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer">
                <Mail className="h-8 w-8 text-green-600 mb-3" />
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Contact Support</h3>
                <p className="text-xs text-gray-600">Get help from our support team</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Frequently Asked Questions</h3>
              <div className="space-y-3">
                {[
                  'How do I export data from modules?',
                  'How do I create custom dashboards?',
                  'How do I set up price alerts?',
                  'What data sources are used?'
                ].map((q, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-2 last:border-0">
                    <button className="text-xs text-gray-700 hover:text-blue-600 text-left w-full">
                      {q}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
