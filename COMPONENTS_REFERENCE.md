# EnlightEd Dashboard — Components Reference Guide

## Layout Components

### `<Layout />`
**Location:** `src/components/layout/Layout.tsx`
**Purpose:** Main page wrapper combining Sidebar, Navbar, and content area

```tsx
<Layout title="Dashboard" activeRoute="/">
  {/* Page content */}
</Layout>
```

**Props:**
- `children` (ReactNode) — Page content
- `title` (string) — Page title for navbar
- `activeRoute` (string) — Current route for sidebar highlighting

---

### `<ThemeProvider />`
**Location:** `src/components/layout/ThemeProvider.tsx`
**Purpose:** Context provider for next-themes to handle dark/light mode toggling using the `.dark` class

**Usage:**
```tsx
import { ThemeProvider } from '@/components/layout/ThemeProvider'

<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
  {children}
</ThemeProvider>
```

---

### `<ThemeToggle />`
**Location:** `src/components/common/ThemeToggle.tsx`
**Purpose:** Button with animated sun/moon icons to toggle the current theme between dark and light

**Features:**
- ✅ Framer motion animations
- ✅ Sun/Moon lucide icons

**Usage:**
```tsx
import { ThemeToggle } from '@/components/common/ThemeToggle'

<ThemeToggle />
```

---

### `<Sidebar />`
**Location:** `src/components/layout/Sidebar.tsx`
**Purpose:** Left navigation panel (fixed desktop, drawer mobile)

**Features:**
- ✅ Collapse/expand on desktop
- ✅ Off-screen drawer on mobile
- ✅ 6 navigation items (Dashboard, Analytics, Students, Courses, Reports, Settings)
- ✅ Active state highlighting
- ✅ Smooth animations

**Props:**
- `activeRoute` (string) — Currently active page route

**Usage:**
```tsx
import { Sidebar } from '@/components/layout/Sidebar'

<Sidebar activeRoute="/" />
```

---

### `<Navbar />`
**Location:** `src/components/layout/Navbar.tsx`
**Purpose:** Top navigation bar with search, notifications, and profile menu

**Features:**
- ✅ Search with expandable input
- ✅ Notification bell with badge
- ✅ Profile dropdown with menu options
- ✅ Responsive (search collapses on mobile)
- ✅ Recent notifications list

**Props:**
- `title` (string) — Page title
- `notificationCount` (number) — Badge count
- `onSearch` (function) — Search callback
- `onLogout` (function) — Logout handler

**Usage:**
```tsx
import { Navbar } from '@/components/layout/Navbar'

<Navbar
  title="Dashboard"
  notificationCount={3}
  onSearch={(query) => console.log(query)}
/>
```

---

## Common Components

### `<Button />`
**Location:** `src/components/common/Button.tsx`
**Purpose:** Versatile button with multiple variants and sizes

**Variants:**
- `primary` — #22819A (teal) — Primary actions
- `secondary` — #90C2E7/20 — Secondary actions
- `ghost` — Transparent — Tertiary actions
- `gold` — #C9972A — Highlight/premium actions

**Sizes:**
- `xs` — 32px height
- `sm` — 40px height
- `md` — 44px height (default)
- `lg` — 48px height
- `xl` — 52px height
- `icon` — 40x40px square

**Usage:**
```tsx
import { Button } from '@/components/common/Button'

<Button variant="primary" size="md" onClick={() => {}}>
  Click Me
</Button>

<Button variant="ghost" isLoading>
  Loading...
</Button>
```

**Props:**
- `variant` ('primary' | 'secondary' | 'ghost' | 'gold')
- `size` ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon')
- `isLoading` (boolean) — Show loading spinner
- Standard HTML button props

---

### `<Card />`
**Location:** `src/components/common/Card.tsx`
**Purpose:** Glass-morphic container for content

**Variants:**
- `default` — Glass with blur + border
- `highlighted` — With gold accent and gradient
- `minimal` — Border only, no blur

**Padding:**
- `sm` — 12px
- `md` — 16px (default)
- `lg` — 24px

**Border Radius:**
- `lg` — 8px
- `xl` — 12px
- `2xl` — 16px (default)
- `3xl` — 24px

**Usage:**
```tsx
import { Card } from '@/components/common/Card'

<Card variant="default" padding="lg" borderRadius="2xl">
  Your content here
</Card>

<Card variant="highlighted" padding="md">
  Featured section
</Card>
```

