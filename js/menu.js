// js/menu.js
window.initMenu = function() {
  const menuGrid = document.getElementById('menu-dishes-grid');
  const featuredGrid = document.getElementById('featured-dishes-grid');
  const popularGrid = document.getElementById('popular-highlights');
  const filtersWrapper = document.getElementById('menu-filters-wrapper');
  const searchInput = document.getElementById('menu-search-input');
  const sortSelect = document.getElementById('menu-sort-select');

  let activeCategory = 'all';
  let searchQuery = '';
  let sortBy = 'popularity';

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'starters', name: 'Starters' },
    { id: 'main', name: 'Main Course' },
    { id: 'seafood', name: 'Seafood' },
    { id: 'pasta', name: 'Pasta' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'wine', name: 'Wine Cellar' }
  ];

  // Helper to generate a single Dish Card HTML string
  const createDishCardHTML = (dish) => {
    const vegBadge = dish.vegetarian ? '<span class="badge badge-veg">Vegetarian</span>' : '';
    const chefBadge = dish.featured ? '<span class="badge badge-chef">Chef Selection</span>' : '';
    const spicyBadge = dish.spicy ? '<span class="badge badge-spicy">Spicy</span>' : '';

    return `
      <article class="dish-card animate-on-scroll">
        <div class="dish-card-img-wrapper">
          <img src="${dish.image}" alt="${dish.name}" class="dish-card-img" loading="lazy">
          <div class="dish-badges">
            ${chefBadge}
            ${vegBadge}
            ${spicyBadge}
          </div>
        </div>
        <div class="dish-card-body">
          <div>
            <div class="dish-card-header">
              <h3 class="dish-card-title">${dish.name}</h3>
              <span class="dish-card-price">$${dish.price.toFixed(2)}</span>
            </div>
            <p class="dish-card-desc">${dish.description}</p>
          </div>
          <div class="dish-card-footer">
            <span>${dish.category}</span>
            <span>${dish.rating} ★</span>
          </div>
        </div>
      </article>
    `;
  };

  // Render Homepage Featured Content
  const renderHomeFeatured = () => {
    const items = window.menuItems || [];
    if (items.length === 0) return;

    if (featuredGrid) {
      const featuredItems = items.filter(item => item.featured).slice(0, 3);
      featuredGrid.innerHTML = featuredItems.map(createDishCardHTML).join('');
    }

    if (popularGrid) {
      const popularItems = [...items].sort((a, b) => b.rating - a.rating).slice(0, 3);
      popularGrid.innerHTML = popularItems.map(createDishCardHTML).join('');
    }
  };

  // Render Filters in Menu View
  const renderCategoryFilters = () => {
    if (!filtersWrapper) return;

    filtersWrapper.innerHTML = categories.map(cat => `
      <button class="filter-pill ${activeCategory === cat.id ? 'active' : ''}" data-category="${cat.id}">
        ${cat.name}
      </button>
    `).join('');

    // Attach Event Listeners
    filtersWrapper.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-category');
        
        filtersWrapper.querySelectorAll('.filter-pill').forEach(pill => pill.classList.remove('active'));
        btn.classList.add('active');
        
        applyFiltersAndSort();
      });
    });
  };

  // Render Dishes in Menu View
  const renderMenuDishes = (items) => {
    if (!menuGrid) return;
    
    if (items.length === 0) {
      menuGrid.style.display = 'grid';
      menuGrid.innerHTML = `
        <div class="flex-center text-center py-16 w-full" style="grid-column: 1 / -1;">
          <p class="text-gray text-lg">No exceptional dishes match your query.</p>
        </div>
      `;
      return;
    }

    // Group menu items by category on "All Courses" selection (when search is empty)
    if (activeCategory === 'all' && !searchQuery) {
      let html = '';
      
      categories.forEach(cat => {
        if (cat.id === 'all') return;
        
        const catItems = items.filter(item => item.category === cat.id);
        if (catItems.length === 0) return;
        
        html += `
          <div class="menu-category-section mb-12 animate-on-scroll" style="grid-column: 1 / -1; width: 100%;">
            <div class="flex-center items-center mb-8" style="display: flex; align-items: center; justify-content: center; width: 100%; margin-bottom: 32px;">
              <div class="line-decor" style="flex-grow: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(212, 175, 55, 0.3), transparent);"></div>
              <h2 class="font-serif text-2xl text-gold uppercase tracking-widest px-6 text-center" style="font-family: var(--font-serif); color: var(--color-gold); font-size: 24px; letter-spacing: 4px; white-space: nowrap;">${cat.name}</h2>
              <div class="line-decor" style="flex-grow: 1; height: 1px; background: linear-gradient(to right, transparent, rgba(212, 175, 55, 0.3), transparent);"></div>
            </div>
            <div class="cards-grid">
              ${catItems.map(createDishCardHTML).join('')}
            </div>
          </div>
        `;
      });
      
      menuGrid.innerHTML = html;
      menuGrid.style.display = 'block';
    } else {
      // Individual category filter or active search filters
      menuGrid.style.display = 'grid';
      menuGrid.innerHTML = items.map(createDishCardHTML).join('');
    }
    
    // Bind newly injected items to animation observer
    if (typeof window.observeElements === 'function') {
      window.observeElements();
    }
    
    // Dispatch scroll event to force observer check
    window.dispatchEvent(new Event('scroll'));
  };

  // Apply filters, searches, and sorting
  const applyFiltersAndSort = () => {
    let filtered = [...(window.menuItems || [])];

    // Filter by Category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(item => item.category === activeCategory);
    }

    // Filter by Search query
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery) || 
        item.description.toLowerCase().includes(searchQuery)
      );
    }

    // Sort items
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else {
      // Default: popularity (by rating)
      filtered.sort((a, b) => b.rating - a.rating);
    }

    renderMenuDishes(filtered);
  };

  // Setup input listeners for filters
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFiltersAndSort();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      applyFiltersAndSort();
    });
  }

  // Initialization calls
  renderHomeFeatured();
  renderCategoryFilters();
  applyFiltersAndSort();
};
