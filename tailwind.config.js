/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      colors: {
        coral: '#FF5A35',
        gold: '#FFB300',
        cream: '#F5EDD8',
        dark: '#0B0B12',
        'night-card': '#13131F',
        'night-border': '#252535',
        mar: 'var(--mar)',
        crema: 'var(--crema)',
        nero: 'var(--nero)',
        verde: 'var(--verde)',
        celeste: 'var(--celeste)',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
        unbounded: ['var(--font-unbounded)', 'sans-serif'],
        caveat: ['var(--font-caveat)', 'cursive'],
        grotesk: ['var(--font-grotesk)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
