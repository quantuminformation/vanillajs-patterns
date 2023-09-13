// routes/users.js

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

  const createUser = async (name) => {
    // Post user data to your API
    await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    // Update the user list after a user has been created
    updateUsers();
  };

  // Add a form to the host component
  const formElement = document.createElement('form');
  formElement.innerHTML = `
    <input type="text" id="name" name="name" placeholder="Enter user name" required>
    <input type="submit" value="Submit">
  `;
  formElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = formElement.elements.name.value;
    await createUser(name);
    formElement.elements.name.value = '';
  });
  hostComponent.appendChild(formElement);

  // Update the user list immediately
  updateUsers();
};
