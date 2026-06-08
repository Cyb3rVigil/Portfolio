/**
 * CYBERVIGL PORTFOLIO — SCRIPT.JS (PREMIUM)
 * Author: Abhinav Satsangi (Cyb3r.v1g!l)
 * Features: Three.js network · GSAP scroll · Loader · Cursor ·
 *           Terminal · Tilt · Magnetic · Typing · Counter · Nav
 */

'use strict';

/* ═══════════════════════════════════════════════════════════
   ENTRY
═══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
});

/* ═══════════════════════════════════════════════════════════
   01. PAGE LOADER  (terminal boot sequence)
═══════════════════════════════════════════════════════════ */
function initLoader() {
  const loaderEl   = document.getElementById('loader');
  const textEl     = document.getElementById('loaderText');
  const progressEl = document.getElementById('loaderProgress');
  const fillEl     = document.getElementById('loaderFill');
  const pctEl      = document.getElementById('loaderPct');

  if (!loaderEl) { onLoaderDone(); return; }

  // Pre-hide hero elements so they reveal via GSAP after loader
  const heroReveal = [
    '.hero__status','.hero__alias','.hero__name',
    '.hero__role','.hero__desc','.hero__ctas',
    '.hero__scroll','.hero__bar'
  ].join(',');
  document.querySelectorAll(heroReveal).forEach(el => { el.style.opacity = '0'; });

  const MSG      = 'sudo ./init cyb3r.v1g!l.portfolio --boot';
  const TYPE_SPD = 38;
  let idx = 0;

  const typer = setInterval(() => {
    if (idx < MSG.length) {
      textEl.textContent += MSG[idx++];
    } else {
      clearInterval(typer);

      // Show progress bar after short pause
      setTimeout(() => {
        progressEl.hidden = false;
        let pct = 0;

        const progress = setInterval(() => {
          const inc = Math.random() * 18 + 6;
          pct = Math.min(100, pct + inc);
          fillEl.style.width = pct + '%';
          pctEl.textContent  = Math.floor(pct) + '%';

          if (pct >= 100) {
            clearInterval(progress);
            setTimeout(() => {
              loaderEl.classList.add('loader--done');
              setTimeout(onLoaderDone, 650);
            }, 280);
          }
        }, 90);
      }, 300);
    }
  }, TYPE_SPD);
}

function onLoaderDone() {
  // Kick everything off
  initCursor();
  initThreeJS();
  initHeroReveal();        // GSAP hero entrance
  initScrollAnimations();  // GSAP scroll-triggered
  initLiveClock();
  initFooterYear();
  initTerminal();
  initSkillBars();
  initCounters();
  initTiltCards();
  initMagnetic();
  initNav();
  initMobileNav();
  initActiveLinks();
}

/* ═══════════════════════════════════════════════════════════
   02. CUSTOM CURSOR
═══════════════════════════════════════════════════════════ */
function initCursor() {
  const cursor = document.getElementById('cursor');
  if (!cursor || window.matchMedia('(pointer: coarse)').matches) {
    if (cursor) cursor.style.display = 'none';
    return;
  }

  const ring = cursor.querySelector('.cursor__ring');
  const dot  = cursor.querySelector('.cursor__dot');

  let cx = -100, cy = -100; // ring (lagged)
  let dx = -100, dy = -100; // dot  (exact)

  document.addEventListener('mousemove', e => {
    dx = e.clientX;
    dy = e.clientY;
  });

  document.addEventListener('mousedown', () => cursor.classList.add('cursor--click'));
  document.addEventListener('mouseup',   () => cursor.classList.remove('cursor--click'));

  // Hover enlargement on interactive elements
  document.querySelectorAll('a,button,.magnetic,.tilt-card,input').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });

  function animLoop() {
    cx += (dx - cx) * 0.10;
    cy += (dy - cy) * 0.10;
    ring.style.left = cx + 'px';
    ring.style.top  = cy + 'px';
    dot.style.left  = dx + 'px';
    dot.style.top   = dy + 'px';
    requestAnimationFrame(animLoop);
  }
  animLoop();
}

