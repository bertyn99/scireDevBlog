<script lang="ts" setup>
const route = useRoute()
const site = useSiteConfig()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('content').path(route.path).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}

const title = page.value.title
const metaTitle = page.value.seo?.title ?? title
const description = page.value.seo?.description ?? page.value.description
const image = page.value.image
  ? `${site.url}${page.value.image.startsWith('/') ? page.value.image : `/${page.value.image}`}`
  : `${site.url}/img/scire_logo_primary.png`

useSeoMeta({
  ...useLoadMeta({
    title: metaTitle,
    description,
    image,
    url: site.url,
  }),
  robots: 'index, follow, max-image-preview:large',
})

useHead({
  link: [{ rel: 'canonical', href: site.url }],
})

useSchemaOrg([
  defineWebPage({
    name: metaTitle,
    description,
    url: site.url,
  }),
  defineSoftwareApp({
    name: site.name,
    description,
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    url: site.url,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  }),
])

defineOgImage('OgImageLanding.takumi', {
  title: metaTitle,
  description,
  siteName: site.name,
})
</script>

<template>
  <main>
    <ContentRenderer v-if="page" :value="page" />
  </main>
</template>
