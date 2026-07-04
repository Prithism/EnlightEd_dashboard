// User types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'instructor' | 'student'
}

// Dashboard types
export interface Metric {
  label: string
  value: string | number
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
}

// Student types
export interface Student {
  id: string
  name: string
  email: string
  course: string
  progress: number
  status: 'active' | 'inactive' | 'completed'
  enrollmentDate: string
  score?: number
}

// Course types
export interface Course {
  id: string
  title: string
  description: string
  instructor: string
  studentCount: number
  status: 'active' | 'archived' | 'draft'
  createdAt: string
}

// Analytics types
export interface AnalyticsData {
  date: string
  students: number
  revenue: number
  completions: number
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
