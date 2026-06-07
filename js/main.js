const HEADER_MOBILE_QUERY = "(max-width: 1100px)";

const HEADER_LINKS = [
  { href: "index.html#main", label: "Home" },
  { href: "servicos/landing-pages.html", label: "Landing pages" },
  { href: "servicos/agentes-ia.html", label: "Agentes de automação" },
  { href: "servicos/conteudo-personalizado.html", label: "Conteúdo" },
  { href: "servicos/dashboards-pmes.html", label: "Dashboards" },
  { href: "servicos/estrategia-marketing.html", label: "Estratégia de Marketing" }
];

function closeHeaderMenu() {
  const button = document.querySelector("[data-header-menu-button]");
  const menu = document.querySelector("[data-header-more-menu]");

  if (!button || !menu) return;

  button.setAttribute("aria-expanded", "false");
  menu.classList.remove("is-open");
}

function openHeaderMenu() {
  const button = document.querySelector("[data-header-menu-button]");
  const menu = document.querySelector("[data-header-more-menu]");

  if (!button || !menu) return;

  button.setAttribute("aria-expanded", "true");
  menu.classList.add("is-open");
}

function toggleHeaderMenu() {
  const menu = document.querySelector("[data-header-more-menu]");

  if (!menu) return;

  if (menu.classList.contains("is-open")) {
    closeHeaderMenu();
  } else {
    openHeaderMenu();
  }
}

function buildHeaderLink(item) {
  const root = document.body?.dataset.root || "";
  const link = document.createElement("a");
  link.href = `${root}${item.href}`;
  link.textContent = item.label;
  link.className = "header-nav-link";
  return link;
}

function buildHeaderActionLink(sourceLink) {
  const link = document.createElement("a");
  link.href = sourceLink.getAttribute("href") || "#";
  link.className = sourceLink.className;
  link.textContent = sourceLink.textContent.trim();
  return link;
}

function ensureHeaderMenuEvents() {
  const button = document.querySelector("[data-header-menu-button]");

  if (!button || button.dataset.menuReady === "true") return;

  button.dataset.menuReady = "true";

  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleHeaderMenu();
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-header-more]")) {
      closeHeaderMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeHeaderMenu();
    }
  });
}

function getHeaderLinks() {
  return HEADER_LINKS;
}

function appendHeaderMoreSections(sections) {
  const moreMenu = document.querySelector("[data-header-more-menu]");

  if (!moreMenu || !sections.length) return;

  const sectionGroup = document.createElement("div");
  sectionGroup.className = "header-more-sections";

  sections.forEach((section) => {
    sectionGroup.appendChild(buildHeaderLink(section));
  });

  moreMenu.appendChild(sectionGroup);
}

function appendHeaderMoreActions(actions) {
  const moreMenu = document.querySelector("[data-header-more-menu]");

  if (!moreMenu || !actions) return;

  const actionLinks = [...actions.querySelectorAll("a")];

  if (!actionLinks.length) return;

  const actionGroup = document.createElement("div");
  actionGroup.className = "header-more-actions";

  actionLinks.forEach((link) => {
    actionGroup.appendChild(buildHeaderActionLink(link));
  });

  moreMenu.appendChild(actionGroup);
}

function renderHeaderNav() {
  const nav = document.querySelector("#siteNav");
  const moreWrapper = document.querySelector("[data-header-more]");
  const moreButton = document.querySelector("[data-header-menu-button]");
  const moreMenu = document.querySelector("[data-header-more-menu]");
  const actions = document.querySelector("[data-header-actions]");

  if (!nav || !moreWrapper || !moreButton || !moreMenu) return;

  ensureHeaderMenuEvents();

  const sections = getHeaderLinks();
  const isHeaderMobile = window.matchMedia(HEADER_MOBILE_QUERY).matches;

  document.body.classList.toggle("is-header-mobile", isHeaderMobile);

  nav.innerHTML = "";
  moreMenu.innerHTML = "";
  moreWrapper.classList.remove("has-items");
  closeHeaderMenu();

  if (isHeaderMobile) {
    moreButton.textContent = "☰";
    moreButton.setAttribute("aria-label", "Abrir menu da página");
    appendHeaderMoreSections(sections);
    appendHeaderMoreActions(actions);
    moreWrapper.classList.add("has-items");
    return;
  }

  moreButton.textContent = "Mais";
  moreButton.setAttribute("aria-label", "Abrir mais seções");

  sections.forEach((section) => {
    nav.appendChild(buildHeaderLink(section));
  });

  adjustDesktopHeaderNav(sections);
}

