/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        primary: { default: "#D9D9D9", darken: "#A6A6A6" },
        secondary: "#262626",
        tertiary: {
          default: "#F23005",
          darken: "#D93D1A",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
