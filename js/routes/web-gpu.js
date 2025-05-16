// Stored in /routes/index.js

export default (hostComponent) => {
  // Clear any existing content in the hostComponent
  hostComponent.innerHTML = '';

  // Create some new HTML content
  const indexHTML = `
    <h1>Web GPU experiments</h1>
    <div data-component="webgpu-spinning-cube" style="width:400px; height:300px;"></div>

  `;

  // Append the new content to the hostComponent
  hostComponent.innerHTML = indexHTML;
};
