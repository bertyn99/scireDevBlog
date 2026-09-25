# Brand Discovery — scireDev

**Status**: 🟡 Discovery. Visual direction is locked enough to explore the mark. No application code until this document is agreed.
**Last updated**: 2026-09-25
**Audience**: humans deciding the brand, and agents generating comps or later implementing UI.

This is the brand document. Stack, curriculum, and product architecture live in the sibling files listed in [README.md](./README.md).

---

## Design read

Reading this as: a **developer school** with a **Latin scholarly + craftsman** language, not an EdTech SaaS, leaning toward **paper-and-minium editorial** with **Cloudflare-grade craft** (not Cloudflare costume).

One sentence: **scireDev is a school of discernment** — *to know* as a practiced verb, tended like a coal, branched like a tree of knowledge.

---

## Why the last comps had no soul

The previous Ember Tree boards failed for a structural reason, not a polish reason. They stacked three generic costumes:

1. **Dark-SaaS Cloudflare cosplay.** Full charcoal canvas, glow, three cards, spark-at-the-node. That is the AI default of "developer infra," not what Cloudflare actually does, and not what scireDev already is.
2. **Nature-tree logo.** Five-branch canopies and leafy silhouettes read as wellness / eco / "growth." They do not read as *scire*.
3. **Flame / starburst.** Fire-as-energy is every developer-tool spark icon. An ember is the opposite of a blaze.

Soul does not come from a darker background or a more geometric tree. It comes from **meaning that only this name can hold**, then from craft that already exists in the product.

What those comps missed:

- The name is a **Latin infinitive**, not a coined noun.
- The verb's own root means **to split / discern**, which is already a fork.
- `#F23005` is closer to **manuscript minium** than to "startup orange."
- The live site is already **paper-first**, with charcoal used as an inset night panel.
- The product personality in [curriculum.md](./curriculum.md) is **severe and patient** ("backend-style rigor applied to frontend"), not "empowering young developers."

---

## Name

**scireDev** = Latin *scīre* + *Dev*.

| Piece | What it is | What it is not |
|---|---|---|
| *scīre* | Present infinitive of *sciō*: **to know, understand, perceive, be skilled in** | A noun for "knowledge" (*scientia*), a course catalog, a science lab |
| *Dev* | The person who practices | A product suffix like `-ly` / `-ify` |

Lewis & Short gloss *sciō, scīre* as "to know, in the widest signif. of the word; to understand; perceive; to have knowledge of or skill in any thing." They also record the older sense of the root: Greek κείω / κεάζω, **to split, divide**; Latin *scīre* is "prop. **to distinguish, discern**."

That split is the brand.

Related verbs, keep distinct:

- *discō* = to learn (the student action)
- *noscō* = to come to know, become acquainted
- *sciō* = to already be able to distinguish, to have skill in

*Scientia* in classical Latin is **skill / expertness**, not modern "Science™." Cicero pairs it with *usus* (practice). Caesar writes *scientia atque usus militum*. The platform is *scientia* + *usus*: knowing that has been exercised.

**Lockup implication:** *scire* is the word. *Dev* is the audience, set smaller, more technical, never competing for equal weight. Do not title-case it into `Scire Dev` as two English words. Do not restyle it as `SCIREDEV` unicase chrome.

**Voice implication:** headlines can be verbs. The current landing line ("We're changing the way you learn to code.") is a nothing sentence. A truer line sits closer to: *scire.* / Learn to distinguish. / Knowledge of the developer, practiced.

---

## Ember Tree, restated

Keep the metaphor. Kill the pictures that made it generic.

### Ember is not fire

An ember is **residual heat**. It is what remains after the blaze, and what you tend so it does not go out. That matches how this school actually teaches: fundamentals before frameworks, vanilla before abstraction, mastery routed back to weak nodes ([curriculum.md](./curriculum.md)).

Visual consequence:

