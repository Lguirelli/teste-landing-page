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


function initHeroSequence() {
  const section = document.querySelector("[data-hero-sequence-section]");
  const image = document.querySelector("#heroSequenceImage");

  if (!section || !image) return;
  if (section.dataset.sequenceInitialized === "true") return;

  section.dataset.sequenceInitialized = "true";

  const totalFrames = 300;
  const fps = 24;
  const frameDuration = 1000 / fps;
  const preloadAhead = 72;
  const rootPrefix = document.body?.dataset.root || "";
  const imageFolder = `${rootPrefix}assets/hero-sequence`;

  let currentFrame = 1;
  let lastFrameTime = 0;
  let isVisible = true;
  let rafId = null;
  let isReady = false;

  const frameCache = new Map();
  const loadingFrames = new Set();

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: true });

  canvas.className = "hero-sequence-canvas";
  canvas.setAttribute("aria-label", image.getAttribute("alt") || "Sequência visual do produto");
  canvas.setAttribute("role", "img");

  image.style.display = "none";
  image.parentNode.insertBefore(canvas, image.nextSibling);

  function getFramePath(index) {
    const frame = String(index).padStart(4, "0");
    return `${imageFolder}/${frame}.png`;
  }

  function normalizeFrame(index) {
    if (index > totalFrames) return ((index - 1) % totalFrames) + 1;
    if (index < 1) return totalFrames + index;
    return index;
  }

  function resizeCanvasFromImage(img) {
    const width = img.naturalWidth || 1080;
    const height = img.naturalHeight || 1080;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
  }

  function drawFrame(index) {
    const frame = frameCache.get(index);

    if (!frame || !frame.complete || !frame.naturalWidth) return false;

    resizeCanvasFromImage(frame);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(frame, 0, 0, canvas.width, canvas.height);
    currentFrame = index;

    return true;
  }

  function loadFrame(index) {
    const normalizedIndex = normalizeFrame(index);

    if (frameCache.has(normalizedIndex) || loadingFrames.has(normalizedIndex)) {
      return Promise.resolve(frameCache.get(normalizedIndex));
    }

    loadingFrames.add(normalizedIndex);

    return new Promise((resolve) => {
      const frame = new Image();

      frame.decoding = "async";
      frame.loading = "eager";
      frame.src = getFramePath(normalizedIndex);

      frame.onload = async () => {
        try {
          if (frame.decode) {
            await frame.decode();
          }
        } catch (error) {
          /* A imagem já carregada ainda pode ser desenhada no canvas. */
        }

        frameCache.set(normalizedIndex, frame);
        loadingFrames.delete(normalizedIndex);
        resolve(frame);
      };

      frame.onerror = () => {
        loadingFrames.delete(normalizedIndex);
        resolve(null);
      };
    });
  }

  function preloadWindow(fromFrame) {
    for (let offset = 0; offset <= preloadAhead; offset++) {
      loadFrame(fromFrame + offset);
    }
  }

  async function preloadInitialFrames() {
    await loadFrame(1);
    drawFrame(1);

    const firstBatch = [];

    for (let frame = 2; frame <= 36; frame++) {
      firstBatch.push(loadFrame(frame));
    }

    await Promise.all(firstBatch);
    isReady = true;

    let frame = 37;

    function preloadRemainingBatch() {
      const batchSize = 10;
      const end = Math.min(frame + batchSize, totalFrames + 1);

      for (; frame < end; frame++) {
        loadFrame(frame);
      }

      if (frame <= totalFrames) {
        window.setTimeout(preloadRemainingBatch, 80);
      }
    }

    preloadRemainingBatch();
  }

  function getNextDrawableFrame(startFrame) {
    for (let offset = 1; offset <= preloadAhead; offset++) {
      const candidate = normalizeFrame(startFrame + offset);
      const frame = frameCache.get(candidate);

      if (frame && frame.complete && frame.naturalWidth) {
        return candidate;
      }
    }

    return startFrame;
  }

  function animateSequence(timestamp) {
    if (!lastFrameTime) {
      lastFrameTime = timestamp;
    }

    if (isVisible && isReady && timestamp - lastFrameTime >= frameDuration) {
      const desiredFrame = normalizeFrame(currentFrame + 1);
      preloadWindow(desiredFrame);

      if (!drawFrame(desiredFrame)) {
        drawFrame(getNextDrawableFrame(currentFrame));
      }

      lastFrameTime = timestamp;
    }

    rafId = window.requestAnimationFrame(animateSequence);
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries.some((entry) => entry.isIntersecting);
    }, {
      threshold: 0.08
    });

    observer.observe(section);
  }

  preloadInitialFrames();
  rafId = window.requestAnimationFrame(animateSequence);

  window.addEventListener("beforeunload", () => {
    if (rafId) {
      window.cancelAnimationFrame(rafId);
    }
  });
}
document.addEventListener("sectionsLoaded", () => {
  initSmoothScroll();
  initServicesCarousel();
  initHeroSequence();
});
