'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Layout } from '@/components/layout/Layout'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'
import { 
  Camera, 
  Flame, 
  Award, 
  User, 
  Trophy, 
  Settings, 
  HelpCircle,
  Calendar,
  Mail,
  Phone,
  MapPin,
  BookOpen,
  FileText,
  TrendingUp,
  Plus
} from 'lucide-react'
import Image from 'next/image'

// --- Types & Interfaces (Hardened for Backend) ---
interface ParentInfo {
  name: string
  relation: string
  phone: string
  email: string
}

interface EnrolledBatch {
  id: string
  code: string
  name: string
  codeColor: string
}

interface ActivityMetrics {
  loginDays: number
  studyHours: number
  assignmentsCompleted: number
  doubtsAsked: number
}

interface ProfileData {
  id: string
  fullName: string
  avatarUrl: string
  grade: string
  board: string
  school: string
  currentStreak: number
  totalBadges: number
  dob: string
  email: string
  phone: string
  address: string
  parentInfo: ParentInfo
  enrolledBatches: EnrolledBatch[]
  activity: ActivityMetrics
}

// --- Mock Data Generator ---
const fetchProfileData = (): Promise<ProfileData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'usr_12345',
        fullName: 'Rahul Kumar',
        avatarUrl: 'https://i.pravatar.cc/150?u=rahul',
        grade: 'Class 9',
        board: 'CBSE',
        school: 'ABC Public School, New Delhi',
        currentStreak: 7,
        totalBadges: 12,
        dob: '12 May 2011',
        email: 'rahul.k@example.com',
        phone: '+91 98765 43210',
        address: '45, Green Park Extension, New Delhi',
        parentInfo: {
          name: 'Mr. Suresh Kumar',
          relation: 'Father',
          phone: '+91 99887 76655',
          email: 'suresh.k@work.com'
        },
        enrolledBatches: [
          { id: 'b_1', code: 'A1', name: 'Mathematics Mastery', codeColor: 'text-teal-500' },
          { id: 'b_2', code: 'S2', name: 'Advanced Science', codeColor: 'text-blue-500' },
          { id: 'b_3', code: 'E1', name: 'English Grammar Pro', codeColor: 'text-purple-500' },
        ],
        activity: {
          loginDays: 145,
          studyHours: 250,
          assignmentsCompleted: 88,
          doubtsAsked: 67
        }
      })
    }, 800) // Simulated latency
  })
}

