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

    if (headerBar === 'true') {
      hostComponent.style.display = 'none';
    }

    // CSS styles for the navigation component

    // language=CSS
    const navStyles = `
      nav {
  animation: 0.5s ease-in-out 0s 1 slideInFromLeft;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px 20px;
  background-color: var(--sidenav-color);
  min-width: 140px;
  flex-wrap: wrap;


  & button {
    width: 100%;
  }
  &.header-bar-mode {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    & a {
      color: var(--default-text);
      justify-content: center;
      align-items: center;
    }
    
  }
          
         
        
          ${
            burgerPx
              ? `
        @media (max-width: ${burgerPx}px) {
          &.header-bar-mode {

        flex-direction: column;
        
        }
        }`
              : `
          @media (max-width: 600px) {
    & .text {
      display: none;
    }
    min-width: auto;
  }
        `
          }
}`;
    // Update the count display and button markup together
    hostComponent.innerHTML = `
        <style>${navStyles}</style>
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

        <a data-nav href="/users" title="DB retrival example (requires the deno backend to run - see readme (Optional Backend))">
          <span class="icon">👥</span>
          <span class="text">DB users</span>
        </a>
        <a data-nav href="/calendar" title="Calendar Example">
          <span class="icon"> 📆 </span>
          <span class="text"> Calendar</span>
        </a>
        <a data-nav href="/multiple-instances" title="Multiple instances of vanilla.js comoonets in action with shared state">
          <span class="icon">🧬</span>
          <span class="text">Multiple instances</span>
        </a>
        <a data-nav href="/cookies" title="Elementary cookie popup permissions thing">
          <span class="icon">🍪</span>
          <span class="text">Cookie popup</span>
        </a>`;

    //add classes button secondary squarify to all nav links
    hostComponent.querySelectorAll('a').forEach((navLink) => {
      navLink.classList.add('button', 'secondary', 'squarify');
    });
    if (hostComponent.dataset.headerBar === 'true') {
      hostComponent.classList.add('header-bar-mode');
      // todo find a better way to do this
      hostComponent.parentElement.style.flexDirection = 'column';

      //remove the icons to save horizontal space only if the flex container starts to run out of space

      hostComponent.querySelectorAll('.icon').forEach((icon) => {
        //  icon.style.display = 'none';
      });
    }
    // the only thing not in css to make visible after we change the parent
    hostComponent.style.display = 'flex';
  };

  // Display the initial count
  render();
};
