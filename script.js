/* ═══════════════════════════════════════════════════════════════
   CYBERVIGL PORTFOLIO — PREMIUM STYLE SYSTEM
   Design: Void Black · Electric Emerald · Cyber Cyan · Royal Violet
   Author: Abhinav Satsangi (Cyb3r.v1g!l)
═══════════════════════════════════════════════════════════════ */

/* ─── 01. DESIGN TOKENS ─────────────────────────────────────── */
:root {
  /* Backgrounds */
  --bg0:  #05070A;
  --bg1:  #0B1016;
  --bg2:  #121A23;
  --bg3:  #18222E;

  /* Accent: Electric Emerald */
  --em:        #00F5A0;
  --em-dim:    rgba(0,245,160,0.07);
  --em-glow:   rgba(0,245,160,0.18);
  --em-border: rgba(0,245,160,0.28);

  /* Accent: Cyber Cyan */
  --cy:        #00D4FF;
  --cy-dim:    rgba(0,212,255,0.07);
  --cy-glow:   rgba(0,212,255,0.18);
  --cy-border: rgba(0,212,255,0.28);

  /* Accent: Royal Violet */
  --vio:       #7C3AED;
  --vio-dim:   rgba(124,58,237,0.08);
  --vio-glow:  rgba(124,58,237,0.2);
  --vio-lt:    #A78BFA;

  /* Accent: Warning */
  --warn: #FFB800;

  /* Text */
  --t1: #FFFFFF;
  --t2: #B4C0D0;
  --t3: #6B7280;
  --t4: #374151;

  /* Borders */
  --b1: rgba(255,255,255,0.05);
  --b2: rgba(255,255,255,0.09);

  /* Typography */
  --ff-d: 'Syne', system-ui, sans-serif;
  --ff-b: 'DM Sans', system-ui, sans-serif;
  --ff-m: 'JetBrains Mono', 'Fira Code', monospace;

  /* Spacing */
  --s1:  0.25rem;  --s2: 0.5rem;   --s3: 0.75rem;
  --s4:  1rem;     --s5: 1.25rem;  --s6: 1.5rem;
  --s8:  2rem;     --s10:2.5rem;   --s12:3rem;
  --s16: 4rem;     --s20:5rem;     --s24:6rem;

  /* Radii */
  --r-sm: 4px; --r-md: 8px; --r-lg: 12px; --r-xl: 16px; --r-f: 9999px;

  /* Easing */
  --ease: cubic-bezier(0.16,1,0.3,1);
  --ease2: cubic-bezier(0.4,0,0.2,1);

  /* Nav */
  --nav-h: 68px;
  --wrap:  1200px;
}

/* ─── 02. RESET & BASE ──────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  font-size: 16px;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: rgba(0,245,160,0.4) var(--bg1);
  -webkit-text-size-adjust: 100%;
}

::-webkit-scrollbar       { width: 5px; }
::-webkit-scrollbar-track { background: var(--bg0); }
::-webkit-scrollbar-thumb { background: rgba(0,245,160,0.4); border-radius: var(--r-f); }
::-webkit-scrollbar-thumb:hover { background: var(--em); }

body {
  background: var(--bg0);
  color: var(--t1);
  font-family: var(--ff-b);
  font-size: 1rem;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Subtle ambient depth on the whole page */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 50% 40% at 25% 15%, rgba(0,245,160,0.025) 0%, transparent 65%),
    radial-gradient(ellipse 40% 35% at 80% 85%, rgba(0,212,255,0.018) 0%, transparent 60%);
  pointer-events: none;
  z-index: 0;
}

body > * { position: relative; z-index: 1; }

::selection { background: var(--em); color: var(--bg0); }

a { color: inherit; text-decoration: none; }
ul, ol { list-style: none; }
img, svg { display: block; max-width: 100%; }
button { cursor: pointer; font-family: inherit; }

/* ─── 03. UTILITIES ─────────────────────────────────────────── */
.wrap {
  max-width: var(--wrap);
  margin: 0 auto;
  padding: 0 var(--s6);
}

.glass {
  background: rgba(11,16,22,0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--b1);
  border-radius: var(--r-xl);
}

code {
  font-family: var(--ff-m);
  font-size: 0.85em;
  color: var(--cy);
  background: var(--cy-dim);
  border: 1px solid var(--cy-border);
  border-radius: var(--r-sm);
  padding: 1px 7px;
}

