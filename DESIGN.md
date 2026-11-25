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

One authored moment on load: the hero tiles scale from 0.6 and fade in, 450ms, `cubic-bezier(0.23, 1, 0.32, 1)`, 60ms stagger. It runs only under `prefers-reduced-motion: no-preference`, as does smooth scrolling. Everything else is small hover and press transitions.

## Rules

- All facts come from `src/data/content.js` (the resume). No invented testimonials, screenshots or metrics.
- No gradients, glass or blur, no shadows heavier than a 1px hairline, no section numbers, no emoji.
- `--sun` never sits behind text. Decorative shapes are `aria-hidden` and never overlap copy.
- Project colours are assigned by index in `App.jsx`, not stored in content.
