'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Card } from '@/components/common/Card'

interface SuggestionCardProps {
  icon: React.ReactNode
  title: string
  description?: string
  onClick: () => void
}

export const SuggestionCard: React.FC<SuggestionCardProps> = ({
  icon,
  title,
  description,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <Card
        padding="md"
        className="cursor-pointer h-full flex flex-col"
        onClick={onClick}
      >
        <div className="flex items-start gap-3 mb-2">
          <div className="text-secondary text-xl">{icon}</div>
          <h3 className="font-body font-semibold text-sm text-ink line-clamp-2">{title}</h3>
        </div>
        
        {description && (
          <p className="text-xs text-muted font-body line-clamp-2 mb-3 flex-1">{description}</p>
        )}
        
        <div className="flex items-center gap-1 text-xs text-primary font-body font-medium">
          <span>Ask</span>
          <ArrowRight size={14} />
        </div>
      </Card>
    </motion.div>
  )
}
