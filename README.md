# EnlightEd Dashboard

A production-ready SaaS analytics dashboard built with React 18, Next.js 14, TailwindCSS, and Framer Motion. The dashboard adheres strictly to the EnlightEd Design System with a premium aesthetic inspired by Linear, Stripe, and Vercel.

## Features

- **Premium UI/UX** — Glassmorphism, smooth animations, and careful spacing
- **Responsive Design** — Mobile-first approach with seamless breakpoints (mobile, tablet, desktop)
- **Reusable Components** — Button, Card, MetricCard, Table, Chart, ActivityFeed, Sidebar, Navbar
- **Real-time Data** — Mock data service ready for API integration
- **Accessibility** — WCAG AA contrast, semantic HTML, keyboard navigation
- **Performance** — Optimized bundle size, code splitting, image optimization
- **Type-Safe** — Full TypeScript support
- **Design Tokens** — Centralized color, spacing, and typography system

## Tech Stack

| Layer     | Technology                     |
| --------- | ------------------------------ |
| Frontend  | React 18 + Next.js 14          |
| Styling   | TailwindCSS + CSS Modules      |
| Animation | Framer Motion                  |
| Charts    | Recharts                       |
| Icons     | Lucide React                   |
| State     | Context API + SWR              |
| Types     | TypeScript                     |
| Testing   | Vitest + React Testing Library |

## Color Palette

```
Primary Teal:    #22819A
Secondary Blue:  #90C2E7
Background:      #FEF7F8
Text (Ink):      #13323A
Muted:           #4F6C74
Accent (Gold):   #C9972A
```

## Typography

- **Headlines** — Lora (Serif)
- **Body & UI** — Inter (Sans-serif)
- **Sizes** — 12px to 48px, responsive scaling

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Dashboard page
│   └── api/               # API routes
├── components/
│   ├── layout/            # Sidebar, Navbar, Layout
│   ├── common/            # Button, Card, Input
│   ├── metrics/           # MetricCard, MetricGrid
│   ├── charts/            # Chart, LineChart, etc.
│   ├── data/              # Table, TableHeader
│   └── feedback/          # ActivityFeed, Modal
├── context/               # React Context providers
├── hooks/                 # Custom hooks
├── services/              # API, mock data
├── styles/                # Global CSS
├── types/                 # TypeScript definitions
└── utils/                 # Design tokens, helpers
```

## Key Components

### Layout

```tsx
import { Layout } from "@/components/layout/Layout";

export default function Page() {
  return (
    <Layout title="Dashboard" activeRoute="/">
      {/* Page content */}
    </Layout>
  );
}
```

### MetricCard

```tsx
import { MetricCard } from "@/components/metrics/MetricCard";

<MetricCard
  label="Total Students"
  value="1,250"
  trend={{ direction: "up", percentage: 12 }}
  icon={<Users size={24} />}
/>;
```

### Chart

```tsx
import { Chart } from "@/components/charts/Chart";

<Chart
  title="Enrollment Trend"
  data={data}
  type="line"
  dataKeys={["students"]}
/>;
```

### Table

```tsx
import { Table } from "@/components/data/Table";

<Table columns={columns} data={data} pageSize={10} />;
```

### ActivityFeed

```tsx
import { ActivityFeed } from "@/components/feedback/ActivityFeed";

<ActivityFeed items={activityItems} title="Recent Activity" />;
```

## Design System

Design tokens are centralized in `src/utils/designTokens.ts`:

```typescript
export const COLORS = {
  PRIMARY: "#22819A",
  SECONDARY: "#90C2E7",
  BACKGROUND: "#FEF7F8",
  // ...
};

export const FONTS = {
  DISPLAY: "'Lora', Georgia, serif",
  BODY: "'Inter', 'system-ui', sans-serif",
};

export const SPACING = {
  XS: "8px",
  SM: "16px",
  MD: "24px",
  // ...
};
```

## Responsive Breakpoints

| Breakpoint | Width      | Device  |
| ---------- | ---------- | ------- |
| Mobile     | <768px     | Phone   |
| Tablet     | 768–1023px | Tablet  |
| Desktop    | ≥1024px    | Desktop |

## Animations

Framer Motion patterns:

```tsx
// Fade-up stagger on page load
const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 }
  }
}

// Hover scale
whileHover={{ scale: 1.02 }}
transition={{ duration: 0.4 }}
```

## Accessibility

- WCAG AA contrast ratios
- Semantic HTML (`<button>`, `<nav>`, `<article>`)
- Focus rings on interactive elements
- Keyboard navigation support
- Reduced motion preferences respected

## Performance

- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- Bundle size < 500KB (JS+CSS)

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm test             # Run tests
```

## License

MIT

## Documentation & Support

Please review the primary engineering documents:

- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** — Comprehensive state of the project, architecture, and roadmap.
- **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** — Strict API payload requirements and dynamic UI mapping.
- **[SETUP.md](./SETUP.md)** — Detailed development guide.

For other issues, please contact support@enlighted.co.in.

---

Built with ❤️ using React, Next.js, and the EnlightEd Tech Team
