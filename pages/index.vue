<!-- ./pages/blog/index.vue -->
<script setup>
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
  ],
});
</script>
<template>
  <section class="container mx-auto py-8">
    <div class="flex justify-between px-2">
      <h2
        class="font-bold text-2xl relative before:block before:absolute before:-left-3 before:w-10 before:h-7 before:mt-3 before:bg-tertiary-default/20 before:-z-50"
      >
        Latest Article
      </h2>
      <!--  <nav>
        <ul>
          <li>
            All
          </li>
          <li>
            Road To basic
          </li>
          <li>
            Road To basic
          </li>
        </ul>
      </nav> -->

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
      path="/blog"
      :query="{
        only: ['title', 'description', 'tags', '_path', 'img', 'excerpt'],
      }"
    >
      <!-- Default list slot -->
      <template v-slot="{ list }">
        <ul
          class="w-full max-w-screen-xl sm:px-8 grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 md:gap-4 align-center mx-auto my-8 items-center justify-center"
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
</template>
<style scoped></style>
