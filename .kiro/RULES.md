# Documentation & Development Rules

## Documentation Rules

These rules apply to every new page, feature, or module created in this project.

### 1. Do NOT create page-specific documentation

Never generate any of the following files for individual pages:
- `PAGE_reference.md`
- `PAGE_implementation.md`
- `PAGE_components.md`
- `PAGE_summary.md`
- `PAGE_REFERENCE.md`

There should only be **one global version** of each of these master documentation files in the project:
- `COMPONENTS_REFERENCE.md` — All components across all pages
- `IMPLEMENTATION_CHECKLIST.md` — All page implementation status
- `PROJECT_SUMMARY.md` — Overall project status and pages

❌ **DO NOT CREATE:**
- `MY_BATCHES_REFERENCE.md` ← Already exists, mistake from earlier
- `ASSIGNMENTS_REFERENCE.md` ← Already exists, mistake from earlier
- `BATCHES_COMPONENTS.md`
- `ASSIGNMENTS_IMPLEMENTATION.md`

✅ **DO UPDATE:**
- `COMPONENTS_REFERENCE.md` — Add new components here
- `IMPLEMENTATION_CHECKLIST.md` — Add new pages here
- `PROJECT_SUMMARY.md` — Update overall progress here

---

### 2. Update existing documentation instead

After completing any page or feature, update the master documentation files. **Do NOT create new files.**

#### `COMPONENTS_REFERENCE.md`
Append any **new reusable components** introduced by the page.

For each component include:
- Component name and location
- Purpose and features
- Props interface
- Usage example
- Status (✅ Ready)

**Do not duplicate** existing components. If an existing component is modified, update its existing entry instead of creating another entry.

**Example:**
```markdown
### `<MyNewComponent />`
**Location:** `src/components/folder/MyNewComponent.tsx`
**Purpose:** Description

**Features:**
- Feature 1
- Feature 2

**Props:**
```tsx
interface MyNewComponentProps {
  prop1: string
}
```

**Usage:**
```tsx
<MyNewComponent prop1="value" />
```
```

---

#### `IMPLEMENTATION_CHECKLIST.md`
Append the new page to the **"✅ Pages Implemented"** section.

Include:
- Page name and route (e.g., "Analytics (/analytics)")
- Location in codebase
- Status (✅ Complete)
- Components used
- Features implemented
- Responsive behavior

**Do NOT overwrite** previous entries. Simply append new pages.

**Example:**
```markdown
### Page 4: Analytics (/analytics)
**Location:** `src/app/analytics/page.tsx`
**Status:** ✅ Complete
**Components:** Chart, Button, Card, FilterChips
**Features:** Date range picker, 3 chart types, export buttons
**Responsive:** Mobile (1 col), Tablet (2 col), Desktop (3 col)
```

---

#### `PROJECT_SUMMARY.md`
Update the project documentation with the new page.

Include in relevant sections:
- **Features Implemented** — Any new component types or patterns
- **Pages** — New route and description
- **Component Inventory** — Updated count and table
- **Project Statistics** — Updated counts (Components, Pages, Lines of Code, etc.)
- **Pages Implemented** — New page details

Keep this document as the **single source of truth** for project status.

---

### 3. Consolidation of existing page-specific docs

The following page-specific documentation files exist from earlier work and should be ARCHIVED:
- `MY_BATCHES_REFERENCE.md` — Content merged into master docs
- `ASSIGNMENTS_REFERENCE.md` — Content merged into master docs
- `MY_BATCHES_IMPLEMENTATION.md` — Content merged into master docs

These can be kept for historical reference but should be marked as archived and not updated going forward.

---

### 4. Master files structure

Only these documentation files should exist at the root level:

```
enlighted-dashboard/
├── README.md                           # Project overview
├── SETUP.md                            # Development setup
├── RULES.md                            # This file (documentation rules)
├── COMPONENTS_REFERENCE.md             # ✅ Master: All components
├── IMPLEMENTATION_CHECKLIST.md         # ✅ Master: All pages & implementation status
├── PROJECT_SUMMARY.md                  # ✅ Master: Overall project status
├── COMPONENTS.md                       # (Alternative to COMPONENTS_REFERENCE.md)
├── TASKS.md                            # (If using spec-based workflow)
└── [ARCHIVED]
    ├── MY_BATCHES_REFERENCE.md
    ├── MY_BATCHES_IMPLEMENTATION.md
    ├── ASSIGNMENTS_REFERENCE.md
    └── other-page-specific-docs.md
```

---

## Development Rules

### 1. Component Reusability

All components must be:
- ✅ **Modular** — Self-contained with clear props
- ✅ **Reusable** — Used across multiple pages
- ✅ **Type-safe** — Full TypeScript interfaces
- ✅ **Documented** — Props and usage examples in COMPONENTS_REFERENCE.md
- ✅ **Styled consistently** — Uses EnlightEd design tokens only

---

### 2. Design System Compliance

Every component and page must:
- ✅ Use only colors from `designTokens.ts`
- ✅ Use Playfair Display (headings) and Poppins (body)
- ✅ Use 8px spacing grid
- ✅ Use only allowed border radius values (lg, xl, 2xl, 3xl, full)
- ✅ Use glass effect (no drop shadows)
- ✅ Use Framer Motion for animations (spring easing, 0.4s base)

❌ **Never:**
- Add arbitrary colors
- Use pure white or pure black
- Use box-shadow
- Create new border radius values
- Use custom fonts

---

### 3. Code Organization

