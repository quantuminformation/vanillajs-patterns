// js/components/toggle-switch.js

export default (hostComponent) => {
  const render = () => {
    hostComponent.innerHTML = `
      <label class="switch">
        <input type="checkbox" id="toggle">
        <span class="slider round"></span>
      </label>
    `;

    const toggleInput = hostComponent.querySelector('#toggle');
    toggleInput.addEventListener('change', () => {
      const isChecked = toggleInput.checked;
      console.log('Toggle status:', isChecked);
    });
  };

  // Initial render
  render();
};
