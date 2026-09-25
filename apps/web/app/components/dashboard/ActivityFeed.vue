<script lang="ts" setup>
/**
 * ActivityFeed — chronological list of recent actions.
 * Icons map per activity type: passed/failed/started/completed.
 */

interface ActivityItem {
  type: string
  description: string
  timestamp: number
}

const props = defineProps<{
  items: ActivityItem[]
}>()

const iconMap: Record<string, { icon: string; tone: string }> = {
  exercise_passed: { icon: 'i-heroicons-check-circle', tone: 'text-success' },
  exercise_failed: { icon: 'i-heroicons-x-circle', tone: 'text-error' },
  lesson_completed: { icon: 'i-heroicons-academic-cap', tone: 'text-primary' },
  lesson_started: { icon: 'i-heroicons-book-open', tone: 'text-info' },
  course_started: { icon: 'i-heroicons-flag', tone: 'text-primary' },
}

function meta(type: string) {
  return iconMap[type] ?? { icon: 'i-heroicons-ellipsis-horizontal-circle', tone: 'text-muted' }
}

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

function relativeTime(ts: number): string {
  if (!ts) return ''
  const diff = ts - Date.now()
  const absSec = Math.abs(diff) / 1000
  if (absSec < 60) return 'just now'
  if (absSec < 3600) return rtf.format(Math.round(diff / 60000), 'minute')
  if (absSec < 86400) return rtf.format(Math.round(diff / 3600000), 'hour')
  return rtf.format(Math.round(diff / 86400000), 'day')
}
</script>

<template>
  <UCard class="h-full">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-bolt" class="size-5 text-primary" />
        <h3 class="text-base font-semibold">Recent activity</h3>
      </div>
    </template>

    <template v-if="(props.items ?? []).length > 0">
      <ol class="space-y-3">
        <li
          v-for="(item, idx) in props.items"
          :key="`${item.timestamp}-${idx}`"
          class="flex items-start gap-3"
        >
          <UIcon :name="meta(item.type).icon" :class="['mt-0.5 size-5 shrink-0', meta(item.type).tone]" />
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">{{ item.description }}</p>
            <p class="text-xs text-muted">{{ relativeTime(item.timestamp) }}</p>
          </div>
        </li>
      </ol>
    </template>

    <UAlert
      v-else
      icon="i-heroicons-clock"
      color="neutral"
      variant="subtle"
      title="No recent activity"
      description="Start a lesson or exercise to see your progress here."
    />
  </UCard>
</template>
