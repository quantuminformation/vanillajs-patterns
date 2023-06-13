export default (hostComponent) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const user = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
    };

    window.appStore.setCurrentUser((currentUser) => {
      return user;
    });
    form.reset();
  };

  hostComponent.innerHTML = `
    <h2>Sign Up</h2>
    <form>
      <div class="form-grid">
        <input type="text" id="firstName" name="firstName" placeholder="First Name" value="John" required />
        <input type="text" id="lastName" name="lastName" placeholder="Last Name" value="Doe" required />
        <input type="email" id="email" name="email" placeholder="Email" value="johndoe@example.com" required />
        <button type="submit">Submit</button>
      </div>
    </form>
  `;

  const form = hostComponent.querySelector("form");
  form.addEventListener("submit", handleSubmit);
};
