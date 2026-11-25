# Design system: Bauhaus colour blocks

A clean, confident page of flat geometric shapes on warm paper. Squares, circles, quarter and half circles, and bars in four block colours; each project owns one colour. No imagery, no texture, no effects: the shapes and the type carry the design.

## Colour

| Token | Hex | Role |
| --- | --- | --- |
| `--paper` | #F3EFE6 | Page and nav background |
| `--paper-2` | #E9E3D6 | Alternate surface: recognition tiles, education block, hero tile backdrop |
| `--ink` | #151515 | Text, primary buttons, outlines |
| `--muted` | #55524B | Secondary text |
| `--rule` | rgba(21,21,21,.14) | Hairlines |
| `--navy` | #1E2A5A | Block: Loanloop card, contact footer |
| `--green` | #1F6B4F | Block: Fee-nance card |
| `--teal` | #17707A | Block: Matrusetu card |
| `--red` | #B83A28 | Block: Freightsight card |
| `--sun` | #E8B930 | Small accent shapes only, never behind text |

White text on each of the four block colours passes WCAG AA for body text. Light theme only.

## Type

- Bricolage Grotesque, everything. Display 800 with -0.03em tracking, body 400, tabular numerals.
- Self-hosted via `@fontsource` (CSP allows `font-src 'self' data:`).
- Hero name clamps from 3.5rem to 7rem on two lines; section titles 2rem to 3.25rem.

## Components

- Nav: sticky, solid paper, hairline bottom border. Below 760px the section links collapse into a Menu disclosure (`aria-expanded`, closes on link click and Escape). Solid ink Resume button.
- Hero: name, lede, two actions; beside it one inline SVG, a 3x3 grid of tiles (square, circle, quarter circle, half circle, bar) on a paper-2 backdrop.
- Project card: block colour, white text, a corner mark in `--sun` (a different shape per card), headline metric set large, native `<details>` "How it works" with bullets and outlined stack chips, GitHub link. Only the summary and the link are interactive.
- Experience row: date column, role with a small square marker cycling the four colours, org in muted, bullets.
- Recognition tile: filled sun circle for first prize, outlined ink circle for finalist.
- Skills: group name with a small shape (cycling colours), static hairline chips, education block on paper-2.
- Contact: full-bleed navy footer; a sun quarter circle and a red circle sit at the edges, clear of the text.
- Buttons: 44px minimum height, 2px border, 4px radius, press scale 0.97. Hover only inside `(hover: hover) and (pointer: fine)`. Focus ring 3px, offset 3px: ink on paper, white on colour blocks.

## Motion

The flat shapes behave like toys that answer the visitor. Content stays the focus: nothing blocks reading or clicking, and nothing fades in on scroll. Only `transform`, `translate`, `scale`, `rotate`, `opacity` and fill colours animate; micro-interactions run 150-350ms, entrances under 900ms, on `cubic-bezier(0.23, 1, 0.32, 1)` unless noted.

- Hero name: letters drop in from -0.4em with a small overshoot, 30ms stagger (the h1 carries `aria-label`, letters are `aria-hidden`). Hovering a letter hops it and tints it navy, green, teal or red by index.
- Hero portrait: rises in, then the sun circle and red quarter drift up to 14px toward the pointer and the offset block moves 8px the opposite way. Clicking the photo cycles the block colour (250ms) with a press squash.
- Ticker: a full-bleed ink band of outcome facts scrolls left, 40s per loop, with a Pause/Play button (WCAG 2.2.2) and pause on hover. The duplicate track is `aria-hidden`.
- Project cards and recognition tiles lift 4px with a flat 6px ink offset shadow (a print shadow, no blur). Each card mark moves by shape: square turns 90deg, circle pops, quarter turns 180deg, half flips. The "How it works" plus turns into a cross, and opened details fade and slide 6px.
- First-prize sun circles breathe (scale 1 to 1.08, 3s) only while on screen.
- Skill chips fill with their group colour and pop with a spring curve; group shapes spin 90deg.
- Copy email: the one celebration, a burst of 11 flat shapes flying 40-90px and fading in 700ms.
- Contact footer shapes drift up to 16px with the pointer.

Hover and drift effects apply only inside `(hover: hover) and (pointer: fine)`; touch users keep press (`:active`) and focus states. Under `prefers-reduced-motion: reduce` everything rests in its final state: no letter entrance, drift, breathe or burst, and the ticker becomes a static wrapped row without a button. Smooth scrolling is also gated on no-preference.

## Rules

- All facts come from `src/data/content.js` (the resume). No invented testimonials, screenshots or metrics.
- No gradients, glass or blur, no shadows other than the flat hard offset shadow on lifted cards and tiles, no section numbers, no emoji.
- `--sun` never sits behind text. Decorative shapes are `aria-hidden` and never overlap copy.
- Project colours are assigned by index in `App.jsx`, not stored in content.
