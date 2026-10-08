/**
 * Luxury Salon — 4-Step Booking Modal Controller (Option A)
 * Manages appointment states, Booker flow, step progression, and form validation.
 */

window.studioBooking = {
  step: 1,
  service: 'Signature Precision Haircut',
  price: 65,
  artist: 'Senior Stylist Alex',
  date: 'Wednesday, Apr 23',
  time: '10:30 AM'
};

const servicePriceMap = {
  'Signature Precision Haircut': 65,
  'Bespoke Beard Sculpt & Shave': 40,
  'Custom Balayage & Tonal Gloss': 175,
  'Restorative Botanical Scalp Spa': 55,
  'Event Blowout & Red Carpet Style': 50,
  'The Executive Grooming Ritual': 95
};

function updateBodyScrollLock() {
  const modal = document.getElementById('bookingModal');
  const cart = document.getElementById('cartDrawer');
  const menu = document.getElementById('mobileMenuDrawer');

  const isModalOpen = modal && !modal.classList.contains('hidden');
  const isCartOpen = cart && !cart.classList.contains('hidden');
  const isMenuOpen = menu && !menu.classList.contains('hidden');

  if (isModalOpen || isCartOpen || isMenuOpen) {
    document.body.classList.add('overflow-hidden');
  } else {
    document.body.classList.remove('overflow-hidden');
  }
}

function openBookingModal() {
  window.studioBooking.step = 1;
  updateModalUI();
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.remove('hidden');
  updateBodyScrollLock();
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.add('hidden');
  updateBodyScrollLock();
}

function openBookingWithService(serviceName, price) {
  window.studioBooking.service = serviceName;
  window.studioBooking.price = price || servicePriceMap[serviceName] || 65;
  window.studioBooking.step = 2; // Jump directly to artist choice
  setServiceInModal(serviceName, window.studioBooking.price);
  updateModalUI();
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.remove('hidden');
  updateBodyScrollLock();
}

function bookWithStylist(stylistName) {
  window.studioBooking.artist = stylistName;
  window.studioBooking.step = 1;
  setArtistInModal(stylistName);
  updateModalUI();
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.remove('hidden');
  updateBodyScrollLock();
}

function handleHeroInstantBook() {
  const serviceSel = document.getElementById('heroSelectService');
  const stylistSel = document.getElementById('heroSelectStylist');
  
  if (serviceSel) {
    const opt = serviceSel.options[serviceSel.selectedIndex];
    const sName = opt.value;
    const sPrice = parseInt(opt.getAttribute('data-price')) || servicePriceMap[sName] || 65;
    window.studioBooking.service = sName;
    window.studioBooking.price = sPrice;
    setServiceInModal(sName, sPrice);
  }
  
  if (stylistSel) {
    const aName = stylistSel.value;
    window.studioBooking.artist = aName;
    setArtistInModal(aName);
  }
  
  window.studioBooking.step = 3; // Jump straight to calendar
  updateModalUI();
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.remove('hidden');
  updateBodyScrollLock();
}

function setServiceInModal(name, price) {
  window.studioBooking.service = name;
  window.studioBooking.price = price || servicePriceMap[name] || 65;
  
  // Update radio buttons and highlight border
  document.querySelectorAll('.service-select-item').forEach(label => {
    const radio = label.querySelector('input[type="radio"]');
    if (radio && radio.value === name) {
      radio.checked = true;
      label.classList.add('border-brand', 'bg-brand-accent/20');
      label.classList.remove('border-gray-100');
    } else if (label) {
      label.classList.remove('border-brand', 'bg-brand-accent/20');
      label.classList.add('border-gray-100');
    }
  });
}

function setArtistInModal(artistName) {
  window.studioBooking.artist = artistName;
  document.querySelectorAll('.artist-select-item').forEach(c => {
    if (c.dataset.artist === artistName) {
      c.classList.add('border-brand', 'bg-brand-accent/20');
      c.classList.remove('border-gray-100');
    } else {
      c.classList.remove('border-brand', 'bg-brand-accent/20');
      c.classList.add('border-gray-100');
    }
  });
}

function setModalTimeSlot(btnElement, timeStr) {
  window.studioBooking.time = timeStr;
  document.querySelectorAll('.modal-time-pill').forEach(btn => {
    btn.className = 'modal-time-pill py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:border-brand';
  });
  if (btnElement) {
    btnElement.className = 'modal-time-pill py-2 rounded-xl bg-brand text-white font-semibold text-xs border-brand';
  }
}

