(() => {
  const root = document.documentElement;
  root.classList.add("js-ready");
  const stored = localStorage.getItem("bsp-theme");
  const fixedTheme = root.hasAttribute("data-fixed-theme");
  const defaultTheme = root.getAttribute("data-theme") || "dark";
  if (!fixedTheme) root.setAttribute("data-theme", stored || defaultTheme);

  function syncThemeButton() {
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      const dark = root.getAttribute("data-theme") === "dark";
      const label = dark ? "Switch to light theme" : "Switch to dark theme";
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
    });
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-toggle]");
    if (!btn || fixedTheme) return;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("bsp-theme", next);
    syncThemeButton();
  });
  syncThemeButton();

  // Mark reveals visible immediately (tall gallery broke IntersectionObserver hide)
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));

  // Gallery filters
  const filterBtns = document.querySelectorAll("[data-filter]");
  const items = document.querySelectorAll("[data-pack]");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const pack = btn.getAttribute("data-filter");
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      items.forEach((item) => {
        const show = pack === "all" || item.getAttribute("data-pack") === pack;
        item.style.display = show ? "" : "none";
      });
    });
  });

  // Tabs
  document.querySelectorAll("[data-tabs]").forEach((wrap) => {
    const buttons = wrap.querySelectorAll("[data-tab]");
    const panels = wrap.querySelectorAll("[data-tab-panel]");
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        const id = button.getAttribute("data-tab");
        buttons.forEach((b) => b.classList.remove("active"));
        panels.forEach((p) => p.classList.toggle("active", p.getAttribute("data-tab-panel") === id));
        button.classList.add("active");
      });
    });
  });

  // Keep KPIs exact and readable.
  const counters = document.querySelectorAll("[data-count]");
  counters.forEach((el) => {
    const target = parseFloat(el.getAttribute("data-count"));
    const decimals = (el.getAttribute("data-decimals") || "0") | 0;
    if (Number.isFinite(target)) el.textContent = target.toFixed(decimals);
  });

  // Search in gallery captions
  const search = document.querySelector("[data-gallery-search]");
  if (search) {
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      items.forEach((item) => {
        const text = item.textContent.toLowerCase();
        item.style.display = !q || text.includes(q) ? "" : "none";
      });
    });
  }
})();
