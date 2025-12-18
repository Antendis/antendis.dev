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
