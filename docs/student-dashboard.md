# Student Dashboard — Learning Hub

**Related**: [Architecture Overview](./architecture.md), [Adaptive Engine](./exercise-engine/adaptive.md), [Content Model](./content-model.md), [User System](./user-system/database.md)

**Design inspiration**: [Tailwind UI Compass](https://compass.tailwindui.com/) — clean course overview patterns, module grouping, lesson items with status/duration

## Overview

The student dashboard is the **home base for logged-in learners**. It replaces the blog-centric homepage for authenticated users and serves as the entry point for all learning activities.

```
Unauthenticated user → / (blog homepage)
Authenticated user   → /dashboard (learning hub)
```

## Design Philosophy

Inspired by Tailwind UI Compass, boot.dev, and Frontend Masters:

1. **Continue learning is king** — The #1 action. One click to resume.
2. **Progress is visible** — Every course shows a progress bar. Every lesson shows status.
3. **Adaptive recommendations** — The engine surfaces weak concepts, not the user hunting for them.
4. **No clutter** — Only learning-relevant widgets. Settings/billing are in a separate `/settings` page.
5. **Empty states are welcoming** — New users see a course catalog CTA, not empty widgets.

---

## Page Structure

### `/dashboard` — Main Hub

```
┌─────────────────────────────────────────────────────────────┐
│  Navbar (logo, Courses, Paths, Dashboard, avatar dropdown)  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Welcome back, {name}!                                      │
│  You're on a {N}-day streak 🔥                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  CONTINUE LEARNING                              ▐►  │   │
│  │                                                      │   │
│  │  CSS Fundamentals › Flexbox Layout                  │   │
│  │  Lesson 2 of 5 · ████████░░░░ 60%                  │   │
│  │  Resume where you left off                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  Your Courses                              [Browse all →]  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ CSS          │  │ JavaScript   │  │ Vue          │     │
│  │ Fundamentals │  │ Basics       │  │ Fundamentals │     │
│  │              │  │              │  │              │     │
│  │ ██████░░ 75% │  │ ██░░░░░░ 20% │  │ ░░░░░░░░  0% │     │
│  │ 3/5 lessons  │  │ 1/8 lessons  │  │ Not started  │     │
│  │ Beginner     │  │ Beginner     │  │ Intermediate │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  Skill Mastery              Review Queue (3 due)           │
│  ┌─────────────────────┐    ┌────────────────────────┐    │
│  │ flexbox     ████░ 80│    │ CSS Selectors     Due   │    │
│  │ box-model   █████ 95│    │ Flex Direction    Overdue│    │
│  │ positioning ██░░░ 40│    │ Grid Template     Due   │    │
│  │ grid        █░░░░ 15│    │                        │    │
│  │ cascading   ███░░ 60│    │ [ Practice weak spots ]│    │
│  └─────────────────────┘    └────────────────────────┘    │
│                                                             │
│  Recent Activity                                           │
│  ┌──────────────────────────────────────────────────────┐ │
│  │ ✓ Passed: Flexbox Layout — Center a div    2h ago   │ │
│  │ ✗ Failed: Grid Layout — Template tracks   1d ago   │ │
│  │ ✓ Completed: Box Model lesson             2d ago   │ │
│  │ ✓ Started: CSS Fundamentals course         3d ago   │ │
│  └──────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Widgets

#### 1. Continue Learning Card (hero)
The dominant element. Shows the last lesson the user was on.

**Data**: Last accessed lesson from `lesson_progress` (D1) + lesson content from Nuxt Content.

```typescript
// Query: last accessed lesson
const lastLesson = await db.select()
  .from(lessonProgress)
  .where(eq(lessonProgress.userId, session.user.id))
  .orderBy(desc(lessonProgress.lastAccessedAt))
  .limit(1)

// Merge with content
const lesson = await queryCollection('lessons')
  .where('_path', '=', lastLesson.lessonSlug)
  .first()
```

**States**:
- **Has progress**: Show course name, lesson title, progress bar, "Resume" button
- **No progress**: Show "Start your first course" + featured course CTA
- **Just finished**: Show "Next lesson" or "Course complete — start next course"

#### 2. Course Progress Grid
Cards for each enrolled (or started) course.

**Each card shows**:
- Course title
- Difficulty badge (Beginner / Intermediate / Advanced)
- Progress bar: completed lessons / total lessons
- Lesson count (e.g., "3/5 lessons")
- "Continue" or "Start" button

**Data**: `course_progress` table joined with lesson counts from Nuxt Content.

```typescript
// Query: all course progress for user
const courses = await db.select()
  .from(courseProgress)
  .where(eq(courseProgress.userId, session.user.id))

// For each course, count completed lessons
for (const course of courses) {
  const lessons = await queryCollection('lessons')
    .where('course', '=', course.courseSlug)
    .all()
  const completed = await db.select({ count: count() })
    .from(lessonProgress)
    .where(and(
      eq(lessonProgress.userId, session.user.id),
      eq(lessonProgress.status, 'completed'),
      inArray(lessonProgress.lessonSlug, lessons.map(l => l._path)),
    ))
}
```

**Empty state**: "You haven't started any courses yet. Browse the catalog →"

#### 3. Skill Mastery Panel
Visual bars showing mastery per concept (from adaptive engine).

**Data**: `/api/adaptive/skill-map` — returns `{ conceptTag, mastery, lastPracticedAt }[]`.

**Design**:
- Horizontal progress bars (0-100%)
- Color coding: 🔴 <40% (weak), 🟡 40-70% (developing), 🟢 >70% (strong)
- Sorted by mastery ascending (weakest at top)
- Click a concept → jump to exercises targeting that concept

```vue
<div v-for="skill in skills" class="flex items-center gap-3">
  <span class="w-32 text-sm">{{ skill.conceptTag }}</span>
  <div class="flex-1 h-2 rounded-full bg-gray-200">
    <div
      class="h-2 rounded-full transition-all"
      :class="masteryColor(skill.mastery)"
      :style="{ width: `${skill.mastery * 100}%` }"
    />
  </div>
  <span class="w-8 text-right text-sm text-gray-500">{{ Math.round(skill.mastery * 100) }}</span>
</div>
```

#### 4. Review Queue
Concepts due for spaced repetition review.

**Data**: `user_mastery` table where `nextReviewAt <= now()`.

**Each item shows**:
- Concept name
- Status: "Due now" or "Overdue (N days)"
- Click → go to adaptive practice mode (engine picks exercises for weak concepts)

**Empty state**: "No reviews due. You're all caught up! 🎉"

#### 5. Recent Activity Feed
Chronological list of recent actions.

**Data**: `exercise_attempts` table + `lesson_progress` status changes.

**Each item shows**:
- Icon: ✓ (passed), ✗ (failed), 📘 (lesson started), 🎓 (course completed)
- Action description
- Relative timestamp ("2h ago", "1d ago")

```typescript
// Query: recent activity (union of attempts + lesson completions)
const recentAttempts = await db.select()
  .from(exerciseAttempts)
  .where(eq(exerciseAttempts.userId, session.user.id))
  .orderBy(desc(exerciseAttempts.submittedAt))
  .limit(10)

const recentLessons = await db.select()
  .from(lessonProgress)
  .where(and(
    eq(lessonProgress.userId, session.user.id),
    eq(lessonProgress.status, 'completed'),
  ))
  .orderBy(desc(lessonProgress.completedAt))
  .limit(5)

// Merge + sort by timestamp
```

#### 6. Learning Streak
Consecutive days with at least one exercise attempt.

**Data**: Computed from `exercise_attempts.submittedAt` dates.

```typescript
// Calculate streak: count consecutive days backward from today
function calculateStreak(attemptDates: Date[]): number {
  const days = new Set(attemptDates.map(d => d.toDateString()))
  let streak = 0
  const today = new Date()
  while (days.has(today.toDateString())) {
    streak++
    today.setDate(today.getDate() - 1)
  }
  return streak
}
```

**Design**: Flame icon + "{N}-day streak". Only shown if streak ≥ 1.

---

### `/courses` — Course Catalog

Browse all available courses. Not gated by auth — public page.

**Design** (inspired by Compass course overview):
- Grid of course cards
- Filter by: difficulty, learning path, status (if logged in)
- Search bar
- Each card: title, description, difficulty, lesson count, estimated duration, progress (if enrolled)

```
┌──────────────────────────────────────────────────────────┐
│  Courses                                                 │
│  [Search...]  [All ▾]  [Beginner ▾]  [Path ▾]           │
│                                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ CSS         │  │ JavaScript  │  │ Vue         │     │
│  │ Fundamental │  │ Basics      │  │ Fundamental │     │
│  │             │  │             │  │             │     │
│  │ 5 lessons   │  │ 8 lessons   │  │ 12 lessons  │     │
│  │ 2h 30min   │  │ 4h 00min   │  │ 6h 00min   │     │
│  │ Beginner    │  │ Beginner    │  │ Intermediate│     │
│  │             │  │             │  │             │     │
│  │ ████░░ 75% │  │ ██░░░░ 20% │  │ [Start →]   │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└──────────────────────────────────────────────────────────┘
```

### `/paths` — Learning Paths

Visual roadmap of structured curriculum (from `curriculum.md`).

**Design**:
- Path selector (cards for each path: Frontend Engineer, Full-Stack Nuxt, CSS Specialist, JS Specialist)
- Path detail: vertical timeline of stages and courses
- Progress overlay on each course in the path

```
┌──────────────────────────────────────────────────────────┐
│  Learning Paths                                          │
│                                                          │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │ Frontend     │  │ Full-Stack   │                     │
│  │ Engineer     │  │ Nuxt         │                     │
│  │ (Vue)        │  │              │                     │
│  │ 120h · 5 stg │  │ 150h · 6 stg │                     │
│  │ 35% complete │  │ Not started  │                     │
│  └──────────────┘  └──────────────┘                     │
│                                                          │
│  Selected: Frontend Engineer (Vue)                       │
│  ┌──────────────────────────────────────────────────┐   │
│  │ ● Stage 1: JavaScript (35h)               100% ✓ │   │
│  │   ✓ javascript-basics                             │   │
│  │   ✓ javascript-intermediate                       │   │
│  │   ✓ async-javascript                              │   │
│  │   ✓ javascript-advanced                           │   │
│  │                                                    │   │
│  │ ◐ Stage 2: The Platform (20h)              50%   │   │
│  │   ✓ html-semantics                                │   │
│  │   ◐ dom-manipulation                              │   │
│  │   ○ browser-apis                                  │   │
│  │                                                    │   │
│  │ ○ Stage 3: Styling (25h)                   0%    │   │
│  │   ○ css-fundamentals                              │   │
│  │   ○ css-layout                                    │   │
│  │   ○ css-architecture                              │   │
│  └──────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

---

## Course Overview Page (`/courses/[slug]`)

Inspired by Compass — this is the **course landing + lesson list**.

Already exists at `apps/web/app/pages/courses/[...slug].vue`. Needs enhancement:

**Additions**:
- Lesson completion checkmarks (✓/○) next to each lesson
- Progress bar at the top ("3 of 5 lessons complete")
- "Continue" or "Start" button instead of generic links
- Duration badges on each lesson
- Module/Stage grouping (like Compass Parts)

```vue
<!-- Lesson list item (Compass-inspired) -->
<NuxtLink :to="lesson._path" class="group flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50">
  <!-- Status icon -->
  <span v-if="lesson.status === 'completed'" class="text-green-500">✓</span>
  <span v-else-if="lesson.status === 'in_progress'" class="text-blue-500">◐</span>
  <span v-else class="text-gray-300">○</span>

  <!-- Lesson info -->
  <div class="flex-1">
    <h3 class="font-medium group-hover:text-primary">{{ lesson.title }}</h3>
    <p class="text-sm text-gray-500">{{ lesson.description }}</p>
  </div>

  <!-- Duration badge -->
  <span v-if="lesson.duration" class="text-xs text-gray-400">{{ lesson.duration }}min</span>
</NuxtLink>
```

---

## Responsive Behavior

| Breakpoint | Layout |
|---|---|
| Desktop (`lg+`) | Full dashboard: 2-column for skill/review, 3-column for course cards |
| Tablet (`md`) | Stacked: single column, course cards in 2-col grid |
| Mobile (`sm`) | Everything stacked. Course cards full width. "Continue Learning" is hero. |

---

## Data Flow

```
/dashboard page load
  │
  ├── useFetch('/api/adaptive/skill-map')
  │     → returns: [{ conceptTag, mastery, lastPracticedAt }]
  │
  ├── useFetch('/api/progress/courses')  (NEW endpoint needed)
  │     → returns: [{ courseSlug, status, completedLessons, totalLessons, lastAccessedAt }]
  │
  ├── useFetch('/api/progress/last-lesson')  (NEW endpoint needed)
  │     → returns: { lessonSlug, courseSlug, lessonTitle, courseTitle, progress }
  │
  ├── useFetch('/api/adaptive/review-queue')  (NEW endpoint needed)
  │     → returns: [{ conceptTag, nextReviewAt, mastery }]
  │
  └── useFetch('/api/progress/activity')  (NEW endpoint needed)
        → returns: [{ type, description, timestamp }]
```

### New API Endpoints Needed

| Endpoint | Purpose |
|---|---|
| `GET /api/progress/courses` | All course progress for the user (for dashboard grid) |
| `GET /api/progress/last-lesson` | Last accessed lesson (for "Continue Learning") |
| `GET /api/adaptive/review-queue` | Concepts due for spaced repetition review |
| `GET /api/progress/activity` | Recent activity feed (attempts + completions) |

All require `requireAuth(event)` — no `userId: 'temp'`.

---

## Components

### New Components (in `apps/web/app/components/`)

| Component | Location | Purpose |
|---|---|---|
| `dashboard/ContinueLearning.vue` | app/components/dashboard/ | Hero "resume" card |
| `dashboard/CourseCard.vue` | app/components/dashboard/ | Course progress card |
| `dashboard/SkillMastery.vue` | app/components/dashboard/ | Mastery bars panel |
| `dashboard/ReviewQueue.vue` | app/components/dashboard/ | Spaced repetition items |
| `dashboard/ActivityFeed.vue` | app/components/dashboard/ | Recent actions list |
| `dashboard/StreakBadge.vue` | app/components/dashboard/ | Day streak indicator |
| `course/LessonItem.vue` | app/components/course/ | Compass-style lesson list row |

### Pages

| Page | Route | Auth Required |
|---|---|---|
| Dashboard | `/dashboard` | Yes — redirect to `/auth/login` if not authenticated |
| Course Catalog | `/courses` | No (public) |
| Learning Paths | `/paths` | No (public, but progress shown if logged in) |

### Layout

Dashboard uses a separate layout (`app/layouts/dashboard.vue`) with:
- Compact navbar (no blog-specific nav items)
- User avatar dropdown
- Mobile hamburger menu

---

## Nuxt UI v4 Components Used

| Nuxt UI Component | Usage |
|---|---|
| `UCard` | Course cards, widget containers |
| `UProgress` | Progress bars on course cards |
| `UBadge` | Difficulty labels, duration badges |
| `UButton` | "Continue", "Start", "Practice" CTAs |
| `UAvatar` | User avatar in navbar |
| `UDropdown` | Avatar menu (settings, logout) |
| `UAlert` | Empty states |
| `USkeleton` | Loading states |

---

## Integration with Adaptive Engine

The dashboard is the primary surface for adaptive engine output:

1. **Skill Mastery panel** reads from `user_mastery` table
2. **Review Queue** reads from `user_mastery.nextReviewAt`
3. **"Practice weak spots"** button calls `/api/adaptive/next-exercise` which routes to the weakest concept
4. **Recommendations** are surfaced proactively, not on user request

This means the adaptive engine runs silently in the background (updating mastery on every exercise submission) and the dashboard is where its insights become visible.

---

## Open Questions

- [OPEN] Should the dashboard show a weekly goal widget? (e.g., "Complete 5 exercises this week")
- [OPEN] Should we show a leaderboard or comparison to other students? (Probably not — personal focus)
- [OPEN] Gamification: badges, achievements, certificates? (Design doc says "not yet")
- [OPEN] Dark mode for dashboard? (Nuxt UI v4 supports it natively)

---

## Related Documents

| Doc | Content |
|---|---|
| [architecture.md](./architecture.md) | Overall stack, data flow, key decisions |
| [content-model.md](./content-model.md) | Course/lesson/exercise MD file structure |
| [exercise-engine/adaptive.md](./exercise-engine/adaptive.md) | Adaptive engine, mastery tracking, spaced repetition |
| [user-system/database.md](./user-system/database.md) | D1 schemas, auth, progress tracking API |
| [admin-dashboard.md](./admin-dashboard.md) | Admin analytics (separate from student dashboard) |
| [curriculum.md](./curriculum.md) | Learning paths, course catalog, capstone projects |
