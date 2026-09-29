<template>
  <div class="relative w-fit" :class="align === 'center' && 'mx-auto'">
    <svg
      class="pointer-events-none absolute text-tertiary-default"
      :class="align === 'center' ? '-left-16 top-0 h-16 w-28' : '-left-14 top-0 h-14 w-24'"
      viewBox="0 0 140 90"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 62 C 18 18, 48 8, 62 38 S 48 78, 88 32 C 102 18, 118 28, 132 24"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
      />
    </svg>
    <span
      class="pointer-events-none absolute top-1 -right-7 size-3 rotate-45 border border-secondary/35"
      aria-hidden="true"
    />
    <h1 class="relative text-[42px] font-bold leading-none tracking-tight text-secondary sm:text-5xl">
      <span
        class="pointer-events-none absolute left-[1.55em] top-1 h-3.5 w-11 bg-tertiary-default/40"
        aria-hidden="true"
      />
      <span class="relative">Blog.</span>
    </h1>
  </div>
</template>

<script setup>
defineProps({
  align: {
    type: String,
    default: "start",
  },
});
</script>
