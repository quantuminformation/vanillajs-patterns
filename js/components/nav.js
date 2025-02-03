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
        padding:0.5rem 0.3rem;
        border-radius:0.3rem;
        }

  a:hover{
            background-color:var(--secondary-color);
          }

        a.active {
          color: var(--primary-color); /* Active link color */
        }

        &.header-bar-mode {
        
          flex-direction: row;
          justify-content: top;
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
            bottom:0;
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
        a {padding:0.4rem 0.6rem;}

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
    `;

    if (headerBar === 'true') {
      hostComponent.classList.add('header-bar-mode');
      hostComponent.parentElement.style.flexDirection = 'column';
    }

    const toggleNavVisibility = () => {
      hostComponent.classList.toggle('burger-open');
    };

    hostComponent.innerHTML = `
      <style>${navStyles}</style>
      <a href="/" title="Home">
        <span class="icon">&#x1F3E0;</span>
        <span class="text">Home</span>
      </a>
      <a href="/button-badge" title="Button + Badges Design System">
        <span class="icon">&#x1F518;</span>
        <span class="text">Button + Badges</span>
      </a>
      <a href="/form" title="Form Design System">
        <span class="icon">&#x270F;</span>
        <span class="text">Form</span>
      </a>
      <a href="/heros" title="Heros">
        <span class="icon">&#x1F9B8;</span>
        <span class="text">Heros</span>
      </a>
      <a href="/maps" title="Map example">
        <span class="icon">&#x1F5FA;</span>
        <span class="text">Maps</span>
      </a>
      <a href="/calendar" title="Calendar Example">
        <span class="icon">📆</span>
        <span class="text">Calendar</span>
      </a>
      <a href="/multiple-instances" title="Multiple instances">
        <span class="icon">🧬</span>
        <span class="text">Multiple instances</span>
      </a>
      <a href="/cookies" title="Elementary cookie popup permissions">
        <span class="icon">🍪</span>
        <span class="text">Cookie popup</span>
      </a>
    `;

    // Function to update the active link based on the current path
    const updateActiveLink = () => {
      const currentPath = window.location.pathname;
      hostComponent.querySelectorAll('a').forEach((link) => {
        const linkPath = link.getAttribute('href');
        link.classList.toggle('active', linkPath === currentPath);
      });
    };
    updateActiveLink();

    // Listen for popstate events to update active link on browser navigation
    window.addEventListener('popstate', updateActiveLink);

    if (headerBar === 'true' && burgerPx) {
      hostComponent.parentElement.insertAdjacentHTML(
        'afterbegin',
        `
          <button class="burger-button squarify wireframe border-none" title="Open or close nav menu">
            <svg class="icon" viewBox="0 0 100 80" width="20" height="20" fill="currentColor">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
          </button>
        `,
      );

      const burgerButton = hostComponent.parentElement.querySelector('.burger-button');

      document.addEventListener('click', (event) => {
        const isBurgerOpen = hostComponent.classList.contains('burger-open');
        const clickedBurgerButton = event.target.closest('.burger-button');
        const clickedNavItem = event.target.closest('a');

        if (clickedBurgerButton) {
          event.stopPropagation();
          toggleNavVisibility();
        }

        if (isBurgerOpen && clickedNavItem) {
          toggleNavVisibility();
        }

        if (isBurgerOpen && !event.target.closest('nav') && !clickedBurgerButton) {
          toggleNavVisibility();
        }
      });
    }
  };

  render();
};
