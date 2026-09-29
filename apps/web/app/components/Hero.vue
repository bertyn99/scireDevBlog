<template>
  <section class="mx-auto w-full max-w-7xl px-4 pt-6 pb-2 sm:px-6 lg:px-8">
    <div class="grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.85fr)] lg:items-stretch">
      <Carrousel v-if="news.length" v-slot="{ currentSlide }" :count="news.length">
        <CarrouselSlide v-for="(slide, index) in news" :key="articlePath(slide)">
          <ArticleSlideData
            v-show="currentSlide === index + 1"
            :data="slide"
          />
        </CarrouselSlide>
      </Carrousel>

      <div class="flex min-h-0 flex-col">
        <div class="mb-4 flex items-end lg:mb-5">
          <h1 class="relative text-[42px] font-bold leading-none tracking-tight text-secondary sm:text-5xl">
            <span
              class="pointer-events-none absolute -left-1 bottom-1 h-3 w-[4.6rem] bg-tertiary-default/35"
              aria-hidden="true"
            />
            <span class="relative">Blog.</span>
          </h1>
        </div>

        <div class="flex min-h-0 flex-1 flex-col bg-secondary text-primary-default">
          <p class="border-l-4 border-tertiary-default py-3 pl-5 text-[15px] font-semibold">
            Popular Articles
          </p>
          <ul class="flex flex-1 flex-col">
            <li v-for="article in popular" :key="articlePath(article)" class="flex-1">
              <NuxtLink
                :to="articlePath(article)"
                class="group flex h-full items-stretch gap-3 px-4 py-3 hover:bg-white/5"
              >
                <div class="relative w-[42%] min-w-[7.5rem] overflow-hidden">
                  <nuxt-img
                    :src="article.image"
                    :alt="article.title"
                    format="webp"
                    sizes="md:180px lg:220px"
                    class="absolute inset-0 h-full w-full object-cover grayscale"
                  />
                </div>
                <div class="flex min-w-0 flex-1 flex-col justify-center gap-2 py-1">
                  <span class="text-[14px] font-medium leading-snug text-primary-default">
                    {{ truncate(article.title, 72) }}
                  </span>
                  <span v-if="minutes(article)" class="text-[12px] text-primary-darken">
                    {{ minutes(article) }} min
                  </span>
                </div>
                <span
                  class="mt-1 grid size-8 shrink-0 place-items-center self-center bg-black text-white group-hover:bg-tertiary-default"
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
    </div>
  </section>
</template>

<script setup>
import { truncate } from "#shared/utils/format";

const { data } = await useAsyncData("blog-hero", async () => {
  const [popularArticles, newArticles] = await Promise.all([
    queryCollection("blog").order("createdAt", "ASC").limit(2).skip(3).all(),
    queryCollection("blog").order("createdAt", "DESC").limit(5).all(),
  ]);
  return { popularArticles, newArticles };
});

const popular = computed(() => data.value?.popularArticles ?? []);
const news = computed(() => data.value?.newArticles ?? []);

function articlePath(article) {
  return article.path || article._path;
}

function minutes(article) {
  const value = article.readingTime?.minutes;
  if (!value) return null;
  return Math.max(1, Math.ceil(value));
}
</script>
