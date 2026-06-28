// js/main.js
import { initRouter } from './router.js';
import { initNavbar } from './navbar.js';
import { initMenu } from './menu.js';
import { initGallery } from './gallery.js';
import { initReservations } from './reservations.js';
import { initCarousel } from './carousel.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Core Component States
  initNavbar();
  initRouter();
  initMenu();
  initGallery();
  initReservations();
  initCarousel();
  initAnimations();

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
