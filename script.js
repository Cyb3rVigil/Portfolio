// Set dynamic date parameters (live real-world system clock)
function updateTelemetryTime() {
    const now = new Date();
    document.getElementById('login-time').innerText = now.toUTCString();
}
updateTelemetryTime();
setInterval(updateTelemetryTime, 1000); // Automatically updates every second

document.getElementById('current-year').textContent = new Date().getFullYear();

// Canvas matrix background effect with fluid multi-device adaptability
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

let columns;
let yPositions;
let fontSize = 12;

// Make matrix text size and column layout auto-adaptable to device widths
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    fontSize = window.innerWidth < 640 ? 10 : (window.innerWidth < 1024 ? 12 : 14);
    columns = Math.floor(canvas.width / (fontSize * 1.5));
    
    // Seed rain coordinates dynamically to prevent blank space on load/resize
    yPositions = Array(columns).fill(0).map(() => Math.random() * -canvas.height);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function drawMatrix() {
    ctx.fillStyle = 'rgba(3, 3, 6, 0.08)'; // trails matching the background color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Matrix text rendered in a softer, lower contrast color so foreground content pops
    ctx.fillStyle = 'rgba(0, 255, 102, 0.15)'; 
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < yPositions.length; i++) {
        const char = Math.random() > 0.5 ? '1' : '0'; // Binary sequence
        const x = i * (fontSize * 1.5);
        const y = yPositions[i];

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            yPositions[i] = -20;
        } else {
            yPositions[i] += fontSize + 4;
        }
    }
}
setInterval(drawMatrix, 50);

// Typing introductions sequence
const introTexts = [
    "Hi there, I'm Cyb3rVigil 👋 I am a CS Engineering student and an Aspiring Cybersecurity Expert.",
    "Welcome to my secure telemetry shell. 👋 Passionate about network forensics, AI-Security, and Kali Linux.",
    "Initiating connection... 👋 Learning to analyze system states, dissect protocol packet layers, and lock down data fields.",
    "Hello, World. 👋 An engineering student utilizing hands-on labs and TryHackMe metrics to scale security barriers."
];

const textToType = introTexts[Math.floor(Math.random() * introTexts.length)];
const speed = 40; 
let textIndex = 0;

function typeWriter() {
    if (textIndex < textToType.length) {
        document.getElementById("typewriter").innerHTML += textToType.charAt(textIndex);
        textIndex++;
        setTimeout(typeWriter, speed);
    }
}
setTimeout(typeWriter, 800);

// Interactive Terminal Simulator Logic
const terminalBody = document.getElementById('terminal-body');
const terminalInput = document.getElementById('terminal-input');

