'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
  lines?: number
  variant?: 'text' | 'card' | 'chat'
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  lines = 3,
  variant = 'text',
}) => {
  const shimmer = {
    animate: {
      backgroundPosition: ['200% 0', '-200% 0'],
    },
  }

  if (variant === 'chat') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex gap-3 mb-4"
      >
        <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-lg w-3/4 animate-pulse" />
          <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-lg w-1/2 animate-pulse" />
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div variants={shimmer} animate="animate" className="space-y-3">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 rounded-lg animate-pulse"
          style={{ width: `${Math.random() > 0.5 ? 100 : 80}%` }}
        />
      ))}
    </motion.div>
  )
}
