<!-- ./pages/blog/[…slug.vue] -->
<script setup>
import { getAuthorImg, capitalize } from "@/utils/format";
definePageMeta({
  middleware: "broken-link-redirection",
});
const { path } = useRoute();

const { data } = await useAsyncData(`content-${path}`, async () => {
  // fetch document where the document path matches with the cuurent route
  let article = queryContent().where({ _path: path }).findOne();
  // get the surround information,
  // which is an array of documeents that come before and after the current document
  let surround = queryContent()
    .only(["_path", "title", "description"])
    .sort({ date: 1 })
    .findSurround(path);

  return {
    article: await article,
    surround: await surround,
  };
});

// destrucure `prev` and `next` value from data
const [prev, next] = data.value.surround;
// set the meta
useHead({
  title: capitalize(data.value.article.title),
  meta: [
    { name: "description", content: data.value.article.description },
    ,
    {
      name: "robots",
      content: "index, follow, max-image-preview:large",
    },
    {
      name: "author",
      content: data.value.article.author,
    },
    {
      name: "article:datePublished",
      content: data.value.article.createdAt,
    },
    {
      name: "article:dateModified",
      content: data.value.article.modifiedAt,
    },
    {
      name: "og:type",
      content: "article",
    },
    {
      property: "og:locale",
      content: "en-US",
    },

    {
      property: "og:url",
      content: "https://www.sciredev.com" + path,
    },
    {
      property: "og:title",
      content: "ScireDev - " + data.value.article.title,
    },
    {
      property: "og:site_name",
      content: "Scire Dev",
    },

    {
      property: "og:author",
      content: data.value.article.author,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: `https://sciredev.com/${data.value.article.image}`,
    },
  ],
});

/* useJsonld({
  "@context": "https://schema.org",
  "@type": "Article",
  name: "ScireDev",
  description:
    "Welcome to scireDev the website that share with you the key to become a better developper. Come learn with us",
  author: {
    "@type": "Person",
    name: data.value.article.author,
  },
}); */
</script>
<template>
  <SchemaOrgBreadcrumb
    :itemListElement="[
      { name: 'Home', item: '/' },
      { name: 'Blog', item: '/blog' },
      { name: data.article.title, item: path },
    ]"
  />
  <SchemaOrgArticle
    type="TechArticle"
    :datePublished="data.article.createdAt"
    :dateModified="data.article.modifiedAt"
    :author="{
      name: data.article.author,
      image: getAuthorImg(data.article.author),
    }"
  />

  <main id="main" class="p-4 max-w-5xl mx-auto mt-6">
    <header v-if="data.article.title" class="p-4 pb-12">
      <div class="h-72 w-full">
        <nuxt-img
          :src="`/${data.article.image}`"
          :alt="data.article.title"
          class="w-full h-full object-fill rounded-2xl"
        />
      </div>
      <h1 class="font-extrabold text-5xl my-3">{{ data.article.title }}</h1>

      <ul class="flex gap-4">
        <li
          class="bg-slate-500 px-2 py-0.5 rounded-md font-medium text-gray-300"
          v-for="(tag, n) in data.article.tags"
          :key="n"
        >
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
      <aside
        class="col-span-full md:col-span-2 row-start-1 w-full pt-14"
        v-if="data.article.body?.toc?.links"
      >
        <!-- Toc Component -->
        <Toc :links="data.article.body.toc.links" />
      </aside>
      <article
        class="col-span-full md:col-span-6 md:col-start-1 md:row-start-1 prose w-full p-4 max-w-3xl m-auto"
      >
        <ContentDoc>
          <template #not-found>
            <h1>Document not found</h1>
          </template>
          <template #empty>
            <h1>Article not found</h1>

            <NuxtLink to="/"> Back Home</NuxtLink>
          </template>
        </ContentDoc>
      </article>
    </section>
    <!-- PrevNext Component -->
    <NavPrevNext :prev="prev" :next="next" />
  </main>
</template>
<style scoped></style>
