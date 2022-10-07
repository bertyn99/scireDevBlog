<template>
  <div class="flex flex-col md:col-span-2 row-span-4 flex-wrap">
    <slot :currentSlide="currentSlide" />
    <div
      class="h-14 sm:h-[10%] inline-flex flex-row-reverse sm:flex-row bg-secondary sm:bg-transparent"
    >
      <div class="hidden mt-4 w-1/2 sm:flex justify-center">
        <span class="text-5xl text-bold"
          >2
          <span class="text-4xl text-bold text-primary-darken">/5</span></span
        >
      </div>
      <div class="bg-secondary sm:w-1/2">
        <button class="bg-white h-full p-1" @click="goPrev">
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
        <button class="bg-white h-full p-4" @click="goNext">
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentSlide = ref(0);

function goNext() {
  currentSlide.value++;
}
function goPrev() {
  currentSlide.value--;
}
</script>
