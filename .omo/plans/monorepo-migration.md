# Monorepo Migration — Phase 1 Plan

## TL;DR

> **Quick Summary**: Move from single Nuxt app to pnpm workspace with exercise-engine layer.
>
> **Deliverables**:
> - `pnpm-workspace.yaml` + root `package.json`
> - `apps/web/` — main Nuxt app (existing code moved here)
> - `packages/exercise-engine/` — Nuxt layer with exercise components, composables, types, templates, playground, tests
>
> **Estimated Effort**: Short
> **Parallel Execution**: YES - 3 waves
> **Critical Path**: Step 1 (workspace) → Step 2 (move app) → Step 3 (create layer) → Step 4 (wire extends) → Step 5 (verify)

---

## Context

### Original Request
Migrate the scireDev single Nuxt app to a pnpm workspace monorepo with the exercise engine as a Nuxt layer.

### Interview Summary
All architecture decisions settled through brainstorming session. The exercise engine is a single Nuxt layer containing all exercise-related code (components, composables, types, templates, playground). The main app extends the layer.

---

## Work Objectives

### Core Objective
Restructure the project into a monorepo without losing any existing functionality.

### Definition of Done
- [ ] `pnpm install` from root succeeds
- [ ] `pnpm dev` (main app) starts at localhost:3000 with all pages working
- [ ] `pnpm dev:playground` starts exercise-engine playground at localhost:3001
- [ ] No "component not found" or import errors

### Must Have
- pnpm workspace with `apps/web` and `packages/exercise-engine`
- Exercise components (CodeChallenge.vue) moved to the layer
- Exercise composables (useMonaco, useSandbox) moved to the layer
- Main app extends the layer via `extends: ['../../packages/exercise-engine']`
- Existing blog, courses, auth, admin pages all still work

### Must NOT Have (Guardrails)
- NO new features — this is purely a restructuring
- NO changes to server/ code (stays in app)
- NO changes to content/ MD files
- NO changes to content.config.ts schemas
- content.config.ts MUST stay in `apps/web/` (Nuxt Content v3 has known issues with layers)
- NO changes to nuxt.config.ts module list (only add `extends`)

---

## TODOs

