<script lang="ts" setup>
defineProps({
  title: String,
  description: String,
  cta: String,
})

const cards = [
  { label: 'scīre', body: 'to know', mono: false },
  { label: 'lesson', body: 'Flexbox paths', mono: false },
  { label: 'code', body: 'const grow = () => scire', mono: true },
  { label: 'qcm', body: 'What does this return?', mono: false },
]
</script>

<template>
  <section class="relative isolate overflow-hidden bg-secondary text-white">
    <svg
      class="pointer-events-none absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="scire-hero-grid"
          width="56"
          height="56"
          x="50%"
          y="-1"
          patternUnits="userSpaceOnUse"
        >
          <path d="M.5 56V.5H56" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" stroke-width="0" fill="url(#scire-hero-grid)" />
    </svg>

    <div
      class="pointer-events-none absolute left-1/2 top-0 -z-10 -ml-24 h-[42rem] w-[42rem] -translate-x-1/4 rounded-full bg-gradient-to-tr from-ember-core/30 to-ember/40 blur-3xl"
      aria-hidden="true"
    />

    <div class="mx-auto max-w-7xl px-6 pb-20 pt-10 sm:pb-28 lg:flex lg:items-center lg:gap-16 lg:px-8 lg:pt-8">
      <div class="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:max-w-xl">
        <p class="text-[13px] font-semibold uppercase tracking-[0.18em] text-ember-hot">
          scīre · to know
        </p>
        <h1 class="mt-5 text-4xl font-medium tracking-tight text-white sm:text-6xl sm:leading-[1.05]">
          {{ title }}
        </h1>
        <p class="mt-6 text-lg leading-8 text-white/70">
          {{ description }}
        </p>
        <div class="mt-10 flex flex-wrap items-center gap-3">
          <UButton
            to="/courses"
            class="rounded-full px-5"
            size="lg"
          >
            {{ cta }}
          </UButton>
          <UButton
            to="/blog"
            variant="outline"
            color="neutral"
            class="rounded-full px-5"
            size="lg"
          >
            Read the blog
          </UButton>
        </div>
      </div>

      <div class="relative mx-auto mt-16 w-full max-w-lg lg:mt-0 lg:max-w-none">
        <div class="relative overflow-hidden rounded-[var(--radius-card)] border border-white/10 bg-white/5 p-6 sm:p-10">
          <div class="flex justify-center text-white">
            <BrandMark :size="220" />
          </div>

          <ul class="mt-8 grid grid-cols-2 gap-2.5">
            <li
              v-for="card in cards"
              :key="card.label"
              class="rounded-[var(--radius-card)] border border-white/10 bg-black/25 px-3 py-2.5"
            >
              <p class="text-[10px] font-semibold uppercase tracking-[0.14em] text-ember-hot">
                {{ card.label }}
              </p>
              <p
                class="mt-1 text-sm text-white/85"
                :class="card.mono ? 'font-mono text-xs' : ''"
              >
                {{ card.body }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
