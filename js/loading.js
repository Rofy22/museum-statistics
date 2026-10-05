// ===== شاشة تحميل شبه شفافة: تُستخدم فقط عند حفظ السجل بصفحة الإدخال اليدوي =====

function showLoadingOverlay() {
  const el = document.querySelector("#loadingOverlay");
  if (!el) return;
  el.hidden = false;
  el.classList.remove("is-hiding");
}

function hideLoadingOverlay() {
  const el = document.querySelector("#loadingOverlay");
  if (!el) return;
  el.classList.add("is-hiding");
  setTimeout(() => { el.hidden = true; }, 250);
}
