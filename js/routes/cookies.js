// /js/routes/cookies.js

export default (hostComponent) => {
  // If user has already set preferences, don't show the modal again.
  if (
    localStorage.getItem('analytics-cookies') !== null &&
    localStorage.getItem('personalization-cookies') !== null &&
    localStorage.getItem('advertisement-cookies') !== null
  ) {
    return;
  }

  const analyticsPreference = localStorage.getItem('analytics-cookies') === 'true';
  const personalizationPreference = localStorage.getItem('personalization-cookies') === 'true';
  const advertisementPreference = localStorage.getItem('advertisement-cookies') === 'true';

  // CSS for the modal
  const cookieModalStyles = `
<style>
    #nikos-modal-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
    }
    #nikos-modal-background.show {
        opacity: 1;
    }
    #nikos-modal {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 10px;
        background-color: var(--bg-color);
        border: 1px solid var(--border-color);
    }
    .preference {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 250px;
        margin-bottom: 1rem;
    }
    .switch {
        position: relative;
        display: inline-block;
        width: 60px;
        height: 34px;
    }
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        transition: 0.4s;
        border-radius: 34px;
    }
    .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        border-radius: 50%;
        transition: 0.4s;
    }
    input:checked + .slider {
        background-color: #2196F3;
    }
    input:checked + .slider:before {
        transform: translateX(26px);
    }
</style>
`;

  // HTML for the modal
  const cookieModalHTML = `
<div id="nikos-modal-background">
    <div id="nikos-modal" role="dialog" aria-labelledby="nikos-modal-label">
        <p id="nikos-modal-label">We use cookies to enhance your experience. Choose the cookies you allow:</p>
        <div class="preference">
            <span>Analytics</span>
            <label class="switch">
                <input type="checkbox" id="analytics-cookies" ${analyticsPreference ? 'checked' : ''}>
                <span class="slider"></span>
            </label>
        </div>
        <div class="preference">
            <span>Personalization</span>
            <label class="switch">
                <input type="checkbox" id="personalization-cookies" ${
                  personalizationPreference ? 'checked' : ''
                }>
                <span class="slider"></span>
            </label>
        </div>
        <div class="preference">
            <span>Advertisement</span>
            <label class="switch">
                <input type="checkbox" id="advertisement-cookies" ${advertisementPreference ? 'checked' : ''}>
                <span class="slider"></span>
            </label>
        </div>
        <button id="save-preferences">Save Preferences</button>
    </div>
</div>
`;

  // Append styles and HTML to the host component
  hostComponent.innerHTML = cookieModalStyles + cookieModalHTML;

  // Reference to the modal background for event listeners
  const modalBackground = hostComponent.querySelector('#nikos-modal-background');

  // Fade in animation
  setTimeout(() => {
    modalBackground.classList.add('show');
  }, 50);

  // Close modal when clicking outside of it
  modalBackground.addEventListener('click', (event) => {
    if (event.target === modalBackground) {
      fadeOutAndRemove();
    }
  });

  // Close modal when pressing 'Escape'
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      fadeOutAndRemove();
    }
  });

  // Handle saving preferences
  hostComponent.querySelector('#save-preferences').addEventListener('click', () => {
    localStorage.setItem('analytics-cookies', hostComponent.querySelector('#analytics-cookies').checked);
    localStorage.setItem(
      'personalization-cookies',
      hostComponent.querySelector('#personalization-cookies').checked
    );
    localStorage.setItem(
      'advertisement-cookies',
      hostComponent.querySelector('#advertisement-cookies').checked
    );

    fadeOutAndRemove();
  });

  // Fade out and remove the modal
  function fadeOutAndRemove() {
    modalBackground.classList.remove('show');
    setTimeout(() => {
      modalBackground.remove();
    }, 300);
  }
};
