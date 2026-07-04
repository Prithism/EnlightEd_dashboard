import type { Student, Course, AnalyticsData } from '@/types'

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    course: 'Biology 101',
    progress: 85,
    status: 'active',
    enrollmentDate: '2024-01-15',
    score: 85,
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    course: 'Chemistry 201',
    progress: 92,
    status: 'active',
    enrollmentDate: '2024-02-01',
    score: 92,
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@example.com',
    course: 'Physics 101',
    progress: 100,
    status: 'completed',
    enrollmentDate: '2023-10-10',
    score: 95,
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    course: 'Mathematics 301',
    progress: 65,
    status: 'active',
    enrollmentDate: '2024-03-05',
    score: 68,
  },
  {
    id: '5',
    name: 'Olivia Brown',
    email: 'olivia.brown@example.com',
    course: 'Biology 101',
    progress: 78,
    status: 'active',
    enrollmentDate: '2024-01-20',
    score: 78,
  },
  {
    id: '6',
    name: 'Ethan Davis',
    email: 'ethan.davis@example.com',
    course: 'Chemistry 201',
    progress: 45,
    status: 'inactive',
    enrollmentDate: '2024-02-15',
    score: 42,
  },
]

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Biology 101',
    description: 'Introduction to Biology',
    instructor: 'Dr. Sarah Anderson',
    studentCount: 145,
    status: 'active',
    createdAt: '2023-09-01',
  },
  {
    id: '2',
    title: 'Chemistry 201',
    description: 'Organic Chemistry',
    instructor: 'Dr. Michael Park',
    studentCount: 98,
    status: 'active',
    createdAt: '2023-09-15',
  },
  {
    id: '3',
    title: 'Physics 101',
    description: 'Classical Mechanics',
    instructor: 'Dr. Emma Wilson',
    studentCount: 127,
    status: 'active',
    createdAt: '2023-10-01',
  },
  {
    id: '4',
    title: 'Mathematics 301',
    description: 'Calculus III',
    instructor: 'Dr. James Chen',
    studentCount: 89,
    status: 'active',
    createdAt: '2023-10-15',
  },
]

export const mockAnalyticsData: AnalyticsData[] = [
  { date: 'Jan', students: 400, revenue: 2400, completions: 240 },
  { date: 'Feb', students: 520, revenue: 2210, completions: 221 },
  { date: 'Mar', students: 680, revenue: 2290, completions: 229 },
  { date: 'Apr', students: 890, revenue: 2000, completions: 200 },
  { date: 'May', students: 1050, revenue: 2181, completions: 218 },
  { date: 'Jun', students: 1250, revenue: 2500, completions: 250 },
]

export const mockMetrics = {
  totalStudents: 1250,
  activeCourses: 42,
  averageScore: 78.5,
  systemUptime: 99.9,
}

// Simulate API delays
export const delay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms))

// Mock API functions
export async function fetchStudents() {
  await delay()
  return mockStudents
}

export async function fetchCourses() {
  await delay()
  return mockCourses
}

export async function fetchAnalytics() {
  await delay()
  return mockAnalyticsData
}

export async function fetchMetrics() {
  await delay()
  return mockMetrics
}

// Mock schedule data
export const mockScheduleEvents = [
  {
    id: '1',
    date: new Date(2026, 6, 5),
    title: 'Biology Class',
    category: 'class',
    time: '09:00 AM',
  },
  {
    id: '2',
    date: new Date(2026, 6, 6),
    title: 'Chemistry Assignment',
    category: 'assignment',
    time: '02:00 PM',
  },
  {
    id: '3',
    date: new Date(2026, 6, 8),
    title: 'Physics Exam',
    category: 'exam',
    time: '10:00 AM',
  },
]

export async function fetchScheduleEvents() {
  await delay()
  return mockScheduleEvents
}
