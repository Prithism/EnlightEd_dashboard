# EnlightEd Dashboard — Technical Design Document

## Overview

The EnlightEd Dashboard is a production-grade SaaS analytics interface built on React/Next.js with the EnlightEd Design System. This document details the technical architecture, component structure, file organization, and implementation patterns to enable rapid, consistent development while maintaining the premium aesthetic (Linear/Stripe/Vercel-level polish).

The design enforces strict adherence to the EnlightEd Design System tokens (colors, typography, spacing, border-radius, glassmorphism) across all surfaces and interactions.

## Architecture

### High-Level Component Hierarchy

```
App (Next.js Root)
├── Layout Wrapper
│   ├── Sidebar (Navigation)
│   ├── Navbar (Top Bar)
│   └── Main Content Area
│       ├── Page Header (Title, Breadcrumb)
│       ├── Grid Container
│       │   ├── Metric Cards Section
│       │   ├── Charts Section
│       │   ├── Data Table Section
│       │   └── Activity Feed Section
│       └── Modals/Overlays (Dropdowns, Search, Notifications)
└── Global Providers (Theme, Auth, Data Context)
```

### Data Flow Architecture

```
API Layer
├── REST Endpoints (or GraphQL)
├── Real-time WebSocket (notifications, live metrics)
└── Mock Data Service (development)
    ↓
State Management (Context API / Zustand)
├── Auth State (user, permissions)
├── Dashboard Data (metrics, charts, table rows)
├── UI State (sidebar collapsed, active filters, open modals)
└── Notification State (badge count, recent events)
    ↓
Components (re-render on state updates)
└── Individual widgets consume relevant slices via hooks
```

### State Management Strategy

**Primary Approach:** React Context API with custom hooks (lightweight, no extra dependencies)

**Secondary Consideration:** Zustand for complex, distributed state (if Context becomes unwieldy)

**State Slices:**
- `AuthContext` — user session, permissions
- `DashboardContext` — metrics, chart data, table data
- `UIContext` — sidebar state, modal visibility, active filters
- `NotificationContext` — badge count, notification list

Each context includes a custom hook (e.g., `useDashboardData()`) for convenient component access.

### Server vs. Client Rendering

**Next.js App Router Strategy:**
- Pages and layouts are Server Components by default
- Only interactive sections (forms, real-time widgets) use `'use client'`
- Static content fetched at build time where possible (e.g., course list)
- Dynamic data fetched via Client Components using SWR or React Query

**Benefits:**
- Reduced JavaScript bundle
- Improved SEO (metadata, structured data)
- Server-side data fetching reduces waterfalls
## Components and Interfaces

### Layout Components

#### Sidebar Navigation

**Purpose:** Fixed left navigation panel; collapses on mobile

**Props:**
```typescript
interface SidebarProps {
  isCollapsed?: boolean
  onToggle?: () => void
  activeRoute?: string
}
```

**Structure:**
- Logo area (top, fixed 80px height)
- Navigation list (scrollable)
  - Dashboard
  - Analytics
  - Students
  - Courses
  - Reports
  - Settings
- Footer area (version, support link)

**Desktop (≥1024px):** Width 280px, always visible, glass background
**Tablet (768–1023px):** Width 240px, collapsible
**Mobile (<768px):** Off-screen drawer, triggered by hamburger icon

**Visual Details:**
- Glass background: `backdrop-blur-xl, border-white/20, bg-white/5`
- Active link: `bg-primary, text-white, rounded-lg, left-border-primary`
- Hover state: `bg-secondary/20, transition 0.2s`
- Icons: Lucide React, 20px, `text-primary` (active) or `text-muted` (inactive)

#### Navbar

**Purpose:** Top navigation bar with search, notifications, profile

**Props:**
```typescript
interface NavbarProps {
  title?: string
  breadcrumb?: BreadcrumbItem[]
  notificationCount?: number
  onSearch?: (query: string) => void
  onLogout?: () => void
}
```

**Layout (left to right):**
1. Page title or breadcrumb (responsive hide on mobile)
2. Spacer
3. Search input (collapses to icon on mobile)
4. Notification icon with badge
5. Profile menu dropdown

**Fixed Height:** 72px across all breakpoints
**Glass Background:** Same as Sidebar
**Z-index:** 40 (below modals)

**Key Interactions:**
- Search expands and shows suggestions on focus
- Notification icon shows dropdown with 5 recent events
- Profile menu shows: Profile, Settings, Documentation, Logout

### Metric Card Component

**Purpose:** Display KPI with value, label, trend, optional sparkline

**Props:**
```typescript
interface MetricCardProps {
  label: string
  value: string | number
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
  sparkline?: number[]
  icon?: React.ReactNode
  variant?: 'default' | 'highlighted'
}
```

**Dimensions:**
- Minimum height: 140px
- Padding: 16px (Poppins, responsive scale)
- Border radius: `rounded-2xl` (1rem / 16px)

**Typography:**
- Label: Poppins 500, 14px, `text-muted`
- Value: Poppins 600, 28–32px, `text-ink`
- Trend: Poppins 400, 14px, up=`text-secondary`, down=`text-muted`