// Command Registry definition
const commands = {
    help: `Available commands:<br>
  - <span class="text-white">whoami</span>   : Display current active identity and bio summary<br>
  - <span class="text-white">skills</span>   : Print breakdown of technical capabilities & tooling<br>
  - <span class="text-white">labs</span>     : Fetch log index of physical and web laboratory modules<br>
  - <span class="text-white">certs</span>    : Display active engineering certifications with verification parameters<br>
  - <span class="text-white">thm</span>      : Query real TryHackMe platform ranking data<br>
  - <span class="text-white">socials</span>  : Output active communication channels & links<br>
  - <span class="text-white">clear</span>    : Reset the screen display terminal console`,
    
    whoami: `identity: <span class="text-white font-bold">Cyb3rVigil</span><br>
status  : Computer Science Engineering Student / Aspiring Pentester<br>
focus   : System security integration, traffic dissection, automated scripts<br>
motto   : Pure practical engineering, hands-on evidence over movie clichés.`,
    
    skills: `Technical Competency Matrices:<br>
---------------------------------------------------------<br>
• <span class="text-white">Reconnaissance</span> : Nmap, Zenmap, Port Audits, Packet Inspection<br>
• <span class="text-white">Simulations</span>    : Ettercap ARP Spoofing, MITM Scenarios, Metasploit<br>
• <span class="text-white">Web Security</span>   : SQL Injection, Reflected XSS, PortSwigger Labs<br>
• <span class="text-white">Scripting/OS</span>   : Python Automation, Bash Systems, Kali Linux, Debian`,
    
    labs: `Completed Labs Index:<br>
---------------------------------------------------------<br>
[01] Network discovery and host mapping audits (Nmap/Zenmap)<br>
[02] Wireshark protocol intercept diagnostics (Captured cleartext HTTP parameter entries)<br>
[03] Intercept simulations: Ettercap ARP poisoning vectors under Kali attacking WinVM<br>
[04] PortSwigger Academy solved targets (SQL Injection database querying & script injection)`,
    
    certs: `Verified Certifications List:<br>
---------------------------------------------------------<br>
- <span class="text-white">Cybersecurity Certification (Tutedude)</span><br>
  ID: TD-ABHI-CS-1135 // <a href="[https://upskill.tutedude.com/certificate/TD-ABHI-CS-1135](https://upskill.tutedude.com/certificate/TD-ABHI-CS-1135)" target="_blank" class="text-blue-400 underline font-bold">[ Verify ]</a><br>
- <span class="text-white">Ethical Hacking Certification (Tutedude)</span><br>
  ID: TD-ABHI-EH-1205 // <a href="[https://upskill.tutedude.com/certificate/TD-ABHI-EH-1205](https://upskill.tutedude.com/certificate/TD-ABHI-EH-1205)" target="_blank" class="text-blue-400 underline font-bold">[ Verify ]</a>`,
    
    thm: `Platform Telemetry (TryHackMe):<br>
---------------------------------------------------------<br>
• <span class="text-white">Global Standing Rank</span> : Top 15% Rank worldwide<br>
• <span class="text-white">Completed Rooms</span>      : 53 Rooms completed successfully<br>
• <span class="text-white">Earned Badges</span>        : 7 active training badges`,
    
    socials: `Active Communications & Connections:<br>
---------------------------------------------------------<br>
- LinkedIn : <a href="[https://www.linkedin.com/in/cyb3rvigil](https://www.linkedin.com/in/cyb3rvigil)" target="_blank" class="text-green-400 underline font-bold">[linkedin.com/in/cyb3rvigil](https://linkedin.com/in/cyb3rvigil)</a><br>
- Twitter  : <a href="[https://x.com/Cyb3rV1gil](https://x.com/Cyb3rV1gil)" target="_blank" class="text-green-400 underline font-bold">[x.com/Cyb3rV1gil](https://x.com/Cyb3rV1gil)</a><br>
- GitHub   : <a href="[https://github.com/cyb3rvigil](https://github.com/cyb3rvigil)" target="_blank" class="text-green-400 underline font-bold">[github.com/cyb3rvigil](https://github.com/cyb3rvigil)</a>`
};

// Command dispatcher function
window.executeTerminalCommand = function(cmdString) {
    const trimmedCmd = cmdString.trim().toLowerCase();
    
    // Print user input prefix line
    const promptLine = document.createElement('div');
    promptLine.innerHTML = `<span class="text-green-500 font-bold font-mono">cyb3rvigil@kali:~$</span> <span class="text-white">${cmdString}</span>`;
    terminalBody.appendChild(promptLine);

    if (trimmedCmd === 'clear') {
        terminalBody.innerHTML = '';
    } else if (trimmedCmd === '') {
        // Do nothing
    } else if (commands[trimmedCmd]) {
        const responseLine = document.createElement('div');
        responseLine.className = 'text-green-300 leading-relaxed pl-2 border-l border-green-900/40 py-1 font-medium';
        responseLine.innerHTML = commands[trimmedCmd];
        terminalBody.appendChild(responseLine);
    } else {
        const errorLine = document.createElement('div');
        errorLine.className = 'text-red-400';
        errorLine.innerHTML = `Command execution error: "${cmdString}" not found. Type <span class="text-white font-bold">help</span> to view active instructions.`;
        terminalBody.appendChild(errorLine);
    }

    // Scroll to bottom of terminal output area
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

// Handle keyboard enter interactions
terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const enteredText = terminalInput.value;
        executeTerminalCommand(enteredText);
        terminalInput.value = ''; // Reset inputs
    }
});
