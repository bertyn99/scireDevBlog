import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "@nuxtjs/tailwindcss",
    "nuxt-icon",
    "@nuxt/image-edge",
    "@vueuse/nuxt",
    "@nuxtjs/web-vitals",
    "@unlighthouse/nuxt",
  ],
  extends: ["nuxt-seo-kit"],
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://www.sciredev.com/",
      titleSeparator: "|",
      trailingSlash: true,
      siteName: "ScireDev",
      siteDescription:
        "Welcome to scireDev the website that share with you the key to become a better developper. Come learn with us",
      language: "en-US", // prefer more explicit language codes like `en-AU` over `en`
    },
  },
  schemaOrg: {
    canonicalHost: "https://www.sciredev.com/",
  },
  image: {
    // Options
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
