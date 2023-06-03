export default (hostComponent) => {
  let count = 0;
  let globalCountReceived = undefined;

  const incrementCount = () => {
    count += 1;
    render();
  };

  const decrementCount = () => {
    count -= 1;
    render();
  };

  const updateGlobalCountDisplay = () => {
    const globalCountDiv = hostComponent.querySelector(".global-count");
    if (globalCountDiv) {
      globalCountDiv.textContent = `Shared Count: ${globalCountReceived}`;
    }
  };

  const render = () => {
    // Update the count display and button markup together
    hostComponent.innerHTML = `
      <div class="flex justify-between">
        Local Count: ${count}
        <div>
          <button id="increment">+</button>
          <button id="decrement">-</button>
        </div>
      </div>
      <div class="flex justify-between">
        <div class="global-count">Shared Count: ${globalCountReceived}</div>
        <div>
          <button id="incrementGlobal">+ global</button>
          <button id="decrementGlobal">- global</button>
        </div>
      </div>
    `;

    // Re-attach event listeners after updating innerHTML
    hostComponent
      .querySelector("#increment")
      .addEventListener("click", incrementCount);
    hostComponent
      .querySelector("#decrement")
      .addEventListener("click", decrementCount);
    hostComponent
      .querySelector("#incrementGlobal")
      .addEventListener("click", () => {
        hostComponent.dispatchEvent(
          new CustomEvent(window.INCREMENT_SHARED_STATE_COUNT, {
            bubbles: true,
          })
        );
      });
    hostComponent
      .querySelector("#decrementGlobal")
      .addEventListener("click", () => {
        hostComponent.dispatchEvent(
          new CustomEvent(window.DECREMENT_SHARED_STATE_COUNT, {
            bubbles: true,
          })
        );
      });
  };

  // Listen for global state updates
  document.addEventListener(window.SHARED_STATE_COUNT_UPDATED, (e) => {
    window.eventListenLog(e, hostComponent);
    const { detail } = e;
    globalCountReceived = detail;
    updateGlobalCountDisplay();
  });

  // Display the initial count
  render();
};
