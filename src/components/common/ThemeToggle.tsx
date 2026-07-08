'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-9 h-9 p-2 rounded-lg" />
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="relative p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary flex items-center justify-center overflow-hidden"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 0 : 1,
            opacity: theme === 'dark' ? 0 : 1,
            rotate: theme === 'dark' ? 90 : 0
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className="absolute"
        >
          <Sun size={20} />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            scale: theme === 'dark' ? 1 : 0,
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : -90
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          className="absolute"
        >
          <Moon size={20} />
        </motion.div>
      </div>
    </button>
  )
}
