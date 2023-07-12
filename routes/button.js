// Stored in /routes/index.js

export default (hostComponent) => {
  // Clear any existing content in the hostComponent
  hostComponent.innerHTML = '';

  //@language=HTML
  const indexHTML = `  <form>
      <h1>Buttons</h1>

<h2>Primary (changes with theme)</h2>
    <button >Text</button>
    <button ><span class="icon">&#x270F;</span>
          <!-- Unicode for a pencil, similar to an edit or form icon -->
          <span class="text">Text + Icon</span></button>

<h2>Secondary (changes with theme)</h2>
    <button class="secondary" >Text</button>
    <button class="secondary"><span class="icon">&#x270F;</span>
          <!-- Unicode for a pencil, similar to an edit or form icon -->
          <span class="text">Text + Icon</span></button>
          <h2>Variants (Using primary)</h2>
    <button class="squarify" >Squarify</button>
    
<h2>Outline (hover matches secondary)</h2>
    <button class="outline" >Text</button>
    <button class="outline"><span class="icon">&#x270F;</span>
          <!-- Unicode for a pencil, similar to an edit or form icon -->
          <span class="text">Text + Icon</span></button>
    
`;
  // Append the new content to the hostComponent
  hostComponent.innerHTML = indexHTML;
};
