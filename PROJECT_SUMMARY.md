# EnlightEd Dashboard — Comprehensive Project Overview

## 1. 🎯 Project Vision & Current State

**EnlightEd Dashboard** is a premium, production-ready SaaS analytics and learning platform. Built with React 18, Next.js 14, TailwindCSS, and Framer Motion, it focuses heavily on high-end aesthetics (glassmorphism, organic physics-based animations, and an academic typography suite).

**Current Status:** The frontend UI architecture is **100% structurally complete** and **hardened**. We have moved past the initial MVP phase. The codebase has been actively refactored to be defensively coded against backend failures, making it fully primed for live API integration.

---

## 2. 🛠️ What Has Been Built (Implemented Features)

We have successfully built a massive suite of features across multiple routes. 

### Core Architecture & UX
- **Academic Typography**: Replaced default tech fonts with **Lora** (Display/Serif) and **Inter** (Body/Sans-serif) for a prestigious, textbook-like reading experience.
- **Dark Mode Support**: Fully integrated class-based dark mode using `next-themes` with seamless transitions and a bespoke dark teal-and-gold color mapping that respects the brand system.
- **Defensive UI Rendering**: The entire application is protected by Optional Chaining (`?.`) and Nullish Coalescing (`??`). If the backend returns partial data, the UI will degrade gracefully instead of crashing.
- **Async Loading States**: Implemented highly polished Skeleton loaders (`animate-pulse`) across all pages to mask network latency during data fetching.
- **Strict React Keys**: Eradicated all `key={index}` anti-patterns. Every mapped list now relies on strict, unique entity IDs.

### Fully Developed Pages
1. **Dashboard (`/`)**: Admin-level overview containing top-level metrics, concept mastery progress bars, a recent assignments table, and a live sessions tracker.
2. **Performance Analytics (`/performance`)**: Deep-dive analytics featuring Recharts (Area/Radar charts) and an "AI Path Optimizer" recommendations engine.
3. **Assignments (`/assignments` & `/assignments/[id]`)**: A Kanban-style overview of Pending, In-Progress, and Graded coursework, coupled with a dynamic interactive Quiz Flow that pulls mocked questions based on the selected assignment.
4. **Leaderboard & Batches (`/batches`)**: Cohort tracking and competitive ranking tables.
5. **AI Doubt Assistant (`/ai-doubt-assistant`)**: A highly interactive chat interface designed to stream responses, complete with history and suggested topics.
6. **User Profile (`/profile`)**: A bespoke, two-column grid layout featuring a gradient cover banner, editable avatar, enrolled batch tags, and lifetime activity metrics.
7. **Authentication (`/login` & `/register`)**: Fully responsive, glassmorphic onboarding and registration flows featuring custom theme-adaptive logo integration.

---

## 3. 🚀 How to Run on Another Machine

If you are handing this project off to another developer or deploying to a new machine, follow these exact steps:

### Prerequisites
- **Node.js**: Version 18.17.0 or higher.
- **Git**: Installed and configured.

### Setup Instructions
1. **Clone or Transfer the Repository**
   ```bash
   git clone <repository_url>
   # OR extract the project ZIP file
   cd EnlightEd_dashboard
   ```
2. **Install Dependencies**
   *(Note: Do not delete `package-lock.json` to ensure version parity).*
   ```bash
   npm install
   ```
3. **Environment Variables**
   - Copy `.env.example` to `.env.local`.
   - Fill in any necessary secrets (currently not required for frontend-only dev).
4. **Start Development Server**
   ```bash
   npm run dev
   ```
   - Access the platform at `http://localhost:3000`.
5. **Build for Production**
   To verify the application compiles without TypeScript errors before deployment:
   ```bash
   npm run build
   npm start
   ```

---

## 4. 🧠 Things to Keep in Mind

If you are maintaining this codebase, observe the following rules and architectural decisions:

1. **The `.kiro/` Directory**: This contains `RULES.md` and `enlighted-design-system.md`. Any AI assistant or developer working on this project must abide by these strict styling and architectural guidelines.
2. **Tailwind Configurations**: Our `@tailwind` and `@apply` rules trigger false-positive warnings in standard IDEs. We have patched this locally via `.vscode/settings.json` (`"css.lint.unknownAtRules": "ignore"`).
3. **File Tracking Limitations**: 
   - `.env`, `.env.local`, and `.env.production` are strictly ignored in `.gitignore`.
   - The `openspec/` directory is also explicitly ignored by Git to protect proprietary specifications.
4. **No Magic Numbers**: Avoid arbitrary hex codes in components. Always use the Tailwind config aliases (e.g., `bg-primary`, `text-ink`, `bg-surface`).

---

## 5. 🏗️ What is Left (The Roadmap)

### Phase 3: Backend & API Integration
- Swap out the localized `fetchProfileData()` and `fetchDashboardData()` mock functions with real Axios/Fetch calls pointing to the backend.
- (Reference `BACKEND_INTEGRATION.md` for exact payload structures).

### Phase 4: Authentication Backend
- Implement a robust Auth layer (e.g., NextAuth.js or Clerk) and wire it up to the existing `/login` and `/register` frontend screens.
- Add Next.js Middleware to protect routes (e.g., redirecting unauthenticated users from `/profile` back to `/login`).

---

## 6. 🔧 Things to Fix Later (Tech Debt & Known Issues)

While the project is production-ready, here is a backlog of major and minor tasks for future sprints:

### Major Fixes
- **Database Schema Sync**: Ensure the backend database models perfectly align with our frontend TypeScript interfaces (e.g., `ProfileData`, `ActivityMetrics`).
- **Websocket Implementation**: The AI Doubt Assistant currently simulates chat. This needs to be hooked up to a real WebSocket or Server-Sent Events (SSE) stream for real-time LLM responses.

### Minor Fixes / Enhancements
- **Complete Profile Tabs**: In `/profile/page.tsx`, the *Achievements*, *Preferences*, and *Support & Help* tabs currently display an "Under Construction" empty state. These need bespoke UI layouts.
- **Centralize Mock Data**: Currently, mock data functions are defined inside the individual `page.tsx` files. Before replacing them with APIs, it would be cleaner to move all mocks into a dedicated `src/services/mockApi.ts` file to clean up the component files.
- **Componentize Skeletons**: The Skeleton UI loaders are currently hardcoded HTML blocks inside the `if (isLoading)` blocks. Refactoring these into reusable components (e.g., `<MetricSkeleton />`, `<ListSkeleton />`) will reduce code duplication.
- **Spring Animations**: Upgrade standard Framer Motion fade-ins to utilize `type: "spring"` physics for a more tactile, premium feel on hover and mount states.
