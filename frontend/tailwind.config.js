/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        glass: {
          white: '#ffffff',
          'white-90': 'rgba(255, 255, 255, 0.9)',
          'white-80': 'rgba(255, 255, 255, 0.8)',
          'white-70': 'rgba(255, 255, 255, 0.7)',
          'white-50': 'rgba(255, 255, 255, 0.5)',
          'white-30': 'rgba(255, 255, 255, 0.3)',
          'white-20': 'rgba(255, 255, 255, 0.2)',
          'white-10': 'rgba(255, 255, 255, 0.1)',
          blue: '#2563EB',
          'blue-glow': 'rgba(37, 99, 235, 0.4)',
          'blue-light': '#3B82F6',
          'blue-dark': '#1E40AF',
          accent: '#2563EB',
          'accent-soft': 'rgba(37, 99, 235, 0.2)',
        },
        dark: {
          bg: '#FFFFFF',
          surface: '#F3F4F6',
          'surface-strong': '#E5E7EB',
        },
      },
      fontFamily: {
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        jetbrains: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'gradient': 'gradient 15s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'border-flow': 'borderFlow 3s ease infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'background-shift': 'backgroundShift 20s ease infinite',
        'reveal-text': 'revealText 0.8s ease forwards',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-30px) rotate(5deg)' },
        },
        borderFlow: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        morph: {
          '0%, 100%': {
            'border-radius': '30% 70% 70% 30% / 30% 30% 70% 70%'
          },
          '25%': {
            'border-radius': '58% 42% 75% 25% / 76% 46% 54% 24%'
          },
          '50%': {
            'border-radius': '50% 50% 33% 67% / 55% 27% 73% 45%'
          },
          '75%': {
            'border-radius': '33% 67% 58% 42% / 63% 68% 32% 37%'
          },
        },
        backgroundShift: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        revealText: {
          'to': { transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
