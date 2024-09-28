// js/components/copy.js

export default (hostComponent) => {
  let editMode = false;

  const handleCopy = () => {
    // Logic for handling the copy action
    console.log("Data copied!");
  };

  const renderButton = () => {
    hostComponent.innerHTML = `


              <button id="copy-email-btn" class="outline small-button">
            <span id="copy-text">Copy Email</span>
            <svg id="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M13 3H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-7-5zm0 2l5 5h-5V5zm-7 14V5h6v5h5v9H6z"/>
            </svg>
          </button>

    `;

    const copyButton = hostComponent.querySelector('#copy-button');
    copyButton.addEventListener('click', () => {
      if (editMode) {
        console.log("Copy cancelled");
      } else {
        handleCopy();
      }
      editMode = !editMode;
      renderButton();
    });
  };

  renderButton();
};
