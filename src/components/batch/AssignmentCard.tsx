'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Clock } from 'lucide-react'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'

interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string
  status: 'pending' | 'submitted' | 'graded' | 'overdue'
  score?: number
}

interface AssignmentCardProps {
  title?: string
  assignments: Assignment[]
  onSubmit?: (assignmentId: string) => void
}

const statusConfig = {
  pending: {
    icon: <Clock size={16} className="text-gold" />,
    label: 'Pending',
    bgColor: 'bg-gold/10 text-gold',
  },
  submitted: {
    icon: <CheckCircle size={16} className="text-secondary" />,
    label: 'Submitted',
    bgColor: 'bg-secondary/10 text-secondary',
  },
  graded: {
    icon: <CheckCircle size={16} className="text-primary" />,
    label: 'Graded',
    bgColor: 'bg-primary/10 text-primary',
  },
  overdue: {
    icon: <AlertCircle size={16} className="text-primary" />,
    label: 'Overdue',
    bgColor: 'bg-primary/10 text-primary',
  },
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({
  title = 'Assignments',
  assignments,
  onSubmit,
}) => {
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
        {assignments.map((assignment) => {
          const config = statusConfig[assignment.status]
          return (
            <motion.div
              key={assignment.id}
              variants={itemVariants}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-body font-semibold text-sm text-ink line-clamp-2">
                    {assignment.title}
                  </h3>
                  <p className="text-xs text-muted font-body mt-1">{assignment.course}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-lg font-body font-medium flex-shrink-0 ${config.bgColor}`}>
                  {config.label}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-muted font-body">
                  <Clock size={12} />
                  <span>Due: {assignment.dueDate}</span>
                </div>
                {assignment.score !== undefined && (
                  <span className="text-xs font-body font-semibold text-primary">
                    {assignment.score}%
                  </span>
                )}
              </div>

              {assignment.status === 'pending' && (
                <Button
                  variant="primary"
                  size="xs"
                  className="w-full mt-2"
                  onClick={() => onSubmit?.(assignment.id)}
                >
                  Submit
                </Button>
              )}
            </motion.div>
          )
        })}
      </motion.div>

      {assignments.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-muted font-body text-sm">No assignments</p>
        </div>
      )}
    </Card>
  )
}
