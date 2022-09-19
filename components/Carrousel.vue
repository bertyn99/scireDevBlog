<template>
  <div class="flex w-full h-full">
    <div class="w-1/2 h-full">
      <div class="w-4/5 ml-auto min-w-[190px]">
        <div class="flex py-5">
          <span class="bg-white p-3 translate-x-10 z-10">New Articles</span>
        </div>
        <div class="mt-8">
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

        <div class="w-full h-2 ml-2 mt-6 relative">
          <h3 class="absolute z-10 text-xl font-bold whitespace-nowrap">
            Road To Basic: Discover Javascript eeeeeeeeeeeeeeeeeeeeeeeeee
          </h3>
        </div>
        <span
          class="my-8 before:block before:content-[''] before:mx-2 before:w-20 before:h-0.5 before:bg-primary-darken inline-flex text-primary-darken items-center text-sm"
          >Technologie</span
        >
        <p class="my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          sunt sed magni necessitatibus iusto ipsam earum incidunt, et modi
          molestias beatae accusamus nobis ducimus fugit, impedit, officiis
          sapiente!
        </p>
      </div>
    </div>
    <div class="w-1/2 flex-1">
      <div class="relative bg-primary-darken h-5/6 w-full">
        <img
          src="https://media.istockphoto.com/photos/pressing-enter-button-picture-id479157044?b=1&k=20&m=479157044&s=170667a&w=0&h=RYGk5WZ61jKxkdciwdcKkSwv8hMwvYum8wRmLrzh5sU="
          alt=""
          class="absolute w-full h-full object-cover grayscale aspect-[4/3]"
        />
        <!-- <div class="absolute w-full h-full bg-primary-default/40 z-20"></div> -->
      </div>
      <div class="h-1/6 bg-secondary">
        <button class="bg-white h-full p-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button class="bg-white h-full p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
