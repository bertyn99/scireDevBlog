<template>
  <section class="mx-auto w-full max-w-7xl px-4 pt-4 pb-2 sm:px-6 lg:px-8 lg:pt-6">
    <div class="lg:hidden">
      <BlogMasthead align="center" class="mb-6" />

      <article v-if="current" class="relative">
        <UBadge
          color="neutral"
          variant="soft"
          size="sm"
          label="New Articles"
          :ui="{ base: 'rounded-none bg-white text-highlighted' }"
          class="absolute -top-3 left-5 z-20 shadow-sm"
        />
        <span class="absolute top-0 right-0 z-20 h-1 w-11 bg-tertiary-default" aria-hidden="true" />

        <NuxtLink :to="articlePath(current)" class="relative block min-h-[28rem] overflow-hidden">
          <nuxt-img
            :src="current.image"
            :alt="current.title"
            format="webp"
            sizes="100vw"
            class="absolute inset-0 h-full w-full object-cover grayscale brightness-110"
          />
          <div class="absolute inset-0 bg-white/30" />
          <div class="relative z-10 flex min-h-[28rem] flex-col px-5 pb-5 pt-12">
            <ArticleSlideData :data="current" surface="photo" />
          </div>
        </NuxtLink>

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
                <span class="absolute right-2 bottom-2 grid size-8 place-items-center bg-primary text-white">
                  <UIcon name="i-heroicons-arrow-up-right-20-solid" class="size-4" />
                </span>
              </div>
              <span class="mt-2 block text-[13px] leading-snug text-primary-default">
                {{ truncate(article.description || article.title, 52) }}
              </span>
              <span v-if="minutes(article)" class="mt-1 block text-[11px] text-primary-darken">
                {{ minutes(article) }} min
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="current" class="relative hidden min-h-[38rem] lg:block">
      <div class="absolute top-0 right-0 z-30 w-[29%]">
        <BlogMasthead class="mb-4" />
      </div>

      <div class="absolute top-[4.75rem] right-0 bottom-0 left-[71%] z-0 bg-secondary text-primary-default">
        <p class="border-l-4 border-tertiary-default py-3 pl-5 text-[15px] font-semibold">
          Popular Articles
        </p>
        <ul class="flex flex-col">
          <li v-for="article in popular" :key="articlePath(article)">
            <NuxtLink
              :to="articlePath(article)"
              class="group flex items-stretch gap-3 px-4 py-3.5 hover:bg-white/5"
            >
              <div class="relative h-[4.75rem] w-[6.75rem] shrink-0 overflow-hidden bg-black">
                <nuxt-img
                  :src="article.image"
                  :alt="article.title"
                  format="webp"
                  sizes="md:160px lg:200px"
                  class="absolute inset-0 h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                />
              </div>
              <div class="flex min-w-0 flex-1 flex-col justify-center gap-2 py-0.5">
                <span class="text-[13px] leading-snug text-primary-default">
                  {{ truncate(article.description || article.title, 72) }}
                </span>
                <span v-if="minutes(article)" class="text-[12px] text-primary-darken">
                  {{ minutes(article) }} min
                </span>
              </div>
              <span
                class="grid size-8 shrink-0 place-items-center self-center ring ring-inset ring-white/25 text-white group-hover:bg-primary group-hover:ring-primary"
                aria-hidden="true"
              >
                <UIcon name="i-heroicons-arrow-up-right-20-solid" class="size-4" />
              </span>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <div class="absolute top-8 bottom-14 left-[40%] z-10 w-[31%]">
        <div class="absolute inset-0 overflow-hidden">
          <nuxt-img
            :key="articlePath(current)"
            :src="current.image"
            :alt="current.title"
            format="webp"
            sizes="lg:560px xl:720px"
            class="absolute inset-0 h-full w-full object-cover grayscale"
          />
        </div>
        <UBadge
          color="neutral"
          variant="soft"
          size="sm"
          label="New Articles"
          :ui="{ base: 'rounded-none bg-white text-highlighted' }"
          class="absolute top-5 left-[22%] z-20 shadow-sm"
        />
      </div>

      <UButton
        :to="articlePath(current)"
        color="primary"
        variant="solid"
        size="md"
        icon="i-heroicons-arrow-down-right-20-solid"
        label="Read More"
        :ui="{ base: 'rounded-none' }"
        class="absolute bottom-20 left-[32%] z-40"
      />

      <div class="relative z-20 flex min-h-[32rem] w-[40%] flex-col pt-10 pr-6 pb-20">
        <ArticleSlideData :key="articlePath(current)" :data="current" surface="paper" />
      </div>

      <p class="absolute bottom-3 left-0 z-30 flex items-baseline leading-none text-secondary" aria-live="polite">
        <span class="text-[44px] font-semibold tabular-nums">{{ slide }}</span>
        <span class="text-[15px] text-primary-darken">/{{ news.length || 1 }}</span>
      </p>

      <div class="absolute bottom-0 left-[40%] z-30 flex h-14 w-[31%] items-center justify-end bg-secondary">
        <UButton
          square
          color="neutral"
          variant="solid"
          size="lg"
          icon="i-heroicons-chevron-left-20-solid"
          data-hero="prev"
          aria-label="Previous article"
          :ui="{ base: 'rounded-none bg-white text-highlighted hover:bg-elevated' }"
          @click="goPrev"
        />
        <UButton
          square
          color="neutral"
          variant="solid"
          size="lg"
          icon="i-heroicons-chevron-right-20-solid"
          data-hero="next"
          aria-label="Next article"
          :ui="{ base: 'rounded-none bg-white text-highlighted hover:bg-elevated' }"
          @click="goNext"
        />
        <div class="flex items-center gap-1.5 px-4">
          <button
            v-for="index in news.length"
            :key="index"
            type="button"
            class="size-1.5"
            :class="index === slide ? 'bg-white' : 'bg-white/35'"
            :aria-label="`Go to article ${index}`"
            @click="goTo(index)"
          />
        </div>
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

function goTo(index) {
  slide.value = index;
}
</script>
