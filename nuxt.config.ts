import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "nuxt-schema-org",
    "@nuxt/image-edge",
    "@vueuse/nuxt",
    "@nuxtjs/web-vitals",
    "@unlighthouse/nuxt",
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
  plugins: [{ src: "~/plugins/vercel.js", mode: "client" }],
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
