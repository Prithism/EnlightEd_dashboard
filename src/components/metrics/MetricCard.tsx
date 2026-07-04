'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { ANIMATION } from '@/utils/designTokens'

interface MetricCardProps {
  label: string
  value: string | number
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
  sparkline?: number[]
  icon?: React.ReactNode
  variant?: 'default' | 'highlighted'
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  trend,
  sparkline,
  icon,
  variant = 'default',
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
        variant={variant}
        padding="md"
        className="min-h-[140px] flex flex-col justify-between cursor-pointer transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <p className="text-muted text-sm font-body font-medium mb-1">{label}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-ink text-3xl md:text-4xl font-body font-semibold">{value}</p>
            </div>
          </div>
          {icon && <div className="text-secondary opacity-60">{icon}</div>}
        </div>

        {trend && (
          <div className="flex items-center gap-1">
            {trend.direction === 'up' ? (
              <TrendingUp size={16} className="text-secondary" />
            ) : (
              <TrendingDown size={16} className="text-muted" />
            )}
            <span
              className={`text-sm font-body font-medium ${
                trend.direction === 'up' ? 'text-secondary' : 'text-muted'
              }`}
            >
              {trend.percentage}% {trend.direction === 'up' ? 'increase' : 'decrease'}
            </span>
          </div>
        )}

        {sparkline && (
          <div className="mt-4 h-8 opacity-60">
            {/* Simple sparkline visualization could be added here */}
          </div>
        )}
      </Card>
    </motion.div>
  )
}
