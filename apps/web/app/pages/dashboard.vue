<script lang="ts" setup>
definePageMeta({
  layout: 'dashboard',
  auth: { only: 'user' },
})

useSeoMeta({
  title: 'Dashboard — scireDev',
  description: 'Your learning hub: continue lessons, track progress, and review weak concepts.',
})

interface CourseProgress {
  courseSlug: string
  status: string
  completedLessons: number
  totalLessons: number
  lastAccessedAt: number | null
}

interface LastLesson {
  lessonSlug?: string
  courseSlug?: string
  lessonTitle?: string | null
  status?: string
}

interface ReviewItem {
  conceptTag: string
  nextReviewAt: number
  mastery: number
}

interface ActivityItem {
  type: string
  description: string
  timestamp: number
}

const { user } = useUserSession()
const greetingName = computed(() => user.value?.name || user.value?.email || 'learner')

const { data: courses } = await useAuthAsyncData(
  'dashboard-courses',
  requestFetch => (requestFetch as ReturnType<typeof useRequestFetch>)('/api/progress/courses') as Promise<CourseProgress[]>,
)
const { data: lastLesson } = await useAuthAsyncData(
  'dashboard-last-lesson',
  requestFetch => (requestFetch as ReturnType<typeof useRequestFetch>)('/api/progress/last-lesson') as Promise<LastLesson>,
)
const { data: reviewQueue } = await useAuthAsyncData(
  'dashboard-review-queue',
  requestFetch => (requestFetch as ReturnType<typeof useRequestFetch>)('/api/adaptive/review-queue') as Promise<ReviewItem[]>,
)
const { data: activity } = await useAuthAsyncData(
  'dashboard-activity',
  requestFetch => (requestFetch as ReturnType<typeof useRequestFetch>)('/api/progress/activity') as Promise<ActivityItem[]>,
)

const skills = computed(() =>
  (reviewQueue.value ?? []).map(r => ({ conceptTag: r.conceptTag, mastery: r.mastery })),
)
</script>

<template>
  <div class="space-y-8">
    <div class="space-y-1">
      <h1 class="text-2xl font-bold tracking-tight md:text-3xl">
        Welcome back, {{ greetingName }}!
      </h1>
      <p class="text-muted">
        Pick up where you left off and keep your streak alive.
      </p>
    </div>

    <DashboardContinueLearning :last-lesson="lastLesson" />

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <DashboardCourseProgress :courses="courses ?? []" />
      </div>
      <div class="lg:col-span-1">
        <DashboardStreakBadge :activities="activity ?? []" />
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <DashboardSkillMastery :skills="skills" />
      <DashboardReviewQueue :items="reviewQueue ?? []" />
      <DashboardActivityFeed :items="activity ?? []" />
    </div>
  </div>
</template>
