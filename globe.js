// ==========================================
// 3D GLOBE VISUALIZATION - Clean Remake
// ==========================================

let camera, scene, renderer;
let particles, particleGeometry, particleMaterial;
let visitorMarkers = [];

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
  camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);
  camera.position.set(0, 40, 300); // Tilted to show northern hemisphere
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // Create globe from Earth texture
  loadGlobeFromTexture();

  // Add visitor markers
  updateVisitorMarkers();

  // Window resize
  window.addEventListener('resize', onGlobeResize);

  // Start animation
  animateGlobe();

  // Listen for visitor updates
  window.addEventListener('visitorLocationUpdated', updateVisitorMarkers);
  
  console.log('Globe initialized successfully');
}

function loadGlobeFromTexture() {
  const textureLoader = new THREE.TextureLoader();
  const earthURL = 'https://raw.githubusercontent.com/turban/webgl-earth/master/images/2_no_clouds_4k.jpg';
  
  textureLoader.load(
    earthURL,
    (texture) => generateDotsFromTexture(texture),
    undefined,
    (error) => {
      console.warn('Texture load failed, using fallback');
      generateFallbackGlobe();
    }
  );
}

function generateDotsFromTexture(texture) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const img = texture.image;
  
  canvas.width = img.width;
  canvas.height = img.height;
  context.drawImage(img, 0, 0);
  
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  const positions = [];
  const colors = [];
  const radius = 100;
  const sampling = 2; // Sample every N pixels
  
  // Island filtering settings
  const minNeighbors = 4;
  const checkRadius = 6;
  
  function isLandPixel(x, y) {
    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return false;
    const i = (y * canvas.width + x) * 4;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const brightness = (r + g + b) / 3;
    return brightness > 30 && !(b > r + 20 && b > g + 20);
  }
  
  function hasEnoughNeighbors(x, y) {
    let count = 0;
    for (let dy = -checkRadius; dy <= checkRadius; dy += 2) {
      for (let dx = -checkRadius; dx <= checkRadius; dx += 2) {
        if (isLandPixel(x + dx, y + dy)) count++;
      }
    }
    return count >= minNeighbors;
  }
  
  for (let y = 0; y < canvas.height; y += sampling) {
    for (let x = 0; x < canvas.width; x += sampling) {
      const i = (y * canvas.width + x) * 4;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const brightness = (r + g + b) / 3;
      const isLand = brightness > 30 && !(b > r + 20 && b > g + 20);
      
      if (isLand && hasEnoughNeighbors(x, y) && Math.random() > 0.3) {
        const lon = (x / canvas.width) * 360 - 180;
        const lat = 90 - (y / canvas.height) * 180;
        
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);
        
        const px = -radius * Math.sin(phi) * Math.cos(theta);
        const py = radius * Math.cos(phi);
        const pz = radius * Math.sin(phi) * Math.sin(theta);
        
        positions.push(px, py, pz);
        
        const greenIntensity = 0.4 + (g / 255) * 0.3;
        colors.push(0.2, greenIntensity, 0.25);
      }
    }
  }
  
  createGlobePoints(positions, colors);
}

function generateFallbackGlobe() {
  const positions = [];
  const colors = [];
  const radius = 100;
  const density = 2;
  
  const regions = [
    { minLat: 25, maxLat: 70, minLon: -170, maxLon: -50 },
    { minLat: -55, maxLat: 12, minLon: -82, maxLon: -34 },
    { minLat: 36, maxLat: 71, minLon: -10, maxLon: 40 },
    { minLat: -35, maxLat: 37, minLon: -18, maxLon: 52 },
    { minLat: 10, maxLat: 75, minLon: 26, maxLon: 180 },
    { minLat: -45, maxLat: -10, minLon: 110, maxLon: 155 },
  ];
  
  regions.forEach(r => {
    for (let lat = r.minLat; lat <= r.maxLat; lat += density) {
      for (let lon = r.minLon; lon <= r.maxLon; lon += density) {
        if (Math.random() > 0.3) {
          const phi = (90 - lat) * (Math.PI / 180);
          const theta = (lon + 180) * (Math.PI / 180);
          
          const x = -radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          
          positions.push(x, y, z);
          colors.push(0.2, 0.5 + Math.random() * 0.2, 0.3);
        }
      }
    }
  });
  
  createGlobePoints(positions, colors);
}

function createGlobePoints(positions, colors) {
  particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

  particleMaterial = new THREE.PointsMaterial({
    size: 2.5,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
  });

  particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
  
  console.log('Globe created with', positions.length / 3, 'points');
}

function updateVisitorMarkers() {
  visitorMarkers.forEach(m => scene.remove(m));
  visitorMarkers = [];

  const visitors = window.visitorTracking ? window.visitorTracking.getAllVisitors() : [];
  
  visitors.slice(0, 20).forEach((v, i) => {
    if (v.latitude && v.longitude) {
      const marker = createVisitorMarker(v.latitude, v.longitude, i === 0);
      visitorMarkers.push(marker);
      scene.add(marker);
    }
  });
}

function createVisitorMarker(lat, lon, isCurrent = false) {
  const radius = 100;
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  const geometry = new THREE.SphereGeometry(isCurrent ? 3 : 2, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: isCurrent ? 0x34d399 : 0x4ade80,
    transparent: true,
    opacity: isCurrent ? 1 : 0.6
  });
  
  const marker = new THREE.Mesh(geometry, material);
  marker.position.set(x, y, z);

  if (isCurrent) {
    const glowGeometry = new THREE.SphereGeometry(5, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x34d399,
      transparent: true,
      opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    marker.add(glow);
  }

  return marker;
}

function animateGlobe() {
  requestAnimationFrame(animateGlobe);

  if (particles) {
    particles.rotation.y += 0.002; // Smooth single-axis rotation
  }

  visitorMarkers.forEach(m => {
    m.rotation.y += 0.002;
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