/* ─── 04. BUTTONS ───────────────────────────────────────────── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--s2);
  padding: 11px 22px;
  border-radius: var(--r-md);
  font-family: var(--ff-m);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  border: 1px solid transparent;
  transition: transform 0.25s var(--ease), box-shadow 0.25s var(--ease), background 0.2s, border-color 0.2s, color 0.2s;
  white-space: nowrap;
  will-change: transform;
  position: relative;
  overflow: hidden;
  text-decoration: none;
}

.btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.04);
  opacity: 0;
  transition: opacity 0.15s;
  pointer-events: none;
}

.btn:hover::after   { opacity: 1; }
.btn:active         { transform: scale(0.97) !important; }

/* Emerald primary */
.btn--em {
  background: var(--em);
  color: var(--bg0);
  border-color: var(--em);
}
.btn--em:hover {
  background: #1afcae;
  box-shadow: 0 0 28px var(--em-glow), 0 4px 16px rgba(0,0,0,0.3);
  transform: translateY(-2px);
}

/* Glass ghost */
.btn--glass {
  background: rgba(255,255,255,0.04);
  color: var(--t1);
  border-color: var(--b2);
  backdrop-filter: blur(10px);
}
.btn--glass:hover {
  border-color: var(--em-border);
  color: var(--em);
  box-shadow: 0 0 20px var(--em-glow);
  transform: translateY(-2px);
}

/* Cyan outline */
.btn--outline {
  background: transparent;
  color: var(--cy);
  border-color: var(--cy-border);
}
.btn--outline:hover {
  background: var(--cy-dim);
  box-shadow: 0 0 20px var(--cy-glow);
  transform: translateY(-2px);
}

.btn--full { width: 100%; justify-content: center; }

/* ─── 05. NAVIGATION ────────────────────────────────────────── */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 500;
  height: var(--nav-h);
  background: rgba(5,7,10,0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255,255,255,0.04);
  transition: background 0.3s, box-shadow 0.3s;
}

.nav--scrolled {
  background: rgba(5,7,10,0.95);
  box-shadow: 0 1px 0 rgba(255,255,255,0.05), 0 8px 32px rgba(0,0,0,0.5);
}

.nav__inner {
  max-width: var(--wrap);
  margin: 0 auto;
  padding: 0 var(--s6);
  height: 100%;
  display: flex;
  align-items: center;
  gap: var(--s8);
}

/* Logo */
.nav__logo {
  font-family: var(--ff-m);
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--t1);
  letter-spacing: 0.04em;
  flex-shrink: 0;
  transition: color 0.2s;
}
.nav__logo:hover { color: var(--em); }
.nav__logo-b { color: var(--em); font-weight: 400; }

/* Desktop links */
.nav__links {
  display: none;
  align-items: center;
  gap: 2px;
  margin-left: auto;
}
@media (min-width: 768px) { .nav__links { display: flex; } }

.nav__link {
  font-family: var(--ff-m);
  font-size: 0.78rem;
  color: var(--t3);
  padding: var(--s2) var(--s3);
  border-radius: var(--r-sm);
  letter-spacing: 0.04em;
  transition: color 0.2s, background 0.2s;
}
.nav__link:hover   { color: var(--t1); background: rgba(255,255,255,0.04); }
.nav__link.active  { color: var(--em); }

.nav__cta {
  margin-left: var(--s4);
  display: none;
}
@media (min-width: 768px) { .nav__cta { display: inline-flex; } }

/* Hamburger */
.nav__burger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px; height: 38px;
  background: none;
  border: 1px solid var(--b2);
  border-radius: var(--r-md);
  padding: 8px;
  margin-left: auto;
  transition: border-color 0.2s;
}
@media (min-width: 768px) { .nav__burger { display: none; } }

.nav__burger:hover { border-color: var(--em-border); }

.nav__burger span {
  display: block;
  height: 1.5px;
  background: var(--t2);
  border-radius: var(--r-f);
  transition: all 0.25s var(--ease2);
}
.nav__burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
.nav__burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.nav__burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

/* Mobile menu */
.nav__mobile {
  position: fixed;
  top: var(--nav-h);
  left: 0; right: 0;
  background: rgba(5,7,10,0.97);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid var(--b1);
  padding: var(--s6);
  z-index: 490;
}
.nav__mobile[hidden] { display: none; }

.nav__ml {
  display: block;
  font-family: var(--ff-m);
  font-size: 0.875rem;
  color: var(--t2);
  padding: var(--s3) var(--s4);
  border-radius: var(--r-sm);
  transition: color 0.2s, background 0.2s;
  letter-spacing: 0.04em;
}
.nav__ml:hover { color: var(--em); background: var(--em-dim); }

.nav__mc {
  display: inline-flex;
  margin-top: var(--s4);
  font-family: var(--ff-m);
  font-size: 0.875rem;
  color: var(--em);
  padding: var(--s3) var(--s4);
  border: 1px solid var(--em-border);
  border-radius: var(--r-md);
  font-weight: 600;
  transition: all 0.2s;
}
.nav__mc:hover { background: var(--em); color: var(--bg0); }

