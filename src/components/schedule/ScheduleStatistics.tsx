'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'
import { ANIMATION } from '@/utils/designTokens'

interface StatisticItem {
  id: string
  label: string
  value: string | number
  color: string
  icon?: React.ReactNode
}

interface ScheduleStatisticsProps {
  statistics: StatisticItem[]
}

export const ScheduleStatistics: React.FC<ScheduleStatisticsProps> = ({ statistics }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION.DURATION_BASE,
        ease: ANIMATION.EASING_SPRING,
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION.DURATION_BASE,
        ease: ANIMATION.EASING_SPRING,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-4"
    >
      <h3 className="font-body font-semibold text-ink text-lg">Schedule Statistics</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {statistics.map((stat) => (
          <motion.div key={stat.id} variants={itemVariants}>
            <Card variant="default" padding="md" className="border-l-4" style={{ borderLeftColor: stat.color }}>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-muted font-body uppercase tracking-wide">{stat.label}</p>
                  {stat.icon && <div className="text-lg text-primary/60">{stat.icon}</div>}
                </div>
                <p className="text-2xl font-body font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
