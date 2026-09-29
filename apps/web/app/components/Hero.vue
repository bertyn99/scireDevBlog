<template>
  <section class="mx-auto w-full max-w-7xl px-4 pt-4 pb-2 sm:px-6 lg:px-8 lg:pt-8">
    <!-- Mobile: Blog. first, overlay story, dark control bar, horizontal popular -->
    <div class="lg:hidden">
      <BlogMasthead class="mb-5 px-1" />

      <article v-if="current" class="relative overflow-hidden bg-secondary">
        <div class="relative min-h-[28rem]">
          <nuxt-img
            :src="current.image"
            :alt="current.title"
            format="webp"
            sizes="100vw"
            class="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/15" />
          <span class="absolute top-0 left-4 z-10 bg-white px-3 py-1.5 text-[11px] font-medium text-secondary shadow-sm">
            New Articles
          </span>
          <span class="absolute top-0 right-0 z-10 h-1.5 w-10 bg-tertiary-default" aria-hidden="true" />
          <NuxtLink
            :to="articlePath(current)"
            class="relative z-10 flex min-h-[28rem] flex-col justify-end px-5 pb-6 pt-14"
          >
            <ArticleSlideData :data="current" tone="mist" />
          </NuxtLink>
        </div>
        <Carrousel v-model="slide" :count="news.length" variant="mobile" />
      </article>

      <div class="bg-secondary px-4 py-5 text-primary-default">
        <p class="border-l-4 border-tertiary-default py-1 pl-4 text-[14px] font-semibold">
          Popular Articles
        </p>
        <ul class="mt-4 flex gap-3 overflow-x-auto pb-1">
          <li v-for="article in popular" :key="articlePath(article)" class="w-[11.5rem] shrink-0">
            <NuxtLink :to="articlePath(article)" class="group block">
              <div class="relative h-28 overflow-hidden bg-black">
                <nuxt-img
                  :src="article.image"
                  :alt="article.title"
                  format="webp"
                  sizes="200px"
                  class="absolute inset-0 h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                />
                <span class="absolute right-2 bottom-2 grid size-8 place-items-center bg-tertiary-default text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                  </svg>
                </span>
              </div>
              <span class="mt-2 block text-[13px] leading-snug text-primary-default">
                {{ truncate(article.title, 52) }}
              </span>
              <span v-if="minutes(article)" class="mt-1 block text-[11px] text-primary-darken">
                {{ minutes(article) }} min
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Desktop: overlapping text / photo / popular rail -->
    <div v-if="current" class="relative hidden lg:grid lg:grid-cols-12 lg:grid-rows-[minmax(30rem,1fr)_auto]">
      <div class="relative z-0 col-span-4 col-start-9 row-span-2 row-start-1 ml-[-2.75rem] flex flex-col">
        <BlogMasthead class="relative z-20 mb-4 pl-[2.75rem]" />
        <div class="flex min-h-0 flex-1 flex-col bg-secondary pl-[2.75rem] text-primary-default">
          <p class="border-l-4 border-tertiary-default py-3 pl-5 text-[15px] font-semibold">
            Popular Articles
          </p>
          <ul class="flex flex-1 flex-col">
            <li v-for="article in popular" :key="articlePath(article)" class="flex-1">
              <NuxtLink
                :to="articlePath(article)"
                class="group flex h-full items-stretch gap-3 px-4 py-3 hover:bg-white/5"
              >
                <div class="relative w-[42%] min-w-[6.5rem] overflow-hidden bg-black">
                  <nuxt-img
                    :src="article.image"
                    :alt="article.title"
                    format="webp"
                    sizes="md:160px lg:200px"
                    class="absolute inset-0 h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                  />
                </div>
                <div class="flex min-w-0 flex-1 flex-col justify-center gap-2 py-1">
                  <span class="text-[14px] leading-snug text-primary-default">
                    {{ truncate(article.title, 64) }}
                  </span>
                  <span v-if="minutes(article)" class="text-[12px] text-primary-darken">
                    {{ minutes(article) }} min
                  </span>
                </div>
                <span
                  class="mt-1 grid size-8 shrink-0 place-items-center self-center border border-white/25 text-white group-hover:border-tertiary-default group-hover:bg-tertiary-default"
                  aria-hidden="true"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
                  </svg>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="relative z-10 col-span-5 col-start-5 row-start-1 min-h-[30rem]">
        <nuxt-img
          :key="articlePath(current)"
          :src="current.image"
          :alt="current.title"
          format="webp"
          sizes="lg:520px xl:640px"
          class="absolute inset-0 h-full w-full object-cover grayscale"
        />
        <span class="absolute top-7 left-10 z-20 bg-white px-3 py-1.5 text-[12px] font-medium text-secondary shadow-sm">
          New Articles
        </span>
        <NuxtLink
          :to="articlePath(current)"
          class="absolute bottom-6 -left-3 z-30 inline-flex items-center gap-2 bg-tertiary-default px-3.5 py-2.5 text-[13px] font-medium text-white hover:bg-tertiary-darken"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
          </svg>
          Read More
        </NuxtLink>
      </div>

      <div class="relative z-20 col-span-5 col-start-1 row-start-1 mr-[-4.75rem] mt-12 mb-6 flex items-center bg-white px-8 py-8 xl:px-10">
        <ArticleSlideData :key="articlePath(current)" :data="current" tone="ink" />
      </div>

      <p class="relative z-20 col-span-4 col-start-1 row-start-2 flex items-end leading-none text-secondary" aria-live="polite">
        <span class="text-[44px] font-semibold tabular-nums">{{ slide }}</span>
        <span class="text-[15px] text-primary-darken">/{{ news.length || 1 }}</span>
      </p>

      <div class="relative z-10 col-span-5 col-start-5 row-start-2 flex items-stretch justify-end bg-secondary">
        <button
          type="button"
          class="grid size-12 place-items-center bg-white text-secondary hover:bg-primary-default"
          aria-label="Previous article"
          @click="goPrev"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <button
          type="button"
          class="grid size-12 place-items-center bg-white text-secondary hover:bg-primary-default"
          aria-label="Next article"
          @click="goNext"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { truncate } from "#shared/utils/format";

const { data } = await useAsyncData("blog-hero", async () => {
  const [popularArticles, newArticles] = await Promise.all([
    queryCollection("blog").order("createdAt", "ASC").limit(3).skip(3).all(),
    queryCollection("blog").order("createdAt", "DESC").limit(5).all(),
  ]);
  return { popularArticles, newArticles };
});

const popular = computed(() => data.value?.popularArticles ?? []);
const news = computed(() => data.value?.newArticles ?? []);
const slide = ref(1);
const current = computed(() => news.value[slide.value - 1] ?? news.value[0] ?? null);

function articlePath(article) {
  return article.path || article._path;
}

function minutes(article) {
  const value = article.readingTime?.minutes;
  if (!value) return null;
  return Math.max(1, Math.ceil(value));
}

function goNext() {
  if (!news.value.length) return;
  slide.value = slide.value >= news.value.length ? 1 : slide.value + 1;
}

function goPrev() {
  if (!news.value.length) return;
  slide.value = slide.value <= 1 ? news.value.length : slide.value - 1;
}
</script>
