// File: js/routes/blog/1-exploring-vanilla-js.js

import { VANILLA_JS } from './tags.js';
import postNav from '../../components/post-nav.js';
import blogSubscribe from '../../components/blog-subscribe.js';
import shareButtons from '../../components/share-buttons.js';
import updateMeta from '../../components/update-meta.js';
import canonicalUrl from '../../utils/canonicalUrl.js';

export const date = new Date('2025-06-13');
export const dateText = date.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
export const author = 'Nikos Katsikanis';
export const tags = [VANILLA_JS];

export const content = `
  <style>
    .img-wrap {
      float: left;
      margin: 0 1.5rem 1rem 0;
      width: 160px;
      height: 160px;
      overflow: hidden;
      border-radius: 50%;
      shape-outside: circle();
      -webkit-shape-outside: circle();
    }

    .img-wrap img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  </style>

  <!-- Post header -->
  <h1 class="blog-title">Exploring Vanilla JS Patterns</h1>
  <p class="minor">${author} - ${dateText}</p>

  <div class="img-wrap">
    <img src="/img/v.png" alt="Vanilla JS placeholder" />
  </div>

  <h2>Why Patterns Matter</h2>
  <div class="preview">
    <p><strong>Vanilla JavaScript</strong> offers complete control over your codebase. When you understand every line you ship, you can craft the user experience exactly the way you want.</p>
    <p>Using simple, consistent patterns keeps your project organized and easy to extend. The code in this project runs directly in the browser—no bundler or build step required. This simplicity makes it easier to understand what's going on and reduces potential points of failure.</p>
  </div>

  <h2>Freedom from Lock-in</h2>
  <p>Frameworks add layers of abstraction, but sometimes a lightweight approach is all you need. By sticking to standard browser APIs, you retain the freedom to move your code anywhere without rewriting core logic.</p>
  <p>Mix and match any tools or libraries you like, knowing that any developer familiar with plain HTML, CSS, and JavaScript can dive right in.</p>

  <h2>Performance</h2>
  <p><strong>Less code</strong> often leads to faster load times and easier maintenance. When there is no build pipeline, there is also no build breakage to chase down.</p>
  <p>Modern browsers are highly optimized—skipping unnecessary abstraction layers yields snappier apps and fewer dependencies to keep up-to-date.</p>

  <h2>Component Composition</h2>
  <p>Breaking your UI into reusable components promotes separation of concerns and improves readability. For instance, the navigation bar and blog list are independent elements that can be mixed and matched as needed.</p>
  <p>Each component can be tested independently and then combined to create richer features. This modular approach is great for small sites and scales surprisingly well.</p>

  <h2>State Management</h2>
  <p>Instead of relying on heavy frameworks, you can manage state using plain JavaScript objects and custom events. The <code>store</code> module in this repo demonstrates how a simple pub/sub pattern can handle shared state.</p>
  <p>This lightweight approach is powerful enough for many small to medium-sized projects. <strong>With these patterns, you can build maintainable applications without heavy dependencies.</strong></p>

  <h2>Learning Opportunity</h2>
  <p>Building features from scratch teaches you how the web actually works. Understanding the fundamentals makes debugging easier and lets you innovate.</p>
  <p>Even if you later adopt a framework, this knowledge pays dividends—and if you ever decide to go framework-free again, you’ll already know the path.</p>

  <p><a href="https://github.com/quantuminformation/vanillajs-patterns" target="_blank" rel="noopener">View the full repository on GitHub</a></p>

  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/videoseries?list=PLualcIC6WNK2GOKf8S7x7O0T1xBu8_0hF"
    title="Video playlist"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>

  <div data-component="discuss"></div>
`;

export default (hostComponent) => {
  hostComponent.innerHTML = content;
  const discuss = hostComponent.querySelector('div[data-component="discuss"]');
  hostComponent.insertBefore(shareButtons('Exploring Vanilla JS Patterns'), discuss);
  hostComponent.insertBefore(postNav('/blog/1-exploring-vanilla-js'), discuss);
  blogSubscribe(hostComponent);
  const firstImg = hostComponent.querySelector('img')?.src || new URL('/img/nikos.jpg', location.origin).href;
  const previewText =
    hostComponent.querySelector('.preview')?.textContent.trim().split(/\s+/).slice(0, 30).join(' ') || '';
  updateMeta({
    title: 'Exploring Vanilla JS Patterns',
    description: previewText,
    image: firstImg,
    url: canonicalUrl(),
    author,
  });
};
