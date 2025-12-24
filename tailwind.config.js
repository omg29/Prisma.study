/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-black': "#050505",
        'prism-cyan': "#22D3EE",
        'prism-purple': "#A855F7",
        'glass-white': "rgba(255, 255, 255, 0.05)",
      },
      backdropBlur: {
        'prism': "24px",
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
