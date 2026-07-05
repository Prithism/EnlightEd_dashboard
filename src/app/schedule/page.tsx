'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/layout/Layout'
import { Calendar } from '@/components/schedule/Calendar'
import { CalendarHeader } from '@/components/schedule/CalendarHeader'
import { TodaySchedule } from '@/components/schedule/TodaySchedule'
import { UpcomingEvents } from '@/components/schedule/UpcomingEvents'
import { QuickActions } from '@/components/schedule/QuickActions'
import { ScheduleStatistics } from '@/components/schedule/ScheduleStatistics'
import { ANIMATION } from '@/utils/designTokens'
import {
  Play,
  Plus,
  BookOpen,
  FileText,
  ClipboardList,
  Clock,
  Users,
} from 'lucide-react'

interface ScheduleEvent {
  id: string
  date: Date
  title: string
  category: 'class' | 'assignment' | 'exam' | 'meeting' | 'personal'
  time?: string
}

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

interface UpcomingEvent {
  id: string
  title: string
  date: string
  time: string
  category: 'class' | 'assignment' | 'exam' | 'meeting' | 'personal'
  countdownText: string
  priority: 'low' | 'medium' | 'high'
}

interface StatisticItem {
  id: string
  label: string
  value: string | number
  color: string
  icon?: React.ReactNode
}

// Mock schedule events
const mockScheduleEvents: ScheduleEvent[] = [
  {
    id: '1',
    date: new Date(2026, 6, 5),
    title: 'Biology Class',
    category: 'class',
    time: '09:00 AM',
  },
  {
    id: '2',
    date: new Date(2026, 6, 6),
    title: 'Chemistry Assignment',
    category: 'assignment',
    time: '02:00 PM',
  },
  {
    id: '3',
    date: new Date(2026, 6, 8),
    title: 'Physics Exam',
    category: 'exam',
    time: '10:00 AM',
  },
  {
    id: '4',
    date: new Date(2026, 6, 5),
    title: 'Math Meeting',
    category: 'meeting',
    time: '11:00 AM',
  },
  {
    id: '5',
    date: new Date(2026, 6, 7),
    title: 'Study Group',
    category: 'personal',
    time: '03:00 PM',
  },
  {
    id: '6',
    date: new Date(2026, 6, 9),
    title: 'Literature Class',
    category: 'class',
    time: '10:30 AM',
  },
  {
    id: '7',
    date: new Date(2026, 6, 10),
    title: 'English Assignment',
    category: 'assignment',
    time: '04:00 PM',
  },
  {
    id: '8',
    date: new Date(2026, 6, 12),
    title: 'History Exam',
    category: 'exam',
    time: '01:00 PM',
  },
]

// Mock today's schedule
const mockTodayEvents: TodayEvent[] = [
  {
    id: '1',
    time: '09:00 AM',
    subject: 'Biology 101: Cell Structure',
    instructor: 'Dr. Sarah Anderson',
    duration: '1 hour',
    location: 'Room 204 / Online',
    isLive: false,
    status: 'upcoming',
  },
  {
    id: '2',
    time: '11:00 AM',
    subject: 'Chemistry Lab: Organic Synthesis',
    instructor: 'Dr. Michael Park',
    duration: '2 hours',
    location: 'Lab 302',
    isLive: true,
    status: 'live',
  },
  {
    id: '3',
    time: '02:00 PM',
    subject: 'Mathematics Discussion: Calculus III',
    instructor: 'Dr. James Chen',
    duration: '1.5 hours',
    location: 'Online - Zoom',
    isLive: false,
    status: 'upcoming',
  },
]

// Mock upcoming events
const mockUpcomingEvents: UpcomingEvent[] = [
  {
    id: '1',
    title: 'Physics Exam',
    date: 'July 8, 2026',
    time: '10:00 AM',
    category: 'exam',
    countdownText: '4 days',
    priority: 'high',
  },
  {
    id: '2',
    title: 'Chemistry Assignment Due',
    date: 'July 6, 2026',
    time: '11:59 PM',
    category: 'assignment',
    countdownText: '2 days',
    priority: 'high',
  },
  {
    id: '3',
    title: 'Group Study Session',
    date: 'July 7, 2026',
    time: '03:00 PM',
    category: 'meeting',
    countdownText: '3 days',
    priority: 'medium',
  },
  {
    id: '4',
    title: 'Biology Research Project',
    date: 'July 15, 2026',
    time: '11:59 PM',
    category: 'assignment',
    countdownText: '11 days',
    priority: 'medium',
  },
]

// Mock statistics
const mockStatistics: StatisticItem[] = [
  {
    id: '1',
    label: 'Classes This Week',
    value: '8',
    color: '#22819A',
    icon: <Clock size={20} />,
  },
  {
    id: '2',
    label: 'Upcoming Assignments',
    value: '5',
    color: '#C9972A',
    icon: <FileText size={20} />,
  },
  {
    id: '3',
    label: 'Exams Scheduled',
    value: '3',
    color: '#35A8C8',
    icon: <ClipboardList size={20} />,
  },
  {
    id: '4',
    label: 'Study Hours',
    value: '12.5 hrs',
    color: '#90C2E7',
    icon: <Users size={20} />,
  },
]

// Quick actions
const getQuickActions = () => [
  {
    id: '1',
    icon: <Play size={20} />,
    label: 'Join Live Class',
    onClick: () => console.log('Join live class'),
  },
  {
    id: '2',
    icon: <Plus size={20} />,
    label: 'Add Event',
    onClick: () => console.log('Add event'),
  },
  {
    id: '3',
    icon: <BookOpen size={20} />,
    label: 'Schedule Study',
    onClick: () => console.log('Schedule study'),
  },
  {
    id: '4',
    icon: <FileText size={20} />,
    label: 'View Assignments',
    onClick: () => console.log('View assignments'),
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
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

export default function SchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 6, 1))
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 6, 4))
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  const handleViewModeChange = (mode: 'month' | 'week' | 'day') => {
    setViewMode(mode)
  }

  return (
    <Layout title="Schedule" activeRoute="/schedule">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <div className="mb-8">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-ink mb-2">
              Schedule
            </h1>
            <p className="text-lg text-muted font-body max-w-3xl">
              Manage your academic calendar, classes, assignments, exams and events from one place.
            </p>
          </div>
        </motion.div>

        {/* Calendar Header with Controls */}
        <motion.div variants={itemVariants}>
          <CalendarHeader
            currentDate={currentDate}
            onPreviousMonth={handlePreviousMonth}
            onNextMonth={handleNextMonth}
            onToday={handleToday}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />
        </motion.div>

        {/* Main Layout: Calendar + Right Panel */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar Section - 2/3 width on desktop */}
            <div className="lg:col-span-2 space-y-6">
              <Calendar
                currentDate={currentDate}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
                events={mockScheduleEvents}
                viewMode={viewMode}
              />
            </div>

            {/* Right Panel - 1/3 width on desktop */}
            <div className="space-y-6">
              {/* Statistics */}
              <ScheduleStatistics statistics={mockStatistics} />

              {/* Quick Actions */}
              <QuickActions actions={getQuickActions()} />
            </div>
          </div>
        </motion.div>

        {/* Today's Schedule and Upcoming Events */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Schedule */}
            <TodaySchedule
              events={mockTodayEvents}
              onJoinClass={(eventId) => console.log(`Joining class ${eventId}`)}
            />

            {/* Upcoming Events */}
            <UpcomingEvents events={mockUpcomingEvents} />
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  )
}
