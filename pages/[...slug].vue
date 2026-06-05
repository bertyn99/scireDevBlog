<!-- ./pages/blog/tags/[slug].vue -->

<script setup lang="ts">
import { capitalize } from "#shared/utils/format";
definePageMeta({
  /*   validate: async (route) => {
    // Check if the id is made up of digits
    return /^\d+$/.test(route.params.id)
  } */
});

// get current route slug
const {
  params: { slug },
} = useRoute();
const currentPage = ref(1);
// check if the slug is empty, if it is, throw 404 error
if (slug.length === 0 || slug === " ") {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

// check if the slug is include in array of categories
if (!["road-to-basic", "one-on-one", "tips-and-advice"].includes(slug[0])) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}
// get the category name from slug
const category = String(slug).replaceAll("-", " ");

const { data, refresh, pending } = await useAsyncData(category, async () => {
  const articles = queryCollection('blog')
    .select("title", "description", "tags", "path", "image")
    .where('category', 'LIKE', `%${category}%`)
    .order('createdAt', 'DESC')
    .limit(6)
    .offset((currentPage.value - 1) * 6)
    .all();

  const countQuery = queryCollection('blog')
    .select("title")
    .where('category', 'LIKE', `%${category}%`)
    .all();

  return {
    articles: await articles,
    countArticle: (await countQuery).length,
  };
});

const nbPages = computed(() => Math.ceil((data.value?.countArticle || 0) / 6));
const goPrev = () => {
  currentPage.value -= 1;
};
const goTo = (id: number) => {
  currentPage.value = id;
};

const goNext = () => {
  if (currentPage.value < Math.ceil((data.value?.countArticle || 0) / 6)) {
    currentPage.value += 1;
  }
};

const site = useSiteConfig();
useSeoMeta({
  title: `${capitalize(category)} articles - ${site.name}`,
  ogTitle: `${site.name} - articles of the category ${capitalize(category)}`,
  description: `Scire Dev - article of the category ${capitalize(category)}`,
  ogDescription: `All articles of the category ${capitalize(category)}`,
  ogImage: `${site.url}/img/scire_logo_primary.png`,
  ogUrl: `${site.url}/${slug}`,
  twitterCard: "summary_large_image",
  robots: "follow, max-image-preview:large",
});
useSchemaOrg([defineWebPage()]);
</script>
<template>
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
      <div class="flex flex-col gap-8 my-6">
        <ul
          class="h-full flex flex-col gap-6"
          v-if="data?.articles.length !== 0"
        >
          <li
            v-for="article in data?.articles"
            :key="article.path"
            class="pt-4 first-of-type:border-none border-t border-slate-200"
          >
            <NuxtLink :to="article.path" class="no-underline">
              <article class="flex flex-col md:flex-row px-4 items-start gap-4">
                <div
                  class="relative w-full md:w-1/4 h-full max-h-64 rounded-lg overflow-hidden"
                >
                  <nuxt-img
                    format="webp"
                    sizes="sm:90vw md:25vw lg:360px"
                    :src="`/${article.image}`"
                    :alt="article.title"
                    class="w-full h-full aspect-video object-cover"
                  />
                </div>
                <header class="w-full md:w-3/4">
                  <h1 class="text-2xl font-bold">
                    {{ article.title }}
                  </h1>
                  <p class="text-normal">{{ article.description }}</p>
                  <ul class="flex gap-2 py-2">
                    <li class="tag" v-for="(tag, n) in article.tags" :key="n">
                      <NuxtLink
                        :to="`/blog/tags/${tag}`"
                        class="no-underline bg-primary-darken text-slate-700 text-sm p-2 rounded-md transition-all !py-0.5 hover:-translate-y-0.5"
                      >
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

        <ArticlePagination
          :total-page="nbPages"
          :current-page="currentPage"
          :next="goNext"
          :prev="goPrev"
          :to="goTo"
        />
      </div>
    </section>
  </main>
</template>
