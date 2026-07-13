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
    // Expose active panel on <html> so CSS can drive rail-extra visibility
    // and any other panel-specific styles without extra JS.
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

// Dynamic age calculation

function updateAge() {
  const birthDate = new Date('2003-05-22');
  const now = new Date();
  const ageInMilliseconds = now - birthDate;
  const ageInYears = ageInMilliseconds / (365.25 * 24 * 60 * 60 * 1000);
  const ageElement = document.getElementById('age');
  if (ageElement) {
    ageElement.textContent = `${ageInYears.toFixed(9)} years old`;
  }
  requestAnimationFrame(updateAge);
}

// Start age animation
updateAge();

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
        placeholder.textContent = 'on placement currently, year 3 soon…';
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

  // AI/ML
  const aimlContainer = document.getElementById('techAiml');
  if (aimlContainer && config.tech.aiml) {
    config.tech.aiml.forEach(tech => {
      const item = document.createElement('li');
      item.textContent = tech;
      aimlContainer.appendChild(item);
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

// Copy to clipboard function
function copyToClipboard(text, button) {
  const textSpan = button.querySelector('.copy-text');
  const originalText = textSpan.textContent;
  
  // Reserve the button's footprint so the shorter "copied" state does not
  // shift layout; ceil avoids a fractional-px squeeze that wrapped the hint.
  if (!button.style.minWidth) {
    button.style.minWidth = Math.ceil(button.getBoundingClientRect().width) + 'px';
  }
  
  // Try modern clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopied(textSpan, originalText, button);
    }).catch(err => {
      fallbackCopy(text, textSpan, originalText, button);
    });
  } else {
    fallbackCopy(text, textSpan, originalText, button);
  }
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

// Auto-track location when page loads
window.addEventListener('load', () => {
  setTimeout(() => {
    trackVisitorLocation();
  }, 2000);
});

// Expose functions globally for debugging and globe integration
window.visitorTracking = {
  getAllVisitors,
  clearVisitorData,
  getVisitorData,
  trackVisitorLocation
};
