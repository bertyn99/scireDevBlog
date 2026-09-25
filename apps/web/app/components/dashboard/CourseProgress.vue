<script lang="ts" setup>
/**
 * CourseProgress — grid of enrolled/started courses with progress bars.
 * Empty state: course catalog CTA.
 */

interface CourseProgressItem {
  courseSlug: string
  status: string
  completedLessons: number
  totalLessons: number
  lastAccessedAt: number | null
}

const props = defineProps<{
  courses: CourseProgressItem[]
}>()

function percent(c: CourseProgressItem): number {
  if (!c.totalLessons) return 0
  return Math.round((c.completedLessons / c.totalLessons) * 100)
}

const difficultyColor = (c: CourseProgressItem) =>
  c.status === 'completed'
    ? 'success' as const
    : c.completedLessons > 0
      ? 'primary' as const
      : 'neutral' as const
</script>

<template>
  <UCard class="h-full" :ui="{ header: 'flex items-center justify-between' }">
    <template #header>
      <h3 class="text-base font-semibold">Your courses</h3>
      <UButton to="/courses" variant="ghost" size="xs" icon="i-heroicons-arrow-right-20-solid" label="Browse all" />
    </template>

    <template v-if="(props.courses ?? []).length > 0">
      <div class="grid gap-4 sm:grid-cols-2">
        <div
          v-for="course in props.courses"
          :key="course.courseSlug"
          class="rounded-lg border border-default p-4 transition hover:bg-elevated/40"
        >
          <div class="mb-3 flex items-start justify-between gap-2">
            <NuxtLink :to="`/courses/${course.courseSlug}`" class="font-semibold leading-tight hover:text-primary">
              {{ course.courseSlug }}
            </NuxtLink>
            <UBadge :color="difficultyColor(course)" variant="subtle" size="sm">
              {{ course.completedLessons }}/{{ course.totalLessons }}
            </UBadge>
          </div>

          <UProgress :value="percent(course)" size="sm" class="mb-2" />

          <div class="flex items-center justify-between text-xs text-muted">
            <span>{{ percent(course) }}% complete</span>
            <UButton
              :to="`/courses/${course.courseSlug}`"
              size="xs"
              variant="link"
              :label="course.completedLessons > 0 ? 'Continue' : 'Start'"
            />
          </div>
        </div>
      </div>
    </template>

    <UAlert
      v-else
      icon="i-heroicons-book-open"
      color="neutral"
      variant="subtle"
      title="No courses started yet"
      description="Browse the catalog and jump into your first course."
      :actions="[{ label: 'Browse catalog', to: '/courses', color: 'primary', variant: 'soft' }]"
    />
  </UCard>
</template>
