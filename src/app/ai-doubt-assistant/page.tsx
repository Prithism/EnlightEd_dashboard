'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Lightbulb,
  BookOpen,
  Calculator,
  Microscope,
  RotateCcw,
} from 'lucide-react'
import { Layout } from '@/components/layout/Layout'
import { ChatBubble } from '@/components/chat/ChatBubble'
import { MessageInput } from '@/components/chat/MessageInput'
import { SuggestionCard } from '@/components/chat/SuggestionCard'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const suggestedTopics = [
  {
    icon: '∑',
    title: 'Explain Integration by Parts',
    description: 'Step-by-step guide for calculus problems',
  },
  {
    icon: '⚛',
    title: 'Atomic Structure Basics',
    description: 'Understand electrons and orbitals',
  },
  {
    icon: 'Σ',
    title: 'Statistical Analysis',
    description: 'Mean, median, mode and more',
  },
  {
    icon: '△',
    title: 'Photosynthesis Process',
    description: 'Light and dark reactions explained',
  },
]

const subjectShortcuts = [
  { label: 'Mathematics', icon: <Calculator size={18} className="text-primary" /> },
  { label: 'Physics', icon: <Lightbulb size={18} className="text-gold" /> },
  { label: 'Chemistry', icon: <Microscope size={18} className="text-secondary" /> },
  { label: 'Biology', icon: <BookOpen size={18} className="text-secondary" /> },
]

const recentDoubts = [
  'How to solve quadratic equations?',
  'What is the law of conservation of energy?',
  'Explain cell division in detail',
  'How do chemical bonds form?',
]

export default function AiDoubtAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! 👋 I'm your AI Doubt Assistant. Ask me anything about your coursework, and I'll help you understand concepts better. I can explain topics, solve problems, and help you prepare for exams.",
      timestamp: 'Now',
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [showRightPanel] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `That's a great question! Let me help you understand this better.\n\nHere's a detailed explanation:\n\n1. **First Point**: This is the foundational concept...\n2. **Second Point**: Building on that, we have...\n3. **Third Point**: Connecting everything together...\n\nWould you like me to go deeper into any of these points or provide some examples?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleSuggestedTopic = (topic: string) => {
    handleSendMessage(topic)
  }

  const handleNewChat = () => {
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: "Hi! 👋 I'm your AI Doubt Assistant. Ask me anything about your coursework, and I'll help you understand concepts better.",
        timestamp: 'Now',
      },
    ])
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  return (
    <Layout title="AI Doubt Assistant" activeRoute="/ai-doubt-assistant">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="h-screen flex flex-col gap-4"
      >
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-4"
        >
          <h1 className="font-display font-bold text-3xl md:text-4xl text-ink mb-2">
            AI Doubt Assistant
          </h1>
          <p className="text-muted font-body">
            Get instant help with your academic doubts. Ask anything, anytime!
          </p>
        </motion.div>

        {/* Main Chat Layout */}
        <div className="flex gap-4 flex-1 overflow-hidden">
          {/* Chat Area - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto pr-4 space-y-1">
              {messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                  isLoading={false}
                />
              ))}

              {isLoading && (
                <ChatBubble
                  role="assistant"
                  content=""
                  isLoading={true}
                />
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <MessageInput onSend={handleSendMessage} disabled={isLoading} />
          </motion.div>

          {/* Right Panel - Desktop Only */}
          {showRightPanel && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="hidden lg:flex flex-col w-80 gap-4 overflow-y-auto pr-4"
            >
              {/* Suggested Topics */}
              <Card padding="lg">
                <h3 className="font-body font-semibold text-ink mb-3">Suggested Topics</h3>
                <div className="space-y-2">
                  {suggestedTopics.map((topic, idx) => (
                    <SuggestionCard
                      key={idx}
                      icon={<span className="text-lg">{topic.icon}</span>}
                      title={topic.title}
                      description={topic.description}
                      onClick={() => handleSuggestedTopic(topic.title)}
                    />
                  ))}
                </div>
              </Card>

              {/* Subject Shortcuts */}
              <Card padding="lg">
                <h3 className="font-body font-semibold text-ink mb-3">Quick Subjects</h3>
                <div className="grid grid-cols-2 gap-2">
                  {subjectShortcuts.map((subject, idx) => (
                    <Button
                      key={idx}
                      variant="secondary"
                      size="sm"
                      className="w-full justify-start gap-2"
                    >
                      {subject.icon}
                      <span className="text-xs">{subject.label}</span>
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Recent Doubts */}
              <Card padding="lg">
                <h3 className="font-body font-semibold text-ink mb-3">Recent Doubts</h3>
                <div className="space-y-2">
                  {recentDoubts.map((doubt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestedTopic(doubt)}
                      className="w-full text-left p-2 rounded-lg hover:bg-white/10 transition-colors text-sm text-muted hover:text-primary font-body"
                    >
                      • {doubt}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card padding="lg">
                <div className="space-y-2">
                  <Button
                    variant="secondary"
                    size="md"
                    className="w-full justify-start gap-2"
                    onClick={handleNewChat}
                  >
                    <RotateCcw size={16} />
                    <span>New Chat</span>
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </motion.div>
    </Layout>
  )
}
