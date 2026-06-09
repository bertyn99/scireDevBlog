<script lang="ts" setup>
const { data: heroContent } = await useAsyncData("hero-content", () =>
  queryCollection("components").where("stem", "=", "components/hero-blog").first()
);

const { data: featured } = await useAsyncData("featured", async () => {
  const titles = heroContent.value?.featured ?? [];
  if (!titles.length) {
    return [];
  }

  const articles = await queryCollection("blog")
    .select(
      "title",
      "description",
      "category",
      "author",
      "createdAt",
      "tags",
      "path",
      "image",
    )
    .where("title", "IN", titles)
    .all();

  return titles
    .map((title) => articles.find((article) => article.title === title))
    .filter((article): article is NonNullable<typeof article> => Boolean(article));
});
</script>

<template>
  <div v-if="featured?.length" class="relative isolate">
    <div class="mx-auto max-w-7xl px-6 py-6 sm:py-10 lg:px-8 lg:py-14">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[500px]">
        <div class="lg:col-span-2 bg-pink-400 overflow-hidden rounded-md relative cursor-pointer">
          <nuxt-link :to="featured[0].path" class="block absolute inset-0">
            <nuxt-img :src="featured[0].image" class="w-full h-full object-cover" alt="" />
          </nuxt-link>
        </div>

        <div class="grid grid-rows-2 gap-4">
          <div
            v-for="(article, index) in featured.slice(1, 3)"
            :key="index"
            class="overflow-hidden rounded-md relative cursor-pointer"
          >
            <nuxt-link :to="article.path" class="block absolute inset-0">
              <nuxt-img :src="article.image" class="w-full h-full object-cover" alt="" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
