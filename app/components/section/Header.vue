<template>
  <header class="sticky inset-x-0 top-0 z-50" :class="[y < 70 ? '' : 'bg-black']">
    <NavBar />
  </header>
</template>

<script setup>
import { useWindowScroll } from "@vueuse/core";
const { x, y } = useWindowScroll();

const mobileMenuOpen = ref(false);
</script>
