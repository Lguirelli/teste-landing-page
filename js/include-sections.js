(function () {
  const sectionCache = new Map();

  function getRootPrefix() {
    return document.body?.dataset.root || "";
  }

  function resolveSectionPath(path) {
    if (!path) return "";
    if (/^(https?:)?\/\//.test(path) || path.startsWith("/")) return path;

    const root = getRootPrefix().replace(/\/$/, "");
    const cleanPath = path.replace(/^\.\//, "");

    if (!root) return cleanPath;
    if (cleanPath.startsWith("../") || cleanPath.startsWith(`${root}/`)) return cleanPath;

    return `${root}/${cleanPath}`;
  }

  async function fetchSection(path) {
    const fetchPath = resolveSectionPath(path);

    if (!fetchPath) return "";
    if (sectionCache.has(fetchPath)) return sectionCache.get(fetchPath);

    const request = fetch(fetchPath, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error(`Erro ao carregar ${fetchPath}`);
        return response.text();
      });

    sectionCache.set(fetchPath, request);
    return request;
  }

  async function loadSection(target) {
    const sectionPath = target.dataset.section;

    if (!sectionPath || target.dataset.sectionLoaded === "true") return;

    target.setAttribute("aria-busy", "true");

    try {
      const html = await fetchSection(sectionPath);
      target.innerHTML = html.replaceAll("{{root}}", getRootPrefix());
      target.dataset.sectionLoaded = "true";
      target.removeAttribute("data-section-error");
    } catch (error) {
      target.dataset.sectionError = "true";
      console.error(error);
    } finally {
      target.removeAttribute("aria-busy");
    }
  }

  async function includeSections() {
    const targets = [...document.querySelectorAll("[data-section]")];

    await Promise.all(targets.map(loadSection));

    const sectionsLoadedEvent = new CustomEvent("sectionsLoaded", {
      detail: { total: targets.length }
    });

    document.dispatchEvent(sectionsLoadedEvent);
    window.dispatchEvent(new CustomEvent("sectionsLoaded", {
      detail: { total: targets.length }
    }));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", includeSections, { once: true });
  } else {
    includeSections();
  }
})();

