'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, GraduationCap, User, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/common/Button'

export default function LoginPage() {
  const router = useRouter()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push('/')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-primary/30 relative">
      {/* 
        We rely on the global body background for the base gradient.
        No hardcoded backgrounds are used here so light/dark mode works seamlessly.
      */}

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between p-6 lg:p-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center transition-all duration-300 group-hover:scale-105">
            <img 
              src="/logo.png" 
              alt="EnlightEd Logo" 
              className="h-14 w-auto object-contain dark:drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]"
            />
          </div>
        </Link>
        <Link 
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink dark:text-white/80 dark:hover:text-white bg-ink/5 hover:bg-ink/10 dark:bg-white/5 dark:hover:bg-white/10 px-4 py-2.5 rounded-xl transition-all border border-ink/10 dark:border-white/10"
        >
          <ArrowLeft size={16} />
          Back to Site
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px]">
          {/* Glass Card */}
          <div className="glass bg-white/60 dark:bg-[#1a2530]/80 rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-ink/5 dark:shadow-none border border-white/40 dark:border-white/10 relative overflow-hidden">
            
            {/* Subtle inner glows for premium depth */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Icon */}
            <div className="flex justify-center mb-8 relative z-10">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <GraduationCap size={32} />
              </div>
            </div>

            {/* Typography */}
            <div className="text-center mb-10 relative z-10">
              <h1 className="font-display font-bold text-3xl text-ink mb-2">Welcome Back!</h1>
              <p className="text-muted font-body text-sm">
                Signing in to the <span className="text-primary font-bold tracking-wider">STUDENT</span> portal
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              {/* Identifier Field */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted dark:text-white/50 uppercase tracking-widest block pl-1">
                  Email or Mobile Number
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted dark:text-white/40 group-focus-within:text-primary transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full bg-white/50 dark:bg-[#131b23] border border-ink/10 dark:border-white/5 text-ink dark:text-white placeholder:text-ink/30 dark:placeholder:text-white/30 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body text-sm shadow-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-muted dark:text-white/50 uppercase tracking-widest block pl-1">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted dark:text-white/40 group-focus-within:text-primary transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={`w-full bg-white/50 dark:bg-[#131b23] border border-ink/10 dark:border-white/5 text-ink dark:text-white placeholder:text-ink/30 dark:placeholder:text-white/30 rounded-2xl py-4 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body text-sm shadow-sm ${!showPassword && password ? 'tracking-widest' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted hover:text-ink dark:text-white/40 dark:hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="w-full py-4 text-sm font-bold bg-primary hover:bg-teal-700 border border-teal-600/30 shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group rounded-2xl"
                >
                  Enter Dashboard
                  {!isLoading && <span className="group-hover:translate-x-1 transition-transform font-mono font-medium">&gt;</span>}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
