# Design system: starry night

A living, painterly night sky. Thousands of short brush strokes follow a swirling flow field (two big vortices, one per star), drawn to a canvas that sits fixed behind the whole page. Content lives on painted dark-blue patches with hand-roughened edges so it stays readable over the brushwork. The visitor plays with the sky: the pointer stirs it, clicks plant stars, the moon toggles sunrise, and each project is a star in a small connect-the-stars game.

## Colour

| Token | Hex | Role |
| --- | --- | --- |
| `--night` | #0B1B3D | Sky base, page fallback |
| `--deep` | #0A1530 | Nav rail, footer gate |
| `--patch` | #0D1D45 | Content patches |
| `--cobalt` | #2A5CAA | Brush stroke mid blue |
| `--sky` | #4F8FD6 | Brush stroke light blue, skills chips |
| `--pale` | #A9D1E8 | Secondary text on patches, unvisited stars |
| `--gold` | #F2C230 | Stars, moon, primary actions, results |
| `--gold-soft` | #F6E08A | Hints, dates, focus ring |
| `--cream` | #F4F1E6 | Body text on patches |
| `--ink` | #0B1430 | Text on gold and pale surfaces |

Sunrise mode (moon toggle) swaps only the canvas palette to ochre, gold and orange with pale blue stars. Patches stay dark blue, so text contrast never changes.

## Type

- Bricolage Grotesque 400-800: everything. Display 800 with tight tracking, body 400.
- Caveat 600: small handwritten hints that talk to the visitor ("Tap a tool to dab some paint").
- Self-hosted via `@fontsource` (CSP allows `font-src 'self' data:`).

## The sky (`src/sky.js`)

- Accumulating paint canvas: particles walk a vector field and draw round-capped strokes (3-7px, alpha 0.5-0.85). The field is two large vortices plus one vortex around every star, so strokes ring each star like the painting's halos.
- Glow canvas, cleared every frame: star cores with a slow pulse, shooting stars, a faint ring under the cursor.
- Interactions: pointer movement adds a temporary vortex and spawns bright strokes; click on open sky (`[data-sky]` areas, not links, buttons or patches) plants a star (max 40); `burst()` dabs colour; `setMode()` repaints for sunrise.
- Performance: pixel ratio capped at 1.5, particle count scales with area, sheds strokes if frames run long, pauses when the tab is hidden.
- Reduced motion: the sky is painted once and left still; planting and bursts still work but do not animate.

## Components

- Patch: dark-blue block whose edge is roughened by an SVG turbulence displacement filter on a pseudo-element only.
- Eight-point star glyph: map stars and award plates. Gold filled for first prize, pale outline for finalist.
- Star map: four buttons (`aria-pressed`) placed on a map; each selection draws a gold line from the previous star. Visiting all four completes the constellation (lines go bright, shooting stars cross the sky). "Draw it again" resets.
- Dabs: skill chips in four colours; each press paints a burst of strokes into the sky.
- Buttons: pill, 2px outline, 44px minimum height, press scale 0.96.

## Motion

One authored moment on load: the name is painted on left to right (clip-path wipe, 800ms). Everything else is the sky itself plus responses to input (hover, press, selection). Hover states are gated by `(hover: hover) and (pointer: fine)`.

## Rules

- All facts come from `src/data/content.js` (the resume). No invented testimonials, screenshots or metrics.
- No kicker labels, section numbers, gradient text or glass. The only gradients are the moon glow and the hero scrim behind the name, both functional.
- Text never sits directly on the brushwork except the hero name over its scrim; headings, hints and labels sit on patches.
