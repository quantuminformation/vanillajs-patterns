export default (hostComponent) => {
  // Define HTML structure with data attributes directly in the template
  const indexHTML = `
    <div data-component="fullscreen-hero"
         data-image-url="https://picsum.photos/1600/900"
         data-overlay-color="rgba(0, 0, 0, 0.5)"
         data-header="This is a fullscreen-hero"
         data-text="Some text you want to right here"
         data-button-text="Add your link url here"
         data-button-link="/calendar"
         >
    </div>

    <div data-component="narrow-hero" 
         data-header="Narrow hero">
    </div>
  `;

  // Apply HTML to the hostComponent
  hostComponent.innerHTML = indexHTML;
};
