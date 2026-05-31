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
  let currentVisibility = {};
  let storageKey = DEFAULT_STORAGE_KEY;
  let autoSaveTimer = null;

  function getRootPrefix() {
    return document.body?.dataset.root || "";
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

  function buildDefaultVisibility() {
    return (config?.sections || []).reduce((acc, section) => {
      acc[section.id] = section.visibleByDefault !== false;
      return acc;
    }, {});
  }

  function readSavedPayload() {
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

  function collectValues() {
    const values = {};

    form.querySelectorAll("[data-copy-path]").forEach((field) => {
      setByPath(values, field.dataset.copyPath, field.value.trim());
    });

    return values;
  }

  function collectVisibility() {
    const visibility = buildDefaultVisibility();

    form.querySelectorAll("[data-visibility-section]").forEach((field) => {
      visibility[field.dataset.visibilitySection] = field.checked;
    });

    return visibility;
  }

  function savePayload(values, visibility, silent = false) {
    const payload = {
      schemaVersion: config?.schemaVersion || 1,
      savedAt: new Date().toISOString(),
      values,
      visibility
    };

    const serialized = JSON.stringify(payload);

    window.localStorage.setItem(storageKey, serialized);
    window.localStorage.setItem(DEFAULT_STORAGE_KEY, serialized);

    window.dispatchEvent(new StorageEvent("storage", {
      key: storageKey,
      newValue: serialized,
      storageArea: window.localStorage
    }));

    if ("BroadcastChannel" in window) {
      const channel = new BroadcastChannel("landing-copy-channel");
      channel.postMessage({ type: "landing-copy-updated", payload });
      channel.close();
    }

    if (!silent) {
      showStatus("Alterações salvas. Atualize a landing para ver o texto aplicado.", "success");
    }
  }

  function saveCurrentChanges(silent = false) {
    if (!config) return;

    currentValues = mergeDeep(config.values || {}, collectValues());
    currentVisibility = collectVisibility();
    savePayload(currentValues, currentVisibility, silent);
  }

  function showStatus(message, type = "default") {
    status.textContent = message;
    status.dataset.type = type;
  }

  function markUnsaved() {
    showStatus("Salvando automaticamente...", "warning");
    window.clearTimeout(autoSaveTimer);
    autoSaveTimer = window.setTimeout(() => {
      saveCurrentChanges(true);
      showStatus("Alterações salvas automaticamente. Atualize a landing para conferir.", "success");
    }, 350);
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
      input.rows = Math.max(3, Math.min(8, Math.ceil(String(value).length / 68)));
    } else {
      input.type = "text";
    }

    wrapper.appendChild(input);
    return wrapper;
  }

  function createVisibilityToggle(section) {
    const label = document.createElement("label");
    label.className = "copy-section-toggle";

    const input = document.createElement("input");
    input.type = "checkbox";
    input.dataset.visibilitySection = section.id;
    input.checked = currentVisibility[section.id] !== false;

    const fake = document.createElement("span");
    fake.className = "copy-section-toggle-box";

    const text = document.createElement("span");
    text.textContent = "Exibir seção na landing";

    label.appendChild(input);
    label.appendChild(fake);
    label.appendChild(text);

    return label;
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

      const header = document.createElement("div");
      header.className = "copy-section-card-header";

      const title = document.createElement("h2");
      title.textContent = section.label;
      header.appendChild(title);
      header.appendChild(createVisibilityToggle(section));

      block.appendChild(header);

      const grid = document.createElement("div");
      grid.className = "copy-field-grid";

      section.fields.forEach((field) => {
        grid.appendChild(createField(field));
      });

      block.appendChild(grid);
      form.appendChild(block);
    });
  }

  async function init() {
    try {
      const response = await fetch(`${getRootPrefix()}content/copy.default.json?v=${Date.now()}`, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("content/copy.default.json não encontrado");
      }

      config = await response.json();
      storageKey = config.storageKey || DEFAULT_STORAGE_KEY;

      const saved = readSavedPayload();
      currentValues = mergeDeep(config.values || {}, saved.values || saved || {});
      currentVisibility = mergeDeep(buildDefaultVisibility(), saved.visibility || {});

      render();
      showStatus("Campos carregados. As alterações agora salvam automaticamente.", "success");
    } catch (error) {
      showStatus(`Erro ao carregar editor: ${error.message}`, "error");
    }
  }

  function forceSaveFromButton() {
    window.clearTimeout(autoSaveTimer);

    if (!config) {
      showStatus("O editor ainda está carregando. Aguarde alguns segundos e tente novamente.", "warning");
      return;
    }

    saveCurrentChanges(false);
    showStatus("Alterações salvas. Atualize a landing para ver o texto aplicado.", "success");
  }

  window.copyAdminSave = forceSaveFromButton;

  if (form) {
    form.addEventListener("input", markUnsaved);
    form.addEventListener("change", markUnsaved);
  }

  if (saveButton) {
    saveButton.onclick = forceSaveFromButton;
    saveButton.addEventListener("click", forceSaveFromButton);
  }

  if (resetButton) resetButton.addEventListener("click", () => {
    const confirmReset = window.confirm("Resetar todos os textos e voltar todas as seções para o padrão?");

    if (!confirmReset) return;

    window.localStorage.removeItem(storageKey);
    window.localStorage.removeItem(DEFAULT_STORAGE_KEY);
    currentValues = config.values || {};
    currentVisibility = buildDefaultVisibility();
    render();
    showStatus("Textos e visibilidade resetados para o padrão.", "success");
  });

  if (exportButton) exportButton.addEventListener("click", () => {
    saveCurrentChanges(true);
    const values = collectValues();
    const visibility = collectVisibility();
    const blob = new Blob([JSON.stringify({ schemaVersion: config.schemaVersion || 1, values, visibility }, null, 2)], {
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

  if (importButton) importButton.addEventListener("click", () => {
    importInput.click();
  });

  if (importInput) importInput.addEventListener("change", async () => {
    const file = importInput.files?.[0];

    if (!file) return;

    try {
      const parsed = JSON.parse(await file.text());
      currentValues = mergeDeep(config.values || {}, parsed.values || parsed || {});
      currentVisibility = mergeDeep(buildDefaultVisibility(), parsed.visibility || {});
      savePayload(currentValues, currentVisibility);
      render();
      showStatus("JSON importado e salvo.", "success");
    } catch (error) {
      showStatus("Arquivo JSON inválido.", "error");
    } finally {
      importInput.value = "";
    }
  });

  window.copyAdminDebug = function copyAdminDebug() {
    return {
      hasConfig: Boolean(config),
      storageKey,
      saved: window.localStorage.getItem(storageKey) || window.localStorage.getItem(DEFAULT_STORAGE_KEY),
      fields: form ? form.querySelectorAll("[data-copy-path]").length : 0,
      visibility: form ? form.querySelectorAll("[data-visibility-section]").length : 0
    };
  };

  init();
})();
