'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Users, Play } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { ANIMATION } from '@/utils/designTokens'

interface BatchCardProps {
  id: string
  courseName: string
  instructor: string
  batchId: string
  progress: number
  completionPercentage: number
  nextClass: string
  thumbnail?: string
  studentCount?: number
  onContinue?: () => void
}

export const BatchCard: React.FC<BatchCardProps> = ({
  id,
  courseName,
  instructor,
  batchId,
  progress,
  completionPercentage,
  nextClass,
  thumbnail,
  studentCount = 0,
  onContinue,
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
        {/* Thumbnail */}
        {thumbnail ? (
          <div className="w-full h-40 -mx-6 -mt-6 mb-4 rounded-t-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbnail}
              alt={courseName}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-40 -mx-6 -mt-6 mb-4 rounded-t-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="text-4xl font-display font-bold text-primary/40">
              {courseName.charAt(0)}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="flex-1">
          <div className="mb-3">
            <h3 className="font-body font-semibold text-ink text-lg line-clamp-2 mb-1">
              {courseName}
            </h3>
            <p className="text-muted font-body text-sm">{instructor}</p>
            <p className="text-muted font-body text-xs opacity-75 mt-1">Batch ID: {batchId}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-body font-medium text-muted">Progress</span>
              <span className="text-sm font-body font-semibold text-ink">{completionPercentage}%</span>
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

          {/* Meta Info */}
          <div className="space-y-2 mb-4">
            {studentCount > 0 && (
              <div className="flex items-center gap-2 text-xs text-muted font-body">
                <Users size={14} />
                <span>{studentCount} students</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-xs text-muted font-body">
              <Clock size={14} />
              <span>Next: {nextClass}</span>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <Button
          variant="primary"
          size="md"
          className="w-full"
          onClick={onContinue}
        >
          <Play size={16} className="mr-2" />
          Continue Learning
        </Button>
      </Card>
    </motion.div>
  )
}
