<template>
  <div class="flex flex-col md:col-span-2 row-span-4 flex-wrap">
    <div class="hidden sm:block w-1/2 h-full">
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

        <div class="w-full h-16 ml-2 mt-6 relative">
          <h3 class="absolute w-[35vw] z-10 text-3xl font-bold">
            Road To Basic: Discover Javascript mais biensur
          </h3>
        </div>
        <span
          class="my-6 before:block before:content-[''] before:mx-2 before:w-20 before:h-0.5 before:bg-primary-darken inline-flex text-primary-darken items-center text-sm"
        >
          Technologie
        </span>
        <p class="mb-8 text-primary-darken px-2">
          Lorem ipsum dolor sit amet consectet adipis elit. Consectetur sunt sed
          magni necessitat iusto ipsam earum incidunt, et modi molestias beatae
          accusamus nobis ducimus fugit, impedit, officiis sapiente!
        </p>
        <div class="flex gap-8 px-2">
          <span
            class="inline-flex items-center gap-1 text-sm text-primary-darken"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 text-secondary"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            200</span
          >
          <span
            class="inline-flex items-center gap-1 text-sm text-primary-darken"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 text-secondary"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            200</span
          >
          <span
            class="inline-flex items-center gap-1 text-sm text-primary-darken"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4 text-secondary"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            200</span
          >
        </div>

        <div class="mt-4 w-full h-full">
          <span class="text-6xl text-bold"
            >2
            <span class="text-5xl text-bold text-primary-darken">/5</span></span
          >
        </div>
      </div>
    </div>
    <div class="h-[375px] sm:w-1/2 relative bg-primary-darken sm:h-[90%]">
      <img
        src="https://media.istockphoto.com/photos/pressing-enter-button-picture-id479157044?b=1&k=20&m=479157044&s=170667a&w=0&h=RYGk5WZ61jKxkdciwdcKkSwv8hMwvYum8wRmLrzh5sU="
        alt=""
        class="absolute w-full h-full object-cover grayscale"
      />
      <NuxtLink
        class="hidden sm:inline-flex absolute p-4 z-20 -left-5 bottom-10 items-center gap-2 bg-tertiary-default text-white"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
          />
        </svg>
        <span class="capitalize">Read More</span>
      </NuxtLink>
      <!-- <div class="absolute w-full h-full bg-primary-default/40 z-20"></div> -->
    </div>
    <div
      class="sm:w-1/2 h-14 sm:h-[10%] bg-secondary inline-flex flex-row-reverse sm:flex-row"
    >
      <div>
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
