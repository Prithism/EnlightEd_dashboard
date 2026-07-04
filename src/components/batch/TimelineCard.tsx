'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, MapPin, Video } from 'lucide-react'
import { Card } from '@/components/common/Card'

interface TimelineItem {
  id: string
  title: string
  time: string
  date: string
  type: 'class' | 'assignment' | 'exam'
  location?: string
  isUpcoming: boolean
}

interface TimelineCardProps {
  title: string
  items: TimelineItem[]
}

const typeIcons = {
  class: <Video size={16} className="text-secondary" />,
  assignment: <Clock size={16} className="text-gold" />,
  exam: <Clock size={16} className="text-primary" />,
}

const typeColors = {
  class: 'bg-secondary/10 text-secondary',
  assignment: 'bg-gold/10 text-gold',
  exam: 'bg-primary/10 text-primary',
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ title, items }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.05 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  }

  return (
    <Card padding="lg">
      <h2 className="font-display font-bold text-lg text-ink mb-4">{title}</h2>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-3 max-h-96 overflow-y-auto"
      >
        {items.map((item, index) => (
          <motion.div key={item.id} variants={itemVariants} className="relative pb-3">
            {/* Timeline dot and line */}
            <div className="absolute left-2 top-2 w-3 h-3 rounded-full bg-primary border-2 border-white/30" />

            {index !== items.length - 1 && (
              <div className="absolute left-[13px] top-5 w-0.5 h-8 bg-gradient-to-b from-primary/40 to-transparent" />
            )}

            {/* Content */}
            <div className="pl-8">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-xs px-2 py-1 rounded-lg font-body font-medium ${typeColors[item.type]}`}
                    >
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-body font-semibold text-sm text-ink mb-1 line-clamp-2">
                    {item.title}
                  </h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-muted font-body">
                      <Clock size={12} />
                      <span>
                        {item.date} • {item.time}
                      </span>
                    </div>
                    {item.location && (
                      <div className="flex items-center gap-1 text-xs text-muted font-body">
                        <MapPin size={12} />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                {item.isUpcoming && (
                  <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded-lg font-body font-medium flex-shrink-0">
                    Upcoming
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {items.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-muted font-body text-sm">No scheduled items</p>
        </div>
      )}
    </Card>
  )
}
