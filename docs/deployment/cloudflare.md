# Deployment — Cloudflare Architecture

**Related**: [Architecture Overview](../architecture.md), [User System](./user-system/database.md)

## Target: Cloudflare Edge

All infrastructure lives on Cloudflare. No servers to manage.

## Nitro v3 Critical: Cloudflare Bindings Changed

With Nuxt 5 + Nitro v3, the Cloudflare bindings access pattern changed.

Old (Nitro v2) — works in local dev, silently fails in production:
  const env = event.context.cloudflare.env

New (Nitro v3):
  const env = event.req.runtime.cloudflare.env

Other breaking changes:
- Package renamed: nitropack → nitro
- Handler: eventHandler → defineHandler 
- Body parsing: readBody(event) → await event.req.json()
- SWR caching: was default ON, now requires explicit swr: true
- app.config.ts removed — use useRuntimeConfig()
- Built-in SQL (useDatabase) and KV (useStorage) now available
- Tasks API (runTask) for background processing


```
┌──────────────────────────────────────────────────────────┐
│                    Cloudflare                             │
│                                                          │
│  ┌────────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │ Pages / Worker │  │     D1      │  │  R2 Bucket   │  │
│  │                │  │             │  │              │  │
│  │ Nuxt SSR       │  │ users       │  │ /exercises/  │  │
│  │ API routes     │  │ progress    │  │ /audio/      │  │
│  │ Static assets  │  │ adaptive    │  │ /uploads/    │  │
│  │ Auth endpoints │  │ subs        │  │              │  │
│  └────────────────┘  └─────────────┘  └──────────────┘  │
│                                                          │
│  ┌────────────────┐  ┌────────────┐  ┌───────────────┐  │
│  │ Cloudflare     │  │ Cloudflare │  │ Cloudflare    │  │
│  │ Stream         │  │ KV         │  │ Images        │  │
│  │ (Video)        │  │ Cache      │  │ Optimize      │  │
│  │                │  │ Rate lim   │  │ Screenshots   │  │
│  └────────────────┘  └────────────┘  └───────────────┘  │
│                                                          │
│  ┌────────────────┐  ┌────────────┐  ┌───────────────┐  │
│  │ Turnstile      │  │ Queues     │  │ Browser       │  │
│  │ Form auth      │  │ Background │  │ Rendering     │  │
│  │ Bot protect    │  │ Tasks      │  │ (CSS diff)    │  │
│  └────────────────┘  └────────────┘  └───────────────┘  │
└──────────────────────────────────────────────────────────┘
```

## Deployment — NuxtHub

**Decision**: NuxtHub is the deployment target. It simplifies D1/R2/KV bindings, auto-applies Drizzle migrations, and provides a zero-config deploy experience.

```bash
pnpm add @nuxthub/core
npx nuxthub deploy
```

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxthub/core', '@nuxt/content', 'nuxt-studio', '@nuxt/ui'],
  hub: {
    database: true,    // D1 auto-configuration
    blob: true,        // R2 auto-configuration
    kv: true,          // KV auto-configuration
    cache: true,       // Cache API
  },
})
```

### Option B: Cloudflare Pages + Wrangler (Direct)

More control, more configuration. Define everything in `wrangler.toml`.

```toml
# wrangler.toml
name = "sciredev"
compatibility_date = "2026-06-01"

[[d1_databases]]
binding = "DB"
database_name = "sciredev-db"
database_id = "xxx"

[[r2_buckets]]
binding = "ASSETS"
bucket_name = "sciredev-assets"

[[kv_namespaces]]
binding = "CACHE"
id = "xxx"
```

## D1 Setup

```bash
# Create database
npx wrangler d1 create sciredev-db

# Generate Drizzle migrations
npx drizzle-kit generate

# Apply migrations locally
npx wrangler d1 execute sciredev-db --local --file=./migrations/0000.sql

# Apply migrations to production
npx wrangler d1 execute sciredev-db --remote --file=./migrations/0000.sql
```

## R2 Setup — Asset Storage

```bash
# Create bucket
npx wrangler r2 bucket create sciredev-assets

# Upload exercise images (example)
npx wrangler r2 object put sciredev-assets/exercises/flexbox-challenge.png \
  --file=./public/exercises/flexbox-challenge.png
```

**What goes in R2**:
- Exercise screenshots (graphical exercises)
- Audio files (lesson audio tracks)
- User uploads (profile avatars, exercise screenshots)

**What stays in the repo**:
- Course MD files (Nuxt Content)
- Blog MD files (Nuxt Content)
- Public static assets (favicon, OG images)

## Cloudflare Stream — Video

```bash
# Upload a video
curl -X POST https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream \
  -H "Authorization: Bearer $API_TOKEN" \
  -F file=@lesson-video.mp4

# Returns: video UID
# Embed in Nuxt:
# <stream :src="videoUid" controls />
```

**What goes in Stream**:
- Lesson video content
- Course intro videos

**What stays embedded (YouTube)**:
- Third-party reference videos (optional)

## Cloudflare KV — Session Cache & Rate Limiting

```bash
npx wrangler kv namespace create sciredev-cache
```

```typescript
// Cache Better Auth sessions to avoid D1 hit on every request
const cached = await env.KV.get(`session:${token}`, 'json')
if (cached) return cached

