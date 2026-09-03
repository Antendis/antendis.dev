// Hash-based panel router
(function () {
  const PANELS = ['intro', 'projects', 'achievements', 'skills', 'contact'];
  const ALIASES = { about: 'intro', home: 'intro' };
  const TITLES = {
    intro: 'Rohail Sheikh | Software Engineer',
    projects: 'Work | Rohail Sheikh',
    achievements: 'University | Rohail Sheikh',
    skills: 'Skills | Rohail Sheikh',
    contact: 'Contact | Rohail Sheikh'
  };
  // Below 1024px every panel renders stacked in normal document flow (see the
  // mobile media query in style.css), so the tab-style behaviors below (reset
  // scroll to top, swallow same-panel clicks) only make sense on desktop.
  const isTabMode = () => window.matchMedia('(min-width: 1024px)').matches;

  function resolve(hash) {
    const id = (hash || '').replace(/^#/, '');
    return PANELS.includes(id) ? id : (ALIASES[id] || 'intro');
  }

  function show(id, moveFocus) {
    document.querySelectorAll('.panel').forEach(p => {
      p.classList.toggle('is-active', p.id === id);
    });
    document.querySelectorAll('.side-link').forEach(a => {
      const current = a.dataset.panel === id;
      a.classList.toggle('is-current', current);
      if (current) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
    document.title = TITLES[id];
    // Expose active panel on <html> so CSS can drive panel-specific styles
    // (e.g. the intro panel's footer spacing) without extra JS.
    document.documentElement.dataset.panel = id;
    if (isTabMode()) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
    if (moveFocus) {
      document.getElementById('main').focus({ preventScroll: true });
    }
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', { page_location: location.href });
    }
  }

  window.addEventListener('hashchange', () => show(resolve(location.hash), true));
  show(resolve(location.hash), false);

  // Clicking a link to the already-active panel fires no hashchange, so the
  // browser's native fragment scroll would tuck the page top under the bar.
  // Desktop-only: on mobile, panels are stacked in flow and the browser's
  // native anchor scroll already lands on the right section.
  document.querySelectorAll('.side-link, .side-logo').forEach(a => {
    a.addEventListener('click', e => {
      if (isTabMode() && resolve(a.hash) === resolve(location.hash)) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    });
  });
})();

// Theme toggle: manual light/dark override on top of the OS default. The
// inline head script already applied any saved choice before first paint;
// this wires up the button and keeps things in sync with live OS changes.
(function () {
  if (!document.getElementById('themeToggle')) return;

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const DARK_COLOR = '#16140F';
  const LIGHT_COLOR = '#F7F1E3';

  function effectiveTheme() {
    return document.documentElement.dataset.theme || (media.matches ? 'dark' : 'light');
  }

  // Re-queried on every call rather than cached once at module init: the
  // glitch intro further down replaces .sidebar's innerHTML wholesale when
  // it finishes (to drop its throwaway spans), which silently detaches a
  // listener bound to the button itself and leaves a cached reference
  // pointing at a node that's no longer in the DOM -- the toggle would still
  // render, just stop responding to clicks after the first glitch run.
  function reflect(theme) {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.setAttribute('aria-pressed', theme === 'dark');
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
    const colorMeta = document.getElementById('themeColorMeta');
    if (colorMeta) {
      colorMeta.setAttribute('content', theme === 'dark' ? DARK_COLOR : LIGHT_COLOR);
    }
  }

  // Single seam for both ways the effective theme can change (manual click,
  // and OS-level change while no manual override is stored) so the globe's
  // baked-in colors get repainted from both, not just one. globe.js loads
  // with `defer` and may not have initialised yet, and the globe rail is
  // hidden below 1200px, so the call is optional-chained throughout.
  function applyTheme(theme) {
    reflect(theme);
    window.globe?.refreshTheme?.();
  }

  applyTheme(effectiveTheme());

  media.addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // Delegated on document rather than bound to the button, for the same
  // reason reflect() re-queries above: this listener has to survive the
  // button underneath it being torn down and recreated by the glitch intro.
  document.addEventListener('click', e => {
    if (!e.target.closest('#themeToggle')) return;
    const next = effectiveTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
    applyTheme(next);
  });
})();

// Mobile scrollspy: below 1024px all panels sit stacked in document flow, so
// nav highlighting can't rely on the desktop tab router's hash-driven show().
// An IntersectionObserver tracks which section is under a band near the top
// of the viewport and mirrors the same .is-current/aria-current bookkeeping,
// without touching location.hash or the desktop router's own state.
(function () {
  if (typeof IntersectionObserver === 'undefined') return;

  const mq = window.matchMedia('(max-width: 1023px)');
  let observer = null;

  function setCurrent(id) {
    document.querySelectorAll('.side-link').forEach(a => {
      const current = a.dataset.panel === id;
      a.classList.toggle('is-current', current);
      if (current) {
        a.setAttribute('aria-current', 'page');
      } else {
        a.removeAttribute('aria-current');
      }
    });
  }

  function start() {
    if (observer) return;
    const sections = Array.from(document.querySelectorAll('.panel'));
    observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting);
      if (!visible.length) return;
      // Prefer whichever intersecting section sits closest to the top band.
      visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      setCurrent(visible[0].target.id);
    }, {
      // A thin horizontal band near the top of the viewport decides "current".
      rootMargin: '-45% 0px -50% 0px',
      threshold: 0
    });
    sections.forEach(s => observer.observe(s));
  }

  function stop() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  }

  function sync() {
    if (mq.matches) {
      start();
    } else {
      stop();
    }
  }

  sync();
  if (typeof mq.addEventListener === 'function') {
    mq.addEventListener('change', sync);
  }
})();

