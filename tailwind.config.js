/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#100F0E',
        char: '#1C1A18',
        graphite: '#3A3632',
        stone: '#8A8178',
        mist: '#B9B1A6',
        sand: '#D8CFC2',
        ivory: '#EFE9DF',
        cream: '#F7F4EE',
        paper: '#FCFAF6',
        bronze: '#A8804C',
        bronzeLight: '#C39A63',
        wood: '#7A5A3C',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        ultra: '0.32em',
        wider2: '0.22em',
      },
      transitionTimingFunction: {
        lux: 'cubic-bezier(0.16, 1, 0.3, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      maxWidth: {
        edge: '1680px',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1.18)' },
        },
      },
      animation: {
        marquee: 'marquee 42s linear infinite',
        kenburns: 'kenburns 22s ease-out forwards',
      },
    },
  },
  plugins: [],
}
