//stored in /components/nav.js

/**
 * This component assumes a single parent wrapper alongside a main simpling for content so that it can change the flex direction of the parent
 * @param hostComponent
 */
export default (hostComponent) => {
  const render = (isHeaderBarMode = false) => {
    // dont display the nav if we are in header bar mode and modify the parent flex direction
    if (hostComponent.dataset.headerBar === 'true') {
      hostComponent.style.display = 'none';
    }
    // Update the count display and button markup together
    hostComponent.innerHTML = `
        <a data-nav href="/" class="button secondary squarify">
          <span class="icon">&#x1F3E0;</span>
          <!-- Unicode for a house, similar to a home icon -->
          <span class="text">Home</span>
        </a>
        <a data-nav href="/button-badge" class="button secondary squarify">
          <span class="icon">&#x1F518;</span>
          <!-- Unicode for a pencil, similar to an edit or form icon -->
          <span class="text">Button + Badges</span>
        </a>
        <a data-nav href="/form" class="button secondary squarify">
          <span class="icon">&#x270F;</span>
          <!-- Unicode for a pencil, similar to an edit or form icon -->
          <span class="text">Form</span>
        </a>
        <a data-nav href="/maps" class="button secondary squarify">
          <span class="icon">&#x1F5FA;</span>
          <!-- Unicode for a pencil, similar to an edit or form icon -->
          <span class="text">Maps</span>
        </a>

        <a data-nav href="/users" class="button secondary squarify">
          <span class="icon">👥</span>
          <span class="text">DB users</span>
        </a>
        <a data-nav href="/calendar" class="button secondary squarify">
          <span class="icon"> 📆 </span>
          <span class="text"> Calendar</span>
        </a>
        <a data-nav href="/multiple-instances" class="button secondary squarify">
          <span class="icon">🧬</span>
          <span class="text">Multiple instances</span>
        </a>
        <a data-nav href="/cookies" class="button secondary squarify">
          <span class="icon">🍪</span>
          <span class="text">Cookie popup</span>
        </a>`;
    if (hostComponent.dataset.headerBar === 'true') {
      hostComponent.classList.add('header-bar-mode');
      // todo find a better way to do this
      hostComponent.parentElement.style.flexDirection = 'column';
      // now that we have modified the parent, we can display the nav
      hostComponent.style.display = 'flex';
    }
  };

  // Display the initial count
  render();
};