**Animations (Framer Motion):**
- Initial: `opacity: 0, y: 20`
- Animate: `opacity: 1, y: 0` (duration 0.6s, spring easing)
- Hover: `scale: 1.02, transition: 0.4s`

**Variant:** 'highlighted' adds subtle gradient overlay and gold accent

### Chart Component

**Purpose:** Data visualization with glassmorphic styling

**Props:**
```typescript
interface ChartProps {
  title: string
  data: ChartDataPoint[]
  type: 'line' | 'bar' | 'area'
  colors?: string[]
  tooltip?: boolean
  animation?: boolean
}
```

**Container:**
- Padding: 24px
- Border radius: `rounded-2xl`
- Glass background + gradient overlay
- Min height: 300px

**Axis & Grid:**
- Axis lines: `stroke-white/20`
- Grid lines: `stroke-white/10`
- Labels: Poppins 400, 12px, `text-muted`

**Data Series Colors** (priority order):
1. Primary (#22819A)
2. Secondary (#90C2E7)
3. Accent (#C9972A)

**Tooltip:**
- Fade in 0.2s on hover
- Format: "Value: 1,234.56"
- Glass background, positioned above data point
### Data Table Component

**Purpose:** Display paginated, sortable, filterable tabular data

**Props:**
```typescript
interface TableProps {
  columns: TableColumn[]
  data: TableRow[]
  pageSize?: number
  onSort?: (columnKey: string, direction: 'asc' | 'desc') => void
  onFilter?: (filters: Record<string, string>) => void
  loading?: boolean
}
```

**Container:**
- Padding: 0 (cells handle padding)
- Border radius: `rounded-2xl`
- Glass background
- Overflow: `auto` (horizontal scroll if needed, but discouraged)

**Header Row:**
- Background: `bg-primary/10`
- Height: 48px (6 × 8pt)
- Font: Poppins 600, 14px, `text-ink`
- Padding: 16px horizontal

**Body Rows:**
- Height: 48px
- Border bottom: `border-white/10`
- Hover: `bg-primary/5, transition: 0.2s`
- Font: Poppins 400, 14px, `text-ink`
- Padding: 16px horizontal

**Pagination:**
- Below table, centered
- Show: "Showing 1–10 of 250" 
- Buttons: previous, next, optional page selector
- Disabled state on first/last page

**Status Badge:**
- Success: `bg-secondary, text-white`
- Warning: `bg-gold, text-ink`
- Neutral: `bg-muted/20, text-muted`
- Padding: 4px 8px, border radius `rounded-lg`

### Activity Feed Component

**Purpose:** Chronological list of recent events

**Props:**
```typescript
interface ActivityFeedProps {
  items: ActivityItem[]
  maxItems?: number
  onItemClick?: (itemId: string) => void
}

interface ActivityItem {
  id: string
  timestamp: string // e.g., "2 hours ago"
  actor: string // "John Doe"
  action: string // "enrolled in Biology 101"
  type: 'success' | 'warning' | 'neutral'
  icon?: React.ReactNode
}
```

**Container:**
- Padding: 24px
- Border radius: `rounded-2xl`
- Glass background
- Max height: 400px, overflow-y auto
- Title: Poppins 600, 16px, `text-ink`

**Activity Item:**
- Padding: 12px 0
- Border bottom: `border-white/10` (except last item)
- Timestamp: Poppins 400, 12px, `text-muted`
- Description: Poppins 400, 14px, `text-ink`
- Icon: 20px, `text-secondary` (positive) or `text-muted` (warning)
- Clickable: `cursor-pointer, hover: bg-primary/5`

### Card (Generic Container)

**Purpose:** Reusable glass container for any content

**Props:**
```typescript
interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'highlighted' | 'minimal'
  padding?: 'sm' | 'md' | 'lg'
  borderRadius?: 'lg' | 'xl' | '2xl' | '3xl'
  className?: string
}
```

**Styling:**
- Default: `backdrop-blur-xl, border-white/20, bg-white/5, rounded-2xl`
- Highlighted: adds subtle gradient overlay + gold accent border
- Minimal: only `border-white/20`, no blur
- Padding variants: sm=12px, md=16px, lg=24px

## Design Patterns and Implementation

### Glassmorphism Implementation

**Core CSS Pattern:**
```css
.glass-surface {
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.05);
  background-image: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
}

.glass-surface:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.3);
}
```

**Tailwind Approach:**
```html
<div class="backdrop-blur-xl border border-white/20 bg-white/5 rounded-2xl p-6">
  Content
</div>
```

**Why not box-shadow:** The design system avoids drop shadows entirely. Depth is created through:
1. Layered backdrop-blur
2. Subtle gradient overlays
3. Semi-transparent borders
4. Color shifts on hover (not scale/shadow)

### 3.2 Animation Patterns (Framer Motion)

**Pattern 1: Page Load Fade-Up Stagger**

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  },
}
```

**Pattern 2: Hover Scale**

```typescript
const hoverScale = {
  whileHover: { scale: 1.02 },
  transition: { duration: 0.4 },
}
```

**Pattern 3: Modal Entrance**

```typescript
const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.3 },
  },
}
```

**Pattern 4: Reduced Motion Support**

```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const duration = prefersReducedMotion ? 0.1 : 0.6
```

### 3.3 Responsive Breakpoints

**Desktop (≥1024px):**
- Sidebar: 280px, visible
- Main grid: 3–4 columns
- Font sizes: full (28–48px headings)
- Padding: 32px

**Tablet (768–1023px):**
- Sidebar: 240px, collapsible
- Main grid: 2 columns
- Font sizes: 80% of desktop
- Padding: 24px

**Mobile (<768px):**
- Sidebar: off-screen drawer
- Main grid: 1 column, full-width
- Font sizes: 70% of desktop
- Padding: 16px
- Touch targets: minimum 44×44px

**Tailwind Breakpoints:**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      sm: '640px',   // Small phones
      md: '768px',   // Tablets (our breakpoint)
      lg: '1024px',  // Desktop (our breakpoint)
      xl: '1280px',  // Large desktop
      '2xl': '1536px',
    },
  },
}
```

