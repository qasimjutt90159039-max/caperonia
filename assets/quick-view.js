/**
 * Caperino Furnitures & Interiors - Quick View Modal
 * Fetches dynamic product details via Shopify /products/{handle}.js API
 */

(function () {
  'use strict';

  const modal = document.querySelector('.quickview-modal');
  const modalBody = document.querySelector('.quickview-modal-body');
  const modalClose = document.querySelector('.quickview-modal-close');

  window.openQuickView = async function (handle) {
    if (!modal || !modalBody) return;

    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 4rem; color: var(--color-text-muted);">
        <p style="font-family: var(--font-heading); font-size: 1.3rem;">Loading furniture details...</p>
      </div>
    `;

    try {
      const res = await fetch(`/products/${handle}.js`);
      if (res.ok) {
        const prod = await res.json();
        renderQuickView(prod);
      } else {
        throw new Error('Product fetch failed');
      }
    } catch (err) {
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 3rem;">
          <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">Could not load product preview.</p>
          <a href="/products/${handle}" class="btn btn-primary">View Full Product Page</a>
        </div>
      `;
    }
  };

  window.closeQuickView = function () {
    if (modal) {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  };

  function renderQuickView(prod) {
    const primaryImg = prod.images && prod.images.length > 0 ? prod.images[0] : '';
    const priceFormatted = `Rs. ${(prod.price / 100).toLocaleString()}`;
    const comparePriceFormatted = prod.compare_at_price > prod.price ? `Rs. ${(prod.compare_at_price / 100).toLocaleString()}` : '';
    const selectedVariant = prod.variants[0];

    modalBody.innerHTML = `
      <div style="display: grid; grid-template-columns: 1fr; gap: 2rem;" class="quickview-inner-grid">
        <div style="aspect-ratio: 1/1; background: var(--color-surface-warm); border-radius: 4px; overflow: hidden;">
          <img src="${primaryImg}" alt="${prod.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-accent); font-weight: 600;">
            ${prod.vendor || 'Caperino Furnitures & Interiors'}
          </div>
          <h2 style="font-family: var(--font-heading); font-size: 1.8rem; line-height: 1.2;">
            <a href="${prod.url}">${prod.title}</a>
          </h2>
          <div style="display: flex; align-items: baseline; gap: 0.75rem;">
            <span style="font-size: 1.35rem; font-weight: 600; color: var(--color-text-main);">${priceFormatted}</span>
            ${comparePriceFormatted ? `<span style="font-size: 1.05rem; text-decoration: line-through; color: var(--color-text-light);">${comparePriceFormatted}</span>` : ''}
          </div>
          <div style="font-size: 0.9rem; color: var(--color-text-muted); line-height: 1.6; max-height: 120px; overflow-y: auto;">
            ${prod.description ? prod.description.replace(/<[^>]*>/g, '').substring(0, 220) + '...' : ''}
          </div>
          
          ${prod.variants.length > 1 ? `
            <div style="margin-top: 0.5rem;">
              <label style="display: block; font-size: 0.8rem; text-transform: uppercase; font-weight: 600; margin-bottom: 0.4rem;">Select Option:</label>
              <select id="quickview-variant-select" class="sort-select" style="width: 100%; padding: 0.75rem;">
                ${prod.variants.map(v => `<option value="${v.id}">${v.title} - Rs. ${(v.price / 100).toLocaleString()}</option>`).join('')}
              </select>
            </div>
          ` : ''}

          <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
            <button type="button" class="btn btn-primary" style="flex: 1; padding: 0.9rem;" id="quickview-add-btn">
              Add to Cart
            </button>
            <a href="${prod.url}" class="btn btn-secondary" style="padding: 0.9rem;">
              Details &rarr;
            </a>
          </div>
        </div>
      </div>
      <style>
        @media (min-width: 768px) {
          .quickview-inner-grid { grid-template-columns: 1fr 1fr !important; }
        }
      </style>
    `;

    const addBtn = modalBody.querySelector('#quickview-add-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const variantSelect = modalBody.querySelector('#quickview-variant-select');
        const variantId = variantSelect ? variantSelect.value : selectedVariant.id;
        window.addToCart(variantId, 1);
        window.closeQuickView();
      });
    }
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-quickview-handle]');
    if (btn) {
      e.preventDefault();
      const handle = btn.dataset.quickviewHandle;
      window.openQuickView(handle);
    }
  });

  if (modalClose) {
    modalClose.addEventListener('click', window.closeQuickView);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeQuickView();
    });
  }

})();
