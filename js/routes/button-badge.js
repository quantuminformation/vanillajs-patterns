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

<div style="background: linear-gradient(135deg, #0a90e2, #f013fe); padding: 1rem; border-radius: 0.5rem;">
  <p>wireframe (hover background matches minor text)</p>
  <div>
    <button class="wireframe">Text</button>
    <button class="wireframe">
      <span class="icon">&#x270F;</span>
      <span class="text">Text + Icon</span>
    </button>
  </div>
  </div>

<div style="
  background: 
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('https://picsum.photos/800/400?random=1') center/cover;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #fff;
">
  <p>Transparent - Dark and light same - designed for <a href="/heros">heros</a> (hover text matches primary)</p>
  <div>
    <button class="transparent squarify">Text</button>
    <button class="transparent squarify">
      <span class="icon">&#x270F;</span>
      <span class="text">Text + Icon</span>
    </button>
  </div>
</div>



  <p>Destructive</p>
  <div>
    <button class="destructive">Text</button>
    <button class="destructive">
      <span class="icon">&#x270F;</span>
      <span class="text">Text + Icon</span>
    </button>
  </div>
  
    <p>Success</p>
  <div>
    <button class="success">Text</button>
    <button class="success">
      <span class="icon">&#x270F;</span>
      <span class="text">Text + Icon</span>
    </button>
  </div>
<p>Special Cases</p>

<div>
  <button class="wireframe small-button" data-component="copy" data-text-to-copy="someEmail@example.com" 
  data-initial-text="Copy Email" data-success-text="Copied!"></button>
  </div>

</div>
  <h1>Badges</h1>
  <div class="flex align-center gap-md">
    Some Text
    <span class="badge primary">test</span>
    <span class="badge secondary">test</span>
    <span class="badge wireframe">test</span>
    <span class="badge destructive">test</span>
    <span class="badge success">test</span>
  </div>
  `;

  // Append the new content to the hostComponent
  hostComponent.innerHTML = indexHTML;
};
