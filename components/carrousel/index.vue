<template>
  <div class="flex flex-col md:col-span-3 row-span-4 flex-wrap relative">
    <div class="sm:h-[90%] h-[475px] relative">
      <slot :currentSlide="currentSlide" />
    </div>

    <div class="h-14 sm:h-[10%] inline-flex flex-row-reverse sm:flex-row bg-secondary sm:bg-transparent">

      <div class="bg-secondary w-full flex gap-2">
       
       <div class="flex"> <button
          class="bg-white w-full md:w-24  h-full inline-flex justify-center items-center hover:bg-primary-default/75"
          @click="goPrev">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button> 
        <button
          class="bg-white w-full md:w-24 h-full inline-flex justify-center items-center hover:bg-primary-default/75"
          @click="goNext">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button></div>
        <div class="hidden w-3/4 sm:flex justify-center items-center  px-2 gap-1">
          <span class="text-2xl text-bold text-primary-darken">01 </span>
            <div class="w-full bg-white rounded-full overflow-hidden h-1 px-0 ">
              <div class=" bg-tertiary-default h-full transition-all duration-700 " :style="{width: (currentSlide*100)/getSlideCount+'%'}"></div>
            </div>
         <span class="text-xl text-bold text-primary-darken">0{{ getSlideCount }}</span>
        </div>
       
      </div>
      <!-- pagination desktop -->
      <!--      <div class="hidden w-1/3 sm:flex justify-center items-center">
        <span class="text-5xl text-bold"
          >{{ currentSlide }}
          <span class="text-4xl text-bold text-primary-darken"
            >/{{ getSlideCount }}</span
          ></span
        >
      </div> -->

      <!-- navigation -->
      <!--   <div class="bg-secondary w-3/5 flex sm:w-2/3">
        <button
          class="bg-white w-full md:w-20 h-full inline-flex justify-center items-center hover:bg-primary-default/75"
          @click="goPrev"
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
        <button
          class="bg-white w-full md:w-20 h-full inline-flex justify-center items-center hover:bg-primary-default/75"
          @click="goNext"
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
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div> -->

      <!-- pagination mobile -->
      <ul class="w-3/5 md:hidden flex justify-around items-center">
        <li v-for="(slide, index) in getSlideCount" :key="index" class="w-2 h-2 cursor-pointer" @click="goTo(index + 1)"
          :class="[
            currentSlide === index + 1 ? 'bg-white' : 'bg-primary-darken',
          ]"></li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const currentSlide = ref(1);
const getSlideCount = ref(null);

function goNext() {
  if (currentSlide.value === getSlideCount.value) {
    currentSlide.value = 1;
    return;
  }

  currentSlide.value++;
}
function goPrev() {
  if (currentSlide.value === 1) {
    currentSlide.value = getSlideCount.value;
    return;
  }
  currentSlide.value--;
}
function goTo(i) {
  currentSlide.value = i;
}

onMounted(() => {
  getSlideCount.value = document.querySelectorAll("[data-slide]").length;
});
</script>
