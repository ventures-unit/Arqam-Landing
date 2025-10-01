import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arqam - Egypt's Market Intelligence Platform",
  description: "The first centralized data room for Egypt's private sector. Real-time insights, AI-powered analysis, and comprehensive market intelligence.",
  keywords: ["Egypt", "market intelligence", "data room", "AI", "analytics", "business intelligence"],
  authors: [{ name: "Arqam" }],
  openGraph: {
    title: "Arqam - Egypt's Market Intelligence Platform",
    description: "The first centralized data room for Egypt's private sector. Real-time insights, AI-powered analysis, and comprehensive market intelligence.",
    type: "website",
    locale: "en_US",
    siteName: "Arqam",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arqam - Egypt's Market Intelligence Platform",
    description: "The first centralized data room for Egypt's private sector. Real-time insights, AI-powered analysis, and comprehensive market intelligence.",
  },
  icons: {
    icon: '/api/favicon?v=2',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/api/favicon?v=2" type="image/png" />
        <link rel="shortcut icon" href="/api/favicon?v=2" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
