/**
 * Luxury Salon — Calendar Controller Module
 * Handles monthly grid rendering, date selection, boundary validation, and time slot updates.
 */

let currentCalMonth = 3; // 0-indexed: April = 3
let currentCalYear = 2026;
let selectedDay = 23;

const baseCalMonth = 3;
const baseCalYear = 2026;

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Render both calendars (Main Page Live Schedule + Booking Modal)
 */
function renderCalendars() {
  // Main Page Calendar Header
  const mainMonthEl = document.getElementById('mainCalMonthYear');
  if (mainMonthEl) {
    mainMonthEl.innerText = `${monthNames[currentCalMonth]} ${currentCalYear}`;
  }
  const mainGrid = document.getElementById('mainCalDaysGrid');
  if (mainGrid) {
    mainGrid.innerHTML = generateDaysHTML(false);
  }

  // Booking Modal Calendar Header
  const modalMonthEl = document.getElementById('modalCalMonthLabel');
  if (modalMonthEl) {
    modalMonthEl.innerText = `${monthNames[currentCalMonth]} ${currentCalYear}`;
  }
  const modalGrid = document.getElementById('modalCalDaysGrid');
  if (modalGrid) {
    modalGrid.innerHTML = generateDaysHTML(true);
  }

  // Update Prev Month buttons states (disable if at current baseline)
  const isAtBase = (currentCalYear === baseCalYear && currentCalMonth === baseCalMonth);
  document.querySelectorAll('.btn-cal-prev').forEach(btn => {
    if (isAtBase) {
      btn.classList.add('opacity-40', 'cursor-not-allowed');
      btn.setAttribute('disabled', 'true');
    } else {
      btn.classList.remove('opacity-40', 'cursor-not-allowed');
      btn.removeAttribute('disabled');
    }
  });

  if (window.lucide) {
    lucide.createIcons();
  }
}

/**
 * Generate calendar day HTML elements
 */
function generateDaysHTML(isModal) {
  const daysInMonth = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
  const firstDayIndex = new Date(currentCalYear, currentCalMonth, 1).getDay(); // 0 is Sun
  const startOffset = (firstDayIndex + 6) % 7; // Monday = 0

  let html = '';

  // Empty padding cells
  for (let i = 0; i < startOffset; i++) {
    html += `<div class="py-2.5 text-gray-300 pointer-events-none"></div>`;
  }

  // Day buttons
  for (let day = 1; day <= daysInMonth; day++) {
    const isSelected = (day === selectedDay);
    const isPast = (currentCalYear === baseCalYear && currentCalMonth === baseCalMonth && day < 15);

    if (isPast) {
      html += `<div class="py-2 text-gray-300 font-medium select-none cursor-not-allowed">${day}</div>`;
    } else if (isSelected) {
      html += `<button type="button" onclick="handleDatePick(${day})" class="py-2 rounded-xl bg-brand text-white font-bold shadow-sm transition-transform active:scale-95" aria-current="date" aria-label="${day} ${monthNames[currentCalMonth]} selected">${day}</button>`;
    } else {
      html += `<button type="button" onclick="handleDatePick(${day})" class="py-2 rounded-xl hover:bg-brand-accent/50 text-gray-700 font-semibold transition-colors" aria-label="${day} ${monthNames[currentCalMonth]}">${day}</button>`;
    }
  }

  return html;
}

/**
 * Handle day selection
 */
function handleDatePick(day) {
  selectedDay = day;
  const d = new Date(currentCalYear, currentCalMonth, day);
  const dayName = dayNames[d.getDay()];
  const formattedDate = `${dayName}, ${monthNames[currentCalMonth].substring(0, 3)} ${day}`;
  
  if (window.studioBooking) {
    window.studioBooking.date = formattedDate;
  }

  const selectedDateLabel = document.getElementById('selectedDateLabel');
  if (selectedDateLabel) {
    selectedDateLabel.innerText = formattedDate;
  }

  const modalSelectedDateText = document.getElementById('modalSelectedDateText');
  if (modalSelectedDateText) {
    modalSelectedDateText.innerText = formattedDate;
  }

  renderCalendars();
}

/**
 * Previous Month Navigation with boundary check
 */
function prevMonth() {
  if (currentCalYear === baseCalYear && currentCalMonth <= baseCalMonth) {
    return; // Cannot go before baseline month
  }

  if (currentCalMonth > 0) {
    currentCalMonth--;
  } else {
    currentCalMonth = 11;
    currentCalYear--;
  }

  syncDateOnMonthChange();
}

/**
 * Next Month Navigation
 */
function nextMonth() {
  // Allow up to 6 months into the future
  if (currentCalMonth < 11) {
    currentCalMonth++;
  } else {
    currentCalMonth = 0;
    currentCalYear++;
  }

  syncDateOnMonthChange();
}

function syncDateOnMonthChange() {
  const daysInMonth = new Date(currentCalYear, currentCalMonth + 1, 0).getDate();
  if (selectedDay > daysInMonth) {
    selectedDay = daysInMonth;
  }
  const d = new Date(currentCalYear, currentCalMonth, selectedDay);
  const dayName = dayNames[d.getDay()];
  const formattedDate = `${dayName}, ${monthNames[currentCalMonth].substring(0, 3)} ${selectedDay}`;

  if (window.studioBooking) {
    window.studioBooking.date = formattedDate;
  }

  const selectedDateLabel = document.getElementById('selectedDateLabel');
  if (selectedDateLabel) {
    selectedDateLabel.innerText = formattedDate;
  }

  const modalSelectedDateText = document.getElementById('modalSelectedDateText');
  if (modalSelectedDateText) {
    modalSelectedDateText.innerText = formattedDate;
  }

  renderCalendars();
}

/**
 * Select a preview time slot on the homepage
 */
function selectPreviewSlot(btnElement, timeStr) {
  if (window.studioBooking) {
    window.studioBooking.time = timeStr;
  }
  document.querySelectorAll('.cal-time-pill').forEach(btn => {
    btn.className = 'cal-time-pill py-2 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-800 hover:border-brand';
  });
  if (btnElement) {
    btnElement.className = 'cal-time-pill py-2 rounded-xl bg-brand text-white text-xs font-semibold border-brand';
  }
}
