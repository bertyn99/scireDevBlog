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
  only: ["title", "description", "tags", "_path", "image"],
  where: {
    category: {
      $contains: category,
    },
  },
  $sensitivity: "base",
};
console.log(slug);

// get array of filters by generating array from separating slug`,`
/*  const filter = slug.split(""); */

// set meta for page
useHead({
  title: `${capitalize(category)} articles - ScireDev`,
  meta: [
    {
      name: "description",
      content: `Scire Dev - article of the category ${category}`,
    },
    ,
    {
      name: "robots",
      content: "follow, max-image-preview:large",
    },
    {
      property: "og:locale",
      content: "en-US",
    },
    {
      property: "og:title",
      content: `ScireDev - article of the category ${category}`,
    },
    {
      property: "og:type",
      content: "article",
    },
    ,
    {
      property: "og:site_name",
      content: "Scire Dev",
    },
  ],
});
</script>
<template>
  <main>
    <section class="container mx-auto md:px-14">
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
          <ul class="flex flex-col gap-6">
            <li
              v-for="article in list"
              :key="article._path"
              class="pt-6 first-of-type:border-none border-t border-slate-200"
            >
              <NuxtLink :to="article._path" class="no-underline">
                <article class="flex items-start gap-4">
                  <div class="img-cont w-36">
                    <img
                      :src="`/${article.image}`"
                      :alt="article.title"
                      class="h-full w-full object-cover rounded-lg max-h-[8rem]"
                    />
                  </div>
                  <header>
                    <h1 class="text-2xl font-semibold">{{ article.title }}</h1>
                    <p>{{ article.description }}</p>
                    <ul class="article-tags">
                      <li class="tag" v-for="(tag, n) in article.tags" :key="n">
                        <NuxtLink
                          :to="`/blog/tags/${tag}`"
                          class="no-underline bg-primary-darken px-1 py-0.5 inline-flex items-center rounded-md"
                        >
                          <span>{{ tag }}</span>
                        </NuxtLink>
                      </li>
                    </ul>
                  </header>
                </article>
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
