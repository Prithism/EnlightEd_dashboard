'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Clock, AlertCircle, Bell } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { MetricCard } from '@/components/metrics/MetricCard'
import { BatchCard } from '@/components/batch/BatchCard'
import { TimelineCard } from '@/components/batch/TimelineCard'
import { AssignmentCard } from '@/components/batch/AssignmentCard'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { ANIMATION } from '@/utils/designTokens'

// Mock data
const metricsData = [
  {
    label: 'Active Batches',
    value: '4',
    icon: <BookOpen size={24} />,
  },
  {
    label: 'Pending Assignments',
    value: '2',
    trend: { direction: 'up' as const, percentage: 1 },
    icon: <AlertCircle size={24} />,
  },
  {
    label: 'Upcoming Classes',
    value: '6',
    icon: <Clock size={24} />,
  },
]

const batchesData = [
  {
    id: '1',
    courseName: 'Biology 101: Cellular Life',
    instructor: 'Dr. Sarah Anderson',
    batchId: 'BIO-101-A',
    progress: 65,
    completionPercentage: 65,
    nextClass: 'Today, 2:00 PM',
    studentCount: 45,
  },
  {
    id: '2',
    courseName: 'Chemistry 201: Organic Reactions',
    instructor: 'Dr. Michael Park',
    batchId: 'CHEM-201-B',
    progress: 45,
    completionPercentage: 45,
    nextClass: 'Tomorrow, 10:00 AM',
    studentCount: 32,
  },
  {
    id: '3',
    courseName: 'Physics 101: Classical Mechanics',
    instructor: 'Dr. Emma Wilson',
    batchId: 'PHY-101-A',
    progress: 80,
    completionPercentage: 80,
    nextClass: 'Mar 8, 3:30 PM',
    studentCount: 38,
  },
  {
    id: '4',
    courseName: 'Mathematics 301: Calculus III',
    instructor: 'Dr. James Chen',
    batchId: 'MATH-301-C',
    progress: 55,
    completionPercentage: 55,
    nextClass: 'Mar 9, 11:00 AM',
    studentCount: 28,
  },
]

const upcomingClasses = [
  {
    id: '1',
    title: 'Cell Structure and Function',
    time: '2:00 PM',
    date: 'Today',
    type: 'class' as const,
    location: 'Virtual - Zoom',
    isUpcoming: true,
  },
  {
    id: '2',
    title: 'Photosynthesis Process',
    time: '10:00 AM',
    date: 'Tomorrow',
    type: 'class' as const,
    location: 'Virtual - Zoom',
    isUpcoming: true,
  },
  {
    id: '3',
    title: 'Reaction Mechanisms Quiz',
    time: '3:00 PM',
    date: 'Mar 8',
    type: 'exam' as const,
    location: 'Lab Room 302',
    isUpcoming: true,
  },
  {
    id: '4',
    title: 'Derivatives and Integrals',
    time: '11:00 AM',
    date: 'Mar 9',
    type: 'class' as const,
    location: 'Virtual - Teams',
    isUpcoming: false,
  },
  {
    id: '5',
    title: 'Mechanics Problem Solving',
    time: '4:00 PM',
    date: 'Mar 10',
    type: 'assignment' as const,
    isUpcoming: false,
  },
]

const assignmentsData = [
  {
    id: '1',
    title: 'Write a report on Mitochondria',
    course: 'Biology 101',
    dueDate: 'Mar 5, 11:59 PM',
    status: 'pending' as const,
  },
  {
    id: '2',
    title: 'Organic Synthesis Problem Set',
    course: 'Chemistry 201',
    dueDate: 'Mar 6, 5:00 PM',
    status: 'pending' as const,
  },
  {
    id: '3',
    title: 'Force and Motion Experiment',
    course: 'Physics 101',
    dueDate: 'Mar 4, 11:59 PM',
    status: 'submitted' as const,
  },
  {
    id: '4',
    title: 'Calculus Integration Quiz',
    course: 'Mathematics 301',
    dueDate: 'Feb 28',
    status: 'graded' as const,
    score: 92,
  },
]

const announcementsData = [
  {
    id: '1',
    title: 'Midterm Exam Postponed',
    course: 'Biology 101',
    date: 'Mar 1',
    content: 'The midterm exam has been rescheduled to March 15th due to facility maintenance.',
  },
  {
    id: '2',
    title: 'New Lab Safety Guidelines',
    course: 'Chemistry 201',
    date: 'Feb 28',
    content: 'All students must review the updated lab safety guidelines before attending lab sessions.',
  },
  {
    id: '3',
    title: 'Guest Lecture: Quantum Physics',
    course: 'Physics 101',
    date: 'Feb 27',
    content: 'Prof. Robert Johnson will give a special lecture on quantum mechanics on March 10th.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

export default function MyBatchesPage() {
  return (
    <Layout title="My Batches" activeRoute="/batches">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Page Header */}
        <motion.div variants={itemVariants}>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-ink mb-2">
                My Batches
              </h1>
              <p className="text-muted font-body">
                Track your enrolled courses and manage your learning progress.
              </p>
            </div>
            <Button variant="primary" size="lg">
              <Bell size={18} className="mr-2" />
              Browse Courses
            </Button>
          </div>
        </motion.div>

        {/* Metrics Row */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-responsive">
            {metricsData.map((metric) => (
              <MetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                trend={metric.trend}
                icon={metric.icon}
              />
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-responsive">
            {/* Left Column: Batches */}
            <div className="lg:col-span-2 space-y-8">
              {/* Active Batches */}
              <div>
                <h2 className="font-display font-bold text-2xl text-ink mb-4">Active Batches</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-responsive">
                  {batchesData.map((batch) => (
                    <BatchCard
                      key={batch.id}
                      {...batch}
                      onContinue={() => console.log(`Continue ${batch.id}`)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Timeline & Assignments */}
            <div className="space-y-6">
              {/* Upcoming Classes */}
              <TimelineCard title="Upcoming Classes" items={upcomingClasses} />

              {/* Assignments */}
              <AssignmentCard
                title="Pending Assignments"
                assignments={assignmentsData.filter((a) => a.status === 'pending')}
              />
            </div>
          </div>
        </motion.div>

        {/* Announcements Section */}
        <motion.div variants={itemVariants}>
          <Card padding="lg">
            <h2 className="font-display font-bold text-2xl text-ink mb-4">
              Announcements
            </h2>

            <div className="space-y-3">
              {announcementsData.map((announcement) => (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-body font-semibold text-ink">{announcement.title}</h3>
                      <p className="text-xs text-muted font-body mt-1">{announcement.course}</p>
                    </div>
                    <span className="text-xs text-muted font-body flex-shrink-0">{announcement.date}</span>
                  </div>
                  <p className="text-sm text-muted font-body line-clamp-2">{announcement.content}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card padding="lg">
            <h2 className="font-display font-bold text-xl text-ink mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="secondary" className="w-full">
                <BookOpen size={18} className="mr-2" />
                All Courses
              </Button>
              <Button variant="secondary" className="w-full">
                <Clock size={18} className="mr-2" />
                Schedule
              </Button>
              <Button variant="secondary" className="w-full">
                <AlertCircle size={18} className="mr-2" />
                Grades
              </Button>
              <Button variant="secondary" className="w-full">
                <Bell size={18} className="mr-2" />
                Messages
              </Button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  )
}
