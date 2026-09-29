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
          :ui="paperBadgeUi"
          class="absolute -top-3 left-5 z-20"
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

    <div v-if="current" class="relative hidden min-h-[42rem] lg:block">
      <div class="absolute top-0 right-0 z-30 w-[28%]">
        <BlogMasthead class="mb-3" />
      </div>

      <div class="absolute top-[4.5rem] right-0 bottom-0 left-[70%] z-0 bg-secondary text-primary-default">
        <p class="border-l-4 border-tertiary-default py-3 pl-4 text-[15px] font-semibold">
          Popular Articles
        </p>
        <ul class="flex flex-col">
          <li v-for="article in popular" :key="articlePath(article)">
            <NuxtLink
              :to="articlePath(article)"
              class="group flex items-stretch gap-2.5 py-3.5 pr-3 pl-3 hover:bg-white/5"
            >
              <div class="relative h-20 w-[5.5rem] shrink-0 overflow-hidden bg-black">
                <nuxt-img
                  :src="article.image"
                  :alt="article.title"
                  format="webp"
                  sizes="md:140px lg:180px"
                  class="absolute inset-0 h-full w-full object-cover grayscale transition duration-300 group-hover:grayscale-0"
                />
              </div>
              <div class="flex min-w-0 flex-1 flex-col justify-center gap-1.5 py-0.5">
                <span class="text-[12px] leading-snug text-primary-default">
                  {{ truncate(article.description || article.title, 58) }}
                </span>
                <span v-if="minutes(article)" class="text-[11px] text-primary-darken">
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

      <div class="absolute top-5 bottom-14 left-[27%] z-10 w-[50%]">
        <div class="absolute inset-0 overflow-hidden">
          <nuxt-img
            :key="articlePath(current)"
            :src="current.image"
            :alt="current.title"
            format="webp"
            sizes="lg:720px xl:960px"
            class="absolute inset-0 h-full w-full object-cover grayscale"
          />
        </div>
        <UBadge
          color="neutral"
          variant="soft"
          size="sm"
          label="New Articles"
          :ui="paperBadgeUi"
          class="absolute top-5 left-[18%] z-20"
        />
      </div>

      <div class="relative z-20 flex min-h-[36rem] w-[36%] flex-col bg-white pt-10 pr-6 pb-24">
        <ArticleSlideData :key="articlePath(current)" :data="current" surface="paper" />
      </div>

      <UButton
        :to="articlePath(current)"
        color="primary"
        variant="solid"
        size="md"
        icon="i-heroicons-arrow-down-right-20-solid"
        label="Read More"
        :ui="squareUi"
        class="absolute bottom-[4.75rem] left-[35%] z-40"
      />

      <p class="absolute bottom-3 left-0 z-30 flex items-baseline leading-none text-secondary" aria-live="polite">
        <span class="text-[44px] font-semibold tabular-nums">{{ slide }}</span>
        <span class="text-[15px] text-primary-darken">/{{ news.length || 1 }}</span>
      </p>

      <div class="absolute bottom-0 left-[27%] z-30 flex h-14 w-[50%] items-center justify-end bg-secondary">
        <UButton
          square
          color="neutral"
          variant="outline"
          size="lg"
          icon="i-heroicons-chevron-left-20-solid"
          data-hero="prev"
          aria-label="Previous article"
          :ui="barSquareUi"
          @click="goPrev"
        />
        <UButton
          square
          color="neutral"
          variant="outline"
          size="lg"
          icon="i-heroicons-chevron-right-20-solid"
          data-hero="next"
          aria-label="Next article"
          :ui="barSquareUi"
          @click="goNext"
        />
        <div class="flex flex-1 items-center gap-1.5 px-5">
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

const squareUi = { base: "rounded-none" };
const paperSquareUi = { base: "rounded-none ring-0" };
const barSquareUi = { base: "rounded-none ring-0 size-14" };
const paperBadgeUi = { base: "rounded-none bg-default text-highlighted shadow-sm" };

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
