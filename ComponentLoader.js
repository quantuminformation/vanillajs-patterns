let componentRegistry = new Map();

/**
 * find components, and import their code dynamically and store in the componentRegistry
 */
const importComponents = async (components) => {
  const importedComponents = new Map();
  const importingComponentRegistry = new Map();

  const promises = components.map(async (component) => {
    const componentName = component.getAttribute("data-component");
    const componentPath = `./components/${componentName}.js`;
    const module = await import(componentPath);

    importingComponentRegistry.set(componentName, module);
  });

  await Promise.all(promises);
  return importingComponentRegistry;
};

const runComponents = (components) => {
  components.forEach((component) => {
    const componentName = component.getAttribute("data-component");
    const module = componentRegistry.get(componentName);
    module.default(component);
  });
};

const getAllComponents = () => {
  const components = document.querySelectorAll("[data-component]");
  return Array.from(components);
};

debugger;
const components = getAllComponents();
componentRegistry = await importComponents(components);
runComponents(components);
