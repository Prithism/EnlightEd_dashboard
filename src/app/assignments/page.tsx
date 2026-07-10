'use client'

import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Microscope, Calculator, Beaker, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Layout } from '@/components/layout/Layout'
import { AssignmentCard } from '@/components/assignment/AssignmentCard'
import { FilterChips } from '@/components/common/FilterChips'
import { ANIMATION } from '@/utils/designTokens'

type AssignmentStatus = 'pending' | 'in-progress' | 'graded'

interface Assignment {
  id: string
  subject: string
  title: string
  description: string
  dueDate: string
  status: AssignmentStatus
  progress?: number
  score?: number
  icon: React.ReactNode
  subjectColor: string
}

const subjectIcons = {
  Biology: <Microscope size={20} className="text-secondary" />,
  Chemistry: <Beaker size={20} className="text-gold" />,
  Mathematics: <Calculator size={20} className="text-primary" />,
  Physics: <BookOpen size={20} className="text-primary" />,
  'English': <FileText size={20} className="text-secondary" />,
}

// Mock assignments data
const assignmentsData: Assignment[] = [
  {
    id: '1',
    subject: 'Biology',
    title: 'Cellular Respiration Study Report',
    description: 'Write a comprehensive report on cellular respiration processes including glycolysis, Krebs cycle, and electron transport chain.',
    dueDate: 'Mar 5, 2026',
    status: 'pending',
    icon: subjectIcons.Biology,
    subjectColor: 'secondary',
  },
  {
    id: '2',
    subject: 'Chemistry',
    title: 'Organic Synthesis Problem Set',
    description: 'Solve 15 complex organic synthesis problems covering reactions, mechanisms, and synthetic strategies.',
    dueDate: 'Mar 6, 2026',
    status: 'pending',
    icon: subjectIcons.Chemistry,
    subjectColor: 'gold',
  },
  {
    id: '3',
    subject: 'Mathematics',
    title: 'Calculus Integration Worksheet',
    description: 'Complete 20 integration problems using various techniques including substitution, integration by parts, and partial fractions.',
    dueDate: 'Mar 8, 2026',
    status: 'in-progress',
    progress: 65,
    icon: subjectIcons.Mathematics,
    subjectColor: 'primary',
  },
  {
    id: '4',
    subject: 'Physics',
    title: 'Mechanics Lab Report',
    description: 'Document your findings from the pendulum motion experiment with data analysis and calculations.',
    dueDate: 'Mar 3, 2026',
    status: 'in-progress',
    progress: 45,
    icon: subjectIcons.Physics,
    subjectColor: 'primary',
  },
  {
    id: '5',
    subject: 'Biology',
    title: 'Genetics Assignment Quiz',
    description: 'Multiple choice and short answer questions on Mendelian genetics, DNA replication, and protein synthesis.',
    dueDate: 'Feb 28, 2026',
    status: 'graded',
    score: 92,
    icon: subjectIcons.Biology,
    subjectColor: 'secondary',
  },
  {
    id: '6',
    subject: 'Chemistry',
    title: 'Equilibrium Concept Test',
    description: 'Test covering chemical equilibrium, Le Chatelier\'s principle, and equilibrium calculations.',
    dueDate: 'Feb 25, 2026',
    status: 'graded',
    score: 88,
    icon: subjectIcons.Chemistry,
    subjectColor: 'gold',
  },
  {
    id: '7',
    subject: 'Physics',
    title: 'Thermodynamics Essay',
    description: 'Write an essay on the laws of thermodynamics and their real-world applications.',
    dueDate: 'Feb 20, 2026',
    status: 'graded',
    score: 85,
    icon: subjectIcons.Physics,
    subjectColor: 'primary',
  },
  {
    id: '8',
    subject: 'Mathematics',
    title: 'Linear Algebra Project',
    description: 'Create a presentation on matrix operations and their applications in computer graphics.',
    dueDate: 'Feb 15, 2026',
    status: 'graded',
    score: 95,
    icon: subjectIcons.Mathematics,
    subjectColor: 'primary',
  },
  {
    id: '9',
    subject: 'English',
    title: 'Research Paper: Literature Analysis',
    description: 'Write a 5-page research paper analyzing themes in classic literature.',
    dueDate: 'Mar 10, 2026',
    status: 'pending',
    icon: subjectIcons.English,
    subjectColor: 'secondary',
  },
]

const filterOptions = [
  { id: 'all', label: 'All' },
  { id: 'pending', label: 'Pending' },
  { id: 'in-progress', label: 'In Progress' },
  { id: 'graded', label: 'Graded' },
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

export default function AssignmentsPage() {
  const router = useRouter()
  const [activeFilter, setActiveFilter] = React.useState('all')

  // Filter assignments based on selected status
  const filteredAssignments = useMemo(() => {
    if (activeFilter === 'all') return assignmentsData
    return assignmentsData.filter((a) => a.status === activeFilter)
  }, [activeFilter])

  // Count statistics
  const stats = {
    total: assignmentsData.length,
    pending: assignmentsData.filter((a) => a.status === 'pending').length,
    inProgress: assignmentsData.filter((a) => a.status === 'in-progress').length,
    graded: assignmentsData.filter((a) => a.status === 'graded').length,
  }

  return (
    <Layout title="Quiz" activeRoute="/assignments">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-8"
      >
        {/* Hero Header */}
        <motion.div variants={itemVariants}>
          <div className="mb-8">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-ink mb-2">
              Academic Coursework
            </h1>
            <p className="text-lg text-muted font-body max-w-2xl">
              Track, manage, and submit your assignments across all courses. Stay organized and never miss a deadline.
            </p>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Quizzes', value: stats.total, color: 'text-ink' },
              { label: 'Pending', value: stats.pending, color: 'text-gold' },
              { label: 'In Progress', value: stats.inProgress, color: 'text-primary' },
              { label: 'Graded', value: stats.graded, color: 'text-secondary' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl glass border-l-4"
                style={{
                  borderLeftColor:
                    stat.color === 'text-gold'
                      ? '#C9972A'
                      : stat.color === 'text-primary'
                        ? '#22819A'
                        : stat.color === 'text-secondary'
                          ? '#90C2E7'
                          : '#13323A',
                }}
              >
                <p className="text-xs text-muted font-body uppercase tracking-wide mb-1">
                  {stat.label}
                </p>
                <p className={`text-2xl font-body font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Filter Chips */}
        <motion.div variants={itemVariants}>
          <div className="space-y-4">
            <p className="text-sm text-muted font-body uppercase tracking-wide">Filter by Status</p>
            <FilterChips
              chips={filterOptions}
              activeChip={activeFilter}
              onChipChange={setActiveFilter}
            />
          </div>
        </motion.div>

        {/* Assignments Grid */}
        <motion.div variants={itemVariants}>
          {filteredAssignments.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-responsive">
              {filteredAssignments.map((assignment) => (
                <AssignmentCard
                  key={assignment.id}
                  {...assignment}
                  onAction={() => router.push(`/assignments/${assignment.id}`)}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <BookOpen size={48} className="mx-auto text-muted/40 mb-4" />
              <h3 className="font-display font-bold text-2xl text-ink mb-2">No Quizzes</h3>
              <p className="text-muted font-body">
                No quizzes match the selected filter. Try a different filter or check back later.
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </Layout>
  )
}
