// js/carousel.js
import { reviews } from '../data/reviews.js';

export function initCarousel() {
  const slider = document.querySelector('.reviews-slider');
  const prevBtn = document.querySelector('.prev-review');
  const nextBtn = document.querySelector('.next-review');

  if (!slider) return;

  let activeIndex = 0;
  let autoplayTimer = null;

  // Render Reviews Slides
  const renderSlides = () => {
    slider.innerHTML = reviews.map((rev, index) => `
      <div class="review-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
        <p class="text-white font-serif text-lg md:text-xl italic mb-6 leading-relaxed">
          "${rev.review}"
        </p>
        <h4 class="text-gold tracking-widest uppercase text-xs font-semibold">
          ${rev.customer}
        </h4>
        <p class="text-white-40 text-xs uppercase tracking-widest mt-1">
          ${rev.date}
        </p>
      </div>
    `).join('');
  };

  const showSlide = (index) => {
    const slides = slider.querySelectorAll('.review-slide');
    if (slides.length === 0) return;

    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.opacity = 0;
    });

    activeIndex = (index + slides.length) % slides.length;
    const activeSlide = slides[activeIndex];
    
    activeSlide.classList.add('active');
    // Force reflow and set opacity
    setTimeout(() => {
      activeSlide.style.opacity = 1;
    }, 50);

    resetAutoplay();
  };

  const nextSlide = () => showSlide(activeIndex + 1);
  const prevSlide = () => showSlide(activeIndex - 1);

  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 6000);
  };

  const resetAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      startAutoplay();
    }
  };

  // Bind Listeners
  prevBtn?.addEventListener('click', prevSlide);
  nextBtn?.addEventListener('click', nextSlide);

  // Initialize
  renderSlides();
  startAutoplay();
}
