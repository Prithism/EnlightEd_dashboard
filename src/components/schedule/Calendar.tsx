'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'
import { ANIMATION } from '@/utils/designTokens'

interface ScheduleEvent {
  id: string
  date: Date
  title: string
  category: 'class' | 'assignment' | 'exam' | 'meeting' | 'personal'
  time?: string
}

interface CalendarProps {
  currentDate: Date
  selectedDate: Date
  onDateSelect: (date: Date) => void
  events: ScheduleEvent[]
  viewMode: 'month' | 'week' | 'day'
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    class: '#22819A',      // primary
    assignment: '#C9972A', // gold
    exam: '#35A8C8',       // teal-400
    meeting: '#90C2E7',    // secondary
    personal: '#4F6C74',   // muted
  }
  return colors[category] || colors.personal
}

const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  )
}

const isToday = (date: Date) => {
  return isSameDay(date, new Date())
}

export const Calendar: React.FC<CalendarProps> = ({
  currentDate,
  selectedDate,
  onDateSelect,
  events,
  viewMode,
}) => {
  const daysInMonth = getDaysInMonth(currentDate)
  const firstDay = getFirstDayOfMonth(currentDate)
  const days = []
  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  // Create empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // Create cells for each day of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const getEventsForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    return events.filter((event) => isSameDay(event.date, date))
  }

  if (viewMode === 'week') {
    return (
      <Card variant="default" padding="lg" className="min-h-[500px]">
        <div className="space-y-4">
          <h3 className="font-body font-semibold text-ink mb-6">Week View</h3>
          <div className="text-center text-muted">Week view functionality coming soon</div>
        </div>
      </Card>
    )
  }

  if (viewMode === 'day') {
    return (
      <Card variant="default" padding="lg" className="min-h-[500px]">
        <div className="space-y-4">
          <h3 className="font-body font-semibold text-ink mb-6">Day View</h3>
          <div className="text-center text-muted">Day view functionality coming soon</div>
        </div>
      </Card>
    )
  }

  // Month view (default)
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
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
    >
      <Card variant="default" padding="lg" className="min-h-[500px]">
        {/* Day labels */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {dayLabels.map((day) => (
            <div
              key={day}
              className="text-center font-body font-semibold text-muted text-sm py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="aspect-square" />
            }

            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
            const isSelected = isSameDay(date, selectedDate)
            const isTodayDate = isToday(date)
            const dayEvents = getEventsForDate(day)

            return (
              <motion.button
                key={day}
                whileHover={{ scale: 1.02 }}
                onClick={() => onDateSelect(date)}
                className={`aspect-square p-2 rounded-lg transition-all duration-200 relative ${
                  isSelected
                    ? 'glass bg-primary/20 border-2 border-primary'
                    : isTodayDate
                      ? 'glass border-2 border-primary/50 bg-primary/10'
                      : 'glass hover:bg-white/10'
                }`}
              >
                <div className="flex flex-col h-full">
                  <span
                    className={`text-sm font-body font-semibold ${
                      isSelected ? 'text-primary' : isTodayDate ? 'text-primary' : 'text-ink'
                    }`}
                  >
                    {day}
                  </span>
                  <div className="flex-1 flex items-end">
                    <div className="flex gap-0.5 flex-wrap">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: getCategoryColor(event.category) }}
                        />
                      ))}
                      {dayEvents.length > 3 && (
                        <span className="text-xs text-muted">+{dayEvents.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </Card>
    </motion.div>
  )
}
