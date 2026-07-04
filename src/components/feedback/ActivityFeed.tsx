'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'
import { Card } from '@/components/common/Card'

export interface ActivityItem {
  id: string
  timestamp: string
  actor: string
  action: string
  type: 'success' | 'warning' | 'neutral'
  icon?: React.ReactNode
}

interface ActivityFeedProps {
  items: ActivityItem[]
  maxItems?: number
  title?: string
  onItemClick?: (itemId: string) => void
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  items,
  maxItems = 5,
  title = 'Recent Activity',
  onItemClick,
}) => {
  const displayItems = items.slice(0, maxItems)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  }

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-secondary" />
      case 'warning':
        return <AlertCircle size={20} className="text-gold" />
      case 'neutral':
      default:
        return <Info size={20} className="text-muted" />
    }
  }

  return (
    <Card padding="lg">
      <h2 className="font-display font-bold text-xl text-ink mb-4">{title}</h2>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-0 max-h-96 overflow-y-auto"
      >
        {displayItems.map((item, index) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            onClick={() => onItemClick?.(item.id)}
            className={`py-3 px-2 flex gap-3 cursor-pointer hover:bg-primary/5 rounded-lg transition-colors ${
              index !== displayItems.length - 1 ? 'border-b border-white/10' : ''
            }`}
          >
            {/* Icon */}
            <div className="flex-shrink-0 mt-0.5">{getIcon(item.type)}</div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-ink">
                <span className="font-semibold">{item.actor}</span> {item.action}
              </p>
              <p className="text-xs text-muted font-body mt-1">{item.timestamp}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {items.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-muted font-body text-sm">No activity yet</p>
        </div>
      )}
    </Card>
  )
}
