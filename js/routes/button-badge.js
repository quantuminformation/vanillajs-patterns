// Stored in /routes/index.js

export default (hostComponent) => {
  // Clear any existing content in the hostComponent
  hostComponent.innerHTML = '';

  //@language=HTML
  const indexHTML = `
  <style>
    #form-grid {
      display: grid;
      grid-template-columns: 1fr 2fr; /* heading takes 1/3rd and buttons take 2/3rd of the row */
      gap: 1rem;
      align-items: center;
    }
    @media screen and (max-width: 600px) {
      #form-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>

  <h1>Buttons</h1>
  
  <div data-component="copy"></div>

  <p>Primary (changes with theme)</p>
  <div>
    <button>Text</button>
    <button>
      <span class="icon">&#x270F;</span>
      <span class="text">Text + Icon</span>
    </button>
  </div>

  <p>Secondary (changes with theme)</p>
  <div>
    <button class="secondary">Text</button>
    <button class="secondary">
      <span class="icon">&#x270F;</span>
      <span class="text">Text + Icon</span>
    </button>
  </div>

  <p>Variants (Using primary)</p>
  <div>
    <button class="squarify">Squarify</button>
  </div>

  <p>Outline (hover matches secondary)</p>
  <div>
    <button class="outline">Text</button>
    <button class="outline">
      <span class="icon">&#x270F;</span>
      <span class="text">Text + Icon</span>
    </button>
  </div>

  <p>Destructive</p>
  <div>
    <button class="destructive">Text</button>
    <button class="destructive">
      <span class="icon">&#x270F;</span>
      <span class="text">Text + Icon</span>
    </button>
  </div>

  <h1>Badges</h1>
  <div class="flex align-center gap-md">
    Some Text
    <span class="badge primary">test</span>
    <span class="badge secondary">test</span>
    <span class="badge outline">test</span>
    <span class="badge destructive">test</span>
  </div>
  `;

  // Append the new content to the hostComponent
  hostComponent.innerHTML = indexHTML;
};