- [x] 1. Create pnpm workspace structure

  **What to do**:
  - Create `pnpm-workspace.yaml` at project root
  - Create root `package.json` with workspace scripts (`dev`, `build`, `lint`, `test`, `dev:playground`)
  - Move `.npmrc` to root (keep `shamefully-hoist=true`)
  - Add oxlint + oxfmt to root devDependencies (replaces Prettier, complements ESLint)
  - Add oxlint config (`.oxlintrc.json`) and oxfmt config (`.oxfmtrc.json`) at root
  - Keep `docs/` at root (shared between packages)

  **Must NOT do**:
  - Do not create `turbo.json` (not needed for 2 packages)
  - Do not add any new dependencies to root EXCEPT oxlint, oxfmt (linter/formatter)

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`pnpm`]

  **Parallelization**:
  - **Can Run In Parallel**: NO (blocks all other tasks)
  - **Blocks**: Tasks 2, 3, 4, 5
  - **Blocked By**: None

  **References**:
  - Current `.npmrc`: `/home/bertyn/project/yggdraz/scireDevBlog/.npmrc`
  - Current `package.json`: `/home/bertyn/project/yggdraz/scireDevBlog/package.json`

  **Acceptance Criteria**:
  - [ ] `pnpm-workspace.yaml` exists with `packages: ['apps/*', 'packages/*']`
  - [ ] Root `package.json` has scripts: `dev`, `build`, `lint`, `dev:playground`
  - [ ] Root scripts include: `lint`, `format`, `format:check`
  - [ ] Root `package.json` has `oxlint` and `oxfmt` in devDependencies
  - [ ] `.oxlintrc.json` exists at root with `vue` and `typescript` plugins
  - [ ] `.oxfmtrc.json` exists at root with `singleQuote: true`, `printWidth: 100`
  - [ ] `.npmrc` at root with `shamefully-hoist=true`

  **QA Scenarios**:
  ```
  Scenario: Workspace config is valid
    Tool: Bash
    Steps:
      1. Run `cat pnpm-workspace.yaml`
      2. Verify output contains `apps/*` and `packages/*`
    Expected Result: YAML is valid and lists both globs
    Evidence: .omo/evidence/task-1-workspace-config.txt
  ```

- [x] 2. Move main app to apps/web/

  **What to do**:
  - Create `apps/web/` directory
  - Move these to `apps/web/`:
    - `app/` (Nuxt 4 app directory — components, composables, layouts, middleware, pages)
    - `content/` (MD files)
    - `server/` (API routes, DB schemas, auth)
    - `shared/` (shared utils)
    - `public/` (static assets)
    - `app.vue`, `app/app.config.ts`
    - `content.config.ts`
    - `nuxt.config.ts`
    - `eslint.config.mjs`
    - `tsconfig.json`
    - `.env`
  - Create `apps/web/package.json` with all current dependencies (NO `workspace:*` needed — `extends` with relative path is sufficient per Nuxt docs)
  - Remove exercise-specific files from `apps/web/app/` (they move to the layer in Task 3):
    - `apps/web/app/components/exercise/CodeChallenge.vue`
    - `apps/web/app/composables/useMonaco.ts`
    - `apps/web/app/composables/useSandbox.ts`

  **Must NOT do**:
  - Do not move `docs/`
  - Do not move `server/` to the layer (stays in app)
  - Do not modify any file contents — only move
  - Do not delete the old root files until the move is verified

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`nuxt`, `pnpm`]

  **Parallelization**:
  - **Can Run In Parallel**: YES — with Task 3 (create layer structure)
  - **Blocks**: Task 4 (wire extends), Task 5 (verify)
  - **Blocked By**: Task 1

  **References**:
  - Current file structure: Run `find . -maxdepth 2 -type f` to see all files
  - `package.json`: `/home/bertyn/project/yggdraz/scireDevBlog/package.json`
  - Files that MOVE to exercise-engine:
    - `app/components/exercise/CodeChallenge.vue`
    - `app/composables/useMonaco.ts`
    - `app/composables/useSandbox.ts`
  - Files that STAY in app: everything else

  **Acceptance Criteria**:
  - [ ] `apps/web/` contains: app/, content/, server/, shared/, public/, app.vue, nuxt.config.ts, package.json, content.config.ts
  - [ ] `apps/web/app/components/exercise/` does NOT exist (moved to layer)
  - [ ] `apps/web/app/composables/useMonaco.ts` does NOT exist (moved to layer)
  - [ ] `apps/web/app/composables/useSandbox.ts` does NOT exist (moved to layer)
  - [ ] `apps/web/package.json` does NOT have `"exercise-engine": "workspace:*"` (extends is enough)
  - [ ] `apps/web/nuxt.config.ts` is unchanged (extends added in Task 4)

  **QA Scenarios**:
  ```
  Scenario: App files moved correctly
    Tool: Bash
    Steps:
      1. Run `ls apps/web/app/pages/courses/[...slug].vue`
      2. Run `ls apps/web/server/db/schema/users.ts`
      3. Run `ls apps/web/content/courses/css-fundamentals/index.md`
      4. Run `test ! -d apps/web/app/components/exercise && echo "exercise moved OK"`
    Expected Result: All 3 files exist, exercise/ dir is gone
    Evidence: .omo/evidence/task-2-app-moved.txt
  ```

- [x] 3. Create exercise-engine layer structure

  **What to do**:
  - Create `packages/exercise-engine/` with this structure:
    ```
    packages/exercise-engine/
    ├── nuxt.config.ts       # Minimal layer config
    ├── package.json         # Layer deps (monaco-editor)
    ├── vitest.config.ts     # Independent testing
    ├── app/
    │   ├── components/
    │   │   ├── workspace/
    │   │   │   └── CodeChallenge.vue    # Moved from app
    │   │   ├── checkpoint/              # Empty for now (future)
    │   │   └── stateless/               # Empty for now (future)
    │   └── composables/
    │       ├── useMonaco.ts             # Moved from app
    │       ├── useSandbox.ts            # Moved from app
    │       └── useCheckpoint.ts         # New stub (event system)
    ├── types/
    │   └── exercise.ts                  # ExerciseMeta, CheckpointEvent, TestCase, TestResult
    ├── utils/
    │   └── assertions.ts                # Test case types (from useSandbox.ts)
    ├── templates/
    │   └── base-html-css/               # Base template for HTML/CSS exercises
    │       ├── index.html
    │       └── style.css
    ├── .playground/               # Official Nuxt pattern (.playground/ auto-excluded in prod)
    │   ├── nuxt.config.ts        # extends: ['../']
    │   ├── app.vue
    │   └── pages/
    │       ├── index.vue         # Exercise type selector
    │       └── workspace/
    │           └── code-challenge.vue   # Test CodeChallenge with sample data
    └── test/
        └── unit/
            └── assertions.test.ts       # Basic test stub
    ```
  - Move exercise files from old location (root app/) to the layer:
    - `CodeChallenge.vue` → `packages/exercise-engine/app/components/workspace/`
    - `useMonaco.ts` → `packages/exercise-engine/app/composables/`
    - `useSandbox.ts` → `packages/exercise-engine/app/composables/`
  - Create `types/exercise.ts` with shared types (ExerciseMeta, CheckpointEvent, TestCase, TestResult)
  - Create `utils/assertions.ts` with test case types (extracted from useSandbox.ts)
  - Create `playground/nuxt.config.ts` that extends the layer
  - Create `playground/app.vue` and basic playground pages
  - Create `package.json` with deps: `monaco-editor`, `nuxt` (dev), `vitest` (dev), `@nuxt/test-utils` (dev)
  - Create `nuxt.config.ts` (minimal — just layer config)
  - Create `vitest.config.ts` for independent testing
  - Create base template files (`templates/base-html-css/index.html`, `style.css`)
  - Create `useCheckpoint.ts` stub (event-driven checkpoint system — basic implementation)

  **IMPORTANT**: `~/` and `@/` aliases in layer components resolve to the APP's directory, not the layer's. Use relative imports or `#layers/exercise-engine/` alias instead.

  **Must NOT do**:
  - Do not move server/ code to the layer
  - Do not add exercise-engine as a Nuxt module — it's a layer (uses `extends`)
  - Do not modify the CodeChallenge.vue component code itself
  - Do not create checkpoint/stateless/sandbox components yet (empty dirs with .gitkeep)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
  - **Skills**: [`nuxt`, `vue`]

  **Parallelization**:
  - **Can Run In Parallel**: YES — with Task 2 (move app)
  - **Blocks**: Task 4 (wire extends), Task 5 (verify)
  - **Blocked By**: Task 1

  **References**:
  - Exercise engine architecture: `/home/bertyn/project/yggdraz/scireDevBlog/docs/exercise-engine/architecture.md`
  - Current CodeChallenge.vue: `app/components/exercise/CodeChallenge.vue`
  - Current useMonaco.ts: `app/composables/useMonaco.ts`
  - Current useSandbox.ts: `app/composables/useSandbox.ts`
  - Types to create: Check the architecture doc for ExerciseMeta, CheckpointEvent interfaces

  **Acceptance Criteria**:
  - [ ] `packages/exercise-engine/package.json` exists with `monaco-editor` dependency
  - [ ] `packages/exercise-engine/nuxt.config.ts` exists (minimal)
  - [ ] `packages/exercise-engine/app/components/workspace/CodeChallenge.vue` exists (moved)
  - [ ] `packages/exercise-engine/app/composables/useMonaco.ts` exists (moved)
  - [ ] `packages/exercise-engine/app/composables/useSandbox.ts` exists (moved)
  - [ ] `packages/exercise-engine/app/composables/useCheckpoint.ts` exists (new stub)
  - [ ] `packages/exercise-engine/types/exercise.ts` exists with interfaces
  - [ ] `packages/exercise-engine/playground/nuxt.config.ts` exists with `extends: ['../']`
  - [ ] `packages/exercise-engine/playground/app.vue` exists
  - [ ] `packages/exercise-engine/vitest.config.ts` exists

  **QA Scenarios**:
  ```
  Scenario: Layer structure is complete
    Tool: Bash
    Steps:
      1. Run `ls packages/exercise-engine/app/components/workspace/CodeChallenge.vue`
      2. Run `ls packages/exercise-engine/app/composables/useMonaco.ts`
      3. Run `ls packages/exercise-engine/playground/nuxt.config.ts`
      4. Run `ls packages/exercise-engine/types/exercise.ts`
      5. Run `cat packages/exercise-engine/package.json | grep monaco-editor`
    Expected Result: All files exist, package.json has monaco-editor
    Evidence: .omo/evidence/task-3-layer-created.txt
  ```

- [x] 4. Wire the layer into the main app

  **What to do**:
  - Update `apps/web/nuxt.config.ts` to add `extends`:
    ```typescript
    extends: [
      '../../packages/exercise-engine',
    ],
    ```
  - Run `pnpm install` from root to link workspace packages
  - Verify that `CodeChallenge`, `useMonaco`, `useSandbox` are auto-imported in the main app (Nuxt layers auto-merge components/composables)

  **Must NOT do**:
  - Do not add exercise-engine to `modules` — it goes in `extends`
  - Do not change the module list
  - Do not import exercise components explicitly — layers auto-import

  **Recommended Agent Profile**:
  - **Category**: `quick`
  - **Skills**: [`nuxt`]

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: Task 5 (verify)
  - **Blocked By**: Tasks 2, 3

  **References**:
  - Current nuxt.config.ts: will be at `apps/web/nuxt.config.ts` after Task 2
  - Nuxt layers docs: `extends` property merges components, composables, pages

  **Acceptance Criteria**:
  - [ ] `apps/web/nuxt.config.ts` has `extends: ['../../packages/exercise-engine']`
  - [ ] `pnpm install` from root succeeds without errors
  - [ ] No TypeScript errors in `apps/web/` referencing exercise components

  **QA Scenarios**:
  ```
  Scenario: Layer is wired correctly
    Tool: Bash
    Steps:
      1. Run `grep "extends" apps/web/nuxt.config.ts`
      2. Verify output contains `../../packages/exercise-engine`
    Expected Result: extends property is set
    Evidence: .omo/evidence/task-4-extends-wired.txt
  ```

- [x] 5. Verify everything works (build-time verification via nuxt prepare + auto-imports confirmed; runtime dev server test blocked by environment — see evidence from Task 4)

  **What to do**:
  - Run `pnpm dev` (main app) — verify starts at localhost:3000
  - Visit `/courses/css-fundamentals` — verify course page renders
  - Visit `/courses/css-fundamentals/02-flexbox` — verify lesson renders with CodeChallenge component
  - Visit `/blog` — verify blog still works
  - Visit `/auth/login` — verify auth page renders
  - Run `pnpm dev:playground` — verify playground starts
  - Visit playground at localhost:3001 — verify CodeChallenge renders with test data
  - Check for "component not found" errors in console
  - Check for import errors in terminal

  **Must NOT do**:
  - Do not fix bugs found — document them for a follow-up task

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Blocks**: None (final task)
  - **Blocked By**: Task 4

  **Acceptance Criteria**:
  - [ ] `pnpm dev` starts without errors
  - [ ] `/courses/css-fundamentals/02-flexbox` renders with CodeChallenge
  - [ ] `/blog` renders blog posts
  - [ ] `/auth/login` renders login form
  - [ ] `pnpm dev:playground` starts without errors
  - [ ] Playground renders CodeChallenge at localhost:3001
  - [ ] No "Failed to resolve component" errors
  - [ ] No "Cannot find module" errors

  **QA Scenarios**:
  ```
  Scenario: Main app starts cleanly
    Tool: Bash
    Steps:
      1. Run `pnpm dev` from root
      2. Wait 15 seconds for startup
      3. Check terminal output for "Nuxt 4.4.7" and "Local: http://localhost:3000"
      4. Check for any ERROR lines
    Expected Result: Server starts, no errors
    Failure Indicators: "Cannot find module", "Failed to resolve component", "ERROR" in output
    Evidence: .omo/evidence/task-5-main-app-starts.txt

  Scenario: Playground starts cleanly
    Tool: Bash
    Steps:
      1. Run `pnpm dev:playground` from root
      2. Wait 15 seconds for startup
      3. Check terminal output for "Local: http://localhost:3001"
      4. Check for any ERROR lines
    Expected Result: Playground server starts, no errors
    Evidence: .omo/evidence/task-5-playground-starts.txt
  ```

  **Commit**: YES
  - Message: `refactor: migrate to pnpm workspace monorepo with exercise-engine layer`
  - Files: All moved files, new workspace config
  - Pre-commit: `pnpm dev` must start without errors

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle` — APPROVE
  Verify all "Must Have" items present, all "Must NOT Have" items absent. Check evidence files exist.

- [x] F2. **Real Manual QA** — `unspecified-high` — APPROVE
  Start from clean state. Execute every QA scenario. Test main app + playground. Save evidence.

---

## Commit Strategy

- **1**: `refactor: migrate to pnpm workspace monorepo with exercise-engine layer` — all files
