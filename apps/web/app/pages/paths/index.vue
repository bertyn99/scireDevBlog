<script setup lang="ts">
const site = useSiteConfig()

useSeoMeta(
  useLoadMeta({
    title: 'Learning Paths',
    description: 'Structured learning paths to guide you from beginner to advanced in web development.',
    image: `${site.url}/img/scire_logo_primary.png`,
    url: `${site.url}/paths`,
  }),
)

useHead({
  link: [{ rel: 'canonical', href: `${site.url}/paths` }],
})

useSchemaOrg([defineWebPage()])

const { data: paths } = await useAsyncData('paths-list', () =>
  queryCollection('paths')
    .where('published', '=', true)
    .order('estimatedHours', 'ASC')
    .all(),
)

const difficultyColor: Record<string, string> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error',
}
</script>

<template>
  <main class="max-w-6xl mx-auto px-4 py-12">
    <header class="mb-12">
      <h1 class="text-4xl font-bold mb-4">Learning Paths</h1>
      <p class="text-lg text-gray-500 max-w-2xl">
        Structured learning paths designed to guide you through web development concepts step by step.
        Each path combines multiple courses into a cohesive learning journey.
      </p>
    </header>

    <div v-if="paths?.length" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <NuxtLink
        v-for="path in paths"
        :key="path._path"
        :to="path._path"
        class="block"
      >
        <UCard
          :ui="{
            base: 'h-full hover:border-primary transition-colors cursor-pointer',
            body: 'flex flex-col h-full',
          }"
        >
          <div class="flex items-start gap-4 mb-4">
            <div class="flex-1">
              <h2 class="text-xl font-bold mb-1">{{ path.title }}</h2>
              <p class="text-sm text-gray-500">{{ path.description }}</p>
            </div>
          </div>

          <div class="flex items-center gap-3 mb-4">
            <UBadge
              :color="difficultyColor[path.difficulty] ?? 'neutral'"
              variant="subtle"
              size="sm"
            >
              {{ path.difficulty }}
            </UBadge>
            <span class="text-sm text-gray-400 flex items-center gap-1">
              <UIcon name="i-heroicons-clock" class="w-4 h-4" />
              {{ path.estimatedHours }}h
            </span>
          </div>

          <div class="mt-auto space-y-2">
            <div
              v-for="stage in path.stages"
              :key="stage.name"
              class="flex items-center gap-2 text-sm text-gray-500"
            >
              <UIcon name="i-heroicons-chevron-right" class="w-3 h-3 shrink-0 text-primary" />
              <span>{{ stage.name }}</span>
              <span class="text-gray-400 ml-auto">{{ stage.courses.length }} course{{ stage.courses.length !== 1 ? 's' : '' }}</span>
            </div>
          </div>
        </UCard>
      </NuxtLink>
    </div>

    <div v-else class="text-center py-20">
      <UIcon name="i-heroicons-academic-cap" class="w-16 h-16 mx-auto mb-4 text-gray-300" />
      <h2 class="text-2xl font-semibold text-gray-400 mb-2">No paths available yet</h2>
      <p class="text-gray-400">Learning paths are being created. Check back soon!</p>
    </div>
  </main>
</template>
