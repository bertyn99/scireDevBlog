<script lang="ts" setup>
/**
 * /dashboard — authenticated student learning hub.
 * Fetches 4 API endpoints in parallel, renders 6 widgets in a responsive grid.
 * Auth-protected via 'auth' middleware (redirects to /auth/login).
 */

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth',
})

useSeoMeta({
  title: 'Dashboard — scireDev',
  description: 'Your learning hub: continue lessons, track progress, and review weak concepts.',
})

const { user } = useUserSession()
const greetingName = computed(() => user.value?.name || user.value?.email || 'learner')

// ── Fetch all 4 endpoints in parallel ──
const { data: courses } = await useFetch('/api/progress/courses')
const { data: lastLesson } = await useFetch('/api/progress/last-lesson')
const { data: reviewQueue } = await useFetch('/api/adaptive/review-queue')
const { data: activity } = await useFetch('/api/progress/activity')

// Skill mastery is derived from review-queue concepts (mastery values).
const skills = computed(() =>
  (reviewQueue.value ?? []).map(r => ({ conceptTag: r.conceptTag, mastery: r.mastery })),
)
</script>

<template>
  <div class="space-y-8">
    <!-- Welcome header -->
    <div class="space-y-1">
      <h1 class="text-2xl font-bold tracking-tight md:text-3xl">
        Welcome back, {{ greetingName }}!
      </h1>
      <p class="text-muted">Pick up where you left off and keep your streak alive.</p>
    </div>

    <!-- Top: Continue Learning (full-width hero) -->
    <DashboardContinueLearning :last-lesson="lastLesson" />

    <!-- Middle row: CourseProgress (2/3) + StreakBadge (1/3) -->
    <div class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2">
        <DashboardCourseProgress :courses="courses ?? []" />
      </div>
      <div class="lg:col-span-1">
        <DashboardStreakBadge :activities="activity ?? []" />
      </div>
    </div>

    <!-- Bottom row: SkillMastery + ReviewQueue + ActivityFeed -->
    <div class="grid gap-6 lg:grid-cols-3">
      <DashboardSkillMastery :skills="skills" />
      <DashboardReviewQueue :items="reviewQueue ?? []" />
      <DashboardActivityFeed :items="activity ?? []" />
    </div>
  </div>
</template>