```
src/
├── components/
│   ├── layout/           # Page layout (Sidebar, Navbar, Layout)
│   ├── common/           # Shared UI (Button, Card, Input, FilterChips)
│   ├── metrics/          # Metrics display (MetricCard)
│   ├── charts/           # Data viz (Chart)
│   ├── data/             # Data display (Table)
│   ├── feedback/         # Feedback (ActivityFeed)
│   ├── batch/            # Batch-specific (BatchCard, TimelineCard)
│   ├── assignment/       # Assignment-specific (AssignmentCard)
│   └── [feature]/        # Other feature-specific folders
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Dashboard (/)
│   ├── batches/
│   │   └── page.tsx      # /batches
│   ├── assignments/
│   │   └── page.tsx      # /assignments
│   └── [feature]/        # Other pages
├── hooks/                # Custom hooks
├── services/             # API, mock data
├── types/                # TypeScript definitions
├── utils/                # Utilities, design tokens
└── styles/               # Global CSS
```

---

### 4. Naming Conventions

#### Components
- **Format:** PascalCase
- **Example:** `BatchCard.tsx`, `FilterChips.tsx`, `AssignmentCard.tsx`
- **Props:** `ComponentNameProps` interface

#### Files
- **Components:** PascalCase (`MyComponent.tsx`)
- **Pages:** lowercase folder + `page.tsx` (`/batches/page.tsx`)
- **Types:** lowercase (`dashboard.ts`, `batch.ts`)
- **Utils/Hooks:** camelCase (`designTokens.ts`, `useDashboardData.ts`)

#### Routes
- **Format:** lowercase, kebab-case
- **Examples:** `/`, `/batches`, `/assignments`, `/analytics`, `/students`

---

### 5. When Adding a New Page

**DO THIS:**
1. ✅ Create page file: `src/app/[page]/page.tsx`
2. ✅ Add route to Sidebar navigation
3. ✅ Create any new reusable components in `src/components/[feature]/`
4. ✅ Use mock data for initial development
5. ✅ Test responsive behavior (mobile, tablet, desktop)
6. ✅ Update `IMPLEMENTATION_CHECKLIST.md` — Add to "Pages Implemented" section
7. ✅ Update `COMPONENTS_REFERENCE.md` — Add any new components
8. ✅ Update `PROJECT_SUMMARY.md` — Update statistics and features
9. ✅ Update `COMPONENTS_REFERENCE.md` component inventory table

**DO NOT DO THIS:**
1. ❌ Create `PAGE_REFERENCE.md`
2. ❌ Create `PAGE_IMPLEMENTATION.md`
3. ❌ Create page-specific documentation
4. ❌ Skip updating master documentation files
5. ❌ Add arbitrary colors or styles outside design tokens

---

### 6. When Adding a New Component

**DO THIS:**
1. ✅ Create component: `src/components/[category]/ComponentName.tsx`
2. ✅ Include TypeScript interface for props
3. ✅ Use Framer Motion for animations (if applicable)
4. ✅ Use design tokens for all colors/spacing
5. ✅ Add to `COMPONENTS_REFERENCE.md` with usage example
6. ✅ Indicate reusability (used across how many pages)
7. ✅ Update `PROJECT_SUMMARY.md` component inventory

**DO NOT DO THIS:**
1. ❌ Create component-specific documentation
2. ❌ Duplicate existing components
3. ❌ Use inline styles or arbitrary classes
4. ❌ Skip TypeScript types

---

## Git & Version Control

### Commit Messages

Use clear, descriptive commit messages:

```
feat: Add Assignments page with filtering
feat: Create FilterChips component
fix: Update Sidebar navigation links
docs: Update COMPONENTS_REFERENCE.md with new components
refactor: Consolidate documentation rules
```

### Branch Naming

```
feature/page-name          # New page
feature/component-name     # New component
fix/issue-description      # Bug fix
docs/documentation-update  # Documentation
```

---

## Testing Checklist for New Pages

Before marking a page as complete:

- ✅ Visual check — Page renders correctly
- ✅ Responsive — Test on mobile (375px), tablet (768px), desktop (1024px)
- ✅ Interactions — Hover effects, clicks, animations work
- ✅ Typography — Correct fonts (Playfair for h1-h3, Poppins for body)
- ✅ Colors — Only from design tokens
- ✅ Spacing — Uses 8px grid, gap-responsive utility
- ✅ Glass effect — Cards have backdrop-blur, white/20 border, white/5 bg
- ✅ Animations — Smooth, spring easing, reasonable duration (0.4s base)
- ✅ Empty states — Handled gracefully
- ✅ Accessibility — Focus rings, keyboard nav, semantic HTML

---

## Documentation Maintenance Schedule

**After each page completion:**
- Update `IMPLEMENTATION_CHECKLIST.md` (same day)
- Update `COMPONENTS_REFERENCE.md` (same day)
- Update `PROJECT_SUMMARY.md` (same day)

**Weekly review:**
- Check for stale documentation
- Verify component counts are accurate
- Ensure all pages are listed

**Monthly cleanup:**
- Archive any page-specific docs
- Consolidate duplicate information
- Update statistics

---

## Questions?

Refer to:
1. `README.md` — Project overview
2. `SETUP.md` — Development setup
3. `COMPONENTS_REFERENCE.md` — All available components
4. `IMPLEMENTATION_CHECKLIST.md` — Implementation status
5. `PROJECT_SUMMARY.md` — Overall project progress

---

**Last Updated:** July 4, 2026
**Version:** 1.0.0
**Status:** Active — All team members should follow these rules
