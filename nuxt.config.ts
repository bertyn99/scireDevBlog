import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content-edge", "@nuxtjs/tailwindcss"],
  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "material-palenight",
        // Theme used if `html.dark`
        dark: "github-dark",
      },
    },
  },
  build:{
    transpile: ["@heroicons/vue"],
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
});
