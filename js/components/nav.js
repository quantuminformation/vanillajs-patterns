//stored in /components/nav.js

/**
 * This component assumes a single parent wrapper alongside a main simpling for content so that it can change the flex direction of the parent
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
    if (hostComponent.dataset.headerBar === 'true') {
      hostComponent.style.display = 'none';
    }
    // Update the count display and button markup together
    hostComponent.innerHTML = `
        <a data-nav href="/" >
          <span class="icon">&#x1F3E0;</span>
          <!-- Unicode for a house, similar to a home icon -->
          <span class="text">Home</span>
        </a>
        <a data-nav href="/button-badge" >
          <span class="icon">&#x1F518;</span>
          <!-- Unicode for a pencil, similar to an edit or form icon -->
          <span class="text">Button + Badges</span>
        </a>
        <a data-nav href="/form" >
          <span class="icon">&#x270F;</span>
          <!-- Unicode for a pencil, similar to an edit or form icon -->
          <span class="text">Form</span>
        </a>
        <a data-nav href="/maps" >
          <span class="icon">&#x1F5FA;</span>
          <!-- Unicode for a pencil, similar to an edit or form icon -->
          <span class="text">Maps</span>
        </a>

        <a data-nav href="/users" >
          <span class="icon">👥</span>
          <span class="text">DB users</span>
        </a>
        <a data-nav href="/calendar" >
          <span class="icon"> 📆 </span>
          <span class="text"> Calendar</span>
        </a>
        <a data-nav href="/multiple-instances" >
          <span class="icon">🧬</span>
          <span class="text">Multiple instances</span>
        </a>
        <a data-nav href="/cookies" >
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
