/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coral: '#FF5A35',
        gold: '#FFB300',
        cream: '#F5EDD8',
        green: '#2E7D52',
        dark: '#0B0B12',
        'night-card': '#13131F',
        'night-border': '#252535',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        sans: ['DM Sans', 'sans-serif'],
        unbounded: ['Unbounded', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
