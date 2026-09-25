<script setup lang="ts">
import type { Collections } from '@nuxt/content'

definePageMeta({
  // ISR + SWR per routeRules; no auth required for the catalog itself
})

const site = useSiteConfig()

// ── Fetch all courses, ordered by their `order` field ──
const { data: courses } = await useAsyncData('courses-catalog', () =>
  queryCollection('courses').order('order', 'ASC').all(),
)

// ── Fetch lesson counts per course (single query, grouped in-memory) ──
const { data: lessonCounts } = await useAsyncData('courses-lesson-counts', async () => {
  const lessons = await queryCollection('lessons').select('course', 'published').all()
  const counts: Record<string, number> = {}
  for (const l of lessons) {
    if (l.course) counts[l.course] = (counts[l.course] ?? 0) + 1
  }
  return counts
})

// ── Auth + progress (fetched ONLY for logged-in users) ──
const { loggedIn } = useUserSession()

interface CourseProgress {
  courseSlug: string
  status: string
  completedLessons: number
  totalLessons: number
  lastAccessedAt: number | null
}

const { data: progress, execute: fetchProgress } = await useFetch<CourseProgress[]>('/api/progress/courses', {
  immediate: false,
  default: () => [],
})

// Progress keyed by courseSlug for O(1) card lookups
const progressMap = computed(() => {
  const map: Record<string, { completed: number, total: number, percent: number }> = {}
  for (const p of progress.value ?? []) {
    map[p.courseSlug] = {
      completed: p.completedLessons,
      total: p.totalLessons,
      percent: p.totalLessons > 0 ? Math.round((p.completedLessons / p.totalLessons) * 100) : 0,
    }
  }
  return map
})

// Trigger progress fetch reactively when user logs in (client-side)
if (import.meta.client) {
  watch(loggedIn, (isloggedIn) => {
    if (isloggedIn) fetchProgress()
  }, { immediate: true })
}

// ── Helpers ──

/** Extract course slug from the Nuxt Content _path (e.g. /courses/css-fundamentals/index → css-fundamentals) */
function getCourseSlug(course: Collections['courses']): string {
  return course._path?.split('/')[2] ?? ''
}

/** Get lesson count for a course, falling back to 0 */
function getLessonCount(course: Collections['courses']): number {
  const slug = getCourseSlug(course)
  return lessonCounts.value?.[slug] ?? 0
}

const difficultyMeta: Record<string, { color: 'success' | 'warning' | 'error', label: string }> = {
  beginner: { color: 'success', label: 'Beginner' },
  intermediate: { color: 'warning', label: 'Intermediate' },
  advanced: { color: 'error', label: 'Advanced' },
}

