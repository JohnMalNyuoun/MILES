/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand
        'primary': 'rgb(var(--green-primary-rgb) / <alpha-value>)',
        'on-primary': 'rgb(var(--text-on-green-rgb) / <alpha-value>)',
        'primary-container': 'rgb(var(--green-mint-rgb) / <alpha-value>)',
        'on-primary-container': 'rgb(var(--green-deep-rgb) / <alpha-value>)',
        'primary-fixed': 'rgb(var(--green-mint-rgb) / <alpha-value>)',
        'primary-fixed-dim': 'rgb(var(--green-mint-rgb) / <alpha-value>)',
        'on-primary-fixed': 'rgb(var(--green-deep-rgb) / <alpha-value>)',
        'on-primary-fixed-variant': 'rgb(var(--green-deep-rgb) / <alpha-value>)',
        'inverse-primary': 'rgb(var(--green-deep-rgb) / <alpha-value>)',
        'surface-tint': 'rgb(var(--green-deep-rgb) / <alpha-value>)',

        // Backgrounds / surfaces
        'background': 'rgb(var(--bg-base-rgb) / <alpha-value>)',
        'surface': 'rgb(var(--bg-base-rgb) / <alpha-value>)',
        'surface-dim': 'rgb(var(--bg-base-rgb) / <alpha-value>)',
        'surface-bright': 'rgb(var(--bg-section-alt-rgb) / <alpha-value>)',
        'surface-container-lowest': 'rgb(var(--bg-base-rgb) / <alpha-value>)',
        'surface-container-low': 'rgb(var(--bg-surface-rgb) / <alpha-value>)',
        'surface-container': 'rgb(var(--bg-card-rgb) / <alpha-value>)',
        'surface-container-high': 'rgb(var(--bg-section-alt-rgb) / <alpha-value>)',
        'surface-container-highest': 'rgb(var(--bg-section-alt-rgb) / <alpha-value>)',
        'surface-variant': 'rgb(var(--bg-section-alt-rgb) / <alpha-value>)',

        // Text on surfaces
        'on-background': 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        'on-surface': 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        'on-surface-variant': 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
        'inverse-surface': 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        'inverse-on-surface': 'rgb(var(--bg-base-rgb) / <alpha-value>)',

        // Outlines
        'outline': 'rgb(var(--border-color-rgb) / <alpha-value>)',
        'outline-variant': 'rgb(var(--border-color-rgb) / <alpha-value>)',

        // Secondary / tertiary (neutral text roles)
        'secondary': 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
        'on-secondary': 'rgb(var(--bg-base-rgb) / <alpha-value>)',
        'secondary-container': 'rgb(var(--bg-section-alt-rgb) / <alpha-value>)',
        'on-secondary-container': 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        'secondary-fixed': 'rgb(var(--bg-section-alt-rgb) / <alpha-value>)',
        'secondary-fixed-dim': 'rgb(var(--bg-section-alt-rgb) / <alpha-value>)',
        'on-secondary-fixed': 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        'on-secondary-fixed-variant': 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
        'tertiary': 'rgb(var(--text-secondary-rgb) / <alpha-value>)',
        'on-tertiary': 'rgb(var(--bg-base-rgb) / <alpha-value>)',
        'tertiary-container': 'rgb(var(--bg-section-alt-rgb) / <alpha-value>)',
        'on-tertiary-container': 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        'tertiary-fixed': 'rgb(var(--bg-section-alt-rgb) / <alpha-value>)',
        'tertiary-fixed-dim': 'rgb(var(--bg-section-alt-rgb) / <alpha-value>)',
        'on-tertiary-fixed': 'rgb(var(--text-primary-rgb) / <alpha-value>)',
        'on-tertiary-fixed-variant': 'rgb(var(--text-secondary-rgb) / <alpha-value>)',

        // Errors (kept fixed)
        'error': '#b3261e',
        'on-error': '#ffffff',
        'error-container': '#f9dedc',
        'on-error-container': '#410e0b',
      },
      spacing: {
        'container-max': '1280px',
        'margin-mobile': '16px',
        'margin-desktop': '40px',
        'gutter': '24px',
        'unit': '4px',
        'section-padding': '80px',
      },
      maxWidth: {
        'container-max': '1280px',
      },
      fontFamily: {
        'display-lg': ['Manrope', 'sans-serif'],
        'body-lg': ['Manrope', 'sans-serif'],
        'label-sm': ['Manrope', 'sans-serif'],
        'body-md': ['Manrope', 'sans-serif'],
        'headline-lg-mobile': ['Manrope', 'sans-serif'],
        'headline-md': ['Manrope', 'sans-serif'],
        'headline-lg': ['Manrope', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '800' }],
        'body-lg': ['18px', { lineHeight: '28px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'label-sm': ['14px', { lineHeight: '20px', letterSpacing: '0.05em', fontWeight: '600' }],
        'label-md': ['13px', { lineHeight: '18px', letterSpacing: '0.08em', fontWeight: '600' }],
        'body-md': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'headline-lg-mobile': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'headline-md': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'headline-lg': ['32px', { lineHeight: '40px', fontWeight: '700' }],
        'title-lg': ['18px', { lineHeight: '26px', fontWeight: '600' }],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}

