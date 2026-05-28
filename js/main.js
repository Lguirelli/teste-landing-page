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

  const originalSlides = [...carousel.querySelectorAll(".service-slide")];

  if (!originalSlides.length) return;

  originalSlides.forEach((slide) => {
    const clone = slide.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.classList.add("service-slide-clone");
    carousel.appendChild(clone);
  });

  originalSlides.slice().reverse().forEach((slide) => {
    const clone = slide.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    clone.classList.add("service-slide-clone");
    carousel.insertBefore(clone, carousel.firstChild);
  });

  let slideStep = 0;
  let originalStart = 0;
  let originalEnd = 0;
  let isMoving = false;

  function calculateSizes() {
    const slide = carousel.querySelector(".service-slide");
    const style = window.getComputedStyle(carousel);
    const gap = parseFloat(style.columnGap || style.gap) || 20;

    slideStep = slide ? slide.getBoundingClientRect().width + gap : 340;
    originalStart = slideStep * originalSlides.length;
    originalEnd = originalStart + slideStep * originalSlides.length;
  }

  function jumpToOriginalPosition() {
    calculateSizes();
    carousel.scrollLeft = originalStart;
  }

  function normalizePosition() {
    if (carousel.scrollLeft < originalStart - slideStep / 2) {
      carousel.scrollLeft += slideStep * originalSlides.length;
    }

    if (carousel.scrollLeft >= originalEnd - slideStep / 2) {
      carousel.scrollLeft -= slideStep * originalSlides.length;
    }
  }

  function moveCarousel(direction) {
    if (isMoving) return;

    isMoving = true;
    calculateSizes();

    carousel.scrollBy({
      left: slideStep * direction,
      behavior: "smooth"
    });

    window.setTimeout(() => {
      normalizePosition();
      isMoving = false;
    }, 420);
  }

  nextButton.addEventListener("click", () => {
    moveCarousel(1);
  });

  prevButton.addEventListener("click", () => {
    moveCarousel(-1);
  });

  carousel.addEventListener("scroll", () => {
    window.clearTimeout(carousel.scrollTimer);

    carousel.scrollTimer = window.setTimeout(() => {
      normalizePosition();
    }, 120);
  });

  window.addEventListener("resize", () => {
    jumpToOriginalPosition();
  });

  window.setTimeout(() => {
    jumpToOriginalPosition();
  }, 80);
}

document.addEventListener("sectionsLoaded", () => {
  initSmoothScroll();
  initServicesCarousel();
});
