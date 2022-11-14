<template>
  <section
    class="container md:px-4 md:px-0 py-2 flex flex-wrap-reverse justify-center gap-2"
  >
    <div
      class="flex flex-col md:flex-row items-center justify-between w-full md:w-1/2"
    >
      <div class="flex flex-col">
        <span>Share the knowledge</span
        ><span class="font-bold">Come join us </span>
      </div>
      <div class="flex justify-between w-1/2">
        <div class="bg-secondary h-12 w-12">
          <Icon name="bxl:facebook" size="24" />
        </div>
        <div class="bg-secondary h-12 w-12"></div>
        <div class="bg-secondary h-12 w-12"></div>
      </div>
    </div>
    <div
      class="w-full md:w-1/2 flex flex-col items-center bg-primary-darken p-4"
    >
      <div class="flex flex-col items-center justify-center -translate-y-11">
        <span class="font-bold text-4xl">Subscribe </span>
        <span class="font-normal text-xl">To our newsletter</span>
      </div>
      <form>
        <div class="w-full md:w-3/4">
          <label for="Email" class="text-sm">Email Address</label>
          <input type="email" class="h-10 px-2 w-full mt-1" />
        </div>
        <button
          class="w-full md:w-1/4 bg-tertiary-default text-white font-semibold text-xl p-2"
        >
          Subscribe
        </button>
      </form>
    </div>
  </section>
</template>