- One coal. Matte. Small. Occupies the **node**, not the canopy.
- No flames, no sparks, no neon halo, no "ignite your career."
- Heat is **local**. The rest of the system stays paper, ink, zinc.

Craft analogue (steal the *idea*, not the category): KILN's Behance identity is built on "Formed by Fire" as **transformation in a chamber**, ember orange + burnt brown + soft neutrals, not a flame icon. Ember & Tide (Charlotte Chapman Studio) treats ember as **material provenance**, with a quiet mark hiding in an ampersand, not a pictogram of fire.

### Tree is not nature

The tree is a **classification of knowledge**, not a forest brand.

Historical source: Ramon Llull's *Arbor scientiae* (Rome, 1295–1296). Knowledge as sixteen trees, each divided into roots, trunk, branches, twigs, leaves, flowers, fruit. Later printed editions (Lyon 1515 and others) show labeled woodcuts: a diagram you can walk, not a landscape you admire.

Developer-native source: the Git mark. Jason Long's 2012 Dribbble concept for git-scm.com started as coins on a 5×5 grid and reduced to a **branching graph**: nodes and a fork, not leaves. That is the correct geometry family for scireDev. Do not copy the Git diamond or the three-node glyph. Steal the reduction method: grid → fork → one ownable difference.

The ownable difference is the coal at the fork. Git's nodes are empty circles. Ours is a single minium disc at the split — the moment of *discernere*.

### The fusion

```
scīre (to split / discern)
        ×
arbor scientiae (knowledge as a walkable tree)
        ×
git fork (developer branching)
        ×
ember (knowledge that is tended, not ignited)
        =
Ember Tree
```

If a mark cannot survive that sentence, it is the wrong mark.

**Rejected silhouettes**

| Silhouette | Why it dies |
|---|---|
| Leafy 5-branch tree | Eco / wellness / "growth startup" |
| Realistic oak / dusk forest photo used as the logo | Atmosphere can be a *section*, never the mark |
| Starburst, spark, flame | Dev-tool cliché; contradicts ember |
| Glowing orb on a Y | Linear / Vercel / every AI agent icon |
| Pixel tree | Retro game, not a school |

**Preferred silhouette (working lock)**

A **Y-fork or 3-node graph**, upright, constructed on a square grid, with **one minium coal at the junction**. Branches are ink (`#262626`) on paper, or paper on charcoal. Stroke is even, slightly humanist (not perfectly rounded "friendly SaaS," not brutalist bolts). At 16px the coal is still a square or disc. At 512px the construction grid is still implied.

Upright, not leaned. A lean is a tech-startup dynamism trick. A school stands.

---

## What already exists (keep)

The current site is more ownable than the dark comps. Do not throw this DNA away.

From `apps/web/app/assets/css/main.css`:

| Token | Hex | Current role | Brand meaning |
|---|---|---|---|
| `--color-primary-default` | `#d9d9d9` | Light type on charcoal, paper-adjacent | Ash / laid paper |
| `--color-primary-darken` | `#a6a6a6` | Muted meta | Cool ash |
| `--color-secondary` | `#262626` | Dark panels, "Popular Articles" block | Ink / night of study. Same value Cloudflare uses for its hero band |
| `--color-tertiary-default` | `#f23005` | Accent | Minium. Rubrication. The coal |
| `--color-tertiary-darken` | `#d93d1a` | Hover / pressed accent | Roasted minium |

From the live UI:

- Body is **light paper** (`bg-gray-200/25`), not a dark app shell.
- Charcoal appears as a **block you enter** (popular articles, footer).
- Orange appears as a **left rule, underline, or painted rectangle behind a word** (`Blog.`), not as a glow and not as a section fill.
- Article cards go **grayscale → color on hover**. Knowledge is revealed, not shouted.
- Radius is already trying to be small (`rounded-md` / `rounded-lg`). The founder constraint is stricter: **4–6px on cards**. Never Cloudflare pills (`border-radius: 9999px`).

