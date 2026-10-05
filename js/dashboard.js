// ===== منطق لوحة المعلومات =====

let currentFilter = "all";

function filterRecords(filter) {
  if (filter === "all") return visitorRecords;
  return visitorRecords.filter(r => r.dayType === filter);
}

function renderKPIs(stats) {
  animateNumber(document.querySelector("#kpiTotal"), stats.total);
  animateNumber(document.querySelector("#kpiAtLeastOne"), stats.withMuseum);
  animateNumber(document.querySelector("#kpiWanderers"), stats.wanderers);
  animateNumber(document.querySelector("#kpiAvgDwell"), stats.avgDwell);
}

function renderMuseumCards(stats, animateEntrance) {
  const dict = translations[currentLang];
  const grid = document.querySelector("#museumCards");
  if (!grid) return;

  const maxCount = Math.max(1, ...museums.map(m => stats.perMuseumCount[m.id]));
  const needsRebuild = animateEntrance || grid.children.length !== museums.length;

  if (needsRebuild) {
    grid.innerHTML = museums.map((m, i) => {
      const name = currentLang === "ar" ? m.name_ar : m.name_en;
      const enterClass = animateEntrance ? " museum-card--enter" : "";
      const enterStyle = animateEntrance ? ` style="animation-delay:${(i * 0.07).toFixed(2)}s"` : "";
      return `
        <article class="museum-card${enterClass}"${enterStyle}>
          <div class="museum-visual" style="background-image:linear-gradient(180deg, rgba(0,0,0,0) 45%, ${m.color}cc 100%), url('${m.img}')">
            <span class="museum-icon-badge" style="border-color:${m.color}"><img src="${m.logo}" alt=""></span>
          </div>
          <div class="museum-info">
            <h3>${name}</h3>
            <div class="museum-stat-row">
              <span>${dict.museumCardVisits}</span>
              <span class="museum-stat-value" id="museumVisits-${m.id}">0</span>
            </div>
            <div class="museum-bar-track">
              <div class="museum-bar-fill" id="museumBar-${m.id}" style="width:0%;background:${m.color}"></div>
            </div>
            <div class="museum-stat-row">
              <span>${dict.museumCardAvgDwell}</span>
              <span class="museum-stat-value"><span id="museumDwell-${m.id}">0</span> ${dict.minutesUnit}</span>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  museums.forEach(m => {
    const count = stats.perMuseumCount[m.id];
    const pct = Math.round((count / maxCount) * 100);
    animateNumber(document.querySelector(`#museumVisits-${m.id}`), count);
    animateNumber(document.querySelector(`#museumDwell-${m.id}`), stats.perMuseumAvgDwell[m.id]);
    const bar = document.querySelector(`#museumBar-${m.id}`);
    if (bar) bar.style.width = pct + "%";
  });
}

function refreshDashboard(animateEntrance) {
  const records = filterRecords(currentFilter);
  const baseStats = computeStats(records);
  const stats = currentFilter === "all" ? mergeLiveExtra(baseStats) : baseStats;
  renderKPIs(stats);
  renderMuseumCards(stats, animateEntrance);

  const liveIndicator = document.querySelector("#liveIndicator");
  if (liveIndicator) liveIndicator.hidden = currentFilter !== "all";
}

function initFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      liveExtra = emptyLiveExtra();
      saveLiveExtra();
      refreshDashboard(true);
      calculateHourRangeVisitors();
    });
  });
}

// ===== أداة حساب عدد الزوار بين ساعتين (حسب وقت دخول الزائر للمجمع) =====
function calculateHourRangeVisitors() {
  const fromInput = document.querySelector("#hourRangeFrom");
  const toInput = document.querySelector("#hourRangeTo");
  const resultEl = document.querySelector("#hourRangeResult");
  if (!fromInput || !toInput || !resultEl) return;

  let from = Math.min(23, Math.max(0, Math.round(Number(fromInput.value)) || 0));
  let to = Math.min(23, Math.max(0, Math.round(Number(toInput.value)) || 0));
  if (from > to) [from, to] = [to, from];

  const count = filterRecords(currentFilter)
    .filter(r => r.complexEntryHour >= from && r.complexEntryHour <= to).length;

  animateNumber(resultEl, count);
}

function initHourRangeTool() {
  const fromInput = document.querySelector("#hourRangeFrom");
  const toInput = document.querySelector("#hourRangeTo");
  const btn = document.querySelector("#hourRangeBtn");
  if (!fromInput || !toInput) return;

  btn?.addEventListener("click", calculateHourRangeVisitors);
  fromInput.addEventListener("change", calculateHourRangeVisitors);
  toInput.addEventListener("change", calculateHourRangeVisitors);

  calculateHourRangeVisitors();
}

function startLiveSimulation() {
  setInterval(() => {
    simulateLiveVisitors(randInt(1, 3));
    refreshDashboard();
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  initFilters();
  initHourRangeTool();
  refreshDashboard(true);
  startLiveSimulation();
});

document.addEventListener("languagechange", refreshDashboard);
