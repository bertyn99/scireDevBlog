import type { Config } from "tailwindcss";

export default <Partial<Config>>{
  content: [],
  theme: {
    extend: {
      colors: {
        /*   primary: { default: "#D9D9D9", darken: "#A6A6A6" },
        secondary: "#262626", */
        tertiary: {
          default: "#F23005",
          darken: "#D93D1A",
        },
        aspectRatio: {
          "9/14": "9 / 14",
        },
      },
      screens: {
        xs: "450",
      },
    },
  },
};
