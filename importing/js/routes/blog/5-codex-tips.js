// File: js/routes/blog/5-codex-tips.js

import { AI_AGENTS } from './tags.js';
import postNav from '../../components/post-nav.js';
import blogSubscribe from '../../components/blog-subscribe.js';
import shareButtons from '../../components/share-buttons.js';
import updateMeta from '../../components/update-meta.js';
import canonicalUrl from '../../utils/canonicalUrl.js';

export const date = new Date('2025-07-12');
export const dateText = date.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
export const author = 'Nikos Katsikanis';
export const tags = [AI_AGENTS];

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

  <h1 class="blog-title">Codex Tips</h1>
  <p class="minor">${author} - ${dateText}</p>
  <div class="img-wrap">
    <img src="/img/nikos.jpg" alt="Codex tips" />
  </div>

  <h2>Constantly Evolving</h2>
  <p class="preview">
    Agents keep improving, so these tips may be out of date in a month or two.
  </p>

  <h2>Keep PRs Focused</h2>
  <p>
    Limit each pull request to one or two features, archive the context, and
    start fresh to avoid confusion.
  </p>

  <h2>Simplify Instructions</h2>
  <p>The clearer the instructions, the better the results.</p>

  <h2>Ask Questions</h2>
  <p>
    It is fine for the agent to ask questions to verify the code and explain why
    it works.
  </p>

  <h2>Agents File</h2>
  <p>
    Maintain an <code>AGENTS.md</code> that spells out repository rules. Ours looks like:
  </p>
  <pre><code>All code must be production ready, well tested, and documented.
Use latest versions of Ruby libraries and frameworks.
Where possible use full unit tests, and e2e tests with seed quality data that we can even use for live demos.
Don't allow any pr to be made that has failing tests.
All test must pass GitHub Actions consistently. Do not make and PR that does not pass all tests.
Don't include any binary files in any pull request.
At the start of each week on a Monday review every *_help_content.html partial and update its guidance so it matches the current codebase. Don't update if the guidance is updated already that day for that item.
Avoid touching help pages when the only change is the "Last updated" date.
llms.txt files:
https://daisyui.com/llms.txt</code></pre>
  <p>
    Automatically updating help files from the code saves time, and the
    <code>llms.txt</code> link explains why this policy matters.
  </p>

  <h2>Testing</h2>
  <p>
    Prefer full unit and end-to-end tests with quality seed data for demos. Never
    open a pull request with failing tests&mdash;GitHub Actions must pass.
  </p>

  <h2>Docs Automation</h2>
  <p>
    Each Monday an automated task updates every <code>*_help_content.html</code>
    file so the guidance matches the codebase. The
    <a href="https://daisyui.com/llms.txt">llms.txt</a> file helps motivate this
    practice.
  </p>

  <h2>Codex Can Be Lazy</h2>
  <p>Sometimes you need to repeat a request or explain it in more detail.</p>

  <div data-component="discuss"></div>
`;

export default (hostComponent) => {
  hostComponent.innerHTML = content;
  const discuss = hostComponent.querySelector('div[data-component="discuss"]');
  hostComponent.insertBefore(shareButtons('Codex Tips'), discuss);
  hostComponent.insertBefore(postNav('/blog/5-codex-tips'), discuss);
  blogSubscribe(hostComponent);
  const firstImg = hostComponent.querySelector('img')?.src || new URL('/img/nikos.jpg', location.origin).href;
  const previewText =
    hostComponent.querySelector('.preview')?.textContent.trim().split(/\s+/).slice(0, 30).join(' ') || '';
  updateMeta({
    title: 'Codex Tips',
    description: previewText,
    image: firstImg,
    url: canonicalUrl(),
    author,
  });
};
