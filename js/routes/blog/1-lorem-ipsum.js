import { VANILLA_JS } from './tags.js';
import postNav from '../../components/post-nav.js';
import blogSubscribe from '../../components/blog-subscribe.js';
import shareButtons from '../../components/share-buttons.js';
import updateMeta from '../../components/update-meta.js';
import canonicalUrl from '../../utils/canonicalUrl.js';

export const date = new Date('2025-01-01');
export const dateText = date.toLocaleDateString(undefined, {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
export const author = 'Nikos Katsikanis';
export const tags = [VANILLA_JS];

export const content = `
  <h1 class="blog-title">Understanding Lorem Ipsum</h1>
  <p class="minor">${author} - ${dateText}</p>
  <div class="preview">
    <p>Lorem ipsum is placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content.</p>
  </div>
  <p>This article explores the history of lorem ipsum and why designers rely on it.</p>
  <div data-component="discuss"></div>
`;

export default (hostComponent) => {
  hostComponent.innerHTML = content;
  const discuss = hostComponent.querySelector('div[data-component="discuss"]');
  hostComponent.insertBefore(shareButtons('Understanding Lorem Ipsum'), discuss);
  hostComponent.insertBefore(postNav('/blog/1-lorem-ipsum'), discuss);
  blogSubscribe(hostComponent);
  const firstImg = hostComponent.querySelector('img')?.src || new URL('/img/nikos.jpg', location.origin).href;
  const previewText =
    hostComponent.querySelector('.preview')?.textContent.trim().split(/\\s+/).slice(0, 30).join(' ') || '';
  updateMeta({
    title: 'Understanding Lorem Ipsum',
    description: previewText,
    image: firstImg,
    url: canonicalUrl(),
    author,
  });
};
