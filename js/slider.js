/**
 * Luxury Salon — Before & After Interactive Image Comparison Slider Module
 * Uses modern CSS clip-path for zero alignment distortion and smooth window-level dragging.
 */

function initBeforeAfterSlider() {
  const sliderContainer = document.getElementById('sliderContainer');
  const beforeImage = document.getElementById('beforeImage');
  const sliderHandle = document.getElementById('sliderHandle');

  if (!sliderContainer || !beforeImage || !sliderHandle) return;

  let isDraggingSlider = false;

  function moveSlider(e) {
    if (!isDraggingSlider) return;
    const rect = sliderContainer.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let offsetX = clientX - rect.left;

    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    
    // Apply modern clip-path to perfectly reveal the before image
    beforeImage.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0 100%)`;
    sliderHandle.style.left = `${percentage}%`;
  }

  // Mouse drag handlers
  sliderContainer.addEventListener('mousedown', (e) => {
    isDraggingSlider = true;
    moveSlider(e);
  });
  window.addEventListener('mouseup', () => {
    isDraggingSlider = false;
  });
  window.addEventListener('mousemove', moveSlider);

  // Touch drag handlers
  sliderContainer.addEventListener('touchstart', (e) => {
    isDraggingSlider = true;
    moveSlider(e);
  }, { passive: true });
  window.addEventListener('touchend', () => {
    isDraggingSlider = false;
  });
  window.addEventListener('touchmove', moveSlider, { passive: true });
}
