/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridRow: {
         'span-3': 'span 3 / span 3',
              },

      colors: {
                bck: '#ffffff',
              }
    },
  },
  plugins: [],
}
