'use client'

import useSWR from 'swr'
import { fetchStudents, fetchCourses, fetchAnalytics, fetchMetrics } from '@/services/mockData'

// For development, use mock data. For production, replace with API endpoints
const fetcher = async (key: string) => {
  if (key === '/api/students') return fetchStudents()
  if (key === '/api/courses') return fetchCourses()
  if (key === '/api/analytics') return fetchAnalytics()
  if (key === '/api/metrics') return fetchMetrics()
  throw new Error('Unknown endpoint')
}

export function useDashboardData() {
  const { data: students, error: studentsError, isLoading: studentsLoading } = useSWR(
    '/api/students',
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  )

  const { data: courses, error: coursesError, isLoading: coursesLoading } = useSWR(
    '/api/courses',
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  )

  const { data: analytics, error: analyticsError, isLoading: analyticsLoading } = useSWR(
    '/api/analytics',
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  )

  const { data: metrics, error: metricsError, isLoading: metricsLoading } = useSWR(
    '/api/metrics',
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  )

  return {
    students: students || [],
    courses: courses || [],
    analytics: analytics || [],
    metrics: metrics || {},
    isLoading: studentsLoading || coursesLoading || analyticsLoading || metricsLoading,
    error: studentsError || coursesError || analyticsError || metricsError,
  }
}

export function useStudents() {
  const { data, error, isLoading } = useSWR('/api/students', fetcher, {
    revalidateOnFocus: false,
  })
  return { students: data || [], error, isLoading }
}

export function useCourses() {
  const { data, error, isLoading } = useSWR('/api/courses', fetcher, {
    revalidateOnFocus: false,
  })
  return { courses: data || [], error, isLoading }
}

export function useAnalytics() {
  const { data, error, isLoading } = useSWR('/api/analytics', fetcher, {
    revalidateOnFocus: false,
  })
  return { analytics: data || [], error, isLoading }
}

export function useMetrics() {
  const { data, error, isLoading } = useSWR('/api/metrics', fetcher, {
    revalidateOnFocus: false,
  })
  return { metrics: data || {}, error, isLoading }
}
