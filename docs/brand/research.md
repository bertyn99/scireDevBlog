# scireDev visual-identity research

**Prepared:** 25 September 2026  
**Scope:** Primary visual inspiration from Dribbble, Behance, Cloudflare marketing craft, and a small set of adjacent high-craft sites; plus Latin/art-historical sources for *scire*, *scientia*, fire, coal, lamp, and *arbor scientiae*.  
**Constraint observed:** no application code; cards stay 4–6px radius. This is a research brief, not a brand system.

---

## How this was gathered (and what was blocked)

Claims below are followed to the source page that owns them. Live fetches:

- **Cloudflare.com homepage HTML** (25 Sep 2026): title *Cloudflare: Build for the agent era*; preloads `Kunst Grotesk Regular/Medium`; mobile `theme-color` `#ff4801`; dark-mode class + optional `STK Bureau Sans` font override. CSS on `/_astro/index.CN3UJUeJ.css` includes `border-radius:.25rem` (4px at 16px root) and `border-radius:1rem`. Source: https://www.cloudflare.com/
- **Dribbble** currently returns AWS WAF challenge (`x-amzn-waf-action: challenge`) to this environment, so Dribbble observations come from indexed shot pages (title, designer, palette hexes, designer copy) plus the Internet Archive capture of Jason Long’s Git logo shot. Official Git logo files were confirmed on git-scm.com.
- **Behance** project pages often ship as JS/JSON shells; project titles, owners, and case-study prose were taken from Behance’s own gallery pages and, where available, the studio’s first-party case study (Graphéine).
- Secondary DESIGN.md reverse-engineering of Cloudflare (shadcn.io, webdesignhot) is cited only as *measurement commentary*, never as Cloudflare’s own voice.

---

## 1. Cloudflare.com — what is actually distinctive vs what AI copies badly

### Source pages

- Live marketing homepage: https://www.cloudflare.com/
- 2016 rebrand (first-party): https://blog.cloudflare.com/time-for-an-update/
- Product color system (first-party): https://blog.cloudflare.com/thinking-about-color
- Dark-mode / design-system note (first-party): https://blog.cloudflare.com/dark-mode/
- Token reverse-engineering from live CSS (not Cloudflare-authored): https://www.shadcn.io/design/cloudflare and https://www.webdesignhot.com/design.md/cloudflare/
- Older marketing-site audit (white Inter era, useful as a *before*): https://design.withfudge.com/share/cloudflare.com-design

### What the live site actually does (25 Sep 2026)

