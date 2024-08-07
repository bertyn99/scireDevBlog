<!-- ./pages/blog/[…slug.vue] -->
<script setup>
import { getAuthorImg, capitalize } from "@/utils/format";
definePageMeta({
  middleware: "broken-link-redirection",
});
const { path } = useRoute();

//remove last slash from the path
const cleanPath = path.replace(/\/$/, "");
console.log(cleanPath);

const { data } = await useAsyncData(`content-${cleanPath}`, async () => {
  // fetch document where the document path matches with the cuurent route
  let article = queryContent().where({ _path: cleanPath }).findOne();
  // get the surround information,
  // which is an array of documeents that come before and after the current document
  let surround = queryContent()
    .only(["_path", "title", "description"])
    .sort({ date: 1 })
    .findSurround(cleanPath);

  return {
    article: await article,
    surround: await surround,
  };
});

// destrucure `prev` and `next` value from data
const [prev, next] = data.value.surround;
// set the meta
useSeoMeta(
  useLoadMeta({
    title: capitalize(data.value.article.title),
    description: "ScireDev | " + data.value.article.description,
    image: `https://www.sciredev.com${data.value.article.image}`,
    url: "https://www.sciredev.com" + path,
    author: data.value.article.author,
    datePublished: data.value.article.createdAt,
    dateModified: data.value.article.modifiedAt,
  })
);
useHead({
  link: [
    {
      rel: "canonical",
      href: "https://www.sciredev.com" + path,
    },
  ],
});
</script>
<template>
  <SchemaOrgBreadcrumb :itemListElement="[
    { name: 'Home', item: '/' },
    { name: 'Blog', item: '/blog' },
    { name: data.article.title || '', item: path },
  ]" />
  <SchemaOrgArticle type="TechArticle" :datePublished="data.article.createdAt" :dateModified="data.article.modifiedAt"
    :author="{
      name: data.article.author || '',
      image: getAuthorImg(data.article.author),
    }" />

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
