# Exercise Engine — Architecture

**Related**: [Architecture Overview](../architecture.md), [Content Model](../content-model.md)

## Overview

The exercise engine is a **single Nuxt layer** that contains everything exercise-related: types, validators, components, composables, pages, and server routes. It's independently testable and has its own playground for development.

### Why a Single Layer?

- **Simplicity**: One package to maintain, one vitest config, one playground
- **Nuxt-native**: Auto-imports, file-based routing, server routes all work out of the box
- **Testable**: Each exercise type has its own test file, run with `vitest`
- **Shareable**: Main app extends the layer via `extends: ['../packages/exercise-engine']`
- **Playground**: Layer has its own `playground/` directory for isolated development

## Repository Structure

```
sciredev/
├── apps/
│   └── web/                          # Main Nuxt app
│       ├── extends: ['../packages/exercise-engine']
│       ├── content/                  # Courses, lessons (MD files)
│       ├── pages/                    # App pages (courses, blog, admin)
│       └── server/                   # App server routes (auth, progress)
│
└── packages/
    └── exercise-engine/              # Single Nuxt layer
        ├── nuxt.config.ts            # Layer config
        ├── package.json              # Layer dependencies
        ├── vitest.config.ts          # Independent testing
        │
        ├── types/                    # Shared types
        │   ├── exercise.ts           # ExerciseMeta, CheckpointEvent, etc.
        │   └── index.ts
        │
        ├── utils/                    # Pure logic (validators, helpers)
        │   ├── validators.ts         # CSS/DOM assertion runners
        │   ├── assertions.ts         # Test case types + runners
        │   └── index.ts
        │
        ├── composables/              # Exercise composables
        │   ├── useCheckpoint.ts      # Event-driven checkpoint system
        │   ├── useMonaco.ts          # Monaco editor wrapper
        │   ├── useSandbox.ts         # iframe sandbox + test runner
        │   └── useExerciseTracker.ts # Progress tracking composable
        │
        ├── components/               # Exercise components
        │   ├── stateless/            # Tier 1: Stateless demos
        │   │   ├── StatelessExercise.vue
        │   │   ├── FlexboxPlayground.vue
        │   │   ├── BoxModelDemo.vue
        │   │   └── registry.ts       # Component registry
        │   │
        │   ├── checkpoint/           # Tier 2: Checkpoint exercises
        │   │   ├── CheckpointExercise.vue
        │   │   ├── QcmExercise.vue
        │   │   ├── FillBlankExercise.vue
        │   │   └── GraphicalExercise.vue
        │   │
        │   ├── workspace/            # Tier 3: WebContainers
        │   │   ├── CodeChallenge.vue
        │   │   ├── CodeEditor.vue
        │   │   ├── CodePreview.vue
        │   │   └── CodeTests.vue
        │   │
        │   └── sandbox/              # Tier 4: Cloudflare Sandbox
        │       ├── SandboxExercise.vue
        │       └── SandboxTerminal.vue
        │
        ├── server/                   # Server routes (optional)
        │   └── api/
        │       └── exercise/
        │           └── validate.post.ts  # Server-side validation
        │
        ├── playground/               # Dev playground (excluded in production)
        │   ├── nuxt.config.ts
        │   ├── app.vue
        │   └── pages/
        │       ├── index.vue         # Exercise type selector
        │       ├── stateless/
        │       │   ├── flexbox.vue
        │       │   └── box-model.vue
        │       ├── checkpoint/
        │       │   ├── qcm.vue
        │       │   └── fill-blank.vue
        │       └── workspace/
        │           └── code-challenge.vue
        │
        └── test/                     # Tests
            ├── unit/
            │   ├── validators.test.ts
            │   └── assertions.test.ts
            └── nuxt/
                ├── stateless.test.ts
                ├── checkpoint.test.ts
                └── workspace.test.ts
```

## 4-Tier Exercise System

### Tier 1: Stateless

**Purpose**: Demonstrate principles. Zero backend. Pure frontend.

```yaml
# In lesson MD frontmatter
exercises:
  - type: stateless
    id: "box-model-visual"
    component: "BoxModelDemo"
    props:
      initialPadding: 20
      showMargin: true
```

**How it works**:
- Component registered in `components/stateless/registry.ts`
- Lesson page renders `<StatelessExercise :component="'BoxModelDemo'" :props="..." />`
- No state, no API calls, no tracking
- On reload, resets to initial state

**Examples**:
- `FlexboxPlayground.vue` — drag sliders, see items reorder
- `BoxModelDemo.vue` — click to expand padding/margin
- `ColorExplorer.vue` — HSL sliders, live preview

### Tier 2: Checkpoint

**Purpose**: Track user progress. Event-driven architecture.

