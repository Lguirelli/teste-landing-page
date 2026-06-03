function buildSectionPath(path, root) {
  if (!path) return "";
  if (path.startsWith("http") || path.startsWith("/")) return path;

  const cleanRoot = root || "";

  if (cleanRoot && (path.startsWith("../") || path.startsWith("./"))) {
    return path;
  }

  return `${cleanRoot}${path}`;
}

async function includeSections() {
  const targets = document.querySelectorAll("[data-section]");
  const root = document.body?.dataset.root || "";

  await Promise.all([...targets].map(async (target) => {
    const path = target.getAttribute("data-section");
    const fetchPath = buildSectionPath(path, root);

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
