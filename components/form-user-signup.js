export default (hostComponent) => {
  let editMode = false;
  let userDataSnapshot = null;

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const user = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
    };

    window.appStore.setCurrentUser(() => {
      return user;
    });

    form.reset();
    editMode = !editMode;
    renderForm();
  };

  const renderForm = () => {
    const currentUser = window.appStore.getCurrentUser();

    let userFields = currentUser
        ? {
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
        }
        : {
          firstName: "",
          lastName: "",
          email: "",
        };

    if (editMode) {
      // Save snapshot of user's data
      userDataSnapshot = {...userFields};

      hostComponent.innerHTML = `
        <h2>User Profile</h2>
        <form>
          <div class="flex gap-4 mb-4 flex-wrap">
            <input type="text" id="firstName" name="firstName" placeholder="First Name" required value="${userFields.firstName}" />
            <input type="text" id="lastName" name="lastName" placeholder="Last Name" required value="${userFields.lastName}" />
            <input type="email" id="email" name="email" placeholder="Email" required value="${userFields.email}" />
          </div>
          <button type="submit">Submit</button>
          <button type="button" id="cancel-edit">Cancel</button>
        </form>
      `;

      const form = hostComponent.querySelector("form");
      form.addEventListener("submit", handleSubmit);

      const cancelEditButton = hostComponent.querySelector("#cancel-edit");
      cancelEditButton.addEventListener("click", () => {
        // On cancel, restore the user's data from the snapshot
        window.appStore.setCurrentUser(() => {
          return userDataSnapshot;
        });
        editMode = false;
        renderForm();
      });
    } else {
      hostComponent.innerHTML = `
        <h2>User Profile</h2>
        <div class="flex gap-4 mb-4 flex-wrap">
          <div>${userFields.firstName}</div>
          <div>${userFields.lastName}</div>
          <div>${userFields.email}</div>
        </div>
        <button type="button" id="edit-profile">Edit</button>
      `;

      const editButton = hostComponent.querySelector("#edit-profile");
      editButton.addEventListener("click", () => {
        editMode = true;
        renderForm();
      });
    }
  };

  renderForm();
};
