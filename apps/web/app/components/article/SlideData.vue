<template>
  <div class="flex min-h-0 flex-1 flex-col text-secondary">
    <div class="flex items-center gap-2.5">
      <nuxt-img
        :src="getAuthorImg(data.author)"
        :alt="data.author"
        format="webp"
        sizes="32px"
        class="size-8 rounded-full object-cover"
      />
      <div class="flex flex-col leading-tight">
        <span class="text-[13px] font-semibold">{{ data.author }}</span>
        <span class="text-[11px] text-secondary/55">Author</span>
      </div>
    </div>

    <h2
      class="mt-4 font-bold tracking-tight"
      :class="surface === 'photo'
        ? 'text-[26px] leading-[1.15]'
        : 'text-[28px] leading-[1.12] sm:text-[32px] lg:text-[34px]'"
    >
      {{ capitalize(data.title) }}
    </h2>

    <p class="mt-3 inline-flex items-center gap-2 text-[12px] text-secondary/55">
      <span class="h-px w-8 bg-secondary/40" aria-hidden="true" />
      {{ data.category }}
    </p>

    <p class="mt-3 max-w-[42ch] text-[14px] leading-6 text-secondary/80">
      {{ truncate(data.description, 160) }}
    </p>

    <p class="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-5 text-[12px] text-secondary/60">
      <span v-if="minutes(data)" class="inline-flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor" class="size-3.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ minutes(data) }} min
      </span>
      <time :datetime="data.createdAt" class="inline-flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.6" stroke="currentColor" class="size-3.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3.75 8.25h16.5M4.5 6.75h15A1.5 1.5 0 0121 8.25v11.25A1.5 1.5 0 0119.5 21h-15A1.5 1.5 0 013 19.5V8.25A1.5 1.5 0 014.5 6.75z" />
        </svg>
        {{ formatDate(data.createdAt) }}
      </time>
    </p>
  </div>
</template>

<script setup>
import { capitalize, getAuthorImg, truncate } from "#shared/utils/format";

defineProps({
  data: {
    type: Object,
    required: true,
  },
  surface: {
    type: String,
    default: "paper",
  },
});

function minutes(article) {
  const value = article.readingTime?.minutes;
  if (!value) return null;
  return Math.max(1, Math.ceil(value));
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value).substring(2);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
</script>