function adjustDesktopHeaderNav(sections = getHeaderLinks()) {
  const nav = document.querySelector("#siteNav");
  const moreWrapper = document.querySelector("[data-header-more]");
  const moreMenu = document.querySelector("[data-header-more-menu]");

  if (!nav || !moreWrapper || !moreMenu) return;
  if (window.matchMedia(HEADER_MOBILE_QUERY).matches) return;

  const hiddenSections = [];

  const navFits = () => nav.scrollWidth <= nav.clientWidth + 1;

  while (!navFits() && nav.children.length > 1) {
    const hiddenIndex = nav.children.length - 1;
    const hiddenSection = sections[hiddenIndex];
    const lastLink = nav.lastElementChild;

    if (!hiddenSection || !lastLink) break;

    hiddenSections.unshift(hiddenSection);
    nav.removeChild(lastLink);
    moreWrapper.classList.add("has-items");
  }

  if (hiddenSections.length) {
    moreMenu.innerHTML = "";
    appendHeaderMoreSections(hiddenSections);
  } else {
    moreWrapper.classList.remove("has-items");
    moreMenu.innerHTML = "";
  }
}

function initHeaderNav() {
  renderHeaderNav();

  window.addEventListener("resize", () => {
    window.clearTimeout(window.__headerNavResizeTimer);
    window.__headerNavResizeTimer = window.setTimeout(renderHeaderNav, 120);
  }, { passive: true });

  if (window.ResizeObserver) {
    const header = document.querySelector(".site-header .header-inner");

    if (header) {
      const observer = new ResizeObserver(renderHeaderNav);
      observer.observe(header);
    }
  }
}

function initSmoothScroll() {
  if (window.__smoothScrollInitialized) return;
  window.__smoothScrollInitialized = true;

  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');

    if (!link) return;

    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const target = document.querySelector(href);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    closeHeaderMenu();
  });
}

function initServicesCarousel() {
  const carousel = document.querySelector("[data-services-carousel]");

  if (!carousel) return;
  if (carousel.dataset.carouselInitialized === "true") return;

  carousel.dataset.carouselInitialized = "true";

  const slides = [...carousel.querySelectorAll(".service-slide")];

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayId = null;
  let pulseTimeoutId = null;
  const autoplayDelay = 2400;

  function getRelativePosition(index) {
    const total = slides.length;
    let position = index - currentIndex;

    if (position > total / 2) {
      position -= total;
    }

    if (position < -total / 2) {
      position += total;
    }

    return position;
  }

  function updateCarousel() {
    slides.forEach((slide, index) => {
      const position = getRelativePosition(index);
      const button = slide.querySelector(".btn");

      slide.classList.remove(
        "featured",
        "is-active",
        "is-prev",
        "is-next",
        "is-hidden-left",
        "is-hidden-right",
        "is-neon-pulse"
      );

      if (button) {
        button.classList.toggle("btn-accent", position === 0);
        button.classList.toggle("btn-secondary", position !== 0);
      }

      if (position === 0) {
        slide.classList.add("is-active", "is-neon-pulse");
      } else if (position === -1) {
        slide.classList.add("is-prev");
      } else if (position === 1) {
        slide.classList.add("is-next");
      } else if (position < -1) {
        slide.classList.add("is-hidden-left");
      } else {
        slide.classList.add("is-hidden-right");
      }
    });

    window.clearTimeout(pulseTimeoutId);
    pulseTimeoutId = window.setTimeout(() => {
      slides.forEach((slide) => slide.classList.remove("is-neon-pulse"));
    }, 840);
  }

  function moveCarousel(direction = 1) {
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    updateCarousel();
  }

  function goToSlide(index) {
    if (index === currentIndex) return;

    currentIndex = index;
    updateCarousel();
    startAutoplay();
  }

  slides.forEach((slide, index) => {
    slide.addEventListener("click", (event) => {
      if (index === currentIndex) return;

      event.preventDefault();
      goToSlide(index);
    });
  });

  function startAutoplay() {
    window.clearInterval(autoplayId);
    autoplayId = window.setInterval(() => moveCarousel(1), autoplayDelay);
  }

  updateCarousel();
  startAutoplay();
}


