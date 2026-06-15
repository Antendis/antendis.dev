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

// Palette (matches style.css tokens)
const INK = 0x1A1813;
const GREEN = 0x2F5D43;

function initGlobe(container, width, height) {
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

function loadGlobeFromGeoJSON() {
  fetch('custom.geo.json')
    .then(response => response.json())
    .then(data => {
      createGlobeFromGeoJSON(data);
      updateVisitorMarkers();
    })
    .catch(error => {
      console.warn('GeoJSON load failed, using simple globe');
      createSimpleGlobe();
      updateVisitorMarkers();
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
  const lineMaterial = new THREE.LineBasicMaterial({
    color: INK,
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
  const gridMaterial = new THREE.LineBasicMaterial({
    color: INK,
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

function updateVisitorMarkers() {
  visitorMarkers.forEach(m => globeGroup.remove(m));
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
}

function createVisitorMarker(lat, lon, isCurrent = false) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
  const y = GLOBE_RADIUS * Math.cos(phi);
  const z = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);

  const geometry = new THREE.SphereGeometry(isCurrent ? 3 : 2, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: isCurrent ? GREEN : INK,
    transparent: true,
    opacity: isCurrent ? 1 : 0.45
  });
  
  const marker = new THREE.Mesh(geometry, material);
  marker.position.set(x, y, z);

  if (isCurrent) {
    const glowGeometry = new THREE.SphereGeometry(5, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: GREEN,
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

  // Track the container size every frame so CSS size transitions (the globe
  // shrinking/growing when switching to/from the university tab) render
  // smoothly rather than snapping at the end of the transition.
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
window.addEventListener('load', () => {
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
});
