/**
 * Site color system — only these 3 brand colors (plus tints/shades):
 * 1. Purple — #7C3AED  (actions, accents, links)
 * 2. Ink    — #1E1B4B  (text, dark panels)
 * 3. White  — #FFFFFF  (surfaces; soft page bg is a purple-tinted off-white)
 */
export const brandColors = {
  purple: '#7c3aed',
  ink: '#1e1b4b',
  white: '#ffffff',
} as const

export const theme = {
  colors: {
    /* Brand triad */
    purple: brandColors.purple,
    navy: brandColors.ink,
    white: brandColors.white,

    /* Semantic aliases (all derived from the triad) */
    primary: brandColors.purple,
    primaryHover: '#6d28d9',
    primarySoft: '#f5f3ff',
    primaryMuted: '#c4b5fd',

    ink: brandColors.ink,
    text: brandColors.ink,
    textMuted: '#6b7280',
    textOnDark: brandColors.white,
    textOnDarkMuted: 'rgba(255, 255, 255, 0.75)',

    background: '#faf8ff',
    surface: brandColors.white,
    elevated: '#f3f0ff',
    border: '#e9e4f5',

    error: '#dc2626',
    success: '#16a34a',
  },
  fonts: {
    heading: "'Plus Jakarta Sans', sans-serif",
    body: "'Plus Jakarta Sans', sans-serif",
    mono: "'IBM Plex Mono', monospace",
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': 'clamp(2.5rem, 5.5vw, 3.75rem)',
    '6xl': 'clamp(2.75rem, 6vw, 4.25rem)',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  space: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4.5rem',
    '4xl': '6rem',
  },
  radii: {
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(30, 27, 75, 0.05)',
    md: '0 10px 30px rgba(30, 27, 75, 0.08)',
    lg: '0 20px 50px rgba(124, 58, 237, 0.12)',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
  transitions: {
    fast: '150ms ease',
    normal: '250ms ease',
    slow: '600ms cubic-bezier(0.22, 1, 0.36, 1)',
  },
} as const

export type Theme = typeof theme