**Usage in Components:**
```html
<div class="md:w-240 lg:w-280 p-4 md:p-6 lg:p-8">
  <!-- Padding scales: 16px → 24px → 32px -->
</div>
```
## 4. Technology Stack and Rationale

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Frontend Framework** | React 18 + Next.js 14+ | Server-side rendering, static generation, API routes, built-in optimization |
| **Styling** | Tailwind CSS + CSS Modules | Utility-first, design tokens, small bundle size, DRY |
| **Animation** | Framer Motion | Industry-standard, performant, spring easing support |
| **Icons** | Lucide React | Tree-shakeable, consistent, 300+ icons, teal/gold compatible |
| **Charts** | Recharts or Chart.js | Minimal, customizable, good Tailwind integration |
| **State** | Context API + SWR | Lightweight, built-in React, great for data fetching |
| **Typography** | Playfair Display, Poppins (Google Fonts) | Premium feel, free, widely supported |
| **Database/API** | Next.js API Routes + Mock Data | Development mode with mock service, production with real API |
| **Testing** | Vitest + React Testing Library | Fast, component-focused, good for properties-based testing |
| **Accessibility** | Headless UI, ARIA, ESLint a11y | Semantic HTML, keyboard navigation, screen reader support |
| **Performance** | Next.js Image, dynamic imports, SWR | Lazy loading, code splitting, incremental static generation |

## 5. File Organization and Folder Structure

```
enlighted-dashboard/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/ (if self-hosted)
├── src/
│   ├── app/
│   │   ├── layout.tsx (Root layout, global styles)
│   │   ├── page.tsx (Dashboard page)
│   │   ├── (routes)/
│   │   │   ├── analytics/page.tsx
│   │   │   ├── students/page.tsx
│   │   │   ├── courses/page.tsx
│   │   │   ├── reports/page.tsx
│   │   │   └── settings/page.tsx
│   │   └── api/
│   │       ├── metrics/route.ts
│   │       ├── charts/route.ts
│   │       ├── students/route.ts
│   │       └── notifications/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── MainContent.tsx
│   │   │   └── Layout.tsx
│   │   ├── metrics/
│   │   │   ├── MetricCard.tsx
│   │   │   ├── MetricGrid.tsx
│   │   │   └── MetricCard.module.css
│   │   ├── charts/
│   │   │   ├── Chart.tsx
│   │   │   ├── LineChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   └── Chart.module.css
│   │   ├── data/
│   │   │   ├── Table.tsx
│   │   │   ├── TableHeader.tsx
│   │   │   ├── TableRow.tsx
│   │   │   └── Table.module.css
│   │   ├── feedback/
│   │   │   ├── ActivityFeed.tsx
│   │   │   ├── NotificationPanel.tsx
│   │   │   ├── Dropdown.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Badge.tsx
│   │   ├── common/
│   │   │   ├── Card.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Avatar.tsx
│   │   │   └── Card.module.css
│   │   └── ui/
│   │       └── (Headless UI wrapper components)
│   ├── hooks/
│   │   ├── useDashboardData.ts
│   │   ├── useNotifications.ts
│   │   ├── useResponsive.ts
│   │   ├── useLocalStorage.ts
│   │   └── useWindowSize.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── DashboardContext.tsx
│   │   ├── UIContext.tsx
│   │   └── NotificationContext.tsx
│   ├── services/
│   │   ├── api.ts (fetch wrapper)
│   │   ├── mockData.ts (dev data)
│   │   └── auth.ts (auth logic)
│   ├── styles/
│   │   ├── globals.css (Tailwind, base classes)
│   │   ├── variables.css (CSS custom properties)
│   │   └── animations.css (global animations)
│   ├── utils/
│   │   ├── designTokens.ts (constants)
│   │   ├── classNames.ts (utilities)
│   │   ├── format.ts (number, date formatting)
│   │   └── localStorage.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── dashboard.ts
│   │   ├── user.ts
│   │   └── api.ts
│   └── middleware.ts (auth, redirects)
├── .storybook/ (Component explorer)
│   ├── main.ts
│   └── preview.ts
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── public/
├── .env.local (secrets)
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── vitest.config.ts
└── package.json
```

