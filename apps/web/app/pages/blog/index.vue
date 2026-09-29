<!-- eslint-disable vue/no-multiple-template-root -->
<!-- ./pages/blog/index.vue -->
<script setup lang="ts">
import { useDebounceFn } from "@vueuse/core";
definePageMeta({
  layout: "blog",
});
const site = useSiteConfig();
useSeoMeta(
  useLoadMeta({
    title: "Home",
    description: "your website to learn the web and mobile development",
    image: `${site.url}/img/scire_logo_primary.png`,
    url: site.url,
  })
);
useHead({
  link: [
    {
      rel: "canonical",
      href: site.url,
    },
  ],
});
useSchemaOrg([defineWebPage()]);
const currentPage = ref(1);
const searchInput = ref<string>("");
const category = ref<string>("");
const buildArticleQuery = () => {
  let query = queryCollection("blog").select(
    "title",
    "description",
    "category",
    "author",
    "createdAt",
    "modifiedAt",
    "tags",
    "path",
    "image",
  );

  if (category.value) {
    query = query.where("category", "LIKE", `%${category.value}%`);
  }

  if (searchInput.value) {
    query = query.where("title", "LIKE", `%${searchInput.value}%`);
  }

  return query;
};

const { data: articleList, refresh } = await useAsyncData("article-list", async () =>
  buildArticleQuery()
    .order("createdAt", "DESC")
    .limit(6)
    .skip((currentPage.value - 1) * 6)
    .all()
);

const { data: countArticle, refresh: refreshCount } = await useAsyncData("article-count", async () =>
  buildArticleQuery().count());

const nbPages = computed(() => Math.ceil((countArticle.value ?? 6) / 6));
watch([currentPage], () => {
  refresh();
  refreshCount();
});

watch([category], () => {
  refresh();
  refreshCount();
});

const searchArticle = () => {
  refresh();
  refreshCount();
};
const debouncedFn = useDebounceFn(() => {
  searchArticle();
}, 600);

const selectCat = (cat: string) => {
  category.value = cat;
  currentPage.value = 1;
};

const categories = [
  { id: "", label: "All" },
  { id: "road to basic", label: "Road to basic" },
  { id: "tips and advice", label: "Tips and advice" },
  { id: "one on one", label: "Concept" },
];

const goNext = () => {
  if (currentPage.value < Math.ceil((countArticle.value ?? 6) / 6)) {
    currentPage.value += 1;
  }
};

const goPrev = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1;
  }
};
const goTo = (id: number) => {
  currentPage.value = id;
};
</script>
<template>
  <section class="container mx-auto px-4 py-10 sm:px-6 xl:px-8">
    <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <h2 class="relative w-fit text-2xl font-bold tracking-tight">
        <span
          class="pointer-events-none absolute inset-x-0 bottom-1 h-3 bg-tertiary-default/25"
          aria-hidden="true"
        />
        <span class="relative">Latest Articles</span>
      </h2>

      <ul class="flex flex-wrap items-center gap-1 text-[14px] font-medium text-secondary">
        <li
          v-for="item in categories"
          :key="item.id"
        >
          <button
            type="button"
            class="px-3 py-1"
            :class="category === item.id
              ? 'text-secondary underline decoration-tertiary-default decoration-2 underline-offset-8'
              : 'text-primary-darken hover:text-secondary'"
            @click="selectCat(item.id)"
          >
            {{ item.label }}
          </button>
        </li>
      </ul>

      <div class="relative w-full max-w-48">
        <label class="sr-only" for="blog-search">Search articles</label>
        <input
          id="blog-search"
          v-model="searchInput"
          class="w-full border-b border-secondary bg-transparent py-1 pr-8 text-[14px] outline-none placeholder:text-primary-darken"
          placeholder="Search"
          @input="debouncedFn"
        >
        <button
          type="button"
          class="absolute right-0 top-1/2 -translate-y-1/2 text-secondary hover:text-tertiary-default"
          aria-label="Search"
          @click="searchArticle"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
    </div>

    <ul class="mx-auto my-8 grid w-full max-w-screen-xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
      <li v-for="article in articleList" :key="article.path" class="article">
        <ArticleCard :article="article" />
      </li>
    </ul>

    <ArticlePagination
      :total-page="nbPages"
      :current-page="currentPage"
      :next="goNext"
      :prev="goPrev"
      :to="goTo"
    />
  </section>
</template>

