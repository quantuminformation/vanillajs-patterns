// Stored in /routes/routes/multiple-instances.js

export default (hostComponent) => {
  // Clear any existing content in the hostComponent
  hostComponent.innerHTML = '';

  //@language=HTML
  const indexHTML = `
<div data-component="number-changer"></div>
<div data-component="number-changer"></div>
  `;

  // Append the new content to the hostComponent
  hostComponent.innerHTML = indexHTML;
};
