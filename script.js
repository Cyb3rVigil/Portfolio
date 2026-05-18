// ============================================================
//  CYBERV1GIL PORTFOLIO — SCRIPT v3.1
// ============================================================

// ── Boot Sequence ─────────────────────────────────────────
const BOOT_MESSAGES = [
    { text: '[  OK  ] Initializing kernel security modules...', type: '' },
    { text: '[  OK  ] Loading Netfilter firewall rules...', type: '' },
    { text: '[  OK  ] Mounting encrypted /home/cyb3rvigil partition...', type: '' },
    { text: '[  OK  ] Starting OpenSSH daemon — port 22 hardened...', type: '' },
    { text: '[  OK  ] Establishing TLS 1.3 session handshake...', type: '' },
    { text: '[ WARN ] IDS sensor array: ACTIVE — monitoring traffic...', type: 'warn' },
    { text: '[  OK  ] Packet capture filters loaded. Interface: eth0', type: '' },
    { text: '[  OK  ] Loading portfolio telemetry shell v3.1...', type: '' },
    { text: '[  OK  ] All subsystems nominal. Launching user session.', type: '' },
];

const bootScreen   = document.getElementById('boot-screen');
const bootLog      = document.getElementById('boot-log');
const bootBarFill  = document.getElementById('boot-bar-fill');
const bootPercent  = document.getElementById('boot-percent');
let   bootIndex    = 0;

function runBoot() {
    if (!bootScreen) return;
    if (bootIndex < BOOT_MESSAGES.length) {
        const { text, type } = BOOT_MESSAGES[bootIndex];
        const line = document.createElement('div');
        line.className = 'boot-line' + (type ? ' ' + type : '');
        line.textContent = text;
        bootLog.appendChild(line);

        const pct = Math.round(((bootIndex + 1) / BOOT_MESSAGES.length) * 100);
        if (bootBarFill) bootBarFill.style.width = pct + '%';
        if (bootPercent) bootPercent.textContent = pct + '%';

        bootIndex++;
        setTimeout(runBoot, 170 + Math.random() * 120);
    } else {
        setTimeout(() => bootScreen.classList.add('hidden'), 600);
    }
}
setTimeout(runBoot, 350);

// ── System Clock ──────────────────────────────────────────
function updateTelemetryTime() {
    const el = document.getElementById('login-time');
    if (el) el.innerText = new Date().toUTCString();
}
updateTelemetryTime();
setInterval(updateTelemetryTime, 1000);

const yearEl = document.getElementById('current-year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Animated Counter ──────────────────────────────────────
function animateCounter(el, target, suffix = '', duration = 1400) {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = Math.floor(start) + suffix;
        if (start >= target) clearInterval(timer);
    }, 16);
}

// ── Matrix Canvas ─────────────────────────────────────────
const canvas = document.getElementById('matrixCanvas');
const ctx    = canvas ? canvas.getContext('2d') : null;
let columns, yPositions, fontSize = 14;

// Extended character set for a richer hacker aesthetic
const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテト<>{}[]|/?@#$%^&*';

function resizeCanvas() {
    if (!canvas) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    fontSize  = window.innerWidth < 640 ? 10 : (window.innerWidth < 1024 ? 12 : 14);
    columns   = Math.floor(canvas.width / (fontSize * 1.5));
    yPositions = Array.from({ length: columns }, () => Math.random() * -canvas.height);
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawMatrix() {
    if (!ctx) return;
    ctx.fillStyle = 'rgba(3, 3, 6, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < yPositions.length; i++) {
        const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
        const x = i * (fontSize * 1.5);
        const y = yPositions[i];

        // Lead char is white/bright, trail fades
        if (Math.random() > 0.97) {
            ctx.fillStyle = 'rgba(255,255,255,0.85)';
        } else if (y < fontSize * 3) {
            ctx.fillStyle = 'rgba(0,255,102,0.55)';
        } else {
            ctx.fillStyle = 'rgba(0,255,102,0.13)';
        }
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) yPositions[i] = -20;
        else yPositions[i] += fontSize + 4;
    }
}
setInterval(drawMatrix, 50);

// ── Typewriter Effect ─────────────────────────────────────
const INTRO_TEXTS = [
    "Hi there, I'm Cyb3rVigil. A CS Student & Aspiring Cybersecurity Expert.",
    "Welcome to my secure telemetry shell. Passionate about network forensics & Kali.",
    "Initiating connection... Analyzing system states & dissecting packet layers.",
    "Hello, World. Utilizing hands-on labs and TryHackMe metrics to scale security.",
];
const textToType = INTRO_TEXTS[Math.floor(Math.random() * INTRO_TEXTS.length)];
let textIndex = 0;

