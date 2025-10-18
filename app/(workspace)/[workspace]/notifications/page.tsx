'use client'

import { Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function NotificationsPage() {
  return (
    <div className="flex h-full min-h-screen overflow-hidden bg-gray-50" style={{ zoom: 0.85 }}>
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b border-gray-200 px-3 py-1.5">
          <div className="flex items-center gap-2">
            <Bell className="h-3.5 w-3.5 text-blue-600" />
            <h1 className="text-sm font-semibold text-gray-900">Notifications</h1>
            <Badge className="h-4 text-[9px] px-1.5 bg-blue-50 text-blue-700 border-0">3 New</Badge>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3">
          <div className="max-w-3xl mx-auto space-y-2">
            {[
              { title: 'Trade data updated', message: 'Latest Q3 2024 trade statistics available', time: '5 min ago', unread: true },
              { title: 'Price alert triggered', message: 'Crude Oil WTI crossed $80/barrel', time: '1 hour ago', unread: true },
              { title: 'Report generated', message: 'Monthly market analysis ready', time: '2 hours ago', unread: true },
              { title: 'System maintenance', message: 'Scheduled maintenance completed', time: 'Yesterday', unread: false }
            ].map((notif, idx) => (
              <div key={idx} className={`bg-white rounded-lg border p-3 ${notif.unread ? 'border-blue-200' : 'border-gray-200'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-gray-900">{notif.title}</h3>
                      {notif.unread && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{notif.message}</p>
                    <span className="text-[10px] text-gray-500">{notif.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
