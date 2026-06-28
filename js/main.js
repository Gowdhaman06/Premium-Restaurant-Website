// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Component States via global bindings
  if (typeof window.initNavbar === 'function') window.initNavbar();
  if (typeof window.initRouter === 'function') window.initRouter();
  if (typeof window.initMenu === 'function') window.initMenu();
  if (typeof window.initGallery === 'function') window.initGallery();
  if (typeof window.initReservations === 'function') window.initReservations();
  if (typeof window.initCarousel === 'function') window.initCarousel();
  if (typeof window.initAnimations === 'function') window.initAnimations();

  // Initialize Lucide SVG Icons globally
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Set current year inside footer
  const yearSpan = document.getElementById('copyright-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear().toString();
  }

  // Contact Form Submission Handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');
      
      let isValid = true;
      
      // Simple validation checks
      if (!nameInput.value.trim()) {
        document.getElementById('error-contact-name').textContent = 'Please enter your name.';
        document.getElementById('error-contact-name').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('error-contact-name').style.display = 'none';
      }

      if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
        document.getElementById('error-contact-email').textContent = 'Please enter a valid email address.';
        document.getElementById('error-contact-email').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('error-contact-email').style.display = 'none';
      }

      if (!messageInput.value.trim()) {
        document.getElementById('error-contact-message').textContent = 'Please specify your message details.';
        document.getElementById('error-contact-message').style.display = 'block';
        isValid = false;
      } else {
        document.getElementById('error-contact-message').style.display = 'none';
      }

      if (!isValid) return;

      alert("Thank you. Your message has been sent to our concierge team.");
      contactForm.reset();
    });
  }
});
