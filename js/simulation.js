// ===== محاكاة نظام تذاكر QR: زوار يتحركون بين الساحة، موظف التذاكر، الورشة، والمتاحف الخمسة =====

const SIM_WORKSHOP = { id: "workshop", color: "#b98a4a", icon: "workshop" };
const SIM_EXHIBITION = { id: "exhibition", color: "#74815f", icon: "exhibition" };

const SIM_LAYOUT = {
  plaza: { x: 50, y: 88 },
  booth: { x: 50, y: 68 },
};

function buildSimNodePositions() {
  const items = [SIM_WORKSHOP, SIM_EXHIBITION, ...museums];
  const positions = {};
  items.forEach((item, i) => {
    positions[item.id] = { x: 10 + i * (80 / (items.length - 1)), y: 18 };
  });
  return positions;
}

const SIM_NODE_POS = buildSimNodePositions();

function simRandInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandomMuseumIds(n) {
  return [...museums].sort(() => Math.random() - 0.5).slice(0, n).map(m => m.id);
}

// ===== أنواع رحلات الزوار =====
const SCENARIOS = [
  {
    id: "oneMuseum", weight: 26, color: "#1e3b47", labelKey: "simScenarioOneMuseum",
    buysTicket: true, buildPath: () => pickRandomMuseumIds(1),
  },
  {
    id: "multiMuseum", weight: 19, color: "#c7a338", labelKey: "simScenarioMultiMuseum",
    buysTicket: true, buildPath: () => pickRandomMuseumIds(simRandInt(2, 3)),
  },
  {
    id: "noTicket", weight: 10, color: "#6e7c80", labelKey: "simScenarioNoTicket",
    buysTicket: false, buildPath: () => [],
  },
  {
    id: "workshopMuseum", weight: 14, color: "#8b5e1c", labelKey: "simScenarioWorkshopMuseum",
    buysTicket: true, buildPath: () => ["workshop", ...pickRandomMuseumIds(simRandInt(1, 2))],
  },
  {
    id: "workshopOnly", weight: 10, color: "#b98a4a", labelKey: "simScenarioWorkshopOnly",
    buysTicket: true, buildPath: () => ["workshop"],
  },
  {
    id: "exhibitionMuseum", weight: 12, color: "#74815f", labelKey: "simScenarioExhibitionMuseum",
    buysTicket: true, buildPath: () => ["exhibition", ...pickRandomMuseumIds(simRandInt(1, 2))],
  },
  {
    id: "exhibitionOnly", weight: 9, color: "#9aab83", labelKey: "simScenarioExhibitionOnly",
    buysTicket: true, buildPath: () => ["exhibition"],
  },
];

const simCounts = {};
SCENARIOS.forEach(s => { simCounts[s.id] = 0; });

