import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Arqam - Enterprise Analytics Platform',
  description: 'Comprehensive analytics platform for enterprise decision-making',
  keywords: ['analytics', 'enterprise', 'data', 'insights', 'business intelligence'],
  authors: [{ name: 'Arqam Team' }],
  creator: 'Arqam',
  publisher: 'Arqam',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    title: 'Arqam - Enterprise Analytics Platform',
    description: 'Comprehensive analytics platform for enterprise decision-making',
    siteName: 'Arqam',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arqam - Enterprise Analytics Platform',
    description: 'Comprehensive analytics platform for enterprise decision-making',
    creator: '@arqam',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
