import { NEWS } from './tags.js';
import postNav from '../../components/post-nav.js';
import blogSubscribe from '../../components/blog-subscribe.js';
import shareButtons from '../../components/share-buttons.js';
import updateMeta from '../../components/update-meta.js';
import canonicalUrl from '../../utils/canonicalUrl.js';

export const date = new Date('2025-05-01');
export const dateText = date.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
export const author = 'Nikos Katsikanis';
export const tags = [NEWS];

export const content = `
  <h1 class="blog-title">Vanilla JS Patterns Release News</h1>
  <p class="minor">${author} - ${dateText}</p>
  <div class="preview">
    <p>This brief news update highlights recent changes in the Vanilla JS Patterns project.</p>
  </div>
  <p>More details will follow as the project evolves and new features are introduced.</p>
  <div data-component="discuss"></div>
`;

export default (hostComponent) => {
  hostComponent.innerHTML = content;
  const discuss = hostComponent.querySelector('div[data-component="discuss"]');
  hostComponent.insertBefore(shareButtons('Vanilla JS Patterns Release News'), discuss);
  hostComponent.insertBefore(postNav('/blog/5-breaking-news'), discuss);
  blogSubscribe(hostComponent);
  const firstImg = hostComponent.querySelector('img')?.src || new URL('/img/nikos.jpg', location.origin).href;
  const previewText =
    hostComponent.querySelector('.preview')?.textContent.trim().split(/\s+/).slice(0, 30).join(' ') || '';
  updateMeta({
    title: 'Vanilla JS Patterns Release News',
    description: previewText,
    image: firstImg,
    url: canonicalUrl(),
    author,
  });
};
