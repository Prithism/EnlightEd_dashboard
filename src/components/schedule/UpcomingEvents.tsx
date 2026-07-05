'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'
import { Clock, AlertCircle } from 'lucide-react'
import { ANIMATION } from '@/utils/designTokens'

interface UpcomingEvent {
  id: string
  title: string
  date: string
  time: string
  category: 'class' | 'assignment' | 'exam' | 'meeting' | 'personal'
  countdownText: string
  priority: 'low' | 'medium' | 'high'
}

interface UpcomingEventsProps {
  events: UpcomingEvent[]
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    class: '#22819A',      // primary
    assignment: '#C9972A', // gold
    exam: '#35A8C8',       // teal
    meeting: '#90C2E7',    // secondary
    personal: '#4F6C74',   // muted
  }
  return colors[category] || colors.personal
}

const getCategoryLabel = (category: string) => {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: ANIMATION.DURATION_BASE,
        ease: ANIMATION.EASING_SPRING,
        staggerChildren: 0.05,
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
      <h3 className="font-body font-semibold text-ink text-lg mb-4">Upcoming Events</h3>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {events.length > 0 ? (
          events.map((event) => (
            <motion.div key={event.id} variants={itemVariants}>
              <Card
                variant="default"
                padding="md"
                className="group cursor-pointer hover:bg-white/10 transition-all duration-200"
              >
                <div className="space-y-3">
                  {/* Title and Priority */}
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-body font-semibold text-ink flex-1 line-clamp-1">
                      {event.title}
                    </h4>
                    {event.priority === 'high' && (
                      <AlertCircle size={16} className="text-gold flex-shrink-0" />
                    )}
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: getCategoryColor(event.category) }}
                    />
                    <span className="text-xs font-body text-muted capitalize">
                      {getCategoryLabel(event.category)}
                    </span>
                  </div>

                  {/* Date and Time */}
                  <div className="space-y-2 text-sm text-muted font-body border-t border-white/10 pt-2">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-primary flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="text-xs text-muted">{event.time}</div>
                  </div>

                  {/* Countdown */}
                  <div className="flex items-center gap-2 px-2 py-1.5 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-xs font-body font-medium text-primary">
                      {event.countdownText}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="py-8 text-center text-muted">
            <p className="font-body text-sm">No upcoming events</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
