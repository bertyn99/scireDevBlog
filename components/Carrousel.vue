<template>
  <div class="container">
    <div class="flex w-full h-full">
      <div class="w-full md:w-1/2 h-full">
        <div class="flex py-5">
          <span class="bg-white p-3 translate-x-10 z-10">New Articles</span>
        </div>
        <div class="">
          <div class="flex items-center">
            <div class="relative overflow-hidden rounded-full h-8 w-8">
              <img
                src="https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aHVtYW58ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
                alt=""
                class="absolute w-full h-full"
              />
            </div>
            <div class="flex flex-col">
              <span class="text-secondary text-sm font-semibold">Ben Joe</span>
              <span class="text-primary-darken text-xs">Author</span>
            </div>
          </div>
        </div>

        <div class="mt-4 w-full overflow-y-auto">
          <h2 class="text-xl font-bold">Road To Basic: Discover Javascript</h2>
        </div>
      </div>
      <div class="h-full w-full max-w-md">
        <div class="relative bg-primary-darken h-5/6 w-full">
          <img
            src="https://media.istockphoto.com/photos/pressing-enter-button-picture-id479157044?b=1&k=20&m=479157044&s=170667a&w=0&h=RYGk5WZ61jKxkdciwdcKkSwv8hMwvYum8wRmLrzh5sU="
            alt=""
            class="absolute w-full h-full object-cover grayscale aspect-[4/3]"
          />
          <!-- <div class="absolute w-full h-full bg-primary-default/40 z-20"></div> -->
        </div>
        <div class="h-1/6 bg-secondary"></div>
      </div>
    </div>
  </div>
</template>
