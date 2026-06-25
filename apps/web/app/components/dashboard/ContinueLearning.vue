<script lang="ts" setup>
/**
 * ContinueLearning — hero card showing the last accessed lesson.
 * Dominant CTA: one click to resume.
 *
 * States:
 * - has progress → course name, lesson title, progress bar, "Resume" button
 * - no progress → "Start your first course" CTA
 */

interface LastLesson {
  lessonSlug?: string | null
  courseSlug?: string | null
  lessonTitle?: string | null
  status?: string | null
}

const props = defineProps<{
  lastLesson: LastLesson | null
}>()

const hasLesson = computed(
  () => !!props.lastLesson?.lessonSlug && !!props.lastLesson?.courseSlug,
)

const resumeHref = computed(() => {
  if (!hasLesson.value || !props.lastLesson?.courseSlug) return '/courses'
  const course = props.lastLesson.courseSlug
  const lesson = props.lastLesson.lessonSlug?.replace(`${course}/`, '') ?? ''
  return lesson ? `/courses/${course}/${lesson}` : `/courses/${course}`
})

const statusLabel = computed(() => {
  const s = props.lastLesson?.status
  if (s === 'completed') return 'Completed — start next'
  if (s === 'in_progress') return 'In progress'
  return 'Resume where you left off'
})
</script>

<template>
  <UCard
    variant="soft"
    class="overflow-hidden"
    :ui="{ body: 'sm:p-6 md:p-8' }"
  >
    <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-play-circle" class="size-5 text-primary" />
          <span class="text-sm font-semibold uppercase tracking-wide text-primary">Continue learning</span>
        </div>

        <template v-if="hasLesson">
          <h2 class="text-xl font-bold tracking-tight md:text-2xl">
            {{ lastLesson?.lessonTitle || lastLesson?.lessonSlug?.split('/').pop() || 'Continue your lesson' }}
          </h2>
          <p class="text-sm text-muted">
            {{ lastLesson?.courseSlug }} · {{ statusLabel }}
          </p>
        </template>

        <template v-else>
          <h2 class="text-xl font-bold tracking-tight md:text-2xl">
            Start your first course
          </h2>
          <p class="text-sm text-muted">
            Jump into a course and begin your learning journey today.
          </p>
        </template>
      </div>

      <div class="shrink-0">
        <UButton
          size="lg"
          :icon="hasLesson ? 'i-heroicons-arrow-right-20-solid' : 'i-heroicons-sparkles'"
          :to="resumeHref"
          :label="hasLesson ? 'Resume' : 'Browse courses'"
        />
      </div>
    </div>
  </UCard>
</template>
