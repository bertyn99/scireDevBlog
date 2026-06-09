<!-- ./pages/blog/tags/[slug].vue -->

<script setup>
// get current route slug
const {
  params: { slug },
} = useRoute();

// get array of filters by generating array from separating slug`,`
const filter = slug.join(",").split(",");

const site = useSiteConfig();
useSeoMeta(
  useLoadMeta({
    title: `Articles with ${slug}`,
    description: "Here's a list of all my great articles",
    image: `${site.url}/img/scire_logo_primary.png`,
    url: `${site.url}/blog/tags/${slug}`,
  })
);

const { data: articles } = await useAsyncData(`tags-${slug}`, () => {
  let query = queryCollection('blog')
    .select("title", "description", "tags", "path", "image");

  // Filter by all tags in the slug
  for (const tag of filter) {
    query = query.where('tags', 'LIKE', `%${tag.trim()}%`);
  }

  return query.all();
});
</script>
<template>
  <main>
    <header class="page-heading">
      <div class="wrapper">
        <h1 class="text-5xl font-extrabold">
          All articles with tag{{ filter }}
        </h1>
        <p class="font-medium text-lg">
          Here's a list of all my great articles
        </p>
      </div>
    </header>
    <section class="page-section">
      <ul class="article-list">
        <li
          v-for="article in articles"
          :key="article.path"
          class="article-item"
        >
          <NuxtLink :to="article.path">
            <div class="wrapper">
              <div class="img-cont w-32">
                <img
                  :src="`/${article.image}`"
                  :alt="article.title"
                  class="rounded-lg max-h-[8rem]"
                />
              </div>
              <header>
                <h1 class="text-2xl font-semibold">{{ article.title }}</h1>
                <p>{{ article.description }}</p>
                <ul class="article-tags">
                  <li class="tag" v-for="(tag, n) in article.tags" :key="n">
                    <NuxtLink :to="`/blog/tags/${tag}`" class="underline">
                      {{ tag }}
                    </NuxtLink>
                  </li>
                </ul>
              </header>
            </div>
          </NuxtLink>
        </li>
      </ul>
      <p v-if="!articles?.length">No articles found.</p>
    </section>
  </main>
</template>
