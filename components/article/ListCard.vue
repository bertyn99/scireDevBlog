<template>
  <ul
    class="article-list w-full max-w-screen-xl grid grid-cols-3 gap-4 align-center mx-auto my-2"
  >
    <li v-for="article in list">
        <Card></Card>

    </li>
  </ul>
</template>


<script setup>
import Card from './Card.vue';
   const props = defineProps(['list'])
</script>