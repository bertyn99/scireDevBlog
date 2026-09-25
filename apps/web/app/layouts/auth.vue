<script lang="ts" setup></script>

<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <BrandLockup :mark-size="40" class="mx-auto justify-center" />
      <h2
        class="mt-6 text-center text-2xl font-medium leading-9 tracking-tight text-ink"
      >
        Sign in to your account
      </h2>
    </div>
    <slot />
  </div>
</template>

<style lang="css" scoped></style>
