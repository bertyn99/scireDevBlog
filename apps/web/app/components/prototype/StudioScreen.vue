<script setup lang="ts">
import { usePlayground } from '~/composables/usePlayground'

const { patch } = usePlayground()

const html = ref(`<button id="count">0</button>`)
const css = ref(`button {
  font: 16px/1.4 ui-sans-serif, system-ui;
  padding: 8px 14px;
  border-radius: 8px;
  border: 1px solid #262626;
  background: #fff;
}`)
const js = ref(`const el = document.getElementById('count')
let n = 0
el.addEventListener('click', () => {
  n += 1
  el.textContent = n
})`)

const tab = ref<'html' | 'css' | 'js'>('js')
const srcdoc = computed(() => `<!doctype html>
<html><head><style>${css.value}</style></head>
<body>${html.value}<script>${js.value}<\/script></body></html>`)
</script>

<template>
  <div class="flex min-h-[calc(100dvh-4rem)] flex-col pb-28">
    <div class="flex items-center justify-between border-b border-[var(--pg-ink)]/8 px-5 py-3">
      <div>
        <p class="text-[12px] text-[var(--pg-ash)]">Custom exercise</p>
        <h1 class="text-[16px] font-semibold text-[var(--pg-ink)]">Make the button count</h1>
      </div>
      <button
        type="button"
        class="text-[13px] text-[var(--pg-slate)] hover:text-[var(--pg-ink)]"
        @click="patch({ screen: 'exercise' }, 'push')"
      >
        Back to exercise
      </button>
    </div>

    <div class="grid flex-1 lg:grid-cols-[220px_1fr_1fr]">
      <aside class="hidden border-r border-[var(--pg-ink)]/8 p-4 lg:block">
        <p class="text-[12px] text-[var(--pg-ash)]">Files</p>
        <ul class="mt-3 space-y-1 text-[13px]">
          <li>
            <button type="button" class="w-full rounded-[8px] px-2 py-1.5 text-left" :class="tab === 'html' ? 'bg-[var(--pg-surface)]' : ''" @click="tab = 'html'">index.html</button>
          </li>
          <li>
            <button type="button" class="w-full rounded-[8px] px-2 py-1.5 text-left" :class="tab === 'css' ? 'bg-[var(--pg-surface)]' : ''" @click="tab = 'css'">styles.css</button>
          </li>
          <li>
            <button type="button" class="w-full rounded-[8px] px-2 py-1.5 text-left" :class="tab === 'js' ? 'bg-[var(--pg-surface)]' : ''" @click="tab = 'js'">main.js</button>
          </li>
        </ul>
        <p class="mt-8 text-[13px] leading-6 text-[var(--pg-slate)]">
          Click increments a number. Keep the markup simple. The preview runs on the right.
        </p>
      </aside>

      <section class="flex min-h-[320px] flex-col border-r border-[var(--pg-ink)]/8">
        <div class="flex gap-1 border-b border-[var(--pg-ink)]/8 px-3 py-2 lg:hidden">
          <button v-for="t in (['html', 'css', 'js'] as const)" :key="t" type="button" class="rounded-[8px] px-2 py-1 text-[12px]" :class="tab === t ? 'bg-[var(--pg-surface)]' : 'text-[var(--pg-slate)]'" @click="tab = t">{{ t }}</button>
        </div>
        <textarea
          v-if="tab === 'html'"
          v-model="html"
          spellcheck="false"
          class="h-full min-h-[280px] flex-1 resize-none bg-[var(--pg-ink)] p-4 font-mono text-[12px] leading-6 text-[var(--pg-paper)] outline-none"
        />
        <textarea
          v-else-if="tab === 'css'"
          v-model="css"
          spellcheck="false"
          class="h-full min-h-[280px] flex-1 resize-none bg-[var(--pg-ink)] p-4 font-mono text-[12px] leading-6 text-[var(--pg-paper)] outline-none"
        />
        <textarea
          v-else-if="tab === 'js'"
          v-model="js"
          spellcheck="false"
          class="h-full min-h-[280px] flex-1 resize-none bg-[var(--pg-ink)] p-4 font-mono text-[12px] leading-6 text-[var(--pg-paper)] outline-none"
        />
      </section>

      <section class="flex min-h-[240px] flex-col bg-[var(--pg-surface)]">
        <p class="border-b border-[var(--pg-ink)]/8 px-4 py-2 text-[12px] text-[var(--pg-ash)]">Preview</p>
        <iframe
          title="Exercise preview"
          class="min-h-[240px] flex-1 bg-white"
          :srcdoc="srcdoc"
        />
      </section>
    </div>
  </div>
</template>
