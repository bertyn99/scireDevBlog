<script setup lang="ts">
import { VUE_LESSONS } from './data'
import { usePlayground } from '~/composables/usePlayground'

const { mark, patch } = usePlayground()
</script>

<template>
  <main class="mx-auto max-w-3xl px-5 pb-32 pt-10">
    <button
      type="button"
      class="text-[13px] text-[var(--pg-slate)] hover:text-[var(--pg-ink)]"
      @click="patch({ screen: 'catalog' }, 'push')"
    >
      Courses
    </button>

    <div class="mt-6 flex items-start gap-4">
      <PrototypeMark :name="mark" :size="40" />
      <div>
        <h1 class="text-[32px] font-semibold tracking-tight text-[var(--pg-ink)]">Vue Fundamentals</h1>
        <span class="mt-2 block h-[2px] w-8 bg-[var(--pg-minium)]" />
        <p class="mt-2 text-[13px] text-[var(--pg-slate)]">Beginner · 10 hours · 24 lessons</p>
      </div>
    </div>

    <ol class="mt-10 divide-y divide-[var(--pg-ink)]/8 rounded-[8px] bg-[var(--pg-surface)]">
      <li v-for="lesson in VUE_LESSONS" :key="lesson.n">
        <button
          type="button"
          class="flex w-full items-center gap-4 px-5 py-4 text-left hover:bg-[var(--pg-paper)]"
          @click="patch({ screen: 'chapter' }, 'push')"
        >
          <span class="w-6 text-[12px] tabular-nums text-[var(--pg-ash)]">{{ lesson.n }}</span>
          <span class="flex-1 text-[15px] text-[var(--pg-ink)]">{{ lesson.title }}</span>
          <span class="text-[12px] text-[var(--pg-ash)]">{{ lesson.minutes }} min</span>
        </button>
      </li>
    </ol>
  </main>
</template>