These are not leftovers. They are the beginning of the system.

The current **copy** is the part with no soul. `content/index.md` still says "We're changing the way you learn to code." `HeroLanding.vue` uses Unsplash coworking portraits and a generic orange/yellow blob. `Feature.vue` says "Empowering Young Developers" over three icon cards. That is the costume to burn. The tokens can stay.

---

## Cloudflare: steal craft, not costume

The founder likes the Cloudflare marketing page. The last comps copied the **myth** of that page (everything dark, orange glow, SaaS cards). The actual page is almost the opposite.

Observed from [cloudflare.com](https://www.cloudflare.com/) and the public Kumo / marketing token write-up:

| Craft to steal | Costume to refuse |
|---|---|
| Calm **white / off-white canvas** as the default page | Full-site dark mode as "premium" |
| Hero **inverts** to `#262626`, then the page returns to paper | Dark from hero through footer |
| Orange is **the action**, used rarely | Orange gradients, orange section fills, orange glow |
| Grotesque at **weight 500**, not shouting 700/800 | Inter Black headlines |
| Hairlines, 4px spacing grid, dense but breathable product proof | Fake dashboards, three equal feature cards |
| Technical calm. Short lines. Specific claims | "Build without boundaries" energy copied as vibe |

Cloudflare's signature orange is `#ff5e1f`. scireDev's tertiary is `#f23005`: redder, closer to minium than to Cloudflare. **Keep the gap.** If the palette is nudged toward `#ff5e1f`, the brand starts borrowing their trademark.

Cloudflare's most-copied gesture is the **full pill button**. scireDev's locked gesture is the **4–6px card**. That single refusal is how a visitor can feel "as crafted as Cloudflare" without looking like a Cloudflare clone.

Stripe / Vercel sit in the same craft family (near-black on near-white, one accent, no ornament). They are quality bar, not moodboard. Anthropic's warm charcoal + ochre editorial is a useful *counter-example* for AI products; scireDev should be **sharper and more Latin**, less candlelit essay.

---

## Research board

Dribbble search pages are gated; shots below are taken from indexed shot pages and adjacent case studies. Behance project pages are similarly thin on public text. Observations are from titles, descriptions, palettes, and stated concepts — not from copying layouts.

### Steal as craft

| Source | URL | What it actually does | Steal | Do not copy |
|---|---|---|---|---|
| Jason Long, *Git Logo Concept* | [dribbble.com/shots/433719](https://dribbble.com/shots/433719-Git-Logo-Concept) | Branching reduced from a 5×5 coin grid to three nodes | Grid-first fork geometry; developer-native tree | Git diamond, orange-on-orange, three empty circles |
| Phenomenon Studio, *Insightful* | [dribbble.com/shots/24378925](https://dribbble.com/shots/24378925-Insightful-Branding-for-Online-Courses-Platform) | Branding for creative + IT courses, full asset system | Treat education as identity, not as an LMS skin | "Lifelong learners" cheer, generic course-card chrome |
| KILN, ceramic studio | [behance.net/gallery/244309985](https://www.behance.net/gallery/244309985/KILN-Contemporary-Ceramic-Studio-Branding) | "Formed by Fire": ember orange, burnt brown, clay neutrals | Ember as **chamber / transformation**, material palette | Pottery, craft-studio photography, earth-tone wash over UI |
| Ember & Tide, Charlotte Chapman | [charlottechapman.uk/work/ember-tide](https://charlottechapman.uk/work/ember-tide) | Ember hidden in an ampersand; 19th-c. trade ephemera | Quiet mark; historical print as texture; ember as provenance | Hospitality, fish, slab-serif restaurant wordmark |
| Lexicon Symbolorum | [behance.net/gallery/241119699](https://www.behance.net/gallery/241119699/Lexicon-Symbolorum) | Latin title, scholarly + mysterious, seal-like monogram | Latin as **material**, not a caption under a logo; encyclopedic tone | Esoterica, zoomorphic seals, secret-society aura |
| NeuraCloud | [behance.net/gallery/248638757](https://www.behance.net/gallery/248638757/NeuraCloud-Brand-Identity-Campaign) | Deep orange + black + warm beige against "corporate blue AI" | Orange/black/paper as a **refusal of SaaS blue** | Hidden-letter gimmick, OOH campaign volume, "AI for people" |
| FirstMotion, Brandforma | [brandforma.com/work/firstmotion](https://brandforma.com/work/firstmotion) | Charcoal ground, two oranges, editorial serif + grotesk, construction grid | Construction-grid panel; orange rationed on dark | Consultancy positioning, neon-line mark |
| Helbers stationery (Visie) | [visie.io/media/helbers-...](https://visie.io/media/helbers-brand-identity-minimalist-paper-stationery-638690) | Stack of paper, charcoal sheet, **one thin orange edge line** | Orange as a **rubric edge**, paper as hero material | Leather lifestyle photography |
| Substack Orange (dark editorial) | [designbycurio.com](https://designbycurio.com/learn/substack-orange-newsletter) | Charcoal room, white reading card, orange as signal fire for the author | Paper card on charcoal = "lit page in a dim room" | Newsletter product UI, orange on author names as the whole system |
| ScienceMines | [behance.net/gallery/251017659](https://www.behance.net/gallery/251017659/ScienceMines-Visual-Identity-Branding) | Ed-tech, orange + black, dynamic mark | Proof that orange/black can carry education | Gaming stickers, playful-mascot energy |
| DARES EdTech | [behance.net/gallery/241137957](https://www.behance.net/gallery/241137957/DARES-EdTech-Brand-Identity-System) | Calligraphic D, orange accents, language-learning | Mark from **writing culture** | Arabic-calligraphy-specific form, LMS mockup clutter |

### Useful negative examples (EdTech slop)

These are popular and empty. Do not aim at them.

- Dark LMS dashboards with progress rings and course carousels ([Coursilia / Clyro](https://dribbble.com/shots/23353235-Dashboard-UI-UX-Design-for-Edtech), [Heyo dark learning](https://dribbble.com/shots/17631662-Online-Learning-Platform-Dark-Mode)).
- Gradient-hero coaching landings with floating student photos and "24k+ students" badges ([IELTS coaching shot](https://dribbble.com/shots/27147920-IELTS-Coaching-Landing-Page)).
- Ready-made "geometric tree" logos sold as nature/tech hybrids. They are the exact generic the last comps fell into.

---

## Cultural materials (the soul pile)

Use these as **image direction and type atmosphere**, not as costume drama.

1. **Dictionary specimen.** A Lewis & Short column: *scīre*, infinitive highlighted in minium. The brand can look like a page from a lexicon.
2. **Llull woodcut.** Labeled branches. Roots / trunk / canopy as **curriculum stages**, not as a forest photograph.
3. **Rubrication.** Medieval scribes used minium (red lead, orange-red) for initials, paragraph marks, headings. The Latin verb is *miniare*. That is what `#F23005` is doing when it underlines `Blog.` today. Pliny called related reds *flammeus* (flame-colored) — ember without drawing fire.
4. **Laid paper + iron-gall ink.** Off-white, slight warm tooth, charcoal brown-black — not cool OLED black.
5. **Hands, tools, coal, forks in code.** No Unsplash coworking. No "diverse team pointing at a laptop."

---

## Visual system (working lock)

### Canvas

**Paper is home. Charcoal is a room you enter.**

- Default marketing and blog: warm off-white / zinc paper (`#F4F4F5` to `#E4E4E7`), not pure `#FFFFFF` if we can keep it from going gallery-cold.
- Charcoal `#262626` for night-of-study bands: hero inversion, popular-rail, footer, code wells, exam focus.
- Never more than one full-bleed dark band per viewport stack without a paper return.

This is also how real Cloudflare works, and how the current scireDev homepage already works.

### Color meaning

| Role | Hex | Use |
|---|---|---|
| Ink | `#262626` | Type on paper, dark bands, mark branches |
| Paper | `#F4F4F5` | Page canvas |
| Ash | `#D9D9D9` / `#A6A6A6` | Rules, meta, disabled |
| Minium | `#F23005` | Coal, rubric, primary CTA fill, focus |
| Roasted minium | `#D93D1A` | Pressed / hover |
| Coal glow (rare) | `#FFF95B` at ≤10% | Already in `HeroLanding.vue` as a clip-path wash. Keep only as a **cinder**, never as a mesh gradient |

No second accent. No blue links unless accessibility forces a distinct visited/focus color on paper; even then keep it ink-adjacent, not Cloudflare `#193cb8`.

### Radius

| Element | Radius |
|---|---|
| Cards, images, inputs, code wells | **4px** (`rounded-[4px]`) |
| Buttons | **4–6px**. Prefer 4 |
| Avatars / true pills (tags) | 9999 only for circular avatars. Tags stay 4px |
| Hero / newsletter slabs | 0 or 4. Never `rounded-3xl` |

The current `HeroLanding` images use `rounded-xl`. The newsletter uses `sm:rounded-3xl`. Those are the first things a later implementation should tighten.

### Typography

Direction, not a font license:

- **Display / UI:** a sharp European grotesk with a real italic. Weight 400–500 for headlines. Tracking tight. Not Inter, not Geist-as-default, not Monument shouting.
- **Latin / etymology / pull quotes:** a humanist serif or the grotesk italic. *scire* should look like a cited infinitive.
- **Code:** the existing product already lives in Monaco. Marketing code samples should feel like the school (monospace, recessed paper or charcoal well, 4px).

Scale contrast should be **Cloudflare-like in restraint** (56px at weight 500, not 96px black).

### Mark + wordmark

Working lock for exploration (still `[OPEN]` on exact geometry):

1. **Mark:** 3-node fork, coal at junction, square grid, upright.
2. **Wordmark:** `scire` in italic or slightly humanist; `Dev` in the grotesk, smaller, tracking +2–4%, no space, capital D only.
3. **Don't** put the mark in a gradient rounded square app-icon unless we are drawing an actual iOS icon. Favicon is the coal-fork at 32px on paper or charcoal, not on orange.

### Components

Cards keep the current grammar: image, author, title, minium rule, category, meta. Corners 4px. Hover may keep grayscale → color.

Buttons: minium fill, paper type, 4px. Ghost: ink hairline. No orange glow on hover; shift to roasted minium.

Rules: 1px ash on paper, 1px white/10 on charcoal. The **minium left-border** on "Popular Articles" is a brand signature. Keep it. It is rubrication.

### Image direction

Allowed:

- Macro coal / cinder on dark grit
- Forked bare branches as **silhouette**, dusk, no leaves required
- Dictionary / woodcut crops, duotone minium + ink
- Real product: Monaco, QCM, a lesson with a 4px well
- Hands writing, soldering, or tending — not portraits smiling at cameras

Banned:

- Unsplash collaboration
- Mesh purple
- Isometric dashboards
- Leafy logo trees
- Flames

### Motion (when we eventually build)

Two energies, not a carnival:

- **Scrubbing text reveal** for *scire.* / infinitive lines
- **Pinned narrative** for the etymology split (one word, two meanings)

No orb drift, no card-tilt, no marquee of fake logos.

---

## Voice

**Personality:** exacting, Latin-literate, craftsman, unimpressed by hype. French/European school energy: *lycée* + *atelier*, not bootcamp.

**Do**

- Short verbs. Name the thing.
- Use *scire* in running text when it earns it, always italic.
- Specifics from the curriculum: "JavaScript before Vue." "Vanilla before abstraction."
- Address *you* as a developer who wants rigor, not as a "learner."

**Do not**

- unleash / elevate / revolutionize / next-gen / seamless / empower
- "We're changing the way you learn to code."
- "Empowering Young Developers"
- "lifelong learners"
- Fake student counts, fake logos, fake 99%

**Working lines** (for comps, not final copy)

- *scire.* To know, as a developer.
- Knowledge is a coal. Tend it.
- The tree is a curriculum. The ember is the node you have not mastered yet.
- Discern. Then build.

---

## How the product wears the metaphor

| Product fact | Brand expression |
|---|---|
| Learning paths with stages ([curriculum.md](./curriculum.md)) | Llull parts: roots → trunk → branches → fruit. Label them. Do not illustrate them as a forest hike |
| Adaptive engine routes to weak skills | The coal sits on the node that still needs heat |
| Exercises: QCM, code, graphical, open | Practice is *usus* beside *scientia* |
| Blog as the original surface | Paper, rubric left-rule, grayscale covers |
| Deployed on Cloudflare | Craft kinship in spacing and orange-as-action. Visual independence in radius, paper warmth, Latin mark |

---

## Anti-patterns (hard)

- Full-dark landing "because Cloudflare"
- Pill CTAs
- Three equal icon-feature cards
- Leafy tree mark
- Flame / spark / starburst mark
- Inter + slate-900
- Purple/blue mesh
- Unsplash people
- Orange used as a background wash
- Gradient text
- `rounded-2xl` / `rounded-3xl` on marketing cards
- Copying the Git logo
- Copying Cloudflare orange `#ff5e1f`
- English-only wordmark that hides *scire*

---

## Open questions

Mark these `[OPEN]` until a human picks.

1. **`[OPEN]` Exact fork geometry.** 3-node Y vs 5-node Llull reduction vs *S* cut by a fork (monogram + meaning). Recommendation: start with 3-node Y + coal; test an *S*-fork only if the Y still feels like Git.
2. **`[OPEN]` Typefaces.** Grotesk shortlist should be licensed and non-default (candidates in spirit: a Kunst-adjacent European grotesk, or a sharp retail grotesk with a true italic). Serif only for Latin citations if the grotesk italic is too weak.
3. **`[OPEN]` How loud is the Latin.** Always-visible *scīre = to know* in the nav vs a dedicated etymology chapter vs a dictionary Easter egg. Recommendation: dedicated chapter on the marketing site, quiet italic in the footer, never a subtitle under the logo on every page.
4. **`[OPEN]` Light-native vs dark-native product UI.** Marketing: paper. Dashboard / exam: charcoal is legitimate (night of study). Do not force one theme everywhere.
5. **`[OPEN]` Existing logo files.** `scire_logo_primary.png` / `scire_logo_secondary.png` are referenced but not in this checkout (likely untracked binaries). Any new mark must be compared against them before they are retired.

---

## v2 comps (exploration, not final)

Six horizontal section frames were generated after this lock, to test whether the vision holds in pictures. Files: [`docs/brand/`](./brand/). They are arguments, not production UI.

| # | Section | What landed | What still drifts |
|---|---|---|---|
| 1 | Hero | Paper tooth, italic *scire.*, coal at a letterpress Y, 4-ish button, no people | Still a left-text / right-image split; button rounder than 4px |
| 2 | Etymology | Strongest frame. Dictionary specimen vs "to split / discern" | Invented lexicon wording; section-sign instead of a pilcrow |
| 3 | Mark | Grid, scale tests, `scire` + `Dev` lockup | Empty circles + coal is still too close to Git; chips too round |
| 4 | Product | Vue lesson + QCM, charcoal as a room, minium left-rule | Corners still ~8–12px; editor chrome generic |
| 5 | Paths | Schematic *arbor scientiae*, not a leafy oak | Latin canopy / JS roots is poetic but inverted vs curriculum stages |
| 6 | CTA | Paper, one line, coal on the junction | Mark stroke kept mutating (letterpress vs brush vs graph) |

Treat these as **arguments**, not as a UI kit. The mark must be drawn once in vector before any implementation.

---

## What this document authorizes

- Brand exploration, mark studies, and marketing comps that obey the locks above.
- Later, a visual implementation pass (tokens, radius, type, landing copy, replacement of Unsplash).

It does **not** authorize application-code changes in this discovery pass.

---

## Sources

Etymology and history

- Lewis & Short, *scīo*: [Perseus](https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.04.0059%3Aentry%3Dscio), [Scaife ATLAS](https://atlas.perseus.tufts.edu/dictionaries/entry/urn:cite2:scaife-viewer:dictionary-entries.atlas_v1:lat.ls.perseus-eng2-n42976/) (root *sci-*; Greek "to split, divide"; "prop. to distinguish, discern")
- Perseus morphology: *scire* = present infinitive active of *sciō*, "to know, understand, perceive, have knowledge of, be skilled in"
- Lewis & Short, *scientia*: [Perseus](https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.04.0059%3Aentry%3Dscientia) (knowledge, skill, expertness)
- Ramon Llull, *Arbor scientiae*: [Wikipedia summary](https://en.wikipedia.org/wiki/Tree_of_Science_(Ramon_Llull)); Lyon 1515 woodcuts via [Getty / HathiTrust](http://hdl.handle.net/2027/gri.ark:/13960/t56f0dm7x) and [Internet Archive](https://archive.org/details/gri_33125008480259)
- Minium / rubrication: [Minium (pigment)](https://en.wikipedia.org/wiki/Minium_(pigment)), [Rubrication](https://en.wikipedia.org/wiki/Rubrication), Fitzwilliam [ILLUMINATED: Minium](https://qi.fitzmuseum.cam.ac.uk/illuminated/lab/overview-of-artists-materials/minium-and-red-lead/type/material)

Craft and identity references

- [Cloudflare marketing](https://www.cloudflare.com/)
- Cloudflare marketing tokens / Kumo notes: [webdesignhot DESIGN.md](https://www.webdesignhot.com/design.md/cloudflare/)
- Git mark origin: [Jason Long on Dribbble](https://dribbble.com/shots/433719-Git-Logo-Concept)
- [KILN on Behance](https://www.behance.net/gallery/244309985/KILN-Contemporary-Ceramic-Studio-Branding)
- [Ember & Tide, Charlotte Chapman Studio](https://charlottechapman.uk/work/ember-tide)
- [Lexicon Symbolorum on Behance](https://www.behance.net/gallery/241119699/Lexicon-Symbolorum)
- [NeuraCloud on Behance](https://www.behance.net/gallery/248638757/NeuraCloud-Brand-Identity-Campaign)
- [ScienceMines on Behance](https://www.behance.net/gallery/251017659/ScienceMines-Visual-Identity-Branding)
- [DARES EdTech on Behance](https://www.behance.net/gallery/241137957/DARES-EdTech-Brand-Identity-System)
- [Insightful on Dribbble](https://dribbble.com/shots/24378925-Insightful-Branding-for-Online-Courses-Platform)
- [FirstMotion, Brandforma](https://brandforma.com/work/firstmotion)
- [Helbers paper edge, Visie](https://visie.io/media/helbers-brand-identity-minimalist-paper-stationery-638690)
- [Substack orange editorial notes, Curio](https://designbycurio.com/learn/substack-orange-newsletter)

In-repo evidence

- Tokens: `apps/web/app/assets/css/main.css`
- Paper + charcoal + minium left-rule: `apps/web/app/components/Hero.vue`
- Grayscale card hover: `apps/web/app/components/article/Card.vue`
- Current generic landing copy: `apps/web/content/index.md`, `apps/web/app/components/content/HeroLanding.vue`, `apps/web/app/components/content/Feature.vue`
- School personality: [curriculum.md](./curriculum.md)
