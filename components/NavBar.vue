<template>
  <nav class="fixed w-full mx-auto left-0 right-0 py-1 z-50" :class="[y < 200 ? '' : 'bg-black']">
    <div class="max-w-7xl px-5 mx-auto md:flex md:justify-between">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="text-lg font-semibold" :class="[y < 200 ? '' : 'text-white']">
          <nuxt-img preload format="webp" sizes="sm:64px md:72px lg:90px"
            class="h-14 w-16 sm:h-20 sm:w-24 object-fill translate-y-1" src="/img/scire_logo_primary.png" alt="" />
        </NuxtLink>
        <button @click="show = !show" v-if="!show" class="md:hidden bg-black p-1 text-white cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current" viewBox="0 0 24 24"
            stroke="currentColor">
            <rect x="9" y="5" width="8" height="2" rx="1" fill="currentColor" />
            <rect x="6" y="11" width="11" height="2" rx="1" fill="currentColor" />
            <rect x="7" y="17" width="8" height="2" rx="1" fill="currentColor" />
          </svg>
        </button>
        <button class="md:hidden p-1 bg-black text-white cursor-pointer" @click="show = !show" v-if="show">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <ul
        class="bg-black/90 md:bg-transparent md:flex md:items-center z-[-1] absolute w-full md:w-auto left-0 md:z-auto md:static md:gap-8 md:opacity-100 transition-all ease-in duration-500"
        :class="[
          show ? `top-[65px] opacity-100` : `top-[-400px] opacity-0`,
          show ? '' : '',
        ]">
        <li class="px-4 py-6 hover:bg-tertiary-default md:hover:bg-transparent">
          <NuxtLink
            class="text-primary-default md:text-primary-darken md:hover:text-tertiary-default transition-all font-semibold"
            to="/road-to-basic">
            Road To Basic</NuxtLink>
        </li>
        <li class="px-4 py-6 hover:bg-tertiary-default md:hover:bg-transparent">
          <NuxtLink
            class="text-primary-default md:text-primary-darken md:hover:text-tertiary-default transition-all font-semibold"
            to="/one-on-one">
            Concept
          </NuxtLink>
        </li>
        <li class="px-4 py-6 hover:bg-tertiary-default md:hover:bg-transparent">
          <NuxtLink
            class="text-primary-default md:text-primary-darken md:hover:text-tertiary-default transition-all font-semibold"
            to="/tips-and-advice">
            Tips & Advice</NuxtLink>
        </li>
      </ul>
      <!--    desktop/tablet nav -->
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";

const { x, y } = useWindowScroll();

const show = ref(false);
</script>
