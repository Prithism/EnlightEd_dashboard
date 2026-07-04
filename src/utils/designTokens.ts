// Design tokens extracted from EnlightEd design system
// Reference: .kiro/steering/enlighted-design-system.md

export const COLORS = {
  PRIMARY: '#22819A',        // Deep teal — primary buttons, links, active states
  SECONDARY: '#90C2E7',      // Soft sky blue — secondary accents, highlights
  BACKGROUND: '#FEF7F8',     // Warm near-white — page background base
  TEXT: '#13323A',           // Dark teal-black — primary text color
  MUTED: '#4F6C74',          // Muted grey-teal — secondary/supporting text
  ACCENT: '#C9972A',         // Warm gold — accent/highlight color
  
  // Supporting teal ramp
  TEAL_900: '#0F3342',
  TEAL_800: '#143742',
  TEAL_700: '#1D6072',
  TEAL_600: '#22819A',       // Same as PRIMARY
  TEAL_400: '#35A8C8',
  TEAL_200: '#90C2E7',       // Same as SECONDARY
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
  linear-gradient(180deg, #fff9fa, #fef7f8 40%, #fef7f8)
`

// Responsive padding scale
export const RESPONSIVE_PADDING = {
  MOBILE: '16px',
  TABLET: '24px',
  DESKTOP: '32px',
}

// Z-index scale
export const Z_INDEX = {
  DROPDOWN: 30,
  STICKY: 20,
  NAVBAR: 40,
  MODAL: 50,
  TOOLTIP: 60,
}

// Animation timings
export const ANIMATION = {
  DURATION_SHORT: 0.2,
  DURATION_BASE: 0.4,
  DURATION_LONG: 0.6,
  EASING_SPRING: [0.34, 1.56, 0.64, 1],
}
