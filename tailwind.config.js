/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primaryPurple: 'var(--primaryPurple)',
        primaryPurpleHover: 'var(--primaryPurpleHover)',
        primaryLightPurple: 'var(--primaryLightPurple)',
        primaryLightPurpleHover: 'var(--primaryLightPurpleHover)',
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
        primaryBorder: 'var(--primaryBorder)',
      },
      boxShadow: {
        task: '0px 4px 6px 0px rgba(54, 78, 126, 0.10);',
        elipsisMenu: '0px 10px 20px 0px rgba(54, 78, 126, 0.25);',
      },
    },
  },
  plugins: [],
};
