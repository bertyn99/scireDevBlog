<template>
  <section
    class="container md:px-5 lg:px-18 py-5 flex flex-col-reverse md:flex-row justify-center items-center md:justify-around mx-auto"
  >
    <div
      class="flex flex-col md:flex-row items-center justify-between w-full md:w-1/2 max-w-md"
    >
      <div class="flex flex-col">
        <span>Share the knowledge</span
        ><span class="font-bold text-md">Come join us </span>
      </div>
      <div class="flex justify-between w-1/2 text-white">
        <div
          class="bg-primary-darken h-12 w-12 inline-flex items-center justify-center"
        >
          <Icon name="bxl:facebook" size="24" />
        </div>
        <div
          class="bg-primary-darken h-12 w-12 inline-flex items-center justify-center"
        >
          <Icon name="bxl:instagram" size="24" />
        </div>
        <div
          class="bg-primary-darken h-12 w-12 inline-flex items-center justify-center"
        >
          <Icon name="bxl:twitter" size="24" />
        </div>
      </div>
    </div>
    <div
      class="w-full md:w-1/2 max-w-md flex flex-col items-center bg-primary-darken/40 px-4 py-2"
    >
      <div class="flex flex-col items-center justify-center -translate-y-9">
        <span class="font-bold text-4xl">Subscribe </span>
        <span class="font-normal text-xl">To our newsletter</span>
      </div>
      <form class="">
        <label for="Email" class="text-sm">Email Address</label>
        <div class="flex flex-wrap w-full items-center mt-1">
          <input type="email" class="px-2 h-8 w-full md:w-3/4" />
          <button
            class="w-full md:w-1/4 h-8 bg-tertiary-default text-white p-2"
          >
            Subscribe
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
