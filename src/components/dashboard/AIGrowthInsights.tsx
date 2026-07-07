'use client'

import React from 'react'
import { Zap } from 'lucide-react'
import { Button } from '@/components/common/Button'

export interface AIGrowthInsightsProps {
  insightText: string
}

export const AIGrowthInsights: React.FC<AIGrowthInsightsProps> = ({ insightText }) => {
  return (
    <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-3xl p-6 text-white relative overflow-hidden h-full min-h-[220px] flex flex-col justify-between">
      {/* Background Graphic Element */}
      <div className="absolute -right-12 -bottom-12 opacity-10">
        <svg width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 22h20L12 2zm0 3.8L18.6 19H5.4L12 5.8z" />
          <path d="M12 10.5l-3 4.5h6z" />
        </svg>
      </div>

      <div className="relative z-10">
        <h2 className="text-xl font-display font-bold flex items-center gap-2 mb-4">
          <Zap size={20} className="text-yellow-400" fill="currentColor" />
          AI Growth Insights
        </h2>
        
        <p className="text-teal-50 font-body text-lg italic mb-6">
          &quot;{insightText}&quot;
        </p>
      </div>

      <div className="relative z-10">
        <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white border-white/20 text-xs tracking-wider uppercase font-bold py-2">
          View Detailed Plan
        </Button>
      </div>
    </div>
  )
}