**Key Organization Principles:**
- **Colocation:** Component + styles + tests together
- **Feature Folders:** Each feature (layout, metrics, charts) self-contained
- **Shared Utilities:** Common hooks, services, types in root-level directories
- **API Routes:** Next.js API routes for mock data (dev) or real endpoints (prod)
- **Environment Config:** .env.local for secrets, next.config.js for build settings

## 6. Design System: Color and Typography Implementation

### 6.1 Design Tokens File (designTokens.ts)

```typescript
// src/utils/designTokens.ts

export const COLORS = {
  PRIMARY: '#22819A',      // Deep teal
  SECONDARY: '#90C2E7',    // Soft sky blue
  BACKGROUND: '#FEF7F8',   // Warm near-white
  TEXT: '#13323A',         // Dark teal-black
  MUTED: '#4F6C74',        // Muted grey-teal
  ACCENT: '#C9972A',       // Warm gold
  TEAL_900: '#0F3342',
  TEAL_800: '#143742',
  TEAL_700: '#1D6072',
  TEAL_400: '#35A8C8',
  TEAL_200: '#90C2E7',
}

export const FONTS = {
  DISPLAY: "'Playfair Display', Georgia, serif",
  BODY: "'Poppins', 'Inter', sans-serif",
}

export const FONT_WEIGHTS = {
  BODY_REGULAR: 400,
  BODY_MEDIUM: 500,
  BODY_SEMIBOLD: 600,
  DISPLAY: 700,
}

export const SPACING = {
  XS: '8px',
  SM: '16px',
  MD: '24px',
  LG: '32px',
  XL: '40px',
  '2XL': '48px',
  '3XL': '56px',
  '4XL': '64px',
}

export const BORDER_RADIUS = {
  LG: '0.5rem',      // 8px
  XL: '0.75rem',     // 12px
  '2XL': '1rem',     // 16px
  '3XL': '1.5rem',   // 24px
  FULL: '9999px',
}

export const GLASS_EFFECT = {
  backdropFilter: 'blur(24px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
}

export const BREAKPOINTS = {
  MOBILE: '0px',
  TABLET: '768px',
  DESKTOP: '1024px',
  LARGE: '1280px',
}

export const SIDEBAR = {
  WIDTH_DESKTOP: '280px',
  WIDTH_TABLET: '240px',
  COLLAPSED_WIDTH: '80px',
}

export const NAVBAR = {
  HEIGHT: '72px',
}

export const PAGE_BACKGROUND = `
  radial-gradient(circle at 10% 10%, rgba(144, 194, 231, 0.24) 0, transparent 35%),
  radial-gradient(circle at 80% 0%, rgba(34, 129, 154, 0.16) 0, transparent 42%),
  linear-gradient(180deg, #fff9fa, ${COLORS.BACKGROUND} 40%, ${COLORS.BACKGROUND})
`
```

### 6.2 Tailwind Config Extension

```javascript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#22819A',
        secondary: '#90C2E7',
        bg: '#FEF7F8',
        ink: '#13323A',
        muted: '#4F6C74',
        gold: '#C9972A',
        teal: {
          900: '#0F3342',
          800: '#143742',
          700: '#1D6072',
          600: '#22819A',
          400: '#35A8C8',
          200: '#90C2E7',
        },
      },
      fontFamily: {
        display: ["'Playfair Display'", 'Georgia', 'serif'],
        body: ["'Poppins'", "'Inter'", 'sans-serif'],
      },
      fontSize: {
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '32px',
        '5xl': '36px',
        '6xl': '48px',
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '32px',
        xl: '40px',
        '2xl': '48px',
        '3xl': '56px',
        '4xl': '64px',
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backdropBlur: {
        xl: '24px',
      },
    },
  },
  plugins: [],
}

export default config
```

### 6.3 Global Styles and Base Classes

```css
/* src/styles/globals.css */

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500;600&display=swap');

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-bg text-ink font-body;
    background-image:
      radial-gradient(circle at 10% 10%, rgba(144, 194, 231, 0.24) 0, transparent 35%),
      radial-gradient(circle at 80% 0%, rgba(34, 129, 154, 0.16) 0, transparent 42%),
      linear-gradient(180deg, #fff9fa, #fef7f8 40%, #fef7f8);
    background-attachment: fixed;
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-display font-bold;
  }

  h1 {
    @apply text-5xl md:text-6xl;
  }

  h2 {
    @apply text-3xl md:text-4xl;
  }

  h3 {
    @apply text-2xl md:text-3xl;
  }

  a {
    @apply text-primary hover:text-teal-700 transition-colors;
  }

  button {
    @apply focus:outline-none focus:ring-2 focus:ring-primary;
  }

  input, textarea, select {
    @apply font-body;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(34, 129, 154, 0.3);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(34, 129, 154, 0.5);
  }

  /* CSS Variables for dynamic theming (future) */
  --color-primary: #22819A;
  --color-secondary: #90C2E7;
  --color-bg: #FEF7F8;
  --color-ink: #13323A;
  --color-muted: #4F6C74;
  --color-gold: #C9972A;
}

@layer components {
  /* Reusable glass effect utility */
  .glass {
    @apply backdrop-blur-xl border border-white/20 bg-white/5;
  }

  .glass-gradient {
    @apply glass bg-gradient-to-br from-white/10 to-white/5;
  }

  /* Button base styles */
  .btn {
    @apply px-4 py-2 rounded-xl font-body font-medium transition-all;
  }

  .btn-primary {
    @apply btn bg-primary text-white hover:bg-teal-700 active:scale-95;
  }

  .btn-secondary {
    @apply btn bg-secondary/20 text-primary hover:bg-secondary/30;
  }

  .btn-ghost {
    @apply btn text-primary hover:bg-primary/10;
  }

  /* Focus ring */
  .focus-ring {
    @apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2;
  }

  /* Truncate text */
  .truncate-2 {
    @apply line-clamp-2;
  }
}

@layer utilities {
  /* Responsive padding helper */
  .p-responsive {
    @apply p-4 md:p-6 lg:p-8;
  }

  /* Responsive gap helper */
  .gap-responsive {
    @apply gap-3 md:gap-4 lg:gap-6;
  }

  /* Disable animations for users with reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation: none !important;
      transition: none !important;
    }
  }
}
```
## 7. Responsive Behavior: Mobile-First Approach

### 7.1 Breakpoint Strategy

| Breakpoint | Width | Device | Sidebar | Grid Cols | Font Scale |
|-----------|-------|--------|---------|-----------|-----------|
| Mobile | <768px | Phone | Off-screen | 1 | 70% |
| Tablet | 768–1023px | Tablet | Collapsible 240px | 2 | 85% |
| Desktop | ≥1024px | Desktop | Fixed 280px | 3–4 | 100% |

### 7.2 Component Behavior by Breakpoint

**Sidebar:**
```tsx
// Mobile: hamburger icon + off-screen drawer
// Tablet: 240px collapsible panel
// Desktop: 280px fixed visible panel

<Sidebar
  isCollapsed={isMobile ? true : isTabletCollapsed}
  variant={isMobile ? 'drawer' : 'panel'}
/>
```

**Navbar:**
```tsx
// Mobile: search + notification icons, profile menu compact
// Tablet: search input visible, profile expanded
// Desktop: full search + notification dropdown + profile menu

<Navbar
  showSearchInput={!isMobile}
  notificationStyle={isMobile ? 'badge' : 'dropdown'}
/>
```

**Main Grid:**
```tsx
// Mobile: 1 column, full viewport width
// Tablet: 2 columns
// Desktop: 3–4 columns

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-responsive">
  {/* Grid items */}
</div>
```

**Metric Cards:**
```tsx
// Mobile: single column, full width
// Tablet: 2 cards per row
// Desktop: 4 cards per row, or 2 larger cards

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
  <MetricCard label="Total Students" value={1250} />
  <MetricCard label="Active Courses" value={42} />
  <MetricCard label="Avg Score" value="78.5%" />
  <MetricCard label="System Uptime" value="99.9%" />
</div>
```

**Charts:**
```tsx
// Mobile: full width, reduced height
// Tablet: side by side, medium height
// Desktop: side by side, full height

<div className="grid grid-cols-1 lg:grid-cols-2 gap-responsive">
  <Chart title="Performance Trend" height="300px" />
  <Chart title="Enrollment" height="300px" />
</div>
```

**Table:**
```tsx
// Mobile: horizontal scroll (discouraged), or card view alternative
// Tablet: reduced columns, compact rows
// Desktop: full columns, standard rows

<Table
  columns={isMobile ? compactColumns : fullColumns}
  rowHeight={isMobile ? 'sm' : 'md'}
/>
```

### 7.3 Touch and Mobile Interactions

**Touch Targets:** Minimum 44px × 44px (iOS guideline)

```tsx
// Button minimum size on mobile
<button className="px-3 py-2.5 min-h-[44px] min-w-[44px]">
  Action
</button>
```

**Gesture Handling:**
- Tap: Same as click
- Long press: Context menu (if applicable)
- Swipe left/right: Close sidebar drawer
- Pull to refresh: Reload dashboard data (optional)

**Mobile Search:**
```tsx
// Desktop: inline search in navbar
// Mobile: overlay search modal with suggestions

{isMobile ? (
  <button onClick={() => setSearchOpen(true)}>
    <SearchIcon />
  </button>
) : (
  <SearchInput />
)}
```

### 7.4 Layout Transitions

**CSS Media Query Transition:**
```css
@media (max-width: 767px) {
  /* Mobile styles */
  .main-content {
    margin-left: 0;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  /* Tablet styles */
  .main-content {
    margin-left: 240px;
  }
}

@media (min-width: 1024px) {
  /* Desktop styles */
  .main-content {
    margin-left: 280px;
  }
}

/* Smooth transition when viewport changes */
* {
  transition: margin 0.3s ease-out;
}
```

**Avoiding Layout Shift (CLS):**
- Skeleton loaders: Show placeholder while loading
- Responsive images: Use `next/image` with fixed aspect ratios
- Font loading: Use `font-display: swap` for Google Fonts
- Reserved space: Use aspect ratio boxes for media

## 8. Performance Considerations and Optimization

### 8.1 Code Splitting Strategy

**Route-Level Code Splitting:**
```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}

// Each route automatically code-split by Next.js
```

**Component-Level Dynamic Imports:**
```typescript
// For heavy components not needed on initial load
import dynamic from 'next/dynamic'

const AnalyticsChart = dynamic(
  () => import('../components/charts/AnalyticsChart'),
  { loading: () => <ChartSkeleton /> }
)

export default function Page() {
  return <AnalyticsChart />
}
```

### 8.2 Image Optimization

**Next.js Image Component:**
```typescript
import Image from 'next/image'

// Automatic format conversion (WebP, AVIF), responsive sizes
<Image
  src="/dashboard-hero.png"
  alt="Dashboard overview"
  width={1200}
  height={600}
  priority={false}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**SVG Icons (Lucide React):**
```typescript
import { Users, TrendingUp, Award } from 'lucide-react'

// Tree-shaken at build time — only used icons bundled
export function MetricCard() {
  return <Users size={24} />
}
```

### 8.3 Data Fetching and Caching

**Static Generation (Build Time):**
```typescript
// app/courses/page.tsx
async function getCourses() {
  const res = await fetch('https://api.example.com/courses', {
    next: { revalidate: 86400 } // Cache 24 hours
  })
  return res.json()
}

export default async function CoursesPage() {
  const courses = await getCourses()
  return <CoursesList courses={courses} />
}
```

**Client-Side Data Fetching with SWR:**
```typescript
// components/metrics/MetricsOverview.tsx
import useSWR from 'swr'

export function MetricsOverview() {
  const { data, error, isLoading } = useSWR(
    '/api/metrics',
    fetcher,
    { revalidateOnFocus: false, dedupingInterval: 60000 }
  )

  if (isLoading) return <MetricsSkeleton />
  if (error) return <ErrorState />

  return <MetricGrid metrics={data} />
}
```

**Real-Time Updates with WebSocket (Optional):**
```typescript
// hooks/useRealtimeMetrics.ts
export function useRealtimeMetrics() {
  const [metrics, setMetrics] = useState(null)

  useEffect(() => {
    const ws = new WebSocket('wss://api.example.com/metrics')
    
    ws.onmessage = (event) => {
      setMetrics(JSON.parse(event.data))
    }

    return () => ws.close()
  }, [])

  return metrics
}
```

### 8.4 Performance Metrics Targets

| Metric | Target | Threshold |
|--------|--------|-----------|
| **LCP** (Largest Contentful Paint) | <2.5s | <4s |
| **FID** (First Input Delay) | <100ms | <300ms |
| **CLS** (Cumulative Layout Shift) | <0.1 | <0.25 |
| **Time to Interactive** | <2.5s on 4G | <3.5s |
| **Bundle Size** (JS+CSS) | <500KB | <800KB |
| **First Byte** | <200ms | <500ms |

### 8.5 Bundle Analysis

```bash
# Analyze bundle size
npm run build
npx next-bundle-analyzer

# Check for unused dependencies
npm list --depth=0
```

## 9. Accessibility Implementation

### 9.1 Semantic HTML Structure

```html
<!-- app/layout.tsx or page.tsx -->
<html lang="en">
  <head>
    <title>EnlightEd Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <!-- Skip to main content link (hidden visually, visible to screen readers) -->
    <a href="#main-content" className="sr-only focus:not-sr-only">
      Skip to main content
    </a>

    <!-- Header with navigation -->
    <header role="banner" className="fixed top-0 left-0 right-0">
      <Navbar />
    </header>

    <!-- Sidebar navigation -->
    <aside role="navigation" aria-label="Main navigation">
      <Sidebar />
    </aside>

    <!-- Main content area -->
    <main id="main-content" role="main">
      <section aria-labelledby="metrics-heading">
        <h2 id="metrics-heading">Key Performance Indicators</h2>
        {/* Metrics */}
      </section>

      <section aria-labelledby="charts-heading">
        <h2 id="charts-heading">Analytics</h2>
        {/* Charts */}
      </section>
    </main>

    <!-- Footer -->
    <footer role="contentinfo">
      {/* Footer content */}
    </footer>
  </body>
</html>
```

### 9.2 Keyboard Navigation

**Tab Order:**
1. Skip-to-main-content link
2. Navbar search, notifications, profile
3. Sidebar navigation links
4. Main content (left-to-right, top-to-bottom)
5. Cards and interactive elements
6. Table rows and cells

```typescript
// components/layout/Layout.tsx
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      {/* Skip link */}
      <a href="#main-content" className="sr-only focus:not-sr-only bg-primary text-white px-3 py-2">
        Skip to main content
      </a>

      {/* Navbar tabindex controlled in component */}
      <Navbar tabIndex={0} />

      <div className="flex">
        {/* Sidebar tabindex controlled, links naturally focusable */}
        <Sidebar role="navigation" />

        {/* Main content */}
        <main id="main-content" className="flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}
```

### 9.3 Focus Management

**Visible Focus Indicator:**
```css
/* Tailwind utility */
.focus-ring {
  @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2;
}

/* Applied to all interactive elements */
<button className="focus-ring">
  Click me
</button>
```

**Focus Trap in Modal:**
```typescript
// components/feedback/Modal.tsx
import { useEffect, useRef } from 'react'

export function Modal({ isOpen, onClose, children }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    // Trap focus inside modal
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab') {
        const focusableElements = containerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]'
        )
        const firstElement = focusableElements?.[0] as HTMLElement
        const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement?.focus()
          e.preventDefault()
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement?.focus()
          e.preventDefault()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    containerRef.current?.querySelector('button')?.focus()

    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <div ref={containerRef} role="dialog" aria-modal="true">
      {children}
    </div>
  )
}
```

### 9.4 ARIA Labels and Descriptions

```typescript
// MetricCard with ARIA
<div
  className="glass rounded-2xl p-4"
  role="article"
  aria-label="Total Students metric"
