<template>
  <div v-if="variant === 'mobile'" class="flex items-center justify-between bg-secondary px-4 py-3">
    <div class="flex items-center gap-1.5" role="tablist" aria-label="Featured articles">
      <button
        v-for="index in slideCount"
        :key="index"
        type="button"
        class="size-2"
        :class="index === currentSlide ? 'bg-white' : 'bg-white/30'"
        :aria-label="`Go to article ${index}`"
        :aria-current="index === currentSlide ? 'true' : undefined"
        @click="goTo(index)"
      />
    </div>
    <div class="flex">
      <button
        type="button"
        class="grid size-11 place-items-center bg-white text-secondary hover:bg-primary-default"
        aria-label="Previous article"
        @click="goPrev"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button
        type="button"
        class="grid size-11 place-items-center bg-white text-secondary hover:bg-primary-default"
        aria-label="Next article"
        @click="goNext"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  </div>

  <div v-else class="flex">
    <button
      type="button"
      data-hero="prev"
      class="grid size-12 place-items-center bg-white text-secondary hover:bg-primary-default"
      aria-label="Previous article"
      @click="goPrev"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <button
      type="button"
      data-hero="next"
      class="grid size-12 place-items-center bg-white text-secondary hover:bg-primary-default"
      aria-label="Next article"
      @click="goNext"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  count: {
    type: Number,
    default: 1,
  },
  modelValue: {
    type: Number,
    default: 1,
  },
  variant: {
    type: String,
    default: "mobile",
  },
});

const emit = defineEmits(["update:modelValue"]);

const slideCount = computed(() => Math.max(1, props.count || 1));
const currentSlide = computed(() => {
  const value = props.modelValue || 1;
  return Math.min(slideCount.value, Math.max(1, value));
});

function goTo(index) {
  emit("update:modelValue", index);
}

function goNext() {
  emit("update:modelValue", currentSlide.value === slideCount.value ? 1 : currentSlide.value + 1);
}

function goPrev() {
  emit("update:modelValue", currentSlide.value === 1 ? slideCount.value : currentSlide.value - 1);
}
</script>