async function initHeroModel() {
  const section = document.querySelector("[data-duck-model-section], [data-hero-model-section]");
  const stage = document.querySelector("#heroModelStage");

  if (!section || !stage) return;
  if (stage.dataset.modelInitialized === "true") return;

  stage.dataset.modelInitialized = "true";

  const rootPrefix = document.body?.dataset.root || "";
  const modelSrc = `${rootPrefix}${stage.dataset.modelSrc || "assets/models/duck3d.glb"}`;

  let THREE;
  let GLTFLoader;

  try {
    THREE = await import("https://esm.sh/three@0.164.1");
    ({ GLTFLoader } = await import("https://esm.sh/three@0.164.1/examples/jsm/loaders/GLTFLoader.js"));
  } catch (error) {
    stage.classList.add("is-model-error");
    return;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(24, 1, 0.01, 1000);
  camera.position.set(0, -0.42, 6.15);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance"
  });

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  stage.appendChild(renderer.domElement);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x6b4a00, 1.7);
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xffffff, 1.65);
  keyLight.position.set(-2.6, 2.8, 4.2);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xffe08a, 1.1);
  fillLight.position.set(2.8, 1.6, 3.2);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.82);
  rimLight.position.set(2.4, 2.2, -2.8);
  scene.add(rimLight);

  const group = new THREE.Group();
  scene.add(group);

  const loader = new GLTFLoader();
  let model = null;
  let targetMouseX = 0;
  let targetMouseY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let dragX = 0;
  let dragY = 0;
  let targetDragX = 0;
  let targetDragY = 0;
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let dragOriginX = 0;
  let dragOriginY = 0;
  let hoverActive = false;
  let isVisible = true;
  let animationId = null;
  const baseRotationX = -0.035;
  const baseRotationY = -3.15;
  const baseRotationZ = 0.018;
  const basePositionX = 0;
  const basePositionY = 0.24;

  function resizeRenderer() {
    const rect = stage.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  }

  function fitModelToStage(object) {
    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDimension = Math.max(size.x, size.y, size.z) || 1;

    object.position.sub(center);
    object.position.y -= size.y * 0.01;
    object.scale.setScalar(1.54 / maxDimension);
    object.rotation.set(0, 0, 0);

    camera.position.set(0, -0.42, 6.15);
    camera.lookAt(0, -0.2, 0);
    group.rotation.set(baseRotationX, baseRotationY, baseRotationZ);
    group.position.set(basePositionX, basePositionY, 0);
  }

  function animate() {
    animationId = window.requestAnimationFrame(animate);

    if (!isVisible || !model) return;

    mouseX += (targetMouseX - mouseX) * 0.075;
    mouseY += (targetMouseY - mouseY) * 0.075;
    dragX += (targetDragX - dragX) * 0.16;
    dragY += (targetDragY - dragY) * 0.16;

    const influence = hoverActive || isDragging ? 1 : 0.35;
    const dragInfluence = isDragging ? 1 : 0.72;

    group.rotation.x = baseRotationX + (mouseY * 0.11 * influence) + (dragY * 0.32 * dragInfluence);
    group.rotation.y = baseRotationY + (mouseX * 0.14 * influence) + (dragX * 0.72 * dragInfluence);
    group.rotation.z = baseRotationZ - (mouseX * 0.05 * influence) - (dragX * 0.1 * dragInfluence);

    group.position.x = basePositionX + (mouseX * 0.1 * influence) + (dragX * 0.22 * dragInfluence);
    group.position.y = basePositionY - (mouseY * 0.08 * influence) - (dragY * 0.12 * dragInfluence);

    renderer.render(scene, camera);
  }

  loader.load(
    modelSrc,
    (gltf) => {
      model = gltf.scene;

      model.traverse((child) => {
        if (!child.isMesh) return;

        child.frustumCulled = false;
        child.castShadow = false;
        child.receiveShadow = false;

        if (child.geometry) {
          child.geometry.computeBoundingBox();
          child.geometry.computeBoundingSphere();
        }

        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose?.());
          } else {
            child.material.dispose?.();
          }
        }

        child.material = new THREE.MeshPhysicalMaterial({
          color: 0xffd101,
          roughness: 0.42,
          metalness: 0.0,
          clearcoat: 0.28,
          clearcoatRoughness: 0.34,
          specularIntensity: 0.42,
          reflectivity: 0.36,
          transmission: 0,
          ior: 1.45,
          flatShading: false
        });
      });

      group.add(model);
      fitModelToStage(model);
      resizeRenderer();
      renderer.render(scene, camera);
    },
    undefined,
    () => {
      stage.classList.add("is-model-error");
    }
  );

  function updatePointerInfluence(clientX, clientY) {
    const rect = stage.getBoundingClientRect();
    const normalizedX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((clientY - rect.top) / rect.height) * 2 - 1;

    targetMouseX = Math.max(-1, Math.min(1, normalizedX));
    targetMouseY = Math.max(-1, Math.min(1, normalizedY));
  }

  stage.addEventListener("pointerenter", (event) => {
    hoverActive = true;
    updatePointerInfluence(event.clientX, event.clientY);
  });

  stage.addEventListener("pointermove", (event) => {
    hoverActive = true;
    updatePointerInfluence(event.clientX, event.clientY);

    if (!isDragging) return;

    event.preventDefault();

    const rect = stage.getBoundingClientRect();
    const deltaX = (event.clientX - dragStartX) / Math.max(1, rect.width);
    const deltaY = (event.clientY - dragStartY) / Math.max(1, rect.height);

    targetDragX = Math.max(-1, Math.min(1, dragOriginX + deltaX * 2.2));
    targetDragY = Math.max(-1, Math.min(1, dragOriginY + deltaY * 2.2));
  });

  stage.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;

    isDragging = true;
    hoverActive = true;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    dragOriginX = targetDragX;
    dragOriginY = targetDragY;
    stage.classList.add("is-dragging");
    stage.setPointerCapture?.(event.pointerId);
    updatePointerInfluence(event.clientX, event.clientY);
    event.preventDefault();
  });

  function finishDrag(event) {
    if (!isDragging) return;

    isDragging = false;
    targetDragX = 0;
    targetDragY = 0;
    dragOriginX = 0;
    dragOriginY = 0;
    stage.classList.remove("is-dragging");
    stage.releasePointerCapture?.(event.pointerId);
  }

  stage.addEventListener("pointerup", finishDrag);
  stage.addEventListener("pointercancel", finishDrag);

  stage.addEventListener("pointerleave", () => {
    hoverActive = false;
    targetMouseX = 0;
    targetMouseY = 0;

    if (!isDragging) {
      targetDragX = 0;
      targetDragY = 0;
    }
  });

  window.addEventListener("resize", resizeRenderer);

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(resizeRenderer);
    observer.observe(stage);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries.some((entry) => entry.isIntersecting);
    }, { threshold: 0.08 });

    observer.observe(section);
  }

  resizeRenderer();
  animate();

  window.addEventListener("beforeunload", () => {
    if (animationId) {
      window.cancelAnimationFrame(animationId);
    }

    renderer.dispose();
  });
}

document.addEventListener("sectionsLoaded", () => {
  initSmoothScroll();
  initServicesCarousel();
  initHeaderNav();
  initHeroModel();
});
