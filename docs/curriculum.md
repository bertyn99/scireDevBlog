# Curriculum — Vue & Nuxt Learning Paths

**Status**: 🟡 Draft — will evolve as courses are developed
**Target audience**: Developers who want structured, backend-style rigor applied to frontend

## Design Principles

1. **Learn the language before the framework.** JavaScript fundamentals first — just like you learn a language before building APIs in backend.
2. **Vanilla before abstraction.** Understand the DOM before using a framework's template sugar. Understand CSS before Tailwind.
3. **Every course has a capstone.** Each course ends with a build-along project. Starter code is free. Full source + solution branch is subscriber-only.
4. **Exercises adapt to weaknesses.** The adaptive engine tracks mastery per concept and routes students to their weakest areas.
5. **Courses are shared across paths.** Write a course once. It appears in multiple learning paths. Students don't repeat content.

---

## Learning Paths

### Path 1: Frontend Engineer (Vue)

```
120 hours · Beginner → Intermediate

Stage 1 — JavaScript (35h)
├── javascript-basics          (8h)  Variables, types, functions, control flow
├── javascript-intermediate    (10h) Arrays, objects, destructuring, modules, error handling
├── async-javascript           (8h)  Promises, async/await, fetch, error patterns
└── javascript-advanced        (9h)  Closures, prototypes, this, event loop, patterns

Stage 2 — The Platform (20h)
├── html-semantics             (6h)  Document structure, forms, accessibility basics
├── dom-manipulation           (8h)  Querying, creating, events, delegation
└── browser-apis               (6h)  Storage, history, location, fetch, web workers

Stage 3 — Styling (25h)
├── css-fundamentals           (10h) Box model, cascade, specificity, selectors
├── css-layout                 (9h)  Flexbox, grid, positioning, responsive patterns
└── css-architecture           (6h)  Custom properties, design tokens, BEM, cascade layers

Stage 4 — Vue (30h)
├── vue-fundamentals           (12h) SFC, reactivity, computed, watchers, directives
├── vue-components             (10h) Props, events, slots, provide/inject, composables
└── vue-routing                (8h)  Vue Router, guards, layouts, transitions

Stage 5 — Production (10h)
├── testing-frontend           (5h)  Vitest, component tests, testing-library
└── deployment                 (5h)  Vite build, Cloudflare Pages, CI/CD
```

### Path 2: Full-Stack Engineer (Nuxt)

```
150 hours · Intermediate → Advanced
(Assumes Frontend Engineer path or equivalent JS knowledge)

Stage 1 — Backend Foundations (30h)
├── nodejs-fundamentals        (10h) Runtime, modules, file system, streams, events
├── rest-apis                  (10h) HTTP, routing, middleware, validation, error handling
└── databases-basics           (10h) SQL, Drizzle ORM, migrations, relationships

Stage 2 — Nuxt (35h)
├── nuxt-fundamentals          (12h) SSR, auto-imports, file-based routing, server routes
├── nuxt-data-fetching         (10h) useFetch, useAsyncData, caching, error boundaries
└── nuxt-auth                  (8h)  Better Auth, sessions, middleware, protected routes
  + nuxt-capstone              (5h)  Build a full SaaS starter (auth + DB + billing)

Stage 3 — Advanced Full-Stack (25h)
├── fullstack-patterns         (8h)  API design, n+1, optimistic updates, error handling
├── real-time                  (7h)  WebSockets, SSE, presence, notifications
└── payments                   (10h) Stripe, webhooks, subscription management

Stage 4 — Production (20h)
├── testing-fullstack          (6h)  E2E, API tests, test databases, CI
├── performance                (7h)  ISR, caching, bundle analysis, Core Web Vitals
└── devops-basics              (7h)  Docker, monitoring, logging, incident response
```

### Path 3: CSS Specialist

```
60 hours · Beginner → Intermediate

Stage 1 — Foundations (25h)
├── css-fundamentals           (10h) Box model, cascade, specificity, selectors
├── css-layout                 (9h)  Flexbox, grid, positioning, responsive patterns
└── css-typography             (6h)  Font loading, variable fonts, vertical rhythm

Stage 2 — Architecture (20h)
├── css-architecture           (6h)  Custom properties, design tokens, BEM, cascade layers
├── css-animations             (8h)  Transitions, keyframes, scroll-driven, performance
└── responsive-patterns        (6h)  Container queries, clamp(), fluid typography

Stage 3 — Systems (15h)
├── design-systems             (8h)  Tokens → components, Figma ↔ code, documentation
└── accessibility              (7h)  WCAG, screen readers, focus, semantic HTML + CSS
```

---

## Course Catalog

### JavaScript Track

