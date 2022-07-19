/**
 *  this function is called when the script is loaded
 *  it adds the darkmode switch to the page inside the host component
 * @param hostComponent
 */
export default (hostComponent) => {
  const initialRender = () => {
    const isDark = document.documentElement.classList.contains("dark");
    hostComponent.innerHTML = `
              <span class="toggle mr-1" >
                <input
                  type="checkbox"
                  id="toggle"
                  checked=${isDark}
                   />
                <label
                  id="darkicon"
                  title="Toggle dark mode"
                  for="toggle"
                  data-dark="${isDark ? "🌒" : "🌞"}"></label>  
            </span>`;
  };

  initialRender();

  // add event listener to the switch
  // when the switch is clicked, the darkmode class is toggled
  // and the icon is changed to reflect the new state
  hostComponent.addEventListener("click", (e) => {
    if (e.target.id === "toggle") {
      document.documentElement.classList.toggle("dark");
      //change light or dark mode icon
      const darkIcon = document.getElementById("darkicon");
      darkIcon.dataset.dark = document.documentElement.classList.contains(
        "dark"
      )
        ? "🌒"
        : "🌞";
    }
  });
};
