import type { Metadata } from 'next'
import React from 'react'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'EnlightEd Dashboard',
  description: 'Premium SaaS analytics dashboard built with React, Next.js, and Tailwind CSS',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  robots: 'index, follow',
  openGraph: {
    title: 'EnlightEd Dashboard',
    description: 'Premium SaaS analytics dashboard',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#22819A" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%2322819A' width='100' height='100'/><text x='50' y='75' font-size='60' font-weight='bold' text-anchor='middle' fill='white' font-family='serif'>E</text></svg>" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