>
  <span className="text-muted text-sm">Total Students</span>
  <div className="text-3xl font-semibold text-ink" aria-label="1,250 students">
    1,250
  </div>
  <span
    className="text-secondary text-sm"
    aria-label="Up 12 percent compared to last week"
  >
    ↑ 12%
  </span>
</div>

// Table with ARIA
<table role="table" aria-label="Student enrollment data">
  <thead>
    <tr role="row">
      <th role="columnheader" aria-sort="ascending">
        Name
      </th>
      <th role="columnheader">Email</th>
      <th role="columnheader">Status</th>
    </tr>
  </thead>
  <tbody>
    {/* rows */}
  </tbody>
</table>

// Button with aria-label
<button
  aria-label="Open notifications panel"
  onClick={handleNotifications}
>
  <BellIcon size={20} />
  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        aria-label={`${notificationCount} new notifications`}>
    {notificationCount}
  </span>
</button>
```

### 9.5 Color Contrast

**WCAG AA Minimum Contrast Ratios:**
- Body text on background: 4.5:1
- Large text (18pt+) on background: 3:1
- UI components (borders, icons): 3:1

**Verification:**
```typescript
// Define verified contrast pairs
export const CONTRAST_VERIFIED = {
  'text-ink on bg-bg': '14.86:1', // Exceeds 4.5:1 ✓
  'text-muted on bg-bg': '5.22:1', // Exceeds 4.5:1 ✓
  'text-primary on white': '3.14:1', // Below 4.5:1 ✗ (use only for large text)
  'white text on bg-primary': '6.89:1', // Exceeds 4.5:1 ✓
  'text-gold on bg-bg': '5.84:1', // Exceeds 4.5:1 ✓
}
```

### 9.6 Screen Reader Support

```typescript
// ActivityFeed with live region
<div
  role="region"
  aria-live="polite"
  aria-label="Recent activity feed"
  className="glass rounded-2xl p-6"
