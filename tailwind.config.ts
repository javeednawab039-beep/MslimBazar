import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#2563EB',
          blueDark: '#1D4ED8',
          navy: '#0F172A',
          gold: '#F59E0B',
          bg: '#F8FAFC',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 4px 24px -6px rgba(15,23,42,0.08)',
        lift: '0 20px 40px -12px rgba(37,99,235,0.25)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      keyframes: {
        floatSlow: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        floatSlow: 'floatSlow 6s ease-in-out infinite',
        fadeUp: 'fadeUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
