function initSmoothScroll() {
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

  const getScrollAmount = () => {
    const slide = carousel.querySelector(".service-slide");
    const carouselStyle = window.getComputedStyle(carousel);
    const gap = parseFloat(carouselStyle.columnGap || carouselStyle.gap) || 20;

    return slide ? slide.getBoundingClientRect().width + gap : 340;
  };

  nextButton.addEventListener("click", () => {
    carousel.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });

  prevButton.addEventListener("click", () => {
    carousel.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });
}

document.addEventListener("sectionsLoaded", () => {
  initSmoothScroll();
  initServicesCarousel();
});
