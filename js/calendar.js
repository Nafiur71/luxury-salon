/**
 * Luxury Salon — Calendar Controller Module
 * Handles monthly grid rendering, date selection, and time slot updates.
 */

let currentCalMonth = 3; // 0-indexed: April = 3
let currentCalYear = 2026;
let selectedDay = 23;

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
    const isPast = (day < 15 && currentCalMonth === 3 && currentCalYear === 2026);

    if (isPast) {
      html += `<div class="py-2 text-gray-300 font-medium">${day}</div>`;
    } else if (isSelected) {
      html += `<button type="button" onclick="handleDatePick(${day})" class="py-2 rounded-xl bg-brand text-white font-bold shadow-sm transition-transform active:scale-95">${day}</button>`;
    } else {
      html += `<button type="button" onclick="handleDatePick(${day})" class="py-2 rounded-xl hover:bg-brand-accent/50 text-gray-700 font-semibold transition-colors">${day}</button>`;
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
  
  if (window.studioBooking) {
    window.studioBooking.date = `${dayName}, ${monthNames[currentCalMonth].substring(0, 3)} ${day}`;
  }

  const selectedDateLabel = document.getElementById('selectedDateLabel');
  if (selectedDateLabel) {
    selectedDateLabel.innerText = `${dayName}, ${monthNames[currentCalMonth].substring(0, 3)} ${day}`;
  }

  const modalSelectedDateText = document.getElementById('modalSelectedDateText');
  if (modalSelectedDateText) {
    modalSelectedDateText.innerText = `${dayName}, ${monthNames[currentCalMonth].substring(0, 3)} ${day}`;
  }

  renderCalendars();
}

/**
 * Previous Month Navigation
 */
function prevMonth() {
  if (currentCalMonth > 0) {
    currentCalMonth--;
  } else {
    currentCalMonth = 11;
    currentCalYear--;
  }
  renderCalendars();
}

/**
 * Next Month Navigation
 */
function nextMonth() {
  if (currentCalMonth < 11) {
    currentCalMonth++;
  } else {
    currentCalMonth = 0;
    currentCalYear++;
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
