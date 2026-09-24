/**
 * Caperino Furnitures & Interiors - Predictive Search
 * Uses Shopify native Predictive Search API (/search/suggest.json)
 */

(function () {
  'use strict';

  const modal = document.querySelector('.search-modal');
  const searchTriggers = document.querySelectorAll('[data-trigger-search]');
  const searchCloses = document.querySelectorAll('[data-close-search]');
  const searchInput = document.querySelector('.predictive-search-input');
  const resultsContainer = document.querySelector('.search-results-box');
  let debounceTimeout = null;

  window.openSearchModal = function () {
    if (modal) {
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    }
  };

  window.closeSearchModal = function () {
    if (modal) {
      modal.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  };

  searchTriggers.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.openSearchModal();
    });
  });

  searchCloses.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.closeSearchModal();
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) window.closeSearchModal();
    });
  }

  if (searchInput && resultsContainer) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      clearTimeout(debounceTimeout);

      if (!query || query.length < 2) {
        resultsContainer.innerHTML = `
          <div style="text-align: center; padding: 2rem; color: var(--color-text-muted);">
            <p style="font-size: 0.95rem;">Search furniture, lighting, rugs, and interior pieces...</p>
          </div>
        `;
        return;
      }

      debounceTimeout = setTimeout(() => {
        performSearch(query);
      }, 280);
    });
  }

  async function performSearch(query) {
    resultsContainer.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--color-text-muted);">Searching...</div>';

    try {
      const url = `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[options][unavailable_products]=hide`;
      const res = await fetch(url);

      if (res.ok) {
        const data = await res.json();
        const products = data.resources?.results?.products || [];
        renderSearchResults(products, query);
      } else {
        renderFallbackSearch(query);
      }
    } catch (err) {
      console.warn('Shopify suggest API error or preview mode:', err);
      renderFallbackSearch(query);
    }
  }

  function renderSearchResults(products, query) {
    if (!products || products.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1.5rem;">
          <h4 style="font-family: var(--font-heading); font-size: 1.35rem; margin-bottom: 0.5rem;">No products found</h4>
          <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 1.5rem;">
            Try another search or explore our furniture collections.
          </p>
          <a href="/collections/all" class="btn btn-secondary" onclick="window.closeSearchModal();">Browse All Collections</a>
        </div>
      `;
      return;
    }

    let html = `
      <div style="margin-bottom: 1rem; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--color-text-light);">
        Products matching "${query}" (${products.length})
      </div>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
    `;

    products.forEach((prod) => {
      const price = prod.price ? `Rs. ${parseFloat(prod.price).toLocaleString()}` : '';
      html += `
        <a href="${prod.url}" style="display: flex; align-items: center; gap: 1.25rem; padding: 0.75rem; border-radius: 4px; transition: background 0.2s;" onmouseover="this.style.background='var(--color-surface-warm)'" onmouseout="this.style.background='transparent'">
          <img src="${prod.image || prod.featured_image}" alt="${prod.title}" style="width: 58px; height: 58px; object-fit: cover; border-radius: 2px;">
          <div style="flex: 1;">
            <div style="font-family: var(--font-heading); font-size: 1.1rem; color: var(--color-text-main); font-weight: 500;">${prod.title}</div>
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-accent); margin-top: 2px;">${price}</div>
          </div>
          <svg style="width: 18px; height: 18px; color: var(--color-text-light);" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      `;
    });

    html += `
      </div>
      <div style="margin-top: 1.5rem; text-align: center; border-top: 1px solid var(--color-border); padding-top: 1rem;">
        <a href="/search?q=${encodeURIComponent(query)}" class="btn-link" style="font-size: 0.82rem;">View all search results &rarr;</a>
      </div>
    `;

    resultsContainer.innerHTML = html;
  }

  function renderFallbackSearch(query) {
    resultsContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <p style="margin-bottom: 1rem; color: var(--color-text-muted);">Press enter to see all results for "<strong>${query}</strong>"</p>
        <a href="/search?q=${encodeURIComponent(query)}" class="btn btn-primary" onclick="window.closeSearchModal();">Search Store</a>
      </div>
    `;
  }

})();
