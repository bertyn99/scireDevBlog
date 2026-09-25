<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  siteName?: string
}>(), {
  title: 'Learn Web Development',
  description: 'Interactive courses, hands-on projects, and adaptive exercises.',
  siteName: 'ScireDev',
})
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center bg-secondary p-16">
    <p class="text-3xl text-white mb-8">
      <span class="font-serif italic">scire</span><span class="font-semibold text-ember">Dev</span>
    </p>
    <h1 class="text-7xl font-medium text-white text-center leading-tight mb-8 max-w-5xl">
      {{ title }}
    </h1>
    <p class="text-3xl text-white/70 text-center max-w-4xl leading-snug">
      {{ description }}
    </p>
  </div>
</template>
