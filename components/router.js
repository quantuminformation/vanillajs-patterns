// Stored in /components/router.js

import { importComponents, runComponents } from '../componentLoader.js';

export default async (hostComponent) => {
  // This object defines the paths to your route files
  const routePaths = {
    '/': '/routes/index.js',
    '/form': '/routes/form.js',
    '/maps': '/routes/maps.js',
  };

  const loadRoute = async (url) => {
    try {
      // Check if the requested URL matches one of your routes
      const routePath = routePaths[url];
      if (!routePath) {
        throw new Error(`No route found for URL: ${url}`);
      }

      // Import the route file
      const route = await import(routePath);

      // Call the exported function with the hostComponent as the argument
      route.default(hostComponent);

      // Import and run any new components
      const components = hostComponent.querySelectorAll('[data-component]');
      await importComponents(components);
      runComponents(components);
    } catch (err) {
      console.error(`Failed to load route: ${url}`, err);
    }
  };

  // Intercept navigation events
  document.querySelectorAll('a[data-nav]').forEach((link) => {
    link.addEventListener('click', async (event) => {
      event.preventDefault();
      const url = event.currentTarget.getAttribute('href');
      history.pushState(null, null, url);
      await loadRoute(url);
    });
  });

  // Listen for popstate events
  addEventListener('popstate', async () => {
    await loadRoute(location.pathname);
  });

  // Load the initial route
  await loadRoute(location.pathname);
};
