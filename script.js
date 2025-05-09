// Theme Toggle
function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem("theme") || "dark";
  body.dataset.theme = savedTheme;
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";
  themeToggle.setAttribute("aria-label", savedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode");

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    const currentTheme = body.dataset.theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.dataset.theme = newTheme;
    themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
    themeToggle.setAttribute("aria-label", newTheme === "dark" ? "Switch to light mode" : "Switch to dark mode");
    localStorage.setItem("theme", newTheme);
  });
}

// Live Clock
function updateClock() {
  const clock = document.getElementById("liveClock");
  const now = new Date();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  clock.textContent = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}:${seconds}`;
}
setInterval(updateClock, 1000);
updateClock();

// Ambient Orbs
function createOrbs() {
  const container = document.getElementById("ambientOrbs");
  for (let i = 0; i < 3; i++) {
    const orb = document.createElement("div");
    orb.className = "orb";
    const size = Math.random() * 8 + 8; // 8-16px
    orb.style.width = `${size}px`;
    orb.style.height = `${size}px`;
    orb.style.left = `${Math.random() * 100}vw`;
    orb.style.top = `${Math.random() * 100}vh`;
    orb.style.animationDelay = `${Math.random() * -10}s`;
    container.appendChild(orb);
  }
}
createOrbs();

// Particle Background (Hero)
const particleCanvas = document.getElementById("particleCanvas");
const particleCtx = particleCanvas.getContext("2d");
particleCanvas.width = window.innerWidth;
particleCanvas.height = window.innerHeight;

const particles = [];
class Particle {
  constructor() {
    this.x = Math.random() * particleCanvas.width;
    this.y = Math.random() * particleCanvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = Math.random() * 0.2 - 0.1;
    this.speedY = Math.random() * 0.2 - 0.1;
    this.opacity = Math.random() * 0.3 + 0.1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;
  }
  draw() {
    particleCtx.globalAlpha = this.opacity;
    particleCtx.fillStyle = document.body.dataset.theme === "dark" ? "#a5b4fc" : "#60a5fa";
    particleCtx.beginPath();
    particleCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    particleCtx.fill();
    particleCtx.globalAlpha = 1;
  }
}

function initParticles() {
  for (let i = 0; i < 30; i++) particles.push(new Particle());
}

let lastParticleFrame = 0;
function animateParticles(timestamp) {
  if (timestamp - lastParticleFrame < 20) {
    requestAnimationFrame(animateParticles);
    return;
  }
  lastParticleFrame = timestamp;
  particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();
window.addEventListener("resize", () => {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
});

// Glitter Effect (Result)
const glitterCanvas = document.getElementById("glitterCanvas");
const glitterCtx = glitterCanvas.getContext("2d");

function resizeGlitterCanvas() {
  glitterCanvas.width = glitterCanvas.parentElement.offsetWidth;
  glitterCanvas.height = glitterCanvas.parentElement.offsetHeight;
}
resizeGlitterCanvas();
window.addEventListener("resize", resizeGlitterCanvas);

const glitters = [];
class Glitter {
  constructor() {
    this.x = Math.random() * glitterCanvas.width;
    this.y = Math.random() * glitterCanvas.height;
    this.size = Math.random() * 2 + 2; // 2-4px
    this.opacity = Math.random() * 0.3 + 0.2;
    this.speedX = Math.random() * 0.1 - 0.05;
    this.speedY = Math.random() * 0.1 - 0.05;
    this.fadeSpeed = Math.random() * 0.01 + 0.005;
    this.fadeDirection = 1;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > glitterCanvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > glitterCanvas.height) this.speedY *= -1;
    this.opacity += this.fadeSpeed * this.fadeDirection;
    if (this.opacity > 0.5 || this.opacity < 0.2) this.fadeDirection *= -1;
  }
  draw() {
    glitterCtx.globalAlpha = this.opacity;
    glitterCtx.fillStyle = document.body.dataset.theme === "dark" ? 
      (Math.random() > cached/0.5 ? "#4b5dfa" : "#a5b4fc") : 
      (Math.random() > 0.5 ? "#60a5fa" : "#93c5fd");
    glitterCtx.beginPath();
    glitterCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    glitterCtx.fill();
    glitterCtx.globalAlpha = 1;
  }
}

function initGlitter() {
  for (let i = 0; i < 20; i++) glitters.push(new Glitter());
}

let lastGlitterFrame = 0;
function animateGlitter(timestamp) {
  if (timestamp - lastGlitterFrame < 50) {
    requestAnimationFrame(animateGlitter);
    return;
  }
  lastGlitterFrame = timestamp;
  glitterCtx.clearRect(0, 0, glitterCanvas.width, glitterCanvas.height);
  glitters.forEach(g => {
    g.update();
    g.draw();
  });
  requestAnimationFrame(animateGlitter);
}

initGlitter();
animateGlitter();

// Startup Animation
function triggerReveal() {
  const reveals = document.querySelectorAll(".reveal");
  reveals.forEach((el, index) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, index * 200);
  });
}

// Trigger on load
window.addEventListener("load", triggerReveal);

// Input Validation
document.getElementById("linkInput").addEventListener("input", function () {
  const input = this.value.trim();
  const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?|localhost)(:\d+)?(\/.*)?$/i;
  const isValid = urlPattern.test(input);
  this.style.border = isValid || input === "" ? "none" : "2px solid #ef4444";
});

// Enter Key to Scan
document.getElementById("linkInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    document.querySelector(".scan-button").click();
  }
});

// History Management
function loadHistory() {
  const history = JSON.parse(localStorage.getItem("scanHistory") || "[]");
  const historyList = document.getElementById("historyList");
  historyList.innerHTML = history.length ? "" : "<p>No scans yet.</p>";
  
  history.forEach((scan, index) => {
    const riskLevel = scan.abuse_score > 70 ? "high" : scan.abuse_score > 30 ? "medium" : "low";
    const riskColor = riskLevel === "high" ? "#ef4444" : riskLevel === "medium" ? "#f59e0b" : "#10b981";
    const riskText = riskLevel === "high" ? "🚨 High Risk: Avoid!" : 
                     riskLevel === "medium" ? "⚠️ Caution: Potential Risk" : 
                     "✅ Safe: No Major Issues";
    
    const historyItem = document.createElement("div");
    historyItem.className = `history-item ${riskLevel}-risk`;
    historyItem.innerHTML = `
      <div class="history-content">
        <h3 style="color: ${document.body.dataset.theme === 'dark' ? '#a5b4fc' : '#1e40af'}">${scan.url}</h3>
        <ul>
          <li><strong>IP:</strong> ${scan.ip}</li>
          <li><strong>Location:</strong> ${scan.city}, ${scan.country}</li>
          <li><strong>ISP:</strong> ${scan.org}</li>
          <li><strong>Abuse Score:</strong> <span style="color: ${riskColor}">${scan.abuse_score}/100</span></li>
          <li><strong>VirusTotal:</strong> ${scan.malicious} malicious, ${scan.suspicious} suspicious</li>
          <li><strong>Scanned:</strong> ${new Date(scan.timestamp).toLocaleString()}</li>
        </ul>
        <p style="color: ${riskColor}; background: rgba(${parseInt(riskColor.slice(1,3), 16)}, ${parseInt(riskColor.slice(3,5), 16)}, ${parseInt(riskColor.slice(5), 16)}, 0.2);">
          ${riskText}
        </p>
        <button class="rescan-button" onclick="rescanUrl('${scan.url}')" aria-label="Rescan ${scan.url}">Rescan</button>
      </div>
    `;
    historyList.appendChild(historyItem);
  });
}

function saveToHistory(data, url) {
  const history = JSON.parse(localStorage.getItem("scanHistory") || "[]");
  history.unshift({
    url,
    ip: data.ip,
    city: data.city,
    country: data.country,
    org: data.org,
    abuse_score: data.abuse_score,
    malicious: data.malicious,
    suspicious: data.suspicious,
    timestamp: Date.now()
  });
  // Limit history to 10 entries
  if (history.length > 10) history.pop();
  localStorage.setItem("scanHistory", JSON.stringify(history));
  loadHistory();
}

function rescanUrl(url) {
  document.getElementById("linkInput").value = url;
  checkScam();
}

// Scan Function
function checkScam() {
  const input = document.getElementById("linkInput").value.trim();
  const result = document.getElementById("result");
  const loading = document.getElementById("loading");

  result.innerHTML = `<canvas id="glitterCanvas" aria-hidden="true"></canvas>`;
  result.classList.remove("card", "scan-reveal", "high-risk", "medium-risk", "low-risk");
  loading.classList.remove("hidden");

  // Reinitialize glitter canvas
  const newGlitterCanvas = document.getElementById("glitterCanvas");
  glitterCanvas.width = result.offsetWidth;
  glitterCanvas.height = result.offsetHeight;
  glitters.length = 0;
  initGlitter();

  if (input === "") {
    result.innerHTML = `
      <canvas id="glitterCanvas" aria-hidden="true"></canvas>
      <p style="color: #ef4444; background: rgba(239, 68, 68, 0.2); padding: 0.5rem; border-radius: 6px;">
        ⚠️ Please enter a valid URL.
      </p>`;
    loading.classList.add("hidden");
    return;
  }

  fetch("/scan", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: input })
  })
    .then(res => res.json())
    .then(data => {
      loading.classList.add("hidden");
      result.classList.add("card", "scan-reveal");

      if (data.error) {
        result.innerHTML = `
          <canvas id="glitterCanvas" aria-hidden="true"></canvas>
          <p style="color: #ef4444; background: rgba(239, 68, 68, 0.2); padding: 0.5rem; border-radius: 6px;">
            ❌ ${data.error}
          </p>`;
        return;
      }

      // Save to history
      saveToHistory(data, input);

      const riskLevel = data.abuse_score > 70 ? "high" : data.abuse_score > 30 ? "medium" : "low";
      const riskColor = riskLevel === "high" ? "#ef4444" : riskLevel === "medium" ? "#f59e0b" : "#10b981";
      const riskText = riskLevel === "high" ? "🚨 High Risk: Avoid!" : 
                       riskLevel === "medium" ? "⚠️ Caution: Potential Risk" : 
                       "✅ Safe: No Major Issues";
      result.classList.add(`${riskLevel}-risk`);

      result.innerHTML = `
        <canvas id="glitterCanvas" aria-hidden="true"></canvas>
        <h3>📋 Scan Report: <span style="color: ${document.body.dataset.theme === 'dark' ? '#a5b4fc' : '#1e40af'}">${input}</span></h3>
        <ul>
          <li><strong>IP:</strong> ${data.ip}</li>
          <li><strong>Location:</strong> ${data.city}, ${data.country}</li>
          <li><strong>ISP:</strong> ${data.org}</li>
          <li>
            <strong>Abuse Score:</strong> 
            <span style="color: ${riskColor}">${data.abuse_score}/100</span>
            <div class="radial-progress">
              <svg width="50" height="50">
                <circle class="bg" cx="25" cy="25" r="22"></circle>
                <circle class="progress" cx="25" cy="25" r="22" stroke="${riskColor}" stroke-dasharray="138.16" stroke-dashoffset="${138.16 * (1 - data.abuse_score / 100)}"></circle>
              </svg>
              <span>${data.abuse_score}%</span>
            </div>
          </li>
          <li><strong>VirusTotal:</strong> ${data.malicious} malicious, ${data.suspicious} suspicious</li>
        </ul>
        <p style="color: ${riskColor}; background: rgba(${parseInt(riskColor.slice(1,3), 16)}, ${parseInt(riskColor.slice(3,5), 16)}, ${parseInt(riskColor.slice(5), 16)}, 0.2);">
          ${riskText}
        </p>
      `;
      // Reinitialize glitter canvas after DOM update
      const updatedGlitterCanvas = document.getElementById("glitterCanvas");
      glitterCanvas.width = result.offsetWidth;
      glitterCanvas.height = result.offsetHeight;
    })
    .catch(() => {
      loading.classList.add("hidden");
      result.classList.add("card");
      result.innerHTML = `
        <canvas id="glitterCanvas" aria-hidden="true"></canvas>
        <p style="color: #ef4444; background: rgba(239, 68, 68, 0.2); padding: 0.5rem; border-radius: 6px;">
          ❌ Error: Unable to scan. Try again.
        </p>`;
    });
}

// Initialize Theme and History
initializeTheme();
loadHistory();