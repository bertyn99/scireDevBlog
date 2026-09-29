<template>
  <div class="relative flex min-h-[420px] flex-col sm:min-h-[520px]">
    <div class="relative min-h-[360px] flex-1 overflow-hidden sm:min-h-[460px]">
      <slot :currentSlide="currentSlide" />
    </div>

    <div class="mt-3 flex items-center gap-2">
      <p
        class="grid size-12 shrink-0 place-items-center bg-tertiary-default text-[15px] font-semibold tabular-nums text-white"
        aria-live="polite"
      >
        {{ currentSlide }}/{{ slideCount }}
      </p>
      <button
        type="button"
        class="grid size-12 place-items-center bg-white text-secondary shadow-[0_0_0_1px_rgba(38,38,38,0.12)] hover:bg-primary-default/40"
        aria-label="Previous article"
        @click="goPrev"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        type="button"
        class="grid size-12 place-items-center bg-white text-secondary shadow-[0_0_0_1px_rgba(38,38,38,0.12)] hover:bg-primary-default/40"
        aria-label="Next article"
        @click="goNext"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  count: {
    type: Number,
    default: 1,
  },
});

const currentSlide = ref(1);
const slideCount = computed(() => Math.max(1, props.count || 1));

function goNext() {
  currentSlide.value = currentSlide.value === slideCount.value ? 1 : currentSlide.value + 1;
}

function goPrev() {
  currentSlide.value = currentSlide.value === 1 ? slideCount.value : currentSlide.value - 1;
}
</script>
