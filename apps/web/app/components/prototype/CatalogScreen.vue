<script setup lang="ts">
import { COURSES, FILTERS } from './data'
import { usePlayground } from '~/composables/usePlayground'

const { mark, patch } = usePlayground()
const active = ref<(typeof FILTERS)[number]>('All')

const shown = computed(() => {
  if (active.value === 'All') return COURSES
  return COURSES.filter(c => c.track === active.value || c.level === active.value)
})
</script>

<template>
  <main class="mx-auto max-w-5xl px-5 pb-32 pt-10">
    <p class="text-[13px] text-[var(--pg-slate)]">scireDev courses</p>
    <h1 class="mt-2 text-[36px] font-semibold tracking-tight text-[var(--pg-ink)]">Courses</h1>

    <div class="mt-6 flex flex-wrap gap-2">
      <button
        v-for="f in FILTERS"
        :key="f"
        type="button"
        class="rounded-[8px] px-3 py-1.5 text-[13px] transition-colors"
        :class="active === f
          ? 'bg-[var(--pg-ink)] text-[var(--pg-paper)]'
          : 'border border-[var(--pg-ink)]/15 bg-[var(--pg-surface)] text-[var(--pg-ink)] hover:border-[var(--pg-ink)]/40'"
        @click="active = f"
      >
        {{ f }}
      </button>
    </div>

    <div class="mt-6 space-y-3">
      <button
        v-for="course in shown"
        :key="course.slug"
        type="button"
        class="flex w-full items-center justify-between rounded-[8px] bg-[var(--pg-surface)] px-6 py-5 text-left transition-transform active:scale-[0.995]"
        @click="patch({ screen: 'course' }, 'push')"
      >
        <div>
          <h2 class="text-[18px] font-semibold text-[var(--pg-ink)]">{{ course.title }}</h2>
          <span class="mt-2 block h-[2px] w-8 bg-[var(--pg-minium)]" />
          <p class="mt-2 text-[13px] text-[var(--pg-slate)]">
            {{ course.level }} · {{ course.hours }} hours · {{ course.lessons }} lessons
          </p>
        </div>
        <PrototypeMark :name="mark" :size="52" whisper />
      </button>
    </div>
  </main>
</template>
