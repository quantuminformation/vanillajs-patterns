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
/*
        animation: 0.5s ease-in-out 0s 1 slideInFromTop;
*/
        display: flex;
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

            display: none;
            align-items: center;
            position: absolute;
            background-color: var(--nav-background-color);
            top: 40px;
            border-radius: 1rem;
          }
        }

    
      }
          /* Burger button styles */
        .burger-button {
         position: absolute;
         right :0
        }

      /* Non-header-bar-mode specific styles */
      nav:not(.header-bar-mode) {
        @media (max-width: 399px) {
          .text {
            display: none;
          }
        }

        @media (min-width: 400px) {
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

    // Render the navigation items
    hostComponent.innerHTML = `
      <style>${navStyles}</style>
      <a data-nav href="/" title="Home">
        <span class="icon">&#x1F3E0;</span>
        <span class="text">Home</span>
      </a>
      <a data-nav href="/button-badge" title="Button + Badges Design System">
        <span class="icon">&#x1F518;</span>
        <span class="text">Button + Badges</span>
      </a>
      <a data-nav href="/form" title="Form Design System">
        <span class="icon">&#x270F;</span>
        <span class="text">Form</span>
      </a>
      <a data-nav href="/maps" title="Map example">
        <span class="icon">&#x1F5FA;</span>
        <span class="text">Maps</span>
      </a>
      <a data-nav href="/calendar" title="Calendar Example">
        <span class="icon">📆</span>
        <span class="text">Calendar</span>
      </a>
      <a data-nav href="/multiple-instances" title="Multiple instances">
        <span class="icon">🧬</span>
        <span class="text">Multiple instances</span>
      </a>
      <a data-nav href="/cookies" title="Elementary cookie popup permissions thing">
        <span class="icon">🍪</span>
        <span class="text">Cookie popup</span>
      </a>
    `;

    // Add button styles
    hostComponent.querySelectorAll('a').forEach((navLink) => {
      navLink.classList.add('button', 'secondary', 'squarify');
    });

    // Add burger button for header bar mode
    if (headerBar === 'true' && burgerPx) {
      hostComponent.parentElement.insertAdjacentHTML(
          'afterbegin',
          `
          <button class="burger-button squarify outline">
            <svg class="icon" viewBox="0 0 100 80" width="20" height="20" fill="currentColor">
              <rect width="100" height="20"></rect>
              <rect y="30" width="100" height="20"></rect>
              <rect y="60" width="100" height="20"></rect>
            </svg>
          </button>
        `
      );

      // Toggle burger menu visibility
      hostComponent.parentElement.querySelector('.burger-button').addEventListener('click', () => {
        hostComponent.classList.toggle('burger-open');
      });
    }
  };

  // Initial render
  render();
};
