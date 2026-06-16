/**
 * BlurText Hero
 * Efeito inspirado no componente BlurText do React Bits,
 * adaptado para este projeto em JavaScript puro.
 *
 * Não depende de React, Motion ou alteração no CSS principal.
 */
(function () {
  const STYLE_ID = "blurtext-hero-style";
  const HERO_TITLE_SELECTOR = "body.home-page .hero-title";
  const BLUR_TEXT_SELECTOR = "[data-blur-text], " + HERO_TITLE_SELECTOR;

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;

    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      ${HERO_TITLE_SELECTOR}[data-blur-text-applied="true"],
      [data-blur-text][data-blur-text-applied="true"] {
        display: flex !important;
        flex-wrap: wrap !important;
        align-items: baseline !important;
        column-gap: .18em !important;
        row-gap: 0 !important;
      }

      ${HERO_TITLE_SELECTOR}[data-blur-text-applied="true"] {
        justify-content: flex-start !important;
      }

      .blur-text-word {
        display: inline-block;
        opacity: 0;
        filter: blur(10px);
        transform: translate3d(0, var(--blur-text-from-y, -34px), 0);
        will-change: transform, filter, opacity;
      }

      [data-blur-text-applied="true"].is-blur-text-visible .blur-text-word {
        animation: blurTextHeroReveal var(--blur-text-duration, 700ms) cubic-bezier(.22, 1, .36, 1) forwards;
        animation-delay: var(--blur-text-delay, 0ms);
      }

      @keyframes blurTextHeroReveal {
        0% {
          opacity: 0;
          filter: blur(10px);
          transform: translate3d(0, var(--blur-text-from-y, -34px), 0);
        }

        55% {
          opacity: .56;
          filter: blur(5px);
          transform: translate3d(0, var(--blur-text-mid-y, 5px), 0);
        }

        100% {
          opacity: 1;
          filter: blur(0);
          transform: translate3d(0, 0, 0);
        }
      }

      @media (max-width: 980px) {
        ${HERO_TITLE_SELECTOR}[data-blur-text-applied="true"] {
          justify-content: center !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .blur-text-word {
          opacity: 1 !important;
          filter: none !important;
          transform: none !important;
          animation: none !important;
        }
      }
    `;

    document.head.appendChild(style);
  }

  function splitText(element) {
    if (element.dataset.blurTextApplied === "true") return;

    const text = (element.dataset.blurOriginalText || element.textContent || "").trim();
    if (!text) return;

    const delay = Number(element.dataset.blurDelay || 95);
    const duration = Number(element.dataset.blurDuration || 760);
    const direction = element.dataset.blurDirection || "top";
    const animateBy = element.dataset.blurBy || "words";
    const parts = animateBy === "letters" ? Array.from(text) : text.split(/\s+/);

    element.dataset.blurOriginalText = text;
    element.dataset.blurTextApplied = "true";
    element.setAttribute("aria-label", text);
    element.style.setProperty("--blur-text-duration", duration + "ms");
    element.style.setProperty("--blur-text-from-y", direction === "bottom" ? "34px" : "-34px");
    element.style.setProperty("--blur-text-mid-y", direction === "bottom" ? "-5px" : "5px");
    element.textContent = "";

    parts.forEach((part, index) => {
      const span = document.createElement("span");
      span.className = "blur-text-word";
      span.setAttribute("aria-hidden", "true");
      span.style.setProperty("--blur-text-delay", (index * delay) + "ms");
      span.textContent = part;
      element.appendChild(span);
    });
  }

  function reveal(element) {
    if (!element || element.classList.contains("is-blur-text-visible")) return;

    requestAnimationFrame(() => {
      element.classList.add("is-blur-text-visible");
    });
  }

  function prepareElement(element) {
    splitText(element);

    if (element.matches(HERO_TITLE_SELECTOR)) {
      window.setTimeout(() => reveal(element), 80);
      return;
    }

    if (!("IntersectionObserver" in window)) {
      reveal(element);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        reveal(element);
        observer.disconnect();
      }
    }, {
      threshold: Number(element.dataset.blurThreshold || 0.1),
      rootMargin: element.dataset.blurRootMargin || "0px"
    });

    observer.observe(element);
  }

  function initBlurTextHero() {
    injectStyle();
    document.querySelectorAll(BLUR_TEXT_SELECTOR).forEach(prepareElement);
  }

  function observeInjectedSections() {
    if (!("MutationObserver" in window)) return;

    const observer = new MutationObserver(() => {
      initBlurTextHero();
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  }

  window.initBlurTextHero = initBlurTextHero;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBlurTextHero, { once: true });
  } else {
    initBlurTextHero();
  }

  document.addEventListener("sectionsLoaded", initBlurTextHero);
  window.addEventListener("load", initBlurTextHero);
  observeInjectedSections();

  window.setTimeout(initBlurTextHero, 200);
  window.setTimeout(initBlurTextHero, 700);
  window.setTimeout(initBlurTextHero, 1400);
})();
