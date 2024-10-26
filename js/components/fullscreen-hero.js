export default (hostComponent) => {
  // Extract data attributes
  const imageUrl = hostComponent.getAttribute('data-image-url') || 'https://picsum.photos/1600/900';
  const overlayColor = hostComponent.getAttribute('data-overlay-color') || 'rgba(0, 0, 0, 0.5)';
  const header = hostComponent.getAttribute('data-header') || 'Welcome';
  const text = hostComponent.getAttribute('data-text') || 'Your default hero text here.';
  const buttonText = hostComponent.getAttribute('data-button-text') || 'Learn More';
  const buttonLink = hostComponent.getAttribute('data-button-link') || '#';
  const parallax = hostComponent.getAttribute('data-parallax') !== 'false'; // Default to true

  // Inject HTML
  hostComponent.innerHTML = `
    <style>
      .hero-container {
        position: relative;
        width: 100%;
        height: 100vh;
        background-image: url('${imageUrl}');
        background-size: cover;
        background-position: center;
        background-attachment: ${parallax ? 'fixed' : 'scroll'};
      }
      .hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: ${overlayColor};
      }
      .hero-content {
        position: relative;
        max-width: 800px;
        margin: 0 auto;
        padding: 5rem 1rem;
        color: white;
        text-align: left;
      }
      .hero-header {
        font-size: 2.5rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }
      .hero-text {
        font-size: 1.125rem;
        margin-bottom: 1.5rem;
      }
    
     
    </style>
    <div class="hero-container">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1 class="hero-header">${header}</h1>
        <p class="hero-text">${text}</p>
        <a href="${buttonLink}" class="button transparent squarify">${buttonText}</a>
      </div>
    </div>
  `;
};
