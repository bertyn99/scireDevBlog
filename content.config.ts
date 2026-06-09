import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // ── Blog (existing, migrated to v3) ──
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

    // ── Courses ──
    courses: defineCollection({
      type: 'page',
      source: 'courses/*/index.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
        duration: z.number(), // minutes
        tags: z.array(z.string()).default([]),
        prerequisites: z.array(z.string()).default([]),
        published: z.boolean().default(false),
        order: z.number(),
        image: z.string().optional(),
      }),
    }),

    // ── Lessons ──
    lessons: defineCollection({
      type: 'page',
      source: 'courses/**/!(*index).md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        course: z.string(), // course slug
        order: z.number(), // lesson order within course
        duration: z.number().optional(), // minutes
        published: z.boolean().default(false),
        video: z.object({
          streamId: z.string().optional(),
          youtubeId: z.string().optional(),
          duration: z.string().optional(),
        }).optional(),
        audio: z.object({
          src: z.string(),
          duration: z.string(),
        }).optional(),
        transcript: z.string().optional(),
        exercises: z.array(z.discriminatedUnion('type', [
          // QCM
          z.object({
            type: z.literal('qcm'),
            id: z.string(),
            question: z.string(),
            options: z.array(z.string()),
            correct: z.number(),
            explanation: z.string().optional(),
            points: z.number().default(10),
            conceptTags: z.array(z.string()).default([]),
          }),
          // Graphical (CSS layout visual)
          z.object({
            type: z.literal('graphical'),
            id: z.string(),
            question: z.string(),
            image: z.string(),
            options: z.array(z.string()),
            correct: z.number(),
            explanation: z.string().optional(),
            points: z.number().default(10),
            conceptTags: z.array(z.string()).default([]),
          }),
          // Code Challenge
          z.object({
            type: z.literal('code_challenge'),
            id: z.string(),
            title: z.string().optional(),
            description: z.string().optional(),
            language: z.enum(['html-css', 'javascript', 'vue']).default('html-css'),
            starterFiles: z.record(z.string()).default({}),
            testSuite: z.string().optional(),
            assertions: z.array(z.string()).default([]),
            solution: z.record(z.string()).optional(),
            hints: z.array(z.string()).default([]),
            points: z.number().default(30),
            conceptTags: z.array(z.string()).default([]),
          }),
          // Open Question
          z.object({
            type: z.literal('open_question'),
            id: z.string(),
            question: z.string(),
            expectedKeywords: z.array(z.string()).default([]),
            modelAnswer: z.string().optional(),
            points: z.number().default(15),
            conceptTags: z.array(z.string()).default([]),
          }),
        ])).default([]),
      }),
    }),

    // ── Learning Paths ──
    paths: defineCollection({
      type: 'page',
      source: 'paths/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
        estimatedHours: z.number(),
        icon: z.string().optional(),
        published: z.boolean().default(false),
        stages: z.array(z.object({
          name: z.string(),
          description: z.string().optional(),
          courses: z.array(z.string()),
        })),
      }),
    }),

    // ── CMS data (hero config, etc.) ──
    components: defineCollection({
      type: 'data',
      source: 'components/**',
      schema: z.object({
        featured: z.array(z.string()).default([]),
      }),
    }),

    // ── Pages (homepage, about, etc.) ──
    content: defineCollection({
      type: 'page',
      source: '*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        navigation: z.union([z.boolean(), z.object({})]).optional(),
      }),
    }),
  },
})
