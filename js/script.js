'use strict';

/* ═══════════════════════════════════════════════════
   HAYDI NAMAZA — Landing Page Scripts
   ═══════════════════════════════════════════════════ */

// ── LOADER ──────────────────────────────────────────
const loader = document.getElementById('loader');

window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    triggerHeroReveal();
  }, 1800);
});

document.body.style.overflow = 'hidden';

// ── PARTICLES ────────────────────────────────────────
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 25;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${Math.random() * 15 + 10}s;
      animation-delay: ${Math.random() * 10}s;
      opacity: ${Math.random() * 0.4 + 0.1};
    `;
    container.appendChild(p);
  }
}
createParticles();

// ── NAVBAR SCROLL ─────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── MOBILE MENU ───────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── SMOOTH SCROLL ─────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = navbar.offsetHeight + 16;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── REVEAL ON SCROLL ──────────────────────────────────
function triggerHeroReveal() {
  document.querySelectorAll('#hero .reveal').forEach((el, i) => {
    setTimeout(() => el.classList.add('visible'), i * 120);
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal:not(#hero .reveal)').forEach(el => {
  revealObserver.observe(el);
});

// ── COUNT UP ANIMATION ────────────────────────────────
function formatNumber(n, target) {
  if (target >= 1000000) {
    return (n / 1000000).toFixed(1) + 'M+';
  }
  if (target >= 1000) {
    return Math.round(n).toLocaleString('tr-TR') + '+';
  }
  if (target < 10) {
    return n.toFixed(1);
  }
  return Math.round(n).toString();
}

function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = formatNumber(current, target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = formatNumber(target, target);
  }
  requestAnimationFrame(update);
}

const countObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.count[data-target]').forEach(el => {
  countObserver.observe(el);
});

// ── FAQ ACCORDION ─────────────────────────────────────
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(open => {
      open.classList.remove('open');
    });
    if (!isOpen) item.classList.add('open');
  });
});

// ── LIVE COUNTDOWN ────────────────────────────────────
function updateCountdown() {
  const countdownEl = document.getElementById('countdown');
  if (!countdownEl) return;

  const now = new Date();
  const yatsiHour = 22, yatsiMin = 15;
  const target = new Date(now);
  target.setHours(yatsiHour, yatsiMin, 0, 0);

  if (now > target) target.setDate(target.getDate() + 1);

  const diff = Math.floor((target - now) / 1000);
  const h = Math.floor(diff / 3600);
  const m = Math.floor((diff % 3600) / 60);
  const s = diff % 60;

  countdownEl.textContent = `${h} sa ${m} dk ${s} sn sonra`;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ── PARALLAX ON HERO SCROLL ───────────────────────────
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const geos = document.querySelectorAll('.hero-geo');
  geos.forEach((geo, i) => {
    const speed = (i + 1) * 0.08;
    geo.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.02}deg)`;
  });
}, { passive: true });

// ── FEATURE CARD STAGGER ──────────────────────────────
const featureCards = document.querySelectorAll('.feature-card');
featureCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

const screenCards = document.querySelectorAll('.screen-card');
screenCards.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

// ── ACTIVE NAV LINK ───────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - navbar.offsetHeight - 80;
    if (window.scrollY >= sectionTop) current = section.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}, { passive: true });
