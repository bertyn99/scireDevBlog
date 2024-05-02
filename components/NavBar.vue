<template>
  <nav
    class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
    aria-label="Global"
  >
    <div class="flex lg:flex-1">
      <NuxtLink to="/" class="-m-1.5 p-1.5">
        <span class="sr-only">Scire dev</span>
        <img class="h-14 w-auto" src="/img/scire_logo_primary.png" alt="" />
      </NuxtLink>
    </div>
    <div class="flex lg:hidden">
      <button
        type="button"
        class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        @click="show = true"
      >
        <span class="sr-only">Open main menu</span>
        <Icon
          name="heroicons:bars-3-20-solid"
          class="h-6 w-6"
          aria-hidden="true"
        />
      </button>
    </div>
    <div class="hidden lg:flex lg:gap-x-12">
      <NuxtLink
        v-for="item in navigation"
        :key="item.name"
        :href="item.href"
        class="text-sm font-semibold leading-6 text-gray-900"
        >{{ item.name }}</NuxtLink
      >
    </div>
    <div class="hidden lg:flex lg:flex-1 lg:justify-end gap-x-4">
      <UButton to="/auth/login" variant="outline">Log in</UButton>
      <UButton to="/auth/login">Sign Up</UButton>
    </div>
  </nav>
  <div class="lg:hidden" v-if="show">
    <div class="fixed inset-0 z-50" />
    <div
      class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10"
    >
      <div class="flex items-center justify-between">
        <NuxtLink href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Sciredev</span>
          <img class="h-10 w-auto" src="/img/scire_logo_primary.png" alt="" />
        </NuxtLink>
        <button
          type="button"
          class="-m-2.5 rounded-md p-2.5 text-gray-700"
          @click="show = false"
        >
          <span class="sr-only">Close menu</span>
          <Icon name="heroicons:bars-3" class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
            <NuxtLink
              v-for="item in navigation"
              :key="item.name"
              :href="item.href"
              class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >{{ item.name }}</NuxtLink
            >
          </div>
          <div class="py-6">
            <UButton to="/auth/login">Sign Up</UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";
const navigation = [
  { name: "Blog", href: "blog" },
  /* { name: "Tools", href: "#" }, */
];
const { x, y } = useWindowScroll();

const show = ref(false);
</script>