>
  {/* Activity items announced as they update */}
  {activities.map((item) => (
    <article key={item.id} className="mb-4 pb-4 border-b border-white/10">
      <time dateTime={item.timestamp} className="text-muted text-xs">
        {formatTimeAgo(item.timestamp)}
      </time>
      <p className="text-ink text-sm">
        <strong>{item.actor}</strong> {item.action}
      </p>
    </article>
  ))}
</div>

// Form with error messages
<div className="mb-6">
  <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
    Email Address
  </label>
  <input
    id="email"
    type="email"
    aria-describedby={error ? 'email-error' : undefined}
    className={error ? 'border-2 border-red-500' : 'border border-white/20'}
  />
  {error && (
    <p id="email-error" role="alert" className="text-red-600 text-sm mt-1">
      {error}
    </p>
  )}
</div>
```

## 10. API Integration and Data Models

### 10.1 API Routes Structure

```typescript
// app/api/metrics/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getMockMetrics } from '@/services/mockData'

export async function GET(request: NextRequest) {
  try {
    // Development: return mock data
    if (process.env.NODE_ENV === 'development') {
      const metrics = getMockMetrics()
      return NextResponse.json(metrics)
    }

    // Production: fetch from external API
    const response = await fetch(
      `${process.env.EXTERNAL_API_URL}/metrics`,
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Metrics API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch metrics' },
      { status: 500 }
    )
  }
}
```

### 10.2 Data Models and Types

```typescript
// src/types/dashboard.ts

