import { store, STORE_COUNT_UPDATED } from '../store.js';

export default (hostComponent) => {
  let localCount = 0;

  const incrementCount = () => {
    localCount += 1;
    render();
  };

  const decrementCount = () => {
    localCount -= 1;
    render();
  };

  const updateGlobalCountDisplay = () => {
    const globalCountDiv = hostComponent.querySelector('.global-count');
    if (globalCountDiv) {
      globalCountDiv.textContent = `Shared Count: ${store.getCount()}`;
    }
  };

  const render = () => {
    // Update the count display and button markup together
    hostComponent.innerHTML = `
      <div class="flex justify-between">
        Local Count: ${localCount}
        <div>
          <button id="increment">+</button>
          <button id="decrement">-</button>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="global-count">Global Count: ${store.getCount()}</div>
        <div>
          <button id="incrementGlobal">+ global</button>
          <button id="decrementGlobal">- global</button>
        </div>
      </div>
    `;

    // Re-attach event listeners after updating innerHTML
    hostComponent.querySelector('#increment').addEventListener('click', incrementCount);
    hostComponent.querySelector('#decrement').addEventListener('click', decrementCount);
    hostComponent.querySelector('#incrementGlobal').addEventListener('click', () => {
      store.setCount((count) => count + 1);
    });
    hostComponent.querySelector('#decrementGlobal').addEventListener('click', () => {
      store.setCount((count) => count - 1);
    });
  };

  // Listen for global state updates
  document.addEventListener(STORE_COUNT_UPDATED, (e) => {
    //   eventListenLog(e, hostComponent);
    updateGlobalCountDisplay();
  });

  // Display the initial count
  render();
};
