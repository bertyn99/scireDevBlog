<script setup lang="ts">
import { MARKS, PALETTE_OPTIONS, SCREENS, usePlayground } from '~/composables/usePlayground'

const { screen, mark, palette, patch, cycleScreen } = usePlayground()

onMounted(() => {
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
})

function onKey(e: KeyboardEvent) {
  const t = e.target as HTMLElement | null
  if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
  if (e.key === 'ArrowLeft') cycleScreen(-1)
  if (e.key === 'ArrowRight') cycleScreen(1)
}
</script>

<template>
  <div
    class="fixed bottom-4 left-1/2 z-[80] w-[min(960px,calc(100%-1.5rem))] -translate-x-1/2 rounded-[8px] bg-[var(--pg-ink)] px-3 py-2 text-[var(--pg-paper)] shadow-[0_12px_40px_rgb(38_38_38/0.28)]"
    role="navigation"
    aria-label="Playground switcher"
  >
    <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex flex-wrap items-center gap-1">
        <button
          type="button"
          class="grid size-8 place-items-center rounded-[8px] hover:bg-white/10"
          aria-label="Previous screen"
          @click="cycleScreen(-1)"
        >
          <UIcon name="i-heroicons-chevron-left" class="size-4" />
        </button>
        <button
          v-for="s in SCREENS"
          :key="s.id"
          type="button"
          class="rounded-[8px] px-2 py-1 text-[11px] font-medium tracking-wide"
          :class="screen === s.id ? 'bg-[var(--pg-paper)] text-[var(--pg-ink)]' : 'text-white/70 hover:text-white'"
          @click="patch({ screen: s.id }, 'push')"
        >
          {{ s.label }}
        </button>
        <button
          type="button"
          class="grid size-8 place-items-center rounded-[8px] hover:bg-white/10"
          aria-label="Next screen"
          @click="cycleScreen(1)"
        >
          <UIcon name="i-heroicons-chevron-right" class="size-4" />
        </button>
      </div>

      <div class="flex flex-wrap items-center gap-3 text-[11px]">
        <div class="flex items-center gap-1">
          <span class="text-white/40">Mark</span>
          <button
            v-for="m in MARKS"
            :key="m.id"
            type="button"
            class="rounded-[8px] px-2 py-1"
            :class="mark === m.id ? 'bg-[var(--pg-paper)] text-[var(--pg-ink)]' : 'text-white/70 hover:text-white'"
            @click="patch({ mark: m.id })"
          >
            {{ m.label }}
          </button>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-white/40">Palette</span>
          <button
            v-for="p in PALETTE_OPTIONS"
            :key="p.id"
            type="button"
            class="rounded-[8px] px-2 py-1"
            :class="palette === p.id ? 'bg-[var(--pg-paper)] text-[var(--pg-ink)]' : 'text-white/70 hover:text-white'"
            @click="patch({ palette: p.id })"
          >
            {{ p.label }}
          </button>
        </div>
      </div>
    </div>
    <p class="mt-1 text-[10px] text-white/35">
      {{ mark }} · palette {{ palette }} · {{ screen }} · throwaway playground
    </p>
  </div>
</template>
