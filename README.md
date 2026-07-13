# antendis.dev

Source for [antendis.dev](https://antendis.dev), Rohail Sheikh's personal portfolio site.

## Architecture

Plain static site, no build step, no framework:

- `index.html` — single-page markup for all sections (home, work, university,
  skills, contact). Sections are `<section class="panel">` elements; a small
  hash-based router in `script.js` shows one at a time on desktop and lets
  them stack in normal document flow on mobile.
- `style.css` — the entire design system (an editorial "paper & ink" look),
  including light/dark themes and responsive layout.
- `fonts.css` — `@font-face` rules for the self-hosted Newsreader and
  JetBrains Mono fonts (files under `assets/fonts/`).
- `script.js` — the panel router, mobile scrollspy, age ticker, content
  loaders (grades/skills/roles from `config.js`), clipboard-copy for the
  email address, and the visitor-location tracking that feeds the globe.
- `config.js` — **the content model.** Grades, roles/achievements, and the
  tech stack lists are all data here, rendered into the page by `script.js`.
  Edit this file to update those sections without touching markup.
- `globe.js` — the three.js wireframe globe in the right-hand rail, built
  from `custom.geo.json` (simplified world coastlines) plus visitor markers.
- `vendor/three.min.js` — self-hosted three.js r128 (no CDN dependency).
- `custom.geo.json` — simplified world map used to draw the globe.
- `cloudflare/` — an optional Cloudflare Worker backend for the visitor
  globe. See [`cloudflare/SETUP.md`](cloudflare/SETUP.md) — it's entirely
  opt-in; without it the globe just falls back to the current browser's own
  visit history.

## Local development

No build, no dependencies. From the repo root:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`.

## Deploy

The site deploys via GitHub Pages, serving directly from this repo. The
`CNAME` file pins the custom domain (`antendis.dev`); `404.html` is served
automatically by GitHub Pages for unmatched paths.

## Visitor globe backend (optional)

By default the globe only shows this browser's own recent visits
(`localStorage`, 24h window). To make it show everyone who visited recently,
deploy the small Cloudflare Worker described in
[`cloudflare/SETUP.md`](cloudflare/SETUP.md) and point `config.visitsApi` at
it.
