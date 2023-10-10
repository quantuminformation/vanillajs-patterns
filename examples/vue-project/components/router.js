// Stored in components/router.js

import { importComponents, runComponents } from '../componentLoader.js'
import config from '../config.js'

export default async (hostComponent) => {
  const useHash = hostComponent.hasAttribute('use-hash')

  // This object defines the paths to your route files
  const routePathsOverrides = {
    '/form': `${config.BASE_URL}/routes/form.js` //example of overriding the path
  }

  const loadRoute = async (url) => {
    try {
      // Check if the requested URL matches one of your routes
      let routePath = routePathsOverrides[url]
      if (!routePath) {
        // If the URL is '/', use '/index.js', otherwise use `/routes${url}.js`
        routePath =
          url === '/' ? `${config.BASE_URL}/routes/index.js` : `${config.BASE_URL}/routes${url}.js`
      }

      // Import the route file

      const route = await import(/* @vite-ignore */ routePath)

      // Call the exported function with the hostComponent as the argument
      route.default(hostComponent)

      // Import and run any new components
      const components = hostComponent.querySelectorAll('[data-component]')
      await importComponents(components)
      runComponents(components)
    } catch (err) {
      console.error(`Failed to load route: ${url}`, err)
    }
  }

  // Intercept navigation events
  document.querySelectorAll('a[data-nav]').forEach((link) => {
    link.addEventListener('click', async (event) => {
      event.preventDefault()
      const url = event.currentTarget.getAttribute('href')

      if (useHash) {
        // Ensure there's a trailing slash in the pathname
        const baseURL = window.location.pathname.endsWith('/')
          ? window.location.origin + window.location.pathname
          : window.location.origin + window.location.pathname + '/'
        // Construct the hash-based URL
        location.href = `${baseURL}#${url}`
      } else {
        history.pushState(null, null, url)
        await loadRoute(url)
      }
    })
  })
  // Listen for popstate events
  addEventListener('popstate', async () => {
    if (!useHash) {
      await loadRoute(location.pathname)
    }
  })

  // Listen for hashchange events
  if (useHash) {
    addEventListener('hashchange', async () => {
      const url = location.hash.substring(1) // Get the URL from the hash, remove the leading '#'
      await loadRoute(url)
    })
    // Load the initial route from the hash
    if (location.hash) {
      await loadRoute(location.hash.substring(1))
    } else {
      await loadRoute('/')
    }
  } else {
    // Load the initial route
    await loadRoute(location.pathname)
  }
}
