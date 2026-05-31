(function () {
  const DEFAULT_STORAGE_KEY = "landing_copy_v1";

  function getRootPrefix() {
    return document.body?.dataset.root || "";
  }

  function getByPath(source, path) {
    return path.split(".").reduce((current, key) => {
      if (current && Object.prototype.hasOwnProperty.call(current, key)) {
        return current[key];
      }

      return undefined;
    }, source);
  }

  function isObject(value) {
    return value && typeof value === "object" && !Array.isArray(value);
  }

  function mergeDeep(base, override) {
    const output = { ...base };

    Object.keys(override || {}).forEach((key) => {
      if (isObject(base[key]) && isObject(override[key])) {
        output[key] = mergeDeep(base[key], override[key]);
        return;
      }

      output[key] = override[key];
    });

    return output;
  }

  function readSavedCopy(storageKey) {
    try {
      const raw = window.localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : {};
    } catch (error) {
      console.warn("Não foi possível ler a copy salva.", error);
      return {};
    }
  }

  async function loadCopyConfig() {
    const rootPrefix = getRootPrefix();
    const response = await fetch(`${rootPrefix}content/copy.default.json`, { cache: "no-store" });

    if (!response.ok) {
      throw new Error("Não foi possível carregar content/copy.default.json");
    }

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

      if (target === "html") {
        element.innerHTML = value;
        return;
      }

      element.textContent = value;
    });
  }

  async function refreshLandingCopy() {
    try {
      const config = await loadCopyConfig();
      const storageKey = config.storageKey || DEFAULT_STORAGE_KEY;
      const saved = readSavedCopy(storageKey);
      const values = mergeDeep(config.values || {}, saved.values || saved || {});

      applyCopyValues(values);
      window.__landingCopyConfig = config;
      window.__landingCopyValues = values;
      document.dispatchEvent(new CustomEvent("landingCopyApplied", { detail: { config, values } }));
    } catch (error) {
      console.warn("Copy editável não aplicada.", error);
    }
  }

  window.refreshLandingCopy = refreshLandingCopy;

  document.addEventListener("sectionsLoaded", refreshLandingCopy);

  if (document.readyState !== "loading") {
    refreshLandingCopy();
  } else {
    document.addEventListener("DOMContentLoaded", refreshLandingCopy, { once: true });
  }

  window.addEventListener("storage", (event) => {
    if (event.key === DEFAULT_STORAGE_KEY) {
      refreshLandingCopy();
    }
  });
})();
