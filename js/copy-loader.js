(function () {
  const DEFAULT_STORAGE_KEY = "landing_copy_v1";

  function getRootPrefix() {
    return document.body?.dataset.root || "";
  }

  function getByPath(source, path) {
    return path.split(".").reduce((current, key) => {
      if (current && Object.prototype.hasOwnProperty.call(current, key)) return current[key];
      return undefined;
    }, source);
  }

  function isObject(value) {
    return value && typeof value === "object" && !Array.isArray(value);
  }

  function mergeDeep(base, override) {
    const output = { ...(base || {}) };
    Object.keys(override || {}).forEach((key) => {
      if (isObject(base?.[key]) && isObject(override[key])) {
        output[key] = mergeDeep(base[key], override[key]);
        return;
      }
      output[key] = override[key];
    });
    return output;
  }

  function readSavedCopy(storageKey) {
    const keysToTry = [storageKey, DEFAULT_STORAGE_KEY, "landingCopy", "landing-copy"];

    for (const key of keysToTry) {
      try {
        const raw = window.localStorage.getItem(key);
        if (raw) return JSON.parse(raw);
      } catch (error) {
        console.warn("Não foi possível ler a copy salva em", key, error);
      }
    }

    return {};
  }

  async function loadCopyConfig() {
    const rootPrefix = getRootPrefix();
    const response = await fetch(`${rootPrefix}content/copy.default.json?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Não foi possível carregar content/copy.default.json");
    return response.json();
  }

  function applyCopyValues(values) {
    document.querySelectorAll("[data-copy]").forEach((element) => {
      const path = element.getAttribute("data-copy");
      const target = element.getAttribute("data-copy-target") || "text";
      const value = getByPath(values, path);
      if (value === undefined || value === null) return;

      if (target === "placeholder") {
        element.setAttribute("placeholder", value);
        return;
      }

      if (target === "value") {
        element.value = value;
        return;
      }

      if (target === "html") {
        element.innerHTML = value;
        return;
      }

      element.textContent = value;
    });
  }

  function buildDefaultVisibility(config) {
    return (config.sections || []).reduce((acc, section) => {
      acc[section.id] = section.visibleByDefault !== false;
      return acc;
    }, {});
  }

  function applySectionVisibility(visibility) {
    document.querySelectorAll("[data-copy-section]").forEach((element) => {
      const sectionId = element.getAttribute("data-copy-section");
      const isVisible = visibility[sectionId] !== false;
      element.hidden = !isVisible;
      element.setAttribute("aria-hidden", String(!isVisible));
      element.classList.toggle("copy-section-hidden", !isVisible);
    });
  }

  async function refreshLandingCopy() {
    try {
      const config = await loadCopyConfig();
      const storageKey = config.storageKey || DEFAULT_STORAGE_KEY;
      const saved = readSavedCopy(storageKey);
      const savedValues = saved.values || saved || {};
      const values = mergeDeep(config.values || {}, savedValues);
      const visibility = mergeDeep(buildDefaultVisibility(config), saved.visibility || {});

      applyCopyValues(values);
      applySectionVisibility(visibility);

      window.__landingCopyConfig = config;
      window.__landingCopyValues = values;
      window.__landingSectionVisibility = visibility;

      document.dispatchEvent(new CustomEvent("landingCopyApplied", {
        detail: { config, values, visibility }
      }));
    } catch (error) {
      console.warn("Copy editável não aplicada.", error);
    }
  }

  function refreshSoon() {
    refreshLandingCopy();
    window.setTimeout(refreshLandingCopy, 80);
    window.setTimeout(refreshLandingCopy, 250);
    window.setTimeout(refreshLandingCopy, 600);
    window.setTimeout(refreshLandingCopy, 1200);
  }

  window.refreshLandingCopy = refreshLandingCopy;

  document.addEventListener("sectionsLoaded", refreshSoon);
  document.addEventListener("DOMContentLoaded", refreshSoon, { once: true });

  if (document.readyState !== "loading") refreshSoon();

  window.addEventListener("storage", (event) => {
    if (!event.key || event.key === DEFAULT_STORAGE_KEY || event.key === "landing_copy_v1") refreshSoon();
  });

  if ("BroadcastChannel" in window) {
    const channel = new BroadcastChannel("landing-copy-channel");
    channel.addEventListener("message", (event) => {
      if (event.data?.type === "landing-copy-updated") refreshSoon();
    });
  }

  const observer = new MutationObserver(() => {
    window.clearTimeout(window.__landingCopyMutationTimer);
    window.__landingCopyMutationTimer = window.setTimeout(refreshLandingCopy, 60);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
