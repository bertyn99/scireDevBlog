<script setup lang="ts">
import type { PlaygroundScreen } from '~/composables/usePlayground'
import { usePlayground } from '~/composables/usePlayground'
import PrototypeLandingScreen from '~/components/prototype/LandingScreen.vue'
import PrototypeCatalogScreen from '~/components/prototype/CatalogScreen.vue'
import PrototypePathScreen from '~/components/prototype/PathScreen.vue'
import PrototypeCourseScreen from '~/components/prototype/CourseScreen.vue'
import PrototypeChapterScreen from '~/components/prototype/ChapterScreen.vue'
import PrototypeExerciseScreen from '~/components/prototype/ExerciseScreen.vue'
import PrototypeStudioScreen from '~/components/prototype/StudioScreen.vue'

definePageMeta({
  layout: 'prototype',
  ssr: false,
  robots: false,
})

const { screen, mark, cssVars, patch } = usePlayground()

onMounted(() => {
  patch({})
})

useSeoMeta({
  title: 'scireDev playground',
  robots: 'noindex, nofollow',
})

useHead({
  bodyAttrs: {
    class: 'pg-body',
  },
})

const screenComp = computed(() => {
  const current: PlaygroundScreen = screen.value
  switch (current) {
    case 'landing':
      return PrototypeLandingScreen
    case 'catalog':
      return PrototypeCatalogScreen
    case 'path':
      return PrototypePathScreen
    case 'course':
      return PrototypeCourseScreen
    case 'chapter':
      return PrototypeChapterScreen
    case 'exercise':
      return PrototypeExerciseScreen
    case 'studio':
      return PrototypeStudioScreen
    default: {
      const _never: never = current
      return _never
    }
  }
})
</script>

<template>
  <!--
    Playground for scireDev brand + product UX.
    Switch mark (leaf / circle / grove), palette (D / warm / cool),
    and screens via ?screen=&mark=&palette=. Throwaway. Not production.
  -->
  <div
    class="pg min-h-[100dvh] bg-[var(--pg-paper)] text-[var(--pg-ink)] antialiased"
    :style="cssVars"
  >
    <PrototypeShell />
    <component :is="screenComp" :key="`${screen}-${mark}`" />
    <PrototypeDock />
  </div>
</template>