#### `javascript-basics` (8h — beginner)
```
01. Variables (let, const, var — why const is default)
02. Types (primitives: string, number, boolean, null, undefined, symbol)
03. Operators (arithmetic, comparison, logical, typeof, coercion traps)
04. Functions I (declarations, parameters, return, default values)
05. Functions II (expressions, arrow functions, the "why" behind each)
06. Control flow (if/else, switch, ternary, truthy/falsy deep dive)
07. Loops (for, while, for...of, for...in, when to use each)
08. Capstone: Calculator (build a CLI calculator with all concepts)
```

#### `javascript-intermediate` (10h — beginner)
```
01. Arrays I (creation, access, push/pop, length)
02. Arrays II (map, filter, reduce, find — introduced as "array pipelines")
03. Objects I (literals, dot/bracket notation, methods, this binding)
04. Objects II (Object.keys/values/entries, spread, merging)
05. Destructuring (arrays, objects, nested, defaults, rest pattern)
06. Template literals (interpolation, tagged templates, multiline)
07. Modules (import/export, named vs default, dynamic import)
08. Error handling (try/catch, throw, custom errors, error propagation)
09. Dates & Intl (Date API, Intl formatting, timezones)
10. Capstone: Task CLI (build a task manager in Node.js)
```

#### `async-javascript` (8h — intermediate)
```
01. Callbacks (the foundation: what they are, callback hell, error-first)
02. Promises I (creating, then/catch, chaining, Promise.all/race)
03. Promises II (Promise.allSettled, any, static methods, error patterns)
04. async/await (syntax, error handling with try/catch, top-level await)
05. Fetch API (GET, POST, headers, response parsing, error handling)
06. Real API integration (build against a real REST API, pagination)
07. Concurrent patterns (Promise.all vs sequential, race conditions)
08. Capstone: Weather dashboard (fetch + display + error states)
```

#### `javascript-advanced` (9h — intermediate)
```
01. Execution context & scope (global, function, block, lexical)
02. Closures (what they are, why they matter, practical patterns)
03. Prototypes (prototype chain, Object.create, class vs prototype)
04. this deep dive (4 binding rules, arrow functions, bind/call/apply)
05. Event loop (call stack, task queue, microtasks, requestAnimationFrame)
06. Iterators & generators (Symbol.iterator, yield, async generators)
07. Design patterns (module, observer, singleton, factory in JS)
08. Capstone: Event emitter library (build a pub/sub system from scratch)
```

### Platform Track

#### `html-semantics` (6h — beginner)
```
01. Document structure (doctype, html, head, body, meta tags)
02. Text content (headings hierarchy, paragraphs, lists, quotes)
03. Semantic sections (header, main, footer, nav, article, aside, section)
04. Forms I (input types, labels, fieldsets, validation attributes)
05. Forms II (select, textarea, datalist, output, form submission)
06. Accessibility foundations (alt text, ARIA when needed, keyboard, landmarks)
```

#### `dom-manipulation` (8h — beginner)
```
01. Selecting elements (querySelector, querySelectorAll, getElementById)
02. Creating & removing (createElement, append, remove, innerHTML risks)
03. Attributes & classes (getAttribute, dataset, classList, style)
04. Events I (addEventListener, event object, bubbling vs capturing)
05. Events II (delegation, custom events, abort controller)
06. Forms from JS (FormData, validation API, preventDefault)
07. Templates (template element, cloning, DocumentFragment)
08. Capstone: Interactive quiz (DOM-built QCM with scoring)
```

#### `browser-apis` (6h — intermediate)
```
01. Storage (localStorage, sessionStorage, IndexedDB basics)
02. History & location (pushState, popstate, URL API)
03. Timers (setTimeout, setInterval, requestAnimationFrame)
04. Web Workers (dedicated workers, postMessage, off-main-thread)
05. Intersection Observer (lazy loading, scroll spy, infinite scroll)
06. File & Drag APIs (FileReader, drag/drop, clipboard)
```

### Styling Track

#### `css-fundamentals` (10h — beginner)
```
01. Adding CSS (inline, style tag, external, cascade order)
02. Selectors I (type, class, ID, universal, grouping)
03. Selectors II (combinators: descendant, child, sibling, adjacent)
04. Selectors III (pseudo-classes, pseudo-elements, attribute selectors)
05. Specificity & the cascade (scoring, !important, where/when)
06. Box model (content, padding, border, margin, box-sizing)
07. Display property (block, inline, inline-block, none, flow)
08. Values & units (px, em, rem, vh/vw, %, calc, min/max/clamp)
09. Colors (hex, rgb, hsl, opacity, currentColor, color-mix)
10. Backgrounds & borders (gradients, multiple backgrounds, border-radius)
```

