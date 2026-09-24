/**
 * Caperino Furnitures & Interiors - Wishlist Engine
 * Handles guest local storage persistence and Shopify customer integration
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'caperino_furniture_wishlist';
  const modal = document.querySelector('.wishlist-modal');
  const wishlistTriggers = document.querySelectorAll('[data-trigger-wishlist]');
  const wishlistCloses = document.querySelectorAll('[data-close-wishlist]');
  const badgeCounts = document.querySelectorAll('.wishlist-badge-count');
  const contentContainer = document.querySelector('.wishlist-modal-body');

  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function setWishlist(items) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      updateBadges();
      syncCardButtons();
    } catch (e) {
      console.error('Error saving wishlist:', e);
    }
  }

  function updateBadges() {
    const list = getWishlist();
    badgeCounts.forEach((badge) => {
      badge.textContent = list.length;
      badge.style.display = list.length > 0 ? 'flex' : 'none';
    });
  }

  function syncCardButtons() {
    const list = getWishlist();
    const ids = new Set(list.map(item => String(item.id)));

    document.querySelectorAll('.wishlist-btn-card, .btn-wishlist-toggle').forEach((btn) => {
      const prodId = String(btn.dataset.productId);
      if (ids.has(prodId)) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-label', 'Remove from wishlist');
      } else {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-label', 'Add to wishlist');
      }
    });
  }

  window.toggleWishlist = function (product) {
    let list = getWishlist();
    const existingIndex = list.findIndex(item => String(item.id) === String(product.id));

    if (existingIndex > -1) {
      list.splice(existingIndex, 1);
      setWishlist(list);
      if (window.showToast) window.showToast(`Removed "${product.title}" from your wishlist`);
    } else {
      list.push(product);
      setWishlist(list);
      if (window.showToast) window.showToast(`Saved "${product.title}" to your wishlist`);
    }

    renderWishlist();
  };

  window.openWishlistModal = function () {
    if (modal) {
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      renderWishlist();
    }
  };

  window.closeWishlistModal = function () {
    if (modal) {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  };

  function renderWishlist() {
    if (!contentContainer) return;
    const list = getWishlist();

    if (list.length === 0) {
      contentContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1.5rem;">
          <svg style="width: 48px; height: 48px; color: var(--color-text-light); margin: 0 auto 1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 style="font-family: var(--font-heading); font-size: 1.4rem; margin-bottom: 0.5rem;">Your Wishlist is Empty</h3>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">Save furniture and interior pieces you love to review them anytime.</p>
          <a href="/collections/all" class="btn btn-primary" onclick="window.closeWishlistModal();">Explore Furniture</a>
        </div>
      `;
      return;
    }

    let html = `
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
    `;

    list.forEach(item => {
      html += `
        <div style="border: 1px solid var(--color-border); border-radius: 4px; overflow: hidden; background: #fff; display: flex; flex-direction: column;">
          <div style="aspect-ratio: 1/1; position: relative; background: var(--color-surface-warm);">
            <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;">
            <button type="button" onclick="window.removeFromWishlist('${item.id}')" style="position: absolute; top: 8px; right: 8px; background: rgba(255,255,255,0.9); border: none; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer;" title="Remove">
              &times;
            </button>
          </div>
          <div style="padding: 1rem; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.75rem; text-transform: uppercase; color: var(--color-accent); font-weight: 600;">${item.vendor || 'Caperino'}</div>
              <h4 style="font-family: var(--font-heading); font-size: 1.1rem; margin: 0.25rem 0 0.5rem;"><a href="${item.url}">${item.title}</a></h4>
              <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 1rem;">${item.price}</div>
            </div>
            <button type="button" class="btn btn-primary btn-block" style="padding: 0.65rem; font-size: 0.8rem;" onclick="window.addToCart('${item.variantId || item.id}', 1); window.closeWishlistModal();">
              Add to Cart
            </button>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    contentContainer.innerHTML = html;
  }

  window.removeFromWishlist = function (id) {
    let list = getWishlist();
    list = list.filter(item => String(item.id) !== String(id));
    setWishlist(list);
    renderWishlist();
  };

  // Event Delegation for Wishlist Buttons
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.wishlist-btn-card, .btn-wishlist-toggle');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      const product = {
        id: btn.dataset.productId,
        variantId: btn.dataset.variantId || btn.dataset.productId,
        title: btn.dataset.productTitle,
        price: btn.dataset.productPrice,
        image: btn.dataset.productImage,
        url: btn.dataset.productUrl,
        vendor: btn.dataset.productVendor || 'Caperino'
      };
      window.toggleWishlist(product);
    }
  });

  wishlistTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openWishlistModal();
    });
  });

  wishlistCloses.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.closeWishlistModal();
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeWishlistModal();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateBadges();
    syncCardButtons();
  });

})();
