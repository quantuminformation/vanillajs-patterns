export default (hostComponent) => {
  const renderUser = () => {
    const user = window.appStore.getCurrentUser();

    if (user) {
      hostComponent.innerHTML = `
        <h2>Current User</h2>
        <div class="user-info">
          <p>Name: ${user.firstName} ${user.lastName}</p>
          <p>Email: ${user.email}</p>
        </div>
      `;
    }
  };

  // Render current user
  renderUser();

  // Listen to store update
  document.addEventListener(window.STORE_CURRENT_USER_UPDATED, renderUser);
};
