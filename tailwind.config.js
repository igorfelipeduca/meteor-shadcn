const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./imports/ui/**/*.{js,jsx,ts,tsx}", "./client/*.html"],
  plugins: [require("tailwindcss-animate")],
};