**Props:**
- `variant` ('default' | 'highlighted' | 'minimal')
- `padding` ('sm' | 'md' | 'lg')
- `borderRadius` ('lg' | 'xl' | '2xl' | '3xl')
- Standard HTML div props

---

## Metric Components

### `<MetricCard />`
**Location:** `src/components/metrics/MetricCard.tsx`
**Purpose:** Display KPI with value, label, trend, and icon

**Features:**
- ✅ Trend indicator (up/down with percentage)
- ✅ Optional icon
- ✅ Two variants (default, highlighted)
- ✅ Hover scale animation
- ✅ Responsive height

**Usage:**
```tsx
import { MetricCard } from '@/components/metrics/MetricCard'
import { Users } from 'lucide-react'

<MetricCard
  label="Total Students"
  value="1,250"
  trend={{ direction: 'up', percentage: 12 }}
  icon={<Users size={24} />}
  variant="default"
/>

<MetricCard
  label="System Uptime"
  value="99.9%"
  trend={{ direction: 'up', percentage: 0.2 }}
  variant="highlighted"
/>
```

**Props:**
- `label` (string) — Card title
- `value` (string | number) — Main metric value
- `trend` (optional) — { direction: 'up' | 'down', percentage: number }
- `icon` (optional) — ReactNode (use Lucide icons)
- `variant` (optional) — 'default' | 'highlighted'

---

## Chart Components

### `<Chart />`
**Location:** `src/components/charts/Chart.tsx`
**Purpose:** Wrapper for Recharts with consistent styling

**Chart Types:**
- `line` — Line chart
- `bar` — Bar chart
- `area` — Area chart

**Features:**
- Responsive SVG rendering using Recharts
- Supported types: Line, Bar, Area, Radar
- Theming integration with CSS variables
- Fluid animations
- Custom tooltips

---

## Performance Components

### `<ConceptMastery />`
**Location:** `src/components/performance/ConceptMastery.tsx`
**Purpose:** Display topic proficiency using animated progress bars and dynamic badges.

**Usage:**
```tsx
import { ConceptMastery } from '@/components/performance/ConceptMastery'

<ConceptMastery 
  subject="Mathematics" 
  topics={[{ id: '1', name: 'Calculus', proficiency: 80, status: 'STEADY' }]}
  suggestion="We recommend attempting a practice set."
/>
```

---

### `<AIPathOptimizer />`
**Location:** `src/components/performance/AIPathOptimizer.tsx`
**Purpose:** Visual card to indicate AI-driven study path optimization with a real-time pulse badge.

**Usage:**
```tsx
import { AIPathOptimizer } from '@/components/performance/AIPathOptimizer'

<AIPathOptimizer subject="Mathematics" />
```

**Features:**
- ✅ Responsive sizing
- ✅ Custom colors from design system
- ✅ Smooth animations
- ✅ Interactive tooltips
- ✅ Consistent axis styling

**Usage:**
```tsx
import { Chart } from '@/components/charts/Chart'

const data = [
  { name: 'Jan', students: 400, revenue: 2400 },
  { name: 'Feb', students: 520, revenue: 2210 },
  { name: 'Mar', students: 680, revenue: 2290 },
]

<Chart
  title="Student Enrollment Trend"
  data={data}
  type="line"
  dataKeys={['students']}
  height={300}
/>

<Chart
  title="Revenue & Completions"
  data={data}
  type="bar"
  dataKeys={['revenue', 'completions']}
  colors={['#22819A', '#90C2E7']}
/>
```

**Props:**
- `title` (string) — Chart title
- `data` (ChartDataPoint[]) — Data array with `name` key
- `type` ('line' | 'bar' | 'area') — Chart type
- `dataKeys` (string[]) — Properties to display
- `colors` (optional) — Custom color array
- `height` (optional) — Chart height in px (default: 300)
- `tooltip` (optional) — Show tooltips (default: true)
- `animation` (optional) — Animate on render (default: true)

**Data Format:**
```tsx
interface ChartDataPoint {
  name: string
  [key: string]: string | number
}
```

---

## Data Components

### `<Table />`
**Location:** `src/components/data/Table.tsx`
**Purpose:** Responsive, paginated data table with sorting

**Features:**
- ✅ Sortable columns
- ✅ Pagination (prev/next buttons)
- ✅ Mobile card view
- ✅ Custom cell rendering
- ✅ Loading state
- ✅ Status badges
- ✅ Hover effects

