# Backend Integration Guide

This document outlines all the dynamic UI components across the EnlightEd Dashboard that have been wired up for backend synchronization. 

The frontend architecture currently uses mock asynchronous data functions (e.g., `fetchDashboardData()`) combined with strictly typed TypeScript interfaces. To connect the real backend, replace these mock functions with actual API calls (using Axios or Fetch). The UI is already built defensively with optional chaining (`?.`) and nullish coalescing (`??`) to prevent crashes if data is missing.

---

## 1. Main Dashboard (`/src/app/page.tsx`)
**Target API:** `GET /api/v1/dashboard/overview`

| Section | Expected Data Structure | UI Component |
|---------|-------------------------|--------------|
| **Top Metrics** | `metrics: { label, value, subtext, trend, progress }[]` | `StudentMetricCard` |
| **Concept Mastery** | `conceptMastery: { subject, percentage, colorClass }[]` | `DashboardConceptMastery` |
| **Assignments** | `recentAssignments: { id, title, subject, deadline, status, score }[]` | `RecentAssignments` |
| **Live Sessions** | `liveSessions: { id, title, subject, time, viewers, status, instructor }[]` | `LiveSessionsList` |
| **Upcoming Classes**| `upcomingClasses: { id, title, subject, time, duration, type, topic }[]` | `UpcomingClasses` |

---

## 2. Performance & Analytics (`/src/app/performance/page.tsx`)
**Target API:** `GET /api/v1/performance/analytics`

| Section | Expected Data Structure | UI Component |
|---------|-------------------------|--------------|
| **Global Metrics** | `metrics: { label, value, trend, icon, colorClass }[]` | `MetricCard` |
| **Learning Trends** | `performanceData: { month, score, accuracy, completion }[]` | Area/Line Charts |
| **Subject Mastery** | `subjectMastery: { subject, overall, topics: { name, score, status }[] }[]` | `ConceptMastery` |
| **AI Optimizer** | Real-time recommendations based on weak points. | `AIPathOptimizer` |

---

## 3. Assignments & Quizzes (`/src/app/assignments/page.tsx`)
**Target API:** `GET /api/v1/assignments`

| Section | Expected Data Structure | UI Component |
|---------|-------------------------|--------------|
| **Global Stats** | `stats: { pending, inProgress, graded }` | Metric Grids |
| **Assignment Feed** | `assignments: { id, title, subject, type, status, dueDate, score, totalMarks, estimatedTime }[]` | List/Grid Cards |

---

## 4. Leaderboard & Batches (`/src/app/batches/page.tsx`)
**Target API:** `GET /api/v1/batches/overview`

| Section | Expected Data Structure | UI Component |
|---------|-------------------------|--------------|
| **Batch Metrics** | `metricsData: { label, value, icon, color }[]` | `MetricCard` |
| **Leaderboard** | `leaderboardData: { id, rank, name, score, trend, avatar }[]` | Leaderboard Table |

---

## 5. AI Doubt Assistant (`/src/app/ai-doubt-assistant/page.tsx`)
**Target API:** `GET /api/v1/ai/history` & `POST /api/v1/ai/chat`

| Section | Expected Data Structure | UI Component |
|---------|-------------------------|--------------|
| **Suggestions** | `suggestedTopics: { title, icon }[]` | `SuggestionCard` |
| **Recent Doubts** | `recentDoubts: string[]` | History Buttons |
| **Chat Feed** | Streaming WS or HTTP Response payload. | Chat Interface |

---

## 6. Profile & Settings (`/src/app/profile/page.tsx`)
**Target API:** `GET /api/v1/users/me`

| Section | Expected Data Structure | UI Component |
|---------|-------------------------|--------------|
| **User Identity** | `fullName, avatarUrl, grade, board, school` | Profile Banner |
| **Quick Stats** | `currentStreak, totalBadges` | Sidebar Cards |
| **Personal Info** | `dob, email, phone, address, parentInfo: { name, relation, phone, email }` | Information Grid |
| **Batches** | `enrolledBatches: { id, code, name, codeColor }[]` | Batch List Cards |
| **Activity** | `activity: { loginDays, studyHours, assignmentsCompleted, doubtsAsked }` | Activity Grid |

---

## Implementation Notes for Backend Devs
1. **IDs are Mandatory**: Ensure every array item returned from the backend has a unique `id` (UUID or integer). React relies on these `id`s for efficient re-rendering (do NOT use index mappings).
2. **Nullable Fields**: The frontend safely handles `null` or missing fields using Optional Chaining (`?.`). If a user has no parental phone number, the UI will fallback safely (e.g., rendering "N/A").
3. **Loading States**: Delay fetching slightly (or use standard React suspense/useEffect) to allow the built-in skeleton loaders (`animate-pulse`) to render during network latency.