// Shared text-splitting helper, used by both the hero-typing effect below
// and the glitch intro further down: walks an element's text nodes and
// explodes each character into its own <span>, leaving any inline markup
// (accent spans, links, etc.) untouched so per-character effects can be
// layered on without retyping any strings. #age is deliberately left whole
// -- not split -- because the age ticker rewrites its textContent every
// frame and would wipe out any spans nested inside it; callers get #age
// itself back as one of the returned units instead, tagged with the same
// class as everything else.
//
// budget, if given, is a shared { remaining } counter decremented per unit
// produced -- once it hits 0, any characters still left in the text node
// being walked are left as plain, unsplit text rather than throwing or
// silently continuing past the cap. Omit it for no limit (the typing
// effect's use below never needs one; the glitch intro's does, to bound how
// much of the page it touches).
function splitIntoChars(host, className, budget) {
  const units = [];
  (function walk(node) {
    Array.from(node.childNodes).forEach(child => {
      if (budget && budget.remaining <= 0) return;
      if (child.nodeType === 3) {
        // Whitespace-only text nodes are the newlines/indentation between
        // sibling elements in the authored HTML -- structurally invisible,
        // not text to animate. Left as plain text nodes rather than wrapped
        // in a span: inside a flex container, a whitespace-only *text node*
        // is skipped when laying out flex items, but a whitespace-only
        // *span* is a real element and becomes a flex item like any other,
        // multiplying `gap` once per character. Wrapping them was blowing
        // .sidebar's height out to 3x the viewport.
        if (/^\s*$/.test(child.nodeValue)) return;
        const chars = Array.from(child.nodeValue);
        const frag = document.createDocumentFragment();
        let i = 0;
        for (; i < chars.length; i++) {
          if (budget && budget.remaining <= 0) break;
          const span = document.createElement('span');
          span.className = className;
          span.textContent = chars[i];
          frag.appendChild(span);
          units.push(span);
          if (budget) budget.remaining--;
        }
        if (i < chars.length) {
          frag.appendChild(document.createTextNode(chars.slice(i).join('')));
        }
        node.replaceChild(frag, child);
      } else if (child.nodeType === 1) {
        if (child.id === 'age') {
          child.classList.add(className);
          units.push(child);
          if (budget) budget.remaining--;
        } else {
          walk(child);
        }
      }
    });
  })(host);
  return units;
}

// Hero typing: on the first load of a session the intro body writes itself
// in, just after the title (which appears normally). Once finished the
// original markup is restored, which drops ~450 throwaway spans and gets
// back the kerning that splitting into separate text runs costs.
(function () {
  const root = document.documentElement;
  if (!root.classList.contains('type-hero')) return;

  const reveal = () => root.classList.remove('type-hero');

  try {
    const prose = document.querySelector('#intro .prose');
    const body = prose && prose.querySelector('p');
    if (!body) {
      reveal();
      return;
    }
    const signoff = prose.querySelector('.signoff');
    const footer = document.querySelector('.footer p');

    const passes = [{ host: body, html: body.innerHTML, ms: 1500 }];
    if (signoff) passes.push({ host: signoff, html: signoff.innerHTML, ms: 420, delay: 260 });
    // Final pass: the footer, so it reads as written too, not just dropped
    // in -- same brief, sequential mechanism as the signoff above, after it.
    if (footer) passes.push({ host: footer, html: footer.innerHTML, ms: 350, delay: 220 });
    passes.forEach(p => { p.units = splitIntoChars(p.host, 'type-char'); });

    // Everything is split and hidden, so the block can be shown again.
    reveal();

    // Belt and braces: if the loop ever stalls, put the real markup back.
    const bail = setTimeout(() => passes.forEach(restore), 8000);
    function restore(p) {
      if (p.done) return;
      p.done = true;
      p.host.innerHTML = p.html;
    }

    function run(i) {
      const p = passes[i];
      if (!p) {
        clearTimeout(bail);
        return;
      }
      const start = performance.now() + (p.delay || 0);
      let shown = 0;
      (function frame(now) {
        const elapsed = now - start;
        if (elapsed >= 0) {
          const target = elapsed >= p.ms
            ? p.units.length
            : Math.floor((elapsed / p.ms) * p.units.length);
          for (; shown < target; shown++) p.units[shown].classList.add('is-typed');
        }
        if (shown < p.units.length) {
          requestAnimationFrame(frame);
        } else {
          restore(p);
          run(i + 1);
        }
      })(performance.now());
    }

    run(0);
  } catch (e) {
    reveal();
  }
})();

