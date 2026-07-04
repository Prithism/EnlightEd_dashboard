# Design System Prompt — EnlightEd Theme

Use this as the visual foundation for any components, pages, or UI you generate. Apply these tokens consistently. Do not introduce new colors, fonts, or border-radius values outside what's defined here.

## Brand feel

A teal-and-warm-white palette with a serif/sans typography split: Playfair Display for headlines gives an editorial, slightly premium tone, while Poppins handles all body and UI text for clean readability. The background is never flat — a warm near-white base carries two soft, low-opacity color blooms. Depth comes from blur, not shadow.

## Design tokens

```css
/* ============================================================
   Design tokens extracted from EnlightEd (enlighted.co.in)
   Pulled directly from their compiled Tailwind stylesheet —
   not estimated. Drop this file into another project and
   import it, or copy the variables into an existing :root.
   ============================================================ */

:root {
  /* --- Core brand colors (named tokens used site-wide) --- */
  --color-primary: #22819a;   /* deep teal — primary buttons, links, active states */
  --color-secondary: #90c2e7; /* soft sky blue — secondary accents, highlights */
  --color-bg: #fef7f8;        /* warm near-white — page background base, NOT pure white */
  --color-ink: #13323a;       /* dark teal-black — primary text color, NOT pure black */
  --color-muted: #4f6c74;     /* muted grey-teal — secondary/supporting text */
  --color-gold: #c9972a;      /* warm gold — accent/highlight color */

  /* --- Supporting teal ramp (found in gradient utilities,
         not named individually in source, but real values) --- */
  --teal-900: #0f3342;
  --teal-800: #143742;
  --teal-700: #1d6072;
  --teal-600: #22819a; /* same as --color-primary */
  --teal-400: #35a8c8;
  --teal-200: #90c2e7; /* same as --color-secondary */

  /* --- Typography --- */
  /* Both are free Google Fonts: fonts.google.com/specimen/Poppins
     and fonts.google.com/specimen/Playfair+Display */
  --font-body: "Poppins", "Inter", sans-serif;       /* UI text, paragraphs, nav, buttons */
  --font-display: "Playfair Display", Georgia, serif; /* headings / hero copy only */
  --font-weight-body-regular: 400;
  --font-weight-body-medium: 500;
  --font-weight-body-semibold: 600;
  --font-weight-display: 700; /* Playfair is only loaded at 700 on this site */

  /* --- Border radius scale (standard Tailwind values, confirmed in use) --- */
  --radius-lg: 0.5rem;   /* 8px  — inputs, small chips */
  --radius-xl: 0.75rem;  /* 12px — buttons, small cards */
  --radius-2xl: 1rem;    /* 16px — feature cards */
  --radius-3xl: 1.5rem;  /* 24px — large hero panels */
  --radius-full: 9999px; /* pills, avatars, badges */
}

/* ============================================================
   Base page treatment
   This site does NOT use a flat background or drop shadows.
   Depth comes from layered low-opacity radial gradients and
   backdrop-blur, not box-shadow. Reproduce both for a faithful
   copy — most "AI EdTech" clones miss this and look flatter.
   ============================================================ */

body {
  background-color: var(--color-bg);
  color: var(--color-ink);
  font-family: var(--font-body);
  line-height: 1.5;
  /* two soft color blooms in opposite corners over a warm gradient base */
  background-image:
    radial-gradient(circle at 10% 10%, rgba(144, 194, 231, 0.24) 0, transparent 35%),
    radial-gradient(circle at 80% 0%, rgba(34, 129, 154, 0.16) 0, transparent 42%),
    linear-gradient(180deg, #fff9fa, var(--color-bg) 40%, var(--color-bg));
}

h1, h2, h3, .display-text {
  font-family: var(--font-display);
  font-weight: var(--font-weight-display);
}

/* Elevation pattern used instead of box-shadow */
.glass-surface {
  backdrop-filter: blur(24px); /* matches .backdrop-blur-xl on source site */
}

/* ============================================================
   Optional: Tailwind config extension
   If the target project also uses Tailwind, drop this into
   tailwind.config.js under theme.extend instead of using the
   CSS variables above directly.
   ============================================================ */

/*
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: "#22819A",
        secondary: "#90C2E7",
        bg: "#FEF7F8",
        ink: "#13323A",
        muted: "#4F6C74",
        gold: "#C9972A",
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
};
*/
```

## Usage rules

- Use `--color-primary` for primary buttons, active nav states, and key interactive elements.
- Use `--color-secondary` for secondary accents and hover highlights — never as the dominant color of a whole section.
- Use `--color-gold` sparingly, only for genuine highlights (badges, achievements, premium indicators). It's an accent, not a base color.
- Background is always `--color-bg` or the full gradient treatment defined in `body{}`. Never use pure white (`#fff`) or pure black (`#000`) anywhere in the UI — this theme deliberately avoids both.
- Body text color is always `--color-ink`, not pure black.
- All headings (`h1`–`h3`) use `--font-display` (Playfair Display). Everything else — paragraphs, buttons, nav, labels, form fields — uses `--font-body` (Poppins).
- Border radius comes only from the defined scale (`--radius-lg` through `--radius-full`). Don't invent arbitrary radius values.
- Do not use `box-shadow` for elevation. Use `backdrop-filter: blur()` or layered low-opacity gradients instead, matching `.glass-surface` and the `body{}` background pattern.
- For gradients or hover-state color variations, pull from the supporting teal ramp (`--teal-900` through `--teal-200`) rather than inventing new teal shades.

## Optional brand motif

The source site scatters mathematical/scientific symbols (Σ, π, ∫, √, ∞, Δ, λ, H₂O, E=mc², ∂, φ, ⚛, ∇, θ) as subtle decorative background elements, reinforcing an academic/STEM identity. Include this only if replicating the EnlightEd brand specifically — it's not required for general reuse of the palette and typography.
