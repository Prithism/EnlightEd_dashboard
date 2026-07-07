'use client'

import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/layout/Layout'
import { MetricCard } from '@/components/metrics/MetricCard'
import { Chart } from '@/components/charts/Chart'
import { FilterChips } from '@/components/common/FilterChips'
import { ANIMATION } from '@/utils/designTokens'
import { TrendingUp, Calendar, Target, Award } from 'lucide-react'
import { AIPathOptimizer } from '@/components/performance/AIPathOptimizer'
import { ConceptMastery } from '@/components/performance/ConceptMastery'

const subjects = [
  { id: 'Mathematics', label: 'Mathematics' },
  { id: 'Science', label: 'Science' },
  { id: 'English', label: 'English' },
  { id: 'History', label: 'History' },
]

// Mock Data Generator for different subjects
const generateMockData = (subject: string) => {
  const baseScore = subject === 'Mathematics' ? 92 : subject === 'Science' ? 88 : subject === 'English' ? 95 : 85
  
  return {
    metrics: [
      {
        label: `${subject.toUpperCase()} AVG`,
        value: `${baseScore}%`,
        trend: { direction: 'up' as const, percentage: 3.2 },
        icon: <TrendingUp size={24} />,
      },
      {
        label: 'SUBJECT RANK',
        value: '4th / 38',
        trend: { direction: 'up' as const, percentage: 1, label: 'rank' },
        icon: <Award size={24} />,
      },
      {
        label: 'LECTURE HOURS',
        value: '42h',
        icon: <Calendar size={24} />,
      },
      {
        label: 'QUIZZES TAKEN',
        value: '12',
        icon: <Target size={24} />,
      },
    ],
    radarData: [
      { name: 'Mathematics', Mastery: 95 },
      { name: 'Science', Mastery: 88 },
      { name: 'English', Mastery: 92 },
      { name: 'History', Mastery: 85 },
    ],
    benchmarkingData: (() => {
      let topics = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5']
      if (subject === 'Mathematics') topics = ['Polynomials', 'Algebra', 'Quadratic Eq', 'Number Systems', 'Geometry']
      if (subject === 'Science') topics = ['Thermodynamics', 'Optics', 'Genetics', 'Electrochem', 'Mechanics']
      if (subject === 'English') topics = ['Grammar', 'Literature', 'Vocabulary', 'Composition', 'Phonetics']
      if (subject === 'History') topics = ['Ancient', 'WWII', 'Modern Era', 'Civics', 'Cold War']
      
      return topics.map((name, i) => ({
        name,
        'Batch Average': baseScore - (15 - i * 2),
        'Your Mastery': baseScore + (i % 2 === 0 ? 2 : -5)
      }))
    })(),
    conceptTopics: (() => {
      if (subject === 'Science') {
        return [
          { id: '1', name: 'Thermodynamics', proficiency: 45, status: 'ACTION' as const },
          { id: '2', name: 'Optics', proficiency: 90, status: 'MASTER' as const },
          { id: '3', name: 'Genetics', proficiency: 78, status: 'STEADY' as const, hasDoubtHistory: true },
          { id: '4', name: 'Electrochem', proficiency: 85, status: 'MASTER' as const },
        ]
      }
      if (subject === 'English') {
        return [
          { id: '1', name: 'Grammar', proficiency: 92, status: 'MASTER' as const },
          { id: '2', name: 'Literature', proficiency: 85, status: 'MASTER' as const },
          { id: '3', name: 'Vocabulary', proficiency: 70, status: 'STEADY' as const },
          { id: '4', name: 'Composition', proficiency: 90, status: 'MASTER' as const },
        ]
      }
      if (subject === 'History') {
        return [
          { id: '1', name: 'Ancient History', proficiency: 80, status: 'STEADY' as const },
          { id: '2', name: 'World War II', proficiency: 95, status: 'MASTER' as const },
          { id: '3', name: 'Modern Era', proficiency: 65, status: 'STEADY' as const, hasDoubtHistory: true },
          { id: '4', name: 'Civics', proficiency: 88, status: 'MASTER' as const },
        ]
      }
      // Default Mathematics
      return [
        { id: '1', name: 'Calculus', proficiency: 80, status: 'STEADY' as const },
        { id: '2', name: 'Algebra', proficiency: 95, status: 'MASTER' as const },
        { id: '3', name: 'Trigonometry', proficiency: 62, status: 'STEADY' as const, hasDoubtHistory: true },
        { id: '4', name: 'Statistics', proficiency: 88, status: 'MASTER' as const },
      ]
    })(),
    suggestion: (() => {
      const topic = subject === 'Science' ? 'Genetics' : subject === 'Mathematics' ? 'Trigonometry' : subject === 'English' ? 'Vocabulary' : 'Modern Era'
      return `Your mastery in <strong>${topic}</strong> is currently below batch average. We recommend attempting a practice set before the next lecture.`
    })(),
  }
}

export default function PerformancePage() {
  const [activeSubject, setActiveSubject] = useState('Mathematics')
  
  const data = useMemo(() => generateMockData(activeSubject), [activeSubject])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: ANIMATION.DURATION_LONG, ease: ANIMATION.EASING_SPRING },
    },
  }

  return (
    <Layout title="Performance" activeRoute="/performance">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
        
        {/* Page Header */}
        <motion.div variants={itemVariants} className="flex flex-col xl:flex-row justify-between xl:items-center gap-4 mb-2">
          <div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-ink mb-1">
              Performance Deep-Dive
            </h1>
            <p className="text-muted font-body">
              Granular academic monitoring and mastery mapping
            </p>
          </div>
          <div className="flex bg-surface border border-white/5 p-1 rounded-xl">
            <FilterChips
              chips={subjects}
              activeChip={activeSubject}
              onChipChange={setActiveSubject}
            />
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.metrics.map((metric) => (
            <MetricCard
              key={metric.label}
              label={metric.label}
              value={metric.value}
              trend={metric.trend}
              icon={metric.icon}
            />
          ))}
        </motion.div>

        {/* Middle Section: Mastery Balance & AI Path Optimizer */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 xl:col-span-4">
            <Chart
              title="Mastery Balance"
              data={data.radarData}
              type="radar"
              dataKeys={['Mastery']}
              height={320}
              colors={['#25B0A2']}
            />
          </div>
          <div className="lg:col-span-7 xl:col-span-8">
            <AIPathOptimizer subject={activeSubject} />
          </div>
        </motion.div>

        {/* Bottom Section: Chapter Benchmarking & Concept Mastery */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-8">
          <div className="lg:col-span-6 xl:col-span-5">
            <Chart
              title={`${activeSubject} Chapter Benchmarking`}
              data={data.benchmarkingData}
              type="bar"
              dataKeys={['Batch Average', 'Your Mastery']}
              height={350}
              colors={['rgba(255, 255, 255, 0.5)', '#25B0A2']}
            />
          </div>
          <div className="lg:col-span-6 xl:col-span-7">
            <ConceptMastery 
              subject={activeSubject} 
              topics={data.conceptTopics} 
              suggestion={data.suggestion} 
            />
          </div>
        </motion.div>

      </motion.div>
    </Layout>
  )
}