// Dynamic age calculation

function ageYears() {
  const birthDate = new Date('2003-05-22');
  return (Date.now() - birthDate) / (365.25 * 24 * 60 * 60 * 1000);
}

function ageString() {
  return `${ageYears().toFixed(9)} years old`;
}

// Set (to a same-shape string of randomised digits) by the glitch intro
// while #age hasn't been reached by its sweep yet, and cleared once it has
// -- see the glitch intro module further down. Kept here, next to the
// ticker that's the only thing that ever reads it, rather than owned by the
// glitch module itself, so updateAge() stays the single place that decides
// what #age actually shows.
let ageGlitchText = null;

function updateAge() {
  const ageElement = document.getElementById('age');
  if (!ageElement) return;
  ageElement.textContent = ageGlitchText !== null ? ageGlitchText : ageString();
}

// Start age ticker: render immediately, then update every animation frame
// so the trailing decimal digits read as a smooth blur instead of visibly
// skipping values. Respect prefers-reduced-motion by rendering once,
// statically, and not starting the loop. Pauses while the tab is hidden.
updateAge();
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  let ageRafId = null;

  function ageTick() {
    updateAge();
    ageRafId = requestAnimationFrame(ageTick);
  }

  function startAgeTicker() {
    if (ageRafId === null) {
      ageRafId = requestAnimationFrame(ageTick);
    }
  }

  function stopAgeTicker() {
    if (ageRafId !== null) {
      cancelAnimationFrame(ageRafId);
      ageRafId = null;
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAgeTicker();
    } else {
      updateAge();
      startAgeTicker();
    }
  });

  startAgeTicker();
}

