(function () {
  let glossaryCache = null;
  let activeCard = null;

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  async function loadGlossary() {
    if (glossaryCache) return glossaryCache;
    if (Array.isArray(window.GLOSSARIO_TERMOS)) {
      glossaryCache = window.GLOSSARIO_TERMOS;
      return glossaryCache;
    }
    const currentScript = document.currentScript;
    const basePath = currentScript && currentScript.dataset && currentScript.dataset.glossarioBase
      ? currentScript.dataset.glossarioBase.replace(/\/$/, '')
      : '';
    const response = await fetch(basePath + '/dados/glossario-termos.json');
    glossaryCache = await response.json();
    return glossaryCache;
  }

  function closePopup() {
    if (activeCard) {
      activeCard.remove();
      activeCard = null;
    }
    document.querySelectorAll('.glossario-termo[aria-expanded="true"]').forEach(function (el) {
      el.setAttribute('aria-expanded', 'false');
    });
  }

  function positionCard(card, trigger) {
    const rect = trigger.getBoundingClientRect();
    const gap = 10;
    document.body.appendChild(card);
    const cardRect = card.getBoundingClientRect();
    let top = rect.bottom + gap;
    let left = rect.left;

    if (left + cardRect.width > window.innerWidth - 12) {
      left = window.innerWidth - cardRect.width - 12;
    }
    if (left < 12) left = 12;

    if (top + cardRect.height > window.innerHeight - 12) {
      top = rect.top - cardRect.height - gap;
    }
    if (top < 12) top = 12;

    card.style.top = top + 'px';
    card.style.left = left + 'px';
  }

  async function openPopup(trigger) {
    const term = trigger.dataset.glossarioTermo;
    const glossary = await loadGlossary();
    const item = glossary.find(function (entry) {
      return normalize(entry.termo) === normalize(term);
    });
    if (!item) return;

    closePopup();
    const card = document.createElement('div');
    card.className = 'glossario-popup-card';
    card.setAttribute('role', 'tooltip');
    card.innerHTML = '<strong></strong><small></small><p></p>';
    card.querySelector('strong').textContent = item.termo;
    card.querySelector('small').textContent = item.significado || '';
    card.querySelector('p').textContent = item.explicacao || '';
    activeCard = card;
    trigger.setAttribute('aria-expanded', 'true');
    positionCard(card, trigger);
  }

  document.addEventListener('click', function (event) {
    const trigger = event.target.closest('.glossario-termo');
    if (trigger) {
      event.preventDefault();
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (isOpen) closePopup();
      else openPopup(trigger);
      return;
    }
    if (!event.target.closest('.glossario-popup-card')) closePopup();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closePopup();
  });

  window.addEventListener('resize', closePopup);
  window.addEventListener('scroll', closePopup, true);
})();