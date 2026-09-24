/**
 * Caperino Furnitures & Interiors - AJAX Cart Drawer
 * Seamlessly integrates with Shopify Cart API (/cart/add.js, /cart/change.js, /cart.js)
 */

(function () {
  'use strict';

  const overlay = document.querySelector('.cart-drawer-overlay');
  const drawer = document.querySelector('.cart-drawer');
  const cartIconButtons = document.querySelectorAll('.header-cart-btn, [data-trigger-cart]');
  const closeButtons = document.querySelectorAll('.cart-drawer-close, [data-close-cart]');
  const itemsContainer = document.querySelector('.cart-drawer-items');
  const subtotalEl = document.querySelector('.cart-subtotal-amount');
  const countBadges = document.querySelectorAll('.cart-badge-count');

  function formatMoney(cents) {
    if (window.Shopify && Shopify.formatMoney) {
      return Shopify.formatMoney(cents, window.theme?.moneyFormat || 'Rs. {{amount}}');
    }
    const val = (cents / 100).toLocaleString('en-PK', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
    return `Rs. ${val}`;
  }

  window.openCartDrawer = function () {
    if (drawer && overlay) {
      drawer.classList.add('is-open');
      overlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      fetchCart();
    }
  };

  window.closeCartDrawer = function () {
    if (drawer && overlay) {
      drawer.classList.remove('is-open');
      overlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  };

  cartIconButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openCartDrawer();
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.closeCartDrawer();
    });
  });

  if (overlay) {
    overlay.addEventListener('click', window.closeCartDrawer);
  }

  // Fetch Cart State from Shopify
  async function fetchCart() {
    try {
      const res = await fetch('/cart.js');
      if (res.ok) {
        const cart = await res.json();
        renderCart(cart);
      }
    } catch (err) {
      console.warn('Shopify cart API unavailable or preview mode:', err);
    }
  }

  // Render Cart Drawer
  function renderCart(cart) {
    // Update badge counts
    countBadges.forEach((badge) => {
      badge.textContent = cart.item_count;
      badge.style.display = cart.item_count > 0 ? 'flex' : 'none';
    });

    if (subtotalEl) {
      subtotalEl.textContent = formatMoney(cart.total_price);
    }

    if (!itemsContainer) return;

    if (!cart.items || cart.items.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-drawer-empty">
          <svg class="cart-drawer-empty-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <h3 style="font-family: var(--font-heading); margin-bottom: 0.5rem; font-size: 1.35rem;">Your Cart is Empty</h3>
          <p style="font-size: 0.88rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">Explore our furniture collections and find something beautiful for your space.</p>
          <a href="/collections/all" class="btn btn-primary" onclick="window.closeCartDrawer();">Explore Collections</a>
        </div>
      `;
      const footer = document.querySelector('.cart-drawer-footer');
      if (footer) footer.style.display = 'none';
      return;
    }

    const footer = document.querySelector('.cart-drawer-footer');
    if (footer) footer.style.display = 'block';

    let html = '';
    cart.items.forEach((item, index) => {
      const line = index + 1;
      const variantTitle = item.variant_title && item.variant_title !== 'Default Title' ? item.variant_title : '';
      const imageSrc = item.featured_image ? item.featured_image.url || item.image : '';

      html += `
        <div class="cart-item" data-line="${line}" data-key="${item.key}">
          <div class="cart-item-image">
            <img src="${imageSrc}" alt="${item.title}" loading="lazy">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-title"><a href="${item.url}">${item.product_title}</a></h4>
            ${variantTitle ? `<div class="cart-item-variant">${variantTitle}</div>` : ''}
            <div class="cart-item-price">${formatMoney(item.final_line_price)}</div>
            <div class="cart-item-controls">
              <div class="cart-item-qty">
                <button type="button" class="cart-qty-btn cart-qty-minus" data-key="${item.key}" data-qty="${item.quantity - 1}">−</button>
                <span>${item.quantity}</span>
                <button type="button" class="cart-qty-btn cart-qty-plus" data-key="${item.key}" data-qty="${item.quantity + 1}">+</button>
              </div>
              <button type="button" class="cart-item-remove" data-key="${item.key}">Remove</button>
            </div>
          </div>
        </div>
      `;
    });

    itemsContainer.innerHTML = html;

    // Attach quantity & removal handlers
    itemsContainer.querySelectorAll('.cart-qty-btn').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const key = btn.dataset.key;
        const qty = parseInt(btn.dataset.qty, 10);
        await updateCartItem(key, qty);
      });
    });

    itemsContainer.querySelectorAll('.cart-item-remove').forEach((btn) => {
      btn.addEventListener('click', async (e) => {
        const key = btn.dataset.key;
        await updateCartItem(key, 0);
      });
    });
  }

  // Update Cart via Shopify API
  async function updateCartItem(key, quantity) {
    try {
      const res = await fetch('/cart/change.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ id: key, quantity: quantity })
      });
      if (res.ok) {
        const cart = await res.json();
        renderCart(cart);
      }
    } catch (err) {
      console.error('Failed to update cart item:', err);
    }
  }

  // Add Item to Cart (exposed globally for Product Cards and Product Page)
  window.addToCart = async function (variantId, quantity = 1, properties = {}) {
    try {
      const res = await fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          id: variantId,
          quantity: quantity,
          properties: properties
        })
      });

      if (res.ok) {
        const item = await res.json();
        window.openCartDrawer();
        if (window.showToast) {
          window.showToast(`Added "${item.title}" to your cart`);
        }
      } else {
        const err = await res.json();
        if (window.showToast) {
          window.showToast(err.description || 'Could not add item to cart', 'error');
        }
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  };

  // Intercept standard Add-to-cart form submissions
  document.addEventListener('submit', function (e) {
    const form = e.target.closest('form[action*="/cart/add"]');
    if (form) {
      e.preventDefault();
      const formData = new FormData(form);
      const variantId = formData.get('id');
      const quantity = parseInt(formData.get('quantity') || 1, 10);
      window.addToCart(variantId, quantity);
    }
  });

  // Initial cart load
  document.addEventListener('DOMContentLoaded', fetchCart);

})();
