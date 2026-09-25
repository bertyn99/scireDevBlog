<template>
  <nav class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8" aria-label="Global">
    <div class="flex lg:flex-1">
      <NuxtLink to="/" class="-m-1.5 p-1.5">
        <span class="sr-only">ScireDev</span>
        <BrandLockup :mark-size="30" on-dark />
      </NuxtLink>
    </div>
    <div class="flex lg:hidden">
      <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-[var(--radius-card)] p-2.5 text-white"
        @click="show = true">
        <span class="sr-only">Open main menu</span>
        <UIcon name="i-heroicons:bars-3-20-solid" class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
    <div class="hidden lg:flex lg:gap-x-10">
      <NuxtLink
        v-for="item in navigation"
        :key="item.name"
        :to="item.href"
        class="text-sm font-semibold leading-6 text-white/80 hover:text-white"
      >
        {{ item.name }}
      </NuxtLink>
    </div>
    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      <UButton to="/courses" class="rounded-full" size="sm">
        Start learning
      </UButton>
    </div>
  </nav>
  <div v-if="show" class="lg:hidden">
    <div class="fixed inset-0 z-50" />
    <div
      class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-ink/10">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="-m-1.5 p-1.5" @click="show = false">
          <span class="sr-only">ScireDev</span>
          <BrandLockup :mark-size="28" />
        </NuxtLink>
        <button type="button" class="-m-2.5 rounded-[var(--radius-card)] p-2.5 text-ink" @click="show = false">
          <span class="sr-only">Close menu</span>
          <UIcon name="i-heroicons:x-mark" class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-black/10">
          <div class="space-y-2 py-6">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="-mx-3 block rounded-[var(--radius-card)] px-3 py-2 text-base font-semibold leading-7 text-ink hover:bg-canvas"
              @click="show = false"
            >
              {{ item.name }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const navigation = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "Blog", href: "/blog" },
]

const show = ref(false)
</script>
