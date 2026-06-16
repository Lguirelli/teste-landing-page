import React from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import BlurText from "./components/BlurText.js";

const HERO_TEXT_SELECTORS = [
  "body.home-page .hero-copy .section-kicker",
  "body.home-page .hero-copy .hero-title",
  "body.home-page .hero-copy .hero-lead"
];

const mountedRoots = new WeakMap();

function getTextWithSpacing(node) {
  const parts = [];

  node.childNodes.forEach((child) => {
    if (child.nodeType === Node.TEXT_NODE) {
      parts.push(child.textContent || "");
      return;
    }

    if (child.nodeName === "BR") {
      parts.push(" ");
      return;
    }

    parts.push(getTextWithSpacing(child));
  });

  return parts.join(" ").replace(/\s+/g, " ").trim();
}

function getDelayForElement(element) {
  if (element.classList.contains("section-kicker")) return 65;
  if (element.classList.contains("hero-title")) return 115;
  return 24;
}

function getStepDurationForElement(element) {
  if (element.classList.contains("section-kicker")) return 0.28;
  if (element.classList.contains("hero-title")) return 0.38;
  return 0.26;
}

function mountBlurText(element) {
  if (!element || mountedRoots.has(element)) return;

  const originalText = getTextWithSpacing(element);

  if (!originalText) return;

  element.dataset.blurTextOriginal = originalText;
  element.textContent = "";

  const mount = document.createElement("span");
  mount.className = "react-blur-text-mount";
  element.appendChild(mount);

  const root = createRoot(mount);
  mountedRoots.set(element, root);

  root.render(
    React.createElement(BlurText, {
      as: "span",
      text: originalText,
      animateBy: "words",
      direction: element.classList.contains("hero-lead") ? "bottom" : "top",
      delay: getDelayForElement(element),
      stepDuration: getStepDurationForElement(element),
      threshold: 0.01,
      rootMargin: "0px 0px -8% 0px",
      className: "react-blur-text--hero",
      onAnimationComplete: () => {
        element.dataset.blurTextComplete = "true";
      }
    })
  );
}

function initHeroBlurText() {
  HERO_TEXT_SELECTORS.forEach((selector) => {
    document.querySelectorAll(selector).forEach(mountBlurText);
  });
}

function observeSections() {
  if (!("MutationObserver" in window)) return;

  const observer = new MutationObserver(() => {
    initHeroBlurText();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

document.addEventListener("sectionsLoaded", initHeroBlurText);
document.addEventListener("DOMContentLoaded", initHeroBlurText);
window.addEventListener("load", initHeroBlurText);

observeSections();

window.setTimeout(initHeroBlurText, 150);
window.setTimeout(initHeroBlurText, 600);
window.setTimeout(initHeroBlurText, 1200);

window.initHeroBlurText = initHeroBlurText;
