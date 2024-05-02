<script lang="ts" setup>
const footerNavigation = {
  solutions: [{ name: "Blog", href: "#" }],
  /*  connect: [{ name: "Sponsor", href: "#" }],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Partners", href: "#" },
  ],
  legal: [
    { name: "Claim", href: "#" },
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
  ], */
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: "mdi:twitter",
    },
    {
      name: "Pinterest",
      href: "#",
      icon: "mdi:pinterest",
    },
  ],
};
</script>

<template>
  <footer
    class="mt-32 bg-neutral-900 sm:mt-56"
    aria-labelledby="footer-heading"
  >
    <h2 id="footer-heading" class="sr-only">Footer</h2>
    <div class="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
      <div class="xl:grid xl:grid-cols-3 xl:gap-8">
        <img
          class="h-20"
          src="/img/scire_logo_secondary.png"
          alt="Company name"
        />
        <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-white">Learn</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in footerNavigation.solutions" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                    >{{ item.name }}</a
                  >
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-white">
                Connect
              </h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in footerNavigation.connect" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                    >{{ item.name }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
          <div class="md:grid md:grid-cols-2 md:gap-8">
            <div>
              <h3 class="text-sm font-semibold leading-6 text-white">
                Company
              </h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in footerNavigation.company" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                    >{{ item.name }}</a
                  >
                </li>
              </ul>
            </div>
            <div class="mt-10 md:mt-0">
              <h3 class="text-sm font-semibold leading-6 text-white">Legal</h3>
              <ul role="list" class="mt-6 space-y-4">
                <li v-for="item in footerNavigation.legal" :key="item.name">
                  <a
                    :href="item.href"
                    class="text-sm leading-6 text-gray-300 hover:text-white"
                    >{{ item.name }}</a
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div
        class="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 lg:flex lg:items-center lg:justify-between"
      >
        <div>
          <h3 class="text-sm font-semibold leading-6 text-white">
            Subscribe to our newsletter
          </h3>
          <p class="mt-2 text-sm leading-6 text-gray-300">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
        </div>
        <form class="mt-6 sm:flex sm:max-w-md lg:mt-0">
          <label for="email-address" class="sr-only">Email address</label>
          <input
            type="email"
            name="email-address"
            id="email-address"
            autocomplete="email"
            required="true"
            class="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:w-56 sm:text-sm sm:leading-6"
            placeholder="Enter your email"
          />
          <div class="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
            <button
              type="submit"
              class="flex w-full items-center justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
      <div
        class="mt-8 border-t border-white/10 pt-8 md:flex md:items-center md:justify-between"
      >
        <div class="flex space-x-6 md:order-2">
          <NuxtLink
            v-for="item in footerNavigation.social"
            :key="item.name"
            :href="item.href"
            class="text-gray-500 hover:text-gray-400"
          >
            <span class="sr-only">{{ item.name }}</span>
            <Icon :name="item.icon" class="h-6 w-6" aria-hidden="true" />
          </NuxtLink>
        </div>
        <p class="mt-8 text-xs leading-5 text-gray-400 md:order-1 md:mt-0">
          &copy; 2020 sciredev, Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>
