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

// Intro splash animation with delay
window.addEventListener('load', () => {
  const loader = document.getElementById('introLoader');
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
      document.body.classList.remove('loading');
    }, 700); // match CSS transition
  }, 1500); // delay before fade out starts
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal, .reveal-fast');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(r => observer.observe(r));

// Animate slide-down and slide-up elements
const slideElements = document.querySelectorAll('.slide-down, .slide-up');
const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      slideObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

slideElements.forEach(el => slideObserver.observe(el));

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
      const roleDiv = document.createElement('div');
      roleDiv.className = 'p-4 bg-gray-800/30 border border-gray-700/30 rounded-lg';
      roleDiv.innerHTML = `
        <div class="flex items-start gap-3">
          <span class="text-2xl">${role.icon}</span>
          <div>
            <div class="font-semibold text-accent">${role.title}</div>
            ${role.organization ? `<div class="text-sm text-gray-400">${role.organization}</div>` : ''}
          </div>
        </div>
      `;
      rolesList.appendChild(roleDiv);
    });
  }

  // Grades list with visual bars
  const gradesList = document.getElementById('gradesList');
  if (gradesList && config.grades) {
    gradesList.className = 'grid grid-cols-2 gap-3';
    
    config.grades.forEach(item => {
      const gradeDiv = document.createElement('div');
      gradeDiv.className = 'p-3 bg-gray-800/20 rounded-lg';
      
      gradeDiv.innerHTML = `
        <div class="flex justify-between items-center mb-2">
          <span class="font-medium text-sm">${item.subject}</span>
          <span class="font-bold accent text-lg">${item.grade}%</span>
        </div>
        <div class="w-full bg-gray-700/30 rounded-full h-2">
          <div class="bg-gradient-to-r from-green-600 to-green-400 h-2 rounded-full transition-all duration-1000" style="width: ${item.grade}%"></div>
        </div>
      `;
      gradesList.appendChild(gradeDiv);
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
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = lang;
      langContainer.appendChild(tag);
    });
  }

  // AI/ML
  const aimlContainer = document.getElementById('techAiml');
  if (aimlContainer && config.tech.aiml) {
    config.tech.aiml.forEach(tech => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = tech;
      aimlContainer.appendChild(tag);
    });
  }

  // Tools
  const toolsContainer = document.getElementById('techTools');
  if (toolsContainer && config.tech.tools) {
    config.tech.tools.forEach(tool => {
      const tag = document.createElement('span');
      tag.className = 'tag';
      tag.textContent = tool;
      toolsContainer.appendChild(tag);
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
  textSpan.textContent = 'Copied!';
  button.style.background = 'rgba(52, 211, 153, 0.25)';
  button.style.borderColor = '#34d399';
  
  setTimeout(() => {
    textSpan.textContent = originalText;
    button.style.background = '';
    button.style.borderColor = '';
  }, 2000);
}
