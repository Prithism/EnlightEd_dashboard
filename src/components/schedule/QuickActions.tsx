'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/common/Button'

import { ANIMATION } from '@/utils/designTokens'

interface QuickAction {
  id: string
  icon: React.ReactNode
  label: string
  onClick: () => void
}

interface QuickActionsProps {
  actions: QuickAction[]
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
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
      <h3 className="font-body font-semibold text-ink text-lg">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <motion.div key={action.id} variants={itemVariants}>
            <Button
              variant="secondary"
              size="md"
              onClick={action.onClick}
              className="w-full h-auto flex-col items-center gap-2 py-4"
            >
              <div className="text-lg">{action.icon}</div>
              <span className="text-xs text-center font-body font-medium">{action.label}</span>
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
