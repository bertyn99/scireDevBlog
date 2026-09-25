<script lang="ts" setup>
/**
 * SkillMastery — horizontal bars showing mastery per concept.
 * Sorted ascending (weakest at top). Color-coded by mastery band.
 *
 * Data: derived from review queue (concepts with mastery values).
 */

interface ConceptMastery {
  conceptTag: string
  mastery: number
  nextReviewAt?: number
}

const props = defineProps<{
  skills: ConceptMastery[]
}>()

/** Weakest concepts first, capped to 6 for the dashboard panel. */
const sorted = computed(() => {
  const list = (props.skills ?? []).slice().sort((a, b) => a.mastery - b.mastery)
  return list.slice(0, 6)
})

function band(mastery: number): 'error' | 'warning' | 'success' {
  if (mastery < 0.4) return 'error'
  if (mastery < 0.7) return 'warning'
  return 'success'
}

function bandLabel(mastery: number): string {
  if (mastery < 0.4) return 'Weak'
  if (mastery < 0.7) return 'Developing'
  return 'Strong'
}

function pct(mastery: number): number {
  return Math.round((mastery ?? 0) * 100)
}
</script>

<template>
  <UCard class="h-full">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-chart-bar" class="size-5 text-primary" />
        <h3 class="text-base font-semibold">Skill mastery</h3>
      </div>
    </template>

    <template v-if="sorted.length > 0">
      <ul class="space-y-3">
        <li v-for="skill in sorted" :key="skill.conceptTag" class="space-y-1">
          <div class="flex items-center justify-between gap-2 text-sm">
            <span class="truncate font-medium">{{ skill.conceptTag }}</span>
            <span class="shrink-0 tabular-nums text-muted">{{ pct(skill.mastery) }}%</span>
          </div>
          <UProgress :value="pct(skill.mastery)" :color="band(skill.mastery)" size="sm" />
          <p class="text-xs text-muted">{{ bandLabel(skill.mastery) }}</p>
        </li>
      </ul>
    </template>

    <UAlert
      v-else
      icon="i-heroicons-sparkles"
      color="neutral"
      variant="subtle"
      title="No skills tracked yet"
      description="Complete exercises to build your skill profile."
    />
  </UCard>
</template>
