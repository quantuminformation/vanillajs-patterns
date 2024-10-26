/**
 * Router module for handling client-side routing.
 * @module components/router
 * @version 0.1.2
 */

import { importComponents, runComponents } from '../componentLoader.js';
import config from '../config.js';

/**
 * Main router function that initializes the routing based on hostComponent's attributes.
 *
 * @async
 * @function
 * @param {HTMLElement} hostComponent - The main component on which the router operates.
 */
export default async (hostComponent) => {
  const useHash = 'useHash' in hostComponent.dataset;

  /**
   * @constant
   * @type {Object}
   * This object defines the paths to your route files.
   */
  const routePathsOverrides = {
    '/form': `${config.BASE_URL}/routes/form.js`, // example of overriding the path
  };

  /**
   * Loads a given route.
   *
   * @async
   * @function
   * @param {string} url - The route to load.
   */
  const loadRoute = async (url) => {
    try {
      let routePath = routePathsOverrides[url];
      if (!routePath) {
        routePath =
          url === '/' || url === ''
            ? `${config.BASE_URL}/routes/index.js`
            : `${config.BASE_URL}/routes${url}.js`;
      }

      const route = await import(/* @vite-ignore */ routePath);
      route.default(hostComponent);

      const components = hostComponent.querySelectorAll('[data-component]');
      await importComponents(components);
      runComponents(components);
    } catch (err) {
      console.error(`Failed to load route: ${url}`, err);
    }
  };

  // Global click event listener to handle all internal links
  document.addEventListener('click', async (event) => {
    const link = event.target.closest('a[href]');

    if (!link) return; // Ignore clicks outside links

    const url = link.getAttribute('href');

    // Ignore links with file extensions or external links
    if (/\.\w+$/.test(url) || link.origin !== window.location.origin) return;

    event.preventDefault();

    if (useHash) {
      const baseURL = window.location.pathname.endsWith('/')
        ? window.location.origin + window.location.pathname
        : window.location.origin + window.location.pathname + '/';
      location.href = `${baseURL}#${url}`;
    } else {
      history.pushState(null, null, url);
      await loadRoute(url);
    }
  });

  // Handle browser back/forward navigation
  addEventListener('popstate', async () => {
    if (!useHash) {
      await loadRoute(location.pathname);
    }
  });

  // Handle initial load based on useHash
  if (useHash) {
    addEventListener('hashchange', async () => {
      const url = location.hash.substring(1); // Get the URL from the hash, remove the leading '#'
      await loadRoute(url);
    });

    if (location.hash) {
      await loadRoute(location.hash.substring(1));
    } else {
      await loadRoute('/');
    }
  } else {
    await loadRoute(location.pathname);
  }
};
