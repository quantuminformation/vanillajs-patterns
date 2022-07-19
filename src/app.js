//component registry for the imported components
const componentRegistry = new Map();

/**
 * find components, and import their code dynamically and store in the componentRegistry
 */
const importComponentsToComponentRegistry = async () => {
  const components = document.querySelectorAll("[data-component]");

  const promises = Array.from(components).map(async (component) => {
    const componentName = component.getAttribute("data-component");
    const componentPath = `./components/${componentName}.js`;
    const module = await import(componentPath);

    componentRegistry.set(componentName, module);
  });

  await Promise.all(promises);
  // Look through the component registry and instantiate the components
    runImmediateComponents()
};

const runImmediateComponents =  () => {
  const components = document.querySelectorAll("[data-run-immediate]");
    components.forEach((component) => {
        const componentName = component.getAttribute("data-component");
        const module = componentRegistry.get(componentName);
        module.default(component);

    })
  debugger
};

importComponentsToComponentRegistry()