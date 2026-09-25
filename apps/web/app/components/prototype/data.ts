export const COURSES = [
  {
    slug: 'javascript-foundations',
    title: 'JavaScript Foundations',
    track: 'JavaScript',
    level: 'Beginner',
    hours: 12,
    lessons: 28,
  },
  {
    slug: 'vue-fundamentals',
    title: 'Vue Fundamentals',
    track: 'Vue',
    level: 'Beginner',
    hours: 10,
    lessons: 24,
  },
  {
    slug: 'nuxt-in-practice',
    title: 'Nuxt in Practice',
    track: 'Nuxt',
    level: 'Intermediate',
    hours: 18,
    lessons: 32,
  },
  {
    slug: 'async-javascript',
    title: 'Async JavaScript',
    track: 'JavaScript',
    level: 'Intermediate',
    hours: 8,
    lessons: 16,
  },
] as const

export const FILTERS = ['All', 'JavaScript', 'Vue', 'Nuxt', 'Beginner', 'Intermediate'] as const

export const VUE_LESSONS = [
  { n: 1, title: 'What Vue is for', minutes: 18, done: true },
  { n: 2, title: 'Reactivity with ref', minutes: 24, done: true, current: true },
  { n: 3, title: 'Computed and watch', minutes: 22, done: false },
  { n: 4, title: 'Templates and directives', minutes: 20, done: false },
  { n: 5, title: 'Components and props', minutes: 28, done: false },
  { n: 6, title: 'Emits and v-model', minutes: 26, done: false },
]

export const PATH_STAGES = [
  {
    name: 'JavaScript',
    hours: 35,
    courses: ['JavaScript Foundations', 'Async JavaScript'],
  },
  {
    name: 'The platform',
    hours: 20,
    courses: ['HTML semantics', 'DOM manipulation'],
  },
  {
    name: 'Vue',
    hours: 30,
    courses: ['Vue Fundamentals', 'Vue components'],
  },
]