1. **Type is the brand, not Inter-on-a-dark-hero.** The homepage preloads self-hosted **Kunst Grotesk** (`/fonts/Kunst%20Grotesk%20Regular.woff2`, `Medium`). Independent CSS inspection lists **FT Kunst Grotesk** for display/body and **Apercu Mono Pro** for labels/code (https://getfontinfo.com/font/cloudflare-com; https://www.shadcn.io/design/cloudflare). Headlines sit around **weight 500, not 700/800** — editorial restraint, not SaaS shouting (https://www.shadcn.io/design/cloudflare).
2. **Orange is voltage, not a glow.** Live mobile theme-color is `#ff4801`. Reverse-engineered Kumo brand orange is `#ff5e1f`. Cloudflare’s 2016 rebrand kept “Cloudflare orange and yellow” and a flare in the logo, explicitly to stay recognizable while simplifying reproduction (https://blog.cloudflare.com/time-for-an-update/). The current hero move, per live-token analysis, is to **give orange the entire above-fold canvas** (or invert to a `#262626` band) rather than sprinkle it as a CTA chip (https://www.shadcn.io/design/cloudflare; https://www.webdesignhot.com/design.md/cloudflare/).
3. **White is warm cream, not `#FFFFFF` ice.** shadcn.io’s capture of live tokens: cream `#fffbf5` for off-white surfaces and cream-on-orange type; ink `#262626`; hairline `#f0f0f0` (https://www.shadcn.io/design/cloudflare). This is the same charcoal as scireDev’s existing `#262626` token — coincidental overlap that makes cloning Cloudflare *more* dangerous, not easier.
4. **Radius is binary, not “soft SaaS.”** Live CSS includes `.25rem` (4px) and `1rem`. Token analysis: **3–6px on cards/chips/inputs; 8px on larger cards; pills (9999) only on CTAs and category tabs**. No 12/16/20px card ladder (https://www.shadcn.io/design/cloudflare). This matches the founder’s 4–6px card constraint.
5. **Composition is editorial sentence + product evidence, not “3 feature cards.”** The homepage title is a single claim (*Build for the agent era*). Product domains get their *own* hues (Compute blue `#0a95ff`, Storage pink `#ee0ddb`, AI green `#00bd7d`, SASE teal `#0d9488`) so the brand orange stays singular (https://www.shadcn.io/design/cloudflare). 2016 rebrand copy: diagrams needed a palette that could show *nuance and movement*, not just bold geometry (https://blog.cloudflare.com/time-for-an-update/).
6. **Motion implication is functional, not decorative.** Accordion plus/minus, color-shift hovers, `prefers-color-scheme` dark class, optional font A/B (`kunst` vs `stk`). No hero-orb, no particle field, no orange Gaussian glow behind a logomark.

### What AI comps copy badly (the “0 soul” kit)

- Dark navy/charcoal hero + radial orange glow + three rounded feature cards + Inter/Geist + “ember” gradient on a abstract tree.
- Treating orange as *atmosphere* (glows, meshes, glass) instead of *voltage* (canvas, CTA, one sentence).
- Copying Cloudflare’s **charcoal `#262626` + orange** pair without Cloudflare’s **custom grotesque at weight 500**, cream-not-white, hairline rules, and product-evidence diagrams.
- Pill-ifying *cards* because Cloudflare pill-ifies *buttons*. Cloudflare’s cards stay tight-radius; pills are the action glyph.

### Steal as craft vs do not copy

| Steal | Do not copy |
|---|---|
| One accent does all interactive work; everything else is ink/cream/hairline | The Cloudflare logo, Kumo orange `#ff5e1f`, Kunst Grotesk, Apercu Mono |
| Display at medium weight with negative tracking | Full-bleed orange hero as a default (that move is *their* voltage-as-canvas) |
| 4px cards, pill only on CTA | Dark-glow SaaS template that people *think* is Cloudflare |
| Diagrams that explain a system, not decorate it | Three-up icon cards as the homepage idea |
| Charcoal `#262626` as *ink*, not as “dark mode skin” | Using the same charcoal+orange pair as a Cloudflare tribute |

scireDev already owns charcoal `#262626`, light `#d9d9d9`, ember `#F23005` / `#d93d1a`. **The ownable move is to make ember a tended coal (low, hot, banked), not Cloudflare’s high-chroma infrastructure orange.** `#F23005` is more vermillion / iron-oxide than Kumo’s `#ff5e1f`. Lean into that difference.

---

## 2. Visual references

Each entry: title, author, URL, 3–6 observations, steal vs don’t-copy.

---

### R1. Git Logo Concept — Jason Long (official Git mark)

**URLs**

- Dribbble (indexed; live WAF-blocked here): https://dribbble.com/shots/433719-Git-Logo-Concept  
- Archive: https://web.archive.org/web/2020/https://dribbble.com/shots/433719-Git-Logo-Concept  
- Official logo pack + license: https://git-scm.com/downloads/logos  

**Designer:** Jason Long. Logo pack by Matt Graham. Licensed CC BY 3.0.

**Palette on the shot:** `#3288C4` `#F4F6F6` `#F44F32` `#6FB2DE` `#463D37` `#B4BBC7` `#ED6C56`

**Observations**

1. The mark is **branching on a 5×5 coin grid**, not a botanical tree. Long: “If you’re familiar with Git, you’ll recognize that the concept is based on branching. I started with making grids out of coins until I decided that 5×5 worked the best.”
2. Geometry is **nodes + edges + one merge**, read at 16px. No leaves, no bark, no flame.
3. Orange (`#F44F32` / `#ED6C56`) is the *figure*; cool blue and paper are support. Orange = the graph, not a glow behind it.
4. Dark chocolate `#463D37` grounds it without going pure black.
5. The official site ships **full-color, orange-only, one-color light, one-color dark** — a real system, not a single pretty PNG.

**Steal:** construction discipline (grid, nodes, fork-as-knowledge). The idea that a developer education mark can be a *graph you can draw with coins*.  
**Do not copy:** the Git rhombus, Git orange, or any “we’re like git” lockup. Git already owns “branching orange diamond.” scireDev’s tree must not collapse into Git’s logo.

---

### R2. Université Paris 1 Panthéon-Sorbonne — Graphéine (2024)

**URLs**

- Studio case study: https://grapheine.com/en/portfolio/universite-paris-1-pantheon-sorbonne-visual-identity/  
- Behance: https://www.behance.net/gallery/213409955/Universit-Paris-1-Panthon-Sorbonne-Visual-Identity  

**Studio:** Graphéine (Paris). Client: Université Paris 1 Panthéon-Sorbonne.

**Observations**

1. Brief is **heritage + revolutionary spirit in one mark**, not “modern edtech.” Graphéine says the university “combines a classical, conservative past with an innovative, revolutionary spirit.”
2. They **redraw the wordmark letter-by-letter and rebuild ligatures** so the academic style survives at small sizes. Soul lives in the *drawing of letters*, not in a stock serif overlay.
3. Emblem is a **change of perspective on the Sorbonne chapel bell tower** — still the building, now reproducible. Cultural specificity = a real place, not a Latin word in Trajan.
4. Gold is “sunnier” for print; blue is shifted to uncouple from Sorbonne Université. Secondary palette is allowed to be lively *around* a severe core.
5. System has **three layout principles**: daily (solids + wordmark watermarks), collaborative (simplified), event (emblem becomes a *window* for images/textures).
6. Type pairing: custom wordmark alphabet + Joshua Darden’s **Freight** family for signage range.

**Steal:** Latin/scholarly + living institution without costume-drama. Custom lettering. Emblem as window, not as app icon. A severe core with a lively secondary.  
**Do not copy:** gold/blue university livery, chapel silhouette, Freight, or “another Sorbonne.” scireDev is not a university; do not put a seal, Latin motto ribbon, or crest around the ember.

---

### R3. Bibliothèque Cujas — Graphéine (2022)

**URL:** https://grapheine.com/portfolio/bibliotheque-cujas-identite-visuelle/  

**Studio:** Graphéine. Client: Bibliothèque Cujas, “temple de la connaissance juridique” (Latin Quarter, Paris; origins 1475).

**Observations**

1. They name the place a **temple of knowledge** and then refuse a generic lamp/owl. The sigle fuses **palace of justice + row of books + the actual reading-room glass vault**.
2. Previous logo (hand-lettered, mandated at 45°) was “soulful” but unusable. The new mark is **more functional and more specific**.
3. Composition system: **color blocks as stacks of books**. Modularity comes from the metaphor, not from a 4-card grid.
4. Photography of real books can be slotted between the color “volumes.” Image treatment is bibliographic, not stock-education.

**Steal:** one mark that is simultaneously building, medium, and mission. A layout system that *is* the metaphor (stacked volumes).  
**Do not copy:** law-library iconography, vault glass, or “temple” as a literal building mark. scireDev’s temple is a tended fire + a branching graph, not architecture.

---

### R4. France Universités — Graphéine (2022)

**URL:** https://grapheine.com/portfolio/france-universites-naming-et-identite-visuelle/  

**Studio:** Graphéine. Client: formerly CPU (Conférence des Présidents d’Universités).

**Observations**

1. Naming: **CPU → France Universités** because the acronym felt administrative and untranslatable. Plural *Universités* signals a federation, not one campus.
2. Mark: letter **F as French territory + amphitheatre benches**. One glyph holds geography and pedagogy.
3. Color: **institutional red with “panache,”** a rupture from previous blue. Red here is civic/academic energy, not startup orange.
4. They kept the *impact* of the old acronym block while changing the story. Continuity of force, not continuity of shape.

**Steal:** one letterform that contains a cultural scene (amphitheatre). Red/vermillion as *civic heat* rather than SaaS CTA. Naming that a human can say.  
**Do not copy:** the F-monogram, tricolor politics, or “France” as scireDev’s cultural loan. scireDev’s Latin is *scire*, not *université*.

---

### R5. L’Arbre Corail — identity / édition (Behance)

**URL:** https://www.behance.net/gallery/202948255/RSE-Larbre-Corail-Identity-Edition  

**Observations (from the Behance case text)**

1. The name is already a fused organism: **tree + coral**. The mark is “an arbre aux allures de corail, de cellule, de cerveau” — plant, marine, cellular, neural at once.
2. It is positioned as **guide / compass / network**, not as a cute tree. “Il symbolise les synergies à activer.”
3. Organic silhouette against what reads as a **serious identity/édition** system (print, not landing-page mockups).
4. Soul is **biological interconnection**, close to a knowledge graph, far from a Git branching diagram *or* a clip-art oak.

**Steal:** a tree that is also a network/brain. Refuse the botanical oak. Let the mark be slightly uncanny.  
**Do not copy:** coral texture, CSR/RSE positioning, or a literal “arbre corail” silhouette. scireDev’s fusion is **coal + fork + arbor scientiae**, not reef ecology.

---

### R6. Studio Pop — Deconstruction (Behance)

**URL:** https://www.behance.net/gallery/167191985/Studio-Pop-Deconstruction  

**Client:** Pop, arts-and-design school that began as a bookstore. Metaphor: drawing as a thinking tool; “under construction / deconstruction.”

**Observations**

1. Education identity built from **construction-site objects** (blocks, bars, balls) that recombine — learning as making, not as a diploma seal.
2. **Orange is retained as the original school color**, framed as continuity, not a rebrand rupture.
3. Graphic language is “simplification of the logo… always creating something new.” The system *generates*, it does not just decorate.
4. Sensory / 3D / experimental production — the identity is meant to be **handled**, not only screenshotted.
5. Cultural specificity: a real bookstore→school lineage, drawing as epistemology.

**Steal:** orange as inherited coal (tend it, don’t replace it). A generative kit of bars/nodes that can become curriculum diagrams, exercise widgets, path trees.  
**Do not copy:** playground construction-ball logo, or “school of creativity” playfulness that would infantalize developer education.

---

### R7. Tree by Tree — Nick Liefhebber for Lama Lama (Behance)

**URL:** https://www.behance.net/gallery/158783059/Tree-by-Tree  
**Designer:** Nick Liefhebber, Utrecht. Agency: Lama Lama. Client: Dutch social enterprise (reforestation via corporate gifting / Justdiggit).

**Observations**

1. Not a single tree logo: **a set of chunky, wavy, organic shapes and patterns** “inspired by trees and growth… both expressive and subdued.”
2. European studio craft: illustration as the identity, not a geometric app icon.
3. Pattern language can go quiet (letterhead) or loud (campaign).
4. Growth is **many small plantings**, which maps better to a curriculum of exercises than to one hero oak.

**Steal:** a family of branch/leaf/fork units that can tile, rather than one sacred logomark. Dual register (quiet/loud).  
**Do not copy:** green eco-palette, reforestation story, or wavy “friendly NGO” lettering. scireDev is charcoal + vermillion, not sustainability green.

---

### R8. ULAR® — Brand Identity — Katya Neray (Dribbble)

**URL:** https://dribbble.com/shots/27309816-ULAR-Brand-Identity  

**Observations (from the shot’s own copy)**

1. Built on **one metaphor: “Dirt as Origin.”** Everything — mark, pattern, motion, photo — answers that sentence. That is why it has soul; generic orange/black moto brands do not.
2. Mark from **mountain-bird wings**; pattern from a **dirt trail**. Texture is earned by the metaphor.
3. Palette reduced to **black + red**; photography strictly B/W. Color is tension, not decoration.
4. Type: “bold grotesque — heavy, confident, unapologetic.”
5. Motion is **grain, distortion, rough cuts** — aged, not easing-bezier SaaS.
6. “ULAR feels like it was never designed in a studio — it feels like it was built outside.”

**Steal:** one-metaphor discipline. B/W image + one hot accent. Texture as evidence of tending (ash, coal dust, paper grain), not as a trendy overlay.  
**Do not copy:** motorcycle grunge, wing mark, or abrasion-for-its-own-sake. scireDev should feel **tended**, not wrecked. An ember is careful; dirt-bike red is reckless.

---

### R9. Designership Logo Design — Dmitry Lepisov / Lepisov Branding (Dribbble)

**URL:** https://dribbble.com/shots/21708884-Designership-Logo-Design  

**Client:** online education platform for designers.

**Observations (from the shot’s own copy)**

1. Brief: “minimalistic and serious looking yet emotional” — the exact tension scireDev needs.
2. **Symbol went through a thorough gridding process.** Ownability starts in construction, not in Midjourney silhouette.
3. Wordmark is **custom, Helvetica-inspired** — designers’ love language — then *broken* by an asymmetric sign that needs explicit alignment rules.
4. Brand assets include a **star-as-page-curl** (curiosity) and a **diploma** (ritual). Education identities need ceremonies, not only UI kits.
5. Aimed at students without looking like “EdTech purple/teal.”

**Steal:** grid-built mark + custom wordmark + alignment rules for an asymmetric sign. Ritual objects (completion, cohort, path).  
**Do not copy:** the star/page-curl, diploma ornament, or Helvetica-clone wordmark. scireDev’s ritual is the **tended coal / passed lamp**, not a certificate flourish.

---

### R10. Windows Developer brand identity — Microsoft Design (Dribbble)

**URL:** https://dribbble.com/shots/21542000-Windows-Developer-brand-identity  

**Studio:** Microsoft Design, premiered at Microsoft Build.

**Observations (from the shot’s own copy)**

1. Hero image **nods to previous Windows wallpaper generations** — memory, not a clean-slate rebrand.
2. They **expanded a cool palette with warm complementary tones** specifically for developers.
3. **Coding-inspired textures** for depth (not abstract 3D blobs).
4. Applied across Build, the Windows developer website, and Dev Home — one identity, many temperatures of surface.
5. This is a *developer culture* identity sitting on top of a product OS, which is closer to scireDev than a generic LMS.

**Steal:** warm complement inside a cool/dark system; texture that comes from the craft (code, diff, graph) rather than from stock “tech particles.” Generational nod (ember that has been tended).  
**Do not copy:** Windows blooms, Fluent acrylic, Microsoft blue, or conference-keynote maximalism.

---

### R11. Dutch national police identity — Joost Roozekrans at Studio Dumbar (Behance)

**URL:** https://www.behance.net/gallery/2019053/Dutch-national-police-force  

**Designer:** Joost Roozekrans, senior designer at Studio Dumbar, 1992–1993. Voted among 25 Dutch Design icons (2006, public vote) per the Behance text.

**Observations (from the Behance case text)**

1. Flame is a **beacon / protective flame**, combined with a **law-book-like form** and the word *politie*. Fire here is civic duty, not startup energy.
2. **Orange + blue striping** is a visibility system for cars, boats, helicopters — the identity works at 100km/h, not only on a Dribbble 800px shot.
3. European (Dutch) orange is a **cultural color** (identity, flag, safety), which is why it doesn’t feel like “SaaS orange.”
4. Geometry is blunt, almost heraldic, with no glow.

**Steal:** fire as *beacon you tend for others*; orange as cultural signal; a mark that must work in brutal real-world reproduction.  
**Do not copy:** police flame, Dutch orange-blue livery, or any “authority crest.” scireDev’s fire is pedagogical (Promethean / banked coal), not protective-state.

---

### R12. Linear Brand Guidelines — Linear (adjacent high-craft, as a foil)

**URL:** https://linear.app/brand  

**Observations**

1. “Provide plenty of space around Linear assets… They shouldn’t feel cramped or cluttered.”
2. **Monochrome wordmark preferred**; brand color is a *desaturated blue reserved for backgrounds*, not sprayed on UI.
3. Colors named like materials: **Mercury White `#F4F5F8`, Nordic Gray `#222326`.**
4. Icon may take a corner radius when used as a “chip”; wordmark does the talking.

**Steal:** named neutrals; accent used as a rare material; air around the mark.  
**Do not copy:** Linear’s blue, the chevron mark, or the “issue-tracker calm” personality. Linear is *cool control*. scireDev is *warm tending*. If scireDev looks like Linear-but-orange, it will still have 0 soul.

---

### Additional useful (not top-12, still follow-the-source)

**Hyphen Brand ID — Education Platform — Josh Warren**  
https://dribbble.com/shots/20136251-Hyphen-Brand-ID-Education-Platform  
Skill-development platform for junior talent. Useful as a *category* check: most “education platform” Dribbble IDs are friendly sans + geometric monogram. Treat as the generic field scireDev must not join.

**Jolly Loggers Tree Service — Jordan McInnis**  
https://dribbble.com/shots/14804950-Jolly-Loggers-Tree-Service-Branding  
Palette: `#D61701` `#0F0E0D` `#E3D9D3` `#64483E` `#A39D99` — charcoal + vermillion + dusty paper. Steal the *temperature* of red-on-near-black and the paper off-white. Do not steal skulls, loggers, or novelty illustration.

**Rooted Craft Kitchen — Wells Collins / Two Bridges**  
https://dribbble.com/shots/13660506-Rooted-Craft-Kitchen-Brand-System  
Twisted tree “entirely formed from its roots,” planted in a community. Steal: tree as *social structure*, roots as the real subject. Do not steal fairytale kitchen warmth or Boulder-craft beige (`#020404` `#374448` `#A7B7C9`).

**CyberSabra — Visual Identity (Behance)**  
https://www.behance.net/gallery/229491335/CyberSabra-Visual-Identity  
Dark tones, red/orange accents, custom type mixing straight and curved edges, asterisk-as-connectivity, “cyber-minimalist.” Steal: geometric asterisk/node as connectivity. Do not copy: cybersecurity urgency, asterisk-as-logo (already crowded), or “futuristic photo” stock.

**ScienceMines — Visual Identity (Behance)**  
https://www.behance.net/gallery/251017659/ScienceMines-Visual-Identity-Branding  
“Bold orange and black… dynamic logomark… playful yet professional… stickers.” Use as a **negative reference**: this is the orange+black edtech default. Energy + curiosity without culture. scireDev should look unlike this.

**IBM Cloud “Altitude” — Form& with IBM Brand Experience (Behance)**  
https://www.behance.net/gallery/84416937/IBM-Cloud  
Pattern library of interaction modes rather than a static logo world. Steal: brand as a *system of relations*. Do not copy: IBM blue, cloud-altitude metaphor, or enterprise pattern-theatre.

**Amsterdam University of the Arts — Expanded Contemporary Dance — What The Studio**  
https://www.behance.net/gallery/83359799/Amsterdam-University-of-the-Arts-Expanded-Contemporar  
Shifting grid, pattern, and word-play rooted in the programme’s vocabulary. Steal: identity generated from the school’s *language*, not from a clip-art subject. Do not copy: dance-programme eccentricity.

---

## 3. Latin *scire* / *scientia* — etymology (primary dictionaries)

### Lewis & Short, *A Latin Dictionary* (Oxford, Clarendon Press, 1879)

- **scio, scīre:** “to know, in the widest signif. of the word; to understand; perceive; to have knowledge of or skill in any thing.” Root note: “root sci-; Gr. κείω (for σκείω), κεάζω, to split, divide; cf. scisco, plebiscitum, etc., **prop. to distinguish, discern.**”  
  https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.04.0059%3Aentry%3Dscio  
  Mirror: https://atlas.perseus.tufts.edu/dictionaries/entry/urn:cite2:scaife-viewer:dictionary-entries.atlas_v1:lat.ls.perseus-eng2-n42976/
- **scientia:** knowledge, a knowing, expertness; also skill in a domain (*scientia juris*, *scientia linguae Gallicae*, etc.).  
  https://atlas.perseus.tufts.edu/dictionaries/entry/urn:cite2:scaife-viewer:dictionary-entries.atlas_v1:lat.ls.perseus-eng2-n42959/

Cicero’s line in the same tradition: *ars earum rerum est, quae sciuntur* — “art is of those things which are known” (*De Oratore* 2.7.30, quoted in Lewis & Short s.v. *scio*). Knowing is not a vibe; it is a **craft of distinctions**.

### Online Etymology Dictionary (Douglas Harper)

- English *science* < OF *science* < Latin *scientia* < *sciens*, participle of *scire* “to know.”  
- “The original notion in the Latin verb probably is **‘to separate one thing from another, to distinguish,’ or else ‘to incise.’** Related to *scindere* ‘to cut, divide’ from PIE *skei- ‘to cut, split.’”  
  https://www.etymonline.com/word/science  
- PIE *skei- “to cut, split,” source also of Greek *skhizein* “to split, cleave,” Latin *scindere*, English *schism*, *conscience* (*con- + scire*, “knowing-with”).  
  https://www.etymonline.com/word/*skei-

### Alternative scholarly etymology (do not hide the dispute)

Michael Weiss / Glotta 88 (2012): *Lateinisch scīre und Verwandtes* argues the cut/split derivation has formal problems and proposes instead a y-present to *(s)keuh₁- “to look, perceive”* (cf. Latin *cavēre*, OHG *scouwōn*), the common metaphor **knowing ← seeing**. Same root possibly in *obscūrus* “dark, hard to see.”  
https://www.vr-elibrary.de/doi/10.13109/glot.2012.88.1-4.253

**Brand implication:** both live etymologies are visually rich, and they are *not* “tree + fire.”

| Etymology | Visual consequence for scireDev |
|---|---|
| *skei-* cut / split / distinguish | Fork, schism, incision, git branch, taxonomy, the moment a concept splits into two |
| *(s)keuh₁-* look / perceive | Lamp, coal-glow, *obscurus* vs illumination, tending a light so that seeing becomes possible |

The Ember Tree is a **later poetic fusion**. The Latin name itself wants **discernment** (a cut) and/or **seeing** (a light). A clip-art tree with a flame glued on satisfies neither.

---

## 4. Knowledge as tree — *arbor scientiae*, Porphyry, Jesse

### Ramon Llull, *Arbor scientiae* (Rome, 1295–96)

- Encyclopedic “Tree of Science”: **sixteen trees**, each divided into roots, trunk, branches, twigs, leaves, flowers, fruit. Roots = general principles of the Art (goodness, greatness, duration, power, wisdom, will, virtue, truth, glory, difference, concordance, contrariety, beginning, middle, end, majority, equality, minority).  
  https://en.wikipedia.org/wiki/Tree_of_Science_(Ramon_Llull)
- History of Information (Jeremy Norman), citing Manuel Lima, *Visual Complexity* (2011): the opening tree is an “arborescent table of contents” with **eighteen roots** and **sixteen labelled branches/fruits**. First printed woodcut editions appear in the sixteenth century (Lyon).  
  https://www.historyofinformation.com/detail.php?id=3407
- Wellcome Collection, Lyon 1515 edition: woodcuts throughout.  
  https://wellcomecollection.org/works/rpkh3mfs
- Getty / Internet Archive copy of the 1515 Lyon *Arbor scientiae*: “The analysis of human knowledge in terms of the parts of a tree is illustrated by **18 woodcuts** that depict Llull and a monk in conversation beneath a tree whose roots and branches are labelled in letterpress with the names of intellectual categories.” Five blocks reused; one version has Christ gathering pomegranate-like fruit labelled *Poena*.  
  https://archive.org/details/gri_33125008480259
- Art-historical paper: Lola Badia / *Imago* — Llull’s tree is a complex **ekphrasis** he did **not** originally illustrate; later graphic trees often fail because he conceived the tree as **multidimensional**.  
  https://doi.org/10.7203/imago.8.9153

**Steal:** a tree as a *labelled knowledge engine* (roots = principles, fruit = results), conversation under the tree (master/student), letterpress labels on branches. Multidimensionality — not a flat oak icon.  
**Do not copy:** Christ-at-the-crown woodcuts, pomegranate *Poena*, or a 16-tree encyclopedia diagram as a logo.

### Porphyrian tree / *arbor porphyriana*

- Porphyry, *Isagoge* (~270 CE), via Boethius: scale of being by dichotomous division (substance → corporeal/incorporeal → … → mortal/immortal). Porphyry himself did not draw the tree; medieval logicians did. Named *Arbor Porphyrii* in Peter of Spain’s *Summulae Logicales*.  
  https://en.wikipedia.org/wiki/Porphyrian_tree  
  https://www.historyofinformation.com/detail.php?entryid=3857
- Lima via History of Information: “the earliest metaphorical tree of knowledge”; three columns, central trunk of dichotomies.  
  https://www.historyofinformation.com/detail.php?entryid=3857
- Jean-Baptiste Piggin: safest to credit **Boethius (~520)** as draughtsman of the stemma; later illustrators grew foliage around a logical bracket.  
  https://piggin.net/plold/arborPorpyhriana.htm
- Uwe Wolfradt / Claudio Gnoli, “Images of Thought… The Tree and the Net,” *Knowledge Organization* 40 (2013): the tree vs the net as two paradigms of knowledge order; Porphyry’s tree historically tied to “strong” essentialist epistemologies.  
  https://doi.org/10.5771/0943-7444-2013-6-366

**Steal:** dichotomy as pedagogy (each lesson splits a distinction — literally *scire*). A trunk of decisions, not a bush of vibes. The *net* as the modern complement (knowledge graph, git, skills map).  
**Do not copy:** a literal medieval bracket-tree as the app icon. That reads as philosophy-department clip art.

### Tree of Jesse (genealogy as living trunk)

- Musée de Cluny, 13th-c. Île-de-France glass: Isaiah 11:1 “a rod out of the stem of Jesse… a Branch shall grow out of his roots.” Christ and Virgin in **red mandorlas**; seven doves = gifts including **wisdom, understanding, knowledge**. First monumental use: Saint-Denis, 1140.  
  https://www.musee-moyenage.fr/en/building-collections/the-collection-database/tree-of-jesse
- The Met, Swabian window 1280–1300: Jesse asleep, tree rising “like a dream from his side,” prophets with scrolls, trunk merging into the wood of the cross.  
  https://www.metmuseum.org/art/collection/search/466377
- Semi-scholarly design history: Kress / Kress, “Fitting issues… family tree diagrams,” *Sign Systems Studies* 42 (2014): Jesse as the visual model that taught Europe to put **time on a trunk** (ancestors below, later above).  
  https://doi.org/10.12697/sss.2014.42.2-3.05

**Steal:** lineage as a *living trunk* (curriculum as descent, not as a grid of courses). Sleeping root → rising branch. Red as sacred field (mandorla), not as CTA.  
**Do not copy:** Christian genealogy, doves, mandorlas, or stained-glass pastiche. scireDev is secular developer education; borrow the *structure of descent*, not the iconography of Christ.

---

## 5. Knowledge as fire, coal, lamp, torch

### Prometheus — fire as the arts

- Aeschylus, *Prometheus Bound* (Johnston trans.): Prometheus “searched out and stole the source of fire concealed in **fennel stalks**, and that **taught men the use of all the arts**.” Fire is not mood lighting; it is the *condition of technē*.  
  https://web.viu.ca/johnstoi/aeschylus/prometheusbound.htm
- Plato, *Protagoras* (via Rutherford Journal discussion): Prometheus gives survival crafts; Zeus must still give civic virtue. Technical fire is not enough for a polity.  
  https://rutherfordjournal.org/article050102.html
- Renaissance art history: Florentine humanists (Boccaccio, Ficino) emphasize **transfer of divine fire as sacred knowledge**, not the punishment. Filippino Lippi drawing (Uffizi); Piero di Cosimo panels.  
  https://publ.actual-art.org/aptha/en/article/view/11072  
  PDF: https://actual-art.org/files/sb/14/Lopukhova.pdf
- Oxford Cabinet: Studiolo of Francesco I, Palazzo Vecchio — Prometheus with the fire-stalk, civilizing hero, crafts, Art helping Nature.  
  https://www.cabinet.ox.ac.uk/studiolo-francesco-i-prometheus-and-nature

**Steal:** fire hidden in a stalk (small, carried, tended) that *unlocks crafts*. Developer education is Promethean in the technical sense: we hand people fire (tools) knowing it is dangerous.  
**Do not copy:** Titan-on-a-rock, liver-eagle, or “stealing fire” rebel-startup posture. scireDev is a *school of tending*, not a theft brand.

### Plato’s cave — fire as the wrong light

- Plato, *Republic* 7 (Perseus, Shorey): prisoners see only **shadows cast from the fire**; education is a painful turning toward the sun. The cave fire is *opinion*, not knowledge.  
  http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0168%3Abook%3D7

**Steal (carefully):** a dim coal can still be a false light. Pedagogy = turning, not decorating the cave with more orange glow. AI comps that fill a dark hero with orange bloom are literally *cave-fire aesthetics*.

### Lucretius — the lamp passed like a relay

- Lucretius, *De rerum natura* 2.62–79 (Leonard trans., Perseus): “The nations wax, the nations wane away; In a brief space the generations pass, **And like to runners hand the lamp of life One unto other.**” Latin: *et quasi cursores vitai lampada tradunt*.  
  https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0131%3Abook%3D2%3Acard%3D62
- Los Angeles Public Library, Goodhue Building: Hartley Burr Alexander’s program *Light of Learning* quotes this line on the Flower Street facade. Alexander: “Knowledge is imagined as a lamp, wisdom as a guiding star, and the conscious tradition of mankind as a torch passed from generation to generation.” Also Psalm 119:105 *lucerna pedibus meis*.  
  https://www.lapl.org/branches/central-library/art-architecture/iconography  
  https://www.lapl.org/news-stories/articles/long-lost-lucretius-poem-still-resonates

**Steal:** education as **handing a lamp**, not as a burning bush. The coal/ember metaphor is the *banked* form of this lamp — kept alive between runners.  
**Do not copy:** LAPL’s Beaux-Arts sculpture program, torch-in-hand cliché, or *vitai lampada tradunt* as a motto lockup (already used by schools).

### Coal / banked fire (why “ember” is the right temperature)

There is no respectable etymological link from *scire* to coal. The ember is a **chosen metaphor**, and it is stronger if it stays close to real firecraft:

- A **coal** is what you *keep* under ash so the fire can be woken tomorrow. That is pedagogy (spaced practice, mastery, cohort).
- An **ember** is low, concentrated, dangerous to the touch, almost not decorative. Vermillion `#F23005` reads as iron/heat; Cloudflare `#ff5e1f` reads as signal orange. Keep the difference.
- A **lamp** is the portable, civic form (Lucretius, libraries).
- A **tree** is the classificatory / genealogical form (Porphyry, Llull, Jesse, git).

Fusing them into “a tree on fire” is the generic move. The ownable fusion is **a graph you tend like a coal**: nodes as coals, edges as branches, the whole thing banked in charcoal.

---

## 6. Palette / type / radius notes against scireDev tokens

Existing tokens: charcoal `#262626`, light `#d9d9d9`, ember `#F23005` / `#d93d1a`.

| Token | Near-matches in this research | Ownable shift |
|---|---|---|
| `#262626` | Cloudflare ink / hero band; Linear Nordic Gray `#222326`; Jolly Loggers `#0F0E0D` | Keep as *ink and ash*, not as “dark mode background with glow” |
| `#d9d9d9` | Cooler/lighter than Cloudflare cream `#fffbf5` and Linear Mercury `#F4F5F8` | Could warm slightly toward ash-paper, or keep as steel/ember-ash (cooler = more “coal,” warmer = more “library”) |
| `#F23005` | Hotter, redder than Git `#F44F32` and Cloudflare `#ff5e1f` / `#ff4801`; close to Jolly `#D61701` and France Universités red | Treat as **iron oxide / live coal**, never as Cloudflare tribute orange |
| Radius 4–6px | Cloudflare cards 3–6px; founder constraint | Do not pill the cards. Pill, if anywhere, only a single CTA |

Type direction implied by the best references (not a recommendation of a specific licensed face): a **grotesque at weight 500** for interface (Cloudflare craft, not Cloudflare’s font); a **scholarly display** with actual drawing (Graphéine custom lettering, not Trajan/Cinzel Latin cosplay); a **mono** only for code/meta (Cloudflare Apercu Mono role — steal the *role*, not the face).

---

## 7. Soul diagnosis

### Why generic ember-tree SaaS comps fail

They illustrate the *words* “ember” and “tree” the way a slide deck illustrates “synergy”: a dark rectangle, a radial orange glow, a geometric sapling or git-rhombus, three cards, Inter. That picture has no **culture** and no **work**.

It fails for five specific reasons, each grounded in the sources above:

1. **It copies the Cloudflare costume, not the Cloudflare craft.** The costume is dark + orange. The craft is a custom grotesque at weight 500, cream not ice-white, 4px cards, orange as voltage or as a single sentence, diagrams that explain systems. AI comps take the costume and add a glow Cloudflare themselves do not use.
2. **It treats the tree as botany and the ember as a gradient.** Llull’s tree is a labelled engine of principles; Porphyry’s is a dichotomous argument; Jesse’s is a sleeping body that dreams a lineage; Git’s is a 5×5 node graph. None of them are a cute oak with a flame. A logo that is “tree + fire overlay” is a mixed metaphor with no grammar.
3. **It ignores what *scire* actually means.** Lewis & Short / Etymonline: to **distinguish, split, discern** (or, in the rival etymology, to **see**). The brand name wants a cut or a lamp, not a campfire. Generic comps never show a *distinction* — the visual equivalent of a lesson that actually teaches.
4. **It uses cave-fire instead of a tended coal.** Plato’s cave fire is the light that *keeps you trapped*. Orange bloom on a dark hero is cave-fire. Promethean fire is small, stolen in a fennel stalk, and it teaches *arts*. Lucretius’s lamp is passed hand to hand. Library architecture banks that metaphor in stone. A coal under ash is the developer-education version: mastery you keep alive.
5. **It has no place, no language, no ritual.** Graphéine’s strongest education work is specific: a chapel tower, a reading-room vault, amphitheatre benches, a Latin-Quarter library. ULAR has dirt. Studio Pop has a bookstore. Microsoft’s Windows Developer has wallpaper memory. Generic ember-tree has **nowhere**. Latin *scire* is then just exotic seasoning on a US SaaS layout.

### Visual / cultural ingredients that would actually feel like scireDev

1. **A mark that is a graph of coals**, not a tree on fire. Nodes you can count (Jason Long’s coins). Edges that fork because *scire* is splitting. One node hotter than the others — the coal being tended *now* (the lesson you’re in).
2. **Vermillion as iron, not as Cloudflare.** `#F23005` should look like heated metal / live coal against ash `#262626` and bone/ash `#d9d9d9`. No orange Gaussian. No mesh gradient. Maybe a single physical reference: iron oxide, letterpress red, mandorla red, Dutch beacon orange — then immediately leave those sources behind.
3. **Scholarly construction + developer construction in the same drawing.** Letterpress labels on branches (Llull woodcuts) *and* git-like nodes (Jason Long). The fusion is the soul: **arbor scientiae × version control**, which is exactly “platform for the knowledge of the developer.”
4. **Tending as the brand behavior.** Photography/material: ash, banked hearths, lamp-passing, annotated books, diffs, chalked distinctions. Motion: a coal breathing, a branch forking, a lamp handed — never a logo spinning in a glow.
5. **Type with drawing.** A grotesque used calmly (weight 500, negative tracking) plus a display face that looks *written or cut*, not generated. Custom wordmark rules for the capital S / the *scire* cluster. No Trajan, no Cinzel, no “Latin mode.”
6. **Cards at 4–6px, almost sharp.** Cloudflare got this right; so did the founder. Soft 16px cards are the tell of generic AI UI. Pill only on the one action that means “tend this” (start the lesson, keep the coal).
7. **A ritual object besides the UI.** Designership’s diploma is the wrong ritual; the right ones are: a lamp passed at the end of a path; a labelled fruit on a tree when a skill is mastered (Llull); a fork you chose (a distinction you can now *scire*).
8. **Cultural temperature: European scholarly × workshop, not Silicon Valley mystic.** Graphéine, Studio Dumbar, Llull (Majorca/Lyon), Latin as a working language of distinction. The site should feel closer to a **print studio attached to a forge** than to an infra marketing page with a myth glued on.

If a comp can be described as “dark SaaS, orange accent, tree logo,” it is already dead. If it can be described as **“a banked coal that learned to fork,”** it might be scireDev.

---

## Source list (compact)

**Cloudflare**  
https://www.cloudflare.com/  
https://blog.cloudflare.com/time-for-an-update/  
https://blog.cloudflare.com/thinking-about-color  
https://blog.cloudflare.com/dark-mode/  
https://www.shadcn.io/design/cloudflare  
https://www.webdesignhot.com/design.md/cloudflare/  
https://getfontinfo.com/font/cloudflare-com  
https://design.withfudge.com/share/cloudflare.com-design  

**Dribbble / Git**  
https://dribbble.com/shots/433719-Git-Logo-Concept  
https://git-scm.com/downloads/logos  
https://dribbble.com/shots/27309816-ULAR-Brand-Identity  
https://dribbble.com/shots/21708884-Designership-Logo-Design  
https://dribbble.com/shots/21542000-Windows-Developer-brand-identity  
https://dribbble.com/shots/20136251-Hyphen-Brand-ID-Education-Platform  
https://dribbble.com/shots/14804950-Jolly-Loggers-Tree-Service-Branding  
https://dribbble.com/shots/13660506-Rooted-Craft-Kitchen-Brand-System  

**Behance / European studios**  
https://grapheine.com/en/portfolio/universite-paris-1-pantheon-sorbonne-visual-identity/  
https://grapheine.com/portfolio/bibliotheque-cujas-identite-visuelle/  
https://grapheine.com/portfolio/france-universites-naming-et-identite-visuelle/  
https://www.behance.net/gallery/213409955/Universit-Paris-1-Panthon-Sorbonne-Visual-Identity  
https://www.behance.net/gallery/202948255/RSE-Larbre-Corail-Identity-Edition  
https://www.behance.net/gallery/167191985/Studio-Pop-Deconstruction  
https://www.behance.net/gallery/158783059/Tree-by-Tree  
https://www.behance.net/gallery/2019053/Dutch-national-police-force  
https://www.behance.net/gallery/229491335/CyberSabra-Visual-Identity  
https://www.behance.net/gallery/251017659/ScienceMines-Visual-Identity-Branding  
https://www.behance.net/gallery/84416937/IBM-Cloud  
https://www.behance.net/gallery/83359799/Amsterdam-University-of-the-Arts-Expanded-Contemporar  

**Adjacent craft**  
https://linear.app/brand  

**Etymology**  
https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.04.0059%3Aentry%3Dscio  
https://www.etymonline.com/word/science  
https://www.etymonline.com/word/*skei-  
https://www.vr-elibrary.de/doi/10.13109/glot.2012.88.1-4.253  

**Tree of knowledge**  
https://www.historyofinformation.com/detail.php?id=3407  
https://wellcomecollection.org/works/rpkh3mfs  
https://archive.org/details/gri_33125008480259  
https://doi.org/10.7203/imago.8.9153  
https://www.historyofinformation.com/detail.php?entryid=3857  
https://piggin.net/plold/arborPorpyhriana.htm  
https://doi.org/10.5771/0943-7444-2013-6-366  
https://www.musee-moyenage.fr/en/building-collections/the-collection-database/tree-of-jesse  
https://www.metmuseum.org/art/collection/search/466377  

**Fire / lamp**  
https://web.viu.ca/johnstoi/aeschylus/prometheusbound.htm  
http://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.01.0168%3Abook%3D7  
https://www.perseus.tufts.edu/hopper/text?doc=Perseus%3Atext%3A1999.02.0131%3Abook%3D2%3Acard%3D62  
https://www.lapl.org/branches/central-library/art-architecture/iconography  
https://publ.actual-art.org/aptha/en/article/view/11072  
https://www.cabinet.ox.ac.uk/studiolo-francesco-i-prometheus-and-nature  