```yaml
exercises:
  - type: qcm
    id: "flex-direction-qcm"
    question: "Which property sets the main axis?"
    options: ["flex-direction", "align-items", "justify-content"]
    correct: 0
    conceptTags: ["flex-direction"]
```

**How it works**:
- Component emits `@completed` event with payload
- Lesson page listens and calls progress API
- D1 stores attempt, adaptive engine updates mastery

```vue
<!-- CheckpointExercise.vue -->
<script setup lang="ts">
const { check, solved } = useCheckpoint({
  exerciseId: props.exerciseId,
  conceptTags: props.conceptTags,
})

const emit = defineEmits(['completed'])

function handleSubmit() {
  const result = check(userAnswer.value)
  emit('completed', {
    exerciseId: props.exerciseId,
    passed: result.passed,
    score: result.score,
    conceptTags: props.conceptTags,
  })
}
</script>
```

```vue
<!-- Lesson page -->
<CheckpointExercise
  v-for="ex in checkpointExercises"
  :key="ex.id"
  v-bind="ex"
  @completed="handleCheckpoint"
/>
```

### Tier 3: Workspace (WebContainers)

**Purpose**: Full code execution in browser. Real Node.js.

```yaml
exercises:
  - type: code_challenge
    id: "center-with-flex"
    title: "Center a div with Flexbox"
    starterFiles:
      index.html: |
        <div class="container">
          <div class="box"></div>
        </div>
      style.css: |
        .container {
          height: 300px;
          border: 2px solid #333;
        }
    assertions:
      - ".container has display:flex"
      - ".container has justify-content:center"
      - ".container has align-items:center"
```

**How it works**:
- Monaco editor for code editing
- iframe `srcdoc` sandbox for preview (MVP)
- WebContainers for full Node.js (Phase 2+)
- Test runner validates DOM/CSS
- Emits `@completed` when tests pass

**Template storage** (learn.nuxt.com pattern):
```
content/courses/css-fundamentals/02-flexbox/
├── index.md
└── .template/
    ├── index.ts          # Metadata
    ├── files/            # Starting files
    │   ├── index.html
    │   └── style.css
    └── solutions/        # Solution files
        ├── index.html
        └── style.css
```

### Template Inheritance — Avoiding Bloat at Scale

40 exercises don't mean 40 copies of every file. The pattern: **base templates** (defined once per language) + **exercise overrides** (only the diffs).

#### Template Hierarchy

```
packages/exercise-engine/
└── templates/
    ├── base-html-css/              # Shared base for HTML/CSS exercises
    │   ├── index.html
    │   └── style.css
    ├── base-vue/                   # Shared base for Vue exercises
    │   ├── package.json
    │   ├── nuxt.config.ts
    │   └── app.vue
    └── base-nuxt/                  # Shared base for Nuxt exercises
        ├── package.json
        ├── nuxt.config.ts
        ├── app.vue
        └── tsconfig.json

content/courses/
└── css-fundamentals/02-flexbox/
    └── .template/
        ├── index.ts     # { template: 'base-html-css', startingFile: 'style.css' }
        └── files/
            └── style.css  # ← Only the file that differs from base
```

Each `.template/index.ts` references a base template and provides only the files that override or add to it.

```typescript
// Template loader (at build time) — merges base + exercise-specific
function resolveExerciseFiles(exercise) {
  const base = loadBaseTemplate(exercise.meta.template)  // e.g., 'base-nuxt'
  const overrides = exercise.meta.files || {}             // e.g., { 'app.vue': '...' }
  return { ...base, ...overrides }   // Merge: exercise files win
}
```

#### Storage Math

| Pattern | Per exercise | 40 exercises | 200 exercises |
|---|---|---|---|
| Full copy (no inheritance) | ~15KB | 600KB | 3MB |
| Base + overrides | ~2KB | 80KB | 400KB |
| Git repo (via ArtifactFS) | ~0B in repo | 0B | 0B |

400KB is negligible. Even at 200 exercises, the override-only approach adds less than a megabyte.

#### When Overrides Are Still Too Big

If an exercise has a large project (20+ files, custom packages):

```yaml
# Option 1: Store in a separate git repo, mount via ArtifactFS
exercises:
  - type: sandbox
    repo: "sciredev/template-nuxt-fullstack"
    branch: "starter"
    # → ArtifactFS mounts instantly, zero bloat in content repo

# Option 2: Download archive from R2
  - type: workspace
    template: "r2://sciredev/templates/nuxt-auth-starter.tar.gz"

# Option 3: Use override pattern with base template (recommended default)
  - type: workspace
    template: "base-nuxt"
    files:
      app.vue: "..."          # Just the files that changed
      pages/index.vue: "..."
```

**95% of exercises use Option 3** — the base + override pattern keeps everything lean and manageable. Options 1 and 2 exist for the rare cases with large custom setups.

### Tier 4: Sandbox (Cloudflare Containers)

