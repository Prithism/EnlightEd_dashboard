'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Bell, User, Settings, LogOut, HelpCircle, X } from 'lucide-react'
import { Card } from '@/components/common/Card'

interface NavbarProps {
  title?: string
  notificationCount?: number
  onSearch?: (query: string) => void
  onLogout?: () => void
  isCollapsed?: boolean
}

export const Navbar: React.FC<NavbarProps> = ({
  title = 'Dashboard',
  notificationCount = 0,
  onSearch,
  onLogout,
  isCollapsed = false,
}) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const recentNotifications = [
    { id: 1, message: 'New student enrolled in Biology 101', time: '2 hours ago' },
    { id: 2, message: 'Quiz results for Chemistry 201 are ready', time: '4 hours ago' },
    { id: 3, message: 'System maintenance scheduled for tonight', time: '1 day ago' },
    { id: 4, message: 'New course materials uploaded', time: '2 days ago' },
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) onSearch(searchQuery)
  }

  return (
    <nav className={`fixed top-0 right-0 left-0 ${isCollapsed ? 'lg:left-20' : 'lg:left-64'} h-18 glass z-40 border-b border-white/10 transition-all duration-300`}>
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Title */}
        <div className="hidden md:flex flex-col">
          <h1 className="font-display font-bold text-lg text-ink">{title}</h1>
          <p className="text-xs text-muted">Welcome back</p>
        </div>

        {/* Center: Spacer */}
        <div className="flex-1" />

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <AnimatePresence>
              {searchOpen ? (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 300, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  onSubmit={handleSearch}
                  className="absolute right-0"
                >
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full pl-9 pr-8 py-2 rounded-lg bg-white/10 border border-white/20 text-ink placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(false)
                        setSearchQuery('')
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-teal-700 transition-colors p-1"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"
                  aria-label="Open search"
                >
                  <Search size={20} />
                </button>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary"
              aria-label="Notifications"
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-gold text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {notificationCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notificationOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 z-50"
                >
                  <Card padding="md" className="shadow-lg">
                    <h3 className="font-body font-semibold text-ink mb-3">Recent Notifications</h3>
                    <div className="space-y-2 max-h-80 overflow-y-auto">
                      {recentNotifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="p-2 hover:bg-primary/5 rounded-lg cursor-pointer transition-colors border-b border-white/10 last:border-b-0"
                        >
                          <p className="text-sm text-ink font-body">{notif.message}</p>
                          <p className="text-xs text-muted mt-1">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors text-primary"
              aria-label="Profile menu"
            >
              <User size={20} />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 z-50"
                >
                  <Card padding="md" className="shadow-lg">
                    <div className="space-y-1">
                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-primary/10 rounded-lg transition-colors text-left text-sm text-ink font-body">
                        <User size={16} />
                        Profile
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-primary/10 rounded-lg transition-colors text-left text-sm text-ink font-body">
                        <Settings size={16} />
                        Settings
                      </button>
                      <button className="w-full flex items-center gap-2 px-3 py-2 hover:bg-primary/10 rounded-lg transition-colors text-left text-sm text-ink font-body">
                        <HelpCircle size={16} />
                        Documentation
                      </button>
                      <hr className="my-2 border-white/10" />
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-primary/10 rounded-lg transition-colors text-left text-sm text-primary font-body"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </nav>
  )
}
