<script setup lang="ts">
import { usePlayground } from '~/composables/usePlayground'

const { mark, patch } = usePlayground()
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-[var(--pg-ink)]/8 bg-[var(--pg-paper)]/90 backdrop-blur-sm">
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-5">
      <button
        type="button"
        class="flex items-center gap-2.5"
        @click="patch({ screen: 'landing' }, 'push')"
      >
        <PrototypeMark :name="mark" :size="28" />
        <span class="text-[17px] font-semibold tracking-tight text-[var(--pg-ink)]">
          scire<span class="text-[var(--pg-minium)]">Dev</span>
        </span>
      </button>
      <nav class="hidden items-center gap-7 text-[13px] text-[var(--pg-slate)] sm:flex">
        <button type="button" class="hover:text-[var(--pg-ink)]" @click="patch({ screen: 'catalog' }, 'push')">Courses</button>
        <button type="button" class="hover:text-[var(--pg-ink)]" @click="patch({ screen: 'path' }, 'push')">Paths</button>
        <button type="button" class="hover:text-[var(--pg-ink)]" @click="patch({ screen: 'studio' }, 'push')">Studio</button>
      </nav>
    </div>
  </header>
</template>
