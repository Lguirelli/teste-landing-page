(function () {
  const DEFAULT_STORAGE_KEY = "landing_copy_v1";
  const form = document.querySelector("#copyAdminForm");
  const nav = document.querySelector("#copyAdminNav");
  const status = document.querySelector("#copyStatus");
  const saveButton = document.querySelector("#copySaveButton");
  const resetButton = document.querySelector("#copyResetButton");
  const exportButton = document.querySelector("#copyExportButton");
  const importButton = document.querySelector("#copyImportButton");
  const importInput = document.querySelector("#copyImportInput");

  let config = null;
  let currentValues = {};
  let storageKey = DEFAULT_STORAGE_KEY;

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

  function getByPath(source, path) {
    return path.split(".").reduce((current, key) => {
      if (current && Object.prototype.hasOwnProperty.call(current, key)) {
        return current[key];
      }

      return undefined;
    }, source);
  }

  function setByPath(source, path, value) {
    const keys = path.split(".");
    const lastKey = keys.pop();
    const target = keys.reduce((current, key) => {
      if (!isObject(current[key])) {
        current[key] = {};
      }

      return current[key];
    }, source);

    target[lastKey] = value;
  }

  function readSavedValues() {
    try {
      const raw = window.localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : {};
      return parsed.values || parsed || {};
    } catch (error) {
      showStatus("Não foi possível ler a copy salva.", "error");
      return {};
    }
  }

  function saveValues(values) {
    const payload = {
      schemaVersion: config?.schemaVersion || 1,
      savedAt: new Date().toISOString(),
      values
    };

    window.localStorage.setItem(storageKey, JSON.stringify(payload, null, 2));
  }

  function showStatus(message, type = "default") {
    status.textContent = message;
    status.dataset.type = type;
  }

  function createField(field) {
    const wrapper = document.createElement("label");
    wrapper.className = "copy-field";

    const label = document.createElement("span");
    label.textContent = field.label;
    wrapper.appendChild(label);

    const value = getByPath(currentValues, field.path) || "";
    const input = field.type === "textarea" ? document.createElement("textarea") : document.createElement("input");

    input.name = field.path;
    input.value = value;
    input.dataset.copyPath = field.path;

    if (field.type === "textarea") {
      input.rows = Math.max(3, Math.min(8, String(value).length / 68));
    } else {
      input.type = "text";
    }

    wrapper.appendChild(input);
    return wrapper;
  }

  function render() {
    form.innerHTML = "";
    nav.innerHTML = "";

    config.sections.forEach((section) => {
      const navLink = document.createElement("a");
      navLink.href = `#section-${section.id}`;
      navLink.textContent = section.label;
      nav.appendChild(navLink);

      const block = document.createElement("section");
      block.className = "copy-section-card";
      block.id = `section-${section.id}`;

      const title = document.createElement("h2");
      title.textContent = section.label;
      block.appendChild(title);

      const grid = document.createElement("div");
      grid.className = "copy-field-grid";

      section.fields.forEach((field) => {
        grid.appendChild(createField(field));
      });

      block.appendChild(grid);
      form.appendChild(block);
    });

    form.addEventListener("input", () => {
      showStatus("Alterações ainda não salvas.", "warning");
    }, { once: true });
  }

  function collectValues() {
    const values = {};

    form.querySelectorAll("[data-copy-path]").forEach((field) => {
      setByPath(values, field.dataset.copyPath, field.value.trim());
    });

    return values;
  }

  async function init() {
    try {
      const response = await fetch("content/copy.default.json", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("content/copy.default.json não encontrado");
      }

      config = await response.json();
      storageKey = config.storageKey || DEFAULT_STORAGE_KEY;
      currentValues = mergeDeep(config.values || {}, readSavedValues());

      render();
      showStatus("Campos carregados. Edite e salve para aplicar na landing.", "success");
    } catch (error) {
      showStatus(`Erro ao carregar editor: ${error.message}`, "error");
    }
  }

  saveButton.addEventListener("click", () => {
    currentValues = mergeDeep(config.values || {}, collectValues());
    saveValues(currentValues);
    showStatus("Alterações salvas. Abra ou atualize a landing para ver o texto aplicado.", "success");
  });

  resetButton.addEventListener("click", () => {
    const confirmReset = window.confirm("Resetar todos os textos editados e voltar para o padrão do arquivo JSON?");

    if (!confirmReset) return;

    window.localStorage.removeItem(storageKey);
    currentValues = config.values || {};
    render();
    showStatus("Textos resetados para o padrão.", "success");
  });

  exportButton.addEventListener("click", () => {
    const values = collectValues();
    const blob = new Blob([JSON.stringify({ schemaVersion: config.schemaVersion || 1, values }, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "copy-editada.json";
    link.click();

    URL.revokeObjectURL(url);
    showStatus("JSON exportado.", "success");
  });

  importButton.addEventListener("click", () => {
    importInput.click();
  });

  importInput.addEventListener("change", async () => {
    const file = importInput.files?.[0];

    if (!file) return;

    try {
      const parsed = JSON.parse(await file.text());
      currentValues = mergeDeep(config.values || {}, parsed.values || parsed || {});
      saveValues(currentValues);
      render();
      showStatus("JSON importado e salvo.", "success");
    } catch (error) {
      showStatus("Arquivo JSON inválido.", "error");
    } finally {
      importInput.value = "";
    }
  });

  init();
})();
