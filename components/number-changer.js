export default (hostComponent) => {
  let count = 0;

  const incrementCount = () => {
    count += 1;
    displayCount();
  };

  const decrementCount = () => {
    count -= 1;
    displayCount();
  };

  const displayCount = () => {
    // Update the count display and button markup together
    //webstorm html es6 template

    // language=HTML
    hostComponent.innerHTML = `
      Count: ${count}
      <div>
      <button id="increment">+</button>
      <button id="decrement">-</button>
      </div>
    `;

    // Re-attach event listeners after updating innerHTML
    hostComponent
      .querySelector("#increment")
      .addEventListener("click", incrementCount);
    hostComponent
      .querySelector("#decrement")
      .addEventListener("click", decrementCount);
  };

  // Add custom event listener on body
  document.body.addEventListener("increment", incrementCount);

  // Display the initial count
  displayCount();
};
