import React from 'react'

export interface QuizOption {
  id: string
  text: React.ReactNode
}

export interface QuizQuestion {
  id: number
  text: React.ReactNode
  options: QuizOption[]
  marks: number
  type: string
  topic: string
}

export interface QuizData {
  subject: string
  questions: QuizQuestion[]
}

const generateMockQuestions = (subject: string, topic: string): QuizQuestion[] => {
  return Array.from({ length: 10 }).map((_, index) => ({
    id: index + 1,
    text: (
      <>
        This is a mock {subject} question {index + 1} regarding {topic}. Please select the correct option below.
      </>
    ),
    options: [
      { id: 'A', text: <>Option A for question {index + 1}</> },
      { id: 'B', text: <>Option B for question {index + 1}</> },
      { id: 'C', text: <>Option C for question {index + 1}</> },
      { id: 'D', text: <>Option D for question {index + 1}</> },
    ],
    marks: index % 2 === 0 ? 2 : 4,
    type: 'MCQ',
    topic: topic,
  }))
}

// Custom polynomial question for Mathematics
const mathQuestions: QuizQuestion[] = [
  {
    id: 1,
    text: (
      <>
        If <i>&alpha;</i> and <i>&beta;</i> are the zeros of the quadratic polynomial <i>f(x)</i> = x&sup2; - px + q, then find the value of <i>&alpha;</i>&sup2; + <i>&beta;</i>&sup2;.
      </>
    ),
    options: [
      { id: 'A', text: <>p&sup2; - 2q</> },
      { id: 'B', text: <>p&sup2; + 2q</> },
      { id: 'C', text: <>q&sup2; - 2p</> },
      { id: 'D', text: <>p&sup2; - q</> }
    ],
    marks: 2,
    type: 'MCQ',
    topic: 'Polynomials'
  },
  ...generateMockQuestions('Mathematics', 'Calculus').slice(1) // 9 more questions
]

export const mockQuizDatabase: Record<string, QuizData> = {
  'Biology': {
    subject: 'Biology',
    questions: generateMockQuestions('Biology', 'Genetics')
  },
  'Chemistry': {
    subject: 'Chemistry',
    questions: generateMockQuestions('Chemistry', 'Organic Synthesis')
  },
  'Mathematics': {
    subject: 'Mathematics',
    questions: mathQuestions
  },
  'Physics': {
    subject: 'Physics',
    questions: generateMockQuestions('Physics', 'Thermodynamics')
  },
  'English': {
    subject: 'English',
    questions: generateMockQuestions('English', 'Literature Analysis')
  }
}

// Map assignment IDs to subjects based on the main assignments page data
export const assignmentToSubjectMap: Record<string, string> = {
  '1': 'Biology',
  '2': 'Chemistry',
  '3': 'Mathematics',
  '4': 'Physics',
  '5': 'Biology',
  '6': 'Chemistry',
  '7': 'Physics',
  '8': 'Mathematics',
  '9': 'English',
}

export const getQuizDataForAssignment = (id: string): QuizData => {
  const subject = assignmentToSubjectMap[id] || 'Mathematics'
  return mockQuizDatabase[subject]
}
