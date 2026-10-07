/**
 * Luxury Salon — Shopping Cart Drawer Module
 * Manages retail product cart state, subtotal calculations, and slide-over drawer.
 */

let cartBag = [];

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.classList.toggle('hidden');
}

function addToCart(title, price) {
  cartBag.push({ title, price });
  renderCartBag();
  toggleCart();
}

function renderCartBag() {
  const badge = document.getElementById('cartCountBadge');
  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotalText');

  if (badge) badge.innerText = cartBag.length;

  if (!container || !subtotalEl) return;

  if (cartBag.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 text-gray-400">
        <i data-lucide="shopping-bag" class="w-12 h-12 mx-auto stroke-1 mb-2"></i>
        <p class="text-sm font-medium">Your bag is currently empty.</p>
      </div>
    `;
    subtotalEl.innerText = '$0.00';
  } else {
    let total = 0;
    let html = '';
    cartBag.forEach((item, index) => {
      total += item.price;
      html += `
        <div class="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
          <div>
            <h4 class="font-bold text-xs text-gray-900">${item.title}</h4>
            <span class="text-xs text-brand font-bold">$${item.price}.00</span>
          </div>
          <button onclick="removeFromCart(${index})" class="text-red-400 hover:text-red-600 p-1" title="Remove item">
            <i data-lucide="trash-2" class="w-4 h-4"></i>
          </button>
        </div>
      `;
    });
    container.innerHTML = html;
    subtotalEl.innerText = `$${total}.00`;
  }
  if (window.lucide) lucide.createIcons();
}

function removeFromCart(index) {
  cartBag.splice(index, 1);
  renderCartBag();
}