/* ─── 06. CUSTOM CURSOR ─────────────────────────────────────── */
.cursor {
  position: fixed;
  top: 0; left: 0;
  pointer-events: none;
  z-index: 9999;
}
.cursor__ring {
  position: absolute;
  width: 36px; height: 36px;
  border: 1.5px solid rgba(0,245,160,0.6);
  border-radius: 50%;
  transform: translate(-50%,-50%);
  transition: width 0.2s var(--ease), height 0.2s var(--ease), border-color 0.2s, opacity 0.2s;
}
.cursor__dot {
  position: absolute;
  width: 5px; height: 5px;
  background: var(--em);
  border-radius: 50%;
  transform: translate(-50%,-50%);
}
.cursor.cursor--hover .cursor__ring {
  width: 54px; height: 54px;
  border-color: var(--em);
  box-shadow: 0 0 16px var(--em-glow);
}
.cursor.cursor--click .cursor__ring { width: 28px; height: 28px; }

/* ─── 07. PAGE LOADER ───────────────────────────────────────── */
.loader {
  position: fixed;
  inset: 0;
  background: var(--bg0);
  z-index: 9000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.6s var(--ease), visibility 0.6s;
}
.loader--done { opacity: 0; visibility: hidden; pointer-events: none; }

.loader__box { font-family: var(--ff-m); }

.loader__row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  margin-bottom: 20px;
}
.loader__prompt { color: var(--em); }
.loader__text   { color: var(--t1); }
.loader__caret  { color: var(--em); animation: blink 1s step-end infinite; }

.loader__progress {
  display: flex;
  align-items: center;
  gap: 14px;
}
.loader__bar-track {
  width: 260px; height: 2px;
  background: rgba(255,255,255,0.07);
  border-radius: var(--r-f);
  overflow: hidden;
}
.loader__bar-fill {
  height: 100%; width: 0;
  background: linear-gradient(90deg, var(--em), var(--cy));
  border-radius: var(--r-f);
  transition: width 0.12s linear;
}
.loader__pct {
  font-size: 0.72rem;
  color: var(--em);
  min-width: 36px;
  text-align: right;
}

/* ─── 08. SECTION COMMONS ───────────────────────────────────── */
.section { padding: 96px 0; }

.section--alt {
  background: var(--bg1);
  position: relative;
}
.section--alt::before, .section--alt::after {
  content: ''; position: absolute; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, var(--b2) 30%, var(--b2) 70%, transparent);
}
.section--alt::before { top: 0; }
.section--alt::after  { bottom: 0; }

.sec-tag {
  font-family: var(--ff-m);
  font-size: 0.68rem;
  color: var(--em);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  margin-bottom: var(--s4);
  display: flex;
  align-items: center;
  gap: var(--s4);
}
.sec-tag::after {
  content: '';
  height: 1px;
  flex: 1;
  max-width: 64px;
  background: rgba(255,255,255,0.06);
}

.sec-h {
  font-family: var(--ff-d);
  font-size: clamp(1.8rem, 4vw, 2.75rem);
  font-weight: 700;
  color: var(--t1);
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin-bottom: var(--s10);
}

.sec-sub {
  font-size: 1rem;
  color: var(--t2);
  max-width: 540px;
  margin-bottom: var(--s12);
  line-height: 1.75;
}

/* ─── 09. HERO SECTION ──────────────────────────────────────── */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg0);
  overflow: hidden;
}

.hero__canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero__veil {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 70% 50% at 50% -10%, rgba(0,245,160,0.05) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 90% 90%, rgba(0,212,255,0.04) 0%, transparent 55%),
    linear-gradient(to bottom, rgba(5,7,10,0.3) 0%, rgba(5,7,10,0.7) 80%, var(--bg0) 100%);
  z-index: 1;
  pointer-events: none;
}

.hero__inner {
  position: relative;
  z-index: 2;
  flex: 1;
  max-width: var(--wrap);
  margin: 0 auto;
  width: 100%;
  padding: calc(var(--nav-h) + 64px) var(--s6) 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Status */
.hero__status {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 14px;
  background: rgba(0,245,160,0.05);
  border: 1px solid rgba(0,245,160,0.18);
  border-radius: var(--r-f);
  font-family: var(--ff-m);
  font-size: 0.7rem;
  color: rgba(0,245,160,0.85);
  letter-spacing: 0.07em;
  margin-bottom: var(--s8);
  width: fit-content;
}

.hero__pulse {
  width: 7px; height: 7px;
  background: var(--em);
  border-radius: 50%;
  flex-shrink: 0;
  animation: pulse-ring 2s ease-in-out infinite;
}

@keyframes pulse-ring {
  0%,100% { box-shadow: 0 0 0 0 rgba(0,245,160,0.4); }
  50%      { box-shadow: 0 0 0 6px rgba(0,245,160,0); }
}

.hero__sep { opacity: 0.3; }

/* Alias */
.hero__alias {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--ff-m);
  font-size: clamp(0.85rem, 2vw, 1rem);
  color: var(--cy);
  letter-spacing: 0.12em;
  margin-bottom: 14px;
}
.hero__alias-sl    { color: var(--vio-lt); opacity: 0.7; }
.hero__alias-cur   { animation: blink 1s step-end infinite; opacity: 0.7; }

