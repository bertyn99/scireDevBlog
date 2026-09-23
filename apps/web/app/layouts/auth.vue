<script lang="ts" setup>
const route = useRoute()

const heading = computed(() =>
  route.path.includes('signup') ? 'Create your account' : 'Sign in to your account',
)
</script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-16 w-auto object-cover"
        src="/img/scire_logo_primary.png"
        alt="ScireDev"
      >
      <h2
        class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        {{ heading }}
      </h2>
    </div>
    <slot />
  </div>
</template>
