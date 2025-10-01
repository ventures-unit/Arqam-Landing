import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    icon: '/images/arqam-blue.png',
    apple: '/images/arqam-blue.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
