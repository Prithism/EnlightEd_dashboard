'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/layout/Layout'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { FilterChips } from '@/components/common/FilterChips'
import { Users, Clock, Star, Plus } from 'lucide-react'
import { ANIMATION } from '@/utils/designTokens'

const filterOptions = [
  { id: 'all', label: 'All Courses' },
  { id: 'active', label: 'Active' },
  { id: 'draft', label: 'Drafts' },
]

const coursesData = [
  { id: 1, title: 'Advanced Calculus', instructor: 'Dr. James Chen', students: 124, rating: 4.8, status: 'active', color: 'primary', duration: '12 weeks' },
  { id: 2, title: 'Organic Chemistry II', instructor: 'Dr. Sarah Anderson', students: 98, rating: 4.9, status: 'active', color: 'gold', duration: '14 weeks' },
  { id: 3, title: 'Physics: Mechanics', instructor: 'Prof. Michael Park', students: 156, rating: 4.7, status: 'active', color: 'secondary', duration: '10 weeks' },
  { id: 4, title: 'Intro to Data Science', instructor: 'Emma Rodriguez', students: 0, rating: 0, status: 'draft', color: 'ink', duration: '8 weeks' },
  { id: 5, title: 'World History: Modern Era', instructor: 'Dr. John Smith', students: 210, rating: 4.6, status: 'active', color: 'primary', duration: '16 weeks' },
  { id: 6, title: 'Literature Analysis', instructor: 'Prof. Olivia Brown', students: 85, rating: 4.9, status: 'active', color: 'secondary', duration: '12 weeks' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: ANIMATION.DURATION_BASE, ease: ANIMATION.EASING_SPRING } },
}

export default function CoursesPage() {
  const [activeFilter, setActiveFilter] = React.useState('all')

  const filteredCourses = coursesData.filter(course => activeFilter === 'all' || course.status === activeFilter)

  return (
    <Layout title="Courses" activeRoute="/courses">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
        
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display font-bold text-4xl text-ink mb-2">Course Management</h1>
            <p className="text-muted font-body">Create, manage and publish your curriculum.</p>
          </div>
          <Button variant="primary" className="flex items-center gap-2">
            <Plus size={18} /> Create Course
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants}>
          <FilterChips chips={filterOptions} activeChip={activeFilter} onChipChange={setActiveFilter} />
        </motion.div>

        {/* Grid */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-responsive">
          {filteredCourses.map((course) => (
            <motion.div key={course.id} variants={itemVariants}>
              <Card padding="md" className="h-full flex flex-col hover:border-primary/30 transition-colors group cursor-pointer">
                {/* Course Banner (Placeholder) */}
                <div className={`h-32 rounded-lg mb-4 bg-gradient-to-br opacity-80 ${
                  course.color === 'primary' ? 'from-teal-600 to-teal-800' :
                  course.color === 'gold' ? 'from-yellow-500 to-amber-700' :
                  course.color === 'secondary' ? 'from-blue-400 to-blue-600' :
                  'from-slate-400 to-slate-600'
                }`} />
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs px-2 py-1 rounded-md font-semibold uppercase ${
                      course.status === 'active' ? 'bg-primary/10 text-primary' : 'bg-muted/10 text-muted'
                    }`}>
                      {course.status}
                    </span>
                    {course.rating > 0 && (
                      <div className="flex items-center text-gold text-sm font-semibold">
                        <Star size={14} className="mr-1 fill-current" /> {course.rating}
                      </div>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-xl text-ink mb-1 group-hover:text-primary transition-colors">{course.title}</h3>
                  <p className="text-sm text-muted font-body mb-4">{course.instructor}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted border-t border-white/10 pt-4 mt-auto">
                  <div className="flex items-center gap-1"><Users size={16}/> {course.students}</div>
                  <div className="flex items-center gap-1"><Clock size={16}/> {course.duration}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

      </motion.div>
    </Layout>
  )
}
