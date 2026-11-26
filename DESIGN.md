# Design system: screen-printed poster plates

The page is a set of screen-printed poster plates built around four illustrations supplied by the owner. The illustrations are flat cut-paper gouache with visible paper grain, hard-edged colour planes and warm light; the page takes its palette, its grain, its thick ink frames and its flat offset shadows from them. Each section is a full field of one colour. Direction is user-pinned ("analyze these photos. the style. the color scheme. and add these photos and accordingly update the website colors and give me a new look").

## Colour

| Token | Hex | Role |
| --- | --- | --- |
| `--sand` | #EDDCB1 | Main ground: body, nav, Work, Experience |
| `--sand-2` | #E3CC98 | Alternate surface: Activities tiles, plate backing |
| `--ink` | #26211F | Text, Resume button, plate frames, offset shadows, ticker band |
| `--muted` | #5A4A3E | Secondary text on sand and sand-2 |
| `--rule` / `--rule-2` | rgba(38,33,31,.18 / .34) | Hairlines |
| `--cobalt` | #1A577D | Hero field; Loanloop card |
| `--sea` | #12485B | Contact field; hero block-colour option |
| `--teal` | #236D6B | Fee-nance card |
| `--terracotta` | #A6481F | Matrusetu card; first-prize circles |
| `--orange` | #CE7735 | Accent: particles, ticker marks, skills group |
| `--ochre` | #EFBE78 | Activities field; card marks; hero shapes; cursor |
| `--brown` | #6F4432 | Freightsight card; Pattern Waves dots |
| `--grass` | #75A55D | Skills group colour |
| `--night` | #2B2421 | Skills field (warm black) |
| `--cream` | #F6EBD2 | Text on cobalt, teal, terracotta, brown, sea, night and ink |

Contrast (WCAG): ink on sand 11.7, muted on sand 6.2, muted on sand-2 5.4, ink on sand-2 10.1, ink on ochre 9.3, cream on cobalt 6.6, cream on teal 5.1, cream on terracotta 5.0, cream on brown 7.0, cream on sea 8.4, cream on ink 13.4, cream on night 12.9, ink on orange 4.8 (skills chip hover). Light theme only; `theme-color` is cobalt.

## Type

- Bricolage Grotesque, everything. Display 800 with -0.03em tracking, body 400, tabular numerals. Self-hosted via `@fontsource`.
- Hero name clamps 3.5rem to 6rem over two lines; section titles 2rem to 3.25rem.

## Illustrations

All four are 1200x800 (3:2) WebP with 640px variants, in `src/assets/illustrations/`, supplied by the owner; no other images exist. Every one sits in a 6px ink frame. Below the fold they use `loading="lazy" decoding="async"`, `srcSet` (640w, 1200w), `sizes` and width/height. No captions.

- flowers: hero, right side, on an offset block (the portrait button). Eager, `fetchPriority="high"`. Clicking cycles the block through terracotta, teal, ochre, sea. An ochre circle and a terracotta quarter on the corners drift with the pointer.
- campus: Experience, a sticky plate beside the rows on desktop (1000px and up), between heading and rows on mobile. Ink offset shadow.
- crown: Activities, beside the four tiles on desktop (1000px and up), above them on mobile.
- glasses: Contact, beside "Get in touch" on desktop, above on mobile; ochre offset shadow because ink would vanish on sea.

## Sections (full-palette fields)

- Nav: sand, hairline border, ink text; below 760px links collapse into a Menu disclosure (`aria-expanded`, closes on link click and Escape). Ink Resume button.
- Hero: cobalt. Cream name and lede, cream filled "See the work", cream outlined "Download resume". Letters hop and tint ochre or sand on hover.
- Ticker: ink band, cream text, ochre, terracotta, orange and teal marks; scrolls 40s per loop, pauses on hover, no button; the duplicate track is `aria-hidden`.
- Work: sand. Cards in cobalt, teal, terracotta, brown with cream text, ochre corner marks (square turns, circle pops, quarter turns, half flips), native `<details>`, cream outlined chips and GitHub button.
- Experience: sand; date column, role with a square marker, bullets; campus plate.
- Activities (`#recognition`): ochre. Tiles on sand-2 with ink text; first prize is a terracotta circle that breathes on screen, finalist an ink outline; crown plate.
- Skills (`#skills`, "Tools"): night field with Letter Glitch. Group names and chips in cream, chips outlined cream on a solid night fill; hover fills with the group colour (ochre, orange, grass, sand) and ink text. Education sits on a sand plate.
- Contact: sea. Cream text, copy-email burst of 11 flat shapes (ochre, orange, cream, sand), glasses plate.

