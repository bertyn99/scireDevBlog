<!-- ./pages/blog/[�slug.vue] -->
<script setup>
import { capitalize } from "#shared/utils/format";
definePageMeta({
  middleware: "broken-link-redirection",
});
const { path } = useRoute();

//remove last slash from the path
const cleanPath = path.replace(/\/$/, "");

const { data } = await useAsyncData(`content-${cleanPath}`, async () => {
  // fetch document where the document path matches with the current route
  let article = queryCollection('blog').path(cleanPath).first();
  // get the surround information,
  // which is an array of documents that come before and after the current document
  let surround = queryCollectionItemSurroundings('blog', cleanPath, {
    fields: ["path", "title", "description"]
  });

  return {
    article: await article,
    surround: await surround,
  };
});

// destrucure `prev` and `next` value from data
const [prev, next] = data.value.surround;
// set the meta
const site = useSiteConfig();
useSeoMeta(
  useLoadMeta({
    title: capitalize(data.value.article.title),
    description: data.value.article.description,
    image: `${site.url}${data.value.article.image}`,
    url: `${site.url}${path}`,
    author: data.value.article.author,
    datePublished: data.value.article.createdAt,
    dateModified: data.value.article.modifiedAt,
  })
);
useHead({
  link: [
    {
      rel: "canonical",
      href: `${site.url}${path}`,
    },
  ],
});
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: 'Home', item: '/' },
      { name: 'Blog', item: '/blog' },
      { name: data.value.article.title || '', item: path },
    ],
  }),
  defineArticle({
    headline: data.value.article.title,
    description: data.value.article.description,
    image: `${site.url}${data.value.article.image}`,
    datePublished: data.value.article.createdAt,
    dateModified: data.value.article.modifiedAt,
    author: { name: data.value.article.author || '' },
  }),
]);
</script>
<template>

  <main id="main" class="p-4 max-w-5xl mx-auto mt-10">
    <header v-if="data.article.title" class="p-4 pb-12">
      <div class="h-[34vh] sm:h-[46vh] md:h-[58vh] w-full rounded-2xl overflow-hidden">
        <nuxt-img :src="`/${data.article.image}`" :alt="data.article.title" sizes="sm:100vw md:70vw lg:800px"
          format="webp" class="w-full h-full object-cover md:object-fill aspect-video" />
      </div>
      <h1 class="font-extrabold text-3xl sm:text-4xl md:text-5xl my-3">
        {{ capitalize(data.article.title) }}
      </h1>

      <ul class="flex gap-4">
        <li class="bg-slate-500 px-2 py-0.5 rounded-md font-medium text-gray-300" v-for="(tag, n) in data.article.tags"
          :key="n">
          {{ tag }}
        </li>
      </ul>
      <p class="mt-2 text-primary-darken">
        Modified at
        <time itemprop="dateModified" datetime="data.article.modifiedAt">{{
          data.article.modifiedAt
        }}</time>
      </p>
    </header>

    <hr />

    <section class="grid grid-cols-8">
      <aside class="col-span-full md:col-span-2 row-start-1 w-full pt-14" v-if="data.article.body?.toc?.links">
        <!-- Toc Component -->
        <Toc :links="data.article.body.toc.links" />
      </aside>
      <article
        class="col-span-full md:col-span-6 md:col-start-1 md:row-start-1 prose prose-primary dark:prose-invert w-full p-4 max-w-3xl m-auto">
        <ContentRenderer v-if="data.article" :value="data.article" />
        <div v-else>
          <h1>Article not found</h1>
          <NuxtLink to="/">Back Home</NuxtLink>
        </div>

      </article>
    </section>
    <!-- PrevNext Component -->
    <NavPrevNext :prev="prev" :next="next" />
  </main>
</template>
<style scoped></style>
