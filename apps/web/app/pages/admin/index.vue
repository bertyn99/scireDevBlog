<script lang="ts" setup>
definePageMeta({
  auth: { user: { role: 'admin' } },
})

useSeoMeta({
  title: 'Admin — scireDev',
})
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-12">
    <h1 class="text-2xl font-bold tracking-tight">
      Admin
    </h1>
    <p class="mt-2 text-muted">
      Restricted to users with the admin role.
    </p>
  </div>
</template>
