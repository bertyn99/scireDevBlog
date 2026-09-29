<template>
  <article class="absolute inset-0 flex h-full w-full bg-white">
    <div class="grid h-full w-full md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      <div class="relative z-10 flex flex-col justify-center bg-white px-5 py-6 sm:px-7 md:py-8">
        <p class="mb-4 inline-flex w-fit bg-white px-0 text-[12px] font-medium text-secondary">
          New Articles
        </p>
        <div class="flex items-center gap-2">
          <nuxt-img
            :src="getAuthorImg(data.author)"
            :alt="data.author"
            format="webp"
            sizes="32px"
            class="size-8 rounded-full object-cover"
          />
          <div class="flex flex-col leading-tight">
            <span class="text-[13px] font-semibold text-secondary">{{ data.author }}</span>
            <span class="text-[11px] text-primary-darken">Author</span>
          </div>
        </div>
        <h2 class="mt-4 max-w-[18ch] text-[26px] font-bold leading-[1.15] tracking-tight sm:text-[30px]">
          {{ capitalize(data.title) }}
        </h2>
        <p class="mt-3 inline-flex items-center gap-2 text-[12px] text-primary-darken">
          <span class="h-px w-8 bg-primary-darken" aria-hidden="true" />
          {{ data.category }}
        </p>
        <p class="mt-3 max-w-[42ch] text-[14px] leading-6 text-secondary/80">
          {{ truncate(data.description, 140) }}
        </p>
        <p class="mt-4 flex flex-wrap gap-4 text-[12px] text-primary-darken">
          <span v-if="minutes(data)">{{ minutes(data) }} min</span>
          <time :datetime="data.createdAt">{{ data.createdAt?.substring(2) || "" }}</time>
        </p>
        <NuxtLink
          :to="articlePath(data)"
          class="mt-5 inline-flex w-fit items-center gap-2 bg-tertiary-default px-3.5 py-2 text-[13px] font-medium text-white hover:bg-tertiary-darken active:scale-[0.98]"
        >
          Read more
        </NuxtLink>
      </div>

      <div class="relative min-h-[220px] overflow-hidden bg-secondary">
        <nuxt-img
          :src="data.image"
          format="webp"
          :alt="data.title"
          sizes="md:50vw lg:560px"
          class="absolute inset-0 h-full w-full object-cover grayscale"
        />
      </div>
    </div>
  </article>
</template>

<script setup>
import { capitalize, getAuthorImg, truncate } from "#shared/utils/format";

defineProps(["data"]);

function articlePath(article) {
  return article.path || article._path;
}

function minutes(article) {
  const value = article.readingTime?.minutes;
  if (!value) return null;
  return Math.max(1, Math.ceil(value));
}
</script>
