<script setup lang="ts">
import { usePlayground } from '~/composables/usePlayground'

const { patch } = usePlayground()

const options = [
  'A reactive reference object',
  'The initial value',
  'A Vue component',
  'A plain JavaScript variable',
]
const correct = 0
const selected = ref<number | null>(null)
const submitted = ref(false)

function check() {
  if (selected.value === null) return
  submitted.value = true
}

function optionClass(i: number) {
  const base = 'flex w-full items-center gap-3 rounded-[8px] border px-4 py-3 text-left text-[14px] transition-colors'
  if (!submitted.value) {
    return selected.value === i
      ? `${base} border-[var(--pg-minium)] bg-[var(--pg-surface)]`
      : `${base} border-[var(--pg-ink)]/12 bg-[var(--pg-surface)] hover:border-[var(--pg-ink)]/30`
  }
  if (i === correct) return `${base} border-[var(--pg-ink)] bg-[var(--pg-surface)]`
  if (i === selected.value) return `${base} border-[var(--pg-minium)]/40 text-[var(--pg-slate)]`
  return `${base} border-[var(--pg-ink)]/8 text-[var(--pg-ash)]`
}
</script>

<template>
  <main class="mx-auto max-w-xl px-5 pb-32 pt-10">
    <button
      type="button"
      class="text-[13px] text-[var(--pg-slate)] hover:text-[var(--pg-ink)]"
      @click="patch({ screen: 'chapter' }, 'push')"
    >
      Chapter
    </button>

    <h1 class="mt-6 text-[28px] font-semibold tracking-tight text-[var(--pg-ink)]">
      What does ref() return?
    </h1>
    <span class="mt-3 block h-[2px] w-8 bg-[var(--pg-minium)]" />

    <div class="mt-8 space-y-2">
      <button
        v-for="(opt, i) in options"
        :key="opt"
        type="button"
        :class="optionClass(i)"
        @click="submitted ? undefined : (selected = i)"
      >
        <span
          class="grid size-6 place-items-center rounded-[6px] border text-[11px]"
          :class="selected === i ? 'border-[var(--pg-minium)] text-[var(--pg-minium)]' : 'border-[var(--pg-ink)]/20 text-[var(--pg-ash)]'"
        >
          {{ String.fromCharCode(65 + i) }}
        </span>
        {{ opt }}
      </button>
    </div>

    <div class="mt-6 flex items-center gap-3">
      <button
        type="button"
        class="rounded-[8px] bg-[var(--pg-minium)] px-4 py-2.5 text-[14px] font-medium text-white disabled:opacity-40"
        :disabled="selected === null"
        @click="check"
      >
        Check
      </button>
      <button
        type="button"
        class="rounded-[8px] border border-[var(--pg-ink)]/15 px-4 py-2.5 text-[14px] text-[var(--pg-ink)]"
        @click="patch({ screen: 'studio' }, 'push')"
      >
        Open in studio
      </button>
    </div>

    <p v-if="submitted" class="mt-5 text-[14px] text-[var(--pg-slate)]">
      {{ selected === correct
        ? 'Yes. ref() returns a reactive object. You read and write .value in script.'
        : 'Not that one. ref() boxes the value. The box is the reactive reference.' }}
    </p>
  </main>
</template>
