// take a list of routes and switch them based on the URL

/**
 * atm we use hash routing for simplicity
 * @param {Array} routes
 * @param routes
 */
export default (hostComponent) => {
  // get routes from the host component
  const routes = Array.from(
    hostComponent.querySelectorAll("[data-component='route']")
  );

  // find the route that matches the url
  const route = findHashUrlRoute(routes);
  // if no route matches the url, return
  if (!route) return;
  displayRoute(route);

  //add hash listener to the host component
  hostComponent.addEventListener("hashchange", () => {
    route.dataset.active = "false";
    //hide the old route
    route.style.display = "none";
  });
};
const route = (hostComponent, path, handler) => {
  const initialContent = hostComponent.innerHTML;
};

//display the route content
const displayRoute = (route) => {
  //mark found route as active
  route.dataset.active = "true";
  //enable the active route to be visible
  route.style.display = "initial";
};

//find the active route
const findHashUrlRoute = (routes) => {
  const url = window.location.hash.split("#")[1];

  return routes.find((route) => route.getAttribute("data-path") === url);
};
