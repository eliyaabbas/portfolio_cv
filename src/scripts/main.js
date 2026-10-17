// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

// ===== ANIMATED COUNTERS =====
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  let current = 0;
  const step = Math.max(1, Math.floor(target / 50));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current + suffix;
  }, 30);
}
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
counters.forEach(el => counterObserver.observe(el));

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// ===== TYPING EFFECT =====
const typingEl = document.querySelector('.typing-text');
if (typingEl) {
  const roles = ['Software Engineer', 'AI Engineer', 'LLM Evaluation Specialist', 'Data Scientist'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 400;
    }
    setTimeout(type, speed);
  }
  type();
}

// ===== SKILL TAG HOVER GLOW =====
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.style.transform = 'scale(1.05)';
  });
  tag.addEventListener('mouseleave', () => {
    tag.style.transform = 'scale(1)';
  });
});

// ===== ACTIVE NAV HIGHLIGHT =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent-cyan)';
    }
  });
});

// ===== THEME TOGGLE =====
(function () {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const meta = document.querySelector('meta[name="theme-color"]');
  const apply = (light) => {
    if (light) root.setAttribute('data-theme', 'light'); else root.removeAttribute('data-theme');
    if (meta) meta.setAttribute('content', light ? '#f6f7fb' : '#06080d');
    try { localStorage.setItem('theme', light ? 'light' : 'dark'); } catch (e) {}
    window.dispatchEvent(new CustomEvent('themechange', { detail: { light } }));
  };
  if (meta && root.getAttribute('data-theme') === 'light') meta.setAttribute('content', '#f6f7fb');
  btn?.addEventListener('click', () => apply(root.getAttribute('data-theme') !== 'light'));
})();

// ===== ANALYTICS (Google Tag Manager dataLayer events) =====
// Events are harmless when GTM isn't installed. In GTM, create GA4 Event tags triggered by these custom events.
(function () {
  window.dataLayer = window.dataLayer || [];
  const track = (event, params = {}) => window.dataLayer.push({ event, ...params });

  // clicks: resume, contact, social, project links, filters, theme
  document.addEventListener('click', (e) => {
    const el = e.target.closest('a, button');
    if (!el) return;
    const href = el.getAttribute('href') || '';

    if (el.hasAttribute('data-resume-open')) {
      const where = el.closest('.hero-cta') ? 'hero' : el.closest('.navbar') ? 'navbar' : el.closest('.footer') ? 'footer' : el.closest('#faq') ? 'faq' : 'other';
      return track('resume_open', { location: where });
    }
    if (el.matches('.resume-actions a[download]')) return track('resume_download', { file_name: 'Eliya_Abbas_Resume.pdf' });
    if (el.matches('.resume-actions a[target="_blank"]')) return track('resume_open_tab');
    if (href.startsWith('mailto:')) return track('contact_email');
    if (href.includes('linkedin.com')) return track('social_click', { network: 'linkedin' });
    if (href.includes('github.com') && !el.closest('.project-card')) return track('social_click', { network: 'github' });
    if (el.closest('.project-card') && el.tagName === 'A') {
      return track('project_click', { project_name: el.closest('.project-card').querySelector('h3')?.textContent.trim() });
    }
    if (el.closest('.tableau-card') && el.tagName === 'A') {
      return track('dashboard_click', { dashboard_name: el.closest('.tableau-card').querySelector('h3')?.textContent.trim() });
    }
    if (el.matches('.filter-chip')) return track('project_filter', { filter: el.dataset.filter });
    if (el.id === 'themeToggle') {
      return track('theme_toggle', { theme: document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark' });
    }
    if (el.id === 'marker-toggle') return track('resume_marker_toggle');
  });

  // FAQ opened (the toggle event doesn't bubble, so capture it)
  document.addEventListener('toggle', (e) => {
    if (e.target.matches?.('.faq-item') && e.target.open) {
      track('faq_open', { question: e.target.querySelector('summary span')?.textContent.trim() });
    }
  }, true);

  // each section seen once
  const seen = new Set();
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !seen.has(entry.target.id)) {
        seen.add(entry.target.id);
        track('section_view', { section: entry.target.id });
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('section[id]').forEach((s) => sectionObserver.observe(s));
})();
