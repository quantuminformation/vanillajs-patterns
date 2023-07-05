// stored in /components/router.js

import { importComponents, runComponents } from '../componentLoader.js';

export default async (hostComponent) => {
  const loadRoute = async (url) => {
    try {
      const response = await fetch(`${url}?newRoute=true`);
      const pageHTML = await response.text();

      const newPage = new DOMParser().parseFromString(pageHTML, 'text/html');

      // Replace the hostComponent's inner HTML with the new page's body HTML
      hostComponent.innerHTML = newPage.body.innerHTML;

      // Import and run any new components
      const components = hostComponent.querySelectorAll('[data-component]');
      await importComponents(components);
      runComponents(components);
    } catch (err) {
      console.error(`Failed to load route: ${url}`, err);
    }
  };

  // Intercept navigation events
  document.body.addEventListener('click', async (event) => {
    if (event.target.matches('a[data-nav]')) {
      event.preventDefault();
      const url = event.target.getAttribute('href');
      history.pushState(null, null, url);
      await loadRoute(url);
    }
  });

  // Listen for popstate events
  addEventListener('popstate', async () => {
    await loadRoute(location.pathname);
  });

  // Load the initial route
  //loadRoute(location.pathname === "/" ? "/pages/index" : location.pathname);
  await loadRoute('/pages/index.html');
};