/* Name */
.hero__name {
  font-family: var(--ff-d);
  font-size: clamp(3.2rem, 9vw, 7rem);
  font-weight: 800;
  line-height: 0.95;
  letter-spacing: -0.045em;
  margin-bottom: 20px;
  display: block;
}
.hero__fn { display: block; color: var(--t1); }
.hero__ln {
  display: block;
  background: linear-gradient(120deg, var(--em) 0%, var(--cy) 45%, var(--vio-lt) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 100%;
  animation: grad-pan 7s ease-in-out infinite;
}

@keyframes grad-pan {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

/* Role */
.hero__role {
  font-family: var(--ff-m);
  font-size: clamp(0.85rem, 2.2vw, 1.075rem);
  color: var(--em);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
}
.hero__role-dl  { color: var(--vio-lt); opacity: 0.6; }
.hero__role-cur { animation: blink 1s step-end infinite; margin-left: 1px; }

@keyframes blink {
  0%,100% { opacity: 1; }
  50%     { opacity: 0; }
}

/* Description */
.hero__desc {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  color: var(--t2);
  max-width: 580px;
  line-height: 1.75;
  margin-bottom: 40px;
}
.hero__desc em { font-style: normal; color: var(--em); font-weight: 500; }

/* CTAs */
.hero__ctas {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 56px;
}

/* Scroll hint */
.hero__scroll {
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: 0.35;
}
.hero__scroll-mouse {
  width: 22px; height: 34px;
  border: 1.5px solid var(--t3);
  border-radius: 100px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}
.hero__scroll-wheel {
  width: 3px; height: 6px;
  background: var(--t3);
  border-radius: 100px;
  animation: scroll-whl 2s ease-in-out infinite;
}
@keyframes scroll-whl {
  0%,100% { transform: translateY(0); opacity: 1; }
  50%     { transform: translateY(8px); opacity: 0.3; }
}
.hero__scroll-lbl {
  font-family: var(--ff-m);
  font-size: 0.62rem;
  color: var(--t3);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

/* Stats bar */
.hero__bar {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  background: rgba(11,16,22,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid var(--b1);
}

.hero__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 18px 40px;
}

.hero__stat-n {
  font-family: var(--ff-d);
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, var(--em), var(--cy));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero__stat-l {
  font-family: var(--ff-m);
  font-size: 0.64rem;
  color: var(--t3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.hero__barsep {
  width: 1px; height: 28px;
  background: var(--b1);
  flex-shrink: 0;
}

/* ─── 10. ABOUT SECTION ─────────────────────────────────────── */
.about__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--s12);
}
@media (min-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr 260px;
    gap: var(--s16);
    align-items: start;
  }
}

.about__p {
  font-size: 0.9875rem;
  color: var(--t2);
  line-height: 1.85;
  margin-bottom: var(--s5);
}
.about__p:last-of-type { margin-bottom: 0; }

.about__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: var(--s6);
  padding-top: var(--s6);
  border-top: 1px solid var(--b1);
}

.badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--ff-m);
  font-size: 0.72rem;
  color: var(--t3);
  padding: 7px 12px;
  background: rgba(255,255,255,0.025);
  border: 1px solid var(--b1);
  border-radius: var(--r-md);
  letter-spacing: 0.03em;
  transition: all 0.2s;
  cursor: default;
}
.badge:hover { border-color: var(--em-border); color: var(--em); background: var(--em-dim); }
.badge svg { color: var(--em); flex-shrink: 0; }

/* Stat cards grid */
.about__stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.stat-card {
  padding: 24px 18px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease), border-color 0.3s;
  cursor: default;
}
.stat-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0,245,160,0.25);
  box-shadow: 0 0 32px var(--em-glow);
}

.stat-card__n {
  font-family: var(--ff-d);
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(135deg, var(--em), var(--cy));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.stat-card__l {
  font-family: var(--ff-m);
  font-size: 0.65rem;
  color: var(--t3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  line-height: 1.4;
}

/* ─── 11. SKILLS SECTION ────────────────────────────────────── */
.skills__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--s12);
}
@media (min-width: 900px) {
  .skills__grid {
    grid-template-columns: 1fr 1fr;
    gap: var(--s16);
  }
}

.skills__sub {
  font-family: var(--ff-m);
  font-size: 0.68rem;
  color: var(--t3);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 22px;
}
.skills__sub--mt { margin-top: 36px; }

