<script lang="ts" setup>
/**
 * StreakBadge — consecutive days with at least one activity.
 * Computed client-side from activity timestamps.
 * Only highlights when streak ≥ 1.
 */

interface ActivityItem {
  type: string
  description: string
  timestamp: number
}

const props = defineProps<{
  activities: ActivityItem[]
}>()

/**
 * Count consecutive days backward from today that appear in the activity set.
 */
const streak = computed(() => {
  const ts = props.activities ?? []
  if (ts.length === 0) return 0

  const days = new Set(ts
    .filter(a => a.timestamp > 0)
    .map(a => new Date(a.timestamp).toDateString()))

  let count = 0
  const cursor = new Date()
  // If today has no activity yet, allow streak to start from yesterday
  if (!days.has(cursor.toDateString())) {
    cursor.setDate(cursor.getDate() - 1)
  }
  while (days.has(cursor.toDateString())) {
    count++
    cursor.setDate(cursor.getDate() - 1)
  }
  return count
})

const milestone = computed(() => {
  if (streak.value >= 30) return { icon: 'i-heroicons-trophy', tone: 'text-amber-500' }
  if (streak.value >= 7) return { icon: 'i-heroicons-fire', tone: 'text-orange-500' }
  if (streak.value >= 3) return { icon: 'i-heroicons-fire', tone: 'text-primary' }
  return { icon: 'i-heroicons-sparkles', tone: 'text-muted' }
})
</script>

<template>
  <UCard class="h-full" :ui="{ body: 'flex h-full flex-col justify-center gap-2' }">
    <div class="flex items-center gap-3">
      <div
        class="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10"
        :class="streak >= 1 ? milestone.tone : 'text-muted'"
      >
        <UIcon :name="streak >= 1 ? milestone.icon : 'i-heroicons-clock'" class="size-6" />
      </div>
      <div>
        <div class="flex items-baseline gap-1">
          <span class="text-3xl font-bold tabular-nums">{{ streak }}</span>
          <span class="text-sm text-muted">day{{ streak === 1 ? '' : 's' }}</span>
        </div>
        <p class="text-xs font-medium uppercase tracking-wide text-muted">
          {{ streak >= 1 ? 'Current streak' : 'No active streak' }}
        </p>
      </div>
    </div>
    <p v-if="streak >= 1" class="text-xs text-muted">
      Keep it up — practice daily to grow your streak!
    </p>
  </UCard>
</template>
