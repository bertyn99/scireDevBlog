# Brand — scireDev

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

- **Name**: scireDev.
- **Radius**: 8px on cards and chips. Not pills. Not 90° circuit corners.
- **Feel**: batch 3. Quiet. Professional. The mark is a colophon, not a second headline.

## Marks (keep)

Switchable in the playground.

- **Leaf** (batch 3) — pointed leaf, chevron fill, rounded joins. Default.
- **Circle** (batch 3) — circular tree, same chevron construction.
- **Grove** (batch 4 A) — oval frame, two trunks, oval leaves, ember in the canopy.

## Killed

Arch / rainbow (batch 3). Oval Y-tree (batch 3 last). Batch 4 B Canopy, C Leaf, D Open. PCB language. Giant watermarks.

## Playground

Open `docs/playground.html` in a browser, or:

```bash
python3 -m http.server 4174 --directory docs
```

Then `http://localhost:4174/playground.html?screen=landing&mark=leaf&palette=d`

Dock switches screens, marks (leaf / circle / grove), and palettes (D / warm / cool). Arrow keys cycle screens. Throwaway. Not a Nuxt route.

Screens: landing, catalog, path, course, chapter, exercise, studio.

Deepen later: typeface lock, favicon, production fold-in.
