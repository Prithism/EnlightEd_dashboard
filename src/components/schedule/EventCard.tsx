'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin, User, Bell } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { ANIMATION } from '@/utils/designTokens'

interface EventCardProps {
  id: string
  title: string
  time: string
  date: string
  category: 'class' | 'assignment' | 'exam' | 'meeting' | 'personal'
  duration?: string
  location?: string
  instructor?: string
  description?: string
  priority?: 'low' | 'medium' | 'high'
  hasJoinButton?: boolean
  onJoin?: () => void
  isLive?: boolean
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    class: { bg: '#22819A', text: 'Primary' },
    assignment: { bg: '#C9972A', text: 'Gold' },
    exam: { bg: '#35A8C8', text: 'Teal' },
    meeting: { bg: '#90C2E7', text: 'Secondary' },
    personal: { bg: '#4F6C74', text: 'Muted' },
  }
  return colors[category] || colors.personal
}

const getPriorityColor = (priority: string) => {
  const colors: Record<string, string> = {
    high: '#C9972A',   // gold
    medium: '#35A8C8', // teal
    low: '#90C2E7',    // secondary
  }
  return colors[priority] || colors.low
}

export const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  time,
  date,
  category,
  duration,
  location,
  instructor,
  description,
  priority = 'medium',
  hasJoinButton = false,
  onJoin,
  isLive = false,
}) => {
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

  const categoryColor = getCategoryColor(category)

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
    >
      <Card variant="default" padding="md" className="group cursor-pointer hover:bg-white/10 transition-all duration-200">
        <div className="space-y-3">
          {/* Header with category and priority */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 flex-1">
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: categoryColor.bg }}
              />
              <div>
                <h4 className="font-body font-semibold text-ink line-clamp-1">{title}</h4>
                <p className="text-xs text-muted font-body capitalize">{category}</p>
              </div>
            </div>
            {isLive && (
              <div className="flex items-center gap-1 px-2 py-1 bg-red-100/20 rounded-lg">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-body font-semibold text-red-600">Live</span>
              </div>
            )}
          </div>

          {/* Time and date */}
          <div className="flex items-center gap-3 text-sm text-muted font-body">
            <div className="flex items-center gap-1">
              <Clock size={14} className="flex-shrink-0" />
              <span>{time}</span>
            </div>
            {duration && (
              <span className="text-xs bg-white/5 px-2 py-0.5 rounded">{duration}</span>
            )}
          </div>

          {/* Location and instructor */}
          {(location || instructor) && (
            <div className="space-y-1 text-sm text-muted font-body border-t border-white/10 pt-2">
              {location && (
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="flex-shrink-0 text-primary" />
                  <span>{location}</span>
                </div>
              )}
              {instructor && (
                <div className="flex items-center gap-2">
                  <User size={14} className="flex-shrink-0 text-primary" />
                  <span>{instructor}</span>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          {description && (
            <p className="text-sm text-muted font-body line-clamp-2">{description}</p>
          )}

          {/* Action button */}
          {hasJoinButton && (
            <button
              onClick={onJoin}
              className={`w-full mt-2 px-3 py-2 rounded-lg font-body font-medium text-sm transition-all duration-200 ${
                isLive
                  ? 'bg-primary text-white hover:bg-primary/90'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              {isLive ? 'Join Class' : 'Join Class'}
            </button>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