// Glitch intro: a print/typesetting failure -- wrong faces, wrong weights,
// spurious italics, letter-spacing collapse, ink misregistration -- rather
// than a video glitch (scanlines, RGB split), which would read as a broken
// screen instead of a bad print run. Replaces the type-in effect above on
// the flagged test page (see the head script in index.html, which gates
// first paint on 'type-hero' XOR 'glitch-intro' -- never both, so the two
// effects can never run back to back). Gated behind ?glitch=1 so normal
// visitors never load, run, or pay for any of this; see /glitchtest, a
// redirect shim rather than a page copy, for how testers reach the flag.
//
// Two waves, back to back, ~2.4s total. The sidebar, the active panel and
// the footer are exploded into per-character spans (via the shared
// splitIntoChars helper above) up front, corrupted, and then hidden -- and
// two fronts cross the page left to right in succession:
//   1. Wave in (0 - ~1.0s): the first front reveals the text in its
//      corrupted state, so the page doesn't arrive already broken, it
//      breaks its way in from the left.
//   2. Wave through (~1.0s - ~2.1s): the second front follows immediately,
//      with no pause between them, resolving each character to its true
//      self as it passes. Corruption keeps re-randomising (every ~90ms --
//      not every frame, both because per-frame reads as static noise and
//      because font/weight swaps reflow text) on everything the first front
//      has revealed and the second hasn't yet reached, so the strip between
//      the two fronts is the only part still moving.
//   3. Settle (~2.1s - ~2.4s): a short grace window, then the original
//      markup is restored outright (dropping every throwaway span).
// Both fronts are the same mechanism -- see waveFront() below, which is also
// where the two things that make a front read as a front are written down.
(function () {
  let GLITCH_ENABLED = false;
  try {
    GLITCH_ENABLED = new URLSearchParams(location.search).get('glitch') === '1';
  } catch (e) {}
  if (!GLITCH_ENABLED) return;

  const root = document.documentElement;
  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const WAVE_IN_MS = 1000;
  const SWEEP_MS = 1100;
  const SETTLE_MS = 300;
  const TICK_MS = 90; // ~11 mutation passes/sec -- see the phase-1 note above
  const FAILSAFE_MS = 6000;
  const SPAN_CAP = 2500;
  const STUTTER_DELAYS_MS = [200, 600, 1000, 1400]; // spread across both waves, one on each front's start
  const GLYPH_SUB_CHANCE = 0.05; // sparingly -- corruption, not noise
  const FLICKER_CHANCE = 0.03; // proportion of eligible chars picked as flickering
  const FLICKER_MAX = 10; // hard cap regardless of pool size -- a few unstable glyphs, not noise

  // Paint-only corruption (opacity, text-shadow) costs no reflow; the rest
  // changes glyph width, so it's mixed in less often (see pickVariant).
  const PAINT_VARIANTS = ['g-bleed', 'g-faint'];
  const REFLOW_VARIANTS = [
    'g-font-fallback', 'g-font-mono', 'g-font-system',
    'g-weight-bold', 'g-weight-light', 'g-italic',
    'g-space-tight', 'g-space-loose'
  ];
  const ALL_VARIANTS = PAINT_VARIANTS.concat(REFLOW_VARIANTS);

  // Leetspeak-style lookalike digits for a small set of common letters --
  // only ever applied to a handful of characters at once (GLYPH_SUB_CHANCE),
  // so it reads as corruption rather than noise. Case is handled separately
  // by matchCase(); digits have no case of their own to carry.
  const GLYPH_SUBS = { a: '4', b: '8', e: '3', g: '9', i: '1', l: '1', o: '0', s: '5', t: '7' };

  function pickVariant() {
    const pool = Math.random() < 0.55 ? PAINT_VARIANTS : REFLOW_VARIANTS;
    return pool[(Math.random() * pool.length) | 0];
  }

  function clearVariants(el) {
    ALL_VARIANTS.forEach(v => el.classList.remove(v));
  }

  function matchCase(ch, sub) {
    return ch === ch.toUpperCase() && ch !== ch.toLowerCase() ? sub.toUpperCase() : sub;
  }

  function randomLetter(ch) {
    const upper = ch === ch.toUpperCase() && ch !== ch.toLowerCase();
    const letter = String.fromCharCode(97 + ((Math.random() * 26) | 0));
    return upper ? letter.toUpperCase() : letter;
  }

  // Picks a small, low, fixed-for-the-run subset of the pool's letter
  // characters (never #age, which already has its own haywire-digits
  // treatment) to flicker through random letters on every mutation tick
  // instead of the usual occasional digit swap -- see mutateTick and
  // applyVariant below. Chosen once, up front, so the same handful of
  // glyphs stay unstable for the whole corrupt phase rather than a
  // different random set each tick.
  function markFlickering(pool) {
    const eligible = pool.filter(u => !u.isAge && /[a-zA-Z]/.test(u.ch));
    let budget = Math.min(FLICKER_MAX, Math.round(eligible.length * FLICKER_CHANCE));
    while (budget > 0 && eligible.length) {
      const i = (Math.random() * eligible.length) | 0;
      eligible[i].flicker = true;
      eligible.splice(i, 1);
      budget--;
    }
  }

  function applyVariant(u) {
    clearVariants(u.el);
    u.el.classList.add(pickVariant());
    if (u.flicker) {
      // Unstable glyph: cycles through random letters rather than the
      // usual true-char/digit-swap choice, until the sweep resolves it.
      u.el.textContent = randomLetter(u.ch);
      return;
    }
    const sub = Math.random() < GLYPH_SUB_CHANCE ? GLYPH_SUBS[u.ch.toLowerCase()] : null;
    u.el.textContent = sub ? matchCase(u.ch, sub) : u.ch;
  }

  function scrambleAge() {
    // Same length and shape as the real string -- only the digits move --
    // so #age never reflows while it's "haywire".
    return ageString().replace(/[0-9]/g, () => String((Math.random() * 10) | 0));
  }

  function shuffleTitle(str) {
    const chars = Array.from(str);
    for (let i = chars.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      const tmp = chars[i]; chars[i] = chars[j]; chars[j] = tmp;
    }
    return chars.join('');
  }

  // One mutation pass: re-randomises a rotating slice of whatever hasn't
  // been swept clean yet (not the whole pool every tick -- see the phase-1
  // note above), keeps #age's digits haywire, and keeps the tab title
  // scrambled for as long as nothing has navigated away underneath it.
  function mutateTick(pool, ageUnit, isTitleScrambling, trueTitle) {
    // Only what's on screen and not yet resolved: units the first front
    // hasn't reached are still veiled, and re-rolling their variants would
    // change their widths and shove the visible text around ahead of a
    // front that hasn't got there yet.
    const pending = pool.filter(u => u.revealed && !u.cleaned && !u.isAge);
    if (pending.length) {
      const batchSize = Math.min(pending.length, Math.max(6, Math.round(pending.length * 0.18)));
      for (let i = 0; i < batchSize; i++) {
        applyVariant(pending[(Math.random() * pending.length) | 0]);
      }
      // Flickering units re-roll every tick regardless of the random batch
      // above -- otherwise they'd only occasionally catch its draw and read
      // as just more of the general corruption instead of a few glyphs
      // visibly, continuously unstable.
      pending.forEach(u => { if (u.flicker) applyVariant(u); });
    }
    if (ageUnit && ageUnit.revealed && !ageUnit.cleaned) {
      clearVariants(ageUnit.el);
      ageUnit.el.classList.add(pickVariant());
      ageGlitchText = scrambleAge();
    }
    if (isTitleScrambling()) {
      document.title = shuffleTitle(trueTitle);
    }
  }

  function revealUnit(u) {
    u.revealed = true;
    u.el.classList.remove('g-veiled');
  }

  function resolveUnit(u) {
    u.revealed = true;
    u.cleaned = true;
    u.el.classList.remove('g-veiled');
    clearVariants(u.el);
    if (u.isAge) {
      ageGlitchText = null;
    } else {
      u.el.textContent = u.ch;
    }
  }

  // The one mechanism behind both waves: a front that crosses the affected
  // text left to right at a constant speed over durationMs, applying `act`
  // to every unit it passes, then calling onDone.
  //
  // The front is a real x coordinate advancing linearly from the leftmost
  // unit to the rightmost, and each frame it acts on whatever is currently
  // to the left of it -- read live, not from a snapshot taken before the
  // wave started. Both halves of that matter, and both were wrong before:
  //
  //   * Advancing by x rather than by "this many units per frame" is what
  //     makes the front move at a constant speed. Resolving a fixed share of
  //     a position-sorted list per frame moves at a constant speed through
  //     the *list*, and a paragraph's characters are nothing like evenly
  //     spread across its width -- every wrapped line contributes a
  //     character to the left-hand columns and only the long ones reach the
  //     right-hand end. So the front crawled through the dense left and then
  //     covered the sparse right in a frame or two, which is exactly the
  //     "gets most of the way across, then the remainder snaps" this
  //     replaced.
  //
  //   * Reading positions live is what keeps the front where the eye sees
  //     it. Corrupted text is not the width of clean text -- half the
  //     variants swap the face or the tracking -- so every character the
  //     front resolves reflows the ones after it. Measured against a
  //     snapshot taken before the sweep, the still-corrupted tail had
  //     drifted to x=587 while the coordinates driving the front said x=824,
  //     with 10% of the pool left: a 237px lag, and the pile-up it caused at
  //     the end read as the same snap. Acting on whatever is left of the
  //     front *right now* is what "a front crossing the page" actually
  //     means, and it costs nothing to be correct about it.
  //
  // Each frame does all its rect reads first and all its mutations after, so
  // there's one forced layout per frame rather than one per unit.
  //
  // Each frame after the first runs as its own rAF callback, outside the
  // try/catch this function was called from -- wrap it here too, so a
  // runtime error partway through a wave still finishes the wave's work on
  // the spot instead of leaving text stranded until the failsafe timer.
  function waveFront(units, durationMs, act, onDone) {
    let pending = units.slice();
    let x0 = 0;
    let x1 = 0;
    pending.forEach((u, i) => {
      const x = u.el.getBoundingClientRect().x;
      if (i === 0 || x < x0) x0 = x;
      if (i === 0 || x > x1) x1 = x;
    });
    const start = performance.now();

    (function frame(now) {
      try {
        const t = Math.min(1, (now - start) / durationMs);
        const front = x0 + (x1 - x0 + 1) * t;
        if (pending.length) {
          const xs = pending.map(u => u.el.getBoundingClientRect().x);
          const rest = [];
          for (let i = 0; i < pending.length; i++) {
            if (xs[i] <= front) act(pending[i]);
            else rest.push(pending[i]);
          }
          pending = rest;
        }
        if (t < 1) {
          requestAnimationFrame(frame);
        } else {
          // Anything the front never caught -- a unit that reflowed out past
          // where the right edge was when the wave started -- is finished
          // here rather than left behind.
          pending.forEach(act);
          pending = [];
          onDone();
        }
      } catch (e) {
        pending.forEach(act);
        pending = [];
        onDone();
      }
    })(start);
  }

  let activeCleanup = null;

  function run() {
    if (prefersReducedMotion()) {
      root.classList.remove('glitch-intro');
      return;
    }
    if (activeCleanup) { activeCleanup(); activeCleanup = null; }
    try {
      doRun();
    } catch (e) {
      root.classList.remove('glitch-intro');
      ageGlitchText = null;
    }
  }

  function doRun() {
    const hosts = [
      { el: document.querySelector('.sidebar') },
      { el: document.querySelector('.panel.is-active') },
      { el: document.querySelector('.footer') }
    ].filter(h => h.el);

    if (!hosts.length) {
      root.classList.remove('glitch-intro');
      return;
    }

    // Captured before any splitting touches the DOM, so an error partway
    // through the split below still has a complete, safe set to restore.
    hosts.forEach(h => { h.html = h.el.innerHTML; });

    try {
      const budget = { remaining: SPAN_CAP };
      const pool = [];
      hosts.forEach(h => {
        splitIntoChars(h.el, 'glitch-char', budget).forEach(el => {
          pool.push({ el, isAge: el.id === 'age', ch: el.id === 'age' ? '' : el.textContent, revealed: false, cleaned: false, flicker: false });
        });
      });
      markFlickering(pool);
      startSequence(hosts, pool);
    } catch (e) {
      hosts.forEach(h => { h.el.innerHTML = h.html; });
      root.classList.remove('glitch-intro');
      ageGlitchText = null;
    }
  }

  function startSequence(hosts, pool) {
    const ageUnit = pool.find(u => u.isAge) || null;
    const trueTitle = document.title;
    let titleScrambling = true;
    let done = false;
    let mutateTimer = null;
    const timers = [];

    function cleanup() {
      if (done) return;
      done = true;
      if (activeCleanup === cleanup) activeCleanup = null;
      timers.forEach(clearTimeout);
      if (mutateTimer) clearInterval(mutateTimer);
      window.removeEventListener('hashchange', onNavigate);
      ageGlitchText = null;
      if (titleScrambling) document.title = trueTitle;
      hosts.forEach(h => { h.el.innerHTML = h.html; });
      root.classList.remove('glitch-intro');
    }
    activeCleanup = cleanup;

    // The user navigated to a different panel mid-sequence (vanishingly
    // rare -- this only ever runs in the first ~2.4s of a load): the router
    // has already set the correct title for wherever they went, so don't
    // fight it by restoring the stale one this run captured.
    function onNavigate() {
      titleScrambling = false;
      cleanup();
    }
    window.addEventListener('hashchange', onNavigate, { once: true });

    // Failsafe: force a clean restore if the sequence ever stalls.
    timers.push(setTimeout(cleanup, FAILSAFE_MS));

    // A few globe rotation jumps through phase 1 (silent no-op if the globe
    // isn't up or its rail is hidden -- see glitchStutter() in globe.js),
    // left to ease themselves back to true rotation on their own timeline so
    // the globe reads as settling across the same window the text sweep
    // resolves in, rather than snapping back at some unrelated moment.
    STUTTER_DELAYS_MS.forEach(ms => {
      timers.push(setTimeout(() => {
        try { window.globe?.glitchStutter?.(); } catch (e) {}
      }, ms));
    });

    // Everything is split and (if this is the page's first run) pre-hidden
    // via .glitch-intro -- corrupt it and veil it before lifting that, so
    // the hosts come back with their non-text furniture (the theme toggle,
    // the icons) in place and every split character still to arrive. The
    // veil is per-character opacity, applied while the layout is already
    // final, so the first front reveals text into space that was always
    // there rather than growing lines out from the left.
    pool.forEach(u => {
      if (!u.isAge) applyVariant(u);
      u.el.classList.add('g-veiled');
    });
    if (ageUnit) {
      clearVariants(ageUnit.el);
      ageUnit.el.classList.add(pickVariant());
      ageGlitchText = scrambleAge();
    }
    root.classList.remove('glitch-intro');

    mutateTimer = setInterval(() => {
      try {
        mutateTick(pool, ageUnit, () => titleScrambling, trueTitle);
      } catch (e) {
        cleanup();
      }
    }, TICK_MS);

    // Wave in, then -- from inside the first front's completion, so there is
    // no timer and no gap between them -- wave through.
    try {
      waveFront(pool, WAVE_IN_MS, revealUnit, () => {
        try {
          titleScrambling = false;
          document.title = trueTitle;
          waveFront(pool, SWEEP_MS, resolveUnit, () => {
            if (mutateTimer) { clearInterval(mutateTimer); mutateTimer = null; }
            timers.push(setTimeout(cleanup, SETTLE_MS));
          });
        } catch (e) {
          cleanup();
        }
      });
    } catch (e) {
      cleanup();
    }
  }

  if (root.classList.contains('glitch-intro')) run();

  // Test-only replay, so the effect can be watched repeatedly without a
  // full reload: press "r" (no modifiers, and not while focus is in a form
  // field -- this site has none today, but it costs nothing to check) or
  // click the small control this adds in the corner. Both only ever exist
  // behind the same ?glitch=1 flag that gates the whole module above, so
  // neither the binding nor the control exists on the normal page.
  window.addEventListener('keydown', e => {
    if (e.key.toLowerCase() !== 'r' || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    run();
  });

  const replayBtn = document.createElement('button');
  replayBtn.type = 'button';
  replayBtn.className = 'glitch-replay';
  replayBtn.textContent = 'replay glitch (r)';
  replayBtn.setAttribute('aria-label', 'Replay the glitch intro effect');
  replayBtn.addEventListener('click', run);
  document.body.appendChild(replayBtn);
})();

// Load achievements and grades from config
function loadAchievements() {
  // Hackathon counter
  const hackathonCount = document.getElementById('hackathonCount');
  if (hackathonCount && config.achievements) {
    hackathonCount.textContent = config.achievements.hackathons;
  }

  // Roles list
  const rolesList = document.getElementById('rolesList');
  if (rolesList && config.achievements && config.achievements.roles) {
    config.achievements.roles.forEach(role => {
      const roleItem = document.createElement('li');
      roleItem.className = 'data-row';
      roleItem.innerHTML = `
        <span class="data-title">${role.title}</span>
        ${role.organization ? `<span class="data-detail">${role.organization}</span>` : ''}
      `;
      rolesList.appendChild(roleItem);
    });
  }

  // Grades list grouped by university year
  const gradesList = document.getElementById('gradesList');
  if (gradesList && (config.gradesByYear || config.grades)) {
    const gradesByYear = config.gradesByYear || { "Year 1": config.grades };
    gradesList.className = 'grade-years';

    Object.entries(gradesByYear).forEach(([year, grades]) => {
      const yearSection = document.createElement('section');
      yearSection.className = 'grade-year';

      const yearTitle = document.createElement('h4');
      yearTitle.className = 'mono-label';
      yearTitle.textContent = year.toLowerCase();
      yearSection.appendChild(yearTitle);

      if (grades === null) {
        // Explicit null = placement year placeholder
        const placeholder = document.createElement('p');
        placeholder.className = 'grade-empty grade-placement';
        placeholder.textContent = 'currently on placement, year 3 soon…';
        yearSection.appendChild(placeholder);
      } else if (!grades || grades.length === 0) {
        const emptyState = document.createElement('p');
        emptyState.className = 'grade-empty';
        emptyState.textContent = 'No modules added yet.';
        yearSection.appendChild(emptyState);
      } else {
        const yearList = document.createElement('ul');
        yearList.className = 'grade-rows';

        grades.forEach(item => {
          const gradeItem = document.createElement('li');
          gradeItem.className = item.grade >= 70 ? 'grade-row is-first' : 'grade-row';
          gradeItem.style.setProperty('--grade', item.grade);

          gradeItem.innerHTML = `
            <span class="grade-subject">${item.subject}</span>
            <span class="grade-bar" aria-hidden="true"><span class="grade-fill"></span></span>
            <span class="grade-num">${item.grade}%</span>
          `;
          yearList.appendChild(gradeItem);
        });

        yearSection.appendChild(yearList);
      }

      gradesList.appendChild(yearSection);
    });
  }
}

// Load tech stack from config
function loadTechStack() {
  if (!config.tech) return;

  // Languages
  const langContainer = document.getElementById('techLanguages');
  if (langContainer && config.tech.languages) {
    config.tech.languages.forEach(lang => {
      const item = document.createElement('li');
      item.textContent = lang;
      langContainer.appendChild(item);
    });
  }

  // Tools
  const toolsContainer = document.getElementById('techTools');
  if (toolsContainer && config.tech.tools) {
    config.tech.tools.forEach(tool => {
      const item = document.createElement('li');
      item.textContent = tool;
      toolsContainer.appendChild(item);
    });
  }
}

// Load achievements and tech stack when page loads
if (typeof config !== 'undefined') {
  loadAchievements();
  loadTechStack();
}

// Copy to clipboard, then open the mail client -- the mailto: trigger waits
// for the copy attempt to settle (not race ahead of it), but runs whether
// that attempt succeeded or failed, so a clipboard error never blocks the
// mail app from opening.
function copyToClipboard(text, button) {
  const textSpan = button.querySelector('.copy-text');
  const originalText = textSpan.textContent;

  // Reserve the button's footprint so the shorter "copied" state does not
  // shift layout; ceil avoids a fractional-px squeeze that wrapped the hint.
  if (!button.style.minWidth) {
    button.style.minWidth = Math.ceil(button.getBoundingClientRect().width) + 'px';
  }

  // Try modern clipboard API first
  const attempt = (navigator.clipboard && navigator.clipboard.writeText)
    ? navigator.clipboard.writeText(text).then(
        () => showCopied(textSpan, originalText, button),
        () => fallbackCopy(text, textSpan, originalText, button)
      )
    : Promise.resolve(fallbackCopy(text, textSpan, originalText, button));

  Promise.resolve(attempt).finally(() => openMailClient(text));
}

function openMailClient(address) {
  window.location.href = 'mailto:' + address;
}

function fallbackCopy(text, textSpan, originalText, button) {
  // Fallback method using textarea
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showCopied(textSpan, originalText, button);
  } catch (err) {
    console.error('Failed to copy:', err);
    textSpan.textContent = 'Copy failed';
    setTimeout(() => {
      textSpan.textContent = originalText;
    }, 2000);
  }
  
  document.body.removeChild(textarea);
}

