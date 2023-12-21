export default (hostComponent) => {
  hostComponent.innerHTML = '';

  const indexHTML = `

  <h1>Welcome to the Form route!</h1>
<form class="centered">
 <h2>Centered class form</h2>

  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name">
    </div>
    <div>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password">
  </div>

  <button type="submit">Submit</button>
</form>
  `;

  hostComponent.innerHTML = indexHTML;
};
