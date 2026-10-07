/**
 * Luxury Salon — Main Application Entry Point
 * Initializes icons, calendars, mobile 3-dot menu drawer, and interaction modules.
 */

function toggleMobileMenu() {
  const drawer = document.getElementById('mobileMenuDrawer');
  if (drawer) {
    drawer.classList.toggle('hidden');
    if (window.lucide) {
      lucide.createIcons();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // 2. Render Calendar Grids (Homepage & Modal)
  if (typeof renderCalendars === 'function') {
    renderCalendars();
  }

  // 3. Initialize Before & After Comparison Slider
  if (typeof initBeforeAfterSlider === 'function') {
    initBeforeAfterSlider();
  }

  // 4. Initialize Cart Bag
  if (typeof renderCartBag === 'function') {
    renderCartBag();
  }

  // 5. Global Escape key handler to close modals & drawers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const mobileDrawer = document.getElementById('mobileMenuDrawer');
      if (mobileDrawer && !mobileDrawer.classList.contains('hidden')) {
        mobileDrawer.classList.add('hidden');
      }
      const cartDrawer = document.getElementById('cartDrawer');
      if (cartDrawer && !cartDrawer.classList.contains('hidden')) {
        cartDrawer.classList.add('hidden');
      }
      const bookingModal = document.getElementById('bookingModal');
      if (bookingModal && !bookingModal.classList.contains('hidden')) {
        bookingModal.classList.add('hidden');
      }
    }
  });
});
