# Monorepo Migration Learnings

## Task 1 — Workspace Root Configuration (2026-06-16)

### Version Choices
- **oxlint@^1.70.0**: Latest stable as of June 2026. Mature vue/typescript plugin support.
  Import plugin included for good measure. `correctness` and `suspicious` at error level,
  `perf` at warn. `no-console` set to warn.
- **oxfmt@^0.55.0**: Latest stable. Config format is Prettier-compatible (camelCase keys).
  Set singleQuote, printWidth 100, 2-space indent, semicolons, no trailing commas
  (matches existing project style).

### pnpm Version
- pnpm 10.13.1 is installed. Works with pnpm-workspace.yaml natively.
- `shamefully-hoist=true` was already set in `.npmrc` — no change needed.

### Config Format Gotchas
- `.oxlintrc.json` uses `"plugins"` array (not `"extends"`) and `"categories"` object.
  Oxlint 1.x automatically ignores `node_modules`, no explicit ignore needed.
- `.oxfmtrc.json` uses Prettier-compatible field names (`singleQuote`, `printWidth`, etc).
  May need adjustment if oxfmt uses snake_case keys in newer versions.
- Root `package.json` scripts use `--filter ./apps/web` (path-based) rather than
  package-name-based filters since `apps/web` doesn't exist yet.

### What NOT to do
- Don't add `turbo.json` for just 2 packages (overkill).
- Don't run `pnpm install` until `apps/` and `packages/` directories exist.
- Don't add any app-level deps to root `package.json`.

## Task 3 — Exercise Engine Layer (2026-06-16)

### Layer Structure
- `packages/exercise-engine/` uses the official Nuxt layer pattern: `.playground/` with
  `extends: ['../']` for local dev/testing.
- Layer `app/` auto-merges with consuming app's `app/` — no explicit registration needed beyond
  `extends` in the consuming app's `nuxt.config.ts`.
- Content config (`content.config.ts`) stays in the consuming app, NOT in the layer.

### Import Path Gotcha (CRITICAL)
- `~/` and `@/` aliases in layer components resolve to the **consuming app**, NOT the layer.
- When moving CodeChallenge.vue from `apps/web/app/components/exercise/` to the layer's
  `app/components/workspace/`, the imports had to change:
  - `~/composables/useSandbox` → `../../composables/useSandbox`
  - `~/composables/useMonaco` → `../../composables/useMonaco`
- Relative imports are the simplest fix. Alternative: `#layers/exercise-engine/composables/...`
  but relative is cleaner for intra-layer references.
- The component logic itself was NOT modified — only the two import path strings.

### File Moves
- Files moved from `apps/web/app/` (post-Task-2 location) to `packages/exercise-engine/app/`:
  - `components/exercise/CodeChallenge.vue` → `components/workspace/CodeChallenge.vue`
  - `composables/useMonaco.ts` → `composables/useMonaco.ts` (unchanged)
  - `composables/useSandbox.ts` → `composables/useSandbox.ts` (unchanged)
- Component directory renamed: `exercise/` → `workspace/` in the layer (matches architecture doc).

### Vitest Config
- Used project-based vitest config with two projects: `unit` (node env) and `nuxt` (nuxt env).
- `defineVitestProject` from `@nuxt/test-utils/config` is async — needs `await` inside the
  projects array (top-level await in config file is fine with ESM).

### What NOT to do
- Don't use `~/` or `@/` imports in layer components — they resolve to consuming app.
- Don't add the layer as a Nuxt module — it's a layer (uses `extends`).
- Don't run `pnpm install` (Task 4 handles workspace linking).
- Don't create empty `checkpoint/`, `stateless/`, `sandbox/` component dirs — only create what exists.

## Task 4 — Wire extends + pnpm install (2026-06-16)
- Layer is wired via `extends: ["../../packages/exercise-engine"]` in apps/web/nuxt.config.ts
- The extends path is RELATIVE TO THE FILE LOCATION (apps/web/ -> ../../packages/exercise-engine)
- `pnpm install` completed successfully - lockfile up to date, workspace detected
- `nuxt prepare` generated .nuxt/ types without errors
- All exercise components auto-import correctly:
  - `WorkspaceCodeChallenge` / `LazyWorkspaceCodeChallenge` components
  - `useMonaco`, `createSandbox`, `runTests` composables
  - `TestCase`, `TestResult` types are exported
- Nuxt layers with `extends` do NOT require workspace:* package dependency - they resolve via relative filesystem path
- pnpm workspace symlinks are not created for Nuxt layers (no npm package resolution needed)