<template>
  <section
    class="container md:px-5 lg:px-18 py-5 flex flex-col-reverse md:flex-row justify-center items-center md:justify-around mx-auto">
    <div class="flex flex-col md:flex-row items-center justify-between w-full md:w-1/2 max-w-md">
      <div class="flex flex-col">
        <span>Share the knowledge</span><span class="font-bold text-md">Come join us </span>
      </div>
      <div class="flex justify-between w-1/2 text-white">
        <div class="bg-primary-darken h-12 w-12 inline-flex items-center justify-center">
          <UIcon name="i-bxl:facebook" size="24" />
        </div>
        <div class="bg-primary-darken h-12 w-12 inline-flex items-center justify-center">
          <UIcon name="i-bxl:instagram" size="24" />
        </div>
        <div class="bg-primary-darken h-12 w-12 inline-flex items-center justify-center">
          <UIcon name="i-bxl:twitter" size="24" />
        </div>
      </div>
    </div>
    <div class="w-full md:w-1/2 max-w-lg items-center bg-primary-darken/40 px-4 py-14 relative">
      <div class="absolute top-2 left-0 right-0 flex flex-col items-center justify-center -translate-y-9">
        <span
          class="font-bold text-4xl relative before:block before:absolute before:-right-2 before:w-12 before:h-7 before:-top-0 before:bg-tertiary-default/20 before:-z-50">Subscribe
        </span>
        <span class="font-normal text-xl">To our newsletter</span>
      </div>
      <form class="w-full px-8">
        <label for="Email" class="text-sm">Email Address</label>
        <div class="flex flex-wrap w-full h-full items-center mt-1">
          <input type="email" class="px-2 w-full md:w-3/4 py-2" />
          <button class="w-full md:w-1/4 bg-tertiary-default text-white px-2 py-2">
            Subscribe
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
