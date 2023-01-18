<!-- ./pages/blog/index.vue -->
<script setup lang="ts">
import Social from "~~/components/section/Social.vue";
import { useDebounceFn } from "@vueuse/core";
import type { QueryBuilderParams } from "@nuxt/content/dist/runtime/types";
definePageMeta({
  layout: "blog",
});

// set meta for page
useHead({
  title: "ScireDev - your website to learn the web and mobile developpement",
  meta: [
    {
      name: "description",
      content:
        "Welcome to scireDev the website that share with you the key to become a better developper. Come learn with us",
    },
    {
      name: "robots",
      content: "index, follow, max-image-preview:large",
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      property: "og:locale",
      content: "en-US",
    },

    {
      property: "og:url",
      content: "https://www.sciredev.com/",
    },
    {
      property: "og:site_name",
      content: "Scire Dev",
    },
    {
      property: "og:title",
      content:
        "ScireDev - your website to learn the web and mobile developpement",
    },
    {
      property: "og:description",
      content:
        "Welcome to scireDev the website that share with you the key to become a better developper. Come learn with us",
    },
    {
      property: "og:image",
      content: "https://www.sciredev.com/img/scire_logo_primary.png",
    },

    //twitter
    {
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      property: "twitter:url",
      content: "https://www.sciredev.com/",
    },
    {
      property: "twitter:title",
      content:
        "ScireDev - your website to learn the web and mobile developpement",
    },
    {
      property: "twitter:description",
      content:
        "Welcome to scireDev the website that share with you the key to become a better developper. Come learn with us",
    },
    {
      property: "twitter:image",
      content: "https://www.sciredev.com/img/scire_logo_primary.png",
    },
  ],
});
const currentPage = ref(1);
const searchInput = ref<string>("");

const query = ref<QueryBuilderParams>({
  where: { title: { $regex: `/${searchInput.value}how/ig` } },
  only: [
    "title",
    "description",
    "category",
    "author",
    "createdAt",
    "readingTime",
    "modifiedAt",
    "tags",
    "_path",
    "image",
    "excerpt",
  ],
  sort: { createdAt: -1 },
});
const { data, refresh } = await useAsyncData("homepage", async () => {
  const articles = queryContent()
    .where({ title: { $regex: `/${searchInput.value}/ig` } })
    .only([
      "title",
      "description",
      "category",
      "author",
      "createdAt",
      "readingTime",
      "modifiedAt",
      "tags",
      "_path",
      "image",
      "excerpt",
    ])
    .sort({ createdAt: -1 })
    .limit(6)
    .skip((currentPage.value - 1) * 6)
    .find();

  const countArticle = queryContent("/").only("title").find();
  return {
    articles: await articles,
    countArticle: (await countArticle).length,
  };
});

watch([currentPage], () => {
  refresh();
  console.log(currentPage.value);
});

const searchArticle = () => {
  refresh();
};
const debouncedFn = useDebounceFn(() => {
  searchArticle();
}, 600);

const goNext = () => {
  if (currentPage.value < Math.ceil(data!.value!.countArticle / 6)) {
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
  <SchemaOrgWebPage />
  <SchemaOrgBreadcrumb :itemListElement="[{ name: 'Home', item: '/' }]" />
  <section class="container mx-auto py-8 px-0 lg:px-9">
    <div class="flex justify-between px-2">
      <h2
        class="font-bold text-2xl relative before:block before:absolute before:-left-3 before:w-10 before:h-7 before:mt-3 before:bg-tertiary-default/20 before:-z-50"
      >
        Latest Article
      </h2>

      <div class="relative w-32">
        <input
          v-model="searchInput"
          @input="debouncedFn"
          class="absolute w-full bg-transparent border-b-2 border-primary-darken focus:outline-none"
          placeholder="Search..."
        />
        <svg
          @click="searchArticle"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 absolute right-0 cursor-pointer hover:text-tertiary-default"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
    </div>
    <!-- Render list of all articles in ./content/blog using `path` -->
    <!-- Provide only defined fields in the `:query` prop -->
    <!--     <ContentList path="/" :query="query"> -->
    <!-- Default list slot -->

    <ul
      class="w-full max-w-screen-xl sm:px-8 grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 align-center mx-auto my-8 items-center justify-center"
    >
      <li
        v-for="article in data?.articles"
        :key="article._path"
        class="article"
      >
        <ArticleCard :article="article" />
      </li>
    </ul>

    <!-- slot to display message when no content is found -->
    <!--   <template #not-found>
      <p>No articles found.</p>
    </template> -->
    <!--  </ContentList> -->
    <ArticlePagination
      :total-page="2"
      :current-page="currentPage"
      :next="goNext"
      :prev="goPrev"
      :to="goTo"
    />
  </section>
  <SectionSocial></SectionSocial>
</template>
<style scoped></style>
