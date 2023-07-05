import { store, STORE_CURRENT_USER_UPDATED } from "../store.js";

export default (hostComponent) => {
  const renderUser = () => {
    const user = store.getCurrentUser();

    let template = "<h2>Current User</h2>";
    if (user) {
      template += `
        <div class="user-info">
          <p>Name: ${user.firstName} ${user.lastName}</p>
          <p>Email: ${user.email}</p>
        </div>
      `;
    }
    hostComponent.innerHTML = template;
  };

  // Render current user
  renderUser();

  // Listen to store update
  document.addEventListener(STORE_CURRENT_USER_UPDATED, renderUser);
};
