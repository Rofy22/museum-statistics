// ===== بيانات تجريبية (Mock Data) لمحاكاة نظام تتبع الزوار =====

// مجموعة أيقونات SVG بسيطة (خطية، أحادية اللون عبر currentColor) بدل الإيموجي
const ICONS = {
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"><path d="M12 2.5l1.9 5.1 5.4.5-4.1 3.6 1.3 5.3L12 14l-4.5 3 1.3-5.3-4.1-3.6 5.4-.5z"/></svg>',
  workshop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14.3 3.7l6 6-8.9 8.9H5v-6.4l9.3-8.5z"/><path d="M12.7 5.3l6 6"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9a2 2 0 0 0 0 4v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a2 2 0 0 1 0-4V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1z"/><path d="M12 6.5v1.4M12 11.3v1.4M12 16.1v1.4"/></svg>',
  gate: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12"/><path d="M4 21h16M9 21V11M15 21V11"/></svg>',
  signal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4.2 15.8a8 8 0 0 1 15.6 0"/><path d="M7.6 16a4.5 4.5 0 0 1 8.8 0"/><circle cx="12" cy="16.3" r="1.3" fill="currentColor" stroke="none"/></svg>',
  compass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><circle cx="12" cy="12" r="8.6"/><path d="M14.8 9.2l-1.8 5.6-5.6 1.8 1.8-5.6z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15" rx="2"/><path d="M8 3v4M16 3v4M3.5 10h17"/></svg>',
  person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.1"/><path d="M5.6 20a6.4 6.4 0 0 1 12.8 0"/></svg>',
  exhibition: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="4" width="17" height="13" rx="1.5"/><path d="M3.5 14l4.5-4.5 3 3 4-5 5.5 6.5"/><circle cx="8.5" cy="8" r="1.3" fill="currentColor" stroke="none"/><path d="M8 20h8"/></svg>',
};

