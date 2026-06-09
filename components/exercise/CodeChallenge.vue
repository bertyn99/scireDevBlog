<template>
  <ClientOnly>
    <div class="code-challenge border rounded-lg overflow-hidden">
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-2 bg-gray-50 border-b">
        <div>
          <h3 class="font-semibold text-sm">{{ title }}</h3>
          <p v-if="description" class="text-xs text-gray-500 mt-0.5">{{ description }}</p>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-400">{{ points }} pts</span>
        </div>
      </div>

      <!-- Split Pane: Editor | Preview -->
      <div class="flex flex-col lg:flex-row" style="min-height: 400px">
        <!-- Editor Panel -->
        <div class="flex-1 border-b lg:border-b-0 lg:border-r">
          <div class="flex border-b bg-gray-50">
            <button
              v-for="tab in tabs"
              :key="tab.name"
              @click="activeTab = tab.name"
              :class="[
                'px-3 py-1.5 text-xs font-medium border-b-2 transition-colors',
                activeTab === tab.name
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700',
              ]"
            >
              {{ tab.label }}
            </button>
          </div>
          <div v-show="activeTab === 'html'" ref="htmlEditor" class="h-[350px]"></div>
          <div v-show="activeTab === 'css'" ref="cssEditor" class="h-[350px]"></div>
        </div>

        <!-- Preview Panel -->
        <div class="flex-1 bg-white flex flex-col">
          <div class="px-3 py-1.5 bg-gray-50 border-b">
            <span class="text-xs font-medium text-gray-500">Preview</span>
          </div>
          <div ref="previewContainer" class="flex-1"></div>
        </div>
      </div>

      <!-- Test Results -->
      <div v-if="testResults.length" class="border-t">
        <div class="px-4 py-3 space-y-1.5">
          <div
            v-for="result in testResults"
            :key="result.name"
            :class="[
              'flex items-start gap-2 text-sm p-2 rounded',
              result.passed ? 'bg-green-50' : 'bg-red-50',
            ]"
          >
            <span :class="result.passed ? 'text-green-600' : 'text-red-600'" class="mt-0.5 font-bold">
              {{ result.passed ? '✓' : '✗' }}
            </span>
            <div>
              <p :class="result.passed ? 'text-green-800' : 'text-red-800'">
                {{ result.name }}
              </p>
              <p v-if="result.message" class="text-xs text-gray-500 mt-0.5">
                {{ result.message }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 px-4 py-3 bg-gray-50 border-t">
        <button
          @click="handleRunTests"
          :disabled="running"
          class="px-4 py-1.5 bg-primary text-white text-sm rounded hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {{ running ? 'Running...' : 'Run Tests' }}
        </button>
        <button
          @click="handleReset"
          class="px-4 py-1.5 text-sm text-gray-600 hover:text-gray-800 border rounded transition-colors"
        >
          Reset
        </button>
        <span v-if="testsPassed" class="text-sm text-green-600 font-medium ml-auto">
          All tests passed!
        </span>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { createSandbox, runTests, type TestCase, type TestResult } from '~/composables/useSandbox'
import { useMonaco } from '~/composables/useMonaco'

const props = defineProps<{
  title?: string
  description?: string
  points?: number
  starterHtml?: string
  starterCss?: string
  assertions?: string[]
}>()

const tabs = [
  { name: 'html', label: 'HTML' },
  { name: 'css', label: 'CSS' },
]

const activeTab = ref('css')
const htmlCode = ref(props.starterHtml || '')
const cssCode = ref(props.starterCss || '')

const htmlEditor = ref<HTMLElement | null>(null)
const cssEditor = ref<HTMLElement | null>(null)
const previewContainer = ref<HTMLElement | null>(null)

const testResults = ref<TestResult[]>([])
const running = ref(false)
const testsPassed = computed(() =>
  testResults.value.length > 0 && testResults.value.every(r => r.passed),
)

// Parse assertions into test cases
const testCases = computed<TestCase[]>(() => {
  if (!props.assertions?.length) return []
  return props.assertions.map(a => {
    if (a.includes('has display:flex')) {
      return { name: a, type: 'css-property' as const, selector: a.match(/^[^\s]+/)?.[0] || '*', property: 'display', expected: 'flex' }
    }
    if (a.includes('has justify-content:center')) {
      return { name: a, type: 'css-property' as const, selector: a.match(/^[^\s]+/)?.[0] || '*', property: 'justify-content', expected: 'center' }
    }
    if (a.includes('has align-items:center')) {
      return { name: a, type: 'css-property' as const, selector: a.match(/^[^\s]+/)?.[0] || '*', property: 'align-items', expected: 'center' }
    }
    return { name: a, type: 'dom-exists' as const, selector: a.match(/^[^\s]+/)?.[0] || '*' }
  })
})

// Initialize Monaco editors
useMonaco(htmlEditor, htmlCode.value, 'html', (code) => { htmlCode.value = code })
useMonaco(cssEditor, cssCode.value, 'css', (code) => {
  cssCode.value = code
  updatePreview()
})

function updatePreview() {
  if (!previewContainer.value) return
  previewContainer.value.innerHTML = ''
  const sandbox = createSandbox(htmlCode.value, cssCode.value)
  previewContainer.value.appendChild(sandbox)
}

function handleRunTests() {
  if (!previewContainer.value) return
  running.value = true

  // Create sandbox and run tests
  const sandbox = createSandbox(htmlCode.value, cssCode.value)
  sandbox.style.position = 'absolute'
  sandbox.style.opacity = '0'
  document.body.appendChild(sandbox)

  setTimeout(() => {
    testResults.value = runTests(sandbox, testCases.value)
    document.body.removeChild(sandbox)
    running.value = false
  }, 100)
}

function handleReset() {
  htmlCode.value = props.starterHtml || ''
  cssCode.value = props.starterCss || ''
  testResults.value = []
  updatePreview()
}

// Initial preview
onMounted(() => {
  nextTick(() => updatePreview())
})
</script>
