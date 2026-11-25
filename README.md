# Veerbhadra Mahant: portfolio

Source for [veerbhadra-mahant.me](https://veerbhadra-mahant.me). A single-page React 19 + Vite site, themed as a living Starry Night sky: a canvas of swirling brush strokes you can stir with the cursor, plant stars in, switch to sunrise, and a connect-the-stars map for the four projects.

## Layout

```
index.html            page head, CSP, meta tags
public/               favicon, robots.txt, resume PDF
src/App.jsx           all sections and the star-map game
src/sky.js            canvas sky engine
src/styles.css        design tokens and styles
src/data/content.js   resume content (single source of truth)
PRODUCT.md            product context for design tooling
```

## Run locally

```powershell
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Editing content

Everything shown on the page lives in `src/data/content.js`. To update the resume download, replace `public/Veerbhadra_Mahant_Resume.pdf`.