**Usage:**
```tsx
import { Table, type TableColumn } from '@/components/data/Table'

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', width: '200px', sortable: true },
  { key: 'email', label: 'Email', width: '240px' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span className={value === 'active' ? 'text-green-600' : 'text-gray-600'}>
        {value}
      </span>
    ),
  },
]

const data = [
  { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'active' },
]

<Table
  title="Students"
  columns={columns}
  data={data}
  pageSize={10}
  loading={false}
/>
```

**Props:**
- `columns` (TableColumn[]) — Column definitions
- `data` (TableRow[]) — Table rows
- `pageSize` (number) — Rows per page (default: 10)
- `title` (string) — Table title
- `loading` (boolean) — Show loading spinner
- `onSort` (function) — Sort callback

**Column Definition:**
```tsx
interface TableColumn {
  key: string                                    // Data key
  label: string                                  // Header text
  width?: string                                 // Column width
  sortable?: boolean                             // Sortable column
  render?: (value: any, row: any) => ReactNode  // Custom cell render
}
```

---

## Batch Components

### `<BatchCard />`
**Location:** `src/components/batch/BatchCard.tsx`
**Purpose:** Display individual batch/course enrollment card with progress

**Features:**
- Thumbnail with course initial fallback
- Course name, instructor, batch ID
- Animated progress bar (0-100%)
- Student count & next class time
- "Continue Learning" button
- Hover scale animation (1.02)
- Responsive height

**Usage:**
```tsx
import { BatchCard } from '@/components/batch/BatchCard'

<BatchCard
  id="1"
  courseName="Biology 101: Cellular Life"
  instructor="Dr. Sarah Anderson"
  batchId="BIO-101-A"
  progress={65}
  completionPercentage={65}
  nextClass="Today, 2:00 PM"
  studentCount={45}
  onContinue={() => navigate('/batch/1')}
/>
```

**Props:**
- `id` (string) — Unique identifier
- `courseName` (string) — Course name
- `instructor` (string) — Instructor name
- `batchId` (string) — Batch identifier
- `progress` (number) — Progress 0-100
- `completionPercentage` (number) — For display
- `nextClass` (string) — Next class time
- `thumbnail` (optional) — Course image URL
- `studentCount` (optional) — Number of students
- `onContinue` (optional) — Callback function

---

### `<TimelineCard />`
**Location:** `src/components/batch/TimelineCard.tsx`
**Purpose:** Display chronological timeline of upcoming events (classes, assignments, exams)

**Features:**
- Timeline dot-and-line visual
- Event type badges (class, assignment, exam)
- Color-coded by type (secondary, gold, primary)
- Date, time, and location info
- Upcoming event indicator
- Scrollable container (max-height: 96, overflow-y: auto)
- Stagger animations

**Usage:**
```tsx
import { TimelineCard } from '@/components/batch/TimelineCard'

<TimelineCard
  title="Upcoming Classes"
  items={[
    {
      id: '1',
      title: 'Cell Structure and Function',
      time: '2:00 PM',
      date: 'Today',
      type: 'class',
      location: 'Virtual - Zoom',
      isUpcoming: true,
    },
  ]}
/>
```

**Props:**
- `title` (string) — Card title
- `items` (TimelineItem[]) — Array of timeline items

**TimelineItem Interface:**
```tsx
interface TimelineItem {
  id: string
  title: string                   // Event title
  time: string                    // "2:00 PM"
  date: string                    // "Today" or "Mar 8"
  type: 'class' | 'assignment' | 'exam'
  location?: string               // "Virtual - Zoom"
  isUpcoming: boolean
}
```

---

### `<AssignmentCard />`
**Location:** `src/components/batch/AssignmentCard.tsx`
**Purpose:** Display pending and graded assignments with submission tracking

**Features:**
- Assignment list with course affiliation
- Status badges (Pending, Submitted, Graded, Overdue)
- Color-coded status (gold, secondary, primary)
- Due date display
- Score display (if graded)
- Submit button (for pending items)
- Type-specific icons
- Scrollable container
- Hover effects on items

**Usage:**
```tsx
import { AssignmentCard } from '@/components/batch/AssignmentCard'

<AssignmentCard
  title="Pending Assignments"
  assignments={[
    {
      id: '1',
      title: 'Write a report on Mitochondria',
      course: 'Biology 101',
      dueDate: 'Mar 5, 11:59 PM',
      status: 'pending',
    },
  ]}
  onSubmit={(id) => handleSubmit(id)}
/>
```

