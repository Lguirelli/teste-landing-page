const HEADER_MOBILE_QUERY = "(max-width: 1100px)";

const HEADER_SECTIONS = [
  { id: "benefits", label: "Benefícios" },
  { id: "services", label: "Serviços" },
  { id: "problem", label: "Problema" },
  { id: "how-it-works", label: "Como funciona" },
  { id: "features", label: "Recursos" },
  { id: "comparison", label: "Comparação" },
  { id: "case", label: "Caso de uso" },
  { id: "proof", label: "Provas" },
  { id: "lead", label: "Qualificação" },
  { id: "faq", label: "FAQ" }
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

function buildHeaderLink(section) {
  const link = document.createElement("a");
  link.href = `#${section.id}`;
  link.textContent = section.label;
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

function getAvailableHeaderSections() {
  return HEADER_SECTIONS.filter((section) => document.getElementById(section.id));
}

function renderHeaderNav() {
  const nav = document.querySelector("#siteNav");
  const moreWrapper = document.querySelector("[data-header-more]");
  const moreButton = document.querySelector("[data-header-menu-button]");
  const moreMenu = document.querySelector("[data-header-more-menu]");
  const actions = document.querySelector("[data-header-actions]");

  if (!nav || !moreWrapper || !moreButton || !moreMenu) return;

  ensureHeaderMenuEvents();

  const sections = getAvailableHeaderSections();
  const isHeaderMobile = window.matchMedia(HEADER_MOBILE_QUERY).matches;

  document.body.classList.toggle("is-header-mobile", isHeaderMobile);

  nav.innerHTML = "";
  moreMenu.innerHTML = "";
  moreWrapper.classList.remove("has-items");
  closeHeaderMenu();

  if (isHeaderMobile) {
    moreButton.textContent = "☰";
    moreButton.setAttribute("aria-label", "Abrir menu da página");

    const sectionGroup = document.createElement("div");
    sectionGroup.className = "header-more-sections";

    sections.forEach((section) => {
      sectionGroup.appendChild(buildHeaderLink(section));
    });

    moreMenu.appendChild(sectionGroup);

    if (actions) {
      const actionGroup = document.createElement("div");
      actionGroup.className = "header-more-actions";

      actions.querySelectorAll("a").forEach((link) => {
        actionGroup.appendChild(buildHeaderActionLink(link));
      });

      moreMenu.appendChild(actionGroup);
    }

    moreWrapper.classList.add("has-items");
    return;
  }

  moreButton.textContent = "Mais";
  moreButton.setAttribute("aria-label", "Abrir mais seções");

  const headerInner = document.querySelector(".site-header .header-inner");
  const availableWidth = headerInner?.getBoundingClientRect().width || window.innerWidth;
  const maxVisible = availableWidth >= 1440 ? 6 : availableWidth >= 1280 ? 5 : 4;
  const visibleSections = sections.slice(0, maxVisible);
  const hiddenSections = sections.slice(maxVisible);

  visibleSections.forEach((section) => {
    nav.appendChild(buildHeaderLink(section));
  });

  hiddenSections.forEach((section) => {
    moreMenu.appendChild(buildHeaderLink(section));
  });

  if (hiddenSections.length) {
    moreWrapper.classList.add("has-items");
  }

  window.requestAnimationFrame(adjustDesktopHeaderNav);
}

function adjustDesktopHeaderNav() {
  const nav = document.querySelector("#siteNav");
  const moreWrapper = document.querySelector("[data-header-more]");
  const moreMenu = document.querySelector("[data-header-more-menu]");

  if (!nav || !moreWrapper || !moreMenu) return;
  if (window.matchMedia(HEADER_MOBILE_QUERY).matches) return;

  let safety = 0;

  while (nav.scrollWidth > nav.clientWidth + 2 && safety < 40) {
    const links = [...nav.querySelectorAll("a")];
    const lastLink = links.at(-1);

    if (!lastLink) break;

    moreMenu.prepend(lastLink);
    moreWrapper.classList.add("has-items");
    safety += 1;
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
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  if (!carousel || !prevButton || !nextButton) return;
  if (carousel.dataset.carouselInitialized === "true") return;

  carousel.dataset.carouselInitialized = "true";

  const slides = [...carousel.querySelectorAll(".service-slide")];

  if (!slides.length) return;

  let currentIndex = 0;
  let isAnimating = false;

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

      slide.classList.remove(
        "is-active",
        "is-prev",
        "is-next",
        "is-hidden-left",
        "is-hidden-right"
      );

      if (position === 0) {
        slide.classList.add("is-active");
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
  }

  function moveCarousel(direction) {
    if (isAnimating) return;

    isAnimating = true;

    currentIndex += direction;

    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
    }

    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }

    updateCarousel();

    window.setTimeout(() => {
      isAnimating = false;
    }, 560);
  }

  nextButton.addEventListener("click", () => {
    moveCarousel(1);
  });

  prevButton.addEventListener("click", () => {
    moveCarousel(-1);
  });

  updateCarousel();
}



async function initHeroModel() {
  const section = document.querySelector("[data-hero-model-section]");
  const stage = document.querySelector("#heroModelStage");

  if (!section || !stage) return;
  if (stage.dataset.modelInitialized === "true") return;

  stage.dataset.modelInitialized = "true";
  stage.classList.add("duck-global-stage");

  const sourceAnchor = stage.closest(".hero-model-wrap") || stage.parentElement;
  const problemTarget = document.querySelector("[data-duck-scroll-target]");
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

  document.body.appendChild(stage);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(24, 1, 0.01, 1000);
  camera.position.set(0, -0.58, 6.25);

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
  let hoverActive = false;
  let animationId = null;
  let scrollProgress = 0;

  const baseRotationX = -0.035;
  const baseRotationY = -0.02;
  const baseRotationZ = -0.012;
  const basePositionX = 0;
  const basePositionY = 0.44;
  const finalRotationY = baseRotationY + Math.PI;
  const finalPositionY = 0.02;
  const finalModelScale = 0.76;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function lerp(start, end, progress) {
    return start + (end - start) * progress;
  }

  function easeInOutCubic(progress) {
    return progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
  }

  function getViewportRect(element) {
    return element.getBoundingClientRect();
  }

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

    camera.position.set(0, -0.58, 6.35);
    camera.lookAt(0, -0.32, 0);
    group.rotation.set(baseRotationX, baseRotationY, baseRotationZ);
    group.position.set(basePositionX, basePositionY, 0);
  }

  function applyGlobalRect(progress) {
    if (!sourceAnchor || window.innerWidth <= 980) {
      stage.style.left = "";
      stage.style.top = "";
      stage.style.width = "";
      stage.style.height = "";
      resizeRenderer();
      return;
    }

    const easedProgress = easeInOutCubic(progress);
    const source = getViewportRect(sourceAnchor);
    const target = problemTarget ? getViewportRect(problemTarget) : source;

    const targetWidth = target.width * 0.9;
    const targetHeight = Math.max(target.height * 1.3, targetWidth * 0.74);

    const sourceWidth = source.width;
    const sourceHeight = source.height;
    const sourceLeft = source.left;
    const sourceTop = source.top;
    const targetLeft = target.left + (target.width - targetWidth) / 2;
    const targetTop = target.top + (target.height - targetHeight) / 2;

    stage.style.left = `${lerp(sourceLeft, targetLeft, easedProgress)}px`;
    stage.style.top = `${lerp(sourceTop, targetTop, easedProgress)}px`;
    stage.style.width = `${lerp(sourceWidth, targetWidth, easedProgress)}px`;
    stage.style.height = `${lerp(sourceHeight, targetHeight, easedProgress)}px`;

    resizeRenderer();
  }

  function updateScrollTransition() {
    if (!problemTarget || window.innerWidth <= 980) {
      scrollProgress = 0;
      applyGlobalRect(0);
      return;
    }

    const sourceTop = sourceAnchor.getBoundingClientRect().top + window.scrollY;
    const targetTop = problemTarget.getBoundingClientRect().top + window.scrollY;
    const start = sourceTop + sourceAnchor.offsetHeight * 0.22;
    const end = targetTop - window.innerHeight * 0.46;
    const distance = Math.max(1, end - start);

    scrollProgress = clamp((window.scrollY - start) / distance, 0, 1);
    applyGlobalRect(scrollProgress);
  }

  function animate() {
    animationId = window.requestAnimationFrame(animate);

    if (!model) return;

    mouseX += (targetMouseX - mouseX) * 0.075;
    mouseY += (targetMouseY - mouseY) * 0.075;

    updateScrollTransition();

    const easedProgress = easeInOutCubic(scrollProgress);
    const hoverInfluence = (hoverActive ? 1 : 0.35) * (1 - scrollProgress);
    const rotationY = lerp(baseRotationY, finalRotationY, easedProgress);
    const positionY = lerp(basePositionY, finalPositionY, easedProgress);
    const modelScale = lerp(1, finalModelScale, easedProgress);

    group.rotation.x = baseRotationX + (mouseY * 0.11 * hoverInfluence);
    group.rotation.y = rotationY + (mouseX * 0.14 * hoverInfluence);
    group.rotation.z = baseRotationZ - (mouseX * 0.05 * hoverInfluence);

    group.position.x = basePositionX + mouseX * 0.1 * hoverInfluence;
    group.position.y = positionY - mouseY * 0.08 * hoverInfluence;
    group.scale.setScalar(modelScale);

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
      updateScrollTransition();
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
  });

  stage.addEventListener("pointerleave", () => {
    hoverActive = false;
    targetMouseX = 0;
    targetMouseY = 0;
  });

  window.addEventListener("resize", updateScrollTransition);
  window.addEventListener("scroll", updateScrollTransition, { passive: true });

  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(updateScrollTransition);
    observer.observe(sourceAnchor);
    if (problemTarget) observer.observe(problemTarget);
  }

  updateScrollTransition();
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
