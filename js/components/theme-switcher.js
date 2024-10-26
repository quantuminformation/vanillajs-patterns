export default (hostComponent) => {
  const themes = ['green', 'red', 'blue', 'grey']; // added 'grey'

  const themeButtons = themes
    .map(
      (theme) =>
        `<button class="secondary squarify" data-theme="${theme}">${theme.charAt(0).toUpperCase() + theme.slice(1)}</button>`,
    )
    .join('');

  hostComponent.innerHTML = `
    <div class="flex gap-md align-center">
      <span>Theme</span>${themeButtons}
    </div>
  `;

  themes.forEach((theme) => {
    const button = hostComponent.querySelector(`button[data-theme="${theme}"]`);

    button.addEventListener('click', function () {
      themes.forEach((otherTheme) => {
        document.documentElement.classList.remove(otherTheme + '-theme');
      });

      document.documentElement.classList.add(theme + '-theme');

      // Store the selected theme in localStorage
      localStorage.setItem('theme', theme);
    });
  });

  // Get the previously selected theme from localStorage
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme) {
    // If there was a saved theme, apply it
    document.documentElement.classList.add(savedTheme + '-theme');
  }
};
