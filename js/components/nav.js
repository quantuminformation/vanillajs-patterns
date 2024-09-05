export default (hostComponent) => {
  const render = () => {
    const { burgerPx, headerBar } = hostComponent.dataset;

    const navStyles = `
      nav {
        animation: 0.5s ease-in-out 0s 1 slideInFromTop;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 10px 20px;
        background-color: var(--nav-background-color);
        min-width: 140px;
        flex-wrap: wrap;
      }

      nav.header-bar-mode {
        flex-direction: row;
        justify-content: center;
        background-color: transparent;
      }

      nav.header-bar-mode a {
        color: var(--default-text);
      }

      .burger-button {
        width: 100%;
      }

      /* Hide text in nav links when screen width is less than 400px */
      @media (max-width: 400px) {
        nav:not(.header-bar-mode) .text {
          display: none;
        }
        

        nav {
          display: none;
          align-items: center;
          flex-direction: column !important;
          position: absolute;
          background-color: var(--nav-background-color);
          top: 40px;
          left: 0;
          border-radius: 1rem;
        }

        nav.burger-open {
          display: flex !important;
        }
      }

      /* Hide burger button when screen width is greater than 400px */
      @media (min-width: 400px) {
        .burger-button {
          display: none !important;
        }
      }
    `;

    // Add header bar class if applicable
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
      <a data-nav href="/users" title="DB retrieval example">
        <span class="icon">👥</span>
        <span class="text">DB users</span>
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
      <a data-nav href="/webrtc-communicator" title="Demo of WebRTC locally with local signalling server">
        <span class="icon">🪄</span>
        <span class="text">WebRTC</span>
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
        `,
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
