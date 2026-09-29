<template>
  <div v-if="variant === 'mobile'" class="flex items-center justify-between bg-secondary px-4 py-2.5">
    <div class="flex items-center gap-1.5" role="tablist" aria-label="Featured articles">
      <button
        v-for="index in slideCount"
        :key="index"
        type="button"
        class="size-1.5"
        :class="index === currentSlide ? 'bg-white' : 'bg-white/35'"
        :aria-label="`Go to article ${index}`"
        :aria-current="index === currentSlide ? 'true' : undefined"
        @click="goTo(index)"
      />
    </div>
    <div class="flex">
      <UButton
        square
        size="lg"
        color="neutral"
        variant="solid"
        icon="i-heroicons-chevron-left-20-solid"
        aria-label="Previous article"
        :ui="{ base: 'rounded-none bg-white text-highlighted hover:bg-elevated' }"
        @click="goPrev"
      />
      <UButton
        square
        size="lg"
        color="neutral"
        variant="solid"
        icon="i-heroicons-chevron-right-20-solid"
        aria-label="Next article"
        :ui="{ base: 'rounded-none bg-white text-highlighted hover:bg-elevated' }"
        @click="goNext"
      />
    </div>
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
