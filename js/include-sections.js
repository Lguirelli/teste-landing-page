async function includeSections() {
  const targets = document.querySelectorAll("[data-section]");
  const root = document.body?.dataset.root || "";

  function resolveSectionPath(path) {
    if (!path) return "";
    if (path.startsWith("http") || path.startsWith("/")) return path;

    const normalizedPath = path.replace(/^\.\//, "");
    const normalizedRoot = root.replace(/\/$/, "");

    if (!normalizedRoot) return normalizedPath;
    if (normalizedPath.startsWith(`${normalizedRoot}/`)) return normalizedPath;
    if (normalizedPath.startsWith("../") || normalizedPath.startsWith("./")) return normalizedPath;

    return `${normalizedRoot}/${normalizedPath}`;
  }

  await Promise.all([...targets].map(async (target) => {
    const path = target.getAttribute("data-section");
    const fetchPath = resolveSectionPath(path);

    try {
      const response = await fetch(fetchPath, { cache: "no-store" });

      if (!response.ok) {
        throw new Error(`Erro ao carregar ${fetchPath}`);
      }

      const html = await response.text();
      target.innerHTML = html.replaceAll("{{root}}", root);
    } catch (error) {
      target.innerHTML = `
        <section class="section">
          <div class="container">
            <div class="card">
              <strong>Seção não carregada:</strong> ${path}
            </div>
          </div>
        </section>
      `;

      console.error(error);
    }
  }));

  document.dispatchEvent(new CustomEvent("sectionsLoaded", {
    detail: { total: targets.length }
  }));
}

includeSections();
