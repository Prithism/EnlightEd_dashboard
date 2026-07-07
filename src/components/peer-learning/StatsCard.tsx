'use client'

import React from 'react'
import { Card } from '@/components/common/Card'
import { Award } from 'lucide-react'

export const StatsCard = () => {
  return (
    <Card className="w-full">
      <div className="flex items-center gap-2 mb-6">
        <Award className="text-secondary" size={20} />
        <h3 className="font-body font-semibold text-ink">My Stats</h3>
      </div>
      <div className="flex gap-4">
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-3xl text-secondary">47</span>
          <span className="font-body text-[10px] text-muted uppercase tracking-wider mt-1">Solved</span>
        </div>
        <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center">
          <span className="font-display font-bold text-3xl text-secondary">152</span>
          <span className="font-body text-[10px] text-muted uppercase tracking-wider mt-1">Helpful</span>
        </div>
      </div>
    </Card>
  )
}
