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

// Handed to script.js's theme toggle so it can repaint the already-built
// globe after a light/dark switch, the same way visitorTracking is handed
// the other way for globe.js to pull visitor data from.
window.globe = { refreshTheme };

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

  console.log('Globe initialized successfully');
}

// Start the map download the moment this file runs, rather than inside
// initGlobe. This script is deferred, so that's still before the page has
// finished loading -- the 99KB fetch then overlaps images, fonts and
// three.js instead of queueing behind all of them, which is what made the
// globe show up whole seconds after everything else had settled.
const geoJsonReady = fetch('custom.geo.json').then(response => response.json());

function loadGlobeFromGeoJSON() {
  geoJsonReady
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
  
  console.log('Globe created from GeoJSON');
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
  console.log('Simple globe created');
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
    globeGroup.rotation.y += 0.001; // Slow rotation
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

// Initialize lazily: a ResizeObserver fires only when #globeViz actually has
// layout size, so hidden viewports (<1200px) never create a WebGL context.
//
// Set up as soon as this deferred script runs (the DOM is parsed and
// three.js, also deferred, has already executed) rather than waiting for
// `load`. `load` waits on every image, font and analytics request, which
// delayed the globe long after the rest of the page had settled.
(() => {
  const container = document.getElementById('globeViz');
  globeContainer = container;

  if (!container || typeof THREE === 'undefined') {
    console.error('Globe setup failed:', { container: !!container, THREE: typeof THREE });
    return;
  }

  let initialized = false;
  new ResizeObserver(entries => {
    const { width, height } = entries[0].contentRect;
    globeVisible = width > 0 && height > 0;
    if (!globeVisible) return;

    if (!initialized) {
      initialized = true;
      initGlobe(container, width, height);
    }
    // Ongoing resizes (window resize, tab-switch globe transition) are applied
    // inside the render loop so setSize and render happen in the same frame —
    // resizing here, a frame before the redraw, caused a visible flash.
  }).observe(container);
})();
