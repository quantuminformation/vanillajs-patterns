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

  // Function to update the global state
  const incrementGlobalStateCount = (event) => {
    // Update the global state based on the event
    debugger
    globalState.count += 1;
    console.log("Global state count:", globalState.count);
    render();
  };

  // Event listener function
  const handleEvent = (event) => {
    // Call the updateGlobalState function to update the global state
    updateGlobalState(event);
  };

  // Add event listener to the host component
  document.addEventListener(
    "incrementGlobalStateCount",
    incrementGlobalStateCount
  );
  document.addEventListener("decrementGlobalStateCount", handleEvent);
  render();
};
