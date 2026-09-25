<template>
  <UCard
    :ui="{ body: 'p-5 sm:p-6', header: 'p-5 sm:p-6' }"
    class="graphical-exercise"
  >
    <!-- Image + Question -->
    <template #header>
      <div class="flex flex-col gap-4">
        <!-- Image with fallback -->
        <div class="w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          <div
            v-if="imageError"
            class="flex flex-col items-center justify-center gap-2 p-8 aspect-video text-gray-400"
          >
            <UIcon name="i-heroicons-photo" class="w-10 h-10" />
            <span class="text-xs font-medium">Image unavailable</span>
          </div>
          <img
            v-else
            :src="image"
            :alt="imageAlt"
            class="w-full h-auto object-contain aspect-video"
            @error="imageError = true"
          >
        </div>

        <!-- Question -->
        <div class="flex items-start gap-3">
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary shrink-0">
            <UIcon name="i-heroicons-question-mark-circle" class="w-5 h-5" />
          </div>
          <h3 class="text-base font-semibold text-gray-900 leading-snug pt-1">
            {{ question }}
          </h3>
        </div>
      </div>
    </template>

    <!-- Options -->
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-3">
      <fieldset class="flex flex-col gap-3" :disabled="submitted">
        <legend class="sr-only">Answer options</legend>
        <button
          v-for="(option, index) in options"
          :key="index"
          type="button"
          :aria-pressed="selectedAnswer === index"
          :class="optionClasses(index)"
          class="group flex items-center gap-3 w-full text-left p-4 rounded-lg border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          @click="selectOption(index)"
        >
          <!-- Indicator -->
          <span
            :class="[
              'flex items-center justify-center w-6 h-6 rounded-full border-2 shrink-0 transition-colors',
              indicatorClasses(index),
            ]"
          >
            <UIcon
              v-if="submitted && index === correct"
              name="i-heroicons-check-solid"
              class="w-3.5 h-3.5"
            />
            <UIcon
              v-else-if="submitted && index === selectedAnswer && index !== correct"
              name="i-heroicons-x-mark-solid"
              class="w-3.5 h-3.5"
            />
            <span v-else-if="selectedAnswer === index" class="w-2.5 h-2.5 rounded-full bg-primary" />
          </span>

          <!-- Label -->
          <span class="flex-1 text-sm font-medium" :class="labelClasses(index)">
            {{ option }}
          </span>

          <!-- Letter badge -->
          <UBadge
            :color="letterBadgeColor(index)"
            variant="subtle"
            size="sm"
            class="font-mono"
          >
            {{ String.fromCharCode(65 + index) }}
          </UBadge>
        </button>
      </fieldset>

      <!-- Feedback banner -->
      <div
        v-if="submitted"
        :class="[
          'flex items-center gap-2 p-3 rounded-lg text-sm font-medium',
          isCorrect
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200',
        ]"
      >
        <UIcon
          :name="isCorrect ? 'i-heroicons-check-circle-solid' : 'i-heroicons-x-circle-solid'"
          class="w-5 h-5 shrink-0"
        />
        <span v-if="isCorrect">Correct! Well done.</span>
        <span v-else>
          Incorrect. The correct answer is
          <strong>{{ String.fromCharCode(65 + correct) }}) {{ options[correct] }}</strong>.
        </span>
      </div>

      <!-- Explanation panel -->
      <div
        v-if="submitted && explanation"
        class="mt-1 p-4 rounded-lg bg-gray-50 border border-gray-200"
      >
        <div class="flex items-center gap-2 mb-2">
          <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-gray-500" />
          <span class="text-xs font-semibold uppercase tracking-wide text-gray-500">Explanation</span>
        </div>
        <p class="text-sm text-gray-700 leading-relaxed">{{ explanation }}</p>
        <div v-if="conceptTags.length" class="flex flex-wrap gap-1.5 mt-3">
          <UBadge
            v-for="tag in conceptTags"
            :key="tag"
            color="neutral"
            variant="subtle"
            size="sm"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-3 pt-1">
        <UButton
          type="submit"
          color="primary"
          :disabled="selectedAnswer === null || submitted"
          :loading="false"
          icon="i-heroicons-paper-airplane-solid"
          class="font-medium"
        >
          {{ submitted ? 'Submitted' : 'Submit Answer' }}
        </UButton>
        <UButton
          v-if="submitted"
          color="neutral"
          variant="ghost"
          icon="i-heroicons-arrow-path"
          @click="handleReset"
        >
          Try Again
        </UButton>
      </div>
    </form>
  </UCard>
</template>

<script setup lang="ts">
interface CompletedPayload {
  exerciseId: string
  passed: boolean
  selectedAnswer: number
  conceptTags: string[]
}

const props = withDefaults(
  defineProps<{
    exerciseId: string
    image: string
    question: string
    options: string[]
    correct: number
    explanation?: string
    conceptTags?: string[]
  }>(),
  {
    explanation: undefined,
    conceptTags: () => [],
  },
)

const emit = defineEmits<{
  completed: [payload: CompletedPayload]
}>()

// --- State ---
const selectedAnswer = ref<number | null>(null)
const submitted = ref(false)
const imageError = ref(false)

// Use checkpoint composable for event-driven progress sync
const { solved } = useCheckpoint({
  exerciseId: props.exerciseId,
  conceptTags: props.conceptTags,
})

// --- Computed ---
const isCorrect = computed(
  () => submitted.value && selectedAnswer.value === props.correct,
)

const imageAlt = computed(() => `Illustration for: ${props.question}`)

// --- Helpers ---
function optionClasses(index: number): string {
  if (!submitted.value) {
    return selectedAnswer.value === index
      ? 'border-primary bg-primary/5'
      : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
  }
  // After submit
  if (index === props.correct) {
    return 'border-green-500 bg-green-50'
  }
  if (index === selectedAnswer.value && index !== props.correct) {
    return 'border-red-500 bg-red-50'
  }
  return 'border-gray-200 bg-white opacity-60'
}

function indicatorClasses(index: number): string {
  if (!submitted.value) {
    return selectedAnswer.value === index
      ? 'border-primary bg-primary/10'
      : 'border-gray-300 bg-white'
  }
  if (index === props.correct) {
    return 'border-green-500 bg-green-500 text-white'
  }
  if (index === selectedAnswer.value && index !== props.correct) {
    return 'border-red-500 bg-red-500 text-white'
  }
  return 'border-gray-300 bg-white'
}

function labelClasses(index: number): string {
  if (submitted.value && index === props.correct) {
    return 'text-green-900'
  }
  if (submitted.value && index === selectedAnswer.value && index !== props.correct) {
    return 'text-red-900'
  }
  return 'text-gray-800'
}

function letterBadgeColor(index: number): 'primary' | 'green' | 'red' | 'neutral' {
  if (submitted.value) {
    if (index === props.correct) return 'green'
    if (index === selectedAnswer.value && index !== props.correct) return 'red'
  }
  if (selectedAnswer.value === index) return 'primary'
  return 'neutral'
}

// --- Actions ---
function selectOption(index: number) {
  if (submitted.value) return
  selectedAnswer.value = index
}

function handleSubmit() {
  if (selectedAnswer.value === null || submitted.value) return
  submitted.value = true
  const passed = selectedAnswer.value === props.correct
  solved.value = passed
  emit('completed', {
    exerciseId: props.exerciseId,
    passed,
    selectedAnswer: selectedAnswer.value,
    conceptTags: props.conceptTags,
  })
}

function handleReset() {
  selectedAnswer.value = null
  submitted.value = false
  solved.value = false
}
</script>
