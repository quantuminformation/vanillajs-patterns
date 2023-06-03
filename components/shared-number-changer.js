export default (hostComponent) => {
  // Define the global state
  let globalState = {
    count: 0,
  };

  // Render
  const render = () => {
    hostComponent.innerHTML = `
      <h1>Shared</h1>
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
      new CustomEvent(window.SHARED_STATE_COUNT_UPDATED, {
        bubbles: true,
        detail: globalState.count,
      })
    );
  };

  document.addEventListener(window.INCREMENT_SHARED_STATE_COUNT, (e) => {
    window.eventListenLog(e, hostComponent);
    setCount(1);
  });
  document.addEventListener(window.DECREMENT_SHARED_STATE_COUNT, (e) => {
    window.eventListenLog(e, hostComponent);
    setCount(-1);
  });

  render();
};
