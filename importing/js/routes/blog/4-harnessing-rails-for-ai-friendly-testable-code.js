// File: js/routes/blog/4-harnessing-rails-for-ai-friendly-testable-code.js

import { AI_AGENTS, RAILS } from './tags.js';
import postNav from '../../components/post-nav.js';
import blogSubscribe from '../../components/blog-subscribe.js';
import shareButtons from '../../components/share-buttons.js';
import updateMeta from '../../components/update-meta.js';
import canonicalUrl from '../../utils/canonicalUrl.js';

export const date = new Date('2025-07-5');
export const dateText = date.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
export const author = 'Nikos Katsikanis';
export const tags = [RAILS, AI_AGENTS];

export const content = `
  <style>
    .img-wrap {
      float: left;
      /* Increased outside space without cutting the image */
      margin: 0 2rem 1rem 0;
      width: 160px;
      height: 160px;
      overflow: hidden;
      border-radius: 50%;
      shape-outside: circle();
      -webkit-shape-outside: circle();
    }

    .img-wrap img {
      /* Let the full image fill the container */
      width: 100%;
      height: 100%;
      object-fit: contain;
      display: block;
      padding: 0.5rem; /* subtle inner padding to keep it away from edges */
    }
  </style>
  <h1 class="blog-title">Harnessing Rails for AI-Friendly, Testable Code</h1>
  <p class="minor">${author} - ${dateText}</p>

  <div class="img-wrap">
    <img src="/img/Ruby_On_Rails_Logo.svg.png" alt="Ruby on Rails logo" />
  </div>

  <div class="preview">
    <p>Rails 8 provides conventions that keep the structure predictable,
    perfect for tools like OpenAI Codex.</p>
  </div>

  <h2>Rails' Convention Power</h2>
  <p>Rails encourages consistent folders, names and components. Models
  such as <code>User</code> and <code>Membership</code> follow familiar patterns.
  Background jobs run via Solid Queue with
  <code>config.active_job.queue_adapter = :solid_queue</code>, so asynchronous
  work follows one approach throughout.</p>

  <h2>Built-In Goodies</h2>
  <ul>
    <li><strong>Queue System</strong> – Solid Queue runs jobs without an external
    service. Use <code>bin/jobs</code> to run workers.</li>
    <li><strong>File Uploads</strong> – Active Storage manages images; avatars
    attach with <code>has_one_attached</code>.</li>
    <li><strong>Membership and Auth</strong> – Users join multiple communities
    and paywall logic comes built in.</li>
  </ul>
  <p>These features trim boilerplate so Codex can rely on standard Rails APIs.</p>

  <h2>Why Training on Rails Is Easier</h2>
  <p>Rails follows a "fat model, skinny controller" style. With predictable MVC
  boundaries and few libraries, the AI has a smaller set of patterns to learn.
  The JavaScript world is vast by comparison, which increases the search space.</p>
  <p>Rails projects often pair with RSpec and Capybara/Playwright for unit and e2e tests, helping Codex make accurate
  suggestions.</p>

  <h2>Ruby’s Slimmed-Down Surface Area for Agents</h2>
  <p>Beyond Rails itself, the language Ruby ships with a remarkably uniform core and standard library. This “batteries-included” approach means AI agents see the same APIs over and over:</p>
  <ul>
    <li><strong>Enumerable Everywhere:</strong> Collections—including Arrays, Hashes and even custom classes—adhere to <code>Enumerable</code> and a handful of methods like <code>each</code>, <code>map</code>, <code>select</code> and <code>inject</code>. Agents quickly learn these once and apply them everywhere.</li>
    <li><strong>Built-In DSL Patterns:</strong> From Rake tasks (<code>desc</code>, <code>task</code>) to Thor CLI definitions (<code>argument</code>, <code>option</code>) to migrations (<code>change_table</code>, <code>add_column</code>), Ruby’s DSLs all follow consistent naming and block-based styles.</li>
    <li><strong>Minimal External Boilerplate:</strong> Gems stick to conventions—an engine lives in <code>lib/my_engine/</code>, generators under <code>lib/generators</code>, tests in <code>spec/</code> or <code>test/</code>. Agents don’t have to “guess” where to look.</li>
    <li><strong>Rubocop & Style Guides:</strong> The community-driven Ruby Style Guide (enforced via RuboCop) normalizes indentation, naming (snake_case for methods, CamelCase for classes), and file layout. That consistency shows up in training corpora.</li>
  </ul>

  <p>Because Ruby’s syntax and standard patterns are so narrow, an AI agent can:</p>
  <ol>
    <li><strong>Detect Intent Faster:</strong> Method names map directly to domain concepts (e.g. <code>user.activate!</code>, <code>Membership#expired?</code>), so suggestions require less context analysis.</li>
    <li><strong>Compose Code Reliably:</strong> Knowing that <code>has_many :comments</code> always generates the same methods (<code>comments</code>, <code>comments.build</code>), agents can scaffold associations without trial and error.</li>
    <li><strong>Validate Against Community Patterns:</strong> When an agent suggests code, you can instantly verify it against documented conventions (e.g. Rails Guides, API docs) rather than wrestling with dozens of competing libraries.</li>
  </ol>

  <h2>Helpful Gems for Rapid Development</h2>
  <p>A typical setup includes <code>bootsnap</code> for faster boot time,
  <code>pg</code> for PostgreSQL, and <code>puma</code> as the web server.</p>
  <p><code>tailwindcss-rails</code> streamlines styling, while
  <code>stimulus-rails</code> and <code>turbo-rails</code> handle
  interactivity without heavy JavaScript frameworks.</p>

  <h2>Final Thoughts</h2>
  <p>Rails' conventions and built-in jobs and uploads give both developers and
  Codex a stable foundation. If you're a full-stack JavaScript dev, Rails can
  simplify membership management and background work while providing AI-friendly
  patterns.</p>

  <div data-component="discuss"></div>
`;

export default (hostComponent) => {
  hostComponent.innerHTML = content;
  const discuss = hostComponent.querySelector('div[data-component="discuss"]');
  hostComponent.insertBefore(shareButtons('Harnessing Rails for AI-Friendly, Testable Code'), discuss);
  hostComponent.insertBefore(postNav('/blog/4-harnessing-rails-for-ai-friendly-testable-code'), discuss);
  blogSubscribe(hostComponent);
  const firstImg = hostComponent.querySelector('img')?.src || new URL('/img/nikos.jpg', location.origin).href;
  const previewText =
    hostComponent.querySelector('.preview')?.textContent.trim().split(/\s+/).slice(0, 30).join(' ') || '';
  updateMeta({
    title: 'Harnessing Rails for AI-Friendly, Testable Code',
    description: previewText,
    image: firstImg,
    url: canonicalUrl(),
    author,
  });
};
