import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@nuxt/content-edge", "@nuxtjs/tailwindcss"],
  content: {},
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
});
