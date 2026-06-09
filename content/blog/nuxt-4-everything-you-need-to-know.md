---
title: 'Nuxt 4: New Features, Migration Guide, and What Changed from Nuxt 3'
description: Nuxt 4 is stable. Explore the new app/ directory, singleton data fetching, TypeScript project references, breaking changes, and how to upgrade from Nuxt 3.
image: img/article/cover/nuxt_3_evolution.webp
author: Magius
category: tips and advice
createdAt: '2026-06-09'
modifiedAt: '2026-06-09'
tags:
  - nuxt 4
  - nuxt
  - vue
  - migration
  - typescript
head:
  meta:
    - name: keywords
      content: nuxt 4, nuxt 4 new features, nuxt 4 release, nuxt 4 migration, nuxt 4 vs nuxt 3, nuxt upgrade guide, vue nuxt, nuxt app directory, useFetch nuxt 4
---

Nuxt 4 shipped as a stable release in July 2025. If you followed our earlier coverage of [Nuxt 3's launch](/blog/nuxt-3-is-coming) and its [ecosystem evolution](/blog/nuxt-3-a-evolution), this next chapter feels familiar: fewer fireworks, more polish. Nuxt 4 is a stability-focused major release that turns years of incremental improvements into sensible defaults.

Most teams can upgrade without drama. The breaking changes were previewable for over a year through `compatibilityVersion: 4` in `nuxt.config.ts`, and official codemods handle the repetitive migration work. This guide walks through what actually changed, why it matters, and how to move from Nuxt 3 with confidence.

> **Prerequisites:** You should be comfortable with Nuxt 3 basics — composables, `nuxt.config.ts`, and the `server/` directory. Nuxt 3 receives maintenance updates until July 2026.

## What Is Nuxt 4?

Nuxt 4 (`v4.0.0`) is the current stable major version of the Vue meta-framework. It keeps Vue 3, Nitro 2, and the UnJS stack you already know, while reshaping project structure, data fetching, and TypeScript tooling.

The Nuxt team describes it as **hype-free by design**. Instead of hoarding features for a big-bang release, most improvements landed in Nuxt 3 minor versions first, then became defaults in v4. That strategy keeps upgrades predictable — closer to flipping well-tested switches than rewriting your app.

| Aspect | Nuxt 3 | Nuxt 4 |
| --- | --- | --- |
| Vue | 3.x | 3.x |
| Vite | ~5.x | **6.x** |
| Nitro | 2.x | 2.x |
| Unhead | 1.x | **2.x** |
| Default `srcDir` | Project root | **`app/`** |
| Data fetching | Per-component refs | **Shared singleton layer** |
| TypeScript | Single project config | **Per-context project references** |

## The New `app/` Directory Structure

The most visible change in Nuxt 4 is where your application code lives. By default, source files move into an `app/` subdirectory:

```
my-nuxt-app/
├─ app/
│  ├─ assets/
│  ├─ components/
│  ├─ composables/
│  ├─ layouts/
│  ├─ middleware/
│  ├─ pages/
│  ├─ plugins/
│  ├─ utils/
│  ├─ app.vue
│  ├─ app.config.ts
│  └─ error.vue
├─ content/
├─ public/
├─ shared/         ← new
├─ server/
└─ nuxt.config.ts
```

The `~` alias now resolves to `app/`, so `~/components/Button.vue` points to `app/components/Button.vue`. The `server/` directory stays at the project root, which gives your IDE cleaner separation between client and server code.

A new **`shared/`** directory sits at the root for code used by both the Vue app and Nitro server. Files in `shared/utils/` and `shared/types/` are auto-imported in both contexts — a much cleaner pattern than awkward cross-import workarounds.

> **Tip:** Migration is optional. Nuxt auto-detects the legacy flat structure and keeps it working. When you are ready, run `npx codemod@latest nuxt/4/file-structure` or set `srcDir: '.'` to keep the old layout explicitly.

### Why the `app/` folder matters

File watchers no longer scan `node_modules/` and `.git/` alongside your source tree. On Windows and Linux, that translates to noticeably faster dev server startup. If you have ever waited through a slow cold start on a large monorepo, this alone justifies the move.

## Singleton Data Fetching

`useAsyncData` and `useFetch` received the deepest behavioral changes in Nuxt 4. The data layer is now a **singleton keyed by fetch key**.

### Shared state across components

Multiple components calling `useFetch('/api/users')` with the same key share one `data`, `error`, and `status` ref. You get a single network request and consistent loading states everywhere — no more duplicate fetches or desynchronized spinners.

### Shallow reactivity by default

`data` is now a `shallowRef` instead of a deep `ref`. Large API payloads consume less memory and trigger fewer reactive updates. If you mutate nested properties directly, opt back into deep reactivity:

```ts [composables/useUser.ts]
// Default in Nuxt 4: shallow (faster)
const { data } = await useFetch('/api/users')

// Opt in when you mutate nested fields
const { data } = await useFetch('/api/user', { deep: true })
```

Run `npx codemod@latest nuxt/4/shallow-data-reactivity` if you need to find code that relied on deep mutation.

### Reactive keys

Keys now accept `computed`, `ref`, or getter functions. When the key changes, Nuxt refetches automatically — no manual `watch` boilerplate:

```ts [pages/users/[id].vue]
const userId = ref('123')

const { data } = await useAsyncData(
  computed(() => `user-${userId.value}`),
  () => $fetch(`/api/users/${userId.value}`)
)
```

### Automatic cleanup

When the last component using a given key unmounts, Nuxt removes the cached entry. That prevents memory leaks in long-lived SPAs with heavy data fetching.

> **Warning:** If multiple components use the same key with different `deep`, `transform`, `pick`, or `default` options, Nuxt 4 warns about conflicts. Extract shared fetches into a dedicated composable to keep options consistent.

## TypeScript Project References

Nuxt 4 generates separate TypeScript configurations for each runtime context:

| File | Context |
| --- | --- |
| `.nuxt/tsconfig.app.json` | Vue app code in `app/` |
| `.nuxt/tsconfig.server.json` | Nitro server code |
| `.nuxt/tsconfig.shared.json` | `shared/` directory |
| `.nuxt/tsconfig.node.json` | `nuxt.config.ts` and build tooling |

Your root `tsconfig.json` becomes a thin shell that references these projects:

```json [tsconfig.json]
{
  "files": [],
  "references": [
    { "path": "./.nuxt/tsconfig.app.json" },
    { "path": "./.nuxt/tsconfig.server.json" },
    { "path": "./.nuxt/tsconfig.shared.json" },
    { "path": "./.nuxt/tsconfig.node.json" }
  ]
}
```

The payoff is immediate in your editor: server-only APIs stop appearing in client code (and vice versa), autocompletion gets more accurate, and false-positive type errors drop sharply. Customize per context through `typescript.tsConfig`, `typescript.sharedTsConfig`, and `nitro.typescript.tsConfig` in `nuxt.config.ts`.

## Faster CLI and Development Server

Nuxt 4 bundles several performance wins that add up during daily development:

- **V8 compile cache reuse** between dev server restarts
- **Native `fs.watch`** instead of polling-based file watching
- **Unix socket communication** between the CLI and Vite dev server (lower overhead than TCP localhost ports, especially on Windows)
- **Per-component CSS inlining** — global CSS loads as a separate cacheable file instead of bloating every page payload

These are not headline features, but they are the kind of quality-of-life improvements that make Nuxt 4 feel snappier from the first `pnpm dev`.

## Breaking Changes and Migration

Impact varies by project size and how heavily you relied on Nuxt 3 internals. Here is a practical breakdown.

### Moderate impact

**Shallow data reactivity** — Code that mutated nested `data.value` properties from `useFetch` without `{ deep: true }` may stop updating the UI. Audit composables that write into fetched objects.

**`getCachedData` signature** — The callback now receives `(key, nuxtApp, ctx)` where `ctx.cause` is `'initial' | 'refresh:hook' | 'refresh:manual' | 'watch'`.

**Normalized component names** — Vue DevTools and auto-import names now align (e.g. `SomeFolderMyComponent`). Tests using `findComponent({ name: 'MyComponent' })` or `<KeepAlive>` name matching may need updates.

**Inline styles** — Nuxt 4 inlines per-component styles only. Revert to the old behavior with `features: { inlineStyles: true }` if needed.

### Minimal impact

**`dedupe` option** — Booleans are gone; use `'cancel'` or `'defer'`:

```ts
// Nuxt 3
await refresh({ dedupe: true })

// Nuxt 4
await refresh({ dedupe: 'cancel' })
```

**Default `data` / `error` values** — Changed from `null` to `undefined` before the first fetch completes.

**`generate.*` config removed** — Use `nitro.prerender` instead:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  nitro: {
    prerender: {
      ignore: ['/admin'],
      routes: ['/sitemap.xml'],
    },
  },
})
```

**Unhead v2** — Legacy props like `vmid`, `hid`, `children`, and `body` are removed. Tags are sorted by Capo.js rules by default.

### Automated migration

Nuxt partnered with Codemod to script most upgrades:

```bash
npx codemod@latest nuxt/4/migration-recipe
```

Individual recipes cover file structure, shallow reactivity, dedupe values, and default data/error values.

## Nuxt 4 vs Nuxt 3: Should You Upgrade?

Upgrade now if:

- You want faster dev startup and cleaner project structure
- You are starting a new Nuxt project (default to v4)
- Your team benefits from stricter TypeScript context separation

Stay on Nuxt 3 a bit longer if:

- You depend on Unhead v1-specific meta tag patterns that are hard to migrate quickly
- You have extensive tests tied to old component naming conventions
- You need maximum ecosystem module compatibility during a critical release window

Nuxt 3 maintenance continues until **July 2026**, so you have a defined runway. Nuxt 4 support is guaranteed for at least six months after Nuxt 5 ships.

## What Is Coming in Nuxt 5?

Nuxt 4 deliberately holds back the largest infrastructure jumps. **Nitro 3**, **Vite Environment API**, **h3 v2**, and **Rolldown/Vite 8** integration are staged for Nuxt 5.

From Nuxt 4.2+, you can preview Nuxt 5 behavior:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 5,
  },
})
```

That opt-in surfaces faster hook calls, normalized page names, and Vite 6 environment APIs — useful for early adopters, not required for production today.

## Conclusion

Nuxt 4 is an evolutionary release that rewards teams who stayed current on Nuxt 3 minors. The `app/` directory, singleton data fetching, and TypeScript project references address long-standing friction without forcing a framework rewrite.

If you are still on Nuxt 3, start by enabling `compatibilityVersion: 4` in a branch, run the migration codemods, and fix the shallow-reactivity and `getCachedData` call sites. Most apps upgrade in an afternoon.

## Resources

- [Announcing Nuxt 4.0](https://nuxt.com/blog/v4) — official release post
- [Nuxt 4 upgrade guide](https://nuxt.com/docs/4.x/getting-started/upgrade) — complete breaking-change reference
- [Nuxt 4 data fetching](https://nuxt.com/docs/4.x/getting-started/data-fetching) — singleton layer documentation
- [Codemod migration recipes](https://docs.codemod.com/guides/migrations/nuxt-3-4) — automated upgrade scripts
- [Nuxt roadmap](https://nuxt.com/docs/4.x/community/roadmap) — what lands in Nuxt 5
