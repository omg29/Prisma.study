/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#0A0E1A',
        'deep-slate': '#1A1F2E',
        'teal-accent': '#06B6D4',
        'cyan-bright': '#22D3EE',
        'magenta': '#E879F9',
        'purple': '#A78BFA',
        'slate-blue': '#475569',
        'glass-white': 'rgba(255, 255, 255, 0.015)',
      },
      backdropBlur: {
        'prism': '24px',
        'glass': '16px',
      },
      animation: {
        'shimmer': 'shimmer 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 4s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%, 100%': { backgroundPosition: '-200% 0' },
          '50%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