function showCopied(textSpan, originalText, button) {
  textSpan.textContent = 'copied';
  button.classList.add('copied');

  setTimeout(() => {
    textSpan.textContent = originalText;
    button.classList.remove('copied');
  }, 2000);
}


// VISITOR LOCATION TRACKING
// When config.visitsApi is set, visits are shared through a Cloudflare Worker
// and every viewer sees everyone from the last 24 hours. Without it, the globe
// falls back to this browser's own localStorage history (also 24h-filtered).
// No IP addresses are stored in either mode.

const DAY_MS = 24 * 60 * 60 * 1000;
let visitorsCache = [];

// Server entry { t, lat, lon, city, country } -> the shape globe.js expects
function mapEntry(e, isSelf) {
  return {
    timestamp: new Date(e.t).toISOString(),
    latitude: e.lat,
    longitude: e.lon,
    city: e.city || '',
    country: e.country || '',
    isSelf: !!isSelf
  };
}

function cellKey(lat, lon) {
  return lat.toFixed(1) + ',' + lon.toFixed(1);
}

function publishVisitors(self, others) {
  const list = [];
  const seen = new Set();
  if (self) {
    list.push(mapEntry(self, true));
    seen.add(cellKey(self.lat, self.lon));
  }
  others.forEach(e => {
    if (!Number.isFinite(e.lat) || !Number.isFinite(e.lon)) return;
    const key = cellKey(e.lat, e.lon);
    if (seen.has(key)) return;
    seen.add(key);
    list.push(mapEntry(e, false));
  });
  visitorsCache = list;
  window.dispatchEvent(new CustomEvent('visitorLocationUpdated', {
    detail: { visitor: list[0] || null, allVisitors: visitorsCache }
  }));
}

