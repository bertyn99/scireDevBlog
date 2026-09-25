<script lang="ts" setup>
/**
 * ReviewQueue — concepts due for spaced repetition.
 * Each item: concept name + due/overdue status.
 * Empty state: "You're all caught up!"
 */

interface ReviewItem {
  conceptTag: string
  nextReviewAt: number
  mastery: number
}

const props = defineProps<{
  items: ReviewItem[]
}>()

const now = Date.now()

function dueLabel(nextReviewAt: number): { text: string; color: 'error' | 'warning' | 'neutral' } {
  const diff = now - nextReviewAt
  if (Number.isNaN(diff) || nextReviewAt <= 0) return { text: 'Due', color: 'warning' }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (days >= 1) return { text: `Overdue ${days}d`, color: 'error' }
  const hours = Math.floor(diff / (1000 * 60 * 60))
  if (hours >= 1) return { text: `Due in ${hours}h`, color: 'warning' }
  return { text: 'Due now', color: 'warning' }
}

const count = computed(() => (props.items ?? []).length)
</script>

<template>
  <UCard class="h-full">
    <template #header>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-clock-alert" class="size-5 text-primary" />
          <h3 class="text-base font-semibold">Review queue</h3>
        </div>
        <UBadge v-if="count > 0" color="warning" variant="subtle" size="sm">{{ count }} due</UBadge>
      </div>
    </template>

    <template v-if="count > 0">
      <ul class="space-y-2">
        <li
          v-for="item in props.items"
          :key="item.conceptTag"
          class="flex items-center justify-between gap-3 rounded-md px-2 py-1.5 transition hover:bg-elevated/40"
        >
          <span class="truncate text-sm font-medium">{{ item.conceptTag }}</span>
          <UBadge :color="dueLabel(item.nextReviewAt).color" variant="subtle" size="sm">
            {{ dueLabel(item.nextReviewAt).text }}
          </UBadge>
        </li>
      </ul>
      <UButton
        to="/courses"
        variant="soft"
        color="primary"
        size="sm"
        block
        icon="i-heroicons-bolt"
        label="Practice weak spots"
        class="mt-4"
      />
    </template>

    <UAlert
      v-else
      icon="i-heroicons-check-circle"
      color="success"
      variant="subtle"
      title="All caught up!"
      description="No reviews due right now. Great work."
    />
  </UCard>
</template>
