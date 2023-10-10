// routes/users.js

export default (hostComponent) => {
  const showLoading = () => {
    hostComponent.textContent = 'Loading...';
  };

  const updateUsers = async (endpoint) => {
    showLoading();

    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Couldn't fetch users");

      const users = await response.json();
      hostComponent.innerHTML = ''; // Clear the host component

      // Append each user to the host component
      for (const user of users) {
        const userElement = document.createElement('p');
        userElement.textContent = `ID: ${user.id}, Name: ${user.name}`;
        hostComponent.appendChild(userElement);
      }
    } catch (error) {
      console.error(error);
      hostComponent.textContent = 'Failed to load users.';
    }
  };

  const updateUsersSlow = async () => {
    updateUsers('http://localhost:8080/usersslow');
  };

  // Fetch and display the user list immediately
  // updateUsers('http://localhost:8080/users');  // For regular speed
  updateUsersSlow(); // For slower loading simulation
};