async function trackSharedVisits(api) {
  const cached = sessionStorage.getItem('visitSelf');
  if (cached === null) {
    // First load this session: record the visit; the response carries our own
    // geo plus everyone else, so no follow-up read is needed.
    const res = await fetch(api + '/visit', { method: 'POST' });
    if (!res.ok) throw new Error('visit POST failed: ' + res.status);
    const data = await res.json();
    sessionStorage.setItem('visitSelf', JSON.stringify(data.self));
    publishVisitors(data.self, data.others || []);
  } else {
    const res = await fetch(api + '/visits');
    if (!res.ok) throw new Error('visits GET failed: ' + res.status);
    const data = await res.json();
    const self = cached === 'null' ? null : JSON.parse(cached);
    let visitors = data.visitors || [];
    if (self) {
      // Our own stored record comes back in the list; drop at most one match
      // so we are not drawn twice.
      const i = visitors.findIndex(v => v.t === self.t);
      if (i !== -1) visitors = visitors.slice(0, i).concat(visitors.slice(i + 1));
    }
    publishVisitors(self, visitors);
  }
}

// ---- localStorage fallback (no backend configured) ----

function getVisitorData() {
  const data = localStorage.getItem('visitorLocations');
  return data ? JSON.parse(data) : { visitors: [], lastUpdate: null };
}