**Props:**
- `title` (optional) — Card title (default: "Assignments")
- `assignments` (Assignment[]) — Array of assignments
- `onSubmit` (optional) — Callback when submit button clicked

**Assignment Interface:**
```tsx
interface Assignment {
  id: string
  title: string
  course: string
  dueDate: string                 // "Mar 5, 11:59 PM"
  status: 'pending' | 'submitted' | 'graded' | 'overdue'
  score?: number                  // percentage
}
```

---

## Feedback Components

### `<ActivityFeed />`
**Location:** `src/components/feedback/ActivityFeed.tsx`
**Purpose:** Chronological timeline of recent activity

**Features:**
- ✅ Activity type icons (success, warning, neutral)
- ✅ Timestamp display
- ✅ Actor & action text
- ✅ Click handlers
- ✅ Scroll container
- ✅ Empty state

**Usage:**
```tsx
import { ActivityFeed, type ActivityItem } from '@/components/feedback/ActivityFeed'
import { CheckCircle, AlertCircle, Info } from 'lucide-react'

const items: ActivityItem[] = [
  {
    id: '1',
    timestamp: '2 hours ago',
    actor: 'Sarah Johnson',
    action: 'completed Biology 101 course',
    type: 'success',
  },
  {
    id: '2',
    timestamp: '1 day ago',
    actor: 'System',
    action: 'maintenance scheduled for tonight',
    type: 'warning',
  },
  {
    id: '3',
    timestamp: '3 days ago',
    actor: 'Admin',
    action: 'uploaded new course materials',
    type: 'neutral',
  },
]

<ActivityFeed
  items={items}
  title="Recent Activity"
  maxItems={5}
  onItemClick={(id) => console.log(id)}
/>
```

**Props:**
- `items` (ActivityItem[]) — Activity list
- `title` (string) — Feed title
- `maxItems` (number) — Display limit
- `onItemClick` (function) — Click handler

**Activity Item:**
```tsx
interface ActivityItem {
  id: string
  timestamp: string              // "2 hours ago"
  actor: string                  // "John Doe"
  action: string                 // "completed course"
  type: 'success' | 'warning' | 'neutral'
  icon?: ReactNode               // Optional custom icon
}
```

---

## Custom Hooks

### `useDashboardData()`
**Location:** `src/hooks/useDashboardData.ts`
**Purpose:** Fetch and cache all dashboard data

```tsx
import { useDashboardData } from '@/hooks/useDashboardData'

const Dashboard = () => {
  const { students, courses, analytics, metrics, isLoading, error } = useDashboardData()
  
  if (isLoading) return <LoadingState />
  if (error) return <ErrorState />
  
  return (
    <div>
      {students.map(s => <div key={s.id}>{s.name}</div>)}
    </div>
  )
}
```

**Returns:**
- `students` — Student[] array
- `courses` — Course[] array
- `analytics` — AnalyticsData[] array
- `metrics` — Metrics object
- `isLoading` — Loading state
- `error` — Error object if failed

---

### `useStudents()`
**Location:** `src/hooks/useDashboardData.ts`
**Purpose:** Fetch only student data

```tsx
const { students, error, isLoading } = useStudents()
```

---

### `useCourses()`
**Location:** `src/hooks/useDashboardData.ts`
**Purpose:** Fetch only course data

```tsx
const { courses, error, isLoading } = useCourses()
```

---

### `useAnalytics()`
**Location:** `src/hooks/useDashboardData.ts`
**Purpose:** Fetch analytics data

```tsx
const { analytics, error, isLoading } = useAnalytics()
```

---

### `useMetrics()`
**Location:** `src/hooks/useDashboardData.ts`
**Purpose:** Fetch dashboard metrics

```tsx
const { metrics, error, isLoading } = useMetrics()
```

---

## Usage Patterns

### Creating a New Page

```tsx
'use client'

import { Layout } from '@/components/layout/Layout'
import { Card } from '@/components/common/Card'
import { Button } from '@/components/common/Button'

export default function NewPage() {
  return (
    <Layout title="New Page" activeRoute="/new-page">
      <Card padding="lg">
        <h1 className="font-display font-bold text-2xl mb-4">Welcome</h1>
        <Button variant="primary">Action</Button>
      </Card>
    </Layout>
  )
}
```

### Adding a Chart

```tsx
import { Chart } from '@/components/charts/Chart'

const data = [
  { name: 'Week 1', value: 100 },
  { name: 'Week 2', value: 150 },
]

<Chart
  title="Performance"
  data={data}
  type="line"
  dataKeys={['value']}
/>
```

