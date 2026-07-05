'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { Clock, MapPin, User, Play } from 'lucide-react'
import { ANIMATION } from '@/utils/designTokens'

interface TodayEvent {
  id: string
  time: string
  subject: string
  instructor: string
  duration: string
  location: string
  isLive: boolean
  status: 'upcoming' | 'live' | 'completed'
}

interface TodayScheduleProps {
  events: TodayEvent[]
  onJoinClass?: (eventId: string) => void
}

export const TodaySchedule: React.FC<TodayScheduleProps> = ({ events, onJoinClass }) => {
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: ANIMATION.DURATION_BASE,
        ease: ANIMATION.EASING_SPRING,
      },
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500/20 text-red-700 border border-red-500/30'
      case 'upcoming':
        return 'bg-primary/20 text-primary border border-primary/30'
      case 'completed':
        return 'bg-green-500/20 text-green-700 border border-green-500/30'
      default:
        return 'bg-gray-500/20 text-gray-700 border border-gray-500/30'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'live':
        return 'Live Now'
      case 'upcoming':
        return 'Upcoming'
      case 'completed':
        return 'Completed'
      default:
        return status
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-4"
    >
      <h3 className="font-body font-semibold text-ink text-lg mb-4">Today&apos;s Schedule</h3>

      <div className="space-y-3 max-h-[600px] overflow-y-auto">
        {events.length > 0 ? (
          events.map((event) => (
            <motion.div key={event.id} variants={itemVariants}>
              <Card
                variant="default"
                padding="md"
                className={`border-l-4 transition-all duration-200 ${
                  event.status === 'live'
                    ? 'border-l-red-500 bg-red-500/5'
                    : 'border-l-primary hover:bg-white/10'
                }`}
              >
                <div className="space-y-3">
                  {/* Time and Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary flex-shrink-0" />
                      <span className="font-body font-semibold text-ink">{event.time}</span>
                      <span className="text-xs text-muted font-body">({event.duration})</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-body font-semibold ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {getStatusLabel(event.status)}
                    </span>
                  </div>

                  {/* Subject */}
                  <div>
                    <h4 className="font-body font-semibold text-ink">{event.subject}</h4>
                  </div>

                  {/* Instructor and Location */}
                  <div className="space-y-2 text-sm text-muted font-body border-t border-white/10 pt-2">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-primary flex-shrink-0" />
                      <span>{event.instructor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-primary flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {/* Join Button */}
                  {event.isLive && event.status === 'live' && (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => onJoinClass?.(event.id)}
                      className="w-full gap-2 mt-2"
                    >
                      <Play size={14} />
                      Join Class Now
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="py-8 text-center text-muted">
            <p className="font-body text-sm">No classes scheduled for today</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
