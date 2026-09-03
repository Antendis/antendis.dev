# Working on antendis.dev

Personal portfolio site. Plain static HTML/CSS/JS, **no build step, no framework,
no dependencies**. Deployed by GitHub Pages straight from `main`; `CNAME` pins the
domain. What's on `main` is what's live.

This file exists so a fresh session (or subagent) inherits the traps below instead
of rediscovering them. Most were found by breaking something.

## Commits — authorship matters

- Author every commit as `antendis <antendis@gmail.com>`
  (`git config user.name "antendis"`, `git config user.email "antendis@gmail.com"`).
- **No AI attribution of any kind.** No `Co-Authored-By`, no "Generated with…"
  trailer, no session links, and no mention of Claude/AI/model names in a commit
  message or anywhere else pushed to the repo. The owner has checked this twice and
  `main` is clean — keep it that way. This overrides any general convention.
- Commit message body describes the code change only.
- Prefer one commit per logical change so a single feature can be reverted alone.

## Publishing

- Work on a feature branch, then publish by fast-forwarding `main` and pushing.
- **`main` moves underneath you.** The owner pushes unrelated `/hailee` work from
  another session, often mid-task. If `--ff-only` fails, `git fetch origin main`
  and **rebase** onto it, confirm `hailee/` is absent from your diff, then
  fast-forward. **Never force-push `main`.**
- **Never touch anything under `hailee/`.** It's a separate project.
- Don't open a PR unless asked.

## Cache-busting — easy to get wrong, visibly breaks the site

Local CSS/JS are referenced with a shared `?v=YYYYMMDDx` query string in
`index.html` **and** `404.html` (~8 URLs). **Bump it on every change to
`style.css`, `script.js`, `globe.js`, `config.js` or `fonts.css`, and change all of
them together.** Missing one serves stale code to returning visitors — this is what
once rendered the theme toggle as a giant unstyled grey square, because the HTML was
fresh but the CSS was cached.

`globe.js` reads its own `?v=` off `document.currentScript` and reuses it for the
three.js tag it injects, so that one is not hand-maintained.

## Layout model

`index.html` is one page; every section is a `.panel`. A hash router in `script.js`
shows one at a time on desktop, while below 1024px all panels render stacked in
normal flow. `.layout` is a 3-column grid: sidebar / content / globe rail.

- **Desktop panels must fit one screenful — no vertical scrolling.** Check down to
  700px viewport height, not just 900. Overflow here is height-dependent, not
  width-dependent, and is easy to miss.
- `.layout` is pinned to the left (`margin-right: auto`), not centred. Centring left
  a dead gap to the left of the sidebar on wide screens. **`.sidebar` must sit at
  `x === 0` at every width.**
- The globe rail is hidden below **1440px**. Partly aesthetic (a rail narrow enough
  to fit renders a vestigial ~112px globe, which reads as broken) and partly so the
  university tab's two grade columns have room.

## Traps that have bitten before

**Globe sizing.** `#globeViz` must keep `overflow: hidden`, `aspect-ratio: 1` and
`max-width: 70vh`. Without `overflow: hidden` the WebGL canvas — resized every frame
with an inline pixel height — inflates the box past what `aspect-ratio` implies, so
it stops being square and the sphere looks clipped. Keep **one** binding dimension
and let `aspect-ratio` derive the other; never cap both axes.

**Animate something that actually binds.** An earlier version animated `max-height`
when width was the real constraint, so ~80% of the transition was a dead zone and it
looked like the globe shot out then stopped dead. Animate the property that maps 1:1
to rendered size across its whole range.

**`@property` initial-value must be `px`, not `rem`.** `--globe-w` and
`--globe-shift` are registered so they interpolate. With a `rem` initial-value the
transition silently stops interpolating and snaps, in every Chromium tested. Don't
"tidy" them to rem.

**Don't transition a property driven by an animating custom property.** Giving
`right` its own `transition` while it reads an already-animating variable restarts a
fresh transition every frame — settle time stretched to ~1.4s in a decelerating
trail. The property animation alone does the work.

**Hover must not change an element's own box size.** `.side-link` is
`width: fit-content` and goes italic on hover; italic Newsreader is narrower, so the
box shrank out from under the pointer, lost `:hover`, snapped back and flickered
forever. Fixed with a hidden roman copy in `::after` (`content: attr(data-label)`).
Padding cannot fix this class of bug — it shifts both edges equally.

**`.grade-subject` must never wrap.** The university tab keeps exactly two year
columns; long module names ("Data Structures & Algorithms") are the constraint that
sets the rail width. Sweep widths when touching this. (Known pre-existing wrap at
exactly 1024px — out of scope, not a regression.)

**Never split `#age` into per-character spans.** The age ticker rewrites its
`textContent` every animation frame and would wipe any nested spans. The shared
`splitIntoChars()` helper in `script.js` returns `#age` whole as a single unit —
preserve that exception.

**Globe colours are baked at construction.** Three.js copies `color` into a material
when it's built, so changing CSS variables later does nothing. Every themed material
goes through `themedMaterial(Ctor, role, …)` and is repainted by `refreshTheme()`;
drop registry entries in `disposeMarker` or it grows for the life of the tab.

