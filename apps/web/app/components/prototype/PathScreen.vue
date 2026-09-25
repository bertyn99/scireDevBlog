<script setup lang="ts">
import { PATH_STAGES } from './data'
import { usePlayground } from '~/composables/usePlayground'

const { patch } = usePlayground()
</script>

<template>
  <main class="mx-auto max-w-3xl px-5 pb-32 pt-10">
    <p class="text-[13px] text-[var(--pg-slate)]">Learning path</p>
    <h1 class="mt-2 text-[36px] font-semibold tracking-tight text-[var(--pg-ink)]">Frontend Engineer</h1>
    <p class="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-[var(--pg-slate)]">
      JavaScript first. Then the platform. Then Vue. One path, 85 hours.
    </p>

    <ol class="mt-10 space-y-0">
      <li
        v-for="(stage, i) in PATH_STAGES"
        :key="stage.name"
        class="relative grid grid-cols-[48px_1fr] gap-4 pb-10 last:pb-0"
      >
        <div class="relative flex flex-col items-center self-stretch">
          <span class="grid size-8 shrink-0 place-items-center rounded-[8px] bg-[var(--pg-ink)] text-[12px] font-medium text-[var(--pg-paper)]">
            {{ i + 1 }}
          </span>
          <span
            v-if="i < PATH_STAGES.length - 1"
            class="mt-2 w-px flex-1 bg-[var(--pg-ink)]/12"
          />
        </div>
        <div>
          <div class="flex items-baseline justify-between gap-4">
            <h2 class="text-[18px] font-semibold text-[var(--pg-ink)]">{{ stage.name }}</h2>
            <span class="text-[12px] text-[var(--pg-ash)]">{{ stage.hours }}h</span>
          </div>
          <span class="mt-2 block h-[2px] w-8 bg-[var(--pg-minium)]" />
          <ul class="mt-4 space-y-2">
            <li v-for="c in stage.courses" :key="c">
              <button
                type="button"
                class="text-[14px] text-[var(--pg-slate)] hover:text-[var(--pg-ink)]"
                @click="patch({ screen: 'course' }, 'push')"
              >
                {{ c }}
              </button>
            </li>
          </ul>
        </div>
      </li>
    </ol>
  </main>
</template>
