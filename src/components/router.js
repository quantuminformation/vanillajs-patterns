// take a list of routes and switch them based on the URL

/**
 * @param {Array} routes
 * @param routes
 */
export default (hostComponent) => {
  const url = window.location.pathname;
  for (let i = 0; i < routes.length; i++) {
    if (routes[i].path === url) {
      routes[i].handler();
    }
  }
};
const route = (hostComponent, path, handler) => {
  const initialContent = hostComponent.innerHTML;
};
