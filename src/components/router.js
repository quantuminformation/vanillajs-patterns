// take a list of routes and switch them based on the URL

/**
 * atm we use hash routing for simplicity
 * @param {Array} routes
 * @param routes
 */
export default (hostComponent) => {
  // get html routes from the host component and the store
  const htmlRoutes = Array.from(
    hostComponent.querySelectorAll("[data-component='route']")
  );

  //add hash listener to the host component
  window.addEventListener("hashchange", () => {
    displayMatchingRoute();
  });

  const findHashUrlRoute = (routes) => {
    let url = window.location.hash.split("#")[1];
    if (!url) {
      url = "";
    }

    return routes.find((route) => route.getAttribute("data-path") === url);
  };

  const displayMatchingRoute = async () => {
    const newActiveRoute = findHashUrlRoute(htmlRoutes);

    // get the current active route from the dom and hide it
    const activeRoute = hostComponent.querySelector("[data-active='true']");
    if (activeRoute) {
      activeRoute.dataset.active = "false";
      //hide the old route
      activeRoute.style.display = "none";
    }
    newActiveRoute.dataset.active = "true";

    //tell the active route to be visible
    //import the new route html template if loaded for first time
    const templatePath = `${newActiveRoute.dataset.template}`;
    const module = await import(templatePath);
    newActiveRoute.innerHTML = module.template;
    newActiveRoute.style.display = "initial";
  };

  //first pass to display the first route
  displayMatchingRoute();
};