#### `css-layout` (9h — intermediate)
```
01. Normal flow & positioning (static, relative, absolute, fixed, sticky)
02. Flexbox I (container properties, main/cross axis mental model)
03. Flexbox II (item properties, grow/shrink/basis, auto margins)
04. Flexbox III (real layouts: navbar, card grid, centered hero, sidebar)
05. Grid I (defining grids, fr unit, repeat, gap, explicit vs implicit)
06. Grid II (placement, grid-area, named lines, auto-fill/auto-fit)
07. Grid III (real layouts: holy grail, dashboard, magazine, masonry)
08. Responsive patterns (media queries, container queries, mobile-first)
09. Capstone: Landing page (build a complete page from a Figma design)
```

#### `css-architecture` (6h — intermediate)
```
01. Custom properties (declaring, scoping, fallbacks, theming)
02. Design tokens (color scale, spacing scale, typography scale)
03. Naming conventions (BEM, utility-first tradeoffs)
04. Cascade layers (@layer, ordering, third-party isolation)
05. CSS & components (scoped styles, :deep(), CSS Modules)
06. Modern CSS features (nesting, :has(), container queries, view transitions)
```

### Vue Track

#### `vue-fundamentals` (12h — beginner with JS knowledge)
```
01. Why Vue? (reactivity model, SFC, progressive framework)
02. Template syntax (interpolation, directives, v-bind, v-model)
03. Reactivity (ref, reactive, computed, watchers — when to use what)
04. Conditional & list rendering (v-if/v-show, v-for, keys, transitions)
05. Event handling (v-on, modifiers, custom events, event bus)
06. Component basics (props, emits, slots, component registration)
07. Forms & v-model (two-way binding, modifiers, custom inputs)
08. Lifecycle hooks (created, mounted, updated, unmounted — practical use)
09. Composables (extracting logic, useMouse, useFetch patterns)
10. Single File Components (script setup, TypeScript, defineProps/Emits)
11. Teleport & dynamic components (modal patterns, tab switching)
12. Capstone: Task board (Trello-like with drag-drop, persistence)
```

#### `vue-components` (10h — intermediate)
```
01. Props deep dive (validation, defaults, readonly, generic types)
02. Events & v-model (defineEmits, defineModel, component v-model)
03. Slots (default, named, scoped, dynamic, renderless components)
04. Provide/Inject (dependency injection, avoiding prop drilling)
05. Composables patterns (stateful, stateless, async, testing)
06. Component patterns (compound, render props, controlled/uncontrolled)
07. Dynamic components (component :is, keep-alive, async components)
08. Transitions & animations (Transition, TransitionGroup, GSAP)
09. Advanced reactivity (shallowRef, triggerRef, effectScope, customRef)
10. Capstone: Component library (build 5 reusable components + docs)
```

#### `vue-routing` (8h — intermediate)
```
01. Vue Router setup (createRouter, history modes, link components)
02. Dynamic routes (params, query, hash, programmatic navigation)
03. Nested routes (layouts, named views, nested router-view)
04. Navigation guards (beforeEach, beforeRouteEnter, per-route guards)
05. Route meta & middleware (auth guards, permissions, breadcrumbs)
06. Transitions between routes (page transitions, scroll behavior)
07. Lazy loading routes (code splitting, prefetching, loading states)
08. Capstone: Multi-page app (auth, protected routes, layouts)
```

### Nuxt Track

#### `nuxt-fundamentals` (12h — intermediate, Vue knowledge assumed)
```
01. Why Nuxt? (SSR vs SPA, auto-imports, file-based routing, DX)
02. Project structure (pages, components, composables, server, middleware)
03. File-based routing (dynamic params, catch-all, named routes)
04. Layouts & pages (default, custom layouts, layout transitions)
05. Server routes (API handlers, H3/Nitro primitives, body parsing)
06. Data fetching (useFetch, useAsyncData, pick/transform, caching)
07. State management (useState, Pinia integration, SSR hydration)
08. SEO & meta (useHead, useSeoMeta, OG images, sitemap)
09. Error handling (createError, error page, error boundaries)
10. Middleware (route middleware, server middleware, named middleware)
11. Plugins & modules (registering, Nuxt module ecosystem, building one)
12. Capstone: Blog platform (SSR blog with MD content, API, auth)
```

#### `nuxt-data-fetching` (10h — intermediate)
```
01. useFetch deep dive (reactivity, refresh, watching params)
02. useAsyncData (manual control, transform, server-only, lazy)
03. Caching strategies (SWR, ISR, stale-while-revalidate, cache tags)
04. Error patterns (error boundaries, fallback UI, retry, toast)
05. Optimistic updates (mutate on client, rollback on error)
06. Pagination & infinite scroll (cursor, offset, useInfiniteScroll)
07. Form actions (Nuxt server actions, validation, file uploads)
08. Real-time data (polling vs SSE vs WebSocket, when to use)
09. Data flow patterns (composables as data layer, repository pattern)
10. Capstone: Admin dashboard (CRUD, pagination, search, filters)
```

