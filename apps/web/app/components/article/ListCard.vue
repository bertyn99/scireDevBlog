<template>
  <ul class="w-full max-w-screen-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto my-6 px-4">
    <li v-for="article in list">
      <Card></Card>
    </li>
  </ul>
</template>

<script setup>
import Card from "./Card.vue";
const props = defineProps(["list"]);
</script>