/* Skill bars */
.skill-list { display: flex; flex-direction: column; gap: 20px; }

.skill__meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 8px;
}
.skill__name { font-size: 0.9rem; font-weight: 500; color: var(--t1); }
.skill__lv { font-family: var(--ff-m); font-size: 0.65rem; letter-spacing: 0.06em; }
.lv--adv { color: var(--em); }
.lv--pro { color: var(--cy); }

.skill__track {
  height: 3px;
  background: rgba(255,255,255,0.06);
  border-radius: var(--r-f);
  overflow: visible;
  position: relative;
}
.skill__fill {
  height: 100%;
  width: 0;
  background: linear-gradient(90deg, var(--em) 0%, var(--cy) 100%);
  border-radius: var(--r-f);
  transition: width 1.3s cubic-bezier(0.4,0,0.2,1) 0.2s;
  position: relative;
}
.skill__fill::after {
  content: '';
  position: absolute;
  right: -1px; top: 50%;
  transform: translateY(-50%);
  width: 8px; height: 8px;
  background: var(--em);
  border-radius: 50%;
  box-shadow: 0 0 10px var(--em);
  border: 2px solid var(--bg0);
}

/* Tool tags */
.tools-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ttag {
  font-family: var(--ff-m);
  font-size: 0.75rem;
  padding: 6px 12px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--b1);
  border-radius: var(--r-md);
  color: var(--t2);
  letter-spacing: 0.03em;
  transition: all 0.2s;
  cursor: default;
}
.ttag:hover {
  border-color: var(--em-border);
  color: var(--em);
  background: var(--em-dim);
  box-shadow: 0 0 14px var(--em-glow);
  transform: translateY(-2px);
}

/* Domain tags */
.domains-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.domains-wrap li {
  font-family: var(--ff-m);
  font-size: 0.72rem;
  padding: 5px 12px;
  background: var(--vio-dim);
  border: 1px solid rgba(124,58,237,0.2);
  border-radius: var(--r-sm);
  color: var(--vio-lt);
  letter-spacing: 0.04em;
  transition: all 0.2s;
  cursor: default;
}
.domains-wrap li:hover {
  background: rgba(124,58,237,0.14);
  border-color: rgba(124,58,237,0.4);
  box-shadow: 0 0 14px var(--vio-glow);
}

/* ─── 12. TERMINAL SECTION ──────────────────────────────────── */
.iterm { overflow: hidden; }

.iterm__bar {
  display: flex;
  align-items: center;
  gap: var(--s3);
  padding: 10px 16px;
  background: rgba(18,26,35,0.9);
  border-bottom: 1px solid var(--b1);
}

.iterm__dots { display: flex; gap: 6px; }
.iterm__dot  { width: 11px; height: 11px; border-radius: 50%; }
.iterm__dot--r { background: #FF5F57; }
.iterm__dot--y { background: #FFBD2E; }
.iterm__dot--g { background: #28CA41; }

.iterm__title {
  flex: 1; text-align: center;
  font-family: var(--ff-m);
  font-size: 0.68rem;
  color: var(--t3);
  letter-spacing: 0.04em;
}

.iterm__clr {
  font-family: var(--ff-m);
  font-size: 0.65rem;
  color: var(--t3);
  background: rgba(255,255,255,0.04);
  border: 1px solid var(--b1);
  border-radius: var(--r-sm);
  padding: 2px 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.iterm__clr:hover { border-color: var(--em-border); color: var(--em); }

.iterm__out {
  min-height: 300px;
  max-height: 440px;
  overflow-y: auto;
  padding: 22px 22px 10px;
  font-family: var(--ff-m);
  font-size: 0.8rem;
  line-height: 1.65;
  scrollbar-width: thin;
  scrollbar-color: rgba(0,245,160,0.25) transparent;
}
.iterm__out::-webkit-scrollbar        { width: 4px; }
.iterm__out::-webkit-scrollbar-track  { background: transparent; }
.iterm__out::-webkit-scrollbar-thumb  { background: rgba(0,245,160,0.25); border-radius: var(--r-f); }

.iterm__row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px 14px;
  border-top: 1px solid var(--b1);
}
.iterm__ps1 { color: var(--em); font-family: var(--ff-m); font-size: 0.8rem; white-space: nowrap; flex-shrink: 0; }
.iterm__in {
  flex: 1;
  background: none; border: none; outline: none;
  font-family: var(--ff-m); font-size: 0.8rem;
  color: var(--t1);
  caret-color: var(--em);
}
.iterm__in::placeholder { color: rgba(107,114,128,0.45); }

/* Terminal output tokens */
.t-entry  { margin-bottom: 2px; }
.t-result { color: var(--t2); padding-bottom: 10px; display: block; }
.t-block  { display: block; }
.t-line   { display: block; }
.t-ps1    { color: var(--em); }
.t-cmd    { color: var(--t1); }
.t-em     { color: var(--em); }
.t-cy     { color: var(--cy); }
.t-vio    { color: var(--vio-lt); }
.t-warn   { color: var(--warn); }
.t-dim    { color: var(--t3); }
.t-err    { color: #F87171; }
.t-ascii  {
  font-size: 0.4rem; line-height: 1.25;
  color: var(--em); display: block;
  margin-bottom: 14px;
  overflow-x: auto;
  white-space: pre;
  opacity: 0.85;
}
.t-tools  { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 8px; }
.t-tool   {
  font-size: 0.7rem; padding: 3px 9px;
  background: var(--cy-dim);
  border: 1px solid var(--cy-border);
  border-radius: var(--r-sm);
  color: var(--cy);
}

/* ─── 13. PROJECTS SECTION ──────────────────────────────────── */
.proj-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 22px;
}
@media (min-width: 768px) {
  .proj-grid { grid-template-columns: repeat(2,1fr); }
}
@media (min-width: 1100px) {
  .proj-grid { grid-template-columns: repeat(3,1fr); }
}

.pcard {
  position: relative;
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: hidden;
  transition: transform 0.3s var(--ease), box-shadow 0.3s;
  will-change: transform;
  cursor: default;
}

.pcard::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--em), transparent);
  opacity: 0;
  transition: opacity 0.3s;
}
.pcard:hover::before { opacity: 1; }
.pcard:hover {
  box-shadow: 0 0 0 1px rgba(0,245,160,0.2), 0 24px 64px rgba(0,0,0,0.5);
}