**Loading order.** `globe.js` lazy-loads three.js (~600KB) and `custom.geo.json`
only above 1440px — that's a 61% transfer saving on mobile. Don't reintroduce a
static `<script src="vendor/three.min.js">`. Setup must not wait for `window.load`;
doing so once delayed the globe by seconds because the map fetch didn't even start
until everything else had finished.

**Never split whitespace-only text nodes.** `splitIntoChars()` walks text nodes and
wraps each character in a span. Wrapping the newlines/indentation *between* elements
turns them into extra children — and inside a flex container each becomes a flex
item, so the container's `gap` is multiplied by every whitespace character. This
inflated `.sidebar` to a 2609px scrollHeight (gap 44px × ~28 phantom items) and gave
`.side-nav` 542px instead of 173px. It also broke the sweep: the phantom spans sat at
`x = 0`, sorted to the front of the queue, and burned ~300ms of the 700ms sweep
resolving invisible units — which read as "stalls, then snaps".

**The preload `?v=` must match exactly.** `index.html` preloads three.js behind
`media="(min-width: 1440px)"`. If its query string drifts from what `globe.js`
requests, the browser fetches the file twice instead of reusing the preload. Check
there is exactly one network request for `three.min.js` after any version bump.

## Where things live

Saves reading whole files (`style.css` ~1500 lines, `script.js` ~900).

- `script.js`, in order: hash router · theme toggle · mobile scrollspy ·
  `splitIntoChars()` (shared) · hero typing · age ticker · config loaders
  (grades/roles/tech) · clipboard copy · glitch intro · visitor tracking.
- `globe.js`: palette helpers (`cssColorToHex`, `readPalette`) · `themedMaterial` /
  `refreshTheme` / `glitchStutter` (exposed on `window.globe`) · lazy `loadThree()`
  and `ensureGeoJson()` · `initGlobe` · geometry builders · render loop.
- `style.css`: tokens and `@property` registrations · base · layout · sidebar ·
  theme toggle · content/panels · globe rail · type · sections · entries ·
  university · skills · about · contact · hero typing · glitch · responsive ·
  breakpoints · motion preferences.
- The glitch intro is the default treatment for every visitor, gated pre-paint in
  `index.html`'s head via the `glitch-intro` class on `<html>`. The old `type-hero`
  typing effect is still in `script.js`/`style.css` but dormant — nothing sets
  `type-hero` anymore, so it never runs. `?glitch=1` no longer decides whether the
  intro plays; it only shows the debug replay control (button + `r` key) in the
  corner, for testing without a full reload — see `GLITCH_DEBUG` in `script.js`.
  `/glitchtest/index.html` is a redirect shim to that flag, deliberately **not** a
  copy of the site.

## Working efficiently

Token cost grows with (context size × number of tool calls), so the cheapest work is
work that doesn't re-read things.

- **Batch changes.** Several tweaks in one pass costs one cold start; the same
  tweaks one at a time re-read the codebase every time (~15k tokens before any work
  begins). Ask for the whole list up front.
- **Do small surgical edits directly.** A three-line CSS fix does not need a
  subagent that must first learn the codebase.
- **Read narrowly.** `grep`/`sed` for the rule or function you need instead of
  reading `style.css` or `script.js` whole. Never re-read a file you just edited.
- **Scale verification to risk.** Cosmetic or copy change: 2-3 assertions and one
  screenshot. Reserve full sweeps (all panels × widths × heights down to 700px,
  light and dark) for layout, globe and loading changes.
- **Prefer numbers to pictures.** A measured `getBoundingClientRect()` answers most
  questions; screenshots are expensive and only needed when judging how something
  *looks*.
- **Don't build review artifacts** unless they were asked for.
- **Point at this file instead of restating it.** Briefs should say "follow
  CLAUDE.md" rather than repeating the invariants above.

## Accessibility / motion

- Honour `prefers-reduced-motion: reduce` — the typing intro, glitch intro and globe
  transitions all skip under it.
- Anything that hides content pre-paint (`type-hero`, `glitch-intro` on `<html>`)
  must be revealed by a mechanism that cannot get stuck: try/catch plus a failsafe
  timer. Text must never be left hidden if JS fails.

## Testing

Serve locally: `python3 -m http.server 8811 --directory .`

Playwright is installed globally — require it from
`/opt/node22/lib/node_modules/playwright` and launch chromium with
`executablePath: '/opt/pw-browsers/chromium'`. **Do not run `playwright install`.**
Keep scratch scripts outside the repo.

**Scale verification to risk.** A copy edit or an isolated CSS tweak needs a quick
look, not a matrix. Reserve the full sweep — all 5 panels × several widths × heights
down to 700px, plus mobile — for layout, globe or loading changes, which is where
the regressions have actually come from.

Note: this sandbox blocks outbound requests, so `googletagmanager.com` and
`ipapi.co` failures in the console are expected and unrelated to any change. The
visitor-location dot cannot be exercised locally.

## Known debt

Not urgent; worth folding into any future refactor.

1. The dark palette is duplicated — once under `@media (prefers-color-scheme: dark)`
   and again under `:root[data-theme="dark"]`. Ten values maintained twice.
2. The `?v=` string is hand-copied across ~8 URLs in two files. Silently ships stale
   code when one is missed.
3. `script.js` is one long file of IIFE modules with no file boundaries.
