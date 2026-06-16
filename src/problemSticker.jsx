import React from 'react';
import { createRoot } from 'react-dom/client';
import StickerPeel from './components/StickerPeel.jsx';

const mountedRoots = new WeakMap();

function getRootPrefix() {
  return document.body?.dataset.root || '';
}

function resolveAssetPath(path) {
  if (!path) return `${getRootPrefix()}assets/icons/pato.svg`;
  if (/^(https?:)?\/\//.test(path) || path.startsWith('/')) return path;
  return `${getRootPrefix()}${path}`;
}

function removeLegacyProblemModel() {
  const problem = document.querySelector('#problem');

  if (!problem) return;

  problem.removeAttribute('data-duck-model-section');

  problem
    .querySelectorAll('.hero-model-wrap, .hero-model-stage, .problem-model-wrap, .problem-model-stage, #heroModelStage, canvas')
    .forEach(node => node.remove());
}

function ensureStickerRoot() {
  const target = document.querySelector('#problem .problem-duck-target');

  if (!target) return null;

  let mount = target.querySelector('[data-problem-sticker-root]');

  if (!mount) {
    target.innerHTML = '';
    mount = document.createElement('div');
    mount.className = 'problem-sticker-react-root';
    mount.dataset.problemStickerRoot = '';
    mount.dataset.stickerSrc = `${getRootPrefix()}assets/icons/pato.svg`;
    target.appendChild(mount);
  }

  return mount;
}

function mountProblemSticker() {
  removeLegacyProblemModel();

  const mount = ensureStickerRoot();

  if (!mount || mountedRoots.has(mount)) return;

  const imageSrc = resolveAssetPath(mount.dataset.stickerSrc || 'assets/icons/pato.svg');
  const root = createRoot(mount);

  mountedRoots.set(mount, root);

  root.render(
    <StickerPeel
      imageSrc={imageSrc}
      width={420}
      rotate={0}
      peelBackHoverPct={30}
      peelBackActivePct={40}
      shadowIntensity={0.5}
      lightingIntensity={0.1}
      initialPosition="center"
      peelDirection={0}
      className="problem-duck-sticker"
    />
  );
}

function observeDynamicSections() {
  if (!('MutationObserver' in window)) return;

  const observer = new MutationObserver(() => {
    mountProblemSticker();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

document.addEventListener('sectionsLoaded', mountProblemSticker);
window.addEventListener('sectionsLoaded', mountProblemSticker);
document.addEventListener('DOMContentLoaded', mountProblemSticker);
window.addEventListener('load', mountProblemSticker);

observeDynamicSections();

window.setTimeout(mountProblemSticker, 150);
window.setTimeout(mountProblemSticker, 600);
window.setTimeout(mountProblemSticker, 1200);

window.mountProblemSticker = mountProblemSticker;
