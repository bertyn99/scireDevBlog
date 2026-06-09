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
};

const goNext = () => {
  if (currentPage.value < Math.ceil((countArticle.value ?? 6) / 6)) {
    currentPage.value += 1;
  }
};

const goPrev = () => {
  currentPage.value -= 1;
};
const goTo = (id: number) => {
  currentPage.value = id;
};
</script>
<template>
  <HeroFeatured />
  <section class="container mx-auto py-10 px-0 sm:px-1 xl:px-8">
    <div class="flex justify-between px-2">
      <h2
        class="font-bold text-2xl relative before:block before:absolute before:-left-3 before:w-10 before:h-7 before:mt-3 before:bg-tertiary-default/20 before:-z-50">
        Latest Article
      </h2>

      <div>
        <ul class="flex gap-2 font-semibold text-primary-darken">
          <li class="cursor-pointer px-3 py-0.5 hover:text-secondary hover:bg-tertiary-default/50"
            @click="selectCat('road to basic')">
            Road to basic
          </li>
          <li class="cursor-pointer px-3 py-0.5 v hover:text-secondary hover:bg-tertiary-default/50"
            @click="selectCat('tips and advice')">
            Tips and advice
          </li>
          <li class="cursor-pointer px-3 py-0.5 hover:text-secondary hover:bg-tertiary-default/50"
            @click="selectCat('one on one')">
            Concept
          </li>
        </ul>
      </div>

      <div class="relative w-32">
        <input v-model="searchInput"
          class="absolute w-full bg-transparent border-b-2 border-primary-darken focus:outline-none"
          placeholder="Search..." @input="debouncedFn">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-5 h-5 absolute right-0 cursor-pointer hover:text-tertiary-default" @click="searchArticle">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
      </div>
    </div>

    <ul
      class="w-full max-w-screen-xl sm:px-3 md:px-5 grid grid-col-1 sm:grid-cols-2 xl:grid-cols-3 md:gap-4 align-center mx-auto my-8 items-center justify-center">
      <li v-for="article in articleList" :key="article.path" class="article">
        <ArticleCard :article="article" />
      </li>
    </ul>

    <ArticlePagination :total-page="nbPages" :current-page="currentPage" :next="goNext" :prev="goPrev" :to="goTo"
      offset />
  </section>
</template>
<style scoped></style>
