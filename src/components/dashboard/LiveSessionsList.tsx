'use client'

import React from 'react'
import { Card } from '@/components/common/Card'
import { Play } from 'lucide-react'

export interface LiveSession {
  id?: string
  time: string
  title: string
  subtitle: string
}

interface LiveSessionsListProps {
  sessions: LiveSession[]
}

export const LiveSessionsList: React.FC<LiveSessionsListProps> = ({ sessions }) => {
  return (
    <Card padding="lg" className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-bold text-ink">Upcoming Live Sessions</h2>
        <a href="/schedule" className="text-sm font-bold text-secondary hover:text-secondary/80 transition-colors">
          View Calendar
        </a>
      </div>

      <div className="space-y-3">
        {sessions?.map((session) => (
          <div key={session.id || session.title} className="bg-surface/50 border border-white/5 rounded-2xl p-4 flex items-center justify-between group hover:bg-surface transition-colors cursor-pointer">
            <div className="flex items-center gap-6">
              <div className="bg-surface border border-white/5 px-4 py-2 rounded-xl text-secondary font-bold text-sm tracking-wide">
                {session?.time ?? '--:--'}
              </div>
              <div>
                <h3 className="font-bold text-ink text-base mb-1 group-hover:text-primary transition-colors">{session?.title ?? 'Untitled Session'}</h3>
                <p className="text-muted text-xs font-bold uppercase tracking-wider">{session?.subtitle ?? 'No Details'}</p>
              </div>
            </div>
            
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-all">
              <Play size={18} fill="currentColor" className="ml-1" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
