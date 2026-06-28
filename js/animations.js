// js/animations.js
export function initAnimations() {
  const getObservedElements = () => document.querySelectorAll('.animate-on-scroll');

  const observeElements = () => {
    const elements = getObservedElements();
    
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
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    elements.forEach(el => observer.observe(el));
  };

  // Run on initial load
  observeElements();

  // Listen to hash changes or DOM updates to re-observe elements
  window.addEventListener('hashchange', () => {
    setTimeout(observeElements, 100);
  });
}
