'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  BookOpen,
  TrendingUp,
  Award,
  ArrowUpRight,
  ArrowDownLeft,
} from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { MetricCard } from '@/components/metrics/MetricCard'
import { Chart } from '@/components/charts/Chart'
import { Table, type TableColumn } from '@/components/data/Table'
import { ActivityFeed, type ActivityItem } from '@/components/feedback/ActivityFeed'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { ANIMATION } from '@/utils/designTokens'

// Mock data
const metricsData = [
  {
    label: 'Total Students',
    value: '1,250',
    trend: { direction: 'up' as const, percentage: 12 },
    icon: <Users size={24} />,
  },
  {
    label: 'Active Courses',
    value: '42',
    trend: { direction: 'up' as const, percentage: 8 },
    icon: <BookOpen size={24} />,
  },
  {
    label: 'Avg Score',
    value: '78.5%',
    trend: { direction: 'down' as const, percentage: 3 },
    icon: <Award size={24} />,
  },
  {
    label: 'System Uptime',
    value: '99.9%',
    trend: { direction: 'up' as const, percentage: 0.2 },
    icon: <TrendingUp size={24} />,
    variant: 'highlighted' as const,
  },
]

const chartData = [
  { month: 'Jan', students: 400, revenue: 2400, completions: 240 },
  { month: 'Feb', students: 520, revenue: 2210, completions: 221 },
  { month: 'Mar', students: 680, revenue: 2290, completions: 229 },
  { month: 'Apr', students: 890, revenue: 2000, completions: 200 },
  { month: 'May', students: 1050, revenue: 2181, completions: 218 },
  { month: 'Jun', students: 1250, revenue: 2500, completions: 250 },
]

const studentsTableColumns: TableColumn[] = [
  { key: 'name', label: 'Name', width: '200px', sortable: true },
  { key: 'email', label: 'Email', width: '240px' },
  { key: 'course', label: 'Course', width: '160px', sortable: true },
  { key: 'progress', label: 'Progress', width: '120px' },
  {
    key: 'status',
    label: 'Status',
    width: '120px',
    render: (value) => {
      const statusClasses = {
        active: 'bg-secondary text-white',
        inactive: 'bg-muted/20 text-muted',
        completed: 'bg-gold text-white',
      }
      return (
        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${statusClasses[value as keyof typeof statusClasses] || statusClasses.inactive}`}>
          {value}
        </span>
      )
    },
  },
]

const studentsTableData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    course: 'Biology 101',
    progress: '85%',
    status: 'active',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    course: 'Chemistry 201',
    progress: '92%',
    status: 'active',
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@example.com',
    course: 'Physics 101',
    progress: '100%',
    status: 'completed',
  },
  {
    id: 4,
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    course: 'Mathematics 301',
    progress: '65%',
    status: 'active',
  },
  {
    id: 5,
    name: 'Olivia Brown',
    email: 'olivia.brown@example.com',
    course: 'Biology 101',
    progress: '78%',
    status: 'active',
  },
  {
    id: 6,
    name: 'Ethan Davis',
    email: 'ethan.davis@example.com',
    course: 'Chemistry 201',
    progress: '45%',
    status: 'inactive',
  },
]

const activityItems: ActivityItem[] = [
  {
    id: '1',
    timestamp: '2 hours ago',
    actor: 'Sarah Johnson',
    action: 'completed Biology 101 course',
    type: 'success',
  },
  {
    id: '2',
    timestamp: '4 hours ago',
    actor: 'Michael Chen',
    action: 'scored 92% on Chemistry quiz',
    type: 'success',
  },
  {
    id: '3',
    timestamp: '1 day ago',
    actor: 'System',
    action: 'maintenance scheduled for tonight',
    type: 'warning',
  },
  {
    id: '4',
    timestamp: '2 days ago',
    actor: 'Admin',
    action: 'uploaded new course materials',
    type: 'neutral',
  },
  {
    id: '5',
    timestamp: '3 days ago',
    actor: 'Emma Rodriguez',
    action: 'enrolled in Physics 101',
    type: 'success',
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

export default function DashboardPage() {
  return (
    <Layout title="Dashboard" activeRoute="/">
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
                Dashboard
              </h1>
              <p className="text-muted font-body">
                Welcome back! Here's your academy overview for this month.
              </p>
            </div>
            <Button variant="primary" size="lg">
              Export Report
            </Button>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-responsive">
            {metricsData.map((metric, idx) => (
              <MetricCard
                key={idx}
                label={metric.label}
                value={metric.value}
                trend={metric.trend}
                icon={metric.icon}
                variant={metric.variant}
              />
            ))}
          </div>
        </motion.div>

        {/* Charts Row */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-responsive">
            <Chart
              title="Student Enrollment Trend"
              data={chartData}
              type="line"
              dataKeys={['students']}
              height={300}
            />
            <Chart
              title="Revenue & Completions"
              data={chartData}
              type="bar"
              dataKeys={['revenue', 'completions']}
              height={300}
            />
          </div>
        </motion.div>

        {/* Activity & Quick Stats */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-responsive">
            <div className="lg:col-span-2">
              <Table
                title="Student Management"
                columns={studentsTableColumns}
                data={studentsTableData}
                pageSize={5}
              />
            </div>
            <ActivityFeed items={activityItems} title="Recent Activity" maxItems={5} />
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <Card padding="lg">
            <h2 className="font-display font-bold text-xl text-ink mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="secondary" className="w-full">
                <BookOpen size={18} className="mr-2" />
                Create Course
              </Button>
              <Button variant="secondary" className="w-full">
                <Users size={18} className="mr-2" />
                Add Student
              </Button>
              <Button variant="secondary" className="w-full">
                <TrendingUp size={18} className="mr-2" />
                View Analytics
              </Button>
              <Button variant="secondary" className="w-full">
                <Award size={18} className="mr-2" />
                Manage Certificates
              </Button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </Layout>
  )
}
