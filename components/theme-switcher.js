//stored in /components/theme-switcher.js
export default (hostComponent) => {
  const themes = ['green', 'red', 'blue', 'grey']; // added 'grey'

  const themeButtons = themes
    .map(
      (theme) => `
    <button class="secondary" data-theme="${theme}">
      ${theme.charAt(0).toUpperCase() + theme.slice(1)}
    </button>
  `
    )
    .join('');

  hostComponent.innerHTML = `
    <div class="flex gap-md align-center">
     <span>Theme</span> ${themeButtons}
    </div>
    
  `;

  themes.forEach((theme) => {
    const button = hostComponent.querySelector(`button[data-theme="${theme}"]`);

    button.addEventListener('click', function () {
      themes.forEach((otherTheme) => {
        document.documentElement.classList.remove(otherTheme + '-theme');
      });

      document.documentElement.classList.add(theme + '-theme');
    });
  });
};
