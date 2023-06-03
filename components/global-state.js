export default (hostComponent) => {
  // Define the global state
  let globalState = {
    count: 0,
  };

  //render
  const render = () => {
    hostComponent.innerHTML = `<h1>
        Global State
</h1><div>count:${globalState.count}</div>`;
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
