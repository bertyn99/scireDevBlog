<template>
  <section class="bg-canvas py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <p class="text-[13px] font-semibold uppercase tracking-[0.18em] text-ember">
          Grow from the roots
        </p>
        <h2 class="mt-3 text-3xl font-medium tracking-tight text-ink sm:text-4xl">
          Knowledge of the developer
        </h2>
        <p class="mt-6 text-lg leading-8 text-ink/70">
          ScireDev takes its name from Latin <span class="font-serif italic">scīre</span> — to know —
          and <span class="font-semibold text-ember">Dev</span>. A platform for the knowledge of the
          developer: interactive courses, adaptive exercises, and a community that keeps the spark lit.
        </p>
      </div>
      <div class="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-3 sm:mt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article
          v-for="feature in features"
          :key="feature.name"
          class="flex flex-col rounded-[var(--radius-card)] border border-black/10 bg-white p-6"
        >
          <div class="mb-5 flex h-9 w-9 items-center justify-center rounded-[var(--radius-card)] bg-ember">
            <UIcon :name="feature.icon" class="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <h3 class="text-base font-semibold text-ink">
            {{ feature.name }}
          </h3>
          <p class="mt-2 flex-auto text-sm leading-6 text-ink/70">
            {{ feature.description }}
          </p>
          <p class="mt-6">
            <NuxtLink :to="feature.href" class="text-sm font-semibold text-ember hover:text-tertiary-darken">
              Learn more <span aria-hidden="true">→</span>
            </NuxtLink>
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    name: "Interactive Learning",
    description:
      "Engage in hands-on projects and real-world scenarios to reinforce your skills and understanding.",
    href: "/courses",
    icon: "i-heroicons:inbox",
  },
  {
    name: "Personalized Mentorship",
    description:
      "Get guidance and support from experienced developers who are dedicated to helping you succeed.",
    href: "/blog",
    icon: "i-heroicons:users",
  },
  {
    name: "Community Support",
    description:
      "Join a vibrant community of fellow learners to collaborate, share ideas, and grow together.",
    href: "/blog",
    icon: "i-heroicons:user-group",
  },
]
</script>
