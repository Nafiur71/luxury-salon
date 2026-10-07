/**
 * Luxury Salon — 4-Step Booking Modal Controller (Option A)
 * Manages appointment states, Booker flow, and step progression.
 */

window.studioBooking = {
  step: 1,
  service: 'Signature Precision Haircut',
  price: 65,
  artist: 'Senior Stylist Alex',
  date: 'Wednesday, Apr 23',
  time: '10:30 AM'
};

function openBookingModal() {
  window.studioBooking.step = 1;
  updateModalUI();
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.remove('hidden');
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.add('hidden');
}

function openBookingWithService(serviceName, price) {
  window.studioBooking.service = serviceName;
  window.studioBooking.price = price;
  window.studioBooking.step = 2; // Jump directly to artist choice
  updateModalUI();
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.remove('hidden');
}

function bookWithStylist(stylistName) {
  window.studioBooking.artist = stylistName;
  window.studioBooking.step = 1;
  setArtistInModal(stylistName);
  updateModalUI();
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.remove('hidden');
}

function handleHeroInstantBook() {
  const serviceSel = document.getElementById('heroSelectService');
  const stylistSel = document.getElementById('heroSelectStylist');
  if (serviceSel) {
    const opt = serviceSel.options[serviceSel.selectedIndex];
    window.studioBooking.service = opt.value;
  }
  if (stylistSel) {
    window.studioBooking.artist = stylistSel.value;
  }
  window.studioBooking.step = 3; // Jump straight to calendar
  updateModalUI();
  const modal = document.getElementById('bookingModal');
  if (modal) modal.classList.remove('hidden');
}

function setServiceInModal(name, price) {
  window.studioBooking.service = name;
  window.studioBooking.price = price;
  
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
    // Show confirmation screen
    document.getElementById('modal-step-4').classList.add('hidden');
    document.getElementById('modalFooterNav').classList.add('hidden');
    document.getElementById('modal-step-success').classList.remove('hidden');
    document.getElementById('stepModalTitle').innerText = 'Appointment Locked';
    document.getElementById('modalSuccessSummary').innerHTML = `Your chair is reserved with <strong>${window.studioBooking.artist}</strong> for <strong>${window.studioBooking.service}</strong> on <strong>${window.studioBooking.date}, 2026 at ${window.studioBooking.time}</strong>.`;
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

  // Next Button Label
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