function typeWriter() {
    const el = document.getElementById('typewriter');
    if (!el) return;
    if (textIndex < textToType.length) {
        el.innerHTML += textToType.charAt(textIndex++);
        setTimeout(typeWriter, 35);
    }
}
setTimeout(typeWriter, 1600);   // slight delay so boot screen clears first

// ── Terminal ──────────────────────────────────────────────
const terminalBody  = document.getElementById('terminal-body');
const terminalInput = document.getElementById('terminal-input');

// Command definitions — values can be string or () => string
const COMMANDS = {
    help: `<span class="text-green-400 font-bold">── AVAILABLE COMMANDS ──────────────────────────────</span>
  <span class="text-white">whoami</span>   :: Active identity & bio summary
  <span class="text-white">skills</span>   :: Technical capability matrix
  <span class="text-white">labs</span>     :: Completed laboratory index
  <span class="text-white">certs</span>    :: Verified credentials with links
  <span class="text-white">thm</span>      :: TryHackMe platform telemetry
  <span class="text-white">socials</span>  :: Active communication channels
  <span class="text-white">scan</span>     :: Simulated Nmap port scan
  <span class="text-white">ping</span>     :: ICMP probe to random host
  <span class="text-white">ls</span>       :: List directory contents
  <span class="text-white">date</span>     :: Current system timestamp
  <span class="text-white">history</span>  :: Show command history log
  <span class="text-white">banner</span>   :: Display ASCII system banner
  <span class="text-white">clear</span>    :: Reset terminal display
  <span class="text-white">exit</span>     :: Close session`,

    whoami: `<span class="text-green-400">identity</span> :: <span class="text-white font-bold">Cyb3rVigil</span>
<span class="text-green-400">status  </span> :: CS Engineering Student / Aspiring Pentester
<span class="text-green-400">focus   </span> :: System security, traffic analysis, automation
<span class="text-green-400">os      </span> :: Kali Linux 2024.x (primary) / Debian (secondary)
<span class="text-green-400">location</span> :: <span class="text-yellow-400">[CLASSIFIED — TOR exit node spoofed]</span>`,

    skills: `<span class="text-green-400 font-bold">── TECHNICAL COMPETENCY MATRIX ─────────────────────</span>
<span class="text-cyan-400">RECON     </span> :: Nmap, Zenmap, Host Discovery, Port Auditing
<span class="text-cyan-400">SIMULATION</span> :: Ettercap, ARP Poisoning, MITM, Metasploit
<span class="text-cyan-400">WEB SEC   </span> :: SQL Injection, XSS, PortSwigger Academy
<span class="text-cyan-400">WIRELESS  </span> :: Airgeddon, WPA Handshake Analysis
<span class="text-cyan-400">FORENSICS </span> :: Wireshark, Protocol Filtering
<span class="text-cyan-400">OS / CODE </span> :: Python, Bash, C, Kali Linux, Debian`,

    labs: `<span class="text-green-400 font-bold">── COMPLETED LABS INDEX ────────────────────────────</span>
<span class="text-gray-500">[MOD_01]</span> Virtual Environment Deployment   — VirtualBox / Kali
<span class="text-gray-500">[MOD_02]</span> Network Discovery Audits         — Nmap / Zenmap
<span class="text-gray-500">[MOD_03]</span> Wireshark Protocol Diagnostics   — Packet Capture
<span class="text-gray-500">[MOD_04]</span> CLI Diagnostic Operations        — find / ps / traceroute
<span class="text-gray-500">[MOD_05]</span> Wi-Fi Protection Analysis        — Airgeddon / WPA
<span class="text-gray-500">[MOD_06]</span> Packet Inspection & Sniffing     — Wireshark / Nmap
<span class="text-gray-500">[MOD_07]</span> MITM / ARP Poisoning             — Ettercap / Kali
<span class="text-gray-500">[MOD_08]</span> SQLi & XSS Mechanics             — PortSwigger`,

    certs: `<span class="text-green-400 font-bold">── VERIFIED CREDENTIALS ────────────────────────────</span>
<span class="text-white">Cybersecurity Baseline</span>  [TUTEDUDE]  ID: TD-ABHI-CS-1135
  └─ <a href="https://upskill.tutedude.com/certificate/TD-ABHI-CS-1135" target="_blank" class="text-green-400 underline hover:text-green-300 transition-colors">→ VERIFY CREDENTIAL</a>

<span class="text-white">Ethical Hacking Ops</span>     [TUTEDUDE]  ID: TD-ABHI-EH-1205
  └─ <a href="https://upskill.tutedude.com/certificate/TD-ABHI-EH-1205" target="_blank" class="text-green-400 underline hover:text-green-300 transition-colors">→ VERIFY CREDENTIAL</a>`,

    thm: `<span class="text-green-400 font-bold">── TRYHACKME TELEMETRY ─────────────────────────────</span>
<span class="text-cyan-400">GLOBAL_RANK</span> :: Top 15% worldwide
<span class="text-cyan-400">ROOMS_PWN  </span> :: 53 successfully rooted
<span class="text-cyan-400">BADGES     </span> :: 7 active training badges
<span class="text-cyan-400">PLATFORM   </span> :: <a href="https://tryhackme.com" target="_blank" class="text-green-400 underline">tryhackme.com/p/cyb3rvigil</a>`,

    socials: `<span class="text-green-400 font-bold">── ACTIVE CHANNELS ─────────────────────────────────</span>
<span class="text-cyan-400">LINKEDIN</span> :: <a href="https://www.linkedin.com/in/cyb3rvigil" target="_blank" class="text-green-400 underline hover:text-green-300 transition-colors">in/cyb3rvigil</a>
<span class="text-cyan-400">TWITTER </span> :: <a href="https://x.com/Cyb3rV1gil" target="_blank" class="text-green-400 underline hover:text-green-300 transition-colors">@Cyb3rV1gil</a>
<span class="text-cyan-400">GITHUB  </span> :: <a href="https://github.com/cyb3rvigil" target="_blank" class="text-green-400 underline hover:text-green-300 transition-colors">github.com/cyb3rvigil</a>`,

    ls: `<span class="text-cyan-400">drwxr-xr-x</span>  about/
<span class="text-cyan-400">drwxr-xr-x</span>  certs/
<span class="text-cyan-400">drwxr-xr-x</span>  labs/
<span class="text-cyan-400">drwxr-xr-x</span>  roadmap/
<span class="text-green-400">-rw-r--r--</span>  README.md
<span class="text-green-400">-rwxr-xr-x</span>  recon.sh
<span class="text-green-400">-rwxr-xr-x</span>  scanner.py
<span class="text-yellow-400">-rw-------</span>  .secrets         <span class="text-gray-500">[AES-256-GCM ENCRYPTED]</span>
<span class="text-yellow-400">-rw-------</span>  .ssh/id_ed25519  <span class="text-gray-500">[PASSPHRASE PROTECTED]</span>`,

    banner: `<span class="text-green-500" style="font-size:0.65em;line-height:1.1">
 ██████╗██╗   ██╗██████╗ ██████╗ ██╗   ██╗██╗ ██████╗ ██╗██╗
██╔════╝╚██╗ ██╔╝██╔══██╗╚════██╗██║   ██║██║██╔════╝ ██║██║
██║      ╚████╔╝ ██████╔╝ █████╔╝██║   ██║██║██║  ███╗██║██║
██║       ╚██╔╝  ██╔══██╗ ╚═══██╗╚██╗ ██╔╝██║██║   ██║██║██║
╚██████╗   ██║   ██████╔╝██████╔╝ ╚████╔╝ ██║╚██████╔╝██║███████╗
 ╚═════╝   ╚═╝   ╚═════╝ ╚═════╝   ╚═══╝  ╚═╝ ╚═════╝ ╚═╝╚══════╝</span>
<span class="text-gray-500">           Portfolio Shell v3.1 // Type <span class="text-white">help</span> for commands</span>`,

    date: () => {
        const now = new Date();
        return `<span class="text-green-400">SYS_TIME</span> :: ${now.toUTCString()}
<span class="text-green-400">TIMEZONE</span> :: ${Intl.DateTimeFormat().resolvedOptions().timeZone}
<span class="text-green-400">UNIX_TS </span> :: ${Math.floor(now.getTime() / 1000)}`;
    },

    ping: () => {
        const hosts  = ['tryhackme.com', 'portswigger.net', '10.10.14.1', 'ctf.target.local'];
        const host   = hosts[Math.floor(Math.random() * hosts.length)];
        const base   = 10 + Math.floor(Math.random() * 25);
        const times  = [0,1,2].map(() => `${base + Math.floor(Math.random() * 8)} ms`);
        const avg    = base + 4;
        return `PING ${host}: 56(84) bytes of data
64 bytes from ${host}: icmp_seq=1 ttl=64 time=${times[0]}
64 bytes from ${host}: icmp_seq=2 ttl=64 time=${times[1]}
64 bytes from ${host}: icmp_seq=3 ttl=64 time=${times[2]}
<span class="text-green-400">--- ${host} statistics ---</span>
3 packets transmitted, 3 received, <span class="text-green-400">0% packet loss</span>, time 2003ms
rtt min/avg/max = ${base}/${avg}/${base+12} ms`;
    },

    scan: () => {
        const PORTS = [
            { port: 22,   svc: 'ssh',        state: 'open' },
            { port: 80,   svc: 'http',        state: 'open' },
            { port: 443,  svc: 'https',       state: 'open' },
            { port: 3306, svc: 'mysql',       state: 'filtered' },
            { port: 4444, svc: 'metasploit',  state: 'filtered' },
            { port: 8080, svc: 'http-proxy',  state: 'closed' },
            { port: 21,   svc: 'ftp',         state: 'closed' },
        ];
        const a = Math.floor(Math.random() * 254) + 1;
        const b = Math.floor(Math.random() * 254) + 1;
        const target = `10.10.${a}.${b}`;
        const elapsed = (Math.random() * 2.5 + 0.8).toFixed(2);
        let out = `<span class="text-green-400">Starting Nmap 7.94 ( https://nmap.org )</span>
    Nmap scan report for ${target}
    Host is up (0.${Math.floor(Math.random()*50)+10}s latency).

    <span class="text-gray-400">PORT      STATE      SERVICE</span>`;
        PORTS.forEach(({ port, svc, state }) => {
            const col = state === 'open' ? 'text-green-400' : state === 'filtered' ? 'text-yellow-400' : 'text-red-400';
            out += `\n<span class="${col}">${String(port+'/tcp').padEnd(9)} ${state.padEnd(10)} ${svc}</span>`;
        });
        out += `\n\n<span class="text-gray-400">Nmap done: 1 IP (1 host up) scanned in ${elapsed} seconds</span>`;
        return out;
    },
};

