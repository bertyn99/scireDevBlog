<script lang="ts" setup></script>

<template>
  <section class="bg-secondary">
    <div class="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8">
      <h2 class="mx-auto max-w-2xl text-center text-3xl font-medium tracking-tight text-white sm:text-4xl">
        Get notified when we’re launching
      </h2>
      <p class="mx-auto mt-3 max-w-xl text-center text-lg leading-8 text-white/70">
        New courses, exercises, and writing — sent when there is something worth knowing.
      </p>
      <form class="mx-auto mt-10 flex max-w-md gap-x-3">
        <label for="email-address" class="sr-only">Email address</label>
        <input
          id="email-address"
          name="email"
          type="email"
          autocomplete="email"
          required
          class="min-w-0 flex-auto rounded-[var(--radius-card)] border-0 bg-white/5 px-3.5 py-2.5 text-white shadow-none ring-1 ring-inset ring-white/15 placeholder:text-white/40 focus:ring-2 focus:ring-inset focus:ring-ember sm:text-sm"
          placeholder="Enter your email"
        >
        <button
          type="submit"
          class="flex-none rounded-full bg-ember px-5 py-2.5 text-sm font-semibold text-white hover:bg-tertiary-darken"
        >
          Notify me
        </button>
      </form>
    </div>
  </section>
</template>