const session = await db.query.sessions.findFirst(...)
await env.KV.put(`session:${token}`, JSON.stringify(session), { expirationTtl: 3600 })

// Rate limit exercise submissions per user
const key = `ratelimit:${userId}:exercise-submit`
const count = parseInt(await env.KV.get(key) || '0')
if (count > 30) throw createError({ status: 429 })
await env.KV.put(key, String(count + 1), { expirationTtl: 60 })
```

## Cloudflare Images — Exercise Screenshot Optimization

Enable in Cloudflare Dashboard → Images → Transformations → Enable for zone.

```html
<!-- Auto WebP/AVIF + responsive sizing for exercise screenshots -->
<img src="/cdn-cgi/image/width=800,format=auto,quality=85,fit=scale-down/exercises/flexbox-challenge.png" />
```

## Cloudflare Turnstile — Bot Protection

```bash
# Create widget at https://dash.cloudflare.com/?to=/:account/turnstile
# Returns sitekey (public) and secret key (private)
```

```html
<!-- Frontend widget -->
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<form>
  <div class="cf-turnstile" data-sitekey="YOUR_SITE_KEY"></div>
</form>
```

```typescript
// Server-side validation (Nitro v3 pattern)
const token = (await event.req.formData()).get('cf-turnstile-response')
const verifyForm = new FormData()
verifyForm.append('secret', event.req.runtime.cloudflare.env.TURNSTILE_SECRET)
verifyForm.append('response', token)
verifyForm.append('remoteip', event.req.headers.get('CF-Connecting-IP'))

const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
  method: 'POST',
  body: verifyForm,
})
const outcome = await result.json()
if (!outcome.success) throw createError({ status: 401 })
```

## Cloudflare Queues — Background Processing

```bash
npx wrangler queues create sciredev-exercise-queue
npx wrangler queues create sciredev-analytics-queue
```

```typescript
// Fire and forget exercise submission processing
await env.EXERCISE_QUEUE.send({
  userId: session.user.id,
  exerciseId,
  code,
  results,
  timestamp: Date.now(),
})
return { received: true } // Instant response

// Queue consumer does the heavy work
export default {
  async queue(batch) {
    for (const msg of batch.messages) {
      await db.insert(exerciseAttempts).values(msg.body)
      await updateAdaptiveMastery(msg.body.userId, msg.body.exerciseId)
      msg.ack()
    }
  },
}
```

## Route Rules (Caching Strategy)

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  routeRules: {
    // Static pages: pre-rendered at build
    '/': { prerender: true },
    '/blog/**': { isr: 3600, swr: true },       // Nitro v3: swr must be explicit
    '/courses': { isr: 300, swr: true },         // Course listing, 5min

    // Course/lesson pages: ISR with short TTL
    '/courses/**': { isr: 60, swr: true },       // Fresh progress via client-side fetch

    // API routes: never cached
    '/api/**': { cache: false },

    // Admin routes: SPA-only
    '/admin/**': { ssr: false },
  },
})
```

## Environment Variables

```env
# .env (local dev)
NUXT_PUBLIC_SITE_URL=http://localhost:3000
NUXT_SESSION_PASSWORD=xxx

# Cloudflare D1 (local)
CF_D1_DB_ID=xxx

# Better Auth
BETTER_AUTH_SECRET=xxx
GITHUB_CLIENT_ID=xxx
GITHUB_CLIENT_SECRET=xxx

# Cloudflare Stream
CF_STREAM_ACCOUNT_ID=xxx
CF_STREAM_API_TOKEN=xxx

# Stripe (future)
STRIPE_SECRET_KEY=xxx
STRIPE_WEBHOOK_SECRET=xxx
```

## CI/CD (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Cloudflare

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm run build

      # Apply D1 migrations
      - run: npx wrangler d1 execute sciredev-db --remote --file=./migrations/*.sql

      # Deploy to Cloudflare Pages
      - run: npx wrangler pages deploy .output/public
```

## Cost Estimation (Cloudflare Free Tier)

| Service | Free Tier | MVP Usage |
|---|---|---|
| Pages/Workers | 100k requests/day | Within limits |
| D1 | 5GB storage, 5M reads/day | Within limits |
| R2 | 10GB storage, 1M writes/month | Within limits |
| Stream | 100 min storage/delivery/month | For a few videos |
| Images | 100k stored, 10M deliveries/month | Within limits |
| KV | 100k reads, 1k writes/day | Within limits |
| Turnstile | Unlimited (20 widgets) | Within limits |
| Queues | 1M operations/month free | Within limits |

For the MVP, **everything fits in Cloudflare's free tier**. Costs only become a concern at scale.

## Open Questions

- [OPEN] NuxtHub or direct Cloudflare Pages? NuxtHub is faster to set up. Direct gives more control.
- [OPEN] Should we use Cloudflare Images for optimizing exercise screenshots, or handle that at build time?
- [OPEN] D1 migration strategy: do we need staging environment or is local dev + production sufficient?
