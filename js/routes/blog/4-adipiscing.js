import { VANILLA_JS } from './tags.js';
import postNav from '../../components/post-nav.js';
import blogSubscribe from '../../components/blog-subscribe.js';
import shareButtons from '../../components/share-buttons.js';
import updateMeta from '../../components/update-meta.js';
import canonicalUrl from '../../utils/canonicalUrl.js';

export const date = new Date('2025-01-04');
export const dateText = date.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
export const author = 'Nikos Katsikanis';
export const tags = [VANILLA_JS];

export const content = `
  <h1 class="blog-title">Sed Do Eiusmod Insights</h1>
  <p class="minor">${author} - ${dateText}</p>
  <div class="preview">
    <p>Sed do eiusmod tempor incididunt shows how longer phrases feel in a block of text.</p>
  </div>
  <p>These sentences are intentionally plain so that emphasis stays on styling rather than narrative.</p>
  <div data-component="discuss"></div>
`;

export default (hostComponent) => {
  hostComponent.innerHTML = content;
  const discuss = hostComponent.querySelector('div[data-component="discuss"]');
  hostComponent.insertBefore(shareButtons('Sed Do Eiusmod Insights'), discuss);
  hostComponent.insertBefore(postNav('/blog/4-adipiscing'), discuss);
  blogSubscribe(hostComponent);
  const firstImg = hostComponent.querySelector('img')?.src || new URL('/img/nikos.jpg', location.origin).href;
  const previewText =
    hostComponent.querySelector('.preview')?.textContent.trim().split(/\\s+/).slice(0, 30).join(' ') || '';
  updateMeta({
    title: 'Sed Do Eiusmod Insights',
    description: previewText,
    image: firstImg,
    url: canonicalUrl(),
    author,
  });
};
