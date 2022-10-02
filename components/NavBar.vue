<template>
  <nav class="container mx-auto flex justify-between py-10">
    <NuxtLink to="/" class="text-lg font-semibold">ScireDEV</NuxtLink>

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
          <NuxtLink to="/road-to-basic"> Road To Basic</NuxtLink>
        </li>
        <li><NuxtLink to="/one-on-one"> One on One</NuxtLink></li>
        <li><NuxtLink to="/tips-and-advice"> Tips & Advice</NuxtLink></li>
      </ul>
    </div>
    <!--     mobile nav -->

    <!--    desktop/tablet nav -->
    <ul class="hidden md:flex md:gap-8">
      <li>
        <NuxtLink
          class="text-primary-darken hover:text-secondary transition-all font-semibold"
          to="/road-to-basic "
          >
          Road To Basic</NuxtLink
        >
      </li>
      <li>
        <NuxtLink
          class="text-primary-darken hover:text-secondary transition-all font-semibold"
          to="/one-on-one">
          Concept
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          class="text-primary-darken hover:text-secondary transition-all font-semibold"
          to="/tips-and-advice" >
          Tips & Advice</NuxtLink
        >
      </li>
    </ul>
    <!--    desktop/tablet nav -->
  </nav>
</template>

<script setup lang="ts">
const show = ref(false);
</script>
