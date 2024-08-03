<script lang="ts" setup>
const { data: heroContent } = await useAsyncData("hero-content", () =>
  queryContent("components", "hero-blog").findOne()
);
console.log(heroContent.value)

const { data: featured } = await useAsyncData("featured", () => {
  return queryContent({ path: "/blog" })
    .where({
      title: {
        $in: heroContent.value?.featured || [],
      },
    })
    .only([
      "title",
      "description",
      "category",
      "author",
      "createdAt",
      "readingTime",
      "tags",
      "_path",
      "image",
    ])
    .find();
});
</script>

<template>
  <div class="relative isolate">
    <div class="mx-auto max-w-7xl px-6 py-6 sm:py-10 lg:px-8 lg:py-14">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[500px]">
        <!-- Main featured article -->
        <div class="lg:col-span-2 bg-pink-400 overflow-hidden rounded-md relative cursor-pointer">
          <nuxt-link :to="featured[0]._path" class="block absolute inset-0">
            <nuxt-img :src="featured[0].image" class="w-full h-full object-cover" alt="" />
          </nuxt-link>
        </div>

        <!-- Side articles -->
        <div class="grid grid-rows-2 gap-4">
          <div v-for="(article, index) in featured.slice(1, 3)" :key="index"
            class="overflow-hidden rounded-md relative cursor-pointer">
            <nuxt-link :to="article._path" class="block absolute inset-0">
              <nuxt-img :src="article.image" class="w-full h-full object-cover" alt="" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>