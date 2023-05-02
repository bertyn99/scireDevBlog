<script lang="ts" setup>
const { data: featured } = await useAsyncData("featured", () => {
  return queryContent({ path: "/blog" })
    .where({
      title: {
        $in: [
          "Next JS 13 : Everything you need to know",
          "Nuxt 3 is Coming! What is new?",
          "Top 5 Animation Libraries for Vue",
        ],
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

console.log(featured.value![1].image);
</script>

<template>
  <div class="relative isolate">
    <div
      class="mx-auto max-w-7xl px-6 py-6 sm:py-10 lg:flex lg:items-center lg:gap-5 lg:px-8 lg:py-14"
    >
      <div
        class="md:max-h-[500px] grow-[2] bg-pink-400 overflow-hidden rounded-md"
      >
        <nuxt-img :src="featured![0].image" class="w-full h-full" alt="" />
      </div>
      <div
        class="md:min-h-[500px] h-full min-w-[20%] flex-1 flex sm:flex-col sm:flex-nowrap mt-4 lg:mt-0 gap-x-4 gap-y-4"
      >
        <div
          class="w-full aspect-video bg-red-400 flex-1 overflow-hidden rounded-md"
        >
          <nuxt-img :src="featured![1].image" class="w-full h-full" alt="" />
        </div>
        <div
          class="w-full aspect-video bg-blue-400 flex-1 overflow-hidden rounded-md"
        >
          <nuxt-img :src="featured![2].image" class="w-full h-full" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
