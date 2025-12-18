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
