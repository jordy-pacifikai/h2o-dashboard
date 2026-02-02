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
        // Light theme base
        background: '#F5F5F7',
        surface: '#FFFFFF',
        'surface-hover': '#FAFAFA',
        border: '#E5E5E7',
        'border-light': '#F0F0F2',

        // Text
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B6B6B',
        'text-muted': '#9CA3AF',

        // Accent - Lime/Chartreuse
        accent: '#C6F432',
        'accent-hover': '#B8E62E',
        'accent-light': '#E8FFA8',
        'accent-dark': '#9BC201',

        // H2O Brand
        h2o: {
          primary: '#0077B6',
          secondary: '#00B4D8',
          light: '#90E0EF',
          energy: '#C6F432',
        },

        // Status
        success: '#22C55E',
        'success-light': '#DCFCE7',
        warning: '#F59E0B',
        'warning-light': '#FEF3C7',
        error: '#EF4444',
        'error-light': '#FEE2E2',
        info: '#3B82F6',
        'info-light': '#DBEAFE',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.08)',
        'xl': '0 16px 48px rgba(0, 0, 0, 0.1)',
        'accent': '0 4px 12px rgba(198, 244, 50, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(198, 244, 50, 0.4)' },
          '50%': { boxShadow: '0 0 20px 4px rgba(198, 244, 50, 0.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
