// ==========================================
// 3D GLOBE VISUALIZATION - ink-line cartography
// ==========================================

let camera, scene, renderer;
let globeGroup;
let visitorMarkers = [];
let globeVisible = false;
let globeContainer = null;
let lastGlobeW = 0;
let lastGlobeH = 0;
const GLOBE_RADIUS = 100;
const REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// The globe's own true, undisturbed rotation, and a transient offset the
// glitch intro's stutter hook (see glitchStutter() below) layers on top and
// eases back out of -- kept apart so the correction itself is just this
// offset decaying to 0 against a rotation that never stopped advancing,
// rather than a second jump.
let baseRotationY = 0;
let stutterOffset = 0;

// A brief on-screen position jump, layered the same way as stutterOffset
// above (a transient offset the render loop eases back to 0 every frame)
// but applied as a CSS transform on the container rather than anything
// inside the scene, so it moves the whole globe box -- reads as the globe
// itself glitching in place, not the camera or geometry doing something odd.
let teleportX = 0;
let teleportY = 0;

// Palette (matches style.css tokens). Resolved from the live CSS custom
// properties at init, and again on refreshTheme(), so the globe follows
// the active light/dark theme instead of hardcoding the light-mode hex
// values.
let INK = 0x1A1813;
let GREEN = 0x2F5D43;

// For unregistered custom properties getComputedStyle returns the token as
// authored (a hex string here, e.g. "#2F5D43"), not a normalized rgb() —
// so handle #RGB/#RRGGBB explicitly and keep rgb()/rgba() as a second path.
function cssColorToHex(value, fallback) {
  if (!value) return fallback;
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    return parseInt(h, 16);
  }
  const rgb = value.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (rgb) {
    const [r, g, b] = rgb.slice(1).map(n => Math.max(0, Math.min(255, Math.round(parseFloat(n)))));
    return (r << 16) | (g << 8) | b;
  }
  return fallback;
}

function readPalette() {
  const style = getComputedStyle(document.documentElement);
  INK = cssColorToHex(style.getPropertyValue('--ink').trim(), INK);
  GREEN = cssColorToHex(style.getPropertyValue('--green').trim(), GREEN);
}

// Three.js bakes `color` into a material at construction time, so flipping
// the CSS theme later never touches materials already built from it. Every
// themed material is created through themedMaterial() instead of `new
// THREE.XMaterial(...)` directly, so it's registered here by role ('ink' |
// 'green') and can't be forgotten at a call site; refreshTheme() then walks
// the registry and repaints each one in place. Entries must be dropped when
// their mesh is torn down (see disposeMarker) or this grows for as long as
// the tab stays open.
const themedMaterials = [];

function themedMaterial(Ctor, role, params) {
  const material = new Ctor(Object.assign({ color: role === 'green' ? GREEN : INK }, params));
  themedMaterials.push({ material, role });
  return material;
}

function untrackThemedMaterial(material) {
  const i = themedMaterials.findIndex(entry => entry.material === material);
  if (i !== -1) themedMaterials.splice(i, 1);
}

function refreshTheme() {
  readPalette();
  themedMaterials.forEach(({ material, role }) => {
    material.color.setHex(role === 'green' ? GREEN : INK);
  });
  syncGlobeDebugHooks();
}

// Test hook: material colors live inside WebGL and are otherwise
// unobservable from outside (mirrors the marker-count hooks below).
function syncGlobeDebugHooks() {
  window.__globeMaterialColors = themedMaterials.map(({ material, role }) => ({ role, hex: material.color.getHex() }));
}

// Applies one random rotation jump and one random position jump together,
// both eased back out over subsequent frames by the decay in animateGlobe()
// rather than snapped back in one step -- called a few times by the glitch
// intro's corrupt phase (see script.js) so the globe reads as caught up in
// the same misregistration as the text (a rotation stutter plus a brief
// teleport), without the correction itself looking like a second glitch.
// Silent no-op if the globe hasn't initialised yet or its rail is hidden --
// callers use it as a fire-and-forget hook, same as refreshTheme().
function glitchStutter() {
  if (!globeGroup || !globeVisible || REDUCED_MOTION) return;
  stutterOffset += (Math.random() - 0.5) * 0.5;
  teleportX += (Math.random() - 0.5) * 36;
  teleportY += (Math.random() - 0.5) * 36;
}

