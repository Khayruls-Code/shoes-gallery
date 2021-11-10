module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      primary_bg: "#c70039",
      seconDary_bg: "#efefef",
      white: "#fff"
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