#### `nuxt-auth` (8h — intermediate)
```
01. Auth concepts (sessions vs JWT, OAuth flow, CSRF, CORS)
02. Better Auth setup (providers, database, session management)
03. Email/password auth (registration, login, email verification)
04. OAuth (GitHub, Google — flow, tokens, account linking)
05. Session management (middleware, protected routes, session refresh)
06. Roles & permissions (admin/user, route guards, API authorization)
07. Multi-tenant patterns (organizations, teams, invitations)
08. Capstone: SaaS auth system (auth + orgs + roles + billing-ready)
```

### Production Track

#### `testing-frontend` (5h — intermediate)
```
01. Testing philosophy (what to test, pyramid, Vitest setup)
02. Unit tests (pure functions, edge cases, TDD loop)
03. Component tests (render, query, assert, user events)
04. Testing composables (reactive state, async, mocking)
05. Testing patterns (mocks vs stubs, test factories, fixtures)
```

#### `testing-fullstack` (6h — intermediate)
```
01. API testing (Nitro route tests, database seeding, cleanup)
02. E2E testing (Playwright, user flows, CI integration)
03. Test databases (migrations in test, per-test isolation)
04. Visual regression (screenshot comparison, percy/chromatic)
05. Test coverage (meaningful coverage, when coverage lies)
06. CI/CD testing (GitHub Actions, parallel tests, flaky management)
```

#### `performance` (7h — advanced)
```
01. Measuring performance (Lighthouse, Web Vitals, CrUX, RUM)
02. JavaScript performance (code splitting, tree shaking, defer/async)
03. Rendering performance (SSR/SSG/ISR strategy, hydration, lazy hydrate)
04. Asset optimization (images: srcset, WebP, lazy loading. Fonts: subset, display)
05. Caching strategy (browser cache, CDN, service worker, stale-while-revalidate)
06. Bundle analysis (rollup-plugin-visualizer, chunk splitting, imports analysis)
07. Capstone: Performance audit (audit existing app, implement fixes, measure impact)
```

---

## Exercise Types Per Course

Each lesson embeds exercises via MDC components. The mix varies by course:

| Course type | QCM | Graphical CSS | Code challenge | Open question | Capstone |
|---|---|---|---|---|---|
| JS courses | 30% | — | 50% | 10% | 10% |
| CSS courses | 20% | 40% | 30% | — | 10% |
| Vue courses | 15% | — | 60% | 10% | 15% |
| Nuxt courses | 10% | — | 55% | 15% | 20% |

Code challenges run in the browser sandbox (iframe for CSS, future WebContainers for Vue/Nuxt).

---

## Capstone Projects

Each course ends with a build-along project. These are the subscriber value proposition:

```
Free tier:
  ├── Project description + requirements
  ├── Step-by-step walkthrough (text)
  └── Starter code (GitHub: {project}/tree/starter)

Subscriber tier:
  ├── Everything free, plus:
  ├── Solution code (GitHub: {project}/tree/solution)
  ├── Video walkthrough
  ├── Code diff viewer (starter → solution)
  └── Project feedback (manual or AI)
```

**Example capstone projects:**

| Course | Capstone |
|---|---|
| javascript-basics | CLI Calculator |
| javascript-intermediate | CLI Task Manager |
| async-javascript | Weather Dashboard |
| javascript-advanced | Event Emitter Library |
| dom-manipulation | Interactive Quiz |
| css-layout | Landing Page from Design |
| vue-fundamentals | Task Board (Trello clone) |
| vue-components | Component Library (5 reusable components) |
| vue-routing | Multi-page Auth App |
| nuxt-fundamentals | Blog Platform |
| nuxt-data-fetching | Admin Dashboard |
| nuxt-auth | SaaS Auth System |

---

## Adaptive Exercise Routing

Each concept/skill is tagged. The adaptive engine (see `docs/exercise-engine/adaptive.md`) routes students:

```
Weakness detected in {concept}
  → More exercises targeting that concept
  → Lower difficulty first, increase as mastery improves
  → Spaced repetition: review in 1/3/7/14/30 days

All concepts mastered in course
  → Unlock next course
  → Cross-reference: did struggling with X affect performance in Y?
  → Suggest review if dependencies look shaky
```

---

## Evolution Notes

This curriculum is version 1. It will evolve:

- **Short-term**: Write and ship the JavaScript + CSS tracks first. They're prerequisite to everything else.
- **Mid-term**: Add React path alongside Vue for market coverage.
- **Long-term**: TypeScript track (after JS fundamentals), backend-specific paths (Node.js only, no frontend), mobile (React Native/Vue Native).
