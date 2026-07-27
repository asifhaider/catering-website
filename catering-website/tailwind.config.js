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
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f5dab0',
          300: '#eec07f',
          400: '#e6a04c',
          500: '#df832a',
          600: '#c9681f',
          700: '#a74f1b',
          800: '#86401c',
          900: '#6d3519',
          950: '#3b190a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
