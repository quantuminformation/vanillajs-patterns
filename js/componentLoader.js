// js/componentLoader.js
// looks for components like this: <div data-component="user-form"></div>
// and executes the default export of the corresponding file

let componentRegistry = new Map();

export const importComponents = async (components) => {
  const importedComponents = new Map();

  const componentsToImport = Array.from(components).filter((component) => {
    const componentName = component.getAttribute('data-component');
    if (componentRegistry.has(componentName)) {
      console.log(`Component ${componentName} is already imported.`);
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

export const runComponents = async (components) => {
  for (const component of components) {
    const componentName = component.getAttribute('data-component');
    console.log(`Running component ${componentName}`);
    const module = componentRegistry.get(componentName);

    // Import the component if it hasn't been imported yet
    if (!module) {
      await importComponents([component]);
    }

    const loadedModule = componentRegistry.get(componentName);
    if (loadedModule && typeof loadedModule.default === 'function') {
      loadedModule.default(component);

      // After running the current component, check for new nested components
      const nestedComponents = component.querySelectorAll('[data-component]');
      if (nestedComponents.length > 0) {
        console.log(`Running nested components inside ${componentName}`);
        await runComponents(nestedComponents);
      }
    } else {
      console.error(`Component ${componentName} does not have a default export that is a function.`);
    }
  }
};

const getAllComponents = () => {
  const components = document.querySelectorAll('[data-component]');
  return Array.from(components);
};

// Wrap the top-level async operation in an immediately-invoked function expression
(async () => {
  const components = getAllComponents();
  await importComponents(components);
  await runComponents(components);
})();
