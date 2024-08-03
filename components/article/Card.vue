<script setup>
import { capitalize, getAuthorImg, truncate } from "@/utils/format";
defineProps(["article"]);
</script>

<template>
  <NuxtLink :to="article._path" aria-label="Read full article about {{ article?.title }}"
    class="group block w-full p-4 max-w-md hover:bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out">
    <article class="w-full">
      <div class="relative h-[230px] rounded-lg overflow-hidden">
        <nuxt-img class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          format="webp" sizes="sm:70vw md:30vw lg:330px" :src="article?.image" loading="lazy"
          alt="Image for {{ article?.title }}" />
        <div
          class="absolute right-4 bottom-4 p-2 inline-flex bg-black text-white group-hover:bg-tertiary-default rounded-full transition-colors duration-300"
          aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
          </svg>
        </div>
      </div>
      <div class="py-2 flex items-center gap-2">
        <nuxt-img loading="lazy" class="w-8 h-8 rounded-full object-cover" :src="getAuthorImg(article?.author)"
          :alt="`Profile image of ${article?.author}`" format="webp" sizes="sm:32px md:36px" />
        <span class="font-medium text-secondary/80">{{ article?.author }}</span>
      </div>
      <h3 class="font-bold text-xl leading-snug mt-2 mb-1">
        {{ capitalize(article?.title) }}
      </h3>
      <span class="my-2 inline-flex items-center text-xs text-primary-darken">
        <span class="block w-10 h-0.5 bg-primary-darken mr-2"></span>
        {{ article?.category }}
      </span>
      <p class="text-sm text-secondary/80 mb-3">
        {{ truncate(article?.description, 122) }}
      </p>
      <div class="flex gap-4 text-sm text-primary-darken">
        <span class="inline-flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-4 h-4 text-secondary">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ Math.ceil(article.readingTime.minutes) }}
          <span class="text-xs">Min</span>
        </span>
        <span class="inline-flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-4 h-4 text-secondary">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
          </svg>
          <time itemprop="datePublished" :datetime="article.createdAt">
            {{ article?.createdAt?.substring(2) || "" }}
          </time>
        </span>
      </div>
    </article>
  </NuxtLink>
</template>
