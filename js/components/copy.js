// js/components/copy.js

export default (hostComponent) => {
  const renderButton = () => {
    // Read data attributes for dynamic content
    const textToCopy = hostComponent.getAttribute('data-text-to-copy') || 'default@example.com';
    const initialText = hostComponent.getAttribute('data-initial-text') || 'Copy';
    const successText = hostComponent.getAttribute('data-success-text') || 'Copied!';

    // Create the button HTML with dynamic values
    hostComponent.innerHTML = `
      <button id="copy-btn" class="outline small-button" data-copytext="${textToCopy}">
        <span id="copy-text">${initialText}</span>
        <svg id="copy-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path d="M13 3H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-7-5zm0 2l5 5h-5V5zm-7 14V5h6v5h5v9H6z"/>
        </svg>
      </button>
    `;

    const copyButton = hostComponent.querySelector('#copy-btn');
    const copyTextElement = copyButton.querySelector('#copy-text');
    const copyIcon = copyButton.querySelector('#copy-icon');

    // Function to copy text to clipboard
    const handleCopy = (copyText) => {
      navigator.clipboard.writeText(copyText)
          .then(() => {
            console.log("Data copied:", copyText);
          })
          .catch((err) => {
            console.error("Failed to copy:", err);
          });
    };

    copyButton.addEventListener('click', () => {
      const copyText = copyButton.getAttribute('data-copytext');

      if (copyText) {
        // Handle clipboard copy
        handleCopy(copyText);

        // Temporarily change the button text and icon
        copyTextElement.textContent = successText;

        // Change icon to a tick (✔️)
        copyIcon.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16.17L4.83 12 3.41 13.41l5.59 5.59 12-12L19.17 5l-10 10z"/>
          </svg>
        `;

        // Temporarily add the "success" class for visual feedback
        copyButton.classList.add('success');

        // Revert the text, icon, and class after 2 seconds
        setTimeout(() => {
          copyTextElement.textContent = initialText; // Reset to initial text
          copyIcon.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M13 3H6c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-7-5zm0 2l5 5h-5V5zm-7 14V5h6v5h5v9H6z"/>
            </svg>
          `;
          copyButton.classList.remove('success'); // Remove the success class
        }, 2000); // Reset after 2 seconds
      }
    });
  };

  renderButton();
};
