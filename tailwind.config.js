/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        amber: {
          50:  '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        terracotta: {
          50:  '#FEF0EB',
          100: '#FDDCCE',
          500: '#EA580C',
          600: '#C2410C',
          700: '#9A3412',
          800: '#7C2D12',
        },
        sage: {
          50:  '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          400: '#4ADE80',
          600: '#4D7C0F',
          700: '#365314',
          800: '#1A2E05',
        },
        cream: '#FFFBEB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