// Handed to script.js's theme toggle (and, for glitchStutter, the glitch
// intro) so each can drive the already-built globe from outside without
// reaching into its internals -- the same way visitorTracking is handed the
// other way for globe.js to pull visitor data from.
window.globe = { refreshTheme, glitchStutter };

function initGlobe(container, width, height) {
  readPalette();

  // Scene setup
  scene = new THREE.Scene();
  globeGroup = new THREE.Group();
  scene.add(globeGroup);
  camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
  camera.position.set(0, 60, 240);
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Load GeoJSON and create globe
  loadGlobeFromGeoJSON();

  // Start animation
  animateGlobe();

  // Listen for visitor updates
  window.addEventListener('visitorLocationUpdated', updateVisitorMarkers);
}

// This file's own cache-busting query string, reused below for the three.js
// tag it creates -- so bumping the site-wide ?v= only ever means touching
// index.html, not also a hardcoded copy of the same version living here.
const CACHE_BUST = (document.currentScript && document.currentScript.src.split('?')[1]) || '';

let geoJsonReady = null;
let threeReady = null;

// Start the map download the moment the globe is actually going to be
// needed (see GLOBE_MQ below), rather than waiting on three.js or on
// initGlobe. Kept as a lazy starter rather than firing at module scope
// unconditionally: .globe-rail is display:none below 1440px, so on every
// phone and small-laptop visit this 99KB was downloaded for a globe that
// would never draw. Once GLOBE_MQ matches, this still starts as early as
// it did before (synchronously, in parallel with three.js) -- see boot()
// below -- so the desktop timing this was written for is unchanged.
function ensureGeoJson() {
  if (!geoJsonReady) {
    geoJsonReady = fetch('custom.geo.json').then(response => response.json());
  }
  return geoJsonReady;
}

// Loads three.js itself, once. The static <script> tag this replaced ran on
// every device via `defer`; three.js is ~600KB, six times the map's own
// weight, so it's the one worth actually gating rather than just starting
// early -- see GLOBE_MQ below for where that gate lives.
function loadThree() {
  if (!threeReady) {
    threeReady = new Promise((resolve, reject) => {
      if (typeof THREE !== 'undefined') { resolve(); return; }
      const script = document.createElement('script');
      script.src = 'vendor/three.min.js' + (CACHE_BUST ? '?' + CACHE_BUST : '');
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('three.js failed to load'));
      document.head.appendChild(script);
    });
  }
  return threeReady;
}

function loadGlobeFromGeoJSON() {
  ensureGeoJson()
    .then(data => {
      createGlobeFromGeoJSON(data);
      updateVisitorMarkers();
      markGlobeDrawn();
    })
    .catch(error => {
      console.warn('GeoJSON load failed, using simple globe');
      createSimpleGlobe();
      updateVisitorMarkers();
      markGlobeDrawn();
    });
}

// Reveal on the frame after the geometry exists, so the fade covers a drawn
// globe rather than an empty canvas.
function markGlobeDrawn() {
  requestAnimationFrame(() => {
    if (globeContainer) globeContainer.classList.add('is-drawn');
  });
}

function latLonToVector3(lat, lon, radius) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function createGlobeFromGeoJSON(geojson) {
  const lineMaterial = themedMaterial(THREE.LineBasicMaterial, 'ink', {
    opacity: 0.5,
    transparent: true,
    linewidth: 1
  });

  geojson.features.forEach(feature => {
    if (feature.geometry.type === 'Polygon') {
      feature.geometry.coordinates.forEach(ring => {
        createLineFromCoordinates(ring, lineMaterial);
      });
    } else if (feature.geometry.type === 'MultiPolygon') {
      feature.geometry.coordinates.forEach(polygon => {
        polygon.forEach(ring => {
          createLineFromCoordinates(ring, lineMaterial);
        });
      });
    }
  });

  // Add subtle grid lines
  createGridLines();
}

