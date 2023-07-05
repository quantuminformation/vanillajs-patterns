// Stored in /routes/index.js

export default (hostComponent) => {
  // Clear any existing content in the hostComponent
  hostComponent.innerHTML = '';

  // Create some new HTML content
  const indexHTML = `  <form>
      <h1>Welcome to the Form route!</h1>

    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    <br>
    <input type="submit" value="Submit">
  </form>
        <div class="bg-gray-200 p-4 rounded" data-component="number-changer"></div>

`;

  // Append the new content to the hostComponent
  hostComponent.innerHTML = indexHTML;
};
