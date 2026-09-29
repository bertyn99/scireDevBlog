# Brand - scireDev

**Status**: 🟡 Playground. One HTML file: `docs/playground.html`. No production UI swap yet.
**Product**: developer learning platform. Professional, calm, not in your face.

---

## Locked

- **Catalog structure**: D. Filter row on top. Stacked course slabs. Title, minium underline, meta on the left.
- **Palette D** (default). Warm and cool are playground tweaks only.

| Role | Hex |
|---|---|
| Ink | `#262626` |
| Paper | `#F4F4F5` |
| Minium | `#F23005` |
| Slate | `#3F4A52` |
| Ash | `#A6A6A6` |

- **Name**: scireDev. Latin *scire*, to know. The name is the mark: the tittle of the *i* is the leaf (or circle, or grove). `Dev` is minium.
- **Wordmark**: chrome only (topbar). The tittle is a tittle, not a logo glued onto the letter. Never a second hero logo. Never a card watermark.
- **Type**: Bricolage Grotesque (optical size) + IBM Plex Mono. Not Source Sans. Not Inter. Display opsz on headlines, 14-18 on UI.
- **Rubric**: minium is the teacher's red. Current sidebar item, catalog underline, folio left edge, progress fill, `Dev`. Not a fill for primary buttons (those stay ink).
- **Folio**: 2px minium in the left margin of the page. On the white lesson sheet, rubric + type, no gray card. A filled white sheet only when the folio sits on the paper field (hub continue).
- **Page**: paper field. Lesson chrome (sidebar + content) is a white sheet on that field.
- **Radius**: 8px on cards and chips. Not pills. Not 90° circuit corners.
- **Feel**: batch 3. Quiet. The mark lives in the name, not as a second headline.

## Marks (keep)

Switchable in the playground. They sit on the *i*. Nowhere else.

- **Leaf** (batch 3): pointed leaf, chevron fill, rounded joins. Default.
- **Circle** (batch 3): circular tree, same chevron construction.
- **Grove** (batch 4 A): oval frame, two trunks, oval leaves, ember in the canopy.

## Killed

Arch / rainbow (batch 3). Oval Y-tree (batch 3 last). Batch 4 B Canopy, C Leaf, D Open. PCB language. Giant watermarks. Hero wordmark as a second headline. Batch 4 comps with a separate mark beside the name.

## Playground

Layout base: [Tailwind UI Compass](https://compass.tailwindui.com/). Steal the shell (module sidebar, breadcrumb topbar, Part N + lesson rows, 16:9 video, On this page). Identity is ours: scire wordmark in chrome, minium rubric, paper field.

Open `docs/playground.html` in a browser, or:

```bash
python3 -m http.server 4174 --directory docs
```

Then `http://localhost:4174/playground.html?screen=landing&mark=leaf&palette=d`

Dock switches screens, marks (leaf / circle / grove), and palettes (D / warm / cool). Arrow keys cycle screens. Throwaway. Not a Nuxt route.

Screens: landing, dashboard (hub), catalog, path, course, chapter, exercise, studio.

Dashboard follows the Vue hub widgets: continue learning, course progress, streak, skill mastery, review queue, activity. Flattened to Compass lists. Same tokens as the rest of the playground.
