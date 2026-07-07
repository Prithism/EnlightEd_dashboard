'use client'

import React from 'react'
import { Card } from '@/components/common/Card'
import { Badge } from '@/components/common/Badge'
import { ThumbsUp, MessageSquare, CheckCircle, Star } from 'lucide-react'
import Image from 'next/image'

export type PostStatus = 'expert' | 'verified' | 'answered' | 'unanswered'

export interface Post {
  id: string
  author: {
    name: string
    avatarUrl: string
  }
  timeAgo: string
  subject: string
  title: string
  upvotes: number
  replies: number
  status: PostStatus
  isExpertSolution?: boolean
}

interface PostCardProps {
  post: Post
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const renderBadge = () => {
    switch (post.status) {
      case 'verified':
        return (
          <Badge variant="success" isOutline={true} className="rounded-full">
            <CheckCircle size={14} /> Verified
          </Badge>
        )
      case 'answered':
        return (
          <Badge variant="primary" isOutline={false} className="rounded-full bg-primary/20 text-primary border-transparent">
            <CheckCircle size={14} /> Answered
          </Badge>
        )
      case 'unanswered':
        return (
          <Badge variant="secondary" isOutline={true} className="rounded-full border-white/20 text-muted">
            <CheckCircle size={14} /> Unanswered
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <Card className="w-full relative overflow-hidden" padding="lg">
      {post.isExpertSolution && (
        <div className="absolute top-0 right-4 bg-gold px-3 py-1 rounded-b-lg flex items-center gap-1 shadow-lg z-10">
          <Star size={12} className="text-white fill-white" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">Expert Solution</span>
        </div>
      )}

      <div className="flex justify-between items-start mb-4 pt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 shrink-0">
            <Image
              src={post.author.avatarUrl}
              alt={post.author.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-body font-semibold text-ink">{post.author.name}</h4>
            <p className="font-body text-xs text-muted uppercase tracking-wider">
              {post.timeAgo} &bull; {post.subject}
            </p>
          </div>
        </div>
        <div className="mt-2">
          {renderBadge()}
        </div>
      </div>

      <p className="font-body text-ink text-sm md:text-base mb-6 leading-relaxed">
        {post.title}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 text-muted hover:text-ink transition-colors group">
            <ThumbsUp size={16} className="group-hover:text-primary transition-colors" />
            <span className="font-body text-sm font-medium">{post.upvotes} Upvotes</span>
          </button>
          <button className="flex items-center gap-2 text-muted hover:text-ink transition-colors group">
            <MessageSquare size={16} className="group-hover:text-secondary transition-colors" />
            <span className="font-body text-sm font-medium">{post.replies} Replies</span>
          </button>
        </div>
        <button className="font-body text-sm font-semibold text-primary hover:text-secondary transition-colors">
          Join Discussion
        </button>
      </div>
    </Card>
  )
}