function createLineFromCoordinates(coordinates, material) {
  const points = [];

  coordinates.forEach(coord => {
    const [lon, lat] = coord;
    const vector = latLonToVector3(lat, lon, GLOBE_RADIUS);
    points.push(vector);
  });

  if (points.length > 1) {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, material);
    globeGroup.add(line);
  }
}

function createGridLines() {
  const gridMaterial = themedMaterial(THREE.LineBasicMaterial, 'ink', {
    opacity: 0.08,
    transparent: true
  });

  // Latitude lines
  for (let lat = -80; lat <= 80; lat += 20) {
    const points = [];
    for (let lon = -180; lon <= 180; lon += 5) {
      points.push(latLonToVector3(lat, lon, GLOBE_RADIUS));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, gridMaterial);
    globeGroup.add(line);
  }

  // Longitude lines
  for (let lon = -180; lon < 180; lon += 20) {
    const points = [];
    for (let lat = -90; lat <= 90; lat += 5) {
      points.push(latLonToVector3(lat, lon, GLOBE_RADIUS));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geometry, gridMaterial);
    globeGroup.add(line);
  }
}

function createSimpleGlobe() {
  createGridLines();
}

// Markers are rebuilt from scratch on every visitor-list update, so their
// materials must drop out of the theme registry here (and release their
// GPU resources) or both leak for as long as the tab stays open.
function disposeMarker(marker) {
  globeGroup.remove(marker);
  untrackThemedMaterial(marker.material);
  marker.material.dispose();
  if (marker.userData.glow) {
    untrackThemedMaterial(marker.userData.glow.material);
    marker.userData.glow.material.dispose();
  }
}

function updateVisitorMarkers() {
  visitorMarkers.forEach(disposeMarker);
  visitorMarkers = [];

  const visitors = window.visitorTracking ? window.visitorTracking.getAllVisitors() : [];

  visitors.slice(0, 20).forEach(v => {
    if (Number.isFinite(v.latitude) && Number.isFinite(v.longitude)) {
      const marker = createVisitorMarker(v.latitude, v.longitude, v.isSelf === true);
      visitorMarkers.push(marker);
      globeGroup.add(marker);
    }
  });
  // Test hooks: markers live inside WebGL and are otherwise unobservable.
  window.__globeMarkerCount = visitorMarkers.length;
  window.__globeHasCurrent = visitorMarkers.some(m => m.userData.isCurrent);
  syncGlobeDebugHooks();
}

