import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        navigation: z.union([z.boolean(), z.object({})]).optional(),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        author: z.string(),
        category: z.string(),
        createdAt: z.string(),
        modifiedAt: z.string().optional(),
        tags: z.array(z.string()).default([]),
      }),
    }),
  },
})
