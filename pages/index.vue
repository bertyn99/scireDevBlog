<!-- ./pages/blog/index.vue -->
<script setup>
import Social from "~~/components/section/Social.vue";
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
      property: "og:title",
      content:
        "ScireDev - your website to learn the web and mobile developpement",
    },
    {
      property: "og:site_name",
      content: "Scire Dev",
    },
  ],
});

/* useJsonld({
  "@context": "https://schema.org",
  "@type": "Article",
  name: "ScireDev",
  description:
    "Welcome to scireDev the website that share with you the key to become a better developper. Come learn with us",
}); */
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
          type="text"
          class="absolute w-full bg-transparent border-b-2 border-primary-darken"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 absolute right-0"
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
    <ContentList
      path="/"
      :query="{
        only: [
          'title',
          'description',
          'category',
          'author',
          'createdAt',
          'readingTime',
          'modifiedAt',
          'tags',
          '_path',
          'image',
          'excerpt',
        ],
      }"
    >
      <!-- Default list slot -->
      <template v-slot="{ list }">
        <ul
          class="w-full max-w-screen-xl sm:px-8 grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 align-center mx-auto my-8 items-center justify-center"
        >
          <li v-for="article in list" :key="article._path" class="article">
            <ArticleCard :article="article" />
          </li>
        </ul>
      </template>

      <!-- slot to display message when no content is found -->
      <template #not-found>
        <p>No articles found.</p>
      </template>
    </ContentList>
  </section>
  <SectionSocial></SectionSocial>
</template>
<style scoped></style>
