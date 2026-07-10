'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, GraduationCap, Phone, Mail, User, BookOpen, MapPin, Users } from 'lucide-react'
import { Button } from '@/components/common/Button'

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    standard: '',
    email: '',
    phone: '',
    address: '',
    guardian: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push('/login')
    }, 1500)
  }

  const inputClasses = "w-full bg-white/50 dark:bg-[#131b23] border border-ink/10 dark:border-white/5 text-ink dark:text-white placeholder:text-ink/30 dark:placeholder:text-white/30 rounded-2xl py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body text-sm shadow-sm"
  const labelClasses = "text-[11px] font-bold text-muted dark:text-white/50 uppercase tracking-widest block pl-1 mb-2"
  const iconWrapperClasses = "absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted dark:text-white/40 group-focus-within:text-primary transition-colors"

  return (
    <div className="min-h-screen flex flex-col font-body selection:bg-primary/30 relative">
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
          href="/login"
          className="flex items-center gap-2 text-sm font-medium text-ink/70 hover:text-ink dark:text-white/80 dark:hover:text-white bg-ink/5 hover:bg-ink/10 dark:bg-white/5 dark:hover:bg-white/10 px-4 py-2.5 rounded-xl transition-all border border-ink/10 dark:border-white/10"
        >
          <ArrowLeft size={16} />
          Back to Login
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 lg:py-12">
        <div className="w-full max-w-[700px]">
          {/* Glass Card */}
          <div className="glass bg-white/60 dark:bg-[#1a2530]/80 rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-ink/5 dark:shadow-none border border-white/40 dark:border-white/10 relative overflow-hidden">
            
            {/* Subtle inner glows for premium depth */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

            {/* Icon */}
            <div className="flex justify-center mb-6 relative z-10">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
                <GraduationCap size={28} />
              </div>
            </div>

            {/* Typography */}
            <div className="text-center mb-8 relative z-10">
              <h1 className="font-display font-bold text-3xl text-ink mb-2">Create your Account</h1>
              <p className="text-muted font-body text-sm">
                Join the <span className="text-primary font-bold tracking-wider">STUDENT</span> portal today
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                
                {/* Name */}
                <div>
                  <label className={labelClasses}>Full Name</label>
                  <div className="relative group">
                    <div className={iconWrapperClasses}>
                      <User size={18} />
                    </div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Standard */}
                <div>
                  <label className={labelClasses}>Standard / Grade</label>
                  <div className="relative group">
                    <div className={iconWrapperClasses}>
                      <BookOpen size={18} />
                    </div>
                    <input
                      type="text"
                      name="standard"
                      required
                      value={formData.standard}
                      onChange={handleChange}
                      placeholder="e.g. 10th Grade, Senior"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className={labelClasses}>Email Address</label>
                  <div className="relative group">
                    <div className={iconWrapperClasses}>
                      <Mail size={18} />
                    </div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="student@example.com"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className={labelClasses}>Phone Number</label>
                  <div className="relative group">
                    <div className={iconWrapperClasses}>
                      <Phone size={18} />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className={labelClasses}>Residential Address</label>
                  <div className="relative group">
                    <div className={iconWrapperClasses}>
                      <MapPin size={18} />
                    </div>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Education Lane, City, Country"
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Guardian's Name */}
                <div className="md:col-span-2">
                  <label className={labelClasses}>Guardian&apos;s Name</label>
                  <div className="relative group">
                    <div className={iconWrapperClasses}>
                      <Users size={18} />
                    </div>
                    <input
                      type="text"
                      name="guardian"
                      required
                      value={formData.guardian}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={inputClasses}
                    />
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <div className="max-w-[400px] mx-auto">
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isLoading}
                  className="w-full py-4 text-sm font-bold bg-primary hover:bg-teal-700 border border-teal-600/30 shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group rounded-2xl mb-4"
                >
                  Register Account
                  {!isLoading && <span className="group-hover:translate-x-1 transition-transform font-mono font-medium">&gt;</span>}
                </Button>
                
                <div className="text-center">
                  <span className="text-muted text-sm">Already have an account? </span>
                  <Link href="/login" className="text-primary font-bold hover:underline text-sm tracking-wide">
                    Sign In here
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}
