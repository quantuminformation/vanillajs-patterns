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
    //dispatchEvent
    hostComponent.dispatchEvent(
      new CustomEvent("globalStateCountUpdated", {
        bubbles: true,
        detail: globalState.count,
      })
    );
  };
  // Function to update the global state
  const incrementGlobalStateCount = (event) => {
    // Update the global state based on the event
    setCount(1);
    render();
  };
  const decrementGlobalStateCount = (event) => {
    // Update the global state based on the event
    setCount(-1);
    render();
  };

  // Event listener function
  const handleEvent = (event) => {
    // Call the updateGlobalState function to update the global state
    updateGlobalState(event);
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
