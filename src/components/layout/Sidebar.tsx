'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Lightbulb,
  Calendar,
  PieChart,
  Shield,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: <LayoutDashboard size={20} /> },
  { label: 'My Batches', href: '/batches', icon: <BookOpen size={20} /> },
  { label: 'Quiz', href: '/assignments', icon: <FileText size={20} /> },
  { label: 'AI Doubt Assistant', href: '/ai-doubt-assistant', icon: <Lightbulb size={20} /> },
  { label: 'Schedule', href: '/schedule', icon: <Calendar size={20} /> },
  { label: 'Peer Learning', href: '/peer-learning', icon: <Users size={20} /> },
  { label: 'Performance', href: '/performance', icon: <PieChart size={20} /> },
  { label: 'Courses', href: '/courses', icon: <BookOpen size={20} /> },
  { label: 'E-Raksha', href: '#', icon: <Shield size={20} /> },
]

interface SidebarProps {
  activeRoute?: string
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeRoute = '/', isCollapsed = false, onToggleCollapse }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: '-100%', opacity: 0 },
  }

  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0, pointerEvents: 'none' as const },
  }

  const SidebarContent = () => (
    <>
      {/* Logo Area */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
            <img 
              src="/logo.png" 
              alt="EnlightEd Logo" 
              className={`h-10 w-auto object-contain dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)] ${isCollapsed ? 'hidden' : 'block'}`}
            />
            {isCollapsed && (
              <img 
                src="/logo.png" 
                alt="E" 
                className="h-10 w-10 object-cover object-left dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" 
              />
            )}
          </div>
        </Link>
        {!isMobile && onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="text-primary hover:bg-primary/10 p-1 rounded-lg transition-colors"
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = activeRoute === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => isMobile && setIsDrawerOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-primary/20 text-primary border-l-2 border-primary'
                      : 'text-muted hover:bg-primary/10'
                  }`}
                >
                  {item.icon}
                  {!isCollapsed && <span className="text-sm font-body font-medium">{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/10">
          <a href="#" className="text-xs text-primary hover:underline">
            Help & Support
          </a>
        </div>
      )}
    </>
  )

  if (isMobile) {
    return (
      <>
        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg glass hover:bg-primary/20 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} className="text-primary" />
        </button>

        {/* Mobile Drawer */}
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Overlay */}
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={overlayVariants}
                onClick={() => setIsDrawerOpen(false)}
                className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              />

              {/* Drawer */}
              <motion.aside
                initial="closed"
                animate="open"
                exit="closed"
                variants={sidebarVariants}
                className="fixed left-0 top-0 h-screen w-64 glass z-50 flex flex-col lg:hidden"
              >
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                  <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                      <img 
                        src="/logo.png" 
                        alt="EnlightEd Logo" 
                        className="h-10 w-auto object-contain dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                      />
                    </div>
                  </Link>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="text-primary hover:bg-primary/10 p-1 rounded-lg"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <SidebarContent />
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Desktop Sidebar
  return (
    <aside
      className={`fixed left-0 top-0 h-screen glass flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      } hidden lg:flex border-r border-white/10`}
    >
      <SidebarContent />
    </aside>
  )
}
