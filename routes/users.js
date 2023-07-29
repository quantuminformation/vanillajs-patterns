// stored in components/user-list.js

export default (hostComponent) => {
  const updateUsers = async () => {
    // Fetch users from your API
    const response = await fetch('http://localhost:8000/users');
    const users = await response.json();

    // Clear the host component
    hostComponent.innerHTML = '';

    // Append each user to the host component
    for (const user of users) {
      const userElement = document.createElement('p');
      userElement.textContent = `ID: ${user.id}, Name: ${user.name}`;
      hostComponent.appendChild(userElement);
    }
  };

  // Update the user list immediately
  updateUsers();
};
