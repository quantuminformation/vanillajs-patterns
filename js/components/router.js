// File: js/components/router.js
// Repository: https://github.com/quantuminformation/vanillajs-patterns

/**
 * Router Module
 * SPDX-License-Identifier: MIT
 *
 * This module provides client-side routing functionality. It supports both hash-based and history API navigation.
 * Links are listened to for internal navigation, and the active link is highlighted based on the current route.
 *
 * @module components/router
 * @version 0.1.3
 * @copyright Nikos Katsikanis
 * @license MIT
 * @param {HTMLElement} hostComponent - The main component where the router operates.
 *                                      Must include `data-component="router"` attribute.
 *                                      Optional `data-use-hash` enables hash-based routing.
 * @param {string} [baseUrl=config.BASE_URL] - Base URL for resolving route paths.
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

import { importComponents, runComponents } from '../componentLoader.js';
import config from '../config.js';

export default async (hostComponent, baseUrl = config.BASE_URL) => {
  const useHash = 'useHash' in hostComponent.dataset;

  /**
   * Loads a given route based on file-based location convention.
   *
   * @async
   * @function
   * @param {string} url - The route path to load.
   */
  const loadRoute = async (url) => {
    try {
      const routePath =
          url === '/' || url === '' ? `${baseUrl}/routes/index.js` : `${baseUrl}/routes${url}.js`;

      const route = await import(/* @vite-ignore */ routePath);
      route.default(hostComponent);

      const components = hostComponent.querySelectorAll('[data-component]');
      await importComponents(components);
      runComponents(components);

      updateActiveLink(url); // Update active link based on the route
    } catch (err) {
      console.error(`Failed to load route: ${url}`, err);
    }
  };

  /**
   * Updates the active link by adding the 'active' class to the link matching the current route.
   * @param {string} currentPath - The path to set as active.
   */
  const updateActiveLink = (currentPath) => {
    document.querySelectorAll('a[href]').forEach((link) => {
      const linkPath = link.getAttribute('href');
      link.classList.toggle('active', linkPath === currentPath);
    });
  };

  // Listen for click events on internal navigation links
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

  // Handle browser back/forward navigation for history mode
  window.addEventListener('popstate', async () => {
    if (!useHash) {
      await loadRoute(location.pathname);
    }
  });

  // Initial load handling for hash vs. history routing
  if (useHash) {
    window.addEventListener('hashchange', async () => {
      const url = location.hash.substring(1); // Get the path from the hash, excluding '#'
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
