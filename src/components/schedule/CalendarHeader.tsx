'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { ANIMATION } from '@/utils/designTokens'

interface CalendarHeaderProps {
  currentDate: Date
  onPreviousMonth: () => void
  onNextMonth: () => void
  onToday: () => void
  viewMode: 'month' | 'week' | 'day'
  onViewModeChange: (mode: 'month' | 'week' | 'day') => void
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
  viewMode,
  onViewModeChange,
}) => {
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
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
      className="glass p-4 rounded-2xl border border-white/10 mb-6"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        {/* Month Navigation */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onPreviousMonth}
            className="hover:bg-primary/10"
          >
            <ChevronLeft size={20} className="text-primary" />
          </Button>
          <div className="min-w-[180px] text-center">
            <h2 className="font-display font-bold text-xl text-ink">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onNextMonth}
            className="hover:bg-primary/10"
          >
            <ChevronRight size={20} className="text-primary" />
          </Button>
        </div>

        {/* Center Actions */}
        <Button
          variant="secondary"
          size="sm"
          onClick={onToday}
          className="gap-2"
        >
          <Calendar size={16} />
          Today
        </Button>

        {/* View Mode Selector */}
        <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
          {(['month', 'week', 'day'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => onViewModeChange(mode)}
              className={`px-4 py-1.5 rounded-lg transition-all duration-200 text-sm font-body font-medium capitalize ${
                viewMode === mode
                  ? 'bg-primary text-white'
                  : 'text-muted hover:text-primary'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
