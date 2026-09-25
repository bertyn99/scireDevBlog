# scireDev Platform — Architecture Documents

## What these docs are

Living design documents for transforming scireDev from a Nuxt 3 blog into a self-paced developer learning platform. All decisions are evidence-backed — sourced from the [learn.nuxt.com](https://github.com/nuxt/learn.nuxt.com) reference architecture, the [sciredev-mvp-exercice prototype](https://github.com/bertyn99/sciredev-exercice), and community research on learning platform patterns.

## Document Index

| # | Document | Answers |
|---|----------|---------|
| 1 | [architecture.md](./architecture.md) | What stack? Why? What are the core decisions? |
| 2 | [content-model.md](./content-model.md) | How are courses, lessons, exercises modeled in MD files? |
| 3 | [exercise-engine/architecture.md](./exercise-engine/architecture.md) | How does the mini dev environment work? |
| 4 | [user-system/database.md](./user-system/database.md) | Auth, D1 schemas, progress tracking, subscriptions |
| 5 | [deployment/cloudflare.md](./deployment/cloudflare.md) | Cloudflare deployment: NuxtHub, D1, R2, Stream |
| 6 | [observability.md](./observability.md) | Structured logging with evlog, what to log by domain |
| 7 | [student-dashboard.md](./student-dashboard.md) | Student learning hub: progress, mastery, review queue, activity |
| 8 | [admin-dashboard.md](./admin-dashboard.md) | Admin analytics: user management, exercise performance |
| 9 | [curriculum.md](./curriculum.md) | Learning paths, course catalog, capstone projects |
## Key Design Principles

1. **Content is MD files (Git). State is D1 (Cloudflare).** — Course materials live in the repo as Markdown. User progress, sessions, and subscriptions live in a database. This hybrid pattern is validated by production platforms (Trivium, AI Educademy, Nuxt's own learn platform).

2. **learn.nuxt.com is the north star for exercises.** — Their `.template/` folder pattern, WebContainers sandbox, and Monaco integration are the reference implementation.

3. **MVP first, iterate.** — Code challenges start with HTML/CSS only (iframe sandbox). WebContainers for full-stack exercises come later.

4. **Cloudflare-native from day one.** — D1 for database, R2 for assets, Stream for video. Deployed via NuxtHub or Cloudflare Pages.

## Status

🟡 **Design phase** — these documents are evolving through discussion. Nothing is finalized. Open questions are marked with `[OPEN]`.
