// File: js/routes/blog/3-how-this-blog-works.js

import { VANILLA_JS } from './tags.js';
import postNav from '../../components/post-nav.js';
import blogSubscribe from '../../components/blog-subscribe.js';
import shareButtons from '../../components/share-buttons.js';
import updateMeta from '../../components/update-meta.js';
import canonicalUrl from '../../utils/canonicalUrl.js';

export const date = new Date('2025-06-18');
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
  <h1 class="blog-title">How This Blog Works</h1>
  <p class="minor">${author} - ${dateText}</p>

  <div class="img-wrap">
    <img src="/img/no_wp.jpg" alt="Vanilla JS logo" />
  </div>

  <h2>Overview</h2>
  <div class="preview">
    <p>This blog is built entirely with Vanilla JavaScript modules. There are no build tools, no frameworks, and no server-side rendering. Each route is a plain HTML page that loads a client-side router and dynamically imports the content it needs.</p>
    <p>Each HTML entry point includes shared layout elements: the <code>&lt;nav&gt;</code> bar, a theme toggle, and a <code>&lt;main data-component="router"&gt;</code> where routes are loaded. See <code>index.html</code> lines 23–54. Scripts like <code>store.js</code> and <code>componentLoader.js</code> are responsible for global state and initializing components.</p>
  </div>

  <h2>Page Structure</h2>

  <h2>Client-Side Routing</h2>
  <p>The <code>router</code> module intercepts link clicks and updates the main view without a full page reload. Paths are normalized using <code>sanitizePath()</code>, removing trailing slashes and <code>index.html</code> so routing logic is consistent. Routes are matched to JS modules and loaded dynamically.</p>

  <h2>Blog Posts as Modules</h2>
  <p>Each blog post lives in its own file and exports three things:</p>
  <ul>
    <li><code>date</code>: A JS <code>Date</code> object</li>
    <li><code>tags</code>: An array of strings like <code>"vanilla-js"</code></li>
    <li><code>content</code>: An HTML string that defines the article</li>
  </ul>
  <p>The default export is a function that mounts the content, injects share buttons, loads comment widgets, and updates meta tags for SEO and social previews.</p>

  <h2>Blog List Rendering</h2>
  <p>The <code>blog-list</code> component imports <code>posts.js</code>, which defines the blog index. It dynamically imports each blog module and extracts the <code>.preview</code> section if present. It trims out <code>&lt;h1&gt;</code>, dates, and badges to create a clean summary. The previews are capped to 50 words and rendered in a styled list.</p>
  <p>This component also enables filtering by tag and sorting by newest/oldest. When browser notifications are allowed, it compares <code>last-post-date</code> in <code>localStorage</code> to the latest blog module and shows a native notification if a new post is available.</p>

  <h2>Navigation and Sharing</h2>
  <p>The <code>post-nav</code> component uses the same <code>posts.js</code> array to add "previous" and "next" links on each article. <code>share-buttons.js</code> builds social links from the canonical URL and current title. Comments are handled with the Utterances widget, keyed to the current path.</p>

  <h2>Meta Tag Updates</h2>
  <p><code>update-meta.js</code> updates Open Graph and Twitter cards dynamically when a post is loaded. It uses <code>canonicalUrl()</code> to normalize paths to the <code>/index.html</code> format expected by social crawlers.</p>

  <h2>Theme and State</h2>
  <p>A small <code>store.js</code> module implements a global pub/sub pattern. It allows components to listen for shared state changes using plain custom events. The theme switcher toggles a <code>data-theme</code> attribute on the <code>&lt;html&gt;</code> element and persists the choice in <code>localStorage</code>.</p>

  <h2>In Short</h2>
  <p>This blog demonstrates how far you can go with native browser features and modular design. There’s no build step, no bundler, and no framework—just components, modules, and a tiny router. It’s fast to load, easy to reason about, and fully transparent to inspect and extend.</p>

  <div data-component="discuss"></div>
`;

export default (hostComponent) => {
  hostComponent.innerHTML = content;
  const discuss = hostComponent.querySelector('div[data-component="discuss"]');
  hostComponent.insertBefore(shareButtons('How This Blog Works'), discuss);
  hostComponent.insertBefore(postNav('/blog/3-how-this-blog-works'), discuss);
  blogSubscribe(hostComponent);
  const firstImg = hostComponent.querySelector('img')?.src || new URL('/img/nikos.jpg', location.origin).href;
  const previewText =
    hostComponent.querySelector('.preview')?.textContent.trim().split(/\s+/).slice(0, 30).join(' ') || '';
  updateMeta({
    title: 'How This Blog Works',
    description: previewText,
    image: firstImg,
    url: canonicalUrl(),
    author,
  });
};
