const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.js', './src/**/*.jsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        Alfa: ['Alfa Slab One', 'cursive'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
