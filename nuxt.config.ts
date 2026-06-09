// nuxt.config.ts — Nuxt 4 + Nitro v2
// https://nuxt.com/docs/getting-started/configuration

export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxthub/core',
    '@nuxt/content',
    'nuxt-studio',
    '@nuxt/ui',
    '@nuxtjs/seo',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/devtools',
    '@nuxt/icon',
    '@nuxt/eslint',
    'evlog/nuxt',
  ],

  // NuxtHub — Cloudflare bindings (D1, R2, KV, Cache)
  hub: {
    database: true,
    blob: true,
    kv: true,
    cache: true,
  },

  // Nuxt Studio — visual CMS with R2 external media
  studio: {
    media: {
      external: true,
    },
  },

  // Site config (@nuxtjs/seo v5)
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.sciredev.com',
    name: 'ScireDev',
    description: 'Learn frontend and full-stack development with interactive courses, adaptive exercises, and build-along projects.',
    defaultLocale: 'en-US',
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'ScireDev',
      url: 'https://www.sciredev.com',
      logo: 'https://www.sciredev.com/img/scire_logo_primary.png',
    },
  },

  image: {
    domains: ['www.sciredev.com'],
  },

  ui: {},

  icon: {
    serverBundle: {
      collections: ['uil', 'mdi', 'bxl', 'heroicons'],
    },
  },

  content: {
    documentDriven: true,
    highlight: {
      theme: {
        default: 'material-theme-palenight',
        dark: 'github-dark',
      },
    },
    markdown: {
      remarkPlugins: ['remark-reading-time'],
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/blog/**': { isr: 3600, swr: true },
    '/courses': { isr: 300, swr: true },
    '/courses/**': { isr: 60, swr: true },
    '/api/**': { cache: false },
    '/admin/**': { ssr: false },
    '/auth/**': { ssr: false },
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://www.sciredev.com',
    },
    sessionPassword: '',
    githubClientId: '',
    githubClientSecret: '',
    betterAuthSecret: '',
    seoProKey: '',
  },

  // Structured logging with evlog
  evlog: {
    env: {
      service: 'sciredev',
    },
    // Only log API routes to reduce noise
    include: ['/api/**'],
  },

  devtools: { enabled: true },

  compatibilityDate: '2025-06-01',
})
