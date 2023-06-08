let componentRegistry = new Map();

const importComponents = async (components) => {
  const importedComponents = new Map();

  const promises = components.map(async (component) => {
    const componentName = component.getAttribute("data-component");
    const componentPath = `./components/${componentName}.js`;
    try {
      const module = await import(componentPath);
      importedComponents.set(componentName, module);
    } catch (err) {
      console.error(`Failed to load component ${componentName}:`, err);
    }
  });

  await Promise.all(promises);
  return importedComponents;
};

const runComponents = (components) => {
  components.forEach((component) => {
    const componentName = component.getAttribute("data-component");
    const module = componentRegistry.get(componentName);
    if (module && typeof module.default === 'function') {
      module.default(component);
    } else {
      console.error(`Component ${componentName} does not have a default export that is a function.`);
    }
  });
};

const getAllComponents = () => {
  const components = document.querySelectorAll("[data-component]");
  return Array.from(components);
};

// Wrap the top-level async operation in an immediately-invoked function expression
(async () => {
  const components = getAllComponents();
  componentRegistry = await importComponents(components);
  runComponents(components);
})();
