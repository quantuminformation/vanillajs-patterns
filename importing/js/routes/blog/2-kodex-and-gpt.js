// File: js/routes/blog/2-kodex-and-gpt.js

import { AI_AGENTS, RAILS } from './tags.js';
import postNav from '../../components/post-nav.js';
import blogSubscribe from '../../components/blog-subscribe.js';
import shareButtons from '../../components/share-buttons.js';
import updateMeta from '../../components/update-meta.js';
import canonicalUrl from '../../utils/canonicalUrl.js';

export const date = new Date('2025-06-14');
export const dateText = date.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
export const author = 'Nikos Katsikanis';
export const tags = [AI_AGENTS, RAILS];

export const content = `
  <span class="badge">Note: This is a continually evolving field, so this article may become outdated within a few weeks.</span>
  <h1 class="blog-title">Using Codex and GPT Together</h1>
  <p class="minor">${author} - ${dateText}</p>

  <h2>Complementary Strengths</h2>
  <div class="preview"><p>OpenAI Codex excels at tackling big-picture features or repetitive tasks. It can refactor an entire project in a targeted way or apply metadata consistently across all files with a single prompt.</p>
  <p>GPT models, by contrast, shine in focused, detail-oriented work. For example, GPT is well-suited to upgrading a UI component to use daisyUI. Codex often glosses over the finer details in such upgrades—leading to inconsistencies or only partially applied class changes.</p></div>
  <p>Used together, Codex and GPT cover both broad and narrow development tasks, creating a smoother, more productive workflow.</p>

  <h2>Changing Perspectives</h2>
  <p>I've softened my stance on so-called "vibe coding," as discussed in the video below. That said, I still believe AI tools require significant human oversight—you can't expect a single prompt to build a full, reliable app on its own.</p>

  <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin-top: 1rem; margin-bottom: 1rem;">
    <iframe src="https://www.youtube.com/embed/PaQSySspBF4"
            title="Vibe Coding Discussion"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
  </div>

  <p>Initially, I reacted to these tools with curiosity more than confidence. But after building a complex MVP of a Rails app in just three days, I was shocked at how much my development speed had increased. These days, I often run two AI agents in parallel across different projects.</p>
  <p>However, it's helpful/essential to understand all/most of the code that's generated. Blind trust will get you into trouble.</p>
  <div data-component="discuss"></div>
`;

export default (hostComponent) => {
  hostComponent.innerHTML = content;
  const discuss = hostComponent.querySelector('div[data-component="discuss"]');
  hostComponent.insertBefore(shareButtons('Using Codex and GPT Together'), discuss);
  hostComponent.insertBefore(postNav('/blog/2-kodex-and-gpt'), discuss);
  blogSubscribe(hostComponent);
  const firstImg = hostComponent.querySelector('img')?.src || new URL('/img/nikos.jpg', location.origin).href;
  const previewText =
    hostComponent.querySelector('.preview')?.textContent.trim().split(/\s+/).slice(0, 30).join(' ') || '';
  updateMeta({
    title: 'Using Codex and GPT Together',
    description: previewText,
    image: firstImg,
    url: canonicalUrl(),
    author,
  });
};
