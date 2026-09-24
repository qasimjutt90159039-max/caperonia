/**
 * Caperino Furnitures & Interiors - Product Media Gallery & Zoom
 */

(function () {
  'use strict';

  function initGallery() {
    const mainImg = document.querySelector('.pdp-gallery-main img');
    const thumbs = document.querySelectorAll('.pdp-thumb-item');
    const mainWrap = document.querySelector('.pdp-gallery-main');

    if (!mainImg || thumbs.length === 0) return;

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const fullSrc = thumb.dataset.mediaSrc;
        const altText = thumb.dataset.mediaAlt || '';
        
        mainImg.src = fullSrc;
        mainImg.alt = altText;

        thumbs.forEach(t => t.classList.remove('is-active'));
        thumb.classList.add('is-active');
      });
    });

    // Image Zoom on Hover (Desktop)
    if (mainWrap && window.matchMedia('(min-width: 992px)').matches) {
      mainWrap.addEventListener('mousemove', (e) => {
        const rect = mainWrap.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        mainImg.style.transformOrigin = `${x}% ${y}%`;
        mainImg.style.transform = 'scale(1.5)';
      });

      mainWrap.addEventListener('mouseleave', () => {
        mainImg.style.transformOrigin = 'center center';
        mainImg.style.transform = 'scale(1)';
      });
    }

    // Variant change media sync
    document.addEventListener('variant:change', (e) => {
      const variant = e.detail?.variant;
      if (variant && variant.featured_media) {
        const targetThumb = document.querySelector(`.pdp-thumb-item[data-media-id="${variant.featured_media.id}"]`);
        if (targetThumb) {
          targetThumb.click();
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initGallery);

})();
