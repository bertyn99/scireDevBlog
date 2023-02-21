<!-- ./pages/blog/tags/[slug].vue -->

<script setup lang="ts">
import type { QueryBuilderParams } from "@nuxt/content-edge/dist/runtime/types";
import { capitalize } from "../utils/format";
// get current route slug
const {
  params: { slug },
} = useRoute();
const currentPage = ref(1);
const category = String(slug).replaceAll("-", " ");

/* const query: QueryBuilderParams = {
  path: "/blog",
  only: ["title", "description", "tags", "_path", "image"],
  sort: { createdAt: -1 },
  skip: (currentPage.value - 1) * 5,
  where: {
    category: {
      $contains: category,
    },
  },
  $sensitivity: "base",
}; */

const { data, refresh, pending } = await useAsyncData(category, async () => {
  const articles = queryContent()
    .where({
      category: {
        $contains: category,
      },
    })
    .only(["title", "description", "tags", "_path", "image"])
    .sort({ createdAt: -1 })
    .limit(6)
    .skip((currentPage.value - 1) * 6)
    .find();

  const countArticle = queryContent("/").only("title").where({
    category: {
      $contains: category,
    },
  }).find();
  return {
    articles: await articles,
    countArticle: (await countArticle).length,
  };
});

const nbPages = computed(() => Math.ceil(data.value!.countArticle / 6))
const goPrev = () => {
  currentPage.value -= 1;
};
const goTo = (id: number) => {
  currentPage.value = id;
};

const goNext = () => {
  if (currentPage.value < Math.ceil(5 / 5)) {
    currentPage.value += 1;
  }
};
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
      property: "og:description",
      content: `All articles of the category ${category}`,
    },
    {
      property: "og:type",
      content: "collections",
    },
    {
      property: "og:url",
      content: "https://www.sciredev.com/" + slug,
    },
    {
      property: "og:site_name",
      content: "Scire Dev",
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
      content: "https://www.sciredev.com/" + slug,
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
</script>
<template>
  <SchemaOrgWebPage />
  <main>
    <section class="container mx-auto md:px-14 pt-16">
      <div class="page-heading">
        <div class="wrapper">
          <h1 class="text-5xl font-extrabold">All articles {{ category }}</h1>
          <p class="font-medium text-lg mt-4">
            Here's a list of all my great articles
          </p>
        </div>
      </div>
      <!-- Render list of all articles in ./content/blog using `path` -->
      <!-- Provide only defined fieldsin the `:query` prop -->
      <div class="flex flex-col gap-8 my-6">
        <!-- Default list slot -->
        <ul class="h-full flex flex-col gap-6" v-if="data?.articles.length !== 0">
          <li v-for="article in data?.articles" :key="article._path"
            class="pt-4 first-of-type:border-none border-t border-slate-200">
            <NuxtLink :to="article._path" class="no-underline">
              <article class="flex flex-col md:flex-row px-4 items-start gap-4">
                <div class="relative w-full md:w-1/4 h-full max-h-64 rounded-lg overflow-hidden">
                  <nuxt-img format="webp" sizes="sm:90vw md:25vw lg:360px" :src="`/${article.image}`"
                    :alt="article.title" class="w-full h-full aspect-video object-cover" />
                </div>
                <header class="w-full md:w-3/4">
                  <h1 class="text-2xl font-bold">
                    {{ article.title }}
                  </h1>
                  <p class="text-normal">{{ article.description }}</p>
                  <ul class="flex gap-2 py-2">
                    <li class="tag" v-for="(tag, n) in article.tags" :key="n">
                      <NuxtLink :to="`/blog/tags/${tag}`"
                        class="no-underline bg-primary-darken text-slate-700 text-sm p-2 rounded-md transition-all !py-0.5 hover:-translate-y-0.5">
                        {{ tag }}
                      </NuxtLink>
                    </li>
                  </ul>
                </header>
              </article>
            </NuxtLink>
          </li>
        </ul>
        <template v-else>
          <p>No articles found.</p>
        </template>
        <!-- Not found slot to display message when no content us is found -->
        <!--   -->

        <ArticlePagination :total-page="nbPages" :current-page="currentPage" :next="goNext" :prev="goPrev" :to="goTo" />
      </div>
    </section>
  </main>
</template>
