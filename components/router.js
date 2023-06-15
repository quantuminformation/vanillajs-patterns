export default (hostComponent) => {
    const loadRoute = async (url) => {
        try {
            const response = await fetch(url);
            const pageHTML = await response.text();
            const newPage = new DOMParser().parseFromString(pageHTML, "text/html");

            // Replace the hostComponent's inner HTML with the new page's body HTML
            hostComponent.innerHTML = newPage.body.innerHTML;

            // Import and run any new components
            const components = hostComponent.querySelectorAll("[data-component]");
            window.importComponents(components);
        } catch (err) {
            console.error(`Failed to load route: ${url}`, err);
        }
    };

    // Intercept navigation events
    document.body.addEventListener("click", (event) => {
        if (event.target.matches("a[data-nav]")) {
            event.preventDefault();
            const url = event.target.getAttribute("href");
            window.history.pushState(null, null, url);
            loadRoute(url);
        }
    });

    // Listen for popstate events
    window.addEventListener("popstate", () => {
        loadRoute(window.location.pathname);
    });

    // Load the initial route
    loadRoute(
        window.location.pathname === "/" ? "pages/index" : window.location.pathname
    );
};
