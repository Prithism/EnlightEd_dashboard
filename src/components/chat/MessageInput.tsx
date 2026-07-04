'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Send, Paperclip, Mic } from 'lucide-react'

interface MessageInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  disabled = false,
  placeholder = 'Ask your doubt...',
}) => {
  const [message, setMessage] = React.useState('')
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px'
    }
  }, [message])

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message)
      setMessage('')
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="sticky bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-bg via-bg to-transparent border-t border-white/10"
    >
      <div className="glass rounded-2xl p-4 flex gap-3 items-end">
        {/* Attachment Button */}
        <button
          className="flex-shrink-0 p-2 text-muted hover:text-primary hover:bg-white/10 rounded-lg transition-all"
          aria-label="Attach file"
          disabled={disabled}
        >
          <Paperclip size={20} />
        </button>

        {/* Text Input */}
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="w-full bg-transparent text-ink font-body text-sm placeholder-muted focus:outline-none resize-none max-h-[120px]"
          />
        </div>

        {/* Voice Button */}
        <button
          className="flex-shrink-0 p-2 text-muted hover:text-primary hover:bg-white/10 rounded-lg transition-all"
          aria-label="Voice input"
          disabled={disabled}
        >
          <Mic size={20} />
        </button>

        {/* Send Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className="flex-shrink-0 p-2 bg-primary text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          aria-label="Send message"
        >
          <Send size={20} />
        </motion.button>
      </div>
    </motion.div>
  )
}
