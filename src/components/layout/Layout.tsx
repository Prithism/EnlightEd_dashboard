'use client'

import React from 'react'
import { Sidebar } from './Sidebar'
import { Navbar } from './Navbar'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  activeRoute?: string
}

export const Layout: React.FC<LayoutProps> = ({ children, title = 'Dashboard', activeRoute = '/' }) => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar activeRoute={activeRoute} />
      <Navbar title={title} />

      {/* Main Content */}
      <main
        className={`transition-all duration-300 pt-20 pb-8 ${
          isMobile ? 'px-4 ml-0' : 'px-8 ml-64 lg:ml-64'
        }`}
      >
        {children}
      </main>
    </div>
  )
}
