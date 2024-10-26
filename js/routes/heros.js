export default (hostComponent) => {
  // Define HTML structure with data attributes directly in the template
  const indexHTML = `
    <div data-component="fullscreen-hero"
         data-image-url="https://picsum.photos/1600/900"
         data-overlay-color="rgba(0, 0, 0, 0.5)"
         data-header="Herzlich willkommen"
         data-text="Mit unserer umfassenden Kenntnis des aktuellen Markts..."
         data-button-text="Mehr dazu"
         data-button-link="/kontakt">
    </div>

    <div data-component="narrow-hero" 
         data-header="Narrow hero">
    </div>
  `;

  // Apply HTML to the hostComponent
  hostComponent.innerHTML = indexHTML;
};
