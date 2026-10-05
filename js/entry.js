// ===== منطق صفحة الإدخال اليدوي — متصلة بقاعدة بيانات Supabase (مشتركة بين كل من يفتح الصفحة) =====

const SUPABASE_URL = "https://lxmlbyflcyakcjpczdce.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx4bWxieWZsY3lha2NqcGN6ZGNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NTc1OTcsImV4cCI6MjEwNjMzMzU5N30.kWHcQzHQvpcR5UnYwUOrD5UR_DGSHInOqnWN81YBbX4";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let manualEntries = [];

async function fetchManualEntries() {
  const { data, error } = await sb
    .from("manual_entries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Supabase load error:", error);
    showEntryStatus(translations[currentLang].entrySyncError);
    return [];
  }
  return data || [];
}

async function insertManualEntry(record) {
  const { error } = await sb.from("manual_entries").insert(record);
  if (error) {
    console.error("Supabase insert error:", error);
    showEntryStatus(translations[currentLang].entrySyncError);
    return false;
  }
  return true;
}

async function deleteManualEntry(id) {
  const { error } = await sb.from("manual_entries").delete().eq("id", id);
  if (error) {
    console.error("Supabase delete error:", error);
    showEntryStatus(translations[currentLang].entrySyncError);
  }
}

function showEntryStatus(message) {
  const el = document.querySelector("#entryStatus");
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
}

function clearEntryStatus() {
  const el = document.querySelector("#entryStatus");
  if (!el) return;
  el.hidden = true;
  el.textContent = "";
}

// ===== التاريخ والوقت يُقرآن من ساعة الجهاز مباشرة (بدون إدخال يدوي) =====
function currentDateString() {
  return new Date().toISOString().slice(0, 10);
}

function currentTimeString() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

function refreshNowDisplay() {
  const dateEl = document.querySelector("#entryDateDisplay");
  const timeEl = document.querySelector("#entryTimeDisplay");
  if (dateEl) dateEl.textContent = currentDateString();
  if (timeEl) timeEl.textContent = formatTime12h(currentTimeString());
}

const EXTRA_FIELDS = [
  { id: "workshop", labelKey: "entryWorkshopLabel", color: "#b98a4a" },
  { id: "exhibition", labelKey: "entryExhibitionLabel", color: "#74815f" },
];

function buildMuseumFields() {
  const dict = translations[currentLang];
  const container = document.querySelector("#museumInputs");
  if (!container) return;

  const museumFields = museums.map(m => {
    const name = currentLang === "ar" ? m.name_ar : m.name_en;
    return `
      <label class="museum-check">
        <input type="checkbox" id="visitors-${m.id}">
        <span class="museum-check-circle" style="--check-color:${m.color}"></span>
        <span class="museum-check-label">${name}</span>
      </label>
    `;
  }).join("");

  const extraFields = EXTRA_FIELDS.map(f => `
    <label class="museum-check">
      <input type="checkbox" id="visitors-${f.id}">
      <span class="museum-check-circle" style="--check-color:${f.color}"></span>
      <span class="museum-check-label">${dict[f.labelKey]}</span>
    </label>
  `).join("");

  container.innerHTML = museumFields + extraFields;
}

function buildEntriesTableHead() {
  const dict = translations[currentLang];
  const head = document.querySelector("#entriesTableHead");
  if (!head) return;

  const museumHeaders = museums.map(m => `<th>${currentLang === "ar" ? m.name_ar : m.name_en}</th>`).join("");
  const extraHeaders = EXTRA_FIELDS.map(f => `<th>${dict[f.labelKey]}</th>`).join("");
  head.innerHTML = `
    <tr>
      <th>${dict.entriesDateCol}</th>
      <th>${dict.entriesTimeCol}</th>
      ${museumHeaders}
      ${extraHeaders}
      <th>${dict.entryInquiryLabel}</th>
      <th>${dict.entriesAdultCol}</th>
      <th>${dict.entriesActionCol}</th>
    </tr>
  `;
}

function renderEntriesTable() {
  const dict = translations[currentLang];
  const body = document.querySelector("#entriesTableBody");
  if (!body) return;

  if (!manualEntries.length) {
    body.innerHTML = `<tr><td colspan="${museums.length + EXTRA_FIELDS.length + 5}" class="entries-empty">${dict.entriesEmpty}</td></tr>`;
    return;
  }

  body.innerHTML = manualEntries.map(entry => {
    const entryMuseums = entry.museums || {};
    const museumCells = museums.map(m => `<td>${entryMuseums[m.id] ? "✓" : "—"}</td>`).join("");
    const extraCells = EXTRA_FIELDS.map(f => `<td>${entryMuseums[f.id] ? "✓" : "—"}</td>`).join("");
    return `
      <tr>
        <td>${entry.entry_date}</td>
        <td>${formatTime12h(entry.entry_time)}</td>
        ${museumCells}
        ${extraCells}
        <td>${entry.child_tickets ? "✓" : "—"}</td>
        <td>${formatNumber(entry.adult_tickets || 0)}</td>
        <td><button type="button" class="btn-danger-outline entry-delete-btn" data-id="${entry.id}">${dict.entriesDelete}</button></td>
      </tr>
    `;
  }).join("");
}

async function reloadEntries() {
  manualEntries = await fetchManualEntries();
  renderEntriesTable();
}

function refreshEntryPage() {
  buildMuseumFields();
  buildEntriesTableHead();
  renderEntriesTable();
  refreshNowDisplay();
}

async function initEntryForm() {
  refreshEntryPage();
  setInterval(refreshNowDisplay, 30000);

  await reloadEntries();

  const form = document.querySelector("#entryForm");
  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearEntryStatus();

    const museumsChecked = {};
    museums.forEach(m => {
      const input = document.querySelector(`#visitors-${m.id}`);
      museumsChecked[m.id] = input?.checked ? 1 : 0;
    });
    EXTRA_FIELDS.forEach(f => {
      const input = document.querySelector(`#visitors-${f.id}`);
      museumsChecked[f.id] = input?.checked ? 1 : 0;
    });
    const adultTickets = Math.max(0, Math.round(Number(document.querySelector("#entryAdultTickets")?.value) || 0));
    const inquiry = document.querySelector("#entryInquiry")?.checked ? 1 : 0;

    const submitBtn = form.querySelector("button[type=submit]");
    if (submitBtn) submitBtn.disabled = true;
    showLoadingOverlay();

    const ok = await insertManualEntry({
      entry_date: currentDateString(),
      entry_time: currentTimeString(),
      museums: museumsChecked,
      adult_tickets: adultTickets,
      child_tickets: inquiry,
    });

    if (submitBtn) submitBtn.disabled = false;

    if (ok) {
      form.reset();
      refreshNowDisplay();
      await reloadEntries();
    }
    hideLoadingOverlay();
  });

  document.querySelector("#entriesTableBody")?.addEventListener("click", async (e) => {
    const btn = e.target.closest(".entry-delete-btn");
    if (!btn) return;
    clearEntryStatus();
    btn.disabled = true;
    await deleteManualEntry(btn.dataset.id);
    await reloadEntries();
  });

  document.addEventListener("languagechange", refreshEntryPage);
}

document.addEventListener("DOMContentLoaded", initEntryForm);