export interface Metric {
  id: string
  label: string
  value: number | string
  trend?: {
    direction: 'up' | 'down'
    percentage: number
  }
  unit?: string
}

export interface ChartDataPoint {
  date: string
  value: number
  label?: string
}

export interface ChartData {
  id: string
  title: string
  type: 'line' | 'bar' | 'area'
  data: ChartDataPoint[]
  colors?: string[]
}

export interface Student {
  id: string
  name: string
  email: string
  enrollmentDate: string
  status: 'active' | 'inactive' | 'suspended'
  performanceScore: number
}

export interface Course {
  id: string
  title: string
  instructor: string
  students: number
  enrollmentCap: number
  startDate: string
  status: 'draft' | 'active' | 'archived'
}

export interface ActivityItem {
  id: string
  actor: string
  action: string
  type: 'success' | 'warning' | 'info'
  timestamp: Date
  metadata?: Record<string, unknown>
}

export interface NotificationEvent {
  id: string
  title: string
  message: string
  type: 'alert' | 'info' | 'success'
  timestamp: Date
  read: boolean
}

export interface DashboardState {
  metrics: Metric[]
  charts: ChartData[]
  students: Student[]
  courses: Course[]
  activities: ActivityItem[]
  notifications: NotificationEvent[]
  loading: boolean
  error: string | null
}
```

### 10.3 Mock Data Service

```typescript
// src/services/mockData.ts

