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

  const render = () => {
    // Update the count display and button markup together
    //webstorm html es6 template

    // language=HTML
    hostComponent.innerHTML = `
      <div class="flex justify-between">
      Local Count: ${count}
      <div>
      <button id="increment">+</button>
      <button id="decrement">-</button>
      </div>
      </div>
      <div class="flex justify-between">
      Global Count: ${globalCountReceived}
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
          new CustomEvent("incrementGlobalStateCount", { bubbles: true })
        );
      });
    hostComponent
      .querySelector("#decrementGlobal")
      .addEventListener("click", () => {
        hostComponent.dispatchEvent(
          new CustomEvent("decrementGlobalStateCount", { bubbles: true })
        );
      });
    document.addEventListener("globalStateCountUpdated", (e) => {
      const { detail } = e;
      globalCountReceived = detail;
      render();
    });
  };

  // Display the initial count
  render();
};
