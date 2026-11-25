# Veerbhadra Mahant: portfolio

Source for [veerbhadra-mahant.me](https://veerbhadra-mahant.me). A single-page React 19 + Vite site, designed as abstract Bauhaus colour blocks: flat geometric shapes on warm paper, one colour per project.

## Layout

```
index.html            page head, CSP, meta tags
public/               favicon, robots.txt, resume PDF
src/App.jsx           all sections
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
