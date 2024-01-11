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

  // CSS for the modal (Instagram Style)
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
        padding: 1rem 2rem;
        width: 90%; 
        max-width: 400px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 10px;
        background-color: var(--bg-color);
        border: 1px solid var(--border-color);
    }
    #nikos-modal-label {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 1rem;
    }
    .preference {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        margin-bottom: 1rem;
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
            <input type="checkbox" id="analytics-cookies" ${analyticsPreference ? 'checked' : ''}>
        </div>
        <div class="preference">
            <span>Personalization</span>
            <input type="checkbox" id="personalization-cookies" ${personalizationPreference ? 'checked' : ''}>
        </div>
        <div class="preference">
            <span>Advertisement</span>
            <input type="checkbox" id="advertisement-cookies" ${advertisementPreference ? 'checked' : ''}>
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
      hostComponent.querySelector('#personalization-cookies').checked,
    );
    localStorage.setItem(
      'advertisement-cookies',
      hostComponent.querySelector('#advertisement-cookies').checked,
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