function saveVisitorData(data) {
  localStorage.setItem('visitorLocations', JSON.stringify(data));
}

function recentLocalVisitors() {
  const cutoff = Date.now() - DAY_MS;
  return getVisitorData().visitors.filter(v => {
    const t = Date.parse(v.timestamp);
    return Number.isFinite(t) && t > cutoff;
  });
}

function publishLocal() {
  visitorsCache = recentLocalVisitors().map((v, i) => {
    if (i === 0) v.isSelf = true;
    return v;
  });
  window.dispatchEvent(new CustomEvent('visitorLocationUpdated', {
    detail: { visitor: visitorsCache[0] || null, allVisitors: visitorsCache }
  }));
}

async function trackLocalVisit() {
  if (sessionStorage.getItem('locationTracked')) {
    publishLocal();
    return;
  }
  const data = getVisitorData();
  try {
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
    const loc = await response.json();
    data.visitors.unshift({
      timestamp: new Date().toISOString(),
      country: loc.country_name || 'Unknown',
      countryCode: loc.country_code || 'XX',
      city: loc.city || 'Unknown',
      region: loc.region || '',
      latitude: loc.latitude || 0,
      longitude: loc.longitude || 0,
      timezone: loc.timezone || ''
    });
  } catch (error) {
    console.warn('Location lookup failed:', error);
    data.visitors.unshift({
      timestamp: new Date().toISOString(),
      country: 'Unknown',
      countryCode: 'XX',
      city: 'Unknown',
      latitude: 0,
      longitude: 0
    });
  }
  data.visitors = data.visitors.slice(0, 50);
  data.lastUpdate = new Date().toISOString();
  saveVisitorData(data);
  sessionStorage.setItem('locationTracked', 'true');
  publishLocal();
}

