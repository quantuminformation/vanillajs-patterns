import { POSTS } from './blog/posts.js';

export default (hostComponent) => {
  const authors = [...new Set(POSTS.map((p) => p.author))];
  hostComponent.innerHTML = '<h1 class="blog-title">Authors</h1>';
  const ul = document.createElement('ul');
  authors.forEach((name) => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = `/?author=${encodeURIComponent(name)}`;
    link.textContent = name;
    li.appendChild(link);
    ul.appendChild(li);
  });
  hostComponent.appendChild(ul);
};

