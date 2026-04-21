document.addEventListener("DOMContentLoaded", () => {
  const tracks = document.querySelectorAll('.directional-scroll-track');

  tracks.forEach(track => {
    const camera = track.querySelector('.sticky-camera');
    const images = camera.querySelectorAll('img');
    const yearDisplay = camera.querySelector('.year-display'); // Grab the text element
    const totalImages = images.length;
    const textDisplay = camera.querySelector('.text-display')

    if (totalImages === 0) return;

    track.style.height = `${totalImages * 100}vh`;

    window.addEventListener('scroll', () => {
      const rect = track.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      
      if (maxScroll <= 0) return;

      let progress = Math.abs(rect.top) / maxScroll;
      if (rect.top > 0) progress = 0;
      if (progress > 1) progress = 1;

      const currentFloatIndex = progress * (totalImages - 1);

      // --- NEW CODE STARTS HERE ---
      // Math.round picks whichever image is closest to the center
      const activeIndex = Math.round(currentFloatIndex); 
      
      // Get the year from that specific image's HTML attribute
      const currentYear = images[activeIndex].getAttribute('data-year');
      const currentText = images[activeIndex].getAttribute('data-text')
      // Update the text on the screen (only if it has changed, for performance)
      if (yearDisplay && yearDisplay.innerText !== currentYear) {
        yearDisplay.innerText = currentYear;
        textDisplay.innerText = currentText;
      }
      // --- NEW CODE ENDS HERE ---

      images.forEach((img, index) => {
        const distance = index - currentFloatIndex;
        let opacity = 1 - Math.abs(distance);
        if (opacity < 0) opacity = 0;
        let translateY = distance * 20; 

        img.style.opacity = opacity;
        img.style.transform = `translateY(${translateY}%)`;
        img.style.zIndex = 100 - Math.abs(Math.round(distance));
      });
    });

    setTimeout(() => {
      window.dispatchEvent(new Event('scroll'));
    }, 50);
  });
});