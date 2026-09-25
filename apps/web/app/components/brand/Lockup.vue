<script setup lang="ts">
withDefaults(defineProps<{
  markSize?: number
  onDark?: boolean
}>(), {
  markSize: 32,
  onDark: false,
})
</script>

<template>
  <span
    class="inline-flex items-center gap-2.5"
    :class="onDark ? 'text-white' : 'text-ink'"
  >
    <BrandMark :size="markSize" class="shrink-0" />
    <span class="leading-none tracking-tight">
      <span class="font-serif italic text-[1.15em]">scire</span><span
        class="font-sans font-semibold text-ember"
      >Dev</span>
    </span>
  </span>
</template>
