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
    <p class="text-2xl font-semibold text-tertiary-default mb-6">
      {{ siteName }}
    </p>
    <h1 class="text-7xl font-bold text-white text-center leading-tight mb-8 max-w-5xl">
      {{ title }}
    </h1>
    <p class="text-3xl text-gray-300 text-center max-w-4xl leading-snug">
      {{ description }}
    </p>
  </div>
</template>
