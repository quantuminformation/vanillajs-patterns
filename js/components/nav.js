// js/components/nav.js

/**
 * IMPORTANT: This component assumes a single parent wrapper alongside a main sibling for content
 * so that it can change the flex direction of the parent.
 *
 * @param {HTMLElement} hostComponent
 *
 * @example
 * In sidebar mode:
 * <nav data-component="nav" data-header-bar="true"></nav>
 */

export default (hostComponent) => {
  const render = () => {
    const { burgerPx, headerBar } = hostComponent.dataset;

    const navStyles = `
      nav {
        /* Common navigation styles */
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        gap: 1rem;
        padding: 10px 20px;
        background-color: var(--nav-background-color);

        a {
          color: var(--default-text);
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        &.header-bar-mode {
          flex-direction: row;
          justify-content: center;
          background-color: transparent;
          width: 100%;

          @media (max-width: ${burgerPx}px) {
            flex-direction: column;

            a {
              width: 100%; /* Take full width in header bar mode on smaller screens */
            }

            align-items: center;
            position: absolute;
            background-color: var(--nav-background-color);
            top: 40px;
            border-radius: 1rem;
            display: none;
          }
        }
      }

      /* Burger button styles */
      .burger-button {
        position: absolute;
        right: 0;
        background: none;
        border: none;
        cursor: pointer;
        z-index: 100;
      }

      /* Non-header-bar-mode specific styles */
      nav:not(.header-bar-mode) {
        @media (max-width: 499px) {
          .text {
            display: none;
          }
        }

        @media (min-width: 500px) {
          .icon {
            display: none;
          }
        }
      }

      /* Burger mode styles for header-bar-mode */
      @media (max-width: ${burgerPx}px) {
        nav.header-bar-mode.burger-open {
          display: flex !important;
        }
      }

      /* Hide burger button for larger screens */
      @media (min-width: ${burgerPx}px) {
        .burger-button {
          display: none !important;
        }
      }
    `;

    // Add header-bar-mode class if applicable
    if (headerBar === 'true') {
      hostComponent.classList.add('header-bar-mode');
      hostComponent.parentElement.style.flexDirection = 'column';
    }

    // Function to toggle the burger menu visibility
    const toggleNavVisibility = () => {
      hostComponent.classList.toggle('burger-open');
    };

    // Render the navigation items
    hostComponent.innerHTML = `
      <style>${navStyles}</style>
      <a  href="/" title="Home">
        <span class="icon">&#x1F3E0;</span>
        <span class="text">Home</span>
      </a>
      <a  href="/button-badge" title="Button + Badges Design System">
        <span class="icon">&#x1F518;</span>
        <span class="text">Button + Badges</span>
      </a>
      <a  href="/form" title="Form Design System">
        <span class="icon">&#x270F;</span>
        <span class="text">Form</span>
      </a>
      <a  href="/heros" title="Heros">
          <span class="icon">&#x1F9B8;</span> <!-- Superhero icon -->
          <span class="text">Heros</span>
      </a>
      
      <a  href="/maps" title="Map example">
        <span class="icon">&#x1F5FA;</span>
        <span class="text">Maps</span>
      </a>
      <a  href="/calendar" title="Calendar Example">
        <span class="icon">📆</span>
        <span class="text">Calendar</span>
      </a>
      <a  href="/multiple-instances" title="Multiple instances">
        <span class="icon">🧬</span>
        <span class="text">Multiple instances</span>
      </a>
      <a  href="/cookies" title="Elementary cookie popup permissions thing">
        <span class="icon">🍪</span>
        <span class="text">Cookie popup</span>
      </a>
    `;

    // Add button styles to links
    hostComponent.querySelectorAll('a').forEach((navLink) => {
      navLink.classList.add('button', 'secondary', 'squarify');
    });

    // Add burger button for header bar mode
    if (headerBar === 'true' && burgerPx) {
      hostComponent.parentElement.insertAdjacentHTML(
          'afterbegin',
          `
          <button class="burger-button squarify wireframe border-none">
            <svg class="icon" viewBox="0 0 100 80" width="20" height="20" fill="currentColor">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
          </button>
        `
      );

      const burgerButton = hostComponent.parentElement.querySelector('.burger-button');

      // Single document-wide event listener
      document.addEventListener('click', (event) => {
        const isBurgerOpen = hostComponent.classList.contains('burger-open');
        const clickedBurgerButton = event.target.closest('.burger-button');
        const clickedNavItem = event.target.closest('a');

        // If the burger button is clicked, toggle the menu visibility
        if (clickedBurgerButton) {
          event.stopPropagation(); // Prevent the click from propagating to the document listener
          toggleNavVisibility();
        }

        // If the nav item is clicked and the menu is open, close the menu
        if (isBurgerOpen && clickedNavItem) {
          toggleNavVisibility();
        }

        // If clicked outside the nav and burger button, close the menu
        if (isBurgerOpen && !event.target.closest('nav') && !clickedBurgerButton) {
          toggleNavVisibility();
        }
      });
    }
  };

  // Initial render
  render();
};
