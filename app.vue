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
    "@id": "organization",
    name: "ScireDev",
    logo: "https://www.sciredev.com/logo.png",
    /*    logo: "",
    sameAs: [], */
  }),
]);
</script>