function formatDuration(minutes: number): string {
  if (!minutes) return '—'
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

// ── SEO ──
const metaTitle = 'Courses'
const metaDescription = 'Browse all courses — learn web and mobile development through interactive lessons, exercises, and projects.'

useSeoMeta({
  title: metaTitle,
  ogTitle: `${metaTitle} | ${site.name}`,
  description: metaDescription,
  ogDescription: metaDescription,
  robots: 'index, follow',
})

useHead({
  link: [{ rel: 'canonical', href: `${site.url}/courses` }],
})

useSchemaOrg([
  defineWebPage({
    name: `${metaTitle} | ${site.name}`,
    description: metaDescription,
    url: `${site.url}/courses`,
  }),
])
</script>

<template>
  <main class="container mx-auto px-4 py-12 min-h-[60vh]">
    <!-- ── Page Header ── -->
    <header class="max-w-3xl mb-10">
      <h1 class="font-bold text-3xl sm:text-4xl text-secondary">
        Courses
      </h1>
      <p class="mt-3 text-base text-secondary/70">
        {{ metaDescription }}
      </p>
    </header>

    <!-- ── Course Grid ── -->
    <section
      v-if="courses && courses.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <NuxtLink
        v-for="course in courses"
        :key="course._path"
        :to="`/courses/${getCourseSlug(course)}`"
        class="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary-default rounded-xl"
      >
        <UCard
          class="h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border-gray-200"
          :ui="{ body: 'flex flex-col h-full gap-3' }"
        >
          <!-- Cover image (if provided) -->
          <div v-if="course.image" class="relative h-36 rounded-lg overflow-hidden mb-1">
            <nuxt-img
              :src="course.image"
              :alt="course.title"
              format="webp"
              sizes="sm:90vw md:45vw lg:300px"
              loading="lazy"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </div>

          <!-- Top row: difficulty badge + duration -->
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <UBadge
              v-if="course.difficulty"
              :color="difficultyMeta[course.difficulty]?.color ?? 'neutral'"
              variant="subtle"
              size="sm"
            >
              {{ difficultyMeta[course.difficulty]?.label ?? course.difficulty }}
            </UBadge>
            <span class="inline-flex items-center gap-1 text-xs text-secondary/60">
              <UIcon name="i-heroicons-clock" class="size-3.5" />
              {{ formatDuration(course.duration) }}
            </span>
          </div>

          <!-- Title -->
          <h2 class="font-bold text-lg leading-snug text-secondary group-hover:text-tertiary-default transition-colors">
            {{ course.title }}
          </h2>

          <!-- Description -->
          <p class="text-sm text-secondary/70 line-clamp-3 flex-grow">
            {{ course.description }}
          </p>

          <!-- Tags -->
          <div v-if="course.tags?.length" class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in course.tags.slice(0, 4)"
              :key="tag"
              class="inline-flex items-center text-xs px-2 py-0.5 rounded-md bg-gray-100 text-secondary/60"
            >
              {{ tag }}
            </span>
          </div>

          <!-- Lesson count + Progress bar (logged-in users only) -->
          <div class="pt-2 border-t border-gray-100 mt-auto space-y-2">
            <div class="flex items-center justify-between text-xs text-secondary/60">
              <span class="inline-flex items-center gap-1">
                <UIcon name="i-heroicons-book-open" class="size-3.5" />
                {{ getLessonCount(course) }} {{ getLessonCount(course) === 1 ? 'lesson' : 'lessons' }}
              </span>
            </div>

            <!-- Progress bar for logged-in users with progress data -->
            <div
              v-if="loggedIn && progressMap[getCourseSlug(course)]"
              class="space-y-1"
            >
              <div class="flex items-center justify-between text-xs">
                <span class="text-secondary/60">Your progress</span>
                <span class="font-medium text-tertiary-default">
                  {{ progressMap[getCourseSlug(course)]!.completed }} / {{ progressMap[getCourseSlug(course)]!.total }}
                  ({{ progressMap[getCourseSlug(course)]!.percent }}%)
                </span>
              </div>
              <div class="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                <div
                  class="h-full rounded-full bg-tertiary-default transition-all duration-500"
                  :style="{ width: `${progressMap[getCourseSlug(course)]!.percent}%` }"
                />
              </div>
            </div>
          </div>

          <!-- CTA -->
          <UButton
            :label="loggedIn && progressMap[getCourseSlug(course)] ? 'Continue' : 'Start Course'"
            :to="`/courses/${getCourseSlug(course)}`"
            color="primary"
            variant="soft"
            size="sm"
            block
            trailing
            class="mt-1"
            @click.stop.prevent
          >
            <template #trailing>
              <UIcon name="i-heroicons-arrow-right-20-solid" />
            </template>
          </UButton>
        </UCard>
      </NuxtLink>
    </section>

    <!-- ── Empty State ── -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <UIcon name="i-heroicons-academic-cap" class="size-16 text-secondary/20 mb-4" />
      <h2 class="font-semibold text-xl text-secondary/70 mb-2">
        No courses available yet
      </h2>
      <p class="text-sm text-secondary/50 max-w-md">
        We're working on new courses. Check back soon!
      </p>
    </div>
  </main>
</template>
