// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 50) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.boxShadow = "0 2px 10px rgba(78, 46, 131, 0.1)";
  } else {
    header.style.background = "var(--white)";
    header.style.boxShadow = "none";
  }
});

// Product animation on scroll
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".product-card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "all 0.5s ease";
  observer.observe(card);
});

// Featured Items Animation
const featuredItems = document.querySelectorAll(".featured-item");
let delay = 0;

const featuredObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = `fadeInUp 0.6s ease ${delay}s forwards`;
        delay += 0.2;
        featuredObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

featuredItems.forEach((item) => {
  featuredObserver.observe(item);
});

// Reset delay when all items have been animated
featuredObserver.observe(document.querySelector(".featured-collection"), {
  callback: () => {
    delay = 0;
  },
});

// Wishlist button functionality
document.querySelectorAll(".add-wishlist").forEach((button) => {
  button.addEventListener("click", function () {
    const icon = this.querySelector("i");
    icon.classList.toggle("far");
    icon.classList.toggle("fas");

    // Add animation class
    this.classList.add("clicked");
    setTimeout(() => {
      this.classList.remove("clicked");
    }, 300);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slidesContainer = document.querySelector(".slides");
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const dotsContainer = document.querySelector(".slide-dots");

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateSlides() {
    // Update slides position
    slidesContainer.style.transform = `translateX(-${currentSlide * 25}%)`;

    // Update active states
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[currentSlide].classList.add("active");

    // Update dots
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlides();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlides();
  }

  function goToSlide(index) {
    currentSlide = index;
    updateSlides();
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Auto advance slides
  let slideInterval = setInterval(nextSlide, 4000);

  // Pause on hover
  slidesContainer.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  slidesContainer.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 4000);
  });

  // Initialize first slide
  slides[0].classList.add("active");
});

function initLegacySlideshow() {
  const slides = document.querySelector(".legacy-slides");
  let currentSlide = 0;
  const totalSlides = 3;

  function nextLegacySlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentSlide * 33.333}%)`;
  }

  // Change slide every 4 seconds
  setInterval(nextLegacySlide, 4000);
}

// Add this to your existing DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", () => {
  initSlideshow(); // Your existing slideshow
  initLegacySlideshow(); // New legacy slideshow
});
