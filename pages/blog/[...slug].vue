<!-- ./pages/blog/[…slug.vue] -->
<script setup>
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
  title: data.value.article.title,
  meta: [
    { name: "description", content: data.value.article.description },
    ,
    {
      name: "robots",
      content: "index, follow, max-image-preview:large",
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
      content: `https://sciredev.com/${data.value.article.img}`,
    },
  ],
});
</script>
<template>
  <main id="main" class="p-4 max-w-5xl mx-auto mt-6">
    <header v-if="data.article" class="p-4 pb-12">
      <div class="h-72 w-full">
        <img
          :src="`/${data.article.img}`"
          :alt="data.article.title"
          class="w-full h-full object-fill rounded-2xl"
        />
      </div>
      <h1 class="font-extrabold text-5xl my-3">{{ data.article.title }}</h1>
      <!--  <p class="font-medium text-lg">{{ data.article.description }}</p> -->
      <ul class="flex gap-4">
        <li
          class="bg-slate-500 px-2 py-0.5 rounded-md font-medium text-gray-300"
          v-for="(tag, n) in data.article.tags"
          :key="n"
        >
          {{ tag }}
        </li>
      </ul>
    </header>
    <hr />
    <section class="grid grid-cols-8">
      <aside class="col-span-full md:col-span-2 row-start-1 w-full pt-14">
        <!-- Toc Component -->
        <Toc :links="data.article.body.toc.links" />
      </aside>
      <article
        class="col-span-full md:col-span-6 md:col-start-1 md:row-start-1 prose w-full p-4 max-w-3xl m-auto"
      >
        <!-- render document coming from query -->
        <ContentRenderer :value="data.article">
          <!-- render rich text from document -->
          <ContentRendererMarkdown :value="data.article" />
          <!-- display if document content is empty -->
          <template #empty>
            <p>No content found.</p>
          </template>
        </ContentRenderer>
      </article>
    </section>
    <!-- PrevNext Component -->
    <NavPrevNext :prev="prev" :next="next" />
  </main>
</template>
<style scoped></style>
