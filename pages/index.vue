<script lang="ts" setup>
const { data: page } = await useAsyncData("home", () =>
  queryCollection("content").path("/").first()
);
</script>

<template>
  <main>
    <ContentRenderer v-if="page" :value="page" />
  </main>
</template>
