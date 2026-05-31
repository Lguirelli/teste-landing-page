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
  const fps = 30;
  const frameDuration = 1000 / fps;
  const rootPrefix = document.body?.dataset.root || "";
  const imageFolder = `${rootPrefix}assets/hero-sequence`;

  let currentFrame = 1;
  let lastFrameTime = 0;
  let isVisible = true;
  let rafId = null;

  function getFramePath(index) {
    const frame = String(index).padStart(4, "0");
    return `${imageFolder}/${frame}.png`;
  }

  function setFrame(index) {
    if (index === currentFrame) return;

    currentFrame = index;
    image.src = getFramePath(currentFrame);
  }

  function preloadPriorityFrames() {
    const priorityFrames = [
      1, 2, 3, 4, 5,
      30, 60, 90, 120, 150,
      180, 210, 240, 270, 300
    ];

    priorityFrames.forEach((frame) => {
      const preloaded = new Image();
      preloaded.src = getFramePath(frame);
    });
  }

  function preloadAllFramesInBackground() {
    let frame = 1;

    function preloadBatch() {
      const batchSize = 12;
      const end = Math.min(frame + batchSize, totalFrames + 1);

      for (; frame < end; frame++) {
        const preloaded = new Image();
        preloaded.src = getFramePath(frame);
      }

      if (frame <= totalFrames) {
        window.setTimeout(preloadBatch, 120);
      }
    }

    window.setTimeout(preloadBatch, 600);
  }

  function animateSequence(timestamp) {
    if (!lastFrameTime) {
      lastFrameTime = timestamp;
    }

    if (isVisible && timestamp - lastFrameTime >= frameDuration) {
      const nextFrame = currentFrame >= totalFrames ? 1 : currentFrame + 1;
      setFrame(nextFrame);
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

  image.src = getFramePath(1);
  preloadPriorityFrames();
  preloadAllFramesInBackground();
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
