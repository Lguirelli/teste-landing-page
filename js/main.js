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
  camera.position.set(0, 0.08, 6.25);

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
  let isVisible = true;
  let animationId = null;
  const baseRotationX = -0.035;
  const baseRotationY = -0.02;
  const baseRotationZ = -0.012;
  const basePositionX = 0;
  const basePositionY = 0.44;

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

    camera.position.set(0, 0.03, 6.35);
    camera.lookAt(0, 0.03, 0);
    group.rotation.set(baseRotationX, baseRotationY, baseRotationZ);
    group.position.set(basePositionX, basePositionY, 0);
  }

  function animate() {
    animationId = window.requestAnimationFrame(animate);

    if (!isVisible || !model) return;

    mouseX += (targetMouseX - mouseX) * 0.075;
    mouseY += (targetMouseY - mouseY) * 0.075;

    const influence = hoverActive ? 1 : 0.35;
    group.rotation.x = baseRotationX + (mouseY * 0.11 * influence);
    group.rotation.y = baseRotationY + (mouseX * 0.14 * influence);
    group.rotation.z = baseRotationZ - (mouseX * 0.05 * influence);

    group.position.x = basePositionX + mouseX * 0.1 * influence;
    group.position.y = basePositionY - mouseY * 0.08 * influence;

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
  });

  stage.addEventListener("pointerleave", () => {
    hoverActive = false;
    targetMouseX = 0;
    targetMouseY = 0;
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
  initHeroModel();
});
