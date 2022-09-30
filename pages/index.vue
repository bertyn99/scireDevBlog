<!-- ./pages/blog/index.vue -->
<script setup>
import Card from "~~/components/article/Card.vue";
import Header from "~~/components/section/Header.vue";
definePageMeta({
  layout: "blog",
});

// set meta for page
useHead({
  title: "All articles",
  meta: [
    { name: "description", content: "Here's a list of all my great articles" },
  ],
});
</script>
<template>
  <section class="container mx-auto">
    <!-- Render list of all articles in ./content/blog using `path` -->
    <!-- Provide only defined fields in the `:query` prop -->
    <ContentList
      path="/blog"
      :query="{
        only: ['title', 'description', 'tags', '_path', 'img'],
      }"
    >
      <!-- Default list slot -->
      <template v-slot="{ list }">
        <ul
          class="article-list w-full max-w-screen-xl grid grid-cols-3 gap-4 align-center mx-auto my-2"
        >
          <li v-for="article in list" :key="article._path" class="article">
            <!--      <NuxtLink :to="article._path">
              <div class="wrapper">
                <div class="img-cont w-32">
                  <img
                    :src="`/${article.img}`"
                    :alt="article.title"
                    class="rounded-lg max-h-[8rem] h-full object-cover"
                  />
                </div>
                <header class="pl-2">
                  <h1 class="text-2xl font-semibold">{{ article.title }}</h1>
                  <p>{{ article.description }}</p>
                  <ul class="article-tags">
                    <li
                      class="bg-gray-400 text-gray-200 px-1 py-0.5"
                      v-for="(tag, n) in article.tags"
                      :key="n"
                    >
                      {{ tag }}
                    </li>
                  </ul>
                </header>
              </div>
            </NuxtLink> -->

            <Card :article="article"/>
          </li>
        </ul>
      </template>

      <!-- slot to display message when no content is found -->
      <template #not-found>
        <p>No articles found.</p>
      </template>
    </ContentList>
  </section>
</template>
<style scoped>
.wrapper {
  @apply flex  shadow;
}

.article-tags {
  @apply flex gap-2;
}
</style>
