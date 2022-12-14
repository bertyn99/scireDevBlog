import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content-edge",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-schema-org",
    "@nuxt/image-edge",
  ],
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
    },
  },
  image: {
    // Options
  },
  schemaOrg: {
    defaultLanguage: "en-US",
    canonicalHost: "https://www.sciredev.com/",
  },
  content: {
    highlight: {
      theme: {
        // Default theme (same as single string)
        default: "material-palenight",
        // Theme used if `html.dark`
        dark: "github-dark",
      },
    },
    markdown: {
      remarkPlugins: ["remark-reading-time"],
    },
  },
  tailwindcss: {
    cssPath: "~/assets/css/main.css",
  },
  nitro: {
    prerender: {
      routes: ["/sitemap.xml"],
    },
  },
});
