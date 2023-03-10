module.exports = {
  mode: 'jit',
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'], // remove unused styles in production
  darkMode: 'media', // or 'media' or 'class'
  plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  theme: {
  extend: {
    fontFamily: {
      HitNRun: ["HitNRun", "sans-serif"],
      Goofley: ["Goofley", "cursive"],
     }
  }
},
  variants: {
    extend: {},
  },
  plugins: [],
}
