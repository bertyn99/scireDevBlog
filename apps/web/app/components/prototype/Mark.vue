<script setup lang="ts">
import type { PlaygroundMark } from '~/composables/usePlayground'

const props = withDefaults(defineProps<{
  name: PlaygroundMark
  size?: number
  whisper?: boolean
}>(), {
  size: 28,
  whisper: false,
})

const uid = useId()
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 64 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :aria-hidden="true"
    :class="whisper ? 'opacity-[0.18]' : ''"
    :style="{ color: whisper ? 'var(--pg-ash)' : 'var(--pg-ink)' }"
  >
    <!-- Leaf: batch 3 chevron leaf. Filled, paper cuts, rounded joins. -->
    <g v-if="name === 'leaf'">
      <mask :id="`${uid}-leaf`">
        <path
          fill="white"
          d="M32 4c14 12 22 28 22 44 0 14-8 24-22 28C18 72 10 62 10 48 10 32 18 16 32 4Z"
        />
        <g
          fill="none"
          stroke="black"
          stroke-width="3.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M24 18 32 12 40 18" />
          <path d="M20 28 32 20 44 28" />
          <path d="M18 38 32 28 46 38" />
          <path d="M18 48 32 38 46 48" />
          <path d="M20 58 32 48 44 58" />
          <path d="M24 66 32 58 40 66" />
        </g>
      </mask>
      <rect width="64" height="80" fill="currentColor" :mask="`url(#${uid}-leaf)`" />
      <rect x="30" y="70" width="4" height="10" rx="2" fill="currentColor" />
    </g>

    <!-- Circle: batch 3 circular chevron tree. -->
    <g v-else-if="name === 'circle'">
      <mask :id="`${uid}-circle`">
        <circle cx="32" cy="34" r="26" fill="white" />
        <g
          fill="none"
          stroke="black"
          stroke-width="3.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 22 32 14 42 22" />
          <path d="M18 32 32 22 46 32" />
          <path d="M18 42 32 32 46 42" />
          <path d="M20 52 32 42 44 52" />
        </g>
      </mask>
      <rect width="64" height="80" fill="currentColor" :mask="`url(#${uid}-circle)`" />
      <rect x="30" y="58" width="4" height="16" rx="2" fill="currentColor" />
    </g>

    <!-- Grove: batch 4 A. Oval, two trunks, oval leaves, ember. -->
    <g v-else-if="name === 'grove'">
      <rect
        x="12"
        y="6"
        width="40"
        height="60"
        rx="20"
        stroke="currentColor"
        stroke-width="2.4"
        fill="none"
      />
      <g
        fill="none"
        stroke="currentColor"
        stroke-width="2.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M32 64c0-8-6-14-10-22 0-8 4-16 8-22" />
        <path d="M32 64c0-8 6-14 10-22 0-8-4-16-8-22" />
        <path d="M22 34c-4-2-8 2-10 8" />
        <path d="M42 34c4-2 8 2 10 8" />
        <path d="M24 22c-3-6 2-10 6-8" />
        <path d="M40 22c3-6-2-10-6-8" />
      </g>
      <ellipse cx="18" cy="24" rx="2.2" ry="3.2" fill="currentColor" />
      <ellipse cx="46" cy="24" rx="2.2" ry="3.2" fill="currentColor" />
      <ellipse cx="16" cy="40" rx="2.2" ry="3.2" fill="currentColor" />
      <ellipse cx="48" cy="40" rx="2.2" ry="3.2" fill="currentColor" />
      <ellipse cx="28" cy="16" rx="2.2" ry="3.2" fill="currentColor" />
      <ellipse cx="36" cy="16" rx="2.2" ry="3.2" fill="currentColor" />
      <path
        v-if="!whisper"
        fill="var(--pg-minium)"
        d="M20 10c6-2 12 0 14 6-8 1-14 6-16 12-4-4-4-12 2-18Z"
      />
    </g>
  </svg>
</template>