function trackVisitorLocation() {
  const api = (typeof config !== 'undefined' && config.visitsApi) ? config.visitsApi : '';
  if (api) {
    trackSharedVisits(api).catch(error => {
      console.warn('Shared visit tracking failed:', error);
      window.dispatchEvent(new CustomEvent('visitorLocationUpdated', {
        detail: { visitor: visitorsCache[0] || null, allVisitors: visitorsCache }
      }));
    });
  } else {
    trackLocalVisit();
  }
}

function getAllVisitors() {
  return visitorsCache;
}

function clearVisitorData() {
  localStorage.removeItem('visitorLocations');
  sessionStorage.removeItem('locationTracked');
  sessionStorage.removeItem('visitSelf');
  visitorsCache = [];
  console.log('Visitor data cleared');
}

// Seed the cache so the globe has dots as soon as it draws, before the
// tracking round-trip completes.
if (!(typeof config !== 'undefined' && config.visitsApi)) {
  visitorsCache = recentLocalVisitors();
}

// Auto-track location once the page is interactive. The old two-second wait
// after `load` was what made the visitor dot pop in well after the globe
// itself; a short defer is enough to stay out of the way of first paint.
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(trackVisitorLocation, 300);
});

// Expose functions globally for debugging and globe integration
window.visitorTracking = {
  getAllVisitors,
  clearVisitorData,
  getVisitorData,
  trackVisitorLocation
};
