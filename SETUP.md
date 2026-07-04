# EnlightEd Dashboard — Setup & Development Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure Overview

```
enlighted-dashboard/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx               # Root layout with global styles
│   │   ├── page.tsx                 # Dashboard home page
│   │   └── api/                     # API routes (future)
│   │
│   ├── components/                   # Reusable React components
│   │   ├── common/                  # Base components
│   │   │   ├── Button.tsx           # Primary button component
│   │   │   └── Card.tsx             # Glass card wrapper
│   │   ├── layout/                  # Layout structure
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   ├── Navbar.tsx           # Top navigation bar
│   │   │   └── Layout.tsx           # Page layout wrapper
│   │   ├── metrics/                 # Dashboard metrics
│   │   │   └── MetricCard.tsx       # KPI display card
│   │   ├── charts/                  # Data visualization
│   │   │   └── Chart.tsx            # Recharts wrapper
│   │   ├── data/                    # Data display
│   │   │   └── Table.tsx            # Paginated table
│   │   └── feedback/                # User feedback
│   │       └── ActivityFeed.tsx     # Activity timeline
│   │
│   ├── hooks/                        # Custom React hooks
│   │   └── useDashboardData.ts      # Data fetching with SWR
│   │
│   ├── services/                     # API & data services
│   │   ├── api.ts                   # API client
│   │   └── mockData.ts              # Mock data for development
│   │
│   ├── types/                        # TypeScript definitions
│   │   └── index.ts                 # Shared types
│   │
│   ├── utils/                        # Utilities
│   │   └── designTokens.ts          # Design system tokens
│   │
│   └── styles/                       # Global styles
│       └── globals.css              # Tailwind + base styles
│
├── public/                           # Static assets
├── .kiro/                            # Kiro workspace config
│   ├── specs/                        # Feature specifications
│   └── steering/                     # Design system guidance
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript config
├── tailwind.config.ts                # Tailwind CSS config
├── next.config.js                    # Next.js config
└── README.md                         # Project documentation
```

---

## Component Usage Guide

### Layout (Wrapper for all pages)

```tsx
import { Layout } from '@/components/layout/Layout'

export default function Page() {
  return (
    <Layout title="Page Title" activeRoute="/current-page">
      {/* Your page content */}
    </Layout>
  )
}
```

### MetricCard (KPI Display)

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
```

**Props:**
- `label` (string): Card title
- `value` (string | number): Main metric value
- `trend` (optional): { direction: 'up' | 'down', percentage: number }
- `icon` (optional): React component from Lucide
- `variant` (optional): 'default' | 'highlighted'

### Chart (Data Visualization)

```tsx
import { Chart } from '@/components/charts/Chart'

<Chart
  title="Student Enrollment"
  data={chartData}
  type="line"
  dataKeys={['students']}
  height={300}
  tooltip={true}
/>
```

**Props:**
- `title` (string): Chart title
- `data` (ChartDataPoint[]): Data array with 'name' key
- `type` ('line' | 'bar' | 'area'): Chart type
- `dataKeys` (string[]): Data properties to display
- `colors` (optional): Custom color array
- `height` (optional): Chart height in pixels (default: 300)

**Example Data:**
```tsx
const data = [
  { name: 'Jan', students: 400, revenue: 2400 },
  { name: 'Feb', students: 520, revenue: 2210 },
]
```

### Table (Data Grid)

```tsx
import { Table, type TableColumn } from '@/components/data/Table'

