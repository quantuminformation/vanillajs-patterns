// routes/users.js

export default (hostComponent) => {
  const updateUsers = async () => {
    try {
      // Note the change in the port from 8000 to 8080 to match your backend setup
      const response = await fetch('http://localhost:8080/users');
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

  // Fetch and display the user list immediately
  updateUsers();
};
