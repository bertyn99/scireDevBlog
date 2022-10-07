<template>
  <div
    class="grid grid-cols-1 md:grid-cols-5 md:grid-flow-row w-full my-0 sm:my-8"
  >
    <Carrousel v-slot="{ currentSlide }">
      <CarrouselSlide v-for="(slide, index) in slides" :key="index">
        <ArticleSlideData
          v-show="currentSlide === index + 1"
          :data="slide"
          :data-slide="index"
        />
      </CarrouselSlide>
    </Carrousel>

    <div
      class="p-8 order-first md:order-none md:col-span-2 md:row-span-1 max-h-[150px] flex justify-center"
    >
      <span
        class="relative before:block before:absolute before:right-0 before:w-9 before:h-8 before:mt-5 before:bg-tertiary-default/20 before:-z-50"
      >
        <span class="font-bold text-4xl z-20">Blog.</span>
      </span>
    </div>
    <div class="md:col-span-2 md:row-span-3">
      <div class="bg-secondary h-full pb-10 pt-8">
        <div class="w-full border-l-4 border-tertiary-default">
          <span class="pl-6 font-semibold text-primary-default"
            >Popular Articles</span
          >
        </div>
        <div v-for="article in popularArticle" class="flex my-1 p-4 h-1/3">
          <div
            class="relative w-1/2 md:w-1/3 min-h-[80px] min-w-[90px] aspect-video"
          >
            <img
              :src="article.img"
              alt=""
              width="
          380"
              height="200"
              class="absolute top-2 h-4/5 w-full z-20"
            />
          </div>
          <div
            class="w-1/2 md:w-2/3 h-full flex flex-col p-2 items-center justify-around hover:bg-primary-default/25 z-0 -translate-x-2 lg:-translate-x-8"
          >
            <div>
              <span class="text-primary-default">{{ article.title }}</span>
            </div>
            <div class="flex pb-1 gap-4">
              <div class="flex text-primary-darken items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <span class="text-sm"> 200 </span>
              </div>
              <div class="flex text-primary-darken items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span class="text-primary-darken text-sm"> 200 </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const popularArticle = ref([
  {
    title: " Top extension chrome",
    img: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    time: "4min",
    view: "200",
  },
  {
    title: " Top extension vscode",
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8Ym9va3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
    time: "4min",
    view: "200",
  },
  {
    title: " Top extension vscode",
    img: "https://images.unsplash.com/photo-1607706189992-eae578626c86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dnNjb2RlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    time: "4min",
    view: "200",
  },
]);

const slides = ref([
  {
    title: "Discover new world Javascript mais biensur",
    img: "https://images.unsplash.com/photo-1662581872342-3f8e0145668f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    title: "Discover  Java mais biensur",
    img: "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aHVtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
  },

  {
    title: "Discover the superset Typescript",
    img: "https://images.unsplash.com/photo-1665157296251-9ed707fe0cf5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
  },
]);
</script>
