(() => {
  const root = document.documentElement;
  const stored = localStorage.getItem("bsp-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.setAttribute("data-theme", stored || (prefersDark ? "dark" : "light"));

  function syncThemeButton() {
    document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
      const dark = root.getAttribute("data-theme") === "dark";
      btn.textContent = dark ? "Light theme" : "Dark theme";
      btn.setAttribute("aria-pressed", dark ? "true" : "false");
    });
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("bsp-theme", next);
    syncThemeButton();
  });
  syncThemeButton();

  // Scroll reveal
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("in"));
  }

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

  // Count-up KPIs
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-count"));
          const decimals = (el.getAttribute("data-decimals") || "0") | 0;
          const start = performance.now();
          const dur = 900;
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const val = target * (0.2 + 0.8 * t);
            el.textContent = val.toFixed(decimals);
            if (t < 1) requestAnimationFrame(tick);
            else el.textContent = target.toFixed(decimals);
          };
          requestAnimationFrame(tick);
          cio.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => cio.observe(el));
  }

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
