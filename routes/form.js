export default (hostComponent) => {
  hostComponent.innerHTML = '';

  const indexHTML = `
    <style>
      .form-field {
        display: flex;
        flex-direction: column;
        gap: 10px;

        @media screen and (min-width: 600px) {
          flex-direction: row;
          align-items: center;
        }
      }

      .form-field label {
        min-width: 100px;  
      }

      .form-field input {
        max-width: 100%;

        @media screen and (min-width: 600px) {
          width: 300px;
          flex-grow: 0;
        }
      }

      button[type="submit"] {
        display: inline-block;
        margin-top: 10px;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 20px;

        @media screen and (min-width: 600px) {
          width: 400px;
          margin: 0 auto;
        }
      }
    </style>

    <form>
      <h1>Welcome to the Form route!</h1>

      <div class="form-field">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name">
      </div>

      <div class="form-field">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
      </div>

      <button type="submit">Submit</button>
    </form>
  `;

  hostComponent.innerHTML = indexHTML;
};
