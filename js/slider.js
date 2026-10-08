/**
 * Luxury Salon — Before & After Interactive Image Comparison Slider Module
 * Uses modern CSS clip-path for zero alignment distortion, touch/mouse dragging, and keyboard navigation.
 */

function initBeforeAfterSlider() {
  const sliderContainer = document.getElementById('sliderContainer');
  const beforeImage = document.getElementById('beforeImage');
  const sliderHandle = document.getElementById('sliderHandle');

  if (!sliderContainer || !beforeImage || !sliderHandle) return;

  let isDraggingSlider = false;
  let currentPercentage = 50;

  function updateSliderPosition(percent) {
    currentPercentage = Math.max(0, Math.min(100, percent));
    beforeImage.style.clipPath = `polygon(0 0, ${currentPercentage}% 0, ${currentPercentage}% 100%, 0 100%)`;
    sliderHandle.style.left = `${currentPercentage}%`;
    sliderContainer.setAttribute('aria-valuenow', Math.round(currentPercentage));
  }

  function moveSlider(e) {
    const rect = sliderContainer.getBoundingClientRect();
    let clientX = e.clientX;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    } else if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
    }

    if (typeof clientX !== 'number') return;

    let offsetX = clientX - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    updateSliderPosition(percentage);
  }

  // Mouse handlers
  sliderContainer.addEventListener('mousedown', (e) => {
    isDraggingSlider = true;
    moveSlider(e);
  });

  window.addEventListener('mouseup', () => {
    isDraggingSlider = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (isDraggingSlider) {
      moveSlider(e);
    }
  });

  // Touch handlers
  sliderContainer.addEventListener('touchstart', (e) => {
    isDraggingSlider = true;
    moveSlider(e);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDraggingSlider = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (isDraggingSlider) {
      moveSlider(e);
    }
  }, { passive: true });

  // Keyboard navigation support for accessibility (a11y)
  sliderContainer.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      updateSliderPosition(currentPercentage - 5);
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      updateSliderPosition(currentPercentage + 5);
    } else if (e.key === 'Home') {
      e.preventDefault();
      updateSliderPosition(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      updateSliderPosition(100);
    }
  });
}
