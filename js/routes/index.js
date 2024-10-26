// Stored in /routes/index.js

export default (hostComponent) => {
  // Clear any existing content in the hostComponent
  hostComponent.innerHTML = '';

  // Create some new HTML content
  const indexHTML = `
    <h1>Homepage</h1>
    <p>This is some content for the homepage.</p>
    <p class="minor">This is minor text.</p>
  `;

  // Append the new content to the hostComponent
  hostComponent.innerHTML = indexHTML;
};
