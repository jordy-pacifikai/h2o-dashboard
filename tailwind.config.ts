import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        h2o: {
          primary: '#0077B6',
          secondary: '#00B4D8',
          accent: '#90E0EF',
          dark: '#03045E',
          light: '#CAF0F8',
        },
        background: '#0a0a0a',
        surface: '#1a1a1a',
        'surface-hover': '#252525',
        border: '#2a2a2a',
        text: '#ffffff',
        'text-muted': '#a0a0a0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '12px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-glow': 'pulseGlow 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 119, 182, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 119, 182, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
