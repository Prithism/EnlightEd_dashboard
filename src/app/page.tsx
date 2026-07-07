'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Flame, Trophy, Zap, Award, RefreshCw } from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { Chart } from '@/components/charts/Chart'
import { StudentMetricCard } from '@/components/dashboard/StudentMetricCard'
import { AIGrowthInsights } from '@/components/dashboard/AIGrowthInsights'
import { DashboardConceptMastery } from '@/components/dashboard/DashboardConceptMastery'
import { LiveSessionsList } from '@/components/dashboard/LiveSessionsList'
import { ANIMATION } from '@/utils/designTokens'

// Simulated Backend Data Source
const generateDashboardData = () => {
  return {
    metrics: [
      { 
        label: 'LEARNING STREAK', 
        value: '7 Days', 
        subtext: 'Next goal: 10 Days', 
        icon: <Flame size={20} className="text-orange-500" />, 
        iconColorClass: 'text-orange-500 bg-orange-500/10',
        progress: 70 
      },
      { 
        label: 'CURRENT STANDING', 
        value: '12th / 38', 
        subtext: 'Mathematics Mastery Batch', 
        icon: <Trophy size={20} className="text-yellow-500" />,
        iconColorClass: 'text-yellow-500 bg-yellow-500/10',
        trend: '+12%' 
      },
      { 
        label: 'QUIZ SCORE AVG', 
        value: '24.5 / 30', 
        subtext: 'Last 5 Assessments', 
        icon: <Zap size={20} className="text-blue-400" fill="currentColor" />, 
        iconColorClass: 'text-blue-400 bg-blue-400/10',
        trend: '+12%' 
      },
      { 
        label: 'MASTERY INDEX', 
        value: '84%', 
        subtext: 'Across all chapters', 
        icon: <Award size={20} className="text-purple-400" />, 
        iconColorClass: 'text-purple-400 bg-purple-400/10',
        trend: '+12%' 
      },
    ],
    scoreProgression: [
      { name: 'Mon', score: 65 },
      { name: 'Tue', score: 78 },
      { name: 'Wed', score: 72 },
      { name: 'Thu', score: 85 },
      { name: 'Fri', score: 92 },
      { name: 'Sat', score: 88 },
      { name: 'Sun', score: 95 },
    ],
    aiInsight: 'Focus on active recall for your Science chapters this week.',
    conceptMastery: [
      { name: 'ALGEBRA', proficiency: 95 },
      { name: 'QUADRATIC EQ', proficiency: 42 },
      { name: 'ATOMIC STRUCTURE', proficiency: 88 },
      { name: 'THERMODYNAMICS', proficiency: 65 },
    ],
    liveSessions: [
      { time: '04:00 PM', title: 'Quadratic Equations Final Recap', subtitle: 'MATH 9A • LIVE ROOM 1' },
      { time: '06:00 PM', title: 'Atomic Structures - Advanced', subtitle: 'SCIENCE 9B • LIVE ROOM 2' },
    ],
  }
}

export default function DashboardPage() {
  const [data, setData] = useState<ReturnType<typeof generateDashboardData> | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate backend API latency
    const timer = setTimeout(() => {
      setData(generateDashboardData())
      setIsLoading(false)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
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

  if (isLoading || !data) {
    return (
      <Layout title="Dashboard" activeRoute="/">
        <div className="space-y-6 animate-pulse">
          <div className="flex justify-between items-center mb-2">
            <div className="h-10 w-48 bg-white/10 rounded-xl"></div>
            <div className="h-10 w-48 bg-white/10 rounded-xl hidden md:block"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-white/5 border border-white/5 rounded-2xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-8 flex flex-col gap-6">
              <div className="h-80 bg-white/5 border border-white/5 rounded-2xl"></div>
              <div className="h-64 bg-white/5 border border-white/5 rounded-2xl"></div>
            </div>
            <div className="xl:col-span-4 flex flex-col gap-6">
              <div className="h-48 bg-white/5 border border-white/5 rounded-3xl"></div>
              <div className="h-96 bg-white/5 border border-white/5 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Dashboard" activeRoute="/">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="space-y-6"
      >
        {/* Page Header */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-ink">
            Dashboard
          </h1>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-surface border border-white/5 px-4 py-2 rounded-xl">
              <span className="text-muted text-xs font-bold tracking-wider uppercase">Multi-device sync:</span>
              <span className="text-muted text-xs font-bold tracking-wider uppercase mr-1">Active</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            </div>
            <button className="bg-surface border border-white/5 p-2 rounded-xl text-muted hover:text-ink transition-colors">
              <RefreshCw size={18} />
            </button>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div variants={itemVariants}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.metrics.map((metric) => (
              <StudentMetricCard
                key={metric.label}
                label={metric.label}
                value={metric.value}
                subtext={metric.subtext}
                icon={metric.icon}
                iconColorClass={metric.iconColorClass}
                trend={metric.trend}
                progress={metric.progress}
              />
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          
          {/* Left Column (Chart + Sessions) */}
          <div className="xl:col-span-8 flex flex-col gap-6">
            <Chart
              title="Score Progression"
              data={data.scoreProgression}
              type="area"
              dataKeys={['score']}
              height={320}
              colors={['#25B0A2']}
            />
            <LiveSessionsList sessions={data.liveSessions} />
          </div>

          {/* Right Column (Insights + Mastery) */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            <AIGrowthInsights insightText={data.aiInsight} />
            <div className="flex-grow">
              <DashboardConceptMastery topics={data.conceptMastery} />
            </div>
          </div>
          
        </motion.div>

      </motion.div>
    </Layout>
  )
}