// Command history (up/down arrow navigation)
const cmdHistory = [];
let historyIndex = -1;

// ── Execute a terminal command ────────────────────────────
// Exposed to window so inline onclick="executeTerminalCommand(...)" buttons work
window.executeTerminalCommand = function executeTerminalCommand(rawInput) {
    if (!terminalBody) return;
    const cmd = rawInput.trim().toLowerCase();

    // Record in history (skip blank & clear)
    if (cmd && cmd !== 'clear') {
        cmdHistory.unshift(rawInput.trim());
        if (cmdHistory.length > 100) cmdHistory.pop();
    }
    historyIndex = -1;

    // Echo prompt line
    const promptLine = document.createElement('div');
    promptLine.className = 'term-line';
    promptLine.innerHTML =
        `<span class="text-green-500 font-bold">cyb3rvigil</span>` +
        `<span class="text-gray-600">@</span>` +
        `<span class="text-cyan-500">kali</span>` +
        `<span class="text-gray-500">:~$</span> ` +
        `<span class="text-white">${escapeHtml(rawInput)}</span>`;
    terminalBody.appendChild(promptLine);

    // Handle commands
    if (cmd === 'clear') {
        terminalBody.innerHTML = '';
        return;
    }

    if (cmd === 'exit') {
        appendResponse('<span class="text-yellow-400">logout — Connection to cyb3rvigil@kali closed.</span>', 'plain');
        return;
    }

    if (cmd === 'history') {
        if (!cmdHistory.length) {
            appendResponse('<span class="text-gray-500">No history entries yet.</span>', 'plain');
        } else {
            const lines = cmdHistory.slice(0, 30)
                .map((c, i) => `<span class="text-gray-500">${String(i + 1).padStart(3)}</span>  ${escapeHtml(c)}`)
                .join('<br>');
            appendResponse(lines, 'block');
        }
        return;
    }

    if (cmd === '') return;

    const handler = COMMANDS[cmd];
    if (handler !== undefined) {
        const result = typeof handler === 'function' ? handler() : handler;
        appendResponse(result, 'block');
    } else {
        appendResponse(
            `bash: <span class="text-white">${escapeHtml(rawInput)}</span>: command not found. ` +
            `Type <span class="text-white bg-white/10 px-1 rounded">help</span> for available commands.`,
            'error'
        );
    }
};

