export default (hostComponent) => {
  hostComponent.innerHTML = '';

  //language=HTML
  const indexHTML = `

  <h1>Welcome to the Form route!</h1>
<form class="centered">
 <h2>Centered class form</h2>

  <div>
    <label for="name">Name</label>
    <input type="text" id="name" name="name">
    </div>
    <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password">
  </div>

  <div>
    <label for="iagree">I agree</label>
    <input type="checkbox" name="iagree" id="iagree">
  </div>
  <div>
    <label for="date">Date</label>
    <input type="date" name="date" id="date">
  </div>
  <div>
    <label for="range">Range</label>
    <input type="range" name="range" id="range">
  </div>

  <button type="submit">Submit</button>
</form>
  `;

  hostComponent.innerHTML = indexHTML;
};