function pickScenario() {
  const total = SCENARIOS.reduce((sum, s) => sum + s.weight, 0);
  let r = Math.random() * total;
  for (const s of SCENARIOS) {
    if (r < s.weight) return s;
    r -= s.weight;
  }
  return SCENARIOS[SCENARIOS.length - 1];
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function formatClock(date) {
  return formatTime12h(date);
}

// ===== بناء المشهد (العُقد الثابتة) =====
function buildStage() {
  const stage = document.querySelector("#simStage");
  if (!stage) return;
  const dict = translations[currentLang];

  const destNodes = [SIM_WORKSHOP, SIM_EXHIBITION, ...museums].map(item => {
    const pos = SIM_NODE_POS[item.id];
    const isMuseum = !!item.logo;
    const name = item.id === "workshop"
      ? dict.simWorkshopLabel
      : item.id === "exhibition"
      ? dict.simExhibitionLabel
      : (currentLang === "ar" ? item.name_ar : item.name_en);
    const iconHtml = isMuseum
      ? `<img src="${item.logo}" alt="">`
      : ICONS[item.icon];
    const iconStyle = isMuseum ? "" : `background:${item.color}`;
    return `
      <div class="sim-node" id="simNode-${item.id}" style="left:${pos.x}%; top:${pos.y}%;">
        <div class="sim-node-icon${isMuseum ? " sim-node-icon--museum" : ""}" style="${iconStyle}">${iconHtml}</div>
        <div class="sim-node-label">${name}</div>
      </div>
    `;
  }).join("");

  stage.innerHTML = `
    ${destNodes}
    <div class="sim-node" id="simNode-booth" style="left:${SIM_LAYOUT.booth.x}%; top:${SIM_LAYOUT.booth.y}%;">
      <div class="sim-node-icon sim-node-icon--booth">${ICONS.ticket}</div>
      <div class="sim-node-label">${dict.simBoothLabel}</div>
    </div>
    <div class="sim-node" id="simNode-plaza" style="left:${SIM_LAYOUT.plaza.x}%; top:${SIM_LAYOUT.plaza.y}%;">
      <div class="sim-node-icon sim-node-icon--plaza">${ICONS.gate}</div>
      <div class="sim-node-label">${dict.simPlazaLabel}</div>
    </div>
    <div class="sim-visitors" id="simVisitors"></div>
  `;
}

function buildLegend() {
  const legend = document.querySelector("#simLegend");
  if (!legend) return;
  const dict = translations[currentLang];

  legend.innerHTML = SCENARIOS.map(s => `
    <div class="sim-legend-row">
      <span class="sim-legend-dot" style="background:${s.color}"></span>
      <span class="sim-legend-label">${dict[s.labelKey]}</span>
      <span class="sim-legend-count" id="simCount-${s.id}">0</span>
    </div>
  `).join("");

  SCENARIOS.forEach(s => {
    const el = document.querySelector(`#simCount-${s.id}`);
    if (el) { el.dataset.value = simCounts[s.id]; el.textContent = formatNumber(simCounts[s.id]); }
  });
}

function pulseNode(key) {
  const node = document.querySelector(`#simNode-${key}`);
  if (!node) return;
  node.classList.remove("sim-node--scan");
  void node.offsetWidth; // إعادة تشغيل الأنيميشن حتى لو تكرر بسرعة
  node.classList.add("sim-node--scan");
}

async function moveVisitor(el, key) {
  const pos = key === "plaza" ? SIM_LAYOUT.plaza : key === "booth" ? SIM_LAYOUT.booth : SIM_NODE_POS[key];
  if (!pos) return;
  el.style.left = pos.x + "%";
  el.style.top = pos.y + "%";
  await delay(950);
}

async function showTicketPopup(groupSize, museumCount, hasWorkshop, hasExhibition) {
  const stage = document.querySelector("#simStage");
  if (!stage) return;
  const dict = translations[currentLang];

  const museumsPart = museumCount > 0
    ? `${formatNumber(museumCount)} ${dict.simPopupMuseums}`
    : "";
  const workshopPart = hasWorkshop ? dict.simWorkshopLabel : "";
  const exhibitionPart = hasExhibition ? dict.simExhibitionLabel : "";
  const parts = [`${formatNumber(groupSize)} ${dict.simPopupVisitors}`, museumsPart, workshopPart, exhibitionPart].filter(Boolean);

  const popup = document.createElement("div");
  popup.className = "sim-ticket-popup";
  popup.style.left = SIM_LAYOUT.booth.x + "%";
  popup.style.top = SIM_LAYOUT.booth.y + "%";
  popup.innerHTML = `
    <div>${parts.join(" · ")}</div>
    <div class="sim-ticket-time">${formatClock(new Date())}</div>
  `;
  stage.appendChild(popup);

  requestAnimationFrame(() => popup.classList.add("sim-ticket-popup--show"));
  await delay(1300);
  popup.classList.remove("sim-ticket-popup--show");
  await delay(350);
  popup.remove();
}

async function runVisitorJourney(scenario) {
  simCounts[scenario.id]++;
  const countEl = document.querySelector(`#simCount-${scenario.id}`);
  if (countEl) animateNumber(countEl, simCounts[scenario.id]);

  const visitorsLayer = document.querySelector("#simVisitors");
  if (!visitorsLayer) return;

  const groupSize = simRandInt(1, 4);
  const path = scenario.buildPath();
  const museumCount = path.filter(p => p !== "workshop" && p !== "exhibition").length;
  const hasWorkshop = path.includes("workshop");
  const hasExhibition = path.includes("exhibition");

  const token = document.createElement("div");
  token.className = "sim-visitor";
  token.style.borderColor = scenario.color;
  token.style.left = SIM_LAYOUT.plaza.x + "%";
  token.style.top = SIM_LAYOUT.plaza.y + "%";
  if (scenario.buysTicket) {
    token.textContent = String(groupSize);
  } else {
    token.innerHTML = ICONS.person;
  }
  visitorsLayer.appendChild(token);
  requestAnimationFrame(() => { token.style.opacity = "1"; });

  await delay(300);

  if (scenario.buysTicket) {
    await moveVisitor(token, "booth");
    await showTicketPopup(groupSize, museumCount, hasWorkshop, hasExhibition);
  } else {
    await delay(500);
  }

  for (const stop of path) {
    await moveVisitor(token, stop);
    pulseNode(stop);
    await delay(700);
    pulseNode(stop);
    await delay(250);
  }

  await moveVisitor(token, "plaza");
  token.style.opacity = "0";
  await delay(400);
  token.remove();
}

let simRunning = true;
let simTimer = null;

function scheduleNextVisitor() {
  if (!simRunning) return;
  simTimer = setTimeout(() => {
    runVisitorJourney(pickScenario());
    scheduleNextVisitor();
  }, 1800 + Math.random() * 1400);
}

function initSimToggle() {
  const btn = document.querySelector("#simToggleBtn");
  if (!btn) return;

  btn.removeAttribute("data-i18n");
  btn.addEventListener("click", () => {
    simRunning = !simRunning;
    refreshSimToggleLabel();
    if (simRunning) scheduleNextVisitor();
    else if (simTimer) clearTimeout(simTimer);
  });
}

function refreshSimToggleLabel() {
  const btn = document.querySelector("#simToggleBtn");
  if (!btn) return;
  btn.textContent = translations[currentLang][simRunning ? "simPauseBtn" : "simPlayBtn"];
}

function initSimulation() {
  buildStage();
  buildLegend();
  initSimToggle();
  scheduleNextVisitor();

  document.addEventListener("languagechange", () => {
    buildStage();
    buildLegend();
    refreshSimToggleLabel();
  });
}

document.addEventListener("DOMContentLoaded", initSimulation);
