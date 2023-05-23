/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      display: ['lato', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI'],
    },
    animation: {
      shake: 'shake 0.75s cubic-bezier(.36,.07, .19, .97) both infinite',
    },
    keyframes: {
      shake: {
        '10%,90%': {
          transform: 'translate3d(-2px, 0,0)',
        },
        '20%,80%': {
          transform: 'translate3d(2px, 0,0)',
        },
        '30%,50%, 70%': {
          transform: 'translate3d(-4px, 0,0)',
        },
        '40%,60%': {
          transform: 'translate3d(4px, 0,0)',
        },
      },
    },
    fontWeight: {
      bold: 900,
    },
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