## Texture and backgrounds

- Print grain: an inline SVG `feTurbulence` tile (data URI, allowed by the CSP `img-src data:`) on `.hero::after`, `.section::after`, `.contact::after`: absolute, 50% opacity, `pointer-events: none`, no blend mode, never fixed, so scrolling stays cheap.
- Section backgrounds (React Bits by David Haz, MIT + Commons Clause, `src/components/backgrounds/`), each always on its own section, mounted by `SectionBg` (lazy, error boundary, within 300px of the viewport, never unmounted), absolute at z-index 0 under content at z-index 1:
  - Hero: Particles, cream/ochre/orange, 90 sparse slow dots like stars.
  - Work: Pattern Waves, sand base, brown dots at 18% opacity.
  - Experience: Line Waves, terracotta/teal/cobalt, slow, 40% opacity, faded behind the text column.
  - Activities: Gradient ASCII, ochre/orange/terracotta/brown, masked lighter at the top.
  - Skills: Letter Glitch (WebGL2; the current React Bits version), glitch colours ochre/terracotta/teal, cream base letters at 14%, glitch amount 0.5, speed 0.35, centre vignette 0.65, edge fade 0.1, no intro, pointer and click effects off (window listeners attach only when `interactive`), layer at 90% opacity. It already pauses through IntersectionObserver and `document.hidden` and renders a still frame under reduced motion; its devicePixelRatio cap was lowered from 2 to 1.5. Cleanup removes observers, listeners, textures and the program.
- Performance rules for all five: `React.lazy`, dpr cap 1.5, ResizeObserver, pause offscreen and when hidden, still frame under reduced motion.

## Motion

Flat shapes behave like toys that answer the visitor; content stays the focus and nothing fades in on scroll. Only `transform`, `translate`, `scale`, `rotate`, `opacity` and colours animate; micro-interactions 150-350ms, entrances under 900ms, on `cubic-bezier(0.23, 1, 0.32, 1)` unless noted.

- Hero name letters drop in with a 30ms stagger; hover hops them.
- Hero illustration rises in; corner shapes drift up to 14px toward the pointer, the block moves 8px the other way; click cycles the block colour with a press squash.
- Project cards and Activities tiles lift 4px with a flat 6px ink offset shadow. Card marks move by shape; the "How it works" plus turns to a cross; opened details fade and slide 6px.
- First-prize circles breathe (scale 1 to 1.08, 3s) only while on screen.
- Skill chips fill with the group colour and pop on a spring curve; group shapes spin 90deg.
- Copy email: the one celebration, a burst flying 40-90px and fading in 700ms.

Hover and drift apply only under `(hover: hover) and (pointer: fine)`; touch keeps press and focus states. Under `prefers-reduced-motion: reduce` everything rests in its final state: no letter entrance, drift, breathe or burst, backgrounds show a still frame, the ticker becomes a static wrapped row. Smooth scrolling is gated on no-preference.

## Browser surfaces

- Cursor: a native CSS image set in an inline `<style>` in `index.html`: a 27px `--ochre` circle with a 1.5px ink ring, 48px over `a`, `button`, `summary`, `label`, `[role=button]`; mouse only.
- Scrollbar hidden (`scrollbar-width: none`, `::-webkit-scrollbar`); the page still scrolls.
- Selection: terracotta with cream text. Focus ring 3px, offset 3px: ink on sand, cream on cobalt, night, sea, ink and cards.
- Buttons: 44px minimum height, 2px border, 4px radius, press scale 0.97.

## Rules

- All facts come from `src/data/content.js` (the resume). No invented testimonials, screenshots or metrics; the only images are the owner's four illustrations.
- No glass or blur. Hard offset ink shadows belong to this world (plates, lifted cards and tiles). No captions under images, no section numbers, no kickers, no emoji.
- Text never sits on a busy background without a solid fill or a quiet layer; decorative shapes are `aria-hidden` and never cover copy.
- Project colours are assigned by index in `App.jsx`, not stored in content.
