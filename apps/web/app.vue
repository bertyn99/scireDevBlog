<template>
  <UApp>
    <div id="app">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </UApp>
</template>

<script setup>
useHead({
  meta: [
    { name: "p:domain_verify", content: "542878e21ff6537eeecb261d31f96282" },
  ],
});
</script>
