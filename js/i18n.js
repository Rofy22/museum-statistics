// ===== قاموس الترجمة (عربي / إنجليزي) =====
const translations = {
  ar: {
    brand: "إحصائيات المتحف",
    navHome: "الرئيسية",
    navDashboard: "لوحة المعلومات",
    navEntry: "الإدخال اليدوي",
    navSimulation: "محاكاة QR",

    heroEyebrow: "نظام إحصائيات ذكي لمجمع المتاحف",
    heroTitle: "اعرف حركة كل زائر داخل متاحف دار الفنون الإسلامية",
    heroSubtitle: "نظام واحد يرصد كل دخول وخروج، يحسب مدة كل زيارة، ويكشف من دخل المجمع ولم يزر أي متحف — في لوحة حية تتحدث كل لحظة.",
    ctaDashboard: "افتح لوحة المعلومات الحية",
    ctaSimulation: "شاهد محاكاة نظام التذاكر",

    statVisitorsLabel: "زائر خلال آخر 90 يوماً",
    statMuseumsLabel: "متاحف مربوطة بنظام واحد",
    statDwellLabel: "دقيقة متوسط مدة الزيارة",
    statWanderLabel: "من الزوار لم يدخلوا أي متحف",

    miniChartTitle: "توزيع الزيارات بين المتاحف الخمسة",

    feat1Title: "قراءة حيّة مستمرة",
    feat1Desc: "الأرقام تتحدث لحظة بلحظة، كأنها قادمة مباشرة من أجهزة عدّ فعلية عند كل باب.",
    feat2Title: "كشف الزوار المتجولين",
    feat2Desc: "مقارنة تلقائية بين سجل البوابة الرئيسية وسجلات أبواب المتاحف الخمسة.",
    feat3Title: "تقارير فعاليات",
    feat3Desc: "قارني الإقبال بين الأيام العادية والفعاليات الخاصة بضغطة واحدة.",
    dashboardTitle: "لوحة إحصائيات الزوار",
    dashboardSubtitle: "نظرة شاملة على حركة الزوار عبر متاحف المجمع الخمسة، بناءً على بيانات تجريبية توضّح شكل النظام المقترح.",

    filterAll: "كل الفترة",
    filterRegular: "أيام عادية",
    filterEvent: "فعالية خاصة",

    kpiTotal: "إجمالي زوار المجمع",
    kpiAtLeastOne: "دخلوا متحفاً واحداً على الأقل",
    kpiWanderers: "لم يدخلوا أي متحف",
    kpiAvgDwell: "متوسط مدة التواجد (دقيقة)",

    liveLabel: "قراءة مباشرة ومستمرة من نقاط العدّ",

    timeRangeTitle: "حساب عدد الزوار بين وقتين",
    timeRangeFrom: "من الساعة",
    timeRangeTo: "إلى الساعة",
    timeRangeButton: "احسب",
    timeRangeResultLabel: "عدد الزوار في هذه الفترة",
    timeRangeHint: "بحسب الفلتر المختار أعلاه، ووقت دخول الزائر للمجمع (24 ساعة).",

    museumCardsTitle: "إحصائيات كل متحف على حِدة",
    museumCardVisits: "عدد الزيارات",
    museumCardAvgDwell: "متوسط مدة التواجد",

    minutesUnit: "دقيقة",

    entryPageTitle: "إدخال بيانات يدوي",
    entryPageSubtitle: "لإدخال عدد الزوار في كل متحف وعدد تذاكر البالغين يدوياً من قِبل الموظف. التاريخ والوقت يُقرآن تلقائياً من الجهاز، وتُحفظ السجلات وتظهر بالجدول أدناه.",
    entryDateLabel: "التاريخ",
    entryTimeLabel: "الوقت",
    entryAdultTicketsLabel: "تذاكر",
    entryInquiryLabel: "استفسار",
    entryWorkshopLabel: "ورشة",
    entryExhibitionLabel: "معرض",
    entrySubmitBtn: "حفظ السجل",
    entriesTableTitle: "السجلات المُدخلة",
    entriesEmpty: "لا توجد سجلات بعد.",
    entriesDelete: "حذف",
    entriesDateCol: "التاريخ",
    entriesTimeCol: "الوقت",
    entriesAdultCol: "تذاكر",
    entriesActionCol: "إجراء",
    entrySyncError: "حدث خطأ بالاتصال بقاعدة البيانات، تأكدي من الإنترنت وحاولي مرة أخرى.",

    simPageTitle: "محاكاة نظام تذاكر QR",
    simPageSubtitle: "محاكاة حية توضح كيف يعمل نظام التذاكر المقترح: كل زائر يأخذ من موظف الساحة المركزية تذكرة QR تحمل عدد الأشخاص، عدد المتاحف المشمولة، ووقت الشراء — وتُمسح عند مدخل ومخرج كل متحف وغرفة الورشة.",
    simPlazaLabel: "الساحة الرئيسية",
    simBoothLabel: "موظف التذاكر",
    simWorkshopLabel: "ورشة",
    simExhibitionLabel: "معرض",
    simLegendTitle: "أنواع رحلات الزوار (حي)",
    simPlayBtn: "تشغيل",
    simPauseBtn: "إيقاف مؤقت",
    simScenarioOneMuseum: "دخل متحفاً واحداً",
    simScenarioMultiMuseum: "دخل أكثر من متحف",
    simScenarioNoTicket: "دخل الساحة وخرج دون شراء تذكرة",
    simScenarioWorkshopMuseum: "تذكرة ورشة + دخول متحف",
    simScenarioWorkshopOnly: "دخل الورشة فقط (بلا متحف)",
    simScenarioExhibitionMuseum: "تذكرة معرض + دخول متحف",
    simScenarioExhibitionOnly: "دخل المعرض فقط (بلا متحف)",
    simPopupVisitors: "زوار",
    simPopupMuseums: "متاحف",

    footer: "© 2026 Rahaf Albunni — جميع الحقوق محفوظة. نموذج تجريبي ببيانات وهمية.",
  },

  en: {
    brand: "Museum Statistics",
    navHome: "Home",
    navDashboard: "Dashboard",
    navEntry: "Manual Entry",
    navSimulation: "QR Simulation",

    heroEyebrow: "Smart Analytics for a Museum Complex",
    heroTitle: "Know every visitor's move inside Dar Al-Funoon Al-Islamiya museums",
    heroSubtitle: "One system tracks every entry and exit, times every visit, and flags who entered the complex without visiting a museum — in a dashboard that updates every moment.",
    ctaDashboard: "Open the Live Dashboard",
    ctaSimulation: "Watch the Ticket System Simulation",

    statVisitorsLabel: "Visitors in the last 90 days",
    statMuseumsLabel: "Museums on one system",
    statDwellLabel: "Minutes average visit",
    statWanderLabel: "of visitors entered no museum",

    miniChartTitle: "Visits distributed across the five museums",

    feat1Title: "Continuous live reading",
    feat1Desc: "Numbers update moment to moment, as if streaming straight from real counters at every door.",
    feat2Title: "Detecting wandering visitors",
    feat2Desc: "An automatic comparison between the main gate log and each of the five museum-door logs.",
    feat3Title: "Event reports",
    feat3Desc: "Compare turnout across regular days and special events in one click.",
    dashboardTitle: "Visitor Statistics Dashboard",
    dashboardSubtitle: "A full view of visitor traffic across the 5 museums in the complex, based on mock data illustrating how the proposed system would look.",

    filterAll: "All Time",
    filterRegular: "Regular Days",
    filterEvent: "Special Event",

    kpiTotal: "Total Complex Visitors",
    kpiAtLeastOne: "Entered ≥1 Museum",
    kpiWanderers: "Entered No Museum",
    kpiAvgDwell: "Avg. Dwell Time (min)",

    liveLabel: "Live continuous reading from the counting points",

    timeRangeTitle: "Visitor Count Between Two Hours",
    timeRangeFrom: "From hour",
    timeRangeTo: "To hour",
    timeRangeButton: "Calculate",
    timeRangeResultLabel: "Visitors in this range",
    timeRangeHint: "Based on the filter selected above and each visitor's complex entry time (24h).",

    museumCardsTitle: "Statistics per Museum",
    museumCardVisits: "Visits",
    museumCardAvgDwell: "Avg. Dwell Time",

    minutesUnit: "min",

    entryPageTitle: "Manual Data Entry",
    entryPageSubtitle: "For staff to manually enter the visitor count for each museum and the number of adult tickets. Date and time are read automatically from the device, and entries are saved and shown in the table below.",
    entryDateLabel: "Date",
    entryTimeLabel: "Time",
    entryAdultTicketsLabel: "Tickets",
    entryInquiryLabel: "Inquiry",
    entryWorkshopLabel: "Workshop",
    entryExhibitionLabel: "Exhibition",
    entrySubmitBtn: "Save Entry",
    entriesTableTitle: "Saved Entries",
    entriesEmpty: "No entries yet.",
    entriesDelete: "Delete",
    entriesDateCol: "Date",
    entriesTimeCol: "Time",
    entriesAdultCol: "Tickets",
    entriesActionCol: "Action",
    entrySyncError: "Couldn't reach the database — check your connection and try again.",

    simPageTitle: "QR Ticket System Simulation",
    simPageSubtitle: "A live simulation showing how the proposed ticket system works: each visitor gets a QR ticket from the central-plaza staff encoding the group size, number of museums covered, and purchase time — scanned at the entrance and exit of every museum and the workshop room.",
    simPlazaLabel: "Main Plaza",
    simBoothLabel: "Ticket Staff",
    simWorkshopLabel: "Workshop",
    simExhibitionLabel: "Exhibition",
    simLegendTitle: "Visitor Journey Types (Live)",
    simPlayBtn: "Play",
    simPauseBtn: "Pause",
    simScenarioOneMuseum: "Entered one museum",
    simScenarioMultiMuseum: "Entered 2+ museums",
    simScenarioNoTicket: "Entered the plaza, left without a ticket",
    simScenarioWorkshopMuseum: "Workshop ticket + museum visit",
    simScenarioWorkshopOnly: "Workshop only (no museum)",
    simScenarioExhibitionMuseum: "Exhibition ticket + museum visit",
    simScenarioExhibitionOnly: "Exhibition only (no museum)",
    simPopupVisitors: "visitors",
    simPopupMuseums: "museums",

    footer: "© 2026 Rahaf Albunni — All rights reserved. Prototype with mock data.",
  }
};

let currentLang = "ar";

function applyLanguage(lang) {
  currentLang = lang;
  const dict = translations[lang];

  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  localStorage.setItem("museumStatsLang", lang);
  document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
}

function initLanguageToggle() {
  const saved = (() => {
    try { return localStorage.getItem("museumStatsLang"); } catch (e) { return null; }
  })();

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });

  applyLanguage(saved === "en" ? "en" : "ar");
}

document.addEventListener("DOMContentLoaded", initLanguageToggle);