### Creating a Data Table

```tsx
import { Table, type TableColumn } from '@/components/data/Table'

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
]

<Table columns={columns} data={data} pageSize={20} />
```

---

## Component Composition

**Most Common Combinations:**

```tsx
// Dashboard-like layout
<Layout>
  <div className="grid grid-cols-4 gap-responsive">
    <MetricCard />
    <MetricCard />
    <MetricCard />
    <MetricCard />
  </div>
  
  <div className="grid grid-cols-2 gap-responsive">
    <Chart />
    <Chart />
  </div>
  
  <Table />
  <ActivityFeed />
</Layout>

// Settings/Form layout
<Layout>
  <Card padding="lg">
    <h1>Settings</h1>
    <Button>Save</Button>
  </Card>
</Layout>

// List/Detail layout
<Layout>
  <Table />
  {selectedId && <Modal data={data} />}
</Layout>
```

---

## Design System Integration

All components automatically use design tokens from `src/utils/designTokens.ts`:

- **Colors**: PRIMARY, SECONDARY, ACCENT, BACKGROUND, TEXT, MUTED
- **Typography**: DISPLAY (Playfair), BODY (Poppins)
- **Spacing**: XS, SM, MD, LG, XL, 2XL, 3XL, 4XL
- **Border Radius**: LG, XL, 2XL, 3XL, FULL

No magic colors or spacing values — everything derives from the system.

---

## Animation Defaults

All components with motion use consistent Framer Motion patterns:
- **Duration**: 0.4s base, 0.6s for page loads
- **Easing**: Spring curve for premium feel
- **Effects**: Fade-up, scale, stagger (0.04s delay)
- **Reduced Motion**: Automatically disables for accessibility

---

---

## Peer Learning Components

### `<PostCard />`
**Location:** `src/components/peer-learning/PostCard.tsx`
**Purpose:** Display individual forum posts with status and interactions

**Features:**
- Avatar and author info
- Time and subject tag
- Expert solution indicator (gold badge)
- Status badges (Verified, Answered, Unanswered)
- Upvote and reply counts
- Join Discussion button

**Usage:**
```tsx
import { PostCard } from '@/components/peer-learning/PostCard'

<PostCard
  post={{
    id: 'p1',
    author: { name: 'Priya S.', avatarUrl: '...' },
    timeAgo: '2 HOURS AGO',
    subject: 'MATHEMATICS',
    title: 'Can someone explain...',
    upvotes: 12,
    replies: 4,
    status: 'expert',
    isExpertSolution: true,
  }}
/>
```

---

### `<StatsCard />`
**Location:** `src/components/peer-learning/StatsCard.tsx`
**Purpose:** Widget displaying user's forum statistics

**Features:**
- Solved count
- Helpful count
- Glassmorphism design

**Usage:**
```tsx
import { StatsCard } from '@/components/peer-learning/StatsCard'

<StatsCard />
```

---

### `<FilterChips />`
**Location:** `src/components/common/FilterChips.tsx`
**Purpose:** Reusable filter toggle buttons with active state

**Features:**
- Active/inactive states with color feedback
- Smooth scale animations on hover/tap
- Stagger entry animation
- Compact rounded pill design
- Responsive flex layout with gap

**Usage:**
```tsx
import { FilterChips } from '@/components/common/FilterChips'

<FilterChips
  chips={[
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'graded', label: 'Graded' },
  ]}
  activeChip="all"
  onChipChange={(id) => setFilter(id)}
/>
```

**Props:**
- `chips` (FilterChip[]) — Array of filter options
- `activeChip` (string) — Currently active chip ID
- `onChipChange` (function) — Callback when chip clicked

---

### `<AssignmentCard />`
**Location:** `src/components/assignment/AssignmentCard.tsx`
**Purpose:** Display individual assignment with status, progress, and action

**Features:**
- Subject icon with color-coded background
- Subject name uppercase with tracking
- Status badge (Pending, In Progress, Graded)
- Assignment title (line-clamp-2)
- Short description (line-clamp-2)
- Due date with clock icon
- Animated progress bar (In Progress only)
- Score display card (Graded only)
- Status-appropriate CTA button
- Hover scale animation (1.02)
- Full glass-morphism styling

