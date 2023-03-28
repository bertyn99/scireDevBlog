<template>
  <div id="app">
    <SeoKit />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useSchemaOrg([
  // @todo Select Identity: https://vue-schema-org.netlify.app/guide/guides/identity
  defineWebSite({
    "@id": "https://www.sciredev.com/",
    name: "ScireDev",
  }),
  defineBreadcrumb({}),
  defineOrganization({
    "@id": "https://www.sciredev.com/#organization",
    name: "ScireDev",
    url: "https://www.sciredev.com/",
    logo: "https://www.sciredev.com/img/scire_logo_primary.png",
    /*    sameAs: [
      "https://www.facebook.com/sciredev",
      "https://twitter.com/sciredev",
      "https://www.instagram.com/sciredev/",
      "https://www.linkedin.com/company/sciredev/",
    ], */
  }),
]);
</script>
