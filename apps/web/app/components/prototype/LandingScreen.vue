<script setup lang="ts">
import { COURSES } from './data'
import { usePlayground } from '~/composables/usePlayground'

const { mark, patch } = usePlayground()
</script>

<template>
  <section class="relative mx-auto flex min-h-[calc(100dvh-4rem)] max-w-5xl flex-col justify-center px-5 pb-28 pt-10">
    <PrototypeMark
      :name="mark"
      :size="220"
      whisper
      class="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 lg:block"
    />
    <p class="text-[13px] text-[var(--pg-slate)]">Developer courses</p>
    <h1 class="mt-4 max-w-xl text-[40px] font-semibold leading-[1.12] tracking-tight text-[var(--pg-ink)] sm:text-[48px]">
      Know the path. Then grow it.
    </h1>
    <p class="mt-4 max-w-[36ch] text-[17px] leading-relaxed text-[var(--pg-slate)]">
      Courses that teach the craft before the framework.
    </p>
    <button
      type="button"
      class="mt-8 w-fit rounded-[8px] bg-[var(--pg-minium)] px-4 py-2.5 text-[14px] font-medium text-white transition-transform active:scale-[0.98]"
      @click="patch({ screen: 'catalog' }, 'push')"
    >
      Browse courses
    </button>
  </section>

  <section class="mx-auto max-w-5xl space-y-3 px-5 pb-32">
    <article
      v-for="course in COURSES.slice(0, 3)"
      :key="course.slug"
      class="flex items-center justify-between rounded-[8px] bg-[var(--pg-surface)] px-6 py-5"
    >
      <div>
        <h2 class="text-[18px] font-semibold text-[var(--pg-ink)]">{{ course.title }}</h2>
        <span class="mt-2 block h-[2px] w-8 bg-[var(--pg-minium)]" />
        <p class="mt-2 text-[13px] text-[var(--pg-slate)]">
          {{ course.level }} · {{ course.hours }} hours · {{ course.lessons }} lessons
        </p>
      </div>
      <PrototypeMark :name="mark" :size="48" whisper />
    </article>
  </section>
</template>
