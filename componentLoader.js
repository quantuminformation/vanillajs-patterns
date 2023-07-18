// Stored in /componentLoader.js

let componentRegistry = new Map();

export const importComponents = async (components) => {
  const importedComponents = new Map();

  // Only consider components that have not been imported yet
  const componentsToImport = Array.from(components).filter((component) => {
    const componentName = component.getAttribute('data-component');
    if (componentRegistry.has(componentName)) {
      console.log(`Component ${componentName} is already imported, so it's ignored`);
      return false;
    }
    return true;
  });

  const promises = componentsToImport.map(async (component) => {
    const componentName = component.getAttribute('data-component');
    const componentPath = `./components/${componentName}.js`;
    console.log(`Importing component ${componentName} from ${componentPath}`);
    try {
      const module = await import(componentPath);
      importedComponents.set(componentName, module);
      console.log(`Successfully imported component ${componentName}`);
    } catch (err) {
      console.error(`Failed to load component ${componentName}:`, err);
    }
  });

  await Promise.all(promises);

  // Merge imported components into componentRegistry
  componentRegistry = new Map([...componentRegistry, ...importedComponents]);

  return importedComponents;
};

export const runComponents = (components) => {
  components.forEach((component) => {
    const componentName = component.getAttribute('data-component');
    console.log(`Running component ${componentName}`);
    const module = componentRegistry.get(componentName);
    if (module && typeof module.default === 'function') {
      module.default(component);
    } else {
      console.error(`Component ${componentName} does not have a default export that is a function.`);
    }
  });
};

const getAllComponents = () => {
  const components = document.querySelectorAll('[data-component]');
  return Array.from(components);
};

// Wrap the top-level async operation in an immediately-invoked function expression
(async () => {
  const components = getAllComponents();
  await importComponents(components);
  runComponents(components);
})();
