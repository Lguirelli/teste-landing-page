import React from "https://esm.sh/react@18.3.1";
import { createRoot } from "https://esm.sh/react-dom@18.3.1/client";
import StickerPeel from "./components/StickerPeel.js";

const mounted = new WeakMap();

function getRootPrefix() {
  return document.body?.dataset.root || "";
}

function normalizeAssetPath(path) {
  if (!path) return `${getRootPrefix()}assets/icons/pato.svg`;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("/")) return path;
  return `${getRootPrefix()}${path}`;
}

function clearLegacyProblemModel() {
  const problem = document.querySelector("#problem");

  if (!problem) return;

  problem.removeAttribute("data-duck-model-section");

  problem
    .querySelectorAll(".hero-model-wrap, .hero-model-stage, .problem-model-wrap, .problem-model-stage, #heroModelStage, canvas")
    .forEach((node) => node.remove());
}

function ensureStickerRoot() {
  const problemTarget = document.querySelector("#problem .problem-duck-target");

  if (!problemTarget) return null;

  let root = problemTarget.querySelector("[data-problem-sticker-root]");

  if (!root) {
    problemTarget.innerHTML = "";
    root = document.createElement("div");
    root.className = "problem-sticker-react-root";
    root.dataset.problemStickerRoot = "";
    root.dataset.stickerSrc = `${getRootPrefix()}assets/icons/pato.svg`;
    problemTarget.appendChild(root);
  }

  return root;
}

function mountProblemSticker() {
  clearLegacyProblemModel();

  const mount = ensureStickerRoot();

  if (!mount || mounted.has(mount)) return;

  const imageSrc = normalizeAssetPath(mount.dataset.stickerSrc || "assets/icons/pato.svg");
  const root = createRoot(mount);
  mounted.set(mount, root);

  root.render(
    React.createElement(StickerPeel, {
      imageSrc,
      width: "clamp(250px, 30vw, 430px)",
      rotate: -7,
      peelBackHoverPct: 24,
      peelBackActivePct: 38,
      shadowIntensity: 0.62,
      lightingIntensity: 0.12,
      peelDirection: 0,
      initialPosition: "center",
      className: "problem-duck-sticker-react"
    })
  );
}

function observeSections() {
  if (!("MutationObserver" in window)) return;

  const observer = new MutationObserver(() => {
    mountProblemSticker();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

document.addEventListener("sectionsLoaded", mountProblemSticker);
window.addEventListener("sectionsLoaded", mountProblemSticker);
document.addEventListener("DOMContentLoaded", mountProblemSticker);
window.addEventListener("load", mountProblemSticker);

observeSections();

window.setTimeout(mountProblemSticker, 150);
window.setTimeout(mountProblemSticker, 600);
window.setTimeout(mountProblemSticker, 1200);

window.mountProblemSticker = mountProblemSticker;
