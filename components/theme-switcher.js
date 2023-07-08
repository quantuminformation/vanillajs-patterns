//stored in /components/theme-switcher.js
export default (hostComponent) => {
  const themes = ['green', 'red', 'blue', 'grey']; // added 'grey'

  themes.forEach(theme => {
    const button = document.createElement('button');
    button.textContent = theme.charAt(0).toUpperCase() + theme.slice(1);

    button.addEventListener('click', function() {
      themes.forEach(otherTheme => {
        document.documentElement.classList.remove(otherTheme + '-theme');
      });

      document.documentElement.classList.add(theme + '-theme');
    });

    hostComponent.appendChild(button);
  });
};