/* Glow spotlight */
.pcard__glow {
  position: absolute;
  width: 220px; height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,245,160,0.1) 0%, transparent 70%);
  transform: translate(-50%,-50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  left: 50%; top: 50%;
}
.pcard:hover .pcard__glow { opacity: 1; }

.pcard__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pcard__badge {
  font-family: var(--ff-m);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 4px 10px;
  border-radius: var(--r-sm);
}
.pb--web   { background: rgba(0,245,160,0.07); border: 1px solid var(--em-border); color: var(--em); }
.pb--net   { background: rgba(0,212,255,0.07); border: 1px solid var(--cy-border); color: var(--cy); }
.pb--osint { background: rgba(255,184,0,0.07); border: 1px solid rgba(255,184,0,0.28); color: var(--warn); }

.pcard__num  { font-family: var(--ff-m); font-size: 0.65rem; color: var(--t4); letter-spacing: 0.06em; }

.pcard__title {
  font-family: var(--ff-d);
  font-size: 1.0375rem;
  font-weight: 700;
  color: var(--t1);
  line-height: 1.3;
}
.pcard__scope {
  font-family: var(--ff-m);
  font-size: 0.7rem;
  color: var(--t3);
  letter-spacing: 0.04em;
}
.pcard__desc { font-size: 0.875rem; color: var(--t2); line-height: 1.65; flex: 1; }

.pcard__finds {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.pcard__finds span {
  font-family: var(--ff-m);
  font-size: 0.62rem;
  padding: 3px 8px;
  background: rgba(239,68,68,0.05);
  border: 1px solid rgba(239,68,68,0.18);
  border-radius: var(--r-sm);
  color: #F87171;
  letter-spacing: 0.04em;
}

.pcard__foot { padding-top: 14px; border-top: 1px solid var(--b1); }
.pcard__tools { display: flex; flex-wrap: wrap; gap: 6px; }
.pcard__tools span {
  font-family: var(--ff-m);
  font-size: 0.62rem;
  color: var(--t3);
  padding: 3px 8px;
  background: rgba(255,255,255,0.025);
  border: 1px solid var(--b1);
  border-radius: var(--r-sm);
}

/* ─── 14. JOURNEY / TIMELINE ────────────────────────────────── */
.timeline {
  position: relative;
  padding-left: 44px;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 11px; top: 0; bottom: 0;
  width: 1px;
  background: linear-gradient(
    to bottom,
    var(--em) 0%, var(--cy) 30%,
    var(--vio-lt) 65%, rgba(255,255,255,0.06) 100%
  );
}

.tl-item {
  position: relative;
  padding-bottom: 48px;
}
.tl-item:last-child { padding-bottom: 0; }

.tl-marker {
  position: absolute;
  left: -44px; top: 26px;
  width: 24px; height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tl-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid rgba(255,255,255,0.12);
  transition: border-color 0.3s;
}

.tl-dot {
  width: 9px; height: 9px;
  border-radius: 50%;
  background: var(--bg2);
  border: 2px solid var(--t4);
  z-index: 1;
  transition: all 0.3s;
}

.tl-item--now .tl-ring {
  border-color: var(--em);
  animation: tl-pulse 2s ease-in-out infinite;
}
.tl-item--now .tl-dot {
  background: var(--em);
  border-color: var(--em);
  box-shadow: 0 0 14px var(--em-glow);
}

@keyframes tl-pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(0,245,160,0.35); }
  50%     { box-shadow: 0 0 0 8px rgba(0,245,160,0); }
}

