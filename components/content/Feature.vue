<template>
  <div class="py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
          Empowering Young Developers
        </h2>
        <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Our online course platform is designed to equip young developers with the skills they need to succeed in the
          tech industry. With a range of interactive courses, personalized mentorship, and community support, you can
          accelerate your learning and build a strong foundation for your career.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          <div v-for="feature in features" :key="feature.name" class="flex flex-col">
            <dt class="text-base font-semibold leading-7 text-orange-600">
              <div class="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
                <component :is="feature.icon" class="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              {{ feature.name }}
            </dt>
            <dd class="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
              <p class="flex-auto">{{ feature.description }}</p>
              <p class="mt-6">
                <a :href="feature.href" class="text-sm font-semibold leading-6 text-orange-600">Learn more <span
                    aria-hidden="true">→</span></a>
              </p>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script setup>
import { InboxIcon, TrashIcon, UsersIcon } from "@heroicons/vue/24/outline";

const features = [
  {
    name: "Interactive Learning",
    description:
      "Engage in hands-on projects and real-world scenarios to reinforce your skills and understanding.",
    href: "#",
    icon: InboxIcon,
  },
  {
    name: "Personalized Mentorship",
    description:
      "Get guidance and support from experienced developers who are dedicated to helping you succeed.",
    href: "#",
    icon: UsersIcon,
  },
  {
    name: "Community Support",
    description:
      "Join a vibrant community of fellow learners to collaborate, share ideas, and grow together.",
    href: "#",
    icon: TrashIcon,
  },

];
</script>