**Usage:**
```tsx
import { AssignmentCard } from '@/components/assignment/AssignmentCard'
import { Microscope } from 'lucide-react'

<AssignmentCard
  id="1"
  subject="Biology"
  title="Cellular Respiration Study Report"
  description="Write a comprehensive report..."
  dueDate="Mar 5, 2026"
  status="pending"
  subjectColor="secondary"
  icon={<Microscope size={20} className="text-secondary" />}
  onAction={() => {}}
/>
```

**Props:**
- `id` (string) — Unique identifier
- `subject` (string) — Subject name
- `title` (string) — Assignment title
- `description` (string) — Short description
- `dueDate` (string) — Due date
- `status` ('pending' | 'in-progress' | 'graded')
- `progress` (optional) — 0-100
- `score` (optional) — percentage
- `subjectColor` (string) — color token
- `icon` (React.ReactNode) — Lucide icon
- `onAction` (optional) — Callback

---

## Chat Components

### `<ChatBubble />`
**Location:** `src/components/chat/ChatBubble.tsx`
**Purpose:** Display user and AI chat messages with avatars and copy functionality

**Features:**
- User and AI message differentiation
- Right-aligned user messages, left-aligned AI messages
- Color-coded backgrounds (primary for user, white/10 for AI)
- Avatar circles with initials or images
- Typing indicator animation (3 bouncing dots)
- Copy button for AI messages (appears after 2s)
- Timestamp display
- Smooth fade-in animation
- Markdown-ready content

**Usage:**
```tsx
import { ChatBubble } from '@/components/chat/ChatBubble'

<ChatBubble
  role="user"
  content="Explain photosynthesis"
  timestamp="2:30 PM"
/>

<ChatBubble
  role="assistant"
  content="Photosynthesis is the process..."
  timestamp="2:31 PM"
  isLoading={false}
/>
```

**Props:**
- `role` ('user' | 'assistant') — Message sender
- `content` (string) — Message text
- `timestamp` (optional) — Time string
- `avatar` (optional) — Avatar image URL
- `isLoading` (optional) — Show typing indicator
- `onCopy` (optional) — Copy callback

---

### `<MessageInput />`
**Location:** `src/components/chat/MessageInput.tsx`
**Purpose:** Multi-line message input with file and voice buttons

**Features:**
- Multi-line textarea with auto-resize (max 120px)
- Sticky bottom position with gradient fade
- Paperclip (attachment) button
- Microphone (voice) button
- Send button (disabled when empty)
- Enter to send (Shift+Enter for newline)
- Glass morphism styling
- Smooth send animation
- Disabled state support

**Usage:**
```tsx
import { MessageInput } from '@/components/chat/MessageInput'

<MessageInput
  onSend={(message) => console.log(message)}
  placeholder="Ask your doubt..."
  disabled={isLoading}
/>
```

**Props:**
- `onSend` (function) — Callback when message sent (required)
- `disabled` (optional) — Disable input
- `placeholder` (optional) — Input placeholder text

---

### `<SuggestionCard />`
**Location:** `src/components/chat/SuggestionCard.tsx`
**Purpose:** Display clickable topic suggestions

**Features:**
- Icon at top
- Title and optional description
- "Ask →" CTA text
- Hover scale (1.02) and lift (-4px)
- Click callback
- Glass card background
- Responsive sizing

**Usage:**
```tsx
import { SuggestionCard } from '@/components/chat/SuggestionCard'

<SuggestionCard
  icon="∑"
  title="Explain Integration by Parts"
  description="Step-by-step guide for calculus"
  onClick={() => handleSuggestedTopic('Explain Integration by Parts')}
/>
```

**Props:**
- `icon` (React.ReactNode) — Icon or emoji
- `title` (string) — Topic title
- `description` (optional) — Topic description
- `onClick` (function) — Click handler (required)
- `variant` (optional) — 'default' | 'highlighted'

---

### `<LoadingSkeleton />`
**Location:** `src/components/common/LoadingSkeleton.tsx`
**Purpose:** Animated loading placeholder

**Features:**
- Shimmer animation (gradient shifting)
- Three variants: text, card, chat
- Pulse effect
- Multiple lines support
- Responsive width randomization

**Usage:**
```tsx
import { LoadingSkeleton } from '@/components/common/LoadingSkeleton'

<LoadingSkeleton variant="chat" />
<LoadingSkeleton variant="text" lines={3} />
```

**Props:**
- `lines` (optional) — Number of skeleton lines (default: 3)
- `variant` (optional) — 'text' | 'card' | 'chat' (default: 'text')

---

---

## Schedule Components

### `<Calendar />`
**Location:** `src/components/schedule/Calendar.tsx`
**Purpose:** Interactive calendar with multiple view modes and event indicators