function createVisitorMarker(lat, lon, isCurrent = false) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);

  const x = -GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
  const y = GLOBE_RADIUS * Math.cos(phi);
  const z = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);

  const geometry = new THREE.SphereGeometry(isCurrent ? 3 : 2, 16, 16);
  const material = themedMaterial(THREE.MeshBasicMaterial, isCurrent ? 'green' : 'ink', {
    transparent: true,
    opacity: isCurrent ? 1 : 0.45
  });

  const marker = new THREE.Mesh(geometry, material);
  marker.position.set(x, y, z);

  if (isCurrent) {
    const glowGeometry = new THREE.SphereGeometry(5, 16, 16);
    const glowMaterial = themedMaterial(THREE.MeshBasicMaterial, 'green', {
      transparent: true,
      opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    marker.add(glow);
    marker.userData.glow = glow; // Store reference for pulsating
    marker.userData.isCurrent = true;
  }

  return marker;
}

function animateGlobe() {
  requestAnimationFrame(animateGlobe);

  // Skip work entirely while the rail is hidden or the tab is backgrounded
  if (!globeVisible || document.hidden) return;

  // Track the container size every frame so any layout-driven resize
  // (window resize, sidebar/rail becoming visible, etc.) is picked up and
  // applied smoothly rather than snapping on the next render.
  if (globeContainer) {
    const w = globeContainer.clientWidth;
    const h = globeContainer.clientHeight;
    if (w > 0 && h > 0 && (w !== lastGlobeW || h !== lastGlobeH)) {
      lastGlobeW = w;
      lastGlobeH = h;
      onGlobeResize(w, h);
    }
  }

  if (globeGroup && !REDUCED_MOTION) {
    baseRotationY += 0.001; // Slow rotation
    if (stutterOffset !== 0) {
      stutterOffset *= 0.85;
      if (Math.abs(stutterOffset) < 0.0005) stutterOffset = 0;
    }
    globeGroup.rotation.y = baseRotationY + stutterOffset;
  }

  if (globeContainer && !REDUCED_MOTION && (teleportX !== 0 || teleportY !== 0)) {
    teleportX *= 0.8;
    teleportY *= 0.8;
    if (Math.abs(teleportX) < 0.3) teleportX = 0;
    if (Math.abs(teleportY) < 0.3) teleportY = 0;
    globeContainer.style.transform = (teleportX || teleportY)
      ? `translate(${teleportX.toFixed(1)}px, ${teleportY.toFixed(1)}px)`
      : '';
  }

  // Pulsate current visitor marker
  if (!REDUCED_MOTION) {
    const time = Date.now() * 0.003;
    visitorMarkers.forEach(m => {
      if (m.userData.isCurrent) {
        const scale = 1 + Math.sin(time) * 0.3;
        m.scale.set(scale, scale, scale);
        if (m.userData.glow) {
          m.userData.glow.material.opacity = 0.2 + Math.sin(time) * 0.2;
        }
      }
    });
  }

  renderer.render(scene, camera);
}

function onGlobeResize(width, height) {
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// .globe-rail is display:none below 1440px (see style.css), so below that
// width #globeViz never has layout size and nothing here should even ask
// for three.js. matchMedia rather than a one-off innerWidth check so a
// desktop window resized up across the breakpoint later still picks the
// globe up, not just a page freshly loaded above it.
const GLOBE_MQ = window.matchMedia('(min-width: 1440px)');

// Boots the globe once the rail can actually be seen: loads three.js and
// the map geometry together (each starts as early as it did before this
// gate existed -- see loadThree() and ensureGeoJson() above), then falls
// back to the pre-three.js lazy-init behaviour of only creating the WebGL
// context once #globeViz genuinely has layout size. Set up as soon as this
// deferred script runs (the DOM is parsed) rather than waiting for `load`,
// which waits on every image, font and analytics request and delayed the
// globe long after the rest of the page had settled.
(() => {
  const container = document.getElementById('globeViz');
  globeContainer = container;
  if (!container) return;

  let booted = false;
  let initialized = false;

  function boot() {
    if (booted) return;
    booted = true;
    Promise.all([loadThree(), ensureGeoJson()])
      .then(() => {
        new ResizeObserver(entries => {
          const { width, height } = entries[0].contentRect;
          globeVisible = width > 0 && height > 0;
          if (!globeVisible) return;

          if (!initialized) {
            initialized = true;
            initGlobe(container, width, height);
          }
          // Ongoing resizes (window resize, tab-switch globe transition) are
          // applied inside the render loop so setSize and render happen in
          // the same frame -- resizing here, a frame before the redraw,
          // caused a visible flash.
        }).observe(container);
      })
      .catch(error => {
        console.error('Globe setup failed:', error);
      });
  }

  function sync() {
    // Once loaded, stay loaded rather than tearing down a live WebGL
    // context if the window narrows again -- the CSS already hides the
    // rail below the breakpoint regardless.
    if (GLOBE_MQ.matches) boot();
  }

  sync();
  if (typeof GLOBE_MQ.addEventListener === 'function') {
    GLOBE_MQ.addEventListener('change', sync);
  }
})();
