'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Target } from 'lucide-react'

export interface DashboardConceptTopic {
  id?: string
  name: string
  proficiency: number
}

interface DashboardConceptMasteryProps {
  topics: DashboardConceptTopic[]
}

export const DashboardConceptMastery: React.FC<DashboardConceptMasteryProps> = ({ topics }) => {
  return (
    <Card padding="lg" className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Target size={20} className="text-secondary" />
        <h2 className="text-xl font-display font-bold text-ink">Concept Mastery</h2>
      </div>

      <div className="flex-grow space-y-5">
        {topics?.map((topic) => (
          <div key={topic.id || topic.name}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-muted">{topic?.name ?? 'Unknown'}</span>
              <span className="text-xs font-bold text-ink">{topic?.proficiency ?? 0}%</span>
            </div>
            <div className="w-full bg-surface rounded-full h-1.5 overflow-hidden">
              <motion.div
                className={`h-1.5 rounded-full ${(topic?.proficiency ?? 0) < 50 ? 'bg-orange-500' : 'bg-primary'}`}
                initial={{ width: 0 }}
                animate={{ width: `${topic?.proficiency ?? 0}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-2">
        <Button variant="secondary" className="w-full text-xs font-bold uppercase tracking-wider border-white/5 bg-white/5 hover:bg-white/10">
          View Full Topic Analysis
        </Button>
      </div>
    </Card>
  )
}
