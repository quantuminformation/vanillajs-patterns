export default (hostComponent) => {
  hostComponent.innerHTML = '';

  const indexHTML = `
 
<form>
  <h1>Welcome to the Form route!</h1>

  <div class="form-grid">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    <label for="password">Password:</label>
    <input type="password" id="password" name="password">
  </div>

  <button type="submit">Submit</button>
</form>
  `;

  hostComponent.innerHTML = indexHTML;
};
