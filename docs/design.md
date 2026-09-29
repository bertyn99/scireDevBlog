# Brand - scireDev

**Status**: live blog. Source of truth is `/blog`, not the playground.
**Product**: developer magazine. Courses come later. Design starts from the index we already ship.

---

## Design read

Magazine blog for people learning the craft, with a high-contrast editorial language, leaning toward the existing `Hero` + `ArticleCard` + filter row. Visual target: the overlapping featured crop, `Blog.` masthead, dark popular rail, and 3-column latest grid.

The Compass playground, leaf-as-tittle wordmark, and LMS shells are parked. They are not the brand lock.

## Locked (from the live blog)

Tokens already in `apps/web/app/assets/css/main.css`:

| Role | Token | Hex |
|---|---|---|
| Ink | `secondary` | `#262626` |
| Ash | `primary-darken` | `#A6A6A6` |
| Mist | `primary-default` | `#D9D9D9` |
| Minium | `tertiary-default` | `#F23005` |
| Minium dark | `tertiary-darken` | `#D93D1A` |
| Paper | body | near-white (`gray-200/25`) |

- **Name**: scireDev. Logo file: `/img/scire_logo_primary.png`.
- **Accent**: minium. Fill for Read more, current page, active filter, hover arrow on a card. One accent. Not indigo. Not a second brand color.
- **Ink panel**: popular rail is `#262626` with mist type. The rest of the index stays on paper. That one dark block is allowed. Do not invert the whole page.
- **Photography**: article covers in grayscale. Color on hover. Real covers from `content/blog`. No fake screenshots.
- **Radius**: small (6-8px) on cards and inputs. Square on the minium CTA. Not pills.

## Index structure (keep)

This is the page. Do not replace it with a Compass course shell.

1. **Nav**: logo left. Home, Blog. Single row. Height under 80px.
2. **Featured (desktop)**: overlapping magazine crop, not a flat 2-column card. White copy (author, title, category rule, lede, minutes + date) sits on the left and overlaps the grayscale cover. `New Articles` is a white chip on the photo, not in the copy column. Square minium `Read More` with a south-east arrow hangs off the photo. Counter is large type (`2` `/5`), not a minium disc. Prev/next are white squares on the ink strip under the photo.
3. **Featured (mobile)**: `Blog.` first. Full-bleed grayscale cover with a dark gradient. Copy overlays the photo in mist. White `New Articles` chip at the top. Dark control bar under the photo: square pagination ticks on the left, white prev/next on the right. The whole story is the link — no Read More button.
4. **Masthead**: `Blog.` with a minium smear behind the word and a single minium stroke. Not a second logo.
5. **Popular (desktop)**: ink rail, three stories. Thumb, title, minutes. Outlined arrow at rest, minium fill on hover. The rail sits under `Blog.` and the photo overlaps its left edge.
6. **Popular (mobile)**: same ink block, horizontal cards (thumb + minium arrow overlay, title, minutes).
7. **Latest**: heading, category row (All + real categories from content), search. Then a 3-column card grid.
8. **Card**: cover, author, title, category rule, lede, minutes + date. Corner arrow: ink at rest, minium on hover.
9. **Pagination**: ink chevrons, minium current page.

Components: `Hero.vue`, `article/SlideData.vue`, `carrousel/`, `article/Card.vue`, `article/Pagination.vue`, `pages/blog/index.vue`.

## Type and copy

- Display: the `Blog.` word and featured title. Body: existing sans. Do not introduce Inter, Bricolage, or a serif for "editorial."
- Categories on the index are the ones in the markdown (`road to basic`, `tips and advice`, `one on one` / Concept). Do not invent Technology / Digital Marketing.
- No fake view counts. Minutes come from reading time when present. Dates from `createdAt`.
- No em-dash in UI copy.

## Killed

- Playground (`docs/playground.html`) as the brand source. Compass sidebar, path overview, hub widgets, leaf tittle, grove marks.
- `HeroFeatured` mosaic (2+1 image dump) as the blog hero.
- Giant watermarks, PCB marks, pink (`bg-pink-400`) leftovers.
- Duplicate subscribe CTAs on the index. Footer already has Subscribe.

## Production

Work in `apps/web`. Route: `/blog`. Layout: `blog.vue` (nav, then Hero, then the latest grid, then footer).
