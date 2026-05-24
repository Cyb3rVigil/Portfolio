/**
 * CYBERVIGL PORTFOLIO — SCRIPT.JS
 * Author: Abhinav Satsangi (Cyb3r.v1g!l)
 * Features: Terminal typewriter · Live clock · Nav scroll state ·
 *           Skill bar animation · Scroll reveal · Mobile nav · Footer year
 * Standard: Vanilla JS ES6+ · Zero dependencies · GPU-optimised
 */

'use strict';

/* ============================================================
   01. DOM READY — Entry point
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initLiveClock();
  initFooterYear();
  initTerminal();
  initNavScroll();
  initMobileNav();
  initScrollReveal();
  initSkillBars();
  initSmoothNavClose();
  initActiveNavLinks();
});

/* ============================================================
   02. LIVE CLOCK
   Displays local time in hero status bar, updates every second
============================================================ */
function initLiveClock() {
  const clockEl = document.getElementById('liveClock');
  if (!clockEl) return;

  function tick() {
    const now = new Date();
    const h   = String(now.getHours()).padStart(2, '0');
    const m   = String(now.getMinutes()).padStart(2, '0');
    const s   = String(now.getSeconds()).padStart(2, '0');
    clockEl.textContent = `${h}:${m}:${s} IST`;
  }

  tick();
  setInterval(tick, 1000);
}

/* ============================================================
   03. FOOTER YEAR — Dynamic copyright year
============================================================ */
function initFooterYear() {
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ============================================================
   04. TERMINAL TYPEWRITER
   Cycles through security-flavoured messages with typewriter effect
============================================================ */
function initTerminal() {
  const outputEl = document.getElementById('terminalOutput');
  const cursorEl = document.getElementById('terminalCursor');
  if (!outputEl) return;

  const messages = [
    'whoami --verbose | grep "offensive-security"',
    'nmap -sV -sC -p- target.local',
    'Running OSINT enumeration on target...',
    'Burp Suite proxy initiated on :8080',
    'gobuster dir -u https://target.com -w /usr/share/wordlists/common.txt',
    'Analysing attack surface — 3 vectors identified',
    'theHarvester -d target.com -b all',
    'Vulnerabilities found. Compiling report...',
    'shodan search org:"target" port:443',
    'echo "Security is a process, not a product."',
  ];

  let msgIndex    = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let isPaused    = false;

  const TYPE_SPEED   = 55;
  const DELETE_SPEED = 25;
  const PAUSE_AFTER  = 2200;
  const PAUSE_BEFORE = 400;

  function type() {
    if (isPaused) return;

    const currentMsg = messages[msgIndex];

    if (!isDeleting) {
      outputEl.textContent = currentMsg.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentMsg.length) {
        isPaused = true;
        setTimeout(() => {
          isPaused   = false;
          isDeleting = true;
          requestAnimationFrame(loop);
        }, PAUSE_AFTER);
        return;
      }
    } else {
      outputEl.textContent = currentMsg.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isPaused = true;
        isDeleting = false;
        msgIndex = (msgIndex + 1) % messages.length;
        setTimeout(() => {
          isPaused = false;
          requestAnimationFrame(loop);
        }, PAUSE_BEFORE);
        return;
      }
    }

    requestAnimationFrame(loop);
  }

  let lastTime = 0;
  function loop(timestamp) {
    if (isPaused) return;
    const delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;
    if (timestamp - lastTime >= delay) {
      lastTime = timestamp;
      type();
    } else {
      requestAnimationFrame(loop);
    }
  }

  requestAnimationFrame(loop);
}

/* ============================================================
   05. NAV SCROLL STATE
   Adds .nav--scrolled class after 20px scroll for glass effect
============================================================ */
function initNavScroll() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}

/* ============================================================
   06. MOBILE NAV TOGGLE
============================================================ */
function initMobileNav() {
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('navMobileMenu');
  if (!hamburger || !mobileMenu) return;

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
    document.body.style.overflow = '';
  }

  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.contains('open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMenu();
    }
  });
}

/* ============================================================
   07. SMOOTH NAV CLOSE ON LINK CLICK (mobile)
============================================================ */
function initSmoothNavClose() {
  const mobileLinks = document.querySelectorAll('.nav__mobile-link, .nav__mobile-cta');
  const hamburger   = document.getElementById('navHamburger');
  const mobileMenu  = document.getElementById('navMobileMenu');
  if (!hamburger || !mobileMenu) return;

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
      document.body.style.overflow = '';
    });
  });
}

/* ============================================================
   08. SCROLL REVEAL
   IntersectionObserver — adds .revealed to .reveal elements
============================================================ */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.about__grid, .skills__grid, .project-card, .cert-card, ' +
    '.section__heading, .contact__inner, .about__stat-card'
  );

  if (!targets.length) return;

  // Add reveal class to targets
  targets.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger cards
    if (el.classList.contains('project-card') || el.classList.contains('cert-card') || el.classList.contains('about__stat-card')) {
      el.style.transitionDelay = `${(i % 4) * 80}ms`;
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  });

  targets.forEach(el => observer.observe(el));
}

/* ============================================================
   09. SKILL BAR ANIMATION
   Animates skill bars to their data-width when visible
============================================================ */
function initSkillBars() {
  const bars = document.querySelectorAll('.skills__bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.dataset.width;
        entry.target.style.width = `${targetWidth}%`;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => observer.observe(bar));
}

/* ============================================================
   10. ACTIVE NAV LINK HIGHLIGHTING
   Uses IntersectionObserver on sections to highlight active link
============================================================ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, {
    threshold: 0.35,
    rootMargin: `-${document.getElementById('nav')?.offsetHeight || 68}px 0px 0px 0px`,
  });

  sections.forEach(section => observer.observe(section));
}
