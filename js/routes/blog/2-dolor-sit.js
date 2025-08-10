import { GENERAL } from './tags.js';
import postNav from '../../components/post-nav.js';
import blogSubscribe from '../../components/blog-subscribe.js';
import shareButtons from '../../components/share-buttons.js';
import updateMeta from '../../components/update-meta.js';
import canonicalUrl from '../../utils/canonicalUrl.js';

export const date = new Date('2025-01-02');
export const dateText = date.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
export const author = 'Nikos Katsikanis';
export const tags = [GENERAL];

export const content = `
  <h1 class="blog-title">Dolor Sit Amet Explained</h1>
  <p class="minor">${author} - ${dateText}</p>
  <div class="preview">
    <p>Dolor sit amet is a familiar phrase that keeps attention on layout rather than meaning.</p>
  </div>
  <p>Using neutral words lets readers focus on typography, spacing, and overall design.</p>
  <div data-component="discuss"></div>
`;

export default (hostComponent) => {
  hostComponent.innerHTML = content;
  const discuss = hostComponent.querySelector('div[data-component="discuss"]');
  hostComponent.insertBefore(shareButtons('Dolor Sit Amet Explained'), discuss);
  hostComponent.insertBefore(postNav('/blog/2-dolor-sit'), discuss);
  blogSubscribe(hostComponent);
  const firstImg = hostComponent.querySelector('img')?.src || new URL('/img/nikos.jpg', location.origin).href;
  const previewText =
    hostComponent.querySelector('.preview')?.textContent.trim().split(/\\s+/).slice(0, 30).join(' ') || '';
  updateMeta({
    title: 'Dolor Sit Amet Explained',
    description: previewText,
    image: firstImg,
    url: canonicalUrl(),
    author,
  });
};
