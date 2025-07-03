/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html", "./public/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'ios-header-in': {
          from: { opacity: '0', transform: 'translateY(-8px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        },
        'android-header-in': {
          from: { opacity: '0', transform: 'translateY(-4px)' },
          to: { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        'ios-header-in': 'ios-header-in 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
        'android-header-in': 'android-header-in 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
    colors: {
      primary: {
        DEFAULT: 'var(--color-primary)',
        dark: 'var(--color-primary-dark)',
        light: 'var(--color-primary-light)',
      },
      gray: {
        50: 'var(--color-gray-50)',
        100: 'var(--color-gray-100)',
        600: 'var(--color-gray-600)',
        700: 'var(--color-gray-700)',
        900: 'var(--color-gray-900)',
      },
      info: 'var(--color-info)',
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      error: 'var(--color-error)',
    },
    backgroundImage: {
      'purple-glow': 'var(--gradient-purple-glow)',
    },
    fontFamily: {
      sans: ['Inter', 'Roboto', 'sans-serif'],
    },
    screens: {
      'mobile-and-tablet': 'var(--breakpoint-mobile-and-tablet)',
      'desktop': 'var(--breakpoint-desktop)',
      'desktop-and-tablet': 'var(--breakpoint-desktop-and-tablet)',
      'desktop-and-mobile': 'var(--breakpoint-desktop-and-mobile)',
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};