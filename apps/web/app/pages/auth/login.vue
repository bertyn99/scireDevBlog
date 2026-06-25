<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  auth: 'guest',
})

const { signIn } = useUserSession()
const route = useRoute()

const form = reactive({
  email: '',
  password: '',
})
const error = ref('')
const loading = ref(false)

function getSafeRedirect() {
  const redirect = route.query.redirect as string
  if (!redirect?.startsWith('/') || redirect.startsWith('//')) {
    return '/'
  }
  return redirect
}

async function handleSubmit() {
  error.value = ''
  loading.value = true

  await signIn.email(
    { email: form.email, password: form.password },
    {
      onSuccess: () => navigateTo(getSafeRedirect()),
      onError: (ctx) => {
        error.value = ctx.error?.message || 'Invalid email or password'
      },
    },
  )

  loading.value = false
}

async function handleGithub() {
  await signIn.social({ provider: 'github' })
}
</script>

<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <UAlert
          v-if="error"
          color="error"
          :title="error"
          icon="i-heroicons-exclamation-triangle"
        />

        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
          >Email address</label>
          <div class="mt-2">
            <UInput
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
          >Password</label>
          <div class="mt-2">
            <UInput
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="text-sm leading-6">
            <a
              href="#"
              class="font-semibold text-primary-600 hover:text-primary-500"
            >Forgot password?</a>
          </div>
        </div>

        <div>
          <UButton type="submit" block :loading="loading">
            Sign in
          </UButton>
        </div>
      </form>

      <div>
        <div class="relative mt-10">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-gray-200" />
          </div>
          <div
            class="relative flex justify-center text-sm font-medium leading-6"
          >
            <span class="bg-white px-6 text-gray-900">Or continue with</span>
          </div>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-4">
          <UButton
            color="black"
            label="Github"
            icon="i-mdi-github"
            block
            @click="handleGithub"
          />
        </div>
      </div>
    </div>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      {{ " " }}
      <NuxtLink
        to="/auth/register"
        class="font-semibold leading-6 text-primary-600 hover:text-primary-500"
      >Create an account</NuxtLink>
    </p>
  </div>
</template>