**Purpose**: Full Linux environment. Any language. Persistent.

```yaml
exercises:
  - type: sandbox
    id: "fullstack-nuxt-auth"
    title: "Build auth system with Better Auth"
    repo: "sciredev/exercise-nuxt-auth"
    branch: "starter"
    checkpoints:
      - branch: "checkpoint-1"
        description: "Email/password login works"
      - branch: "checkpoint-2"
        description: "GitHub OAuth integrated"
      - branch: "solution"
        description: "Full auth system complete"
```

**How it works**:
- Cloudflare Sandbox SDK creates container per student
- Git repo cloned at `starter` branch
- PTY terminal via xterm.js
- Live preview URL for dev server
- Student progresses through checkpoint branches
- Snapshots for fast resume

## Testing Strategy

### Vitest Config (Project-Based)

```typescript
// packages/exercise-engine/vitest.config.ts
import { defineConfig } from 'vitest/config'
import { defineVitestProject } from '@nuxt/test-utils/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['test/unit/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          include: ['test/nuxt/*.{test,spec}.ts'],
          environment: 'nuxt',
        },
      }),
    ],
  },
})
```

### Testing by Tier

| Tier | Test Type | What to Test |
|---|---|---|
| **Stateless** | Component | Renders, props work, no state leakage |
| **Checkpoint** | Component + Integration | Emits `@completed`, API calls fire |
| **Workspace** | Integration | WebContainer loads, code executes |
| **Sandbox** | Smoke | Container starts, files mount, preview displays |

### Example: Checkpoint Test

```typescript
// test/nuxt/checkpoint.test.ts
import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { QcmExercise } from '#components'

describe('QcmExercise (Checkpoint)', () => {
  it('emits completed event when user answers', async () => {
    registerEndpoint('/api/progress/exercise/submit', () => ({ success: true }))
    
    const component = await mountSuspended(QcmExercise, {
      props: {
        exerciseId: 'test-qcm',
        question: 'What is 2+2?',
        options: ['3', '4', '5'],
        correct: 1,
        conceptTags: ['math-basics'],
      },
    })
    
    await component.find('input[value="1"]').setValue(true)
    await component.find('button[type="submit"]').trigger('click')
    
    expect(component.emitted('completed')).toBeTruthy()
    expect(component.emitted('completed')[0][0]).toMatchObject({
      exerciseId: 'test-qcm',
      passed: true,
      conceptTags: ['math-basics'],
    })
  })
})
```

### Example: Stateless Test

```typescript
// test/nuxt/stateless.test.ts
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { FlexboxPlayground } from '#components'

describe('FlexboxPlayground (Stateless)', () => {
  it('renders with default props', async () => {
    const component = await mountSuspended(FlexboxPlayground, {
      props: {
        initialGap: 16,
      },
    })
    
    expect(component.find('[data-gap-value]').text()).toBe('16')
    expect(component.find('.flex-container').exists()).toBe(true)
  })
  
  it('updates preview when slider changes', async () => {
    const component = await mountSuspended(FlexboxPlayground)
    
    await component.find('[data-gap-slider]').setValue(24)
    await nextTick()
    
    expect(component.find('[data-gap-value]').text()).toBe('24')
  })
})
```

## Playground Strategy

Each exercise type has its own playground page:

```
playground/pages/
├── index.vue                 # Exercise type selector
├── stateless/
│   ├── flexbox.vue          # Test FlexboxPlayground
│   └── box-model.vue        # Test BoxModelDemo
├── checkpoint/
│   ├── qcm.vue              # Test QcmExercise
│   └── fill-blank.vue       # Test FillBlankExercise
└── workspace/
    └── code-challenge.vue   # Test CodeChallenge
```

**When consumed by main app**:
- Use `.nuxtignore` to exclude `playground/` directory
- Or configure `routeRules` to disable playground routes in production

```typescript
// packages/exercise-engine/nuxt.config.ts
export default defineNuxtConfig({
  ignore: process.env.NODE_ENV === 'production' ? ['playground/**'] : [],
})
```

## Key Improvements Over learn.nuxt.com

| learn.nuxt.com | Our Platform |
|---|---|
| No automated testing | Vitest + @webcontainer/test |
| Stateless only | 4-tier state model |
| No progress tracking | Event-driven checkpoint system |
| No solution validation | Automated test runner |
| Single Nuxt app | Monorepo with Nuxt layer |
| No persistent state | D1-backed progress tracking |
| No playground | Dedicated playground per exercise type |

## Open Questions

- [OPEN] Should we support **screenshot diff** (pixel comparison) for CSS exercises?
- [OPEN] Monaco Editor: `@guolao/vue-monaco-editor` or raw Monaco setup?
- [OPEN] Should exercise solutions be in MD frontmatter or `.template/solutions/`?
