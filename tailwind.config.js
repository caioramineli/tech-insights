/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,jsx}"],
  theme: {
    extend: {
      screens: {
        'sm': '601px',   // Define o 'sm' para 480px
        'md': '851px',   // Define o 'md' para 768px
        'lg': '1001px',  // Define o 'lg' para 1024px
        'xl': '1201px',  // Define o 'xl' para 1280px
        '2xl': '1501px', // Define o '2xl' para 1536px
      },
    },
  },
  plugins: [],
}

