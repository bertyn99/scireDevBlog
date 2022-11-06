<script setup>
import { capitalize, getAuthorImg } from "@/utils/format";
const props = defineProps(["article"]);
console.log(props.article?.image);
</script>

<template>
  <article class="w-full p-2.5 max-w-md max-h-[465px] group hover:bg-white">
    <div class="relative h-[230px]">
      <img
        class="w-full h-full grayscale group-hover:grayscale-0"
        :src="article?.image"
      />
      <NuxtLink
        class="absolute right-5 -bottom-5 p-4 inline-flex bg-black text-white group-hover:bg-tertiary-default"
        :to="article._path"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
          />
        </svg>
      </NuxtLink>
    </div>
    <div class="py-2 flex items-center gap-2">
      <img
        class="w-7 h-7 rounded-full object-cover"
        :src="getAuthorImg(article.author)"
        :alt="`image de profile ${article.author}`"
      />
      <span class="font-medium text-secondary/60">{{ article?.author }}</span>
    </div>
    <h3 class="font-bold text-lg">{{ article?.title }}</h3>
    <span
      class="my-3 before:block before:content-[''] before:mx-2 before:w-10 before:h-0.5 before:bg-primary-darken inline-flex text-primary-darken items-center text-xs"
    >
      {{ article?.category }}
    </span>
    <p class="text-sm text-secondary/60 mb-3">{{ article?.description }}</p>
    <div class="flex gap-8">
      <span class="inline-flex items-center gap-1 text-sm text-primary-darken"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 text-secondary"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        200</span
      >
      <span class="inline-flex items-center gap-1 text-sm text-primary-darken"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 text-secondary"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        200</span
      >
      <span class="inline-flex items-center gap-1 text-sm text-primary-darken"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-4 h-4 text-secondary"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
          />
        </svg>
        200</span
      >
    </div>
  </article>
</template>
