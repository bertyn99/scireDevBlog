import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxt/content",
    "nuxt-schema-org",
    "@nuxtjs/tailwindcss",
    "@nuxthq/studio",
    "@nuxtjs/plausible",
    "@nuxtjs/partytown",
    "nuxt-icon",
    "@nuxt/image",
    "@vueuse/nuxt",
    /*     "@nuxtjs/web-vitals", */
    "@nuxt/devtools",
    "@unlighthouse/nuxt",
  ],

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || "https://www.sciredev.com/",
      titleSeparator: "|",
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
    domains: ["www.sciredev.com"],
  },
  plausible: {
    domain: "www.sciredev.com",
    apiHost: "https://analytics.bertynboulikou.com",
  },
  plugins: [],
  content: {
    highlight: {
      /*     theme: {
        // Default theme (same as single string)
        default: "material-palenight",
        // Theme used if `html.dark`
        dark: "github-dark",
      }, */
    },
    markdown: {
      remarkPlugins: ["remark-reading-time"],
    },
  },
  devtools: {
    // Enable devtools (default: true)
    enabled: true,
    // VS Code Server options
    vscode: {},
    // ...other options
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
