// File: js/routes/developers.js

export default (hostComponent) => {
  hostComponent.innerHTML = `
    <h1>Developers</h1>
    <p>Select a language to view the hello world snippet.</p>
    <div data-component="code-viewer">
      <pre data-lang="js"><code>console.log('Hello, world!');</code></pre>
      <pre data-lang="python"><code>print('Hello, world!')</code></pre>
      <pre data-lang="ruby"><code>puts 'Hello, world!'</code></pre>
    </div>
  `;
};

