/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#818cf8',
          400: '#a5b4fc',
          500: '#818cf8',
          600: '#6366f1',
        },
        secondary: {
          DEFAULT: '#a78bfa',
          400: '#c4b5fd',
          500: '#a78bfa',
          600: '#9333ea',
        },
        background: '#050505',
        surface: {
          DEFAULT: '#0f0f0f',
          light: '#1a1a1a',
        },
        'glass-border': 'rgba(255, 255, 255, 0.08)',
        'glass-surface': 'rgba(20, 20, 20, 0.6)',
      },
      fontFamily: {
        display: ['Inter Tight', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 30px rgba(129, 140, 248, 0.15)',
        'glow-sm': '0 0 15px rgba(129, 140, 248, 0.1)',
        'glow-md': '0 0 20px rgba(129, 140, 248, 0.12)',
        'card-hover': '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
        'xl': '24px',
      },
    },
  },
  plugins: [],
}