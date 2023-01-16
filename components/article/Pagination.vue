<script setup>
const props = defineProps({
  totalPage: Number,
  currentPage: Number,
  prev: Function,
  next: Function,
});
</script>

<template>
  <div
    class="bg-white w-full max-w-3xl sm:-translate-x-[8.84vw] px-2 h-14 inline-flex justify-end"
  >
    <nav class="h-full w-full max-w-[585px] inline-flex justify-end p-2 gap-2">
      <button
        class="bg-primary-darken p-2 translate-y-5"
        v-if="currentPage > 1"
        @click="prev"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <ul class="h-full inline-flex justify-center items-center w-full gap-3">
        <li
          v-for="page in totalPage"
          class="text-medium text-xl hover:bg-tertiary-default/50 p-2"
          :class="[currentPage == page ? 'bg-tertiary-default/50' : '']"
          key="page"
        >
          {{ page }}
        </li>
      </ul>
      <button class="bg-black p-2 -translate-y-5" @click="next">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6 text-white"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </nav>
  </div>
</template>
