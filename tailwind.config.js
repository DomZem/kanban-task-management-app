/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryPurple: 'var(--primaryPurple)',
        primaryPurpleHover: 'var(--primaryPurpleHover)',
        primaryBlack: 'var(--primaryBlack)',
        primaryDarkGrey: 'var(--primaryDarkGrey)',
        primaryLinesDark: 'var(--primaryLinesDark)',
        primaryMediumGrey: 'var(--primaryMediumGrey)',
        primaryLinesLight: 'var(--primaryLinesLight)',
        primaryLightGrey: 'var(--primaryLightGrey)',
        primaryWhite: 'var(--primaryWhite)',
        primaryRed: 'var(--primaryRed)',
        primaryRedHover: 'var(--primaryRedHover)',
        primaryVeryDarkGrey: 'var(--primaryVeryDarkGrey)',
      },
    },
  },
  plugins: [],
};