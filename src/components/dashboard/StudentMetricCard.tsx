'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'
import { ArrowUpRight } from 'lucide-react'
import { ANIMATION } from '@/utils/designTokens'

export interface StudentMetricCardProps {
  label: string
  value: string | number
  subtext: string
  icon: React.ReactNode
  iconColorClass: string
  trend?: string
  progress?: number
}

export const StudentMetricCard: React.FC<StudentMetricCardProps> = ({
  label,
  value,
  subtext,
  icon,
  iconColorClass,
  trend,
  progress,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION.DURATION_LONG,
        ease: ANIMATION.EASING_SPRING,
      },
    },
    hover: { scale: 1.02 },
  }

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants} 
      whileHover="hover"
      transition={{ duration: 0.3 }}
    >
      <Card
        padding="md"
        className="h-full flex flex-col justify-between cursor-pointer transition-all duration-300 relative"
      >
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-full border border-white/10 ${iconColorClass}`}>
            {icon}
          </div>
          {trend && (
            <div className="flex items-center gap-1 bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full text-xs font-bold">
              <ArrowUpRight size={14} />
              {trend}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-muted text-xs font-bold uppercase tracking-wider mb-1">{label}</h3>
          <div className="text-ink text-3xl font-display font-bold mb-1">{value}</div>
          <p className="text-muted text-sm">{subtext}</p>
        </div>

        {progress !== undefined && (
          <div className="mt-4 w-full bg-surface rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="h-1.5 rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        )}
      </Card>
    </motion.div>
  )
}
