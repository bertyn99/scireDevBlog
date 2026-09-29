<script setup>
defineProps({
  totalPage: Number,
  currentPage: Number,
  prev: Function,
  to: Function,
  next: Function,
});
</script>

<template>
  <nav
    v-if="totalPage > 1"
    class="flex w-full items-center justify-end gap-2"
    aria-label="Article pages"
  >
    <button
      v-if="currentPage > 1"
      type="button"
      class="grid size-11 place-items-center bg-secondary text-white hover:bg-secondary/80"
      aria-label="Previous page"
      @click="prev"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <ul class="flex items-center gap-1">
      <li v-for="page in totalPage" :key="page">
        <button
          type="button"
          class="grid min-w-11 place-items-center px-3 py-2 text-[15px]"
          :class="currentPage === page
            ? 'bg-tertiary-default text-white'
            : 'text-secondary hover:bg-tertiary-default/15'"
          :aria-current="currentPage === page ? 'page' : undefined"
          @click="to(page)"
        >
          {{ page }}
        </button>
      </li>
    </ul>
    <button
      v-if="currentPage < totalPage"
      type="button"
      class="grid size-11 place-items-center bg-secondary text-white hover:bg-secondary/80"
      aria-label="Next page"
      @click="next"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </nav>
</template>
