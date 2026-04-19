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
          50:  '#fdf8f3',
          100: '#f5e6d3',
          200: '#e8c9a0',
          300: '#d4a574',
          400: '#c08040',
          500: '#8B5E3C',
          600: '#6B4226',
          700: '#4A2D1A',
          800: '#2D1A0E',
          900: '#1A0F08',
        },
        beige: {
          50:  '#FEFCF8',
          100: '#F9F3E8',
          200: '#F0E4CC',
          300: '#E3CFA8',
          400: '#CEB07A',
          500: '#B8915A',
          600: '#8B6B3D',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}