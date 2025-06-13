// File: routes/form.js
// Purpose: A simple form to test the form components

export default (hostComponent) => {
  hostComponent.innerHTML = '';

  //language=HTML
  const indexHTML = `

  <h1>Form examples</h1>
<form class="centered">
 <p>Linear form (repeating divs with label + form control pairs)</p>
  <div>
    <label for="name" >Name</label>
    <input type="text" id="name" name="name" autocomplete="name" required>
    </div>
    <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password"  autocomplete="password" required>
  </div>
  <div>
    <label for="date">Date</label>
    <input type="date" name="date" id="date" required>
  </div>
  <div>
    <label for="range">Range</label>
    <input type="range" name="range" id="range" >
  </div>
  <div>
    <label for="message">message</label>
  <textarea  name="message" rows="4" required></textarea>
  </div>
  <span data-component="toggle-switch"></span>

  <button type="submit">Submit</button>
</form>
  `;

  hostComponent.innerHTML = indexHTML;
};
