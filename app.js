const eventHandlers = {};

const EVENTS = [];

function addEvent(eventName) {
  return new Promise((resolve) => {
    const handler = (event) => {
      console.log(event.detail.message);
      resolve();
    };

    document.addEventListener(eventName, handler);
    eventHandlers[eventName] = handler;
  });
}

function removeEvent(eventName) {
  const handler = eventHandlers[eventName];
  if (handler) {
    document.removeEventListener(eventName, handler);
  }
}

export const initializeListeners = async () => {
  // remove existing listeners
  EVENTS.forEach((eventName) => removeEvent(eventName));

  // create a new promise for each event
  const promises = EVENTS.map((eventName) => addEvent(eventName));

  // wait for all promises to resolve
  await Promise.all(promises);
  console.log('All components have loaded!');

  // Fetch connection anchors from all components
  const targetAnchors = Array.from(document.querySelectorAll('[data-component="target"] .connection-anchor'));
  const investorAnchors = Array.from(
    document.querySelectorAll('[data-component="investor-data"] .connection-anchor')
  );
  const mandatesAnchors = Array.from(
    document.querySelectorAll('[data-component="mandates"] .connection-anchor')
  );
  const targetMandatesAnchors = Array.from(
    document.querySelectorAll('[data-component="target-mandates"] .connection-anchor')
  );
};

async () => {
  window.initializeListeners();
  // node is the actual DOM node, you can interact with it directly
  const components = window.getAllComponents(node);
  window.importComponents(components).then(() => {
    window.runComponents(components);
  });
};
