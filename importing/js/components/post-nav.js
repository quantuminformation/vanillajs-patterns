import { POSTS } from '../routes/blog/posts.js';

export default function postNav(currentUrl) {
  const nav = document.createElement('div');
  nav.className = 'post-nav';

  const prev = document.createElement('a');
  prev.className = 'prev';
  const spacer = document.createElement('span');
  const next = document.createElement('a');
  next.className = 'next';

  const idx = POSTS.findIndex((p) => p.url === currentUrl);
  if (idx > 0) {
    const prevPost = POSTS[idx - 1];
    prev.href = prevPost.url;
    prev.textContent = `⇐ ${prevPost.title}`; // big left arrow
  }

  if (idx !== -1 && idx < POSTS.length - 1) {
    const nextPost = POSTS[idx + 1];
    next.href = nextPost.url;
    next.textContent = `${nextPost.title} ⇒`; // big right arrow
  }

  nav.append(prev, spacer, next);
  return nav;
}
