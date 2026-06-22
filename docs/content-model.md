# Content Model — Course, Lesson & Exercise Structure

**Related**: [Architecture Overview](./architecture.md), [Exercise Engine](./exercise-engine/architecture.md)

## Design Principle

Courses are **directories of Markdown files** with frontmatter schemas. Nuxt Content v3 collections enforce structure. Lesson slugs from the filesystem serve as stable IDs for user progress tracking in D1.

```
content/
├── blog/                      # Existing blog (unchanged)
│   └── *.md
├── courses/                   # NEW: course content
│   ├── css-fundamentals/      # Course slug
│   │   ├── index.md           # Course metadata + landing page
│   │   ├── 01-box-model.md    # Lesson 1
│   │   ├── 02-flexbox.md      # Lesson 2
│   │   └── 03-grid.md         # Lesson 3
│   └── javascript-basics/
│       ├── index.md
│       └── ...
└── index.md                   # Homepage
```

## Content Configuration

```typescript
// content.config.ts
import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    // Existing blog collection
    blog: defineCollection({
      type: 'page',
      source: 'blog/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        author: z.string().optional(),
        category: z.string().optional(),
        createdAt: z.string().optional(),
        tags: z.array(z.string()).default([]),
      }),
    }),

    // NEW: Course collection
    courses: defineCollection({
      type: 'page',
      source: 'courses/**/index.md',  // Only course index pages
      schema: z.object({
        title: z.string(),
        description: z.string(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
        image: z.string().optional(),
        tags: z.array(z.string()).default([]),
        order: z.number().optional(),
      }),
    }),

    // NEW: Lesson collection
    lessons: defineCollection({
      type: 'page',
      source: 'courses/**/*.md',
      // Exclude course index pages
      schema: z.object({
        title: z.string(),
        description: z.string(),
        course: z.string(),       // Course slug (e.g., "css-fundamentals")
        order: z.number(),        // Lesson order within the course
        duration: z.number().optional(), // Estimated minutes
        // Exercises embedded in the lesson via MDC components
      }),
    }),
  },
})
```

## Course File (`courses/css-fundamentals/index.md`)

```yaml
---
title: "CSS Fundamentals"
description: "Master CSS from box model to advanced layouts"
difficulty: "beginner"
image: "/images/courses/css-fundamentals.png"
tags: ["css", "frontend", "layout"]
order: 1
---

# CSS Fundamentals

Learn the building blocks of web styling...

## What you'll learn

- The CSS box model and how elements are sized
- Flexbox and Grid for modern layouts
- Responsive design principles
- CSS custom properties and theming

## Prerequisites

- Basic HTML knowledge
- A code editor (VS Code recommended)
```

## Lesson File (`courses/css-fundamentals/02-flexbox.md`)

```yaml
---
title: "Flexbox Layout"
description: "Learn one-dimensional layout with CSS Flexbox"
course: "css-fundamentals"
order: 2
duration: 25
---

# Flexbox Layout

Flexbox is a one-dimensional layout method...

## The Flex Container

To start using flexbox, set `display: flex` on the container:

```css
.container {
  display: flex;
}
```

::callout{type="info"}
Flexbox works along a **main axis** (default: horizontal) and a **cross axis** (default: vertical).
::

## Exercise: Center a Card

::exercise-qcm
---
id: "flexbox-qcm-1"
question: "Which property centers items along the main axis in flexbox?"
options:
  - "align-items"
  - "justify-content"
  - "text-align"
  - "place-items"
correct: 1
explanation: |
  `justify-content` controls alignment along the main axis.
  `align-items` controls the cross axis.
::

## Exercise: Build a Navbar

::exercise-code
---
id: "flexbox-code-1"
type: "html-css"
description: "Build a horizontal navigation bar using flexbox"
starter:
  html: |
    <nav>
      <div class="logo">Logo</div>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  css: |
    /* Write your flexbox CSS here */
    nav {
      /* Your code */
    }
tests:
  - name: "nav uses display:flex"
    type: "css-property"
    selector: "nav"
    property: "display"
    expected: "flex"
  - name: "list items are horizontal"
    type: "css-property"
    selector: "nav ul"
    property: "display"
    expected: "flex"
  - name: "items spaced with gap"
    type: "css-property"
    selector: "nav ul"
    property: "gap"
    expected: "1rem"  # accepts any value, just checks existence
::

## Exercise: CSS Layout Visual

::exercise-graphical
---
id: "flexbox-visual-1"
image: "/exercises/flexbox-layout-challenge.png"
question: "Which CSS properties create this layout?"
options:
  - "display: flex; justify-content: space-between"
  - "display: grid; grid-template-columns: repeat(3, 1fr)"
  - "display: flex; flex-direction: column"
  - "float: left; width: 33%"
correct: 0
explanation: |
  The layout shows three items spaced evenly with space between them.
  This is a classic flexbox `justify-content: space-between` pattern.
::
```

## Exercise Schema Reference

### QCM Exercise (`::exercise-qcm`)

```yaml
id: string              # Unique exercise identifier
question: string         # The question text
options: string[]        # Answer choices
correct: number          # Index of correct answer (0-based)
explanation: string      # Shown after answering (right or wrong)
```

### Code Challenge Exercise (`::exercise-code`)

```yaml
id: string
type: "html-css" | "javascript" | "vue-component"  # Determines sandbox type
description: string      # What the user needs to build
starter:
  html: string           # Initial HTML in the sandbox
  css: string            # Initial CSS
  js: string             # Initial JS (optional)
tests:
  - name: string         # Human-readable test description
    type: "css-property" | "dom-exists" | "js-output" | "function-return"
    # type-specific fields below
    selector: string     # For css-property and dom-exists
    property: string     # For css-property
    expected: string     # Expected value or existence check
```

### Graphical Exercise (`::exercise-graphical`)

```yaml
id: string
image: string           # Path to layout screenshot (in R2 or public/)
question: string
options: string[]
correct: number
explanation: string
```

## Linking MD Content to D1 Progress

The lesson's filesystem path becomes the canonical ID in D1:

```
MD file:   content/courses/css-fundamentals/02-flexbox.md
Slug:      css-fundamentals/02-flexbox
D1 key:    user_progress.lesson_id = "css-fundamentals/02-flexbox"
Exercise:  user_progress.exercise_id = "css-fundamentals/02-flexbox#flexbox-qcm-1"
```

This means content can be moved/renamed (slug changes need a migration), but the link is stable as long as the filename is stable. Git history tracks all changes.

## Why Not D1 for Course Content?

| Aspect | MD Files (Git) | D1 (Database) |
|---|---|---|
| Version control | Native Git (diff, blame, revert) | Manual migration scripts |
| Author workflow | Any text editor. PR review. | Form-based UI required |
| Portability | Plain text files. Universal. | Locked to D1 SQL dialect |
| AI agent friendly | Agents read/write files directly | Agents need API access |
| Content + code colocation | Exercises, tests, code same repo | Separate repos/code |
| Querying (structured) | Nuxt Content v3 provides SQL queries | Native SQL |
| Relational data (user state) | Not possible | Natural fit |

The conclusion from research: **content is documentation, documentation belongs in Git**. The database is for user state that cannot be pre-rendered.

## Migration Notes

The existing blog stays in `content/blog/`. No migration needed — blog content continues to work as before. Course content is added in a new `content/courses/` directory. The two collections coexist in `content.config.ts`.
