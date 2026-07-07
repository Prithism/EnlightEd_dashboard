'use client'

import React from 'react'
import { Zap } from 'lucide-react'

interface AIPathOptimizerProps {
  subject?: string
}

export const AIPathOptimizer: React.FC<AIPathOptimizerProps> = ({ subject = 'Mathematics' }) => {
  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl p-6 h-full text-white relative overflow-hidden flex flex-col justify-between min-h-[300px]">
      {/* Background Graphic Element */}
      <div className="absolute -right-8 -bottom-8 opacity-10">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 3.8L18.6 19H5.4L12 5.8z" />
          <path d="M12 10.5l-3 4.5h6z" />
        </svg>
      </div>

      <div>
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
              <Zap className="text-yellow-400" size={24} fill="currentColor" />
            </div>
            <h2 className="text-2xl font-display font-bold">{subject} AI Path Optimizer</h2>
          </div>
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-green-100">
              Real-Time Analysis
            </span>
          </div>
        </div>

        {/* Skeleton Placeholders as per design screenshot */}
        <div className="space-y-4 relative z-10 mt-8">
          <div className="h-4 bg-white/20 rounded-full w-3/4 max-w-lg"></div>
          <div className="h-16 bg-white/10 rounded-2xl w-full"></div>
          <div className="h-4 bg-white/20 rounded-full w-1/2"></div>
        </div>
      </div>
    </div>
  )
}
