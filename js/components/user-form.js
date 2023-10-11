// components/user-form.js

export default (hostComponent, refreshUsers) => {
  const formElement = document.createElement('form');

  const nameInput = document.createElement('input');
  nameInput.placeholder = 'Name';

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Create User';

  formElement.appendChild(nameInput);
  formElement.appendChild(submitButton);

  formElement.onsubmit = async (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    if (!name) return;

    await fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    // Clear the input field and refresh the user list
    nameInput.value = '';
    refreshUsers();
  };

  hostComponent.appendChild(formElement);
};
