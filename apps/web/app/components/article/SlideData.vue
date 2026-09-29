<template>
  <div class="flex flex-col" :class="tone === 'mist' ? 'text-white' : 'text-secondary'">
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
        <span class="text-[11px]" :class="tone === 'mist' ? 'text-white/70' : 'text-primary-darken'">
          Author
        </span>
      </div>
    </div>

    <h2
      class="mt-4 font-bold tracking-tight"
      :class="tone === 'mist'
        ? 'text-[26px] leading-[1.15]'
        : 'text-[26px] leading-[1.12] sm:text-[30px] lg:text-[32px]'"
    >
      {{ capitalize(data.title) }}
    </h2>

    <p
      class="mt-3 inline-flex items-center gap-2 text-[12px]"
      :class="tone === 'mist' ? 'text-white/75' : 'text-primary-darken'"
    >
      <span
        class="h-px w-8"
        :class="tone === 'mist' ? 'bg-white/70' : 'bg-primary-darken'"
        aria-hidden="true"
      />
      {{ data.category }}
    </p>

    <p
      class="mt-3 max-w-[42ch] text-[14px] leading-6"
      :class="tone === 'mist' ? 'text-white/80' : 'text-secondary/75'"
    >
      {{ truncate(data.description, tone === 'mist' ? 110 : 140) }}
    </p>

    <p
      class="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px]"
      :class="tone === 'mist' ? 'text-white/75' : 'text-primary-darken'"
    >
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
  tone: {
    type: String,
    default: "ink",
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
