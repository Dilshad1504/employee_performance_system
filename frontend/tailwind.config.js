/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#e0e7ff',
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
        },
        darkBg: '#0f172a',
        darkCard: '#1e293b',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
