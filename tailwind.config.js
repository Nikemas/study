/** @type {import('tailwindcss').Config} */
const withOpacity = (variable) => `rgb(var(${variable}) / <alpha-value>)`;

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: withOpacity('--color-bg'),
        surface: withOpacity('--color-surface'),
        primary: withOpacity('--color-primary'),
        accent: withOpacity('--color-accent'),
        text: withOpacity('--color-text'),
        muted: withOpacity('--color-muted'),
        border: withOpacity('--color-border'),
        success: withOpacity('--color-success'),
        warning: withOpacity('--color-warning'),
        danger: withOpacity('--color-danger')
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter Tight', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'card-hover': 'var(--shadow-card-hover)',
        'soft': 'var(--shadow-soft)',
        'glow': '0 0 24px rgba(255, 122, 0, 0.25)',
        'glow-sm': '0 0 14px rgba(255, 122, 0, 0.18)'
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)'
      },
      backdropBlur: {
        'xs': '2px',
        'xl': '24px',
      },
    },
  },
  plugins: [],
}
