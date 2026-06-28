// js/router.js
const routes = {
  '': 'view-home',
  '#home': 'view-home',
  '#about': 'view-about',
  '#menu': 'view-menu',
  '#gallery': 'view-gallery',
  '#reservations': 'view-reservations',
  '#contact': 'view-contact'
};

export function initRouter() {
  const handleRouteChange = () => {
    const hash = window.location.hash;
    const viewId = routes[hash];
    
    // Hide all view sections
    document.querySelectorAll('.view-section').forEach(section => {
      section.classList.add('hidden');
    });

    const activeView = document.getElementById(viewId || 'view-404');
    if (activeView) {
      activeView.classList.remove('hidden');
      
      // Trigger scroll observer for elements inside the view
      setTimeout(() => {
        window.dispatchEvent(new Event('scroll'));
      }, 50);
    }

    // Update active nav links (Desktop)
    document.querySelectorAll('.desktop-nav .nav-link').forEach(link => {
      const linkHash = link.getAttribute('href');
      if (linkHash === hash || (hash === '' && linkHash === '#home')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update active nav links (Mobile Drawer)
    document.querySelectorAll('.drawer-links .drawer-link').forEach(link => {
      const linkHash = link.getAttribute('href');
      if (linkHash === hash || (hash === '' && linkHash === '#home')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Scroll back to top instantly on page change
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  };

  window.addEventListener('hashchange', handleRouteChange);
  
  // Initial page load trigger
  handleRouteChange();
}