.tl-card {
  padding: 24px;
  transition: transform 0.3s var(--ease), box-shadow 0.3s;
}
.tl-card:hover {
  transform: translateX(4px);
  box-shadow: 0 0 32px rgba(0,0,0,0.3);
}

.tl-badge {
  font-family: var(--ff-m);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  padding: 3px 9px;
  border-radius: var(--r-sm);
  display: inline-block;
  margin-bottom: 12px;
}
.tl-badge--now  { background: rgba(0,245,160,0.1);  border: 1px solid var(--em-border);              color: var(--em); }
.tl-badge--next { background: rgba(0,212,255,0.08); border: 1px solid var(--cy-border);              color: var(--cy); }
.tl-badge--fut  { background: var(--vio-dim);       border: 1px solid rgba(124,58,237,0.25);         color: var(--vio-lt); }
.tl-badge--vis  { background: rgba(255,184,0,0.07); border: 1px solid rgba(255,184,0,0.22);          color: var(--warn); }

.tl-title { font-family: var(--ff-d); font-size: 1.15rem; font-weight: 700; color: var(--t1); margin-bottom: 4px; }
.tl-role  { font-family: var(--ff-m); font-size: 0.72rem; color: var(--em); margin-bottom: 12px; letter-spacing: 0.04em; }
.tl-desc  { font-size: 0.875rem; color: var(--t2); line-height: 1.7; margin-bottom: 16px; }

.tl-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.tl-tags span {
  font-family: var(--ff-m);
  font-size: 0.64rem;
  padding: 3px 9px;
  background: rgba(255,255,255,0.03);
  border: 1px solid var(--b1);
  border-radius: var(--r-sm);
  color: var(--t3);
}

/* ─── 15. CERTIFICATIONS ────────────────────────────────────── */
.certs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  max-width: 860px;
}
@media (min-width: 640px) {
  .certs-grid { grid-template-columns: repeat(3,1fr); }
}

.ccard {
  position: relative;
  padding: 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  overflow: hidden;
  transition: transform 0.3s var(--ease), box-shadow 0.3s;
  will-change: transform;
  cursor: default;
}
.ccard--coming { opacity: 0.75; }
.ccard:hover { box-shadow: 0 0 0 1px rgba(0,245,160,0.22), 0 20px 56px rgba(0,0,0,0.45); }

.ccard::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--em), var(--cy));
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease);
}
.ccard:hover::after { transform: scaleX(1); }

.ccard__glow {
  position: absolute;
  width: 160px; height: 160px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(0,245,160,0.1) 0%, transparent 70%);
  transform: translate(-50%,-50%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
  left: 50%; top: 50%;
}
.ccard:hover .ccard__glow { opacity: 1; }

.ccard__icon {
  padding: 12px;
  background: rgba(0,245,160,0.07);
  border: 1px solid rgba(0,245,160,0.14);
  border-radius: 10px;
  color: var(--em);
  flex-shrink: 0;
}
.ccard__icon--dim {
  background: rgba(255,255,255,0.03);
  border-color: var(--b1);
  color: var(--t3);
}

.ccard__body  { flex: 1; }

.ccard__vtag {
  font-family: var(--ff-m);
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  padding: 3px 8px;
  background: rgba(0,245,160,0.08);
  border: 1px solid rgba(0,245,160,0.2);
  border-radius: var(--r-sm);
  color: var(--em);
  display: inline-block;
  margin-bottom: 12px;
}
.ccard__vtag--up {
  background: rgba(255,184,0,0.07);
  border-color: rgba(255,184,0,0.2);
  color: var(--warn);
}

.ccard__title  { font-family: var(--ff-d); font-size: 0.975rem; font-weight: 700; color: var(--t1); margin-bottom: 4px; }
.ccard__issuer { font-family: var(--ff-m); font-size: 0.7rem; color: var(--t3); letter-spacing: 0.04em; margin-bottom: 14px; }

.ccard__verify {
  font-family: var(--ff-m);
  font-size: 0.72rem;
  color: var(--em);
  letter-spacing: 0.04em;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s;
}
.ccard__verify:hover { text-decoration: underline; text-underline-offset: 3px; }

.ccard__prog {
  height: 3px;
  background: rgba(255,255,255,0.06);
  border-radius: var(--r-f);
  overflow: hidden;
}
.ccard__prog-fill {
  height: 100%;
  width: 48%;
  background: linear-gradient(90deg, var(--warn), #FF9500);
  border-radius: var(--r-f);
  animation: prog-pulse 3s ease-in-out infinite;
}
@keyframes prog-pulse {
  0%,100% { width: 48%; }
  50%     { width: 58%; }
}

/* ─── 16. CONTACT SECTION ───────────────────────────────────── */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
}
@media (min-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr 360px;
    gap: 64px;
    align-items: start;
  }
}

