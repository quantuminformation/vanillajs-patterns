// File: js/components/fullscreen-hero.js
// Repository: https://github.com/quantuminformation/vanillajs-patterns

/**
 * Hero Banner Component
 * SPDX-License-Identifier: MIT
 *
 * This module provides a customizable, full-screen hero banner with optional parallax effect, overlay color,
 * and configurable content, including a header, descriptive text, and a call-to-action button.
 *
 * @module components/hero
 * @version 0.1.2
 * @license MIT
 * @param {HTMLElement} hostComponent - The root element for the hero banner.
 *                                      Must include `data-component="hero"` attribute.
 *                                      Optional data attributes provide customization.
 *
 * @data-attribute {string} data-image-url - URL for the background image. Defaults to a placeholder image
 *                                           if not specified.
 * @data-attribute {string} data-overlay-color - RGBA color for the overlay that appears over the background image,
 *                                               enhancing text readability. Default is "rgba(0, 0, 0, 0.5)".
 * @data-attribute {string} data-header - Main header text for the banner. Default is "Welcome".
 * @data-attribute {string} data-text - Description or subtitle text displayed below the header.
 *                                      Default is "Your default hero text here."
 * @data-attribute {string} data-button-text - Text for the call-to-action button. Default is "Learn More".
 * @data-attribute {string} data-button-link - URL that the button links to when clicked. Default is "#".
 * @data-attribute {string} data-parallax - Controls whether the background image uses a parallax effect.
 *                                          Set to "false" to disable; defaults to "true" if not specified.
 *
 * @example
 * // HTML Usage
 * <div data-component="hero"
 *      data-image-url="https://example.com/your-image.jpg"
 *      data-overlay-color="rgba(0, 0, 0, 0.7)"
 *      data-header="Welcome to Our Site"
 *      data-text="Discover amazing content and learn more about us."
 *      data-button-text="Get Started"
 *      data-button-link="/get-started"
 *      data-parallax="true">
 * </div>
 *
 * // JavaScript Usage
 * import hero from './components/hero';
 * const heroElement = document.querySelector('[data-component="hero"]');
 * hero(heroElement);
 */

export default (hostComponent) => {
  // Extract data attributes with default values
  const imageUrl = hostComponent.getAttribute('data-image-url') || 'https://picsum.photos/1600/900';
  const overlayColor = hostComponent.getAttribute('data-overlay-color') || 'rgba(0, 0, 0, 0.5)';
  const header = hostComponent.getAttribute('data-header') || 'Welcome';
  const text = hostComponent.getAttribute('data-text') || 'Your default hero text here.';
  const buttonText = hostComponent.getAttribute('data-button-text') || 'Learn More';
  const buttonLink = hostComponent.getAttribute('data-button-link') || '#';
  const parallax = hostComponent.getAttribute('data-parallax') !== 'false'; // Defaults to true

  // Inject HTML with styles for the hero banner
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
    <section class="u-breakout u-breakout--clip">
      <div class="hero-container">
        <div class="hero-overlay"></div>
        <div class="hero-content">
          <h1 class="hero-header">${header}</h1>
          <p class="hero-text">${text}</p>
          <a href="${buttonLink}" class="button transparent squarify">${buttonText}</a>
        </div>
      </div>
    </section>
  `;
};
