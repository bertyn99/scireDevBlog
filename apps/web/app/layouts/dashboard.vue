<script lang="ts" setup>
/**
 * Dashboard layout — compact navbar for authenticated learners.
 * Logo (left) · primary nav · user avatar dropdown with logout (right).
 * No blog-specific nav items — learning-focused only.
 */
const { user, signOut } = useUserSession()

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: 'i-heroicons-home' },
  { label: 'Courses', to: '/courses', icon: 'i-heroicons-academic-cap' },
  { label: 'Paths', to: '/paths', icon: 'i-heroicons-map' },
]

async function handleLogout() {
  await signOut()
  await navigateTo('/')
}
</script>

<template>
  <div class="min-h-screen bg-default flex flex-col">
    <header class="sticky top-0 z-40 border-b border-default bg-default/80 backdrop-blur">
      <nav class="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8" aria-label="Dashboard navigation">
        <!-- Logo + primary nav -->
        <div class="flex items-center gap-8">
          <NuxtLink to="/dashboard" class="flex items-center gap-2" aria-label="ScireDev home">
            <img src="/img/scire_logo_primary.png" alt="" class="h-9 w-auto" />
          </NuxtLink>
          <ul class="hidden items-center gap-1 md:flex">
            <li v-for="item in navItems" :key="item.to">
              <UButton
                :to="item.to"
                variant="ghost"
                color="neutral"
                size="sm"
                :icon="item.icon"
                :label="item.label"
              />
            </li>
          </ul>
        </div>

        <!-- User avatar dropdown -->
        <div class="flex items-center gap-3">
          <UDropdownMenu
            :items="[
              [{ label: user?.name || user?.email || 'Account', icon: 'i-heroicons-user', type: 'label' }],
              [
                { label: 'Dashboard', icon: 'i-heroicons-home', to: '/dashboard' },
                { label: 'Settings', icon: 'i-heroicons-cog-6-tooth', to: '/settings' },
              ],
              [{ label: 'Sign out', icon: 'i-heroicons-arrow-right-on-rectangle', onSelect: handleLogout }],
            ]"
          >
            <UButton variant="ghost" color="neutral" class="gap-2">
              <UAvatar
                :alt="(user?.name || user?.email || '?').slice(0, 1)"
                size="sm"
              />
              <span class="hidden text-sm font-medium sm:inline">{{ user?.name || 'Account' }}</span>
              <UIcon name="i-heroicons-chevron-down" class="hidden size-4 opacity-60 sm:inline" />
            </UButton>
          </UDropdownMenu>
        </div>
      </nav>
    </header>

    <main class="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>