.contact-hl {
  font-family: var(--ff-d);
  font-size: clamp(1.1rem, 2.5vw, 1.4rem);
  font-weight: 600;
  color: var(--t1);
  line-height: 1.4;
  margin-bottom: 14px;
}
.contact-sub {
  font-size: 0.9rem;
  color: var(--t2);
  line-height: 1.75;
  margin-bottom: 32px;
}

.contact-links { display: flex; flex-direction: column; gap: 12px; }

.clink {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 18px;
  border-radius: var(--r-lg);
  border: 1px solid var(--b1);
  background: rgba(255,255,255,0.02);
  text-decoration: none;
  transition: all 0.3s var(--ease);
  cursor: pointer;
}
.clink:hover {
  border-color: var(--em-border);
  background: var(--em-dim);
  transform: translateX(6px);
}

.clink__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px; height: 40px;
  border-radius: var(--r-md);
  background: rgba(0,245,160,0.07);
  color: var(--em);
  flex-shrink: 0;
  transition: background 0.2s;
}
.clink:hover .clink__icon { background: rgba(0,245,160,0.12); }

.clink__lbl {
  display: block;
  font-family: var(--ff-m);
  font-size: 0.64rem;
  color: var(--t3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.clink__val {
  display: block;
  font-size: 0.875rem;
  color: var(--t1);
  font-weight: 500;
}

.contact-cta {
  padding: 32px;
  text-align: center;
}
.contact-cta__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px; height: 64px;
  border-radius: var(--r-xl);
  background: rgba(0,245,160,0.07);
  border: 1px solid rgba(0,245,160,0.14);
  color: var(--em);
  margin-bottom: 20px;
}
.contact-cta__title { font-family: var(--ff-d); font-size: 1.2rem; font-weight: 700; color: var(--t1); margin-bottom: 12px; }
.contact-cta__desc  { font-size: 0.875rem; color: var(--t2); line-height: 1.7; margin-bottom: 24px; }
.contact-cta__note  {
  font-family: var(--ff-m);
  font-size: 0.68rem;
  color: var(--t3);
  margin-top: 14px;
  letter-spacing: 0.04em;
}
.contact-cta__note span { color: var(--em); }

/* ─── 17. FOOTER ────────────────────────────────────────────── */
.footer {
  background: var(--bg0);
  border-top: 1px solid var(--b1);
  padding: 28px 0;
}
.footer__in {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}
.footer__left { display: flex; flex-direction: column; gap: 4px; }
.footer__brand { font-family: var(--ff-m); font-size: 0.85rem; font-weight: 600; color: var(--em); letter-spacing: 0.06em; }
.footer__copy  { font-family: var(--ff-m); font-size: 0.68rem; color: var(--t3); }
.footer__right { display: flex; gap: 22px; }
.footer__a {
  font-family: var(--ff-m);
  font-size: 0.75rem;
  color: var(--t3);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 0.2s;
}
.footer__a:hover { color: var(--em); }

/* ─── 18. TILT CARDS ────────────────────────────────────────── */
.tilt-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  will-change: transform;
  transform-style: preserve-3d;
}

/* ─── 19. RESPONSIVE ────────────────────────────────────────── */
@media (max-width: 768px) {
  .section  { padding: 64px 0; }
  .sec-h    { margin-bottom: var(--s8); }

  .hero__stat  { padding: 14px 20px; }
  .hero__barsep { display: none; }
  .hero__bar   {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: var(--b1);
    padding: 0;
  }
  .hero__stat  { background: rgba(11,16,22,0.9); }

  .about__stats { grid-template-columns: 1fr 1fr; }

  .timeline { padding-left: 32px; }
  .tl-marker { left: -32px; }

  .contact-grid { grid-template-columns: 1fr; }

  .iterm__out { min-height: 220px; max-height: 320px; }

  .t-ascii { font-size: 0.3rem; }
}

@media (max-width: 480px) {
  :root { --nav-h: 60px; }

  .hero__name   { letter-spacing: -0.035em; }
  .hero__ctas   { flex-direction: column; align-items: flex-start; gap: 10px; }

  .stat-card    { padding: 18px 12px; }
  .stat-card__n { font-size: 2rem; }

  .pcard  { padding: 20px; }
  .ccard  { flex-direction: column; }

  .certs-grid { grid-template-columns: 1fr; }

  .footer__in   { flex-direction: column; align-items: flex-start; }
}

/* ─── 20. REDUCED MOTION ────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
  .hero__ln { animation: none; }
}
