/**
 * Router module for handling client-side routing.
 * @module components/router
 * @version 0.1.0
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
  const useHash = hostComponent.hasAttribute('use-hash');

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
        routePath = url === '/' ? `${config.BASE_URL}/routes/index.js` : `${config.BASE_URL}/routes${url}.js`;
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

  document.querySelectorAll('a[data-nav]').forEach((link) => {
    link.addEventListener('click', async (event) => {
      event.preventDefault();
      const url = event.currentTarget.getAttribute('href');

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
  });

  addEventListener('popstate', async () => {
    if (!useHash) {
      await loadRoute(location.pathname);
    }
  });

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