function appendResponse(html, style) {
    const el = document.createElement('div');
    el.className = 'term-line my-1 ';
    if (style === 'block')  el.className += 'text-gray-300 pl-3 border-l-2 border-green-500/20 py-1 font-mono text-xs';
    if (style === 'plain')  el.className += 'text-gray-300 pl-2 font-mono text-xs';
    if (style === 'error')  el.className += 'text-red-400 font-mono text-xs py-1';
    el.innerHTML = html;
    terminalBody.appendChild(el);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── Keyboard handling ─────────────────────────────────────
if (terminalInput) {
    terminalInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            window.executeTerminalCommand(terminalInput.value);
            terminalInput.value = '';

        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < cmdHistory.length - 1) {
                historyIndex++;
                terminalInput.value = cmdHistory[historyIndex];
            }

        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = cmdHistory[historyIndex];
            } else {
                historyIndex = -1;
                terminalInput.value = '';
            }

        } else if (e.key === 'Tab') {
            e.preventDefault();
            const partial = terminalInput.value.trim().toLowerCase();
            if (!partial) return;
            const allCmds = [...Object.keys(COMMANDS), 'history', 'exit'];
            const matches = allCmds.filter(c => c.startsWith(partial));
            if (matches.length === 1) {
                terminalInput.value = matches[0];
            } else if (matches.length > 1) {
                appendResponse(matches.join('    '), 'plain');
            }
        }
    });
}

