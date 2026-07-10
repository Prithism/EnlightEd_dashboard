'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Cloud, Check, Flag, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/common/Button'
import { getQuizDataForAssignment } from './mockQuizData'

export default function AssignmentQuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  
  // Load data based on assignment ID
  const quizData = getQuizDataForAssignment(params.id)
  const totalQuestions = quizData.questions.length
  
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const currentQuestionData = quizData.questions[currentQuestionIdx]
  const currentQuestionNum = currentQuestionIdx + 1

  const handleOptionToggle = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    )
  }

  const handleClearSelection = () => {
    setSelectedOptions([])
  }

  const handleNext = () => {
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1)
      setSelectedOptions([]) // Clear selection on next (or keep it if saving state, but we mock it for now)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(currentQuestionIdx - 1)
      setSelectedOptions([])
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      router.push('/assignments')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col font-body text-ink p-4 md:p-6 lg:p-8">
      {/* Top Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors border border-white/20 flex items-center justify-center text-ink"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="font-display font-bold text-xl md:text-2xl text-ink flex items-center gap-2">
              <CheckCircle2 size={24} className="text-primary hidden md:block" />
              Practice assignment 4 - Not Graded
            </h1>
            <p className="text-sm text-muted">Week 4</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium bg-white/40 px-4 py-2 rounded-xl border border-white/20 shadow-sm backdrop-blur-md">
          <span className="text-muted">Due Dec 31, 2026</span>
          <span className="text-muted">•</span>
          <span className="text-ink">11:59 PM IST</span>
        </div>
      </header>

      {/* Pagination Bar */}
      <div className="glass rounded-2xl p-3 flex items-center justify-between mb-6 border border-white/30 shadow-sm">
        <div className="flex items-center gap-2 text-primary text-sm font-medium px-4">
          <Cloud size={18} />
          <span className="hidden md:inline">Saved</span>
        </div>
        
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center justify-center gap-1 md:gap-2 px-4">
          <button className="p-1 text-muted hover:text-ink transition-colors">
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2 min-w-min">
            {Array.from({ length: totalQuestions }).map((_, i) => {
              const qNum = i + 1
              const isPast = qNum < 1
              const isActive = qNum === currentQuestionNum
              
              return (
                <button
                  key={qNum}
                  onClick={() => {
                    setCurrentQuestionIdx(qNum - 1)
                    setSelectedOptions([])
                  }}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all
                    ${isActive ? 'bg-ink text-white' : 'bg-transparent text-ink hover:bg-white/40'}
                  `}
                >
                  {qNum}
                  {isPast && !isActive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-100 rounded-full flex items-center justify-center">
                      <Check size={10} className="text-green-600" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          <button className="p-1 text-muted hover:text-ink transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        <Button
          variant="primary"
          onClick={handleSubmit}
          isLoading={isSubmitting}
          className="bg-[#e9f7ef] text-[#1e8449] border border-[#d4efdf] hover:bg-[#d4efdf] hidden md:flex"
        >
          <CheckCircle2 size={16} className="mr-2" />
          Submit Assessment
        </Button>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1">
        {/* Left Column: Question */}
        <div className="glass rounded-3xl p-6 md:p-8 flex flex-col border border-white/40 shadow-sm relative overflow-hidden">
           {/* Soft glow inside card */}
           <div className="absolute -top-20 -left-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
           
          <div className="flex flex-col gap-4 mb-8 relative z-10 border-b border-white/20 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-white/20 border border-white/30 rounded-full">{currentQuestionData.type}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-full">{currentQuestionData.topic}</span>
                </div>
                <div className="text-primary font-bold text-sm tracking-wide">
                  VALUE: {currentQuestionData.marks} Marks
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <h2 className="font-display font-bold text-xl text-ink">
                  Question {currentQuestionNum} of {totalQuestions}
                </h2>
              <button className="flex items-center gap-1 text-primary text-sm font-medium px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors border border-primary/20">
                <Flag size={14} />
                Flag for review
              </button>
            </div>
          </div>

          <div className="flex-1 relative z-10">
            <div className="text-lg text-ink font-medium mb-8 leading-relaxed">
              {currentQuestionData.text}
            </div>

            <div className="space-y-4 mb-10">
              {currentQuestionData.options.map((opt, index) => (
                <div key={opt.id} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <div className="text-ink font-medium">
                    {opt.text}
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-muted text-sm font-medium">
              Select all that apply
            </p>
          </div>
        </div>

        {/* Right Column: Options */}
        <div className="glass rounded-3xl p-6 md:p-8 flex flex-col border border-white/40 shadow-sm relative">
           {/* Soft glow inside card */}
           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
           
          <div className="flex items-center justify-between mb-6 border-b border-white/20 pb-4 relative z-10">
            <h3 className="font-display font-bold text-lg text-ink">Options</h3>
          </div>

          <div className="flex-1 space-y-4 relative z-10">
            {currentQuestionData.options.map((opt) => {
              const isSelected = selectedOptions.includes(opt.id)
              
              return (
                <button
                  key={opt.id}
                  onClick={() => handleOptionToggle(opt.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200
                    ${isSelected 
                      ? 'bg-primary/10 border-primary shadow-sm' 
                      : 'bg-white/40 border-white/60 hover:bg-white/60 hover:border-white'
                    }
                  `}
                >
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors
                    ${isSelected ? 'border-primary' : 'border-muted'}
                  `}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                  </div>
                  <span className="font-medium text-ink w-6 shrink-0">{opt.id}.</span>
                  <span className="text-ink">{opt.text}</span>
                </button>
              )
            })}
          </div>

          <div className="mt-4 flex justify-end relative z-10">
            <button
              onClick={handleClearSelection}
              disabled={selectedOptions.length === 0}
              className="text-sm font-medium text-primary hover:text-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Clear Selection
            </button>
          </div>
          
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/20 relative z-10">
            <Button
              variant="secondary"
              className="px-6 bg-white/50 border border-white/60 hover:bg-white/80"
              onClick={handlePrevious}
              disabled={currentQuestionIdx === 0}
            >
              <ArrowLeft size={16} className="mr-2" />
              Previous
            </Button>
            <Button
              variant="secondary"
              className="px-8 bg-white border border-primary/20 text-primary shadow-sm hover:shadow-md hover:bg-white/90"
              onClick={handleNext}
              disabled={currentQuestionIdx === totalQuestions - 1}
            >
              Next
              <ArrowLeft size={16} className="ml-2 rotate-180" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Submit Button (Visible only on small screens) */}
      <div className="mt-6 md:hidden">
        <Button
          variant="primary"
          onClick={handleSubmit}
          isLoading={isSubmitting}
          className="w-full bg-[#e9f7ef] text-[#1e8449] border border-[#d4efdf]"
        >
          <CheckCircle2 size={16} className="mr-2" />
          Submit Assessment
        </Button>
      </div>
    </div>
  )
}