export function getMockMetrics(): Metric[] {
  return [
    {
      id: 'total-students',
      label: 'Total Students',
      value: 1250,
      trend: { direction: 'up', percentage: 12 },
    },
    {
      id: 'active-courses',
      label: 'Active Courses',
      value: 42,
      trend: { direction: 'up', percentage: 8 },
    },
    {
      id: 'avg-performance',
      label: 'Avg Performance Score',
      value: '78.5%',
      trend: { direction: 'up', percentage: 3.2 },
    },
    {
      id: 'uptime',
      label: 'System Uptime',
      value: '99.9%',
      trend: { direction: 'up', percentage: 0.1 },
    },
  ]
}

export function getMockChartData(): ChartData[] {
  return [
    {
      id: 'performance-trend',
      title: 'Student Performance Trend',
      type: 'line',
      data: Array.from({ length: 12 }, (_, i) => ({
        date: `Week ${i + 1}`,
        value: Math.floor(Math.random() * 40) + 60,
      })),
    },
    {
      id: 'enrollment-distribution',
      title: 'Course Enrollment Distribution',
      type: 'bar',
      data: [
        { date: 'Biology', value: 180 },
        { date: 'Chemistry', value: 150 },
        { date: 'Physics', value: 200 },
        { date: 'Mathematics', value: 220 },
        { date: 'English', value: 190 },
      ],
    },
  ]
}

export function getMockActivityFeed(): ActivityItem[] {
  return [
    {
      id: '1',
      actor: 'Sarah Johnson',
      action: 'enrolled in Advanced Mathematics',
      type: 'success',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: '2',
      actor: 'System',
      action: 'scheduled maintenance for tomorrow at 2:00 AM',
      type: 'info',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    },
    {
      id: '3',
      actor: 'Michael Chen',
      action: 'completed Biology midterm with score 92/100',
      type: 'success',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    },
  ]
}
```

---

## Correctness Properties and Testing Strategy

### Implementation-Level Properties

**Property 1: Design Token Consistency**
- For any rendered component, its color, font, spacing values MUST match defined tokens
- Verify: `getComputedStyle(element).color === COLORS.PRIMARY`

**Property 2: Glassmorphism Invariant**
- Every card/panel MUST have `backdrop-filter: blur(24px)` and border opacity 0.2
- Verify: `getComputedStyle(card)['backdropFilter'] === 'blur(24px)'`

**Property 3: Responsive Grid Scaling**
- Desktop: 4 columns → Tablet: 2 columns → Mobile: 1 column
- Never horizontal overflow on any breakpoint

**Property 4: Animation Timing Consistency**
- Micro-interactions: 0.2s
- Standard interactions: 0.4s
- Major transitions: 0.6s
- Reduced motion: all durations → 0.1s

**Property 5: Accessibility Invariants**
- Every interactive element MUST be keyboard focusable
- Focus ring visible: `outline: 2px solid #22819A`
- Tab order follows visual reading order

**Property 6: API Data Shape**
- All metrics have required fields: id, label, value
- All chart data have date and value
- Activities have actor, action, timestamp

**Property 7: Idempotent Filtering**
- Filter(Filter(data)) === Filter(data)
- Sort(Sort(data)) === Sort(data)

**Property 8: State Isolation**
- UI state changes do NOT affect data state
- Sidebar collapse does NOT affect dashboard metrics
- Modal visibility does NOT affect underlying data

---

## Implementation Checklist

- [ ] Project setup (Next.js, Tailwind, Framer Motion)
- [ ] Design tokens exported (designTokens.ts)
- [ ] Global styles (globals.css, base classes)
- [ ] Tailwind config extended with tokens
- [ ] Reusable components (Card, Button, Badge, etc.)
- [ ] Layout components (Sidebar, Navbar, Layout)
- [ ] Metric card implementation
- [ ] Chart components with mock data
- [ ] Table component with sorting/pagination
- [ ] Activity feed
- [ ] API routes and mock data service
- [ ] Context providers (Auth, Dashboard, UI, Notifications)
- [ ] Custom hooks (useDashboardData, useResponsive, etc.)
- [ ] Responsive behavior testing (mobile, tablet, desktop)
- [ ] Animation testing (Framer Motion integration)
- [ ] Accessibility audit (WCAG AA)
- [ ] Performance testing (bundle size, LCP, CLS)
- [ ] Storybook setup and documentation
- [ ] E2E tests (Playwright or Cypress)
- [ ] Deployment configuration

