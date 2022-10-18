<!-- ./pages/blog/tags/[slug].vue -->

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content-edge/dist/runtime/types";
import { capitalize } from "../utils/format";
// get current route slug
const {
  params: { slug },
} = useRoute();

const category = String(slug).replaceAll("-", " ");

const query: QueryBuilderParams = {
  path: "/blog",
  only: ["title", "description", "tags", "_path", "img"],
  where: {
    category: {
      $contains: category,
    },
  },
  $sensitivity: "base",
};
console.log(category);

// get array of filters by generating array from separating slug`,`
/*  const filter = slug.split(""); */

// set meta for page
useHead({
  title: `${capitalize(category)} articles - ScireDev`,
  meta: [
    {
      name: "description",
      content: `article of the category ${category}`,
    },
  ],
});
</script>
<template>
  <main>
    <section class="container mx-auto">
      <div class="page-heading">
        <div class="wrapper">
          <h1 class="text-5xl font-extrabold">All articles {{ category }}</h1>
          <p class="font-medium text-lg">
            Here's a list of all my great articles
          </p>
        </div>
      </div>
      <!-- Render list of all articles in ./content/blog using `path` -->
      <!-- Provide only defined fieldsin the `:query` prop -->
      <ContentList :query="query">
        <!-- Default list slot -->
        <template v-slot="{ list }">
          <ul class="article-list">
            <li
              v-for="article in list"
              :key="article._path"
              class="article-item"
            >
              <NuxtLink :to="article._path">
                <div class="wrapper">
                  <div class="img-cont w-32">
                    <img
                      :src="`/${article.img}`"
                      :alt="article.title"
                      class="rounded-lg max-h-[8rem]"
                    />
                  </div>
                  <header>
                    <h1 class="text-2xl font-semibold">{{ article.title }}</h1>
                    <p>{{ article.description }}</p>
                    <ul class="article-tags">
                      <li class="tag" v-for="(tag, n) in article.tags" :key="n">
                        <NuxtLink :to="`/blog/tags/${tag}`" class="underline">
                          {{ tag }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </header>
                </div>
              </NuxtLink>
            </li>
          </ul>
        </template>
        <!-- Not found slot to display message when no content us is found -->
        <template #not-found>
          <p>No articles found.</p>
        </template>
      </ContentList>
    </section>
  </main>
</template>
