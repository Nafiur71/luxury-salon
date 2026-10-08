/**
 * Luxury Salon — Shopping Cart Drawer Module
 * Manages retail product cart state, quantity adjustment, subtotal calculations, and slide-over drawer.
 */

let cartBag = [];

function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  if (drawer) {
    drawer.classList.toggle('hidden');
  }
  if (typeof updateBodyScrollLock === 'function') {
    updateBodyScrollLock();
  }
  if (window.lucide) {
    lucide.createIcons();
  }
}

function addToCart(title, price) {
  const existingIndex = cartBag.findIndex(item => item.title === title);
  if (existingIndex > -1) {
    cartBag[existingIndex].qty += 1;
  } else {
    cartBag.push({ title, price, qty: 1 });
  }

  renderCartBag();

  // Open the drawer directly to confirm the item was added
  const drawer = document.getElementById('cartDrawer');
  if (drawer) {
    drawer.classList.remove('hidden');
  }
  if (typeof updateBodyScrollLock === 'function') {
    updateBodyScrollLock();
  }
}

function increaseCartQty(index) {
  if (cartBag[index]) {
    cartBag[index].qty += 1;
    renderCartBag();
  }
}

function decreaseCartQty(index) {
  if (cartBag[index]) {
    if (cartBag[index].qty > 1) {
      cartBag[index].qty -= 1;
    } else {
      cartBag.splice(index, 1);
    }
    renderCartBag();
  }
}

function removeFromCart(index) {
  cartBag.splice(index, 1);
  renderCartBag();
}

function renderCartBag() {
  const badge = document.getElementById('cartCountBadge');
  const container = document.getElementById('cartItemsContainer');
  const subtotalEl = document.getElementById('cartSubtotalText');

  const totalQty = cartBag.reduce((sum, item) => sum + item.qty, 0);
  if (badge) badge.innerText = totalQty;

  if (!container || !subtotalEl) return;

  if (cartBag.length === 0) {
    container.innerHTML = `
      <div class="text-center py-16 text-gray-400">
        <i data-lucide="shopping-bag" class="w-12 h-12 mx-auto stroke-1 mb-2"></i>
        <p class="text-sm font-medium">Your bag is currently empty.</p>
        <p class="text-xs text-gray-400 mt-1">Explore our Botanical Haircare collection!</p>
      </div>
    `;
    subtotalEl.innerText = '$0.00';
  } else {
    let total = 0;
    let html = '';
    cartBag.forEach((item, index) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;
      html += `
        <div class="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100 gap-3">
          <div class="flex-1">
            <h4 class="font-bold text-xs text-gray-900 leading-snug">${item.title}</h4>
            <span class="text-xs text-brand font-bold">$${item.price}.00 each</span>
          </div>
          
          <!-- Quantity Controls -->
          <div class="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl px-2 py-1 shadow-sm">
            <button onclick="decreaseCartQty(${index})" class="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-brand font-bold text-xs" title="Decrease quantity">−</button>
            <span class="text-xs font-bold text-gray-800 w-4 text-center">${item.qty}</span>
            <button onclick="increaseCartQty(${index})" class="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-brand font-bold text-xs" title="Increase quantity">+</button>
          </div>

          <!-- Total & Remove -->
          <div class="flex items-center gap-2">
            <span class="text-xs font-extrabold text-gray-900">$${itemTotal}.00</span>
            <button onclick="removeFromCart(${index})" class="text-gray-400 hover:text-red-500 p-1 transition-colors" title="Remove item">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    });
    container.innerHTML = html;
    subtotalEl.innerText = `$${total}.00`;
  }

  if (window.lucide) lucide.createIcons();
}

function handleCheckout() {
  if (cartBag.length === 0) {
    alert('Your bag is currently empty. Please select a product from our boutique.');
    return;
  }
  const modal = document.getElementById('cartDrawer');
  const totalQty = cartBag.reduce((sum, item) => sum + item.qty, 0);
  const total = cartBag.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  const confirmed = confirm(`Proceed to checkout with ${totalQty} item(s) for $${total}.00?\n\n(In production, this securely redirects to Stripe / Apple Pay checkout).`);
  if (confirmed) {
    cartBag = [];
    renderCartBag();
    toggleCart();
    alert('Thank you! Your boutique order has been received. A receipt has been sent to your email.');
  }
}
