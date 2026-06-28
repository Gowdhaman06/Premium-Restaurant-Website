// js/gallery.js
const galleryImages = [
  {
    id: "g-1",
    category: "food",
    title: "Oscietra Caviar Selection",
    src: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800"
  },
  {
    id: "g-2",
    category: "interior",
    title: "The Golden Parlor",
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=800"
  },
  {
    id: "g-3",
    category: "kitchen",
    title: "Culinary Flame Dressing",
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800"
  },
  {
    id: "g-4",
    category: "food",
    title: "Truffle Filet Mignon Plating",
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
  },
  {
    id: "g-5",
    category: "interior",
    title: "Chefs Table Experience",
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800"
  },
  {
    id: "g-6",
    category: "kitchen",
    title: "Sauté Master Line",
    src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800"
  },
  {
    id: "g-7",
    category: "food",
    title: "Poached Maine Lobster tail",
    src: "https://images.unsplash.com/photo-1559742811-82428df76d23?q=80&w=800"
  },
  {
    id: "g-8",
    category: "interior",
    title: "Exquisite Table Settings",
    src: "https://images.unsplash.com/photo-1525648122249-c7ef12e35159?q=80&w=800"
  },
  {
    id: "g-9",
    category: "food",
    title: "Artisanal Grand Soufflé",
    src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800"
  }
];

export function initGallery() {
  const masonryGrid = document.getElementById('gallery-masonry');
  const filtersWrapper = document.getElementById('gallery-filters-wrapper');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = lightbox?.querySelector('.lightbox-close');
  const prevBtn = lightbox?.querySelector('.lightbox-prev');
  const nextBtn = lightbox?.querySelector('.lightbox-next');

  let activeCategory = 'all';
  let activeIndex = 0;
  let filteredImages = [...galleryImages];

  if (!masonryGrid) return;

  const createGalleryItemHTML = (img, index) => {
    return `
      <div class="gallery-item animate-on-scroll" data-index="${index}">
        <img src="${img.src}" alt="${img.title}" class="gallery-img" loading="lazy">
        <div class="gallery-hover-overlay">
          <h3 class="gallery-title">${img.title}</h3>
          <span class="gallery-category">${img.category}</span>
        </div>
      </div>
    `;
  };

  const renderGallery = () => {
    // Filter Images
    filteredImages = activeCategory === 'all' 
      ? galleryImages 
      : galleryImages.filter(img => img.category === activeCategory);

    masonryGrid.innerHTML = filteredImages.map((img, index) => createGalleryItemHTML(img, index)).join('');
    
    // Attach event listeners to items for Lightbox opening
    masonryGrid.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const index = parseInt(item.getAttribute('data-index'), 10);
        openLightbox(index);
      });
    });

    window.dispatchEvent(new Event('scroll'));
  };

  // Lightbox functions
  const openLightbox = (index) => {
    activeIndex = index;
    updateLightboxContent();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const updateLightboxContent = () => {
    const activeImg = filteredImages[activeIndex];
    if (!activeImg) return;
    
    lightboxImg.src = activeImg.src;
    lightboxImg.alt = activeImg.title;
    lightboxCaption.textContent = activeImg.title;
  };

  const showNextImage = () => {
    activeIndex = (activeIndex + 1) % filteredImages.length;
    updateLightboxContent();
  };

  const showPrevImage = () => {
    activeIndex = (activeIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxContent();
  };

  // Bind navigation listeners
  if (filtersWrapper) {
    filtersWrapper.querySelectorAll('.filter-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        activeCategory = e.target.getAttribute('data-category');
        filtersWrapper.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        renderGallery();
      });
    });
  }

  closeBtn?.addEventListener('click', closeLightbox);
  prevBtn?.addEventListener('click', showPrevImage);
  nextBtn?.addEventListener('click', showNextImage);

  // Esc key or Click outside closes Lightbox
  window.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('open')) return;
    
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  renderGallery();
}