const columns: TableColumn[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
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

<Table
  columns={columns}
  data={data}
  pageSize={10}
  title="Student List"
/>
```

**Props:**
- `columns` (TableColumn[]): Column definitions
- `data` (TableRow[]): Data rows
- `pageSize` (optional): Rows per page (default: 10)
- `title` (optional): Table title
- `loading` (optional): Show loading state

### ActivityFeed (Timeline)

```tsx
import { ActivityFeed, type ActivityItem } from '@/components/feedback/ActivityFeed'

const items: ActivityItem[] = [
  {
    id: '1',
    timestamp: '2 hours ago',
    actor: 'Sarah Johnson',
    action: 'completed course',
    type: 'success',
  },
]

<ActivityFeed
  items={items}
  title="Recent Activity"
  maxItems={5}
/>
```

**Props:**
- `items` (ActivityItem[]): Activity list
- `title` (optional): Feed title
- `maxItems` (optional): Display limit
- `onItemClick` (optional): Click handler

### Card (Generic Container)

```tsx
import { Card } from '@/components/common/Card'

<Card padding="lg" variant="default" borderRadius="2xl">
  Your content here
</Card>
```

**Props:**
- `variant` ('default' | 'highlighted' | 'minimal')
- `padding` ('sm' | 'md' | 'lg')
- `borderRadius` ('lg' | 'xl' | '2xl' | '3xl')

### Button

```tsx
import { Button } from '@/components/common/Button'

<Button variant="primary" size="md" onClick={() => {}}>
  Click Me
</Button>
```

**Props:**
- `variant` ('primary' | 'secondary' | 'ghost' | 'gold')
- `size` ('xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon')
- `isLoading` (optional): Show loading spinner

---

## Design Tokens

All design decisions are centralized in `src/utils/designTokens.ts`:

### Colors

```typescript
COLORS = {
  PRIMARY: '#22819A',      // Deep teal
  SECONDARY: '#90C2E7',    // Soft blue
  BACKGROUND: '#FEF7F8',   // Warm white
  TEXT: '#13323A',         // Dark text
  MUTED: '#4F6C74',        // Muted text
  ACCENT: '#C9972A',       // Gold
}
```

### Typography

```typescript
FONTS = {
  DISPLAY: "'Playfair Display', Georgia, serif",  // Headings
  BODY: "'Poppins', 'Inter', sans-serif",         // Everything else
}
```

### Spacing

```typescript
SPACING = {
  XS: '8px',
  SM: '16px',
  MD: '24px',
  LG: '32px',
}
```

---

## Data Fetching

### Using Mock Data (Development)

```tsx
import { useDashboardData } from '@/hooks/useDashboardData'

export function Dashboard() {
  const { students, courses, analytics, metrics, isLoading, error } = useDashboardData()

  if (isLoading) return <LoadingState />
  if (error) return <ErrorState />

  return <div>{/* render data */}</div>
}
```

### Using SWR Directly

```tsx
import useSWR from 'swr'

export function MyComponent() {
  const { data, error, isLoading } = useSWR('/api/students', fetcher)
  
  return <div>{data?.length} students</div>
}
```

### Replacing Mock Data with Real API

1. Open `src/services/mockData.ts`
2. Replace `delay()` calls with actual API endpoints
3. Update `src/hooks/useDashboardData.ts` to use real endpoints

---

## Responsive Design

The dashboard uses a mobile-first approach with three breakpoints:

| Breakpoint | Viewport | Sidebar | Grid Cols |
|-----------|----------|---------|-----------|
| Mobile | <768px | Off-screen drawer | 1 |
| Tablet | 768–1023px | Collapsible 240px | 2 |
| Desktop | ≥1024px | Fixed 280px | 3–4 |

### Tailwind Responsive Classes

```tsx
// Example: responsive padding
<div className="p-4 md:p-6 lg:p-8">
  Padding scales with viewport
</div>

// Example: responsive grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  {/* Auto-adjusts columns */}
</div>
```

---

## Animations

Framer Motion patterns are used throughout:

### Fade-Up Stagger (Page Load)

```tsx
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

<motion.div initial="hidden" animate="visible" variants={containerVariants}>
  {/* children animate in sequence */}
</motion.div>
```

### Hover Scale

```tsx
<motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.4 }}>
  Hover me
</motion.div>
```

---

## Available Scripts

```bash
# Development
npm run dev              # Start dev server on port 3000

# Production
npm run build           # Build optimized bundle
npm start               # Start production server

# Code Quality
npm run lint            # Run ESLint
npm run type-check      # Check TypeScript

# Testing
npm test                # Run Vitest
```

---

## Accessibility

The dashboard follows WCAG AA standards:

- ✅ Semantic HTML (`<button>`, `<nav>`, `<article>`)
- ✅ Focus rings on interactive elements
- ✅ Keyboard navigation support
- ✅ Proper color contrast ratios
- ✅ ARIA labels where needed
- ✅ Reduced motion preferences respected

---

## Performance Targets

| Metric | Target | Threshold |
|--------|--------|-----------|
| LCP | <2.5s | <4s |
| FID | <100ms | <300ms |
| CLS | <0.1 | <0.25 |
| Bundle Size | <500KB | <800KB |

Monitor with: `npm run build` → check `.next/` output size

---

## Troubleshooting

### Port 3000 Already in Use

```bash
# Kill process on port 3000
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

### Tailwind Classes Not Applied

- Ensure `tailwind.config.ts` includes your file paths
- Rebuild: `npm run build`
- Check `src/styles/globals.css` is imported in `app/layout.tsx`

### TypeScript Errors

```bash
npm run type-check  # See all type errors
```

---

## Next Steps

1. ✅ **Project initialized** with all core components
2. 🔄 **Add real API endpoints** in `src/services/api.ts`
3. 📊 **Create additional pages** (Analytics, Students, etc.)
4. 🧪 **Add tests** in `tests/` directory
5. 🚀 **Deploy** to Vercel, Netlify, or your platform

---

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Lucide Icons](https://lucide.dev)
- [Recharts](https://recharts.org)

---

## Support

For issues or questions:
- Check the README.md
- Review the design system at `.kiro/steering/enlighted-design-system.md`
- Refer to component prop types in their respective files

Enjoy building! 🚀
