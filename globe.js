// ==========================================
// 3D GLOBE VISUALIZATION - GitHub Style
// ==========================================

let camera, scene, renderer;
let globeGroup;
let visitorMarkers = [];
const GLOBE_RADIUS = 100;

function initGlobe() {
  const container = document.getElementById('globeViz');
  
  if (!container || typeof THREE === 'undefined') {
    console.error('Globe setup failed:', { container: !!container, THREE: typeof THREE });
    return;
  }

  const width = container.clientWidth;
  const height = container.clientHeight;
  
  if (width === 0 || height === 0) {
    setTimeout(initGlobe, 100);
    return;
  }

  // Scene setup
  scene = new THREE.Scene();
  globeGroup = new THREE.Group();
  scene.add(globeGroup);
  camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
  camera.position.set(0, 60, 240);
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Load GeoJSON and create globe
  loadGlobeFromGeoJSON();

  // Window resize
  window.addEventListener('resize', onGlobeResize);

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
    color: 0x34d399,
    opacity: 0.4,
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
    color: 0x34d399,
    opacity: 0.15,
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
  
  visitors.slice(0, 20).forEach((v, i) => {
    if (v.latitude && v.longitude) {
      const marker = createVisitorMarker(v.latitude, v.longitude, i === 0);
      visitorMarkers.push(marker);
      globeGroup.add(marker);
    }
  });
}

function createVisitorMarker(lat, lon, isCurrent = false) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -GLOBE_RADIUS * Math.sin(phi) * Math.cos(theta);
  const y = GLOBE_RADIUS * Math.cos(phi);
  const z = GLOBE_RADIUS * Math.sin(phi) * Math.sin(theta);

  const geometry = new THREE.SphereGeometry(isCurrent ? 3 : 2, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: isCurrent ? 0xff0000 : 0xff4444,
    transparent: true,
    opacity: isCurrent ? 1 : 0.6
  });
  
  const marker = new THREE.Mesh(geometry, material);
  marker.position.set(x, y, z);

  if (isCurrent) {
    const glowGeometry = new THREE.SphereGeometry(5, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
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

  if (globeGroup) {
    globeGroup.rotation.y += 0.001; // Slow rotation
  }

  // Pulsate current visitor marker
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

  renderer.render(scene, camera);
}

function onGlobeResize() {
  const container = document.getElementById('globeViz');
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}

// Initialize when page loads
window.addEventListener('load', () => {
  setTimeout(initGlobe, 1000);
});
