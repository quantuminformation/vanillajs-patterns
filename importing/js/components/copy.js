// js/components/copy.js

export default (hostComponent, immediateUpdate = false) => {
  const renderButton = () => {
    // Ensure the hostComponent is a <button> element
    if (hostComponent.tagName.toLowerCase() !== 'button') {
      throw new Error('The outer component must be a <button> element for the copy component to work.');
    }

    // Read data attributes for dynamic content
    const textToCopy = hostComponent.getAttribute('data-text-to-copy') || 'default@example.com';
    const initialText = hostComponent.getAttribute('data-initial-text') || 'Copy';
    const successText = hostComponent.getAttribute('data-success-text') || 'Copied!';

    // Set the initial button text and icon
    hostComponent.innerHTML = `
      <span id="copy-text">${initialText}</span>
      <svg id="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0z" fill="none"/>
        <path d="M13 3H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-7-5zm0 2l5 5h-5V5zm-7 14V5h6v5h5v9H6z"/>
      </svg>
    `;

    const copyTextElement = hostComponent.querySelector('#copy-text');
    const copyIcon = hostComponent.querySelector('#copy-icon');

    // Function to copy text to clipboard
    const handleCopy = (copyText) => {
      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          console.log('Data copied:', copyText);
        })
        .catch((err) => {
          console.error('Failed to copy:', err);
        });
    };

    // Function to update the button text and icon
    const updateButton = () => {
      copyTextElement.textContent = successText;
      copyIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0z" fill="none"/>
          <path d="M9 16.17L4.83 12 3.41 13.41l5.59 5.59 12-12L19.17 5l-10 10z"/>
        </svg>
      `;
    };

    hostComponent.addEventListener('click', () => {
      const copyText = hostComponent.getAttribute('data-text-to-copy');

      if (copyText) {
        // Handle clipboard copy
        handleCopy(copyText);

        if (immediateUpdate) {
          updateButton(); // Immediately update button when in test mode
        } else {
          // Delay updating the button text and icon for 2 seconds
          setTimeout(updateButton, 2000);
        }
      }
    });
  };

  renderButton();
};
