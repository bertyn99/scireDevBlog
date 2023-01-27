<template>
  <div class="absolute flex h-full w-full">
    <div class="h-[475px] w-full relative sm:h-full group">
      <span class="absolute sm:hidden bg-white p-3 -top-7 z-30"
        >New Articldes</span
      >

      <img
        :src="data.image"
        :alt="data.title"
        class="absolute w-full h-full object-fill z-0 group-hover:grayscale-0"
      />
      <!-- <span class="hidden sm:block absolute bg-gray-800 text-white p-3  z-10">New Articles</span> -->
      <NuxtLink
        class="hidden sm:inline-flex absolute p-4 z-20 -left-5 bottom-10 items-center gap-2 bg-tertiary-default text-white group-hover:bg-tertiary-darken drop-shadow-sm"
        :to="data._path"
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
        <span class="capitalize">Read More</span>
      </NuxtLink>
      <div
        class="sm:hidden absolute w-full h-full bg-secondary/60 z-20 text-white pt-6 pb-2"
      >
        <div class="w-[90%] mx-auto min-w-[190px]">
          <div class="mt-8">
            <div class="flex items-center">
              <div class="relative overflow-hidden rounded-full h-8 w-8">
                <img
                  :src="getAuthorImg(data.author)"
                  :alt="`image de profile ${data.author}`"
                  class="absolute w-full object-cover h-full"
                />
              </div>
              <div class="ml-2 flex flex-col">
                <span class="text-primary-default text-sm font-semibold">{{
                  data.author
                }}</span>
                <span class="text-primary-darken text-xs">Author</span>
              </div>
            </div>
          </div>

          <div class="w-full h-16 ml-2 mt-6 relative">
            <h3 class="absolute w-full z-10 text-2xl font-bold">
              {{ data.title }}
            </h3>
          </div>
          <span
            class="my-6 before:block before:content-[''] before:mx-2 before:w-20 before:h-0.5 before:bg-white inline-flex text-white items-center text-sm"
          >
            {{ data.category }}
          </span>
          <p class="mb-8 text-primary-default px-2">
            {{ truncate(data.description, 220) }}
          </p>
          <div class="flex gap-8 px-2">
            <span
              class="inline-flex items-center gap-1 text-sm text-primary-default"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-white"
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
              20</span
            >
            <span
              class="inline-flex items-center gap-1 text-sm text-primary-default"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ Math.ceil(data.readingTime.minutes) }}
              <span class="text-xs">min</span></span
            >
            <span
              class="inline-flex items-center gap-1 text-sm text-primary-default"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                />
              </svg>
              <time itemprop="datePublished" :datetime="data.createdAt">{{
                data.createdAt.substring(2)
              }}</time></span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { capitalize, getAuthorImg, truncate } from "@/utils/format";

const props = defineProps(["data"]);
</script>
