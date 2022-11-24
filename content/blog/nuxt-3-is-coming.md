---
    title: 'Nuxt 3 is Coming! What is new?'
    description: 'After a long period of waiting for beta and release candidate nuxt 3 is finally stable. This is not a simple update to Vue 3, but a complete rewrite of Nuxt 2, with a new renderer and a new philosophy.'
    image: 'img/article/cover/nuxt.webp'
    author: 'Magius'
    category: 'tips and advice'
    createdAt: '2022-11-21'
    modifiedAt: '2022-11-24'
    tags: ['nuxt 3','vue']
    head:
        meta: 
            -  name: "keywords"
               content: "nuxt 3, vue 3, Nitro, H3, nuxt framework, nuxt 3 release"
            
---

After a long period of waiting for beta and release candidate nuxt 3 is finally stable. This is not a simple update to Vue 3, but a complete rewrite of Nuxt 2, with a new renderer and a new philosophy.

I'm going to introduce you to all the little changes and new features that come with this release. First of all, let's introduce what is Nuxt?

## Presentation of nuxt

Nuxt.js is a server-side rendering framework built on Vue.js.

It abstracts most of the complex configuration involved in handling asynchronous data, middleware and routing. It also helps to easily structure and build [Vue.js](https://nuxt.com/) applications in **SSG**/**SSR**/**ISR**...

## New Feature
### New Engine

**Nuxt 3** brings many optimizations and general improvements. This results in a smaller bundle size (20% lighter kernel compared to **Nuxt 2**) and improved performance.

Developers can expect better performance in development thanks to the new **Nitro** server engine with optimized cold starts and dynamic code splitting. **Nitro** is 75 times faster at startup than the **Nuxt 2** engine, and requires only 5ms at cold startup (and less in Cloudflare **workers**).

In addition, other parts of the tooling have also been upgraded - **Webpack 5**, **PostCSS 8**, **ESBuild** and Vite are now supported - making development and production builds extremely fast.

### Moving from Vue 2 to Vue 3

Unsurprisingly, Nuxt 3 will be based on Vue 3 and will offer an experience adapted to the latest version of the Vue framework. This means:

New modular utilities for the composition API;
Improved routing with Vue Router 4;
Revised data retrieval and Suspense integration.
In addition to the migration to Vue 3, **Nuxt 3** adopts ES (ESM) and TypeScript modules as first-class citizens to enhance the development experience.

### Best DX with strongly typed Nuxt

Nuxt 3 is written using the Typescript superset of the Javascript language. This means that IDEs will not have to guess the types and names of parameters. When using the Nuxt API, you'll get hints and tips about functions and classes exactly as they were described by the Nuxt 3 developers, making it easier to code without having to navigate through every API detail. This move aligns with what Vue 3 has done and where the Vue ecosystem as a whole is headed.

### Nuxt Kit

Est un toolkit qui permet aux auteurs de modules de plus facilement développper des modules Nuxt qui intéragissent avec les Nuxt Hook ou le Nuxt Build Core.

### Hybrid rendering

Avec cette nouvelle version nuxt support :

- Static Site Generating
- Server Side Rendering
- Incremental Site rendering 🆕

Nuxt permet aussi de gerer le rendering en fonction des routes grâce au route rules.

### Nuxt Theme

Is one of the new features I'm most excited about. This extends feature of nuxt 3 is a great way to share code between projects or even extend a third party project.

![Nuxt Extends example](/img/article/nuxt_extends.webp)

Potential use case that the Nuxt/Vue community already sees:

- extracting reusable code
- version controlled themes/templates

Some themes are already released such as:

[https://github.com/Atinux/content-wind](https://github.com/Atinux/content-wind)

and

[https://nuxtlabs.com/docus](https://nuxtlabs.com/docus)

## Conclusion

Nuxt definitely seems to have taken a turn with this third version. I was personally surprised by the announcement of this version, by the amount of updates and evolutions it brings. I really got the impression that [Nuxt 3](https://nuxt.com/) aims to provide innovations that go beyond being "the Vue.js meta-framework" but "an open-source framework making web development simple and powerful" as they say on the website.