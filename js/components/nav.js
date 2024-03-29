//stored in /components/nav.js

/**
 * IMPORTANT This component assumes a single parent wrapper alongside a main sibling for content so
 * that it can change the flex direction of the parent
 * @param hostComponent
 *
 * @example
 * in sidebar mode
 *       <nav data-component="nav" data-header-bar="true"></nav>
 *
 */
export default (hostComponent) => {
  const render = (isHeaderBarMode = false) => {
    // dont display the nav if we are in header bar mode and modify the parent flex direction
    let { burgerPx, headerBar } = hostComponent.dataset;
    if (!headerBar && burgerPx) {
      throw new Error("you do not need burgerPx when headerBar isn't true");
    }

    // CSS styles for the navigation component

    // language=CSS
    const navStyles = `
      nav {
          
          
  ${
    burgerPx
      ? 'animation: 0.5s ease-in-out 0s 1 slideInFromTop;'
      : 'animation: 0.5s ease-in-out 0s 1 slideInFromLeft;'
  }
          
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px 20px;
  background-color: var(--nav-background-color);
  min-width: 140px;
  flex-wrap: wrap;

${
  !headerBar
    ? `

          @media (max-width: 600px) {
    & .text {
      display: none;
    }
    min-width: auto;
  }
        `
    : ''
}
        
  & button {
    width: 100%;
  }
  &.header-bar-mode {
    flex-direction: row;
    justify-content: center;
    background-color: transparent;
    & a {
      color: var(--default-text);
    }

    ${
      burgerPx
        ? `
        @media (max-width: ${burgerPx}px) {
        
        display: none; 
        
    align-items: center;

        flex-direction: column;
        position: absolute;
        background-color: var(--nav-background-color);
        
          top: 40px;
          left: 0;
/*
          border: 1px solid var(--minor-text);
*/
          border-radius: 1rem;
          &.burger-open {
            display: flex;
          }
        `
        : ``
    }
  }
}`;

    if (hostComponent.dataset.headerBar === 'true') {
      hostComponent.classList.add('header-bar-mode');
      hostComponent.parentElement.style.flexDirection = 'column';
    }

    // Update the count display and button markup together
    hostComponent.innerHTML = /* html */ `
        <style>
        ${navStyles}
      </style>
      <a data-nav href="/" title="Home">
        <span class="icon">&#x1F3E0;</span>
        <!-- Unicode for a house, similar to a home icon -->
        <span class="text">Home</span>
      </a>
      <a data-nav href="/button-badge" title="Button + Badges Design System">
        <span class="icon">&#x1F518;</span>
        <!-- Unicode for a pencil, similar to an edit or form icon -->
        <span class="text">Button + Badges</span>
      </a>
      <a data-nav href="/form" title="Form Design System">
        <span class="icon">&#x270F;</span>
        <!-- Unicode for a pencil, similar to an edit or form icon -->
        <span class="text">Form</span>
      </a>
      <a data-nav href="/maps" title="Map example">
        <span class="icon">&#x1F5FA;</span>
        <!-- Unicode for a pencil, similar to an edit or form icon -->
        <span class="text">Maps</span>
      </a>

      <a
        data-nav
        href="/users"
        title="DB retrival example (requires the deno backend to run - see readme (Optional Backend))">
        <span class="icon">👥</span>
        <span class="text">DB users</span>
      </a>
      <a data-nav href="/calendar" title="Calendar Example">
        <span class="icon"> 📆 </span>
        <span class="text"> Calendar</span>
      </a>
      <a
        data-nav
        href="/multiple-instances"
        title="Multiple instances of vanilla.js comoonets in action with shared state">
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
      </a>`;
    hostComponent.querySelectorAll('a').forEach((navLink) => {
      navLink.classList.add('button', 'secondary', 'squarify');
    });
    //add burger button to the parent if we are in header bar mode, use inline svg for icon
    if (headerBar === 'true' && burgerPx) {
      hostComponent.parentElement.insertAdjacentHTML(
        'afterbegin',
        `
        <button class="burger-button squarify  outline" >
        <svg class="icon" viewBox="0 0 100 80" width="20" height="20" fill="currentColor" >
          <rect width="100" height="20"></rect>
          <rect y="30" width="100" height="20"></rect>
          <rect y="60" width="100" height="20"></rect>
        </svg>
        </button>
        `,
      );
      hostComponent.parentElement.querySelector('.burger-button').addEventListener('click', () => {
        hostComponent.classList.toggle('burger-open');
      });
    }
  };

  // Display the initial count
  render();
};
