import { VANILLA_JS, REMIX } from './tags.js';

export const date = '13 June 2025';
export const tags = [VANILLA_JS, REMIX];
export const content = `
    <h1 class="blog-title">Getting Started with the Router</h1>
    <p class="minor">${date}</p>
    <img src="https://source.unsplash.com/collection/893715/800x400" alt="Routing" />
    <h2>Mapping URLs</h2>
    <p>The router matches the current path to a module on disk and loads it dynamically.</p>
    <p><strong>No build step is required</strong> which keeps deployments simple and friendly to newcomers.</p>
    <p>As DHH likes to remind us, keeping the stack approachable encourages collaboration across the team.</p>
    <h2>Navigation</h2>
    <p>Links use the History API to push new states without reloading the page. Below is a simple diagram of the flow:</p>
    <pre>
Link Click -> history.pushState() -> loadRoute()
    </pre>
    <p>This allows for fast transitions while keeping the code straightforward.</p>
    <h2>Extensibility</h2>
    <p>You can add route guards or lazy-load components as your project grows. Because the router is tiny, customization is easy and transparent.</p>
    <p>Experiment with dynamic imports to defer loading heavier modules until absolutely necessary.</p>
    <div data-component="discuss"></div>
`;

export default (hostComponent) => {
  hostComponent.innerHTML = content;
};
