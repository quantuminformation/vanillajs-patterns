// File: js/components/router.js

/**
 * Router Module
 * SPDX-License-Identifier: MIT
 *
 * This module provides client-side routing functionality. It supports both hash-based and history API navigation, with route
 * overrides available for custom paths.
 *
 * @module components/router
 * @version 0.1.2
 * @license MIT
 * @copyright Nikos Katsikanis LTD
 *
 * @param {HTMLElement} hostComponent - The root component where the router operates.
 *                                      Must include `data-component="router"` attribute.
 *                                      Optional `data-use-hash` enables hash-based routing.
 * @param {string} [baseUrl=config.BASE_URL] - Base URL used to resolve route paths.
 *
 * @example
 * // HTML Usage
 * <div data-component="router" data-use-hash="true"></div>
 *
 * // JavaScript Usage
 * import router from './components/router';
 * const routerElement = document.querySelector('[data-component="router"]');
 * router(routerElement);
 */

// Router CSS for flexible layout
const routerStyles = `
  [data-component='router'] {
    flex-grow: 1;
    flex-basis: 200px;
    flex-shrink: 1;
  }
`;

// Inject router-specific styles
const styleElement = document.createElement('style');
styleElement.textContent = routerStyles;
document.head.appendChild(styleElement);

import { importComponents, runComponents } from '../componentLoader.js';
import config from '../config.js';

export default async (hostComponent, baseUrl = config.BASE_URL) => {
  const useHash = 'useHash' in hostComponent.dataset;

  /**
   * @constant
   * @type {Object}
   * Object defining custom paths for specific routes.
   */
  const routePathsOverrides = {
    '/form': `${baseUrl}/routes/form.js`, // Example custom route override
  };

  /**
   * Dynamically loads a route based on the URL.
   *
   * @async
   * @function
   * @param {string} url - URL path to load the route.
   */
  /**
   * Loads a given route based on file-based location convention.
   *
   * @async
   * @function
   * @param {string} url - The route to load.
   */
  const loadRoute = async (url) => {
    try {
      // Directly map URL to route file path based on the file-based location convention
      const routePath =
        url === '/' || url === '' ? `${baseUrl}/routes/index.js` : `${baseUrl}/routes${url}.js`;

      const route = await import(/* @vite-ignore */ routePath);
      route.default(hostComponent);

      const components = hostComponent.querySelectorAll('[data-component]');
      await importComponents(components);
      runComponents(components);
    } catch (err) {
      console.error(`Failed to load route: ${url}`, err);
    }
  };
  // Handle click events for internal navigation
  document.addEventListener('click', async (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;

    const url = link.getAttribute('href');

    // Ignore links with file extensions or external links
    if (/\.\w+$/.test(url) || !url.startsWith('/')) return;

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

  // Initial load handling for hash vs. history routing
  if (useHash) {
    addEventListener('hashchange', async () => {
      const url = location.hash.substring(1);
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
