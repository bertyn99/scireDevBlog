<script lang="ts" setup>
import type { Collections } from '@nuxt/content'

const route = useRoute()
const slug = (route.params.slug as string[]) || []

/**
 * Route mapping:
 * /courses → all courses list
 * /courses/{course} → course landing page
 * /courses/{course}/{lesson} → lesson page
 */
const isCourseList = !slug || slug.length === 0
const courseSlug = slug[0]
const lessonPath = slug.slice(1).join('/')

// ── Fetch course data ──
const { data: course } = await useAsyncData(`course-${courseSlug}`, () =>
  queryCollection('courses')
    .where('_path', '=', `/courses/${courseSlug}/index`)
    .first(),
)

// ── Fetch lessons for the course ──
const { data: lessons } = await useAsyncData(`lessons-${courseSlug}`, () =>
  queryCollection('lessons')
    .where('course', '=', courseSlug)
    .order('order', 'ASC')
    .all(),
)

// ── Fetch current lesson if on a lesson page ──
const currentLessonSlug = lessonPath ? `${courseSlug}/${lessonPath}` : null
const { data: lesson } = await useAsyncData(
  () => `lesson-${currentLessonSlug}`,
  () => currentLessonSlug
    ? queryCollection('lessons')
        .where('_path', '=', `/courses/${currentLessonSlug}/index`)
        .first()
    : Promise.resolve(null),
  { watch: [() => route.params.slug] },
)

// ── Navigation ──
const currentLessonIndex = computed(() =>
  lessons.value?.findIndex(
    (l) => l._path === `/courses/${currentLessonSlug}/index`,
  ) ?? -1,
)

const prevLesson = computed(() =>
  currentLessonIndex.value > 0
    ? lessons.value?.[currentLessonIndex.value - 1]
    : null,
)
const nextLesson = computed(() =>
  currentLessonIndex.value < (lessons.value?.length ?? 0) - 1
    ? lessons.value?.[currentLessonIndex.value + 1]
    : null,
)
</script>

<template>
  <!-- Course Overview -->
  <div v-if="!lesson && course" class="max-w-4xl mx-auto px-4 py-8">
    <ContentRenderer :value="course" />

    <h2 class="text-2xl font-bold mt-12 mb-6">Lessons</h2>
    <div class="space-y-4">
      <NuxtLink
        v-for="(l, i) in lessons"
        :key="l._path"
        :to="`/courses/${courseSlug}/${l._path.replace(`/courses/${courseSlug}/`, '').replace('/index', '')}`"
        class="block p-4 border rounded-lg hover:border-primary transition-colors"
      >
        <div class="flex items-center gap-3">
          <span class="text-sm font-mono text-gray-400">{{ i + 1 }}</span>
          <div>
            <h3 class="font-semibold">{{ l.title }}</h3>
            <p class="text-sm text-gray-500">{{ l.description }}</p>
          </div>
          <span v-if="l.duration" class="ml-auto text-sm text-gray-400">{{ l.duration }} min</span>
        </div>
      </NuxtLink>
    </div>
  </div>

  <!-- Lesson Page -->
  <div v-else-if="lesson && course" class="max-w-4xl mx-auto px-4 py-8">
    <!-- Lesson Navigation -->
    <nav class="flex items-center justify-between mb-8 pb-4 border-b">
      <NuxtLink
        v-if="prevLesson"
        :to="`/courses/${courseSlug}/${prevLesson._path.replace(`/courses/${courseSlug}/`, '').replace('/index', '')}`"
        class="text-sm text-gray-500 hover:text-primary"
      >
        ← {{ prevLesson.title }}
      </NuxtLink>
      <NuxtLink
        :to="`/courses/${courseSlug}`"
        class="text-sm text-gray-500 hover:text-primary"
      >
        Course Overview
      </NuxtLink>
      <NuxtLink
        v-if="nextLesson"
        :to="`/courses/${courseSlug}/${nextLesson._path.replace(`/courses/${courseSlug}/`, '').replace('/index', '')}`"
        class="text-sm text-gray-500 hover:text-primary"
      >
        {{ nextLesson.title }} →
      </NuxtLink>
    </nav>

    <!-- Lesson Content -->
    <ContentRenderer :value="lesson" />

    <!-- Exercises Section -->
    <div
      v-if="lesson.exercises?.length"
      class="mt-12 border-t pt-8"
    >
      <h2 class="text-2xl font-bold mb-6">Exercises</h2>

      <div class="space-y-8">
        <template v-for="exercise in lesson.exercises" :key="exercise.id">
          <!-- QCM Exercise -->
          <div v-if="exercise.type === 'qcm'" class="border rounded-lg p-6">
            <h3 class="font-semibold mb-4">{{ exercise.question }}</h3>
            <div class="space-y-2">
              <label
                v-for="(option, i) in exercise.options"
                :key="i"
                class="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  :name="exercise.id"
                  :value="i"
                  class="w-4 h-4"
                />
                <span>{{ option }}</span>
              </label>
            </div>
            <button
              class="mt-4 px-4 py-2 bg-primary text-white rounded hover:opacity-90 transition-opacity"
            >
              Check Answer
            </button>
            <p class="mt-2 text-sm text-gray-400">{{ exercise.points }} points</p>
          </div>

          <!-- Graphical Exercise -->
          <div v-else-if="exercise.type === 'graphical'" class="border rounded-lg p-6">
            <img
              :src="exercise.image"
              :alt="exercise.question"
              class="w-full max-w-lg mx-auto mb-4 rounded border"
            />
            <h3 class="font-semibold mb-4">{{ exercise.question }}</h3>
            <div class="space-y-2">
              <label
                v-for="(option, i) in exercise.options"
                :key="i"
                class="flex items-center gap-3 p-3 border rounded cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="radio"
                  :name="exercise.id"
                  :value="i"
                  class="w-4 h-4"
                />
                <span>{{ option }}</span>
              </label>
            </div>
            <p class="mt-2 text-sm text-gray-400">{{ exercise.points }} points</p>
          </div>

          <!-- Code Challenge -->
          <div v-else-if="exercise.type === 'code_challenge'" class="border rounded-lg overflow-hidden">
            <CodeChallenge
              :title="exercise.title"
              :description="exercise.description"
              :points="exercise.points"
              :starter-html="exercise.starterFiles?.html"
              :starter-css="exercise.starterFiles?.css"
              :assertions="exercise.assertions"
            />
          </div>
        </template>
      </div>
    </div>
  </div>

  <!-- Course Not Found -->
  <div v-else class="max-w-4xl mx-auto px-4 py-16 text-center">
    <h1 class="text-2xl font-bold mb-4">Course Not Found</h1>
    <NuxtLink to="/courses" class="text-primary hover:underline">Browse all courses</NuxtLink>
  </div>
</template>
