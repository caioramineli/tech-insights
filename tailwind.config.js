/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '601px',
        'md': '851px',
        'lg': '1001px',
        'xl': '1201px',
        '2xl': '1501px',
      },
    },
  },
  plugins: [],
}

