async function includeSections() {
  const targets = document.querySelectorAll("[data-section]");

  await Promise.all([...targets].map(async (target) => {
    const path = target.getAttribute("data-section");

    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`Erro ao carregar ${path}`);
      }

      target.innerHTML = await response.text();
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

  document.dispatchEvent(new Event("sectionsLoaded"));
}

includeSections();