/* ═══════════════════════════════════════════════════════════
   03. THREE.JS — CYBER NETWORK BACKGROUND
═══════════════════════════════════════════════════════════ */
function initThreeJS() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || !window.THREE) return;

  const W = canvas.offsetWidth  || window.innerWidth;
  const H = canvas.offsetHeight || window.innerHeight;

  /* Renderer */
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x05070A, 1);

  /* Scene & Camera */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
  camera.position.z = 110;

  /* ── Nodes (Points) ── */
  const N = 85;
  const pos  = new Float32Array(N * 3);
  const vels = [];

  for (let i = 0; i < N; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 180;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 130;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 70;
    vels.push({
      x: (Math.random() - 0.5) * 0.06,
      y: (Math.random() - 0.5) * 0.06,
      z: (Math.random() - 0.5) * 0.025
    });
  }

  const nodeGeo = new THREE.BufferGeometry();
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

  const nodeMat = new THREE.PointsMaterial({
    color: 0x00F5A0,
    size: 2.0,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.75
  });

  const nodesMesh = new THREE.Points(nodeGeo, nodeMat);
  scene.add(nodesMesh);

  /* ── Lines ── */
  const MAX_SEGS  = N * 6;
  const linePos   = new Float32Array(MAX_SEGS * 6);
  const lineGeo   = new THREE.BufferGeometry();
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3));
  lineGeo.setDrawRange(0, 0);

  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00D4FF,
    transparent: true,
    opacity: 0.10
  });

  const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(linesMesh);

  /* ── Mouse influence ── */
  let mX = 0, mY = 0;
  document.addEventListener('mousemove', e => {
    mX = (e.clientX / W - 0.5) * 2;
    mY = -(e.clientY / H - 0.5) * 2;
  });

  /* ── Animation loop ── */
  const DIST_MAX = 32;
  let   frame    = 0;

  function tick() {
    requestAnimationFrame(tick);
    frame++;

    // Move nodes
    for (let i = 0; i < N; i++) {
      pos[i * 3]     += vels[i].x;
      pos[i * 3 + 1] += vels[i].y;
      pos[i * 3 + 2] += vels[i].z;

      if (Math.abs(pos[i * 3])     > 90)  vels[i].x *= -1;
      if (Math.abs(pos[i * 3 + 1]) > 65)  vels[i].y *= -1;
      if (Math.abs(pos[i * 3 + 2]) > 35)  vels[i].z *= -1;
    }
    nodeGeo.attributes.position.needsUpdate = true;

    // Camera gentle drift with mouse
    camera.position.x += (mX * 6 - camera.position.x) * 0.008;
    camera.position.y += (mY * 6 - camera.position.y) * 0.008;
    camera.lookAt(scene.position);

    // Update lines every 3 frames (performance)
    if (frame % 3 === 0) {
      let count = 0;
      outer:
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          if (count >= MAX_SEGS) break outer;
          const dx = pos[i*3]   - pos[j*3];
          const dy = pos[i*3+1] - pos[j*3+1];
          const dz = pos[i*3+2] - pos[j*3+2];
          if (dx*dx + dy*dy + dz*dz < DIST_MAX * DIST_MAX) {
            linePos[count*6]   = pos[i*3];
            linePos[count*6+1] = pos[i*3+1];
            linePos[count*6+2] = pos[i*3+2];
            linePos[count*6+3] = pos[j*3];
            linePos[count*6+4] = pos[j*3+1];
            linePos[count*6+5] = pos[j*3+2];
            count++;
          }
        }
      }
      lineGeo.setDrawRange(0, count * 2);
      lineGeo.attributes.position.needsUpdate = true;
    }

    // Scroll parallax
    camera.position.z = 110 + window.scrollY * 0.04;

    renderer.render(scene, camera);
  }
  tick();

  /* ── Resize ── */
  const onResize = () => {
    const nW = canvas.offsetWidth;
    const nH = canvas.offsetHeight;
    camera.aspect = nW / nH;
    camera.updateProjectionMatrix();
    renderer.setSize(nW, nH);
  };
  window.addEventListener('resize', onResize, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   04. HERO REVEAL  (GSAP entrance after loader)
═══════════════════════════════════════════════════════════ */
function initHeroReveal() {
  if (!window.gsap) {
    // Fallback: just show everything
    document.querySelectorAll('.hero__status,.hero__alias,.hero__name,.hero__role,.hero__desc,.hero__ctas,.hero__scroll,.hero__bar')
      .forEach(el => { el.style.opacity = '1'; });
    startHeroTyping();
    return;
  }

  const tl = gsap.timeline({ onComplete: startHeroTyping });

  tl.fromTo('.hero__status', { opacity: 0, y: 20 },
                             { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
    .fromTo('.hero__alias', { opacity: 0, x: -24 },
                             { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .fromTo('.hero__name',  { opacity: 0, y: 40 },
                             { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
    .fromTo('.hero__role',  { opacity: 0, y: 20 },
                             { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .fromTo('.hero__desc',  { opacity: 0, y: 20 },
                             { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .fromTo('.hero__ctas',  { opacity: 0, y: 20 },
                             { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .fromTo('.hero__scroll',{ opacity: 0 },
                             { opacity: 0.35, duration: 0.8 }, '-=0.3')
    .fromTo('.hero__bar',   { opacity: 0, y: 16 },
                             { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.5');
}

/* ═══════════════════════════════════════════════════════════
   05. HERO TYPING ANIMATION
═══════════════════════════════════════════════════════════ */
function startHeroTyping() {
  // Alias (one-shot)
  const aliasEl = document.getElementById('aliasText');
  if (aliasEl) {
    const ALIAS = 'Cyb3r.v1g!l';
    let ai = 0;
    const at = setInterval(() => {
      if (ai < ALIAS.length) aliasEl.textContent += ALIAS[ai++];
      else clearInterval(at);
    }, 70);
  }

  // Roles (cycled)
  const roleEl = document.getElementById('roleText');
  if (!roleEl) return;

  const ROLES = [
    'Cybersecurity Student',
    'Ethical Hacker',
    'OSINT Analyst',
    'Security Researcher',
    'Offensive Security Enthusiast',
    'Future Red Teamer'
  ];

  let ri = 0, ci = 0, del = false, paused = false;
  let last = 0;

  function step() {
    if (paused) return;
    const cur = ROLES[ri];

    if (!del) {
      roleEl.textContent = cur.slice(0, ++ci);
      if (ci === cur.length) {
        paused = true;
        setTimeout(() => { paused = false; del = true; rafLoop(0); }, 2200);
        return;
      }
    } else {
      roleEl.textContent = cur.slice(0, --ci);
      if (ci === 0) {
        paused = true;
        del = false;
        ri = (ri + 1) % ROLES.length;
        setTimeout(() => { paused = false; rafLoop(0); }, 350);
        return;
      }
    }
    rafLoop(0);
  }

  function rafLoop(ts) {
    if (paused) return;
    const spd = del ? 28 : 62;
    if (ts - last >= spd) { last = ts; step(); }
    else requestAnimationFrame(rafLoop);
  }
  requestAnimationFrame(rafLoop);
}

/* ═══════════════════════════════════════════════════════════
   06. GSAP SCROLL ANIMATIONS
═══════════════════════════════════════════════════════════ */
function initScrollAnimations() {
  if (!window.gsap) return;

  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  else return; // No ScrollTrigger — skip

  const ST = { toggleActions: 'play none none none' };

  // Section labels & headings
  gsap.utils.toArray('.sec-tag').forEach(el => {
    gsap.from(el, { opacity: 0, x: -30, duration: 0.7, ease: 'power2.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', ...ST } });
  });
  gsap.utils.toArray('.sec-h').forEach(el => {
    gsap.from(el, { opacity: 0, y: 36, duration: 0.9, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 85%', ...ST } });
  });

  // About
  gsap.from('.about__copy', { opacity: 0, x: -50, duration: 1, ease: 'power3.out',
                               scrollTrigger: { trigger: '.about__grid', start: 'top 80%', ...ST } });
  gsap.from('.about__stats', { opacity: 0, x: 50, duration: 1, ease: 'power3.out',
                                scrollTrigger: { trigger: '.about__grid', start: 'top 80%', ...ST } });

  // Stat cards stagger
  gsap.from('.stat-card', {
    opacity: 0, y: 28, scale: 0.92, duration: 0.55, stagger: 0.1, ease: 'back.out(1.5)',
    scrollTrigger: { trigger: '.about__stats', start: 'top 85%', ...ST }
  });

  // Skill bars
  gsap.from('.skill-list .skill', {
    opacity: 0, x: -32, duration: 0.6, stagger: 0.09, ease: 'power2.out',
    scrollTrigger: { trigger: '.skill-list', start: 'top 80%', ...ST }
  });

  // Tool tags
  gsap.from('.ttag', {
    opacity: 0, scale: 0.78, duration: 0.4, stagger: 0.04, ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '.tools-wrap', start: 'top 85%', ...ST }
  });

  // Domain tags
  gsap.from('.domains-wrap li', {
    opacity: 0, y: 12, duration: 0.4, stagger: 0.06, ease: 'power2.out',
    scrollTrigger: { trigger: '.domains-wrap', start: 'top 88%', ...ST }
  });

  // Project cards
  gsap.from('.pcard', {
    opacity: 0, y: 64, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.proj-grid', start: 'top 80%', ...ST }
  });

  // Timeline items
  gsap.utils.toArray('.tl-item').forEach((item, i) => {
    gsap.from(item, {
      opacity: 0, x: i % 2 === 0 ? -56 : 56, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: item, start: 'top 82%', ...ST }
    });
  });

  // Cert cards
  gsap.from('.ccard', {
    opacity: 0, y: 40, scale: 0.95, duration: 0.65, stagger: 0.12, ease: 'power2.out',
    scrollTrigger: { trigger: '.certs-grid', start: 'top 82%', ...ST }
  });

  // Contact
  gsap.from('.contact-left', { opacity: 0, x: -50, duration: 1, ease: 'power3.out',
                                scrollTrigger: { trigger: '.contact-grid', start: 'top 80%', ...ST } });
  gsap.from('.contact-right', { opacity: 0, x: 50, duration: 1, ease: 'power3.out',
                                 scrollTrigger: { trigger: '.contact-grid', start: 'top 80%', ...ST } });

  // Terminal
  gsap.from('#iterm', {
    opacity: 0, y: 40, duration: 0.9, ease: 'power3.out',
    scrollTrigger: { trigger: '#iterm', start: 'top 82%', ...ST }
  });
}

/* ═══════════════════════════════════════════════════════════
   07. LIVE CLOCK
═══════════════════════════════════════════════════════════ */
function initLiveClock() {
  const el = document.getElementById('liveClock');
  if (!el) return;

  function tick() {
    const d = new Date();
    const h = String(d.getHours()).padStart(2, '0');
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    el.textContent = `${h}:${m}:${s} IST`;
  }
  tick();
  setInterval(tick, 1000);
}

/* ═══════════════════════════════════════════════════════════
   08. FOOTER YEAR
═══════════════════════════════════════════════════════════ */
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ═══════════════════════════════════════════════════════════
   09. INTERACTIVE TERMINAL
═══════════════════════════════════════════════════════════ */
function initTerminal() {
  const out      = document.getElementById('itermOutput');
  const input    = document.getElementById('itermInput');
  const clearBtn = document.getElementById('itermClear');
  const iterm    = document.getElementById('iterm');
  if (!out || !input) return;

  const history = [];
  let   histIdx = -1;

  const LOGO = [
    '  ██████╗██╗   ██╗██████╗  ██████╗ ██╗   ██╗██╗ ██████╗ ██╗██╗     ',
    ' ██╔════╝╚██╗ ██╔╝██╔══██╗╚════██╗╚██╗ ██╔╝██║██╔════╝ ██║██║     ',
    ' ██║      ╚████╔╝ ██████╔╝ █████╔╝ ╚████╔╝ ██║██║  ███╗██║██║     ',
    ' ██║       ╚██╔╝  ██╔══██╗ ╚═══██╗  ╚██╔╝  ██║██║   ██║██║██║     ',
    ' ╚██████╗   ██║   ██████╔╝██████╔╝   ██║   ██║╚██████╔╝██║███████╗',
    '  ╚═════╝   ╚═╝   ╚═════╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝╚══════╝'
  ].join('\n');

  /* ── Print welcome ── */
  function printWelcome() {
    out.innerHTML = '';
    appendRaw(`<pre class="t-ascii">${LOGO}</pre>`);
    appendRaw(`<div class="t-line t-em" style="margin-bottom:2px">Welcome to Cyb3r.v1g!l's Interactive Terminal.</div>`);
    appendRaw(`<div class="t-line t-dim">Type <span class="t-cy">help</span> for available commands &nbsp;·&nbsp; ↑/↓ for history</div>`);
    appendRaw(`<div class="t-line t-dim" style="margin-bottom:14px">──────────────────────────────────────────</div>`);
  }

  /* ── Output helpers ── */
  function appendRaw(html) {
    const d = document.createElement('div');
    d.className = 't-entry';
    d.innerHTML = html;
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
  }

  function appendCmd(cmd) {
    appendRaw(`<div class="t-line"><span class="t-ps1">cyb3rvigil@kali:~$&nbsp;</span><span class="t-cmd">${esc(cmd)}</span></div>`);
  }

  function appendResult(html) {
    const d = document.createElement('div');
    d.className = 't-result';
    d.innerHTML = html;
    out.appendChild(d);
    out.scrollTop = out.scrollHeight;
  }

  function esc(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* ── Commands ── */
  const CMDS = {

    help: () => `<div class="t-block">
<div class="t-line t-dim" style="margin-bottom:8px">Available Commands:</div>
<div class="t-line">  <span class="t-em">whoami</span>          &nbsp;Identity &amp; background</div>
<div class="t-line">  <span class="t-em">skills</span>          &nbsp;Technical capabilities</div>
<div class="t-line">  <span class="t-em">tools</span>           &nbsp;Security tool arsenal</div>
<div class="t-line">  <span class="t-em">projects</span>        &nbsp;Lab security work</div>
<div class="t-line">  <span class="t-em">certifications</span>  &nbsp;Professional credentials</div>
<div class="t-line">  <span class="t-em">contact</span>         &nbsp;Reach out</div>
<div class="t-line">  <span class="t-em">status</span>          &nbsp;Availability</div>
<div class="t-line">  <span class="t-em">ls</span>              &nbsp;List sections</div>
<div class="t-line">  <span class="t-em">clear</span>           &nbsp;Clear terminal</div>
<div class="t-line t-dim" style="margin-top:8px">Shortcuts: ↑↓ history &nbsp;·&nbsp; Ctrl+L clear &nbsp;·&nbsp; Esc focus</div>
</div>`,

    whoami: () => `<div class="t-block">
<div class="t-line"><span class="t-em">Name:     </span>Abhinav Satsangi</div>
<div class="t-line"><span class="t-em">Alias:    </span>Cyb3r.v1g!l</div>
<div class="t-line"><span class="t-em">Status:   </span>B.E. Computer Science · 2nd Semester</div>
<div class="t-line"><span class="t-em">Focus:    </span>Offensive Security · OSINT · Ethical Hacking</div>
<div class="t-line"><span class="t-em">Goal:     </span>Red Team Operator</div>
<div class="t-line"><span class="t-em">Platform: </span>Kali Linux</div>
<div class="t-line"><span class="t-em">Motto:    </span><span class="t-dim">"When I meet someone more skilled, I don't stay behind."</span></div>
</div>`,

    skills: () => `<div class="t-block">
<div class="t-line t-dim" style="margin-bottom:6px">Core Competencies:</div>
<div class="t-line">  <span class="t-em">OSINT &amp; Recon Thinking    </span> <span class="t-dim">██████████</span><span class="t-em">░</span> 85%</div>
<div class="t-line">  <span class="t-em">Social Engineering        </span> <span class="t-dim">█████████░</span><span class="t-em">░</span> 80%</div>
<div class="t-line">  <span class="t-em">Attack Surface Recon      </span> <span class="t-dim">████████░░</span><span class="t-em">░</span> 75%</div>
<div class="t-line">  <span class="t-em">Web Application Security  </span> <span class="t-dim">████████░░</span><span class="t-em">░</span> 72%</div>
<div class="t-line">  <span class="t-em">Network Reconnaissance    </span> <span class="t-dim">███████░░░</span><span class="t-em">░</span> 70%</div>
</div>`,

    tools: () => `<div class="t-block">
<div class="t-line t-dim" style="margin-bottom:8px">Security Arsenal (11 tools):</div>
<div class="t-tools">
${['Kali Linux','Nmap','Burp Suite','Wireshark','Metasploit',
   'Maltego','Shodan','Gobuster','Ettercap','Airgeddon','Aircrack-ng']
  .map(t => `<span class="t-tool">${t}</span>`).join('')}
</div>
</div>`,

    projects: () => `<div class="t-block">
<div class="t-line t-dim" style="margin-bottom:8px">Security Lab Projects:</div>
<div class="t-line"><span class="t-vio">01</span> <span class="t-em">Web Application Security Assessment</span>  <span class="t-dim">[OWASP · Burp Suite]</span></div>
<div class="t-line t-dim" style="margin-left:20px;margin-bottom:8px">SQL Injection · XSS · Auth Flaws · Directory Traversal</div>
<div class="t-line"><span class="t-vio">02</span> <span class="t-em">Network Recon &amp; Enumeration</span>         <span class="t-dim">[Nmap · Wireshark]</span></div>
<div class="t-line t-dim" style="margin-left:20px;margin-bottom:8px">Port Discovery · OS Fingerprinting · Service Enum</div>
<div class="t-line"><span class="t-vio">03</span> <span class="t-em">OSINT Digital Footprint Investigation</span>  <span class="t-dim">[Maltego · Sherlock]</span></div>
<div class="t-line t-dim" style="margin-left:20px">Subdomain Map · Email Intel · Username Correlation</div>
</div>`,

    certifications: () => `<div class="t-block">
<div class="t-line t-dim" style="margin-bottom:8px">Professional Credentials:</div>
<div class="t-line"><span class="t-em">✓</span> Ethical Hacking         <span class="t-dim">· Tutedude</span>     <span class="t-dim">[VERIFIED ↗]</span></div>
<div class="t-line"><span class="t-em">✓</span> Cybersecurity           <span class="t-dim">· Tutedude</span>     <span class="t-dim">[VERIFIED ↗]</span></div>
<div class="t-line"><span class="t-warn">⏳</span> eJPT v2                 <span class="t-dim">· INE Security</span> <span class="t-dim">[IN PROGRESS]</span></div>
<div class="t-line t-dim" style="margin-top:6px">Roadmap: eJPT → CEH → OSCP</div>
</div>`,

    contact: () => `<div class="t-block">
<div class="t-line t-dim" style="margin-bottom:8px">Contact Information:</div>
<div class="t-line"><span class="t-em">Email:    </span>topper.rei@gmail.com</div>
<div class="t-line"><span class="t-em">LinkedIn: </span>linkedin.com/in/cyb3rvigil</div>
<div class="t-line"><span class="t-em">GitHub:   </span>github.com/Cyb3rVigil</div>
<div class="t-line t-dim" style="margin-top:6px">Typically responds within 24 hours.</div>
</div>`,

    status: () => `<div class="t-block">
<div class="t-line"><span class="t-em">● </span>Currently Available for Opportunities</div>
<div class="t-line t-dim" style="margin-top:4px">Open to: Security Internships · Bug Bounty Collabs · CTF Teams · Mentorship</div>
</div>`,

    ls: () => `<div class="t-line"><span class="t-em">about &nbsp;skills &nbsp;terminal &nbsp;projects &nbsp;journey &nbsp;certifications &nbsp;contact</span></div>`,

    pwd:   () => `<div class="t-line t-dim">/home/cyb3rvigil/portfolio</div>`,
    uname: () => `<div class="t-line t-em">Kali GNU/Linux 2024.2 x86_64 — cyb3rvigil</div>`,
    date:  () => `<div class="t-line t-dim">${new Date().toUTCString()}</div>`,

    exit: () => `<div class="t-line t-warn">There's no escaping this portfolio. Type <span class="t-em">help</span> instead. 👁</div>`,

    nmap: () => `<div class="t-block">
<div class="t-line t-dim">Starting Nmap 7.94 ( https://nmap.org )</div>
<div class="t-line">Nmap scan report for <span class="t-em">visitor.local (you)</span></div>
<div class="t-line t-dim">PORT     STATE SERVICE VERSION</div>
<div class="t-line"><span class="t-em">80/tcp   open  http</span>     nginx/1.24</div>
<div class="t-line"><span class="t-em">443/tcp  open  ssl/http</span> nginx/1.24</div>
<div class="t-line t-dim">Nmap done: 1 IP address scanned in 2.31 seconds</div>
<div class="t-line t-warn" style="margin-top:4px">⚠ You are being scanned right back. Welcome. 👁</div>
</div>`,

    sudo: () => `<div class="t-line t-err">[sudo] password for visitor: <span class="t-dim">Access denied. Nice try.</span></div>`,

    cat: (args) => {
      if (!args || !args[0]) return `<div class="t-line t-err">Usage: cat &lt;filename&gt;</div>`;
      const f = args[0].toLowerCase();
      if (f.includes('about') || f.includes('readme')) return CMDS.whoami();
      if (f.includes('skill')) return CMDS.skills();
      if (f.includes('cert'))  return CMDS.certifications();
      return `<div class="t-line t-err">cat: ${esc(args[0])}: No such file or directory</div>`;
    }
  };

  /* ── Execute ── */
  function exec(raw) {
    const parts = raw.trim().split(/\s+/);
    const name  = (parts[0] || '').toLowerCase();
    const args  = parts.slice(1);

    appendCmd(raw);

    if (!name) return;

    if (name === 'clear') {
      printWelcome();
      return;
    }

    if (CMDS[name]) {
      const html = CMDS[name](args);
      if (html) appendResult(html);
    } else {
      appendResult(`<div class="t-line t-err">command not found: ${esc(name)} — type <span class="t-em">help</span></div>`);
    }
  }

  /* ── Input listeners ── */
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = input.value;
      if (cmd.trim()) { history.unshift(cmd); histIdx = -1; }
      input.value = '';
      exec(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (histIdx < history.length - 1) input.value = history[++histIdx] || '';
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx > 0)  input.value = history[--histIdx] || '';
      else { histIdx = -1; input.value = ''; }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      printWelcome();
    }
  });

  if (iterm) iterm.addEventListener('click', () => input.focus());

  clearBtn?.addEventListener('click', () => {
    printWelcome();
    input.focus();
  });

  // Focus when section scrolled into view
  const termObs = new IntersectionObserver(entries => {
    if (entries[0]?.isIntersecting) input.focus();
  }, { threshold: 0.5 });
  if (iterm) termObs.observe(iterm);

  printWelcome();
}

/* ═══════════════════════════════════════════════════════════
   10. SKILL BAR ANIMATION
═══════════════════════════════════════════════════════════ */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill__fill[data-w]');
  if (!fills.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  fills.forEach(f => obs.observe(f));
}

/* ═══════════════════════════════════════════════════════════
   11. COUNTER ANIMATION (stat cards)
═══════════════════════════════════════════════════════════ */
function initCounters() {
  const cards = document.querySelectorAll('.stat-card[data-count]');
  if (!cards.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el   = e.target;
      const num  = el.querySelector('.stat-card__n');
      const end  = parseInt(el.dataset.count, 10);
      if (!num) return;

      let cur  = 0;
      const inc = end / 40;
      const timer = setInterval(() => {
        cur += inc;
        if (cur >= end) { cur = end; clearInterval(timer); }
        num.textContent = Math.floor(cur);
      }, 28);

      obs.unobserve(el);
    });
  }, { threshold: 0.55 });

  cards.forEach(c => obs.observe(c));
}

/* ═══════════════════════════════════════════════════════════
   12. 3-D CARD TILT
═══════════════════════════════════════════════════════════ */
function initTiltCards() {
  const isMobile = window.matchMedia('(pointer: coarse)').matches;
  if (isMobile) return;

  document.querySelectorAll('.tilt-card').forEach(card => {

    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = (e.clientX - r.left)  / r.width  - 0.5;
      const y  = (e.clientY - r.top)   / r.height - 0.5;
      const rX = -y * 13;
      const rY =  x * 13;

      card.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) scale(1.025)`;

      // Move glow to cursor
      const glow = card.querySelector('.pcard__glow, .ccard__glow');
      if (glow) {
        glow.style.left    = `${(x + 0.5) * 100}%`;
        glow.style.top     = `${(y + 0.5) * 100}%`;
        glow.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      const glow = card.querySelector('.pcard__glow, .ccard__glow');
      if (glow) glow.style.opacity = '0';
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   13. MAGNETIC BUTTONS
═══════════════════════════════════════════════════════════ */
function initMagnetic() {
  const isMobile = window.matchMedia('(pointer: coarse)').matches;
  if (isMobile) return;

  document.querySelectorAll('.magnetic').forEach(el => {
    const STRENGTH = 0.38;
    const RANGE    = 90;

    el.addEventListener('mousemove', e => {
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d  = Math.sqrt(dx * dx + dy * dy);

      if (d < RANGE) {
        const tx = dx * STRENGTH;
        const ty = dy * STRENGTH;
        if (window.gsap) {
          gsap.to(el, { x: tx, y: ty, duration: 0.35, ease: 'power2.out' });
        } else {
          el.style.transform = `translate(${tx}px,${ty}px)`;
        }
      }
    });

    el.addEventListener('mouseleave', () => {
      if (window.gsap) {
        gsap.to(el, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1.2,0.4)' });
      } else {
        el.style.transform = '';
      }
    });
  });
}

/* ═══════════════════════════════════════════════════════════
   14. NAVIGATION SCROLL STATE
═══════════════════════════════════════════════════════════ */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════
   15. MOBILE NAV
═══════════════════════════════════════════════════════════ */
function initMobileNav() {
  const btn  = document.getElementById('hamburger');
  const menu = document.getElementById('mobileNav');
  if (!btn || !menu) return;

  function close() {
    btn.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    menu.hidden = true;
    document.body.style.overflow = '';
  }

  function open() {
    btn.classList.add('open');
    btn.setAttribute('aria-expanded', 'true');
    menu.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  btn.addEventListener('click', () =>
    btn.classList.contains('open') ? close() : open()
  );

  document.addEventListener('keydown',  e => { if (e.key === 'Escape') close(); });
  document.addEventListener('click',    e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) close();
  });

  document.querySelectorAll('.nav__ml, .nav__mc').forEach(a =>
    a.addEventListener('click', close)
  );
}

/* ═══════════════════════════════════════════════════════════
   16. ACTIVE NAV LINK HIGHLIGHTING
═══════════════════════════════════════════════════════════ */
function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav__link');
  if (!sections.length || !links.length) return;

  const navH = document.getElementById('nav')?.offsetHeight || 68;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
    });
  }, {
    threshold:   0.35,
    rootMargin: `-${navH}px 0px 0px 0px`
  });

  sections.forEach(s => obs.observe(s));
}
