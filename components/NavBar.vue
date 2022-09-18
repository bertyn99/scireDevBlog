<template>
  <nav class="flex justify-between">
    <NuxtLink href="/blog" class="text-lg font-semibold">ScireDEV</NuxtLink>

    <!--     mobile nav -->
    <div>
      <button @click="show = !show" v-if="!show" class="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <ul class="md:flex" v-if="show">
        <li>
          <button class="md:hidden" @click="show = !show">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </li>
        <li>
          <NuxtLink> Road To Basic</NuxtLink>
        </li>
        <li><NuxtLink> One on One</NuxtLink></li>
        <li><NuxtLink> Tips & Advice</NuxtLink></li>
      </ul>
    </div>
    <!--     mobile nav -->

    <!--    desktop/tablet nav -->
    <ul class="hidden md:flex">
      <li>
        <NuxtLink> Road To Basic</NuxtLink>
      </li>
      <li><NuxtLink> One on One</NuxtLink></li>
      <li><NuxtLink> Tips & Advice</NuxtLink></li>
    </ul>
    <!--    desktop/tablet nav -->
  </nav>
</template>

<script setup lang="ts">
const show = ref(false);
</script>
