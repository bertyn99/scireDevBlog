<script setup lang="ts">
import { VUE_LESSONS } from './data'
import { usePlayground } from '~/composables/usePlayground'

const { patch } = usePlayground()
</script>

<template>
  <div class="mx-auto grid max-w-5xl gap-10 px-5 pb-32 pt-8 lg:grid-cols-[200px_1fr]">
    <aside class="hidden lg:block">
      <p class="text-[12px] text-[var(--pg-ash)]">Vue Fundamentals</p>
      <ol class="mt-4 space-y-1">
        <li v-for="lesson in VUE_LESSONS" :key="lesson.n">
          <span
            class="block rounded-[8px] px-2 py-1.5 text-[13px]"
            :class="lesson.current
              ? 'bg-[var(--pg-surface)] text-[var(--pg-ink)]'
              : 'text-[var(--pg-slate)]'"
          >
            {{ lesson.n }}. {{ lesson.title }}
          </span>
        </li>
      </ol>
    </aside>

    <article class="max-w-[62ch]">
      <p class="text-[13px] text-[var(--pg-slate)]">Chapter 2</p>
      <h1 class="mt-2 text-[32px] font-semibold tracking-tight text-[var(--pg-ink)]">Reactivity with ref</h1>
      <span class="mt-3 block h-[2px] w-8 bg-[var(--pg-minium)]" />

      <div class="mt-8 space-y-4 text-[16px] leading-7 text-[var(--pg-slate)]">
        <p>
          Vue tracks a value when you wrap it in <code class="rounded-[4px] bg-[var(--pg-surface)] px-1 text-[14px] text-[var(--pg-ink)]">ref()</code>.
          Read it with <code class="rounded-[4px] bg-[var(--pg-surface)] px-1 text-[14px] text-[var(--pg-ink)]">.value</code> in script. In the template, Vue unwraps it.
        </p>
        <p>
          This is the same idea as a getter you already know: a box around the data, not magic. Learn the box before the shortcuts.
        </p>
      </div>

      <pre class="mt-8 overflow-x-auto rounded-[8px] bg-[var(--pg-ink)] p-5 text-[13px] leading-6 text-[var(--pg-paper)]"><code>import { ref } from 'vue'

const count = ref(0)
count.value += 1</code></pre>

      <button
        type="button"
        class="mt-8 rounded-[8px] bg-[var(--pg-minium)] px-4 py-2.5 text-[14px] font-medium text-white"
        @click="patch({ screen: 'exercise' }, 'push')"
      >
        Open exercise
      </button>
    </article>
  </div>
</template>
