// js/animations.js
window.initAnimations = function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Once animated, stop observing this item
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.05,
    rootMargin: "0px 0px -20px 0px"
  });

  // Global function to observe newly added dynamic elements
  window.observeElements = function() {
    document.querySelectorAll('.animate-on-scroll:not(.animated)').forEach(el => {
      observer.observe(el);
    });
  };

  // Run initial observation pass
  window.observeElements();

  // Listen to hash changes to trigger observation
  window.addEventListener('hashchange', () => {
    setTimeout(window.observeElements, 100);
  });
};