export default function ProfilePage() {
  const [data, setData] = useState<ProfileData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('personal')

  useEffect(() => {
    fetchProfileData().then((res) => {
      setData(res)
      setIsLoading(false)
    })
  }, [])

  const tabs = [
    { id: 'personal', label: 'Personal & Academic', icon: <User size={18} /> },
    { id: 'achievements', label: 'Achievements', icon: <Trophy size={18} /> },
    { id: 'preferences', label: 'Preferences', icon: <Settings size={18} /> },
    { id: 'support', label: 'Support & Help', icon: <HelpCircle size={18} /> },
  ]

  if (isLoading || !data) {
    return (
      <Layout title="Profile" activeRoute="/profile">
        <div className="space-y-6 animate-pulse">
          {/* Banner Skeleton */}
          <div className="h-48 bg-white/5 border border-white/10 rounded-2xl"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar Skeleton */}
            <div className="lg:col-span-4 space-y-4">
              <div className="h-32 bg-white/5 border border-white/10 rounded-2xl"></div>
              <div className="h-64 bg-white/5 border border-white/10 rounded-2xl"></div>
            </div>
            
            {/* Content Skeleton */}
            <div className="lg:col-span-8 space-y-6">
              <div className="h-80 bg-white/5 border border-white/10 rounded-2xl"></div>
              <div className="h-64 bg-white/5 border border-white/10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout title="Profile" activeRoute="/profile">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-6 max-w-7xl mx-auto"
      >
        {/* Banner Section */}
        <Card className="overflow-hidden p-0 relative">
          <div className="h-32 bg-gradient-to-r from-teal-500 to-teal-700 w-full" />
          <div className="px-6 pb-6 relative flex flex-col md:flex-row items-start md:items-end justify-between gap-4 -mt-12">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-[#0b1021] bg-[#0b1021] relative z-10">
                  <Image 
                    src={data?.avatarUrl ?? 'https://i.pravatar.cc/150'} 
                    alt="Profile" 
                    fill 
                    className="object-cover"
                  />
                </div>
                <button className="absolute -bottom-2 -right-2 bg-primary text-white p-2 rounded-xl shadow-lg hover:bg-teal-600 transition-colors z-20">
                  <Camera size={16} />
                </button>
              </div>

              {/* User Info */}
              <div className="pt-4 md:pt-14 pb-1">
                <h1 className="text-2xl font-display font-bold text-ink mb-1">{data?.fullName ?? 'User'}</h1>
                <div className="flex items-center gap-2 text-sm font-bold text-muted uppercase tracking-wider">
                  <BookOpen size={14} className="text-secondary" />
                  <span>{data?.grade ?? 'Class'}</span>
                  <span>•</span>
                  <span>{data?.board ?? 'Board'}</span>
                  <span>•</span>
                  <span className="truncate max-w-[200px] sm:max-w-none">{data?.school ?? 'School'}</span>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <div className="pb-2 w-full md:w-auto">
              <Button variant="ghost" className="w-full md:w-auto border border-primary text-primary hover:bg-primary hover:text-white font-bold">
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Sidebar (Col-4) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Stats */}
            <Card padding="md" className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-surface/50 border border-white/5">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Flame size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mb-0.5">Current Streak</p>
                  <p className="text-lg font-bold text-ink">{data?.currentStreak ?? 0} Days</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 rounded-xl bg-surface/50 border border-white/5">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                  <Award size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted mb-0.5">Total Badges</p>
                  <p className="text-lg font-bold text-ink">{data?.totalBadges ?? 0} Earned</p>
                </div>
              </div>
            </Card>

            {/* Navigation Tabs */}
            <Card padding="sm" className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-body text-sm font-semibold
                    ${activeTab === tab.id 
                      ? 'bg-secondary text-white shadow-md' 
                      : 'text-muted hover:bg-white/5 hover:text-ink'
                    }
                  `}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </Card>
          </div>

          {/* Main Content (Col-8) */}
          <div className="lg:col-span-8 space-y-6">
            
            {activeTab === 'personal' && (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Personal Information */}
                <Card padding="lg">
                  <div className="flex items-center gap-2 mb-6">
                    <User className="text-secondary" size={20} />
                    <h2 className="text-xl font-display font-bold text-ink">Personal Information</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    <div className="flex items-start gap-3">
                      <User className="text-muted mt-0.5" size={16} />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Full Name</p>
                        <p className="text-sm font-semibold text-ink">{data?.fullName ?? 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="text-muted mt-0.5" size={16} />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Date of Birth</p>
                        <p className="text-sm font-semibold text-ink">{data?.dob ?? 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="text-muted mt-0.5" size={16} />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Email Address</p>
                        <p className="text-sm font-semibold text-ink">{data?.email ?? 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="text-muted mt-0.5" size={16} />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Phone Number</p>
                        <p className="text-sm font-semibold text-ink">{data?.phone ?? 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 md:col-span-2">
                      <MapPin className="text-muted mt-0.5" size={16} />
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-1">Residential Address</p>
                        <p className="text-sm font-semibold text-ink">{data?.address ?? 'N/A'}</p>
                      </div>
                    </div>

                    <div className="md:col-span-2 bg-surface/50 border border-primary/20 rounded-xl p-4 mt-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Parent Information</p>
                      <p className="text-sm font-semibold text-ink">{data?.parentInfo?.name ?? 'N/A'} ({data?.parentInfo?.relation ?? 'N/A'})</p>
                      <p className="text-sm text-muted mt-1">{data?.parentInfo?.phone ?? 'N/A'} • {data?.parentInfo?.email ?? 'N/A'}</p>
                    </div>
                  </div>
                </Card>

                {/* Academic Details */}
                <Card padding="lg">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <BookOpen className="text-secondary" size={20} />
                      <h2 className="text-xl font-display font-bold text-ink">Academic Details</h2>
                    </div>
                    <button className="text-xs font-bold uppercase tracking-wider text-primary hover:text-teal-400 transition-colors flex items-center gap-1">
                      Update Details <Plus size={14} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="flex items-center gap-4 bg-surface/30 p-4 rounded-xl border border-white/5">
                      <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-muted">
                        <BookOpen size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-0.5">Current School</p>
                        <p className="text-sm font-semibold text-ink">{data?.school ?? 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-surface/30 p-4 rounded-xl border border-white/5">
                      <div className="w-10 h-10 rounded-full bg-surface border border-white/10 flex items-center justify-center text-muted">
                        <FileText size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted mb-0.5">Education Board</p>
                        <p className="text-sm font-semibold text-ink">{data?.board ?? 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs font-bold uppercase tracking-wider text-muted mb-3">Enrolled Batches</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data?.enrolledBatches?.map((batch) => (
                      <div key={batch.id} className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-primary/50 transition-colors cursor-pointer group">
                        <span className={`text-sm font-bold ${batch.codeColor}`}>{batch.code}</span>
                        <span className="text-sm font-semibold text-ink group-hover:text-primary transition-colors">{batch.name}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Activity Summary */}
                <Card padding="lg">
                  <div className="flex items-center gap-2 mb-6">
                    <TrendingUp className="text-secondary" size={20} />
                    <h2 className="text-xl font-display font-bold text-ink">Activity Summary</h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl border border-white/10 text-center hover:bg-surface/50 transition-colors">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Login Days</p>
                      <p className="text-2xl font-display font-bold text-primary mb-1">{data?.activity?.loginDays ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted">Total days active</p>
                    </div>
                    
                    <div className="p-4 rounded-xl border border-white/10 text-center hover:bg-surface/50 transition-colors">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Study Hours</p>
                      <p className="text-2xl font-display font-bold text-secondary mb-1">{data?.activity?.studyHours ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted">In-app learning</p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 text-center hover:bg-surface/50 transition-colors">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Assignments</p>
                      <p className="text-2xl font-display font-bold text-ink mb-1">{data?.activity?.assignmentsCompleted ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted">Completed</p>
                    </div>

                    <div className="p-4 rounded-xl border border-white/10 text-center hover:bg-surface/50 transition-colors">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted mb-2">Doubts</p>
                      <p className="text-2xl font-display font-bold text-ink mb-1">{data?.activity?.doubtsAsked ?? 0}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted">Questions asked</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Empty States for other tabs */}
            {activeTab !== 'personal' && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card padding="lg" className="flex flex-col items-center justify-center text-center h-[400px]">
                  <div className="w-16 h-16 rounded-full bg-surface border border-white/10 flex items-center justify-center mb-4 text-muted">
                    {activeTab === 'achievements' && <Trophy size={24} />}
                    {activeTab === 'preferences' && <Settings size={24} />}
                    {activeTab === 'support' && <HelpCircle size={24} />}
                  </div>
                  <h3 className="text-xl font-display font-bold text-ink mb-2">
                    {tabs.find(t => t.id === activeTab)?.label}
                  </h3>
                  <p className="text-sm text-muted max-w-sm">
                    This section is currently under construction. Please check back later for updates.
                  </p>
                </Card>
              </motion.div>
            )}
            
          </div>
        </div>
      </motion.div>
    </Layout>
  )
}
