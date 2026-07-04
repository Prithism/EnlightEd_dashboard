'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Copy, Check } from 'lucide-react'

type MessageRole = 'user' | 'assistant'

interface ChatBubbleProps {
  role: MessageRole
  content: string
  timestamp?: string
  avatar?: string
  isLoading?: boolean
  onCopy?: () => void
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({
  role,
  content,
  timestamp,
  avatar,
  isLoading = false,
  onCopy,
}) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    onCopy?.()
  }

  const isUser = role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
        isUser ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'
      }`}>
        {avatar ? (
          <img src={avatar} alt="avatar" className="w-full h-full rounded-full" />
        ) : (
          <span className="text-xs font-bold">{isUser ? 'U' : 'AI'}</span>
        )}
      </div>

      {/* Message Bubble */}
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isUser ? 'flex justify-end' : ''}`}>
        <div
          className={`px-4 py-3 rounded-2xl ${
            isUser
              ? 'bg-primary/20 text-ink border border-primary/30'
              : 'bg-white/10 text-ink border border-white/20'
          }`}
        >
          {isLoading ? (
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-muted animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-muted animate-bounce delay-100" />
              <div className="w-2 h-2 rounded-full bg-muted animate-bounce delay-200" />
            </div>
          ) : (
            <>
              <p className="font-body text-sm leading-relaxed break-words whitespace-pre-wrap">
                {content}
              </p>

              {/* Copy Button (for AI messages) */}
              {!isUser && (
                <button
                  onClick={handleCopy}
                  className="mt-2 flex items-center gap-1 text-xs text-muted hover:text-primary transition-colors"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              )}
            </>
          )}
        </div>

        {/* Timestamp */}
        {timestamp && (
          <p className="text-xs text-muted mt-1 px-2">{timestamp}</p>
        )}
      </div>
    </motion.div>
  )
}