// Click anywhere on terminal section to focus input
document.getElementById('terminal-section')?.addEventListener('click', () => {
    terminalInput?.focus();
});

// ── Live Packet Feed Simulation ───────────────────────────
const packetFeed = document.getElementById('packet-feed');
if (packetFeed) {
    const PROTOS  = ['TCP', 'UDP', 'TLS', 'ICMP', 'DNS'];
    const DST_PTS = [443, 80, 22, 53, 8080, 3306];
    const ACTIONS = ['ACCEPT', 'ACCEPT', 'ACCEPT', 'ACCEPT', 'DROP', 'ACCEPT'];

    function randIP() {
        return `${[172, 10, 192][Math.floor(Math.random() * 3)]}.${r(255)}.${r(255)}.${r(254)+1}`;
    }
    function r(n) { return Math.floor(Math.random() * n); }

    function addPacket() {
        const proto  = PROTOS[r(PROTOS.length)];
        const dst    = DST_PTS[r(DST_PTS.length)];
        const action = ACTIONS[r(ACTIONS.length)];
        const srcIP  = randIP();
        const srcPt  = r(60000) + 1024;
        const col    = action === 'DROP' ? 'text-red-400' : 'text-green-400';
        const ts     = new Date().toLocaleTimeString('en-GB', { hour12: false });

        const row = document.createElement('div');
        row.className = 'pkt-row';
        row.innerHTML =
            `<span class="text-gray-600">${ts}</span>` +
            `<span class="text-cyan-400">${proto}</span>` +
            `<span class="text-gray-400 truncate">${srcIP}:${srcPt}→${dst}</span>` +
            `<span class="${col} font-bold text-right">${action}</span>`;
        packetFeed.appendChild(row);

        // Keep at most 8 rows
        while (packetFeed.children.length > 8) packetFeed.removeChild(packetFeed.firstChild);
    }
    setInterval(addPacket, 700);
}

// ── Scroll Navigation Active State ───────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav a[href^="#"]');

function updateActiveNavLink() {
    let current = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    navLinks.forEach(link => {
        link.classList.remove('nav-active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('nav-active');
    });
}
window.addEventListener('scroll', updateActiveNavLink);
updateActiveNavLink();

// ── Smooth Scroll ─────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (!id || id === '#') return;
        e.preventDefault();
        const target = document.querySelector(id);
        if (!target) return;
        const offset = document.querySelector('header')?.offsetHeight || 0;
        window.scrollTo({
            top: target.getBoundingClientRect().top + window.pageYOffset - offset - 20,
            behavior: 'smooth',
        });
    });
});

// ── Scroll Reveal + Animated Counters ────────────────────
const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        obs.unobserve(entry.target);

        // Trigger any [data-count] counters inside the revealed element
        entry.target.querySelectorAll('[data-count]').forEach(el => {
            const target  = parseInt(el.getAttribute('data-count'), 10);
            const suffix  = el.getAttribute('data-suffix') || '';
            animateCounter(el, target, suffix);
        });
    });
}, { root: null, threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
