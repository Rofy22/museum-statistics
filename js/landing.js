// ===== حركة صفحة المقدّمة: عدّادات وأعمدة متحركة + محاكاة نمو حي مستمر =====

let baseLandingStats = null;

function computeLandingStats() {
  const merged = mergeLiveExtra(baseLandingStats);
  const wanderPct = merged.total ? Math.round((merged.wanderers / merged.total) * 100) : 0;
  return {
    total: merged.total,
    avgDwell: merged.avgDwell,
    wanderPct,
    perMuseumCount: merged.perMuseumCount,
  };
}

function renderMiniChart(perMuseumCount) {
  const chart = document.querySelector("#miniChart");
  if (!chart) return;

  const maxCount = Math.max(1, ...museums.map(m => perMuseumCount[m.id]));
  const needsRebuild = chart.children.length !== museums.length;

  if (needsRebuild) {
    chart.innerHTML = museums.map(m => {
      const name = currentLang === "ar" ? m.name_ar : m.name_en;
      return `
        <div class="mini-bar-col">
          <div class="mini-bar" id="miniBar-${m.id}" style="background:${m.color}"></div>
          <div class="mini-bar-label" id="miniBarLabel-${m.id}">${name.replace("متحف ", "")}</div>
        </div>
      `;
    }).join("");
  } else {
    museums.forEach(m => {
      const label = document.querySelector(`#miniBarLabel-${m.id}`);
      if (label) label.textContent = (currentLang === "ar" ? m.name_ar : m.name_en).replace("متحف ", "");
    });
  }

  const applyHeights = () => {
    museums.forEach(m => {
      const pct = Math.round((perMuseumCount[m.id] / maxCount) * 100);
      const bar = document.querySelector(`#miniBar-${m.id}`);
      if (bar) bar.style.height = pct + "%";
    });
  };

  if (needsRebuild) {
    requestAnimationFrame(() => setTimeout(applyHeights, 250));
  } else {
    applyHeights();
  }
}

function renderLandingStats(stats) {
  animateNumber(document.querySelector("#statVisitors"), stats.total);
  animateNumber(document.querySelector("#statDwell"), stats.avgDwell);
  animateNumber(document.querySelector("#statWander"), stats.wanderPct, n => n + "%");
  renderMiniChart(stats.perMuseumCount);
}

let landingStats = null;

function initLanding() {
  const elMuseums = document.querySelector("#statMuseums");
  if (elMuseums) elMuseums.textContent = museums.length;

  baseLandingStats = computeStats(visitorRecords);
  landingStats = computeLandingStats();
  renderLandingStats(landingStats);

  document.addEventListener("languagechange", () => renderMiniChart(landingStats.perMuseumCount));

  setInterval(() => {
    simulateLiveVisitors(randInt(1, 3));
    landingStats = computeLandingStats();
    renderLandingStats(landingStats);
  }, 4000);
}

document.addEventListener("DOMContentLoaded", initLanding);
