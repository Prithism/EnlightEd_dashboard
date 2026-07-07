'use client'

import React, { useState } from 'react'
import { Layout } from '@/components/layout/Layout'
import { FilterChips } from '@/components/common/FilterChips'
import { Button } from '@/components/common/Button'
import { Search, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { ANIMATION } from '@/utils/designTokens'
import { PostCard, Post } from '@/components/peer-learning/PostCard'
import { StatsCard } from '@/components/peer-learning/StatsCard'

// Mock Data
const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    author: {
      name: 'Priya S.',
      avatarUrl: 'https://i.pravatar.cc/150?u=priya',
    },
    timeAgo: '2 HOURS AGO',
    subject: 'MATHEMATICS',
    title: 'Can someone explain why we use the discriminant method in quadratic equations? Is it faster than factorization?',
    upvotes: 12,
    replies: 4,
    status: 'expert',
    isExpertSolution: true,
  },
  {
    id: 'p2',
    author: {
      name: 'Arjun M.',
      avatarUrl: 'https://i.pravatar.cc/150?u=arjun',
    },
    timeAgo: '5 HOURS AGO',
    subject: 'SCIENCE',
    title: 'How do valence electrons determine the chemical reactivity of an element?',
    upvotes: 8,
    replies: 2,
    status: 'answered',
  },
  {
    id: 'p3',
    author: {
      name: 'Rahul D.',
      avatarUrl: 'https://i.pravatar.cc/150?u=rahul',
    },
    timeAgo: '1 HOUR AGO',
    subject: 'MATHEMATICS',
    title: 'Extremely confused about completing the square method. Help needed for the final exam revision!',
    upvotes: 24,
    replies: 0,
    status: 'unanswered',
  }
]

const CHIPS = [
  { id: 'all', label: 'All' },
  { id: 'mathematics', label: 'Mathematics' },
  { id: 'science', label: 'Science' },
  { id: 'english', label: 'English' },
  { id: 'history', label: 'History' },
]

export default function PeerLearningPage() {
  const [activeChip, setActiveChip] = useState('all')

  const filteredPosts = MOCK_POSTS.filter(post => {
    if (activeChip === 'all') return true
    return post.subject.toLowerCase() === activeChip
  })

  return (
    <Layout activeRoute="/peer-learning">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="font-display text-4xl font-bold text-ink mb-2">Peer Learning</h1>
            <p className="font-body text-muted text-lg">Learn together, solve doubts, and earn badges</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative glass rounded-lg flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input
                type="text"
                placeholder="Search forum..."
                className="w-full bg-transparent border-none py-2.5 pl-10 pr-4 text-sm font-body text-ink placeholder:text-muted focus:ring-2 focus:ring-primary/50 rounded-lg outline-none"
              />
            </div>
            <Button variant="primary" className="shrink-0 flex items-center gap-2 px-5">
              <Plus size={18} /> Ask
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="glass rounded-xl p-3 border border-white/10">
          <FilterChips
            chips={CHIPS}
            activeChip={activeChip}
            onChipChange={setActiveChip}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Posts List */}
          <div className="lg:col-span-3 space-y-4">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: ANIMATION.DURATION_BASE,
                  ease: ANIMATION.EASING_SPRING,
                  delay: index * 0.1,
                }}
              >
                <PostCard post={post} />
              </motion.div>
            ))}
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-12 glass rounded-2xl">
                <p className="text-muted font-body">No discussions found for this subject.</p>
              </div>
            )}
          </div>

          {/* Sidebar Widgets */}
          <div className="space-y-6">
            <StatsCard />
          </div>
        </div>
      </div>
    </Layout>
  )
}
