'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Play, Eye } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { ANIMATION } from '@/utils/designTokens'

type AssignmentStatus = 'pending' | 'in-progress' | 'graded'

interface AssignmentCardProps {
  id: string
  subject: string
  title: string
  description: string
  dueDate: string
  status: AssignmentStatus
  progress?: number
  score?: number
  subjectColor: string
  icon: React.ReactNode
  onAction?: () => void
}

const statusConfig = {
  pending: {
    label: 'Pending',
    bgColor: 'bg-gold/20',
    textColor: 'text-gold',
    accentColor: 'gold',
    badgeColor: 'bg-gold/30 text-gold border-gold/40',
  },
  'in-progress': {
    label: 'In Progress',
    bgColor: 'bg-primary/20',
    textColor: 'text-primary',
    accentColor: 'primary',
    badgeColor: 'bg-primary/30 text-primary border-primary/40',
  },
  graded: {
    label: 'Graded',
    bgColor: 'bg-secondary/20',
    textColor: 'text-secondary',
    accentColor: 'secondary',
    badgeColor: 'bg-secondary/30 text-secondary border-secondary/40',
  },
}

const actionConfig = {
  pending: { label: 'Begin Now', icon: <Play size={16} /> },
  'in-progress': { label: 'Continue', icon: <Play size={16} /> },
  graded: { label: 'View Submission', icon: <Eye size={16} /> },
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  id,
  subject,
  title,
  description,
  dueDate,
  status,
  progress = 0,
  score,
  icon,
  onAction,
}) => {
  const config = statusConfig[status]
  const action = actionConfig[status]

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
  }

  return (
    <motion.div
      key={id}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      whileHover="hover"
      transition={{ duration: 0.3 }}
    >
      <Card padding="lg" className="cursor-pointer transition-all duration-300 flex flex-col h-full">
        {/* Header with Subject and Status */}
        <div className="flex items-start justify-between mb-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${config.bgColor} flex items-center justify-center`}>
              {icon}
            </div>
            <div>
              <p className={`text-xs font-body font-medium ${config.textColor} uppercase tracking-wide`}>
                {subject}
              </p>
            </div>
          </div>
          <span className={`text-xs px-3 py-1 rounded-full font-body font-semibold border ${config.badgeColor}`}>
            {config.label}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Title */}
          <h3 className="font-body font-semibold text-ink text-lg line-clamp-2 mb-2">{title}</h3>

          {/* Description */}
          <p className="text-sm text-muted font-body line-clamp-2 mb-4">{description}</p>

          {/* Due Date */}
          <div className="flex items-center gap-2 text-sm text-muted font-body mb-4">
            <Clock size={16} />
            <span>Due: {dueDate}</span>
          </div>

          {/* Progress Bar (if in progress) */}
          {status === 'in-progress' && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-body font-medium text-muted">Progress</span>
                <span className="text-sm font-body font-semibold text-primary">{progress}%</span>
              </div>
              <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}

          {/* Score Display (if graded) */}
          {status === 'graded' && score !== undefined && (
            <div className="mb-4 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-body text-muted">Your Score</span>
                <span className="text-xl font-body font-bold text-secondary">{score}%</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant={status === 'pending' ? 'primary' : 'secondary'}
          size="md"
          className="w-full"
          onClick={onAction}
        >
          {action.icon}
          <span className="ml-2">{action.label}</span>
        </Button>
      </Card>
    </motion.div>
  )
}
