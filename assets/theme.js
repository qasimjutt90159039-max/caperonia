/**
 * Caperino Furnitures & Interiors - Theme Core JavaScript
 */

(function () {
  'use strict';

  // Sticky Header Scroll Behavior
  const header = document.querySelector('.site-header');
  if (header) {
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 40) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  // Mobile Drawer Toggle
  const hamburgerBtn = document.querySelector('.header-hamburger');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileDrawerClose = document.querySelector('.mobile-nav-close');

  if (hamburgerBtn && mobileDrawer) {
    hamburgerBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('is-active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileDrawerClose && mobileDrawer) {
    mobileDrawerClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('is-active');
      document.body.style.overflow = '';
    });
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        mobileDrawer.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  }

  // Generic Accordion (for FAQs and PDP Specs)
  const accordions = document.querySelectorAll('.accordion-trigger');
  accordions.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', !expanded);
      const content = trigger.nextElementSibling;
      if (content) {
        content.hidden = expanded;
        if (!expanded) {
          content.classList.add('is-open');
        } else {
          content.classList.remove('is-open');
        }
      }
    });
  });

  // Quantity Stepper Helper
  document.addEventListener('click', function (e) {
    if (e.target.matches('.qty-minus') || e.target.closest('.qty-minus')) {
      const btn = e.target.matches('.qty-minus') ? e.target : e.target.closest('.qty-minus');
      const input = btn.parentElement.querySelector('.qty-input');
      if (input) {
        let val = parseInt(input.value, 10) || 1;
        if (val > 1) {
          input.value = val - 1;
          input.dispatchEvent(new Event('change', { bubbles: true }));
        }
      }
    }
    if (e.target.matches('.qty-plus') || e.target.closest('.qty-plus')) {
      const btn = e.target.matches('.qty-plus') ? e.target : e.target.closest('.qty-plus');
      const input = btn.parentElement.querySelector('.qty-input');
      if (input) {
        let val = parseInt(input.value, 10) || 1;
        input.value = val + 1;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }
  });

  // Toast Notification System
  window.showToast = function (message, type = 'success') {
    let toast = document.getElementById('caperino-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'caperino-toast';
      toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: #1D1A16;
        color: #fff;
        padding: 14px 22px;
        border-radius: 4px;
        font-size: 0.88rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        z-index: 99999;
        opacity: 0;
        transform: translateY(12px);
        transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        align-items: center;
        gap: 10px;
        border-left: 4px solid #9B7653;
      `;
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
    }, 3200);
  };

  // Keyboard navigation & accessibility escapes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (window.closeCartDrawer) window.closeCartDrawer();
      if (window.closeSearchModal) window.closeSearchModal();
      if (window.closeWishlistModal) window.closeWishlistModal();
      if (window.closeQuickView) window.closeQuickView();
      if (mobileDrawer && mobileDrawer.classList.contains('is-active')) {
        mobileDrawer.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    }
  });

})();
