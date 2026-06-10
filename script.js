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
    window.scrollTo({ top: 0, behavior: 'auto' });
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
  document.querySelectorAll('.side-link, .side-logo').forEach(a => {
    a.addEventListener('click', e => {
      if (resolve(a.hash) === resolve(location.hash)) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    });
  });
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

      if (!grades || grades.length === 0) {
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
  
  // Lock button width to prevent size change
  if (!button.style.width) {
    button.style.width = button.offsetWidth + 'px';
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

// Get or initialize visitor data from localStorage
function getVisitorData() {
  const data = localStorage.getItem('visitorLocations');
  return data ? JSON.parse(data) : { visitors: [], lastUpdate: null };
}

// Save visitor data to localStorage
function saveVisitorData(data) {
  localStorage.setItem('visitorLocations', JSON.stringify(data));
}

// Fetch current visitor's location
async function trackVisitorLocation() {
  try {
    // Check if we already tracked this session
    const sessionTracked = sessionStorage.getItem('locationTracked');
    if (sessionTracked) {
      console.log('Location already tracked this session');
      return;
    }

    console.log('Fetching visitor location...');
    
    // Using ipapi.co free API (1,000 requests/day)
    const response = await fetch('https://ipapi.co/json/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const locationData = await response.json();
    
    // Extract relevant data
    const visitor = {
      timestamp: new Date().toISOString(),
      country: locationData.country_name || 'Unknown',
      countryCode: locationData.country_code || 'XX',
      city: locationData.city || 'Unknown',
      region: locationData.region || '',
      latitude: locationData.latitude || 0,
      longitude: locationData.longitude || 0,
      timezone: locationData.timezone || '',
      ip: locationData.ip || 'Unknown' // Consider privacy: might want to hash or not store this
    };

    console.log('Location detected:', visitor);

    // Get existing data
    const data = getVisitorData();
    
    // Add new visitor (keep last 50)
    data.visitors.unshift(visitor);
    data.visitors = data.visitors.slice(0, 50);
    data.lastUpdate = new Date().toISOString();
    
    // Save to localStorage
    saveVisitorData(data);
    
    // Mark as tracked for this session
    sessionStorage.setItem('locationTracked', 'true');
    
    console.log('Visitor location saved. Total visitors tracked:', data.visitors.length);
    
    // Dispatch custom event for globe to listen to
    window.dispatchEvent(new CustomEvent('visitorLocationUpdated', { 
      detail: { visitor, allVisitors: data.visitors } 
    }));

  } catch (error) {
    console.error('Error fetching location:', error);
    
    // Fallback: Add anonymous visitor
    const data = getVisitorData();
    data.visitors.unshift({
      timestamp: new Date().toISOString(),
      country: 'Unknown',
      countryCode: 'XX',
      city: 'Unknown',
      latitude: 0,
      longitude: 0
    });
    data.visitors = data.visitors.slice(0, 50);
    saveVisitorData(data);
    
    sessionStorage.setItem('locationTracked', 'true');
  }
}

// Get all tracked visitors (for globe visualization)
function getAllVisitors() {
  const data = getVisitorData();
  return data.visitors;
}

// Clear old visitors (optional - call this to reset)
function clearVisitorData() {
  localStorage.removeItem('visitorLocations');
  sessionStorage.removeItem('locationTracked');
  console.log('Visitor data cleared');
}

// Auto-track location when page loads
window.addEventListener('load', () => {
  // Small delay to not interfere with page load
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