function modalNextStep() {
  if (window.studioBooking.step < 4) {
    window.studioBooking.step++;
    updateModalUI();
  } else if (window.studioBooking.step === 4) {
    // Form Validation
    const nameInput = document.getElementById('inputClientName');
    const phoneInput = document.getElementById('inputClientPhone');
    const clientName = nameInput ? nameInput.value.trim() : '';
    const clientPhone = phoneInput ? phoneInput.value.trim() : '';

    let hasError = false;
    if (!clientName) {
      if (nameInput) {
        nameInput.focus();
        nameInput.classList.add('border-red-500', 'ring-2', 'ring-red-400');
      }
      hasError = true;
    } else if (nameInput) {
      nameInput.classList.remove('border-red-500', 'ring-2', 'ring-red-400');
    }

    if (!clientPhone || clientPhone.length < 7) {
      if (phoneInput && !hasError) {
        phoneInput.focus();
      }
      if (phoneInput) {
        phoneInput.classList.add('border-red-500', 'ring-2', 'ring-red-400');
      }
      hasError = true;
    } else if (phoneInput) {
      phoneInput.classList.remove('border-red-500', 'ring-2', 'ring-red-400');
    }

    if (hasError) return;

    // Show confirmation screen
    document.getElementById('modal-step-4').classList.add('hidden');
    document.getElementById('modalFooterNav').classList.add('hidden');
    document.getElementById('modal-step-success').classList.remove('hidden');
    document.getElementById('stepModalTitle').innerText = 'Appointment Locked';

    const refCode = '#LX-' + Math.floor(10000 + Math.random() * 90000);
    const refEl = document.getElementById('successBookingRef');
    if (refEl) refEl.innerText = refCode;

    const smsEl = document.getElementById('successSmsPhone');
    if (smsEl) smsEl.innerText = `Scheduled to ${clientPhone}`;

    document.getElementById('modalSuccessSummary').innerHTML = `Dear <strong>${clientName}</strong>, your chair is reserved with <strong>${window.studioBooking.artist}</strong> for <strong>${window.studioBooking.service}</strong> ($${window.studioBooking.price}.00) on <strong>${window.studioBooking.date}, 2026 at ${window.studioBooking.time}</strong>.`;
    
    if (window.lucide) lucide.createIcons();
  }
}

function modalPrevStep() {
  if (window.studioBooking.step > 1) {
    window.studioBooking.step--;
    updateModalUI();
  }
}

function updateModalUI() {
  const titles = [
    'Select Your Service',
    'Choose Your Artist',
    'Select Date & Time',
    'Review & Confirm Appointment'
  ];

  const badge = document.getElementById('stepCounterBadge');
  const titleEl = document.getElementById('stepModalTitle');
  if (badge) badge.innerText = window.studioBooking.step;
  if (titleEl) titleEl.innerText = titles[window.studioBooking.step - 1];

  // Toggle step visibility
  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`modal-step-${i}`);
    if (stepEl) stepEl.classList.toggle('hidden', i !== window.studioBooking.step);

    const pill = document.getElementById(`pill-step-${i}`);
    if (pill) {
      if (i === window.studioBooking.step) {
        pill.className = 'py-1.5 rounded-lg bg-brand text-white';
      } else if (i < window.studioBooking.step) {
        pill.className = 'py-1.5 rounded-lg bg-brand-accent text-brand';
      } else {
        pill.className = 'py-1.5 rounded-lg bg-gray-200 text-gray-600';
      }
    }
  }

  // Previous Button visibility
  const btnPrev = document.getElementById('btnModalPrev');
  if (btnPrev) {
    if (window.studioBooking.step === 1) {
      btnPrev.classList.add('opacity-0', 'pointer-events-none');
    } else {
      btnPrev.classList.remove('opacity-0', 'pointer-events-none');
    }
  }

  // Next Button Label & Review Summary
  const btnNext = document.getElementById('btnModalNext');
  if (btnNext) {
    if (window.studioBooking.step === 4) {
      btnNext.innerHTML = '<span>Confirm & Sync to Booker</span><i data-lucide="check" class="w-4 h-4"></i>';
      const summaryTitle = document.getElementById('summaryServiceTitle');
      const summaryTime = document.getElementById('summaryArtistTime');
      const summaryPrice = document.getElementById('summaryPriceDisplay');
      if (summaryTitle) summaryTitle.innerText = window.studioBooking.service;
      if (summaryTime) summaryTime.innerText = `With ${window.studioBooking.artist} • ${window.studioBooking.date} at ${window.studioBooking.time}`;
      if (summaryPrice) summaryPrice.innerText = `$${window.studioBooking.price}.00`;
    } else {
      btnNext.innerHTML = '<span>Continue</span><i data-lucide="chevron-right" class="w-4 h-4"></i>';
    }
  }

  const successEl = document.getElementById('modal-step-success');
  const footerNav = document.getElementById('modalFooterNav');
  if (successEl) successEl.classList.add('hidden');
  if (footerNav) footerNav.classList.remove('hidden');

  if (window.lucide) lucide.createIcons();
}
