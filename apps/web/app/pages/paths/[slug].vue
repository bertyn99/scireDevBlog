<script setup lang="ts">
const route = useRoute()
const site = useSiteConfig()
const slug = route.params.slug as string

const { data: path } = await useAsyncData(`path-${slug}`, () =>
  queryCollection('paths')
    .where('_path', '=', `/paths/${slug}`)
    .first(),
)

if (!path.value) {
  throw createError({ statusCode: 404, statusMessage: 'Path Not Found' })
}

useSeoMeta(
  useLoadMeta({
    title: path.value.title,
    description: path.value.description,
    image: `${site.url}/img/scire_logo_primary.png`,
    url: `${site.url}/paths/${slug}`,
  }),
)

useHead({
  link: [{ rel: 'canonical', href: `${site.url}/paths/${slug}` }],
})

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Paths', item: '/paths' },
      { name: path.value.title || '', item: `/paths/${slug}` },
    ],
  }),
  defineWebPage(),
])

const difficultyColor: Record<string, string> = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'error',
}
</script>

<template>
  <main v-if="path" class="max-w-4xl mx-auto px-4 py-12">
    <!-- Header -->
    <header class="mb-12">
      <NuxtLink
        to="/paths"
        class="text-sm text-gray-400 hover:text-primary mb-4 inline-block"
      >
        ← Back to Paths
      </NuxtLink>

      <h1 class="text-4xl font-bold mb-3">{{ path.title }}</h1>
      <p class="text-lg text-gray-500 mb-6">{{ path.description }}</p>

      <div class="flex items-center gap-4">
        <UBadge
          :color="difficultyColor[path.difficulty] ?? 'neutral'"
          variant="subtle"
        >
          {{ path.difficulty }}
        </UBadge>
        <span class="text-sm text-gray-400 flex items-center gap-1">
          <UIcon name="i-heroicons-clock" class="w-4 h-4" />
          {{ path.estimatedHours }} hours
        </span>
        <span class="text-sm text-gray-400 flex items-center gap-1">
          <UIcon name="i-heroicons-rectangle-stack" class="w-4 h-4" />
          {{ path.stages.length }} stage{{ path.stages.length !== 1 ? 's' : '' }}
        </span>
      </div>
    </header>

    <!-- Timeline -->
    <section>
      <h2 class="text-2xl font-bold mb-8">Learning Journey</h2>

      <div class="relative">
        <!-- Vertical line -->
        <div class="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

        <div class="space-y-10">
          <article
            v-for="(stage, index) in path.stages"
            :key="stage.name"
            class="relative pl-14"
          >
            <!-- Timeline dot -->
            <div
              class="absolute left-3 top-1 w-5 h-5 rounded-full border-2 border-primary bg-white dark:bg-gray-900 flex items-center justify-center"
            >
              <span class="text-xs font-bold text-primary">{{ index + 1 }}</span>
            </div>

            <div>
              <h3 class="text-xl font-semibold mb-1">{{ stage.name }}</h3>
              <p v-if="stage.description" class="text-sm text-gray-500 mb-4">
                {{ stage.description }}
              </p>

              <div class="space-y-2">
                <div
                  v-for="course in stage.courses"
                  :key="course"
                  class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors"
                >
                  <UIcon name="i-heroicons-book-open" class="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <NuxtLink
                      :to="`/courses/${course}`"
                      class="font-medium hover:text-primary transition-colors"
                    >
                      {{ course }}
                    </NuxtLink>
                    <p class="text-xs text-gray-400">Course</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Content body from markdown -->
    <section v-if="path.body" class="mt-12 pt-8 border-t">
      <ContentRenderer :value="path" />
    </section>
  </main>
</template>