**Features:**
- ✅ Month/Week/Day view modes
- ✅ Current day and selected date highlighting
- ✅ Event indicators with color dots
- ✅ Responsive sizing
- ✅ Smooth date selection transitions
- ✅ Event category color coding
- ✅ Hover effects

**Usage:**
```tsx
import { Calendar } from '@/components/schedule/Calendar'

const events = [
  {
    id: '1',
    date: new Date(2026, 6, 5),
    title: 'Biology Class',
    category: 'class',
    time: '09:00 AM',
  },
]

<Calendar
  currentDate={currentDate}
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
  events={events}
  viewMode="month"
/>
```

**Props:**
- `currentDate` (Date) — Current month being displayed
- `selectedDate` (Date) — Selected date
- `onDateSelect` (function) — Date selection callback
- `events` (ScheduleEvent[]) — Array of events
- `viewMode` ('month' | 'week' | 'day') — Current view mode

**Event Categories:**
- `class` — Primary teal (#22819A)
- `assignment` — Gold (#C9972A)
- `exam` — Teal-400 (#35A8C8)
- `meeting` — Secondary blue (#90C2E7)
- `personal` — Muted grey (#4F6C74)

---

### `<CalendarHeader />`
**Location:** `src/components/schedule/CalendarHeader.tsx`
**Purpose:** Calendar navigation and view mode selector

**Features:**
- ✅ Previous/Next month buttons
- ✅ Month/Year display
- ✅ Today button
- ✅ View mode toggle (Month/Week/Day)
- ✅ Glass morphism styling
- ✅ Responsive layout

**Usage:**
```tsx
import { CalendarHeader } from '@/components/schedule/CalendarHeader'

<CalendarHeader
  currentDate={currentDate}
  onPreviousMonth={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))}
  onNextMonth={() => setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))}
  onToday={() => setCurrentDate(new Date())}
  viewMode="month"
  onViewModeChange={setViewMode}
/>
```

**Props:**
- `currentDate` (Date) — Current month
- `onPreviousMonth` (function) — Navigate to previous month
- `onNextMonth` (function) — Navigate to next month
- `onToday` (function) — Jump to today
- `viewMode` ('month' | 'week' | 'day') — Current view mode
- `onViewModeChange` (function) — View mode change callback

---

### `<TodaySchedule />`
**Location:** `src/components/schedule/TodaySchedule.tsx`
**Purpose:** Display timeline of today's classes and events

**Features:**
- ✅ Time with duration display
- ✅ Subject name
- ✅ Instructor name
- ✅ Location (physical or online)
- ✅ Status badges (Live Now, Upcoming, Completed)
- ✅ Join Class button for live events
- ✅ Scrollable container
- ✅ Color-coded status indicators

**Usage:**
```tsx
import { TodaySchedule } from '@/components/schedule/TodaySchedule'

<TodaySchedule
  events={todayEvents}
  onJoinClass={(eventId) => console.log('Join', eventId)}
/>
```

**Props:**
- `events` (TodayEvent[]) — Array of today's events
- `onJoinClass` (optional) — Callback when join button clicked

**TodayEvent Interface:**
```tsx
interface TodayEvent {
  id: string
  time: string                           // "09:00 AM"
  subject: string                        // "Biology 101: Cell Structure"
  instructor: string                     // "Dr. Sarah Anderson"
  duration: string                       // "1 hour"
  location: string                       // "Room 204 / Online"
  isLive: boolean
  status: 'upcoming' | 'live' | 'completed'
}
```

---

### `<UpcomingEvents />`
**Location:** `src/components/schedule/UpcomingEvents.tsx`
**Purpose:** Display list of upcoming events with countdown timers

**Features:**
- ✅ Event title
- ✅ Category with color dot
- ✅ Date and time
- ✅ Countdown timer text
- ✅ Priority indicators for high-priority events
- ✅ Scrollable container with max height
- ✅ Stagger animations

**Usage:**
```tsx
import { UpcomingEvents } from '@/components/schedule/UpcomingEvents'

<UpcomingEvents events={upcomingEvents} />
```

**Props:**
- `events` (UpcomingEvent[]) — Array of upcoming events

**UpcomingEvent Interface:**
```tsx
interface UpcomingEvent {
  id: string
  title: string
  date: string                           // "July 8, 2026"
  time: string                           // "10:00 AM"
  category: 'class' | 'assignment' | 'exam' | 'meeting' | 'personal'
  countdownText: string                  // "4 days"
  priority: 'low' | 'medium' | 'high'
}
```

---

### `<EventCard />`
**Location:** `src/components/schedule/EventCard.tsx`
**Purpose:** Display individual event with full details

**Features:**
- ✅ Category indicator with color
- ✅ Event title and type
- ✅ Time and duration
- ✅ Location and instructor information
- ✅ Description text
- ✅ Live indicator (red pulsing badge)
- ✅ Join button for live events
- ✅ Hover scale animations

**Usage:**
```tsx
import { EventCard } from '@/components/schedule/EventCard'

<EventCard
  id="1"
  title="Biology 101: Cell Structure"
  time="09:00 AM"
  date="Today"
  category="class"
  duration="1 hour"
  location="Room 204"
  instructor="Dr. Sarah Anderson"
  isLive={true}
  hasJoinButton={true}
  onJoin={() => joinClass()}
/>
```

**Props:**
- `id` (string) — Unique event ID
- `title` (string) — Event title
- `time` (string) — Event time
- `date` (string) — Event date
- `category` ('class' | 'assignment' | 'exam' | 'meeting' | 'personal')
- `duration` (optional) — Event duration
- `location` (optional) — Physical or online location
- `instructor` (optional) — Instructor name
- `description` (optional) — Event description
- `priority` (optional) — 'low' | 'medium' | 'high'
- `hasJoinButton` (optional) — Show join button
- `onJoin` (optional) — Join callback
- `isLive` (optional) — Mark as live event

---

### `<QuickActions />`
**Location:** `src/components/schedule/QuickActions.tsx`
**Purpose:** Quick action buttons for schedule-related tasks

**Features:**
- ✅ 2-column grid layout
- ✅ Icon + label display
- ✅ Secondary button variant
- ✅ Click callbacks
- ✅ Stagger animations
- ✅ Hover scale effects

**Usage:**
```tsx
import { QuickActions } from '@/components/schedule/QuickActions'
import { Play, Plus } from 'lucide-react'

const actions = [
  {
    id: '1',
    icon: <Play size={20} />,
    label: 'Join Live Class',
    onClick: () => {},
  },
  {
    id: '2',
    icon: <Plus size={20} />,
    label: 'Add Event',
    onClick: () => {},
  },
]

<QuickActions actions={actions} />
```

**Props:**
- `actions` (QuickAction[]) — Array of quick actions

**QuickAction Interface:**
```tsx
interface QuickAction {
  id: string
  icon: React.ReactNode
  label: string
  onClick: () => void
}
```

---

### `<ScheduleStatistics />`
**Location:** `src/components/schedule/ScheduleStatistics.tsx`
**Purpose:** Display schedule-related metrics and statistics

**Features:**
- ✅ 2-column grid layout
- ✅ Color-coded left border
- ✅ Icon display (optional)
- ✅ Label and value
- ✅ Glass morphism styling
- ✅ Stagger animations

**Usage:**
```tsx
import { ScheduleStatistics } from '@/components/schedule/ScheduleStatistics'

const stats = [
  {
    id: '1',
    label: 'Classes This Week',
    value: '8',
    color: '#22819A',
    icon: <Clock size={20} />,
  },
]

<ScheduleStatistics statistics={stats} />
```

**Props:**
- `statistics` (StatisticItem[]) — Array of statistics

**StatisticItem Interface:**
```tsx
interface StatisticItem {
  id: string
  label: string
  value: string | number
  color: string                          // Hex color for left border
  icon?: React.ReactNode
}
```

---

### `<Badge />`
**Location:** `src/components/common/Badge.tsx`
**Purpose:** Small status or label indicator

**Features:**
- ✅ 6 color variants (primary, secondary, gold, success, warning, danger)
- ✅ Solid and outline modes
- ✅ 2 sizes (sm, md)
- ✅ Flexible content (text, icons, etc.)
- ✅ Border styling

**Usage:**
```tsx
import { Badge } from '@/components/common/Badge'

<Badge variant="primary" size="md">
  In Progress
</Badge>

<Badge variant="gold" isOutline>
  High Priority
</Badge>
```

**Props:**
- `variant` ('primary' | 'secondary' | 'gold' | 'success' | 'warning' | 'danger')
- `size` ('sm' | 'md')
- `isOutline` (boolean) — Outline vs solid style
- `children` (ReactNode) — Badge content

---

**Last Updated:** July 4, 2026
**Version:** 1.0.1 — Schedule Page Added
