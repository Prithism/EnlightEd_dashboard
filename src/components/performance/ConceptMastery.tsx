'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { Zap, AlertCircle, BookOpen, Calculator, PenTool, Globe } from 'lucide-react'
import { ANIMATION } from '@/utils/designTokens'

interface MasteryTopic {
  id: string
  name: string
  proficiency: number
  status: 'STEADY' | 'MASTER' | 'NEEDS_WORK' | 'ACTION'
  hasDoubtHistory?: boolean
}

interface ConceptMasteryProps {
  subject: string
  topics: MasteryTopic[]
  suggestion: string
}

export const ConceptMastery: React.FC<ConceptMasteryProps> = ({ subject, topics, suggestion }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: ANIMATION.DURATION_BASE,
      },
    },
  }

  const getStatusBadge = (status: MasteryTopic['status']) => {
    switch (status) {
      case 'MASTER':
        return <Badge variant="success">MASTER</Badge>
      case 'STEADY':
        return <Badge variant="warning">STEADY</Badge>
      case 'NEEDS_WORK':
        return <Badge variant="danger">NEEDS WORK</Badge>
      case 'ACTION':
        return <Badge variant="danger">ACTION</Badge>
    }
  }

  const getBarColor = (status: MasteryTopic['status']) => {
    switch (status) {
      case 'MASTER': return 'bg-primary'
      case 'STEADY': return 'bg-secondary'
      case 'ACTION': return 'bg-orange-500'
      default: return 'bg-red-500'
    }
  }

  const getSubjectIcon = () => {
    switch (subject.toLowerCase()) {
      case 'science': return <BookOpen size={14} className="text-muted" />
      case 'mathematics': return <Calculator size={14} className="text-muted" />
      case 'english': return <PenTool size={14} className="text-muted" />
      case 'history': return <Globe size={14} className="text-muted" />
      default: return <span className="font-serif text-muted italic">{subject.charAt(0).toLowerCase()}</span>
    }
  }

  return (
    <Card padding="lg" className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-display font-bold text-ink mb-1">
            <Zap size={20} className="text-secondary" />
            {subject} Concept Mastery
          </h2>
          <p className="text-sm text-muted">Granular proficiency levels across sub-topics</p>
        </div>
        <div className="flex gap-1">
          <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center">{getSubjectIcon()}</div>
          <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center">{getSubjectIcon()}</div>
          <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center">{getSubjectIcon()}</div>
        </div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 flex-grow"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {topics.map((topic) => (
          <motion.div
            key={topic.id}
            variants={itemVariants}
            className="bg-surface/50 p-4 rounded-xl border border-white/5"
          >
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-ink">{topic.name}</span>
              {getStatusBadge(topic.status)}
            </div>
            <div className="w-full bg-surface rounded-full h-1.5 mb-2 overflow-hidden">
              <motion.div
                className={`h-1.5 rounded-full ${getBarColor(topic.status)}`}
                initial={{ width: 0 }}
                animate={{ width: `${topic.proficiency}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted mb-3">
              <span>0%</span>
              <span>{topic.proficiency}% PROFICIENCY</span>
            </div>
            {topic.hasDoubtHistory && (
              <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-secondary text-xs font-bold uppercase tracking-wider rounded-lg transition-colors border border-white/5 mt-2">
                Doubt History
              </button>
            )}
          </motion.div>
        ))}
      </motion.div>

      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-4 items-start">
        <div className="bg-blue-500/20 p-2 rounded-full mt-0.5">
          <AlertCircle size={18} className="text-blue-400" />
        </div>
        <div>
          <h4 className="font-semibold text-blue-100 mb-1">Adaptive Learning Suggestion</h4>
          <p className="text-sm text-blue-200/70" dangerouslySetInnerHTML={{ __html: suggestion }} />
        </div>
      </div>
    </Card>
  )
}
