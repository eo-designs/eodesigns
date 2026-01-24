import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "eo-bg": "#f7fafc",
        "eo-card": "#ffffff",
        "eo-ink": "#0f172a",
        "eo-blue": "#2563eb",
        "eo-red": "#ef4444",
        "eo-green": "#22c55e",
        "eo-amber": "#f59e0b",
      },
      boxShadow: {
        glow: '0 15px 40px rgba(37, 99, 235, 0.12)',
        'soft': '0 8px 24px rgba(15, 23, 42, 0.08)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.9' },
          '50%': { opacity: '1' },
        },
        'matrix-scroll': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        pulse: 'pulse 3s ease-in-out infinite',
        'matrix-scroll': 'matrix-scroll 12s linear infinite',
      },
      animationDelay: {
        '5s': '5s',
        '10s': '10s',
        '15s': '15s',
      },
      backgroundImage: {
        'gradient-mesh': 'radial-gradient(circle at 20% 20%, rgba(37, 99, 235, 0.12) 0%, transparent 40%), radial-gradient(circle at 80% 40%, rgba(34, 197, 94, 0.12) 0%, transparent 40%), radial-gradient(circle at 60% 80%, rgba(239, 68, 68, 0.08) 0%, transparent 45%)',
      },
    },
  },
  plugins: [],
};
export default config;
