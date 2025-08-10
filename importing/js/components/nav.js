// File: js/components/nav.js
// Repository: https://github.com/quantuminformation/vanillajs-patterns

/**
 * Navigation Component
 * SPDX-License-Identifier: MIT
 * @version 0.3 (added full height burger expand + hover secondary colour)
 *
 * This component provides a responsive navigation menu with two modes: sidebar mode and header-bar mode.
 * It includes optional "burger" button functionality for smaller screens in header-bar mode, allowing the navigation menu
 * to toggle visibility. This component assumes it is wrapped by a parent element with a main sibling
 * for the main content, allowing it to modify the flex direction of the parent to suit layout needs.
 *
 * IMPORTANT: Ensure that the parent element can adapt (i.e. it is using flex) its layout based on the flex direction change
 * initiated by this component.
 *
 * @module NavComponent
 * @param {HTMLElement} hostComponent - The root element for this navigation component. Must have
 *                                      `data-component="nav"` attribute. Optionally, set
 *                                      `data-header-bar="true"` for header-bar mode, and
 *                                      `data-burger-px` to define the burger menu breakpoint.
 *
 * @example
 * // HTML Usage in Sidebar Mode
 * <nav data-component="nav"></nav>
 *
 * @example
 * // HTML Usage in Header-Bar Mode with Burger Menu
 * <nav data-component="nav" data-header-bar="true" data-burger-px="768"></nav>
 *
 * @description
 * - **Sidebar Mode**: Default mode, with vertical layout.
 * - **Header-Bar Mode**: Enabled by setting `data-header-bar="true"`. In this mode, the navigation
 *   aligns horizontally and includes a burger button for screen widths below the defined `burgerPx` breakpoint.
 */

export default (hostComponent) => {
  const render = () => {
    const { burgerPx, headerBar } = hostComponent.dataset;

    const navStyles = `
      nav {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        gap: 0.4rem;
        padding: 10px 10px;
        background-color: var(--nav-background-color);
        z-index: 10;
        a {
          color: var(--default-text);
          display: flex;
          gap: 0.2rem;
          align-items: center;
          padding: 0.5rem 0.3rem;
          border-radius: 0.3rem;
        }
        a:hover {
          background-color: var(--secondary-color);
        }
        a.active {
          color: var(--primary-color); /* Active link color */
        }
        &.header-bar-mode {
          flex-direction: row;
          align-items: center;
          background-color: transparent;
          width: 100%;
          @media (max-width: ${burgerPx}px) {
            flex-direction: column;
            a {
              width: 100%;
            }
            align-items: center;
            position: absolute;
            background-color: var(--nav-background-color);
            top: 0;
            bottom: 0;
            display: none;
          }
        }
      }
      .burger-button {
        position: absolute;
        right: 0;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 100;
      }
      nav:not(.header-bar-mode) {
        @media (max-width: 499px) {
          padding: 10px 6px;
          .text {
            display: none;
          }
        }
        a {
          padding: 0.4rem 0.6rem;
        }
        @media (min-width: 500px) {
          .icon {
            display: none;
          }
        }
      }
      @media (max-width: ${burgerPx}px) {
        nav.header-bar-mode.burger-open {
          display: flex !important;
        }
      }
      @media (min-width: ${burgerPx}px) {
        .burger-button {
          display: none !important;
        }
      }
      /* Burger icon animation */
      .burger-button svg rect {
        transition: transform 0.3s ease, opacity 0.3s ease;
        transform-box: fill-box;
        transform-origin: center;
      }
      .burger-button.open svg rect:nth-child(1) {
        transform: translateY(30px) rotate(45deg);
      }
      .burger-button.open svg rect:nth-child(2) {
        opacity: 0;
      }
      .burger-button.open svg rect:nth-child(3) {
        transform: translateY(-30px) rotate(-45deg);
      }
      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
      a.home-link {
        margin-right: auto;
        font-size: 1.4rem;
        padding: 0;
        border-radius: 0;
      }
      a.home-link:hover {
        background-color: transparent;
      }
      a.authors {
        margin-left: auto;
      }
      a.contact {
        margin-left: 0;
      }
    `;

    if (headerBar === 'true') {
      hostComponent.classList.add('header-bar-mode');
      hostComponent.parentElement.style.flexDirection = 'column';
    }

    // Declare burgerButton outside toggleNavVisibility to ensure accessibility within the closure.
    let burgerButton;

    const toggleNavVisibility = () => {
      hostComponent.classList.toggle('burger-open');
      if (burgerButton) {
        burgerButton.classList.toggle('open');
      }
    };

    hostComponent.innerHTML = `
      <style>${navStyles}</style>
      <a href="/" class="home-link" title="Home">
        <span class="text">Nikos Katsikanis</span>
      </a>
      <a href="/authors" class="authors" title="Authors list">
        <span class="text">Authors</span>
      </a>
      <a href="/professional-associations" class="professional-associations" title="Professional associations page">
        <span class="text">Professional Associations</span>
      </a>
      <a href="/contact" class="contact" title="Contact page">
        <span class="text">Contact</span>
      </a>
    `;

    const updateActiveLink = () => {
      const currentPath = window.location.pathname;
      hostComponent.querySelectorAll('a').forEach((link) => {
        const linkPath = link.getAttribute('href');
        link.classList.toggle('active', linkPath === currentPath);
      });
    };
    updateActiveLink();

    window.addEventListener('popstate', updateActiveLink);

    if (headerBar === 'true' && burgerPx) {
      hostComponent.parentElement.insertAdjacentHTML(
        'afterbegin',
        `
          <button class="burger-button squarify wireframe border-none" title="Open or close nav menu">
            <svg class="icon" viewBox="0 0 100 80" preserveAspectRatio="xMidYMid meet" width="20" height="20" fill="currentColor">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
          </button>
        `,
      );

      burgerButton = hostComponent.parentElement.querySelector('.burger-button');

      document.addEventListener('click', (event) => {
        const isBurgerOpen = hostComponent.classList.contains('burger-open');
        const clickedBurgerButton = event.target.closest('.burger-button');
        const clickedNavItem = event.target.closest('a');

        if (clickedBurgerButton) {
          event.stopPropagation();
          toggleNavVisibility();
          return;
        }

        if (isBurgerOpen && clickedNavItem) {
          toggleNavVisibility();
          return;
        }

        if (isBurgerOpen && !event.target.closest('nav') && !clickedBurgerButton) {
          toggleNavVisibility();
          return;
        }
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && hostComponent.classList.contains('burger-open')) {
          toggleNavVisibility();
        }
      });
    }
  };

  render();
};