const museums = [
  { id: "m1", name_ar: "متحف الفنون الإسلامية", name_en: "Islamic Arts Museum", color: "#1e3b47", icon: "star", logo: "img/museum-m1.png", img: "https://commons.wikimedia.org/wiki/Special:FilePath/IslamicArtMuseumDohaSkyline.jpg?width=600" },
  { id: "m2", name_ar: "متحف الشفاء", name_en: "Al-Shifa Museum", color: "#c7a338", icon: "star", logo: "img/museum-m2.png", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Bahrain_National_Museum_Exterior.jpg?width=600" },
  { id: "m3", name_ar: "متحف الزهرة", name_en: "Al-Zahra Museum", color: "#4c563f", icon: "star", logo: "img/museum-m3.png", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Sharjah_Museum_of_Islamic_Civilisation_north-west_facade_(22025908913).jpg?width=600" },
  { id: "m4", name_ar: "متحف المكتين", name_en: "Al-Maktain Museum", color: "#8b5e1c", icon: "star", logo: "img/museum-m4.png", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Topkapi_Palace_-_Istanbul_-_12.jpg?width=600" },
  { id: "m5", name_ar: "متحف أميال حجرية", name_en: "Stone Miles Museum", color: "#3d6b7a", icon: "star", logo: "img/museum-m5.png", img: "https://commons.wikimedia.org/wiki/Special:FilePath/Aga_Khan_Museum_in_Toronto-_Exterior.jpg?width=600" },
];

// مولّد أرقام عشوائية بسيط بحيث تكون النتائج ثابتة نسبياً بين التحميلات
function seededRandom(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const rand = seededRandom(20260913);

function randInt(min, max) {
  return Math.floor(rand() * (max - min + 1)) + min;
}

function pickWeighted(weights) {
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rand() * total;
  for (let i = 0; i < weights.length; i++) {
    if (r < weights[i]) return i;
    r -= weights[i];
  }
  return weights.length - 1;
}

// ===== توليد سجل الأيام آخر 90 يوماً =====
const TOTAL_DAYS = 90;
const EVENT_START_DAY = 10;   // فعالية خاصة قصيرة
const EVENT_LENGTH = 4;
const SEASON_START_DAY = 40;  // موسم أطول
const SEASON_LENGTH = 20;

function dayTypeFor(dayIndex) {
  if (dayIndex >= EVENT_START_DAY && dayIndex < EVENT_START_DAY + EVENT_LENGTH) return "event";
  if (dayIndex >= SEASON_START_DAY && dayIndex < SEASON_START_DAY + SEASON_LENGTH) return "season";
  return "regular";
}

function baseVisitorsFor(dayType, isWeekend) {
  let base;
  if (dayType === "event") base = randInt(650, 900);
  else if (dayType === "season") base = randInt(350, 550);
  else base = randInt(120, 260);

  if (isWeekend) base = Math.round(base * 1.35);
  return base;
}

// كم متحف يزوره الشخص الواحد: 0..5 بأوزان مختلفة (معظم الناس يزورون 1-3)
const VISIT_COUNT_WEIGHTS = [8, 22, 30, 22, 12, 6]; // احتمال زيارة 0,1,2,3,4,5 متاحف

function buildVisitorRecords() {
  const records = [];
  const today = new Date();
  let visitorSeq = 1;

  for (let d = TOTAL_DAYS - 1; d >= 0; d--) {
    const date = new Date(today);
    date.setDate(today.getDate() - d);
    const dayIndexFromStart = TOTAL_DAYS - 1 - d;
    const dayType = dayTypeFor(dayIndexFromStart);
    const isWeekend = date.getDay() === 5 || date.getDay() === 6; // الجمعة والسبت

    const totalComplexVisitors = baseVisitorsFor(dayType, isWeekend);

    for (let i = 0; i < totalComplexVisitors; i++) {
      const museumCount = pickWeighted(VISIT_COUNT_WEIGHTS);
      const visitedIds = [];
      const shuffled = [...museums].sort(() => rand() - 0.5);
      for (let m = 0; m < museumCount; m++) visitedIds.push(shuffled[m].id);

      const complexEntryHour = randInt(9, 19);
      const complexEntryMinute = randInt(0, 59);

      const museumVisits = visitedIds.map(museumId => ({
        museumId,
        entryHour: Math.min(20, complexEntryHour + randInt(0, 2)),
        entryMinute: randInt(0, 59),
        dwellMinutes: randInt(10, 60),
      }));

      records.push({
        visitorId: "v" + visitorSeq++,
        dateISO: date.toISOString().slice(0, 10),
        dayType,
        isWeekend,
        complexEntryHour,
        complexEntryMinute,
        museumVisits,
      });
    }
  }

  return records;
}

const visitorRecords = buildVisitorRecords();

// ===== إحصائيات مجمّعة من سجلات الزوار (تُستخدم في الصفحة الرئيسية ولوحة المعلومات) =====
function computeStats(records) {
  const total = records.length;
  const withMuseum = records.filter(r => r.museumVisits.length > 0).length;
  const wanderers = total - withMuseum;

  let dwellSum = 0;
  let dwellCount = 0;
  const perMuseumCount = {};
  const perMuseumDwellSum = {};
  museums.forEach(m => { perMuseumCount[m.id] = 0; perMuseumDwellSum[m.id] = 0; });

  let oneCount = 0;
  let multiCount = 0;

  records.forEach(r => {
    const n = r.museumVisits.length;
    if (n === 1) oneCount++;
    if (n >= 2) multiCount++;

    r.museumVisits.forEach(v => {
      dwellSum += v.dwellMinutes;
      dwellCount++;
      perMuseumCount[v.museumId]++;
      perMuseumDwellSum[v.museumId] += v.dwellMinutes;
    });
  });

  const avgDwell = dwellCount ? Math.round(dwellSum / dwellCount) : 0;

  const perMuseumAvgDwell = {};
  museums.forEach(m => {
    perMuseumAvgDwell[m.id] = perMuseumCount[m.id]
      ? Math.round(perMuseumDwellSum[m.id] / perMuseumCount[m.id])
      : 0;
  });

  // زوار حسب اليوم للرسم الزمني
  const byDate = {};
  records.forEach(r => {
    byDate[r.dateISO] = (byDate[r.dateISO] || 0) + 1;
  });
  const timeline = Object.keys(byDate).sort().map(date => ({ date, count: byDate[date] }));

  return {
    total, withMuseum, wanderers, avgDwell,
    dwellSum, dwellCount,
    perMuseumCount, perMuseumAvgDwell, perMuseumDwellSum,
    breakdown: { zero: wanderers, one: oneCount, multi: multiCount },
    timeline,
  };
}

// ===== محاكاة "قراءة حية" مستمرة (تحاكي أجهزة عدّ فعلية تبعث بيانات باستمرار) =====
function emptyLiveExtra() {
  const perMuseumCount = {};
  const perMuseumDwellSum = {};
  museums.forEach(m => { perMuseumCount[m.id] = 0; perMuseumDwellSum[m.id] = 0; });
  return {
    total: 0, withMuseum: 0, wanderers: 0, one: 0, multi: 0,
    dwellSum: 0, dwellCount: 0,
    perMuseumCount, perMuseumDwellSum,
  };
}

// نحفظ نمو "القراءة الحية" في localStorage بحيث لا يرجع للصفر عند تحديث الصفحة —
// الأرقام تستمر من حيث وصلت بدل ما تتصفّر مع كل refresh.
const LIVE_EXTRA_STORAGE_KEY = "museumStatsLiveExtra";

function loadLiveExtra() {
  const fresh = emptyLiveExtra();
  try {
    const raw = localStorage.getItem(LIVE_EXTRA_STORAGE_KEY);
    if (!raw) return fresh;
    const saved = JSON.parse(raw);
    museums.forEach(m => {
      fresh.perMuseumCount[m.id] = Number(saved.perMuseumCount?.[m.id]) || 0;
      fresh.perMuseumDwellSum[m.id] = Number(saved.perMuseumDwellSum?.[m.id]) || 0;
    });
    fresh.total = Number(saved.total) || 0;
    fresh.withMuseum = Number(saved.withMuseum) || 0;
    fresh.wanderers = Number(saved.wanderers) || 0;
    fresh.one = Number(saved.one) || 0;
    fresh.multi = Number(saved.multi) || 0;
    fresh.dwellSum = Number(saved.dwellSum) || 0;
    fresh.dwellCount = Number(saved.dwellCount) || 0;
    return fresh;
  } catch (e) {
    return fresh;
  }
}

function saveLiveExtra() {
  try {
    localStorage.setItem(LIVE_EXTRA_STORAGE_KEY, JSON.stringify(liveExtra));
  } catch (e) { /* تجاهل (وضع تصفّح خاص مثلاً) */ }
}

let liveExtra = loadLiveExtra();

function simulateLiveVisitors(n) {
  for (let i = 0; i < n; i++) {
    const museumCount = pickWeighted(VISIT_COUNT_WEIGHTS);
    liveExtra.total++;

    if (museumCount === 0) {
      liveExtra.wanderers++;
      continue;
    }

    liveExtra.withMuseum++;
    if (museumCount === 1) liveExtra.one++; else liveExtra.multi++;

    const shuffled = [...museums].sort(() => rand() - 0.5);
    for (let m = 0; m < museumCount; m++) {
      const museumId = shuffled[m].id;
      const dwell = randInt(10, 60);
      liveExtra.perMuseumCount[museumId]++;
      liveExtra.perMuseumDwellSum[museumId] += dwell;
      liveExtra.dwellSum += dwell;
      liveExtra.dwellCount++;
    }
  }
  saveLiveExtra();
}

function mergeLiveExtra(stats) {
  const perMuseumCount = {};
  const perMuseumDwellSum = {};
  const perMuseumAvgDwell = {};

  museums.forEach(m => {
    perMuseumCount[m.id] = stats.perMuseumCount[m.id] + liveExtra.perMuseumCount[m.id];
    perMuseumDwellSum[m.id] = stats.perMuseumDwellSum[m.id] + liveExtra.perMuseumDwellSum[m.id];
    perMuseumAvgDwell[m.id] = perMuseumCount[m.id]
      ? Math.round(perMuseumDwellSum[m.id] / perMuseumCount[m.id])
      : 0;
  });

  const dwellSum = stats.dwellSum + liveExtra.dwellSum;
  const dwellCount = stats.dwellCount + liveExtra.dwellCount;
  const avgDwell = dwellCount ? Math.round(dwellSum / dwellCount) : 0;

  const timeline = stats.timeline.slice();
  if (timeline.length && liveExtra.total) {
    const last = { ...timeline[timeline.length - 1] };
    last.count += liveExtra.total;
    timeline[timeline.length - 1] = last;
  }

  return {
    total: stats.total + liveExtra.total,
    withMuseum: stats.withMuseum + liveExtra.withMuseum,
    wanderers: stats.wanderers + liveExtra.wanderers,
    avgDwell, dwellSum, dwellCount,
    perMuseumCount, perMuseumAvgDwell, perMuseumDwellSum,
    breakdown: {
      zero: stats.breakdown.zero + liveExtra.wanderers,
      one: stats.breakdown.one + liveExtra.one,
      multi: stats.breakdown.multi + liveExtra.multi,
    },
    timeline,
  };
}

// ===== أرقام وعدّاد متحرك (مشترك بين الصفحة الرئيسية ولوحة المعلومات) =====
function formatNumber(n) {
  return n.toLocaleString("en-US");
}

// يحوّل وقت على صيغة 24 ساعة (نص "HH:MM" أو كائن Date) إلى صيغة 12 ساعة مع AM/PM
function formatTime12h(input) {
  let hours, minutes;
  if (input instanceof Date) {
    hours = input.getHours();
    minutes = input.getMinutes();
  } else {
    const [h, m] = String(input).split(":");
    hours = parseInt(h, 10) || 0;
    minutes = parseInt(m, 10) || 0;
  }
  const period = hours >= 12 ? "PM" : "AM";
  let h12 = hours % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}:${String(minutes).padStart(2, "0")} ${period}`;
}

const REDUCED_MOTION = matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateNumber(el, target, formatter = formatNumber, duration = 650) {
  if (!el) return;
  const start = Number(el.dataset.value || 0);
  el.dataset.value = target;

  if (REDUCED_MOTION || start === target) {
    el.textContent = formatter(target);
    return;
  }

  const startTime = performance.now();
  function frame(now) {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (target - start) * eased);
    el.textContent = formatter(value);
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
