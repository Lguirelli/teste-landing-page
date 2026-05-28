async function includeSections() {
  const targets = document.querySelectorAll("[data-section]");

  await Promise.all([...targets].map(async (target) => {
    const path = target.getAttribute("data-section");

    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`Erro ao carregar ${path}`);
      }

      target.innerHTML = await response.text();
    } catch (error) {
      target.innerHTML = `
        <section class="section">
          <div class="container">
            <div class="card">
              <strong>Seção não carregada:</strong> ${path}
            </div>
          </div>
        </section>
      `;

      console.error(error);
    }
  }));
}

function initSmoothScroll() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');

    if (!link) return;

    const target = document.querySelector(link.getAttribute("href"));

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

function initServicesCarousel() {
  const servicesCarousel = document.querySelector("[data-services-carousel]");
  const carouselPrev = document.querySelector(".carousel-prev");
  const carouselNext = document.querySelector(".carousel-next");

  if (!servicesCarousel || !carouselPrev || !carouselNext) return;

  const getScrollAmount = () => {
    const slide = servicesCarousel.querySelector(".service-slide");
    const gap = parseInt(getComputedStyle(servicesCarousel).gap) || 24;

    return slide ? slide.offsetWidth + gap : 320;
  };

  carouselNext.addEventListener("click", () => {
    servicesCarousel.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth"
    });
  });

  carouselPrev.addEventListener("click", () => {
    servicesCarousel.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth"
    });
  });
}

async function initPage() {
  await includeSections();

  initSmoothScroll();
  initServicesCarousel();
}

initPage();
