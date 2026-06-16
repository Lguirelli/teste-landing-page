(function () {
  const sectionCache = new Map();

  function getRootPrefix() {
    return document.body?.dataset.root || "";
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
    request.catch(err => console.warn('Section load failed:', fetchPath, err));
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

