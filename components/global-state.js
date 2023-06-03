export default (hostComponent) => {
  // Define the global state
  let globalState = {
    count: 0,
  };

  // Render
  const render = () => {
    hostComponent.innerHTML = `
      <h1>Global State</h1>
      <div>count: ${globalState.count}</div>
      <button id="increase-count">+</button>
      <button id="decrease-count">-</button>
    `;

    hostComponent
      .querySelector("#increase-count")
      .addEventListener("click", () => setCount(1));
    hostComponent
      .querySelector("#decrease-count")
      .addEventListener("click", () => setCount(-1));
  };

  const setCount = (changeAmount) => {
    globalState.count += changeAmount;
    render();
    hostComponent.dispatchEvent(
      new CustomEvent("globalStateCountUpdated", {
        bubbles: true,
        detail: globalState.count,
      })
    );
  };

  // Function to update the global state
  const incrementGlobalStateCount = (event) => {
    window.eventListenLog(
      event,
      hostComponent,
      "Received incrementGlobalStateCount"
    );
    setCount(1);
  };

  const decrementGlobalStateCount = (event) => {
    window.eventListenLog(
      event,
      hostComponent,
      "Received decrementGlobalStateCount"
    );
    setCount(-1);
  };

  document.addEventListener(
    "incrementGlobalStateCount",
    incrementGlobalStateCount
  );
  document.addEventListener(
    "decrementGlobalStateCount",
    decrementGlobalStateCount
  );

  render();
};
