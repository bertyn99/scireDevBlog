<!-- ./components/Toc.vue -->

<script setup>
// define links prop
defineProps(["links"]);
// flatten TOC links nested arrays to one array
const flattenLinks = (links) => {
  let _links = links
    .map((link) => {
      let _link = [link];
      if (link.children) {
        let flattened = flattenLinks(link.children);
        _link = [link, ...flattened];
      }
      return _link;
    })
    .flat(1);
  console.log({ _links });
  return _links;
};
</script>

<template>
  <nav class="sticky top-24 p-4 bg-slate-50 border border-slate-200 rounded-lg">
    <header class="pb-2 mb-2 border-b border-slate-200">
      <h3 class="text-xl font-bold">Table of contents</h3>
    </header>
    <ul class="flex flex-col gap-2 px-2">
      <!-- render each link with depth class -->
      <li
        v-for="link of flattenLinks(links)"
        :key="link.id"
        :class="`text-slate-500 toc-link _${link.depth}`"
      >
        <a :href="`#${link.id}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.toc {
  @apply max-h-[calc(100vh-6rem)] overflow-auto;
}

.toc-link._3 {
  @apply pl-3;
}
.toc-link._4 {
  @apply pl-6;
}
.toc-link._undefined {
  @apply pl-8;
}
</style>
