/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './dist/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // for custom colors, keep them here.
      }
    }
  },
  plugins: [],
}