<template>
  <div class="grid grid-cols-1 md:grid-cols-5 md:grid-flow-row w-full max-w-7xl mt-20 sm:my-24 sm:mb-8 lg:px-4 mx-auto">
    <Carrousel v-slot="{ currentSlide }">
      <CarrouselSlide v-for="(slide, index) in data" :key="index">
        <ArticleSlideData v-show="currentSlide === index + 1" :data="slide" :data-slide="index" />
      </CarrouselSlide>
    </Carrousel>

    <div class="p-8 mb:pt-8 order-first md:order-none md:col-span-2 md:row-span-1 max-h-[150px] flex justify-center">
      <span
        class="relative before:block before:absolute before:right-0 before:w-9 before:h-8 before:mt-5 before:bg-tertiary-default/20 before:-z-50">
        <span class="font-bold text-4xl z-20">Blog.</span>
      </span>
    </div>
    <div class="md:col-span-2 md:row-span-3">
      <div class="bg-secondary h-full pb-14 pt-8">
        <div class="w-full border-l-4 border-tertiary-default py-2">
          <span class="pl-6 font-semibold text-primary-default">Popular Articles</span>
        </div>
        <div class="block">
          <NuxtLink v-for="article in popular" class="flex flex-row items-center p-3 h-1/3 hover:bg-primary-default/25"
            :to="article._path">
            <div class="relative w-1/2 md:w-2/5 h-full min-h-[100px] min-w-[100px]  ">
              <nuxt-img :src="article.image" alt="" loading="lazy" format="webp" sizes="md:180px lg:200px"
                class="absolute sm:top-2 h-full sm:h-4/5 w-full z-20 object-cover" />
            </div>
            <div
              class="w-1/2 md:w-3/5 h-full flex flex-col p-2 items-center gap-2 sm:gap-4 z-0 -translate-x-1 lg:-translate-x-2">
              <div class="w-full text-center leading-4">
                <span class="text-primary-default font-medium">{{ truncate(article.title, 58) }}</span>
              </div>
              <div class="flex pb-1 gap-4">
                <div class="flex text-primary-darken items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span class="text-sm">
                    {{ Math.ceil(article.readingTime?.minutes) }} min
                  </span>
                </div>
                <div class="flex text-primary-darken items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  <span class="text-primary-darken text-sm"> 200 </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
        <!--   <div class="overflow-x">
          <NuxtLink v-for="article in popular" class="flex flex-row items-center p-3 h-1/3 hover:bg-primary-default/25"
            :to="article._path">
            <div class="relative w-1/2 md:w-1/3 h-full min-h-[90px] min-w-[90px]  ">
              <img :src="article.image" alt="" width="
          380" height="200" class="absolute sm:top-2 h-full sm:h-4/5 w-full z-20" />
            </div>
            <div
              class="w-1/2 md:w-2/3 h-full flex flex-col p-2 items-center gap-2 sm:gap-4 z-0 -translate-x-2 lg:-translate-x-6">
              <div class="w-full text-center leading-4">
                <span class="text-primary-default">{{ article.title }}</span>
              </div>
              <div class="flex pb-1 gap-4">
                <div class="flex text-primary-darken items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <span class="text-sm">
                    {{ Math.ceil(article.readingTime?.minutes) }} min
                  </span>
                </div>
                <div class="flex text-primary-darken items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>

                  <span class="text-primary-darken text-sm"> 200 </span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script setup>
const { data } = await useAsyncData("home", () =>
  queryContent({ path: "/blog" }).limit(3).sort({ createdAt: -1 }).find(),
);

const popular = data.value;
</script>
