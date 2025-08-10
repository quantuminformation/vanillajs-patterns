/**
 * Blog List Renderer
 * ------------------
 * - Shows a spinner while loading.
 * - Imports each post module, then extracts only the `.preview` section (or entire content if absent).
 * - Strips out titles, dates, badges, if inadvertently included.
 * - Builds a list of post links with date + trimmed preview text.
 * - Ensures UL has `list-style: none` so no bullets appear.
 */

import { TAGS } from '../routes/blog/tags.js';
import { POSTS } from '../routes/blog/posts.js';
import blogSubscribe from './blog-subscribe.js';

export default (hostComponent) => {
  // Initial spinner
  hostComponent.innerHTML = `
    <div class="blog-spinner"></div>
  `;

  const posts = POSTS;

  (async () => {
    const modules = await Promise.all(
      posts.map((post) => import(`../routes${post.url}.js`).catch(() => null)),
    );

    const entries = posts.map((post, index) => {
      const mod = modules[index];

      const temp = document.createElement('div');
      temp.innerHTML = mod?.content || '';
      const previewBlock = temp.querySelector('.preview') || temp;
      const imgEl = temp.querySelector('img[src]:not([src="/img/nikos.jpg"])') || temp.querySelector('img');
      previewBlock.querySelector('h1')?.remove();
      previewBlock.querySelector('p.minor')?.remove();
      previewBlock.querySelector('.badge')?.remove();
      const words = previewBlock.textContent?.trim().split(/\s+/).slice(0, 50) || [];

      return {
        title: post.title,
        url: post.url,
        author: post.author || mod?.author || 'Unknown',
        image: imgEl ? imgEl.getAttribute('src') : null,
        date: mod?.date instanceof Date ? mod.date : mod?.date ? new Date(mod.date) : new Date('1970-01-01'),
        tags: mod?.tags || [],
        preview: words.join(' ') + (words.length === 50 ? '…' : ''),
      };
    });

    const latestEntry = entries.reduce((a, b) => (a.date > b.date ? a : b), entries[0]);
    if (localStorage.getItem('notify-blog') === 'true' && latestEntry) {
      const lastSeen = localStorage.getItem('last-post-date');
      if (!lastSeen || new Date(lastSeen) < latestEntry.date) {
        new Notification('New blog post', { body: latestEntry.title });
      }
      localStorage.setItem('last-post-date', latestEntry.date.toISOString());
    }

    let currentTag = null;
    let currentAuthor = new URLSearchParams(location.search).get('author');
    let sortDir = 'desc';

    const controls = document.createElement('div');
    controls.className = 'blog-controls';
    const tagLabel = document.createElement('span');
    tagLabel.textContent = 'All tags:';
    const tagContainer = document.createElement('div');
    TAGS.forEach((tag) => {
      const btn = document.createElement('button');
      btn.className = 'wireframe small-button tag-filter';
      btn.textContent = tag;
      btn.addEventListener('click', () => {
        currentTag = currentTag === tag ? null : tag;
        render();
      });
      tagContainer.appendChild(btn);
    });

    const authorLabel = document.createElement('span');
    authorLabel.style.marginLeft = '1rem';
    authorLabel.textContent = 'Authors:';
    const authorContainer = document.createElement('div');
    const authorSet = [...new Set(entries.map((e) => e.author))];
    authorSet.forEach((name) => {
      const btn = document.createElement('button');
      btn.className = 'wireframe small-button author-filter';
      btn.textContent = name;
      btn.addEventListener('click', () => {
        currentAuthor = currentAuthor === name ? null : name;
        const params = new URLSearchParams(location.search);
        if (currentAuthor) params.set('author', currentAuthor);
        else params.delete('author');
        history.replaceState(
          null,
          '',
          location.pathname + (params.toString() ? `?${params.toString()}` : ''),
        );
        render();
      });
      authorContainer.appendChild(btn);
    });

    const sortSelect = document.createElement('select');
    sortSelect.innerHTML = '<option value="desc">Newest</option><option value="asc">Oldest</option>';
    sortSelect.style.marginLeft = '0.5rem';
    sortSelect.addEventListener('change', () => {
      sortDir = sortSelect.value;
      render();
    });

    controls.append(tagLabel, tagContainer, authorLabel, authorContainer, sortSelect);

    const listWrapper = document.createElement('div');

    hostComponent.innerHTML = '<h2 class="blog-title">Blog Posts</h2>';
    hostComponent.append(listWrapper, controls);

    const subWrapper = document.createElement('div');
    blogSubscribe(subWrapper);
    hostComponent.appendChild(subWrapper);
    hostComponent.insertAdjacentHTML(
      'beforeend',
      `<style>
        ul.blog-list { list-style: none; padding: 0; margin: 0; }
        ul.blog-list li { margin-bottom: 1.5rem; display: flex; gap: 0.5rem; align-items: center; }
        ul.blog-list img.preview-img { width: 80px; height: 80px; object-fit: cover; flex-shrink: 0; padding: 1rem; border-radius: 1rem; }
        ul.blog-list a { font-weight: bold; color: var(--primary-color); text-decoration: none; }
        ul.blog-list p.minor { font-size: 0.9rem; color: #888; margin: 0.2rem 0; }
        ul.blog-list p.preview-text { margin: 0.5rem 0 0; }
        .blog-spinner { border: 4px solid #f3f3f3; border-top: 4px solid var(--primary-color); border-radius: 50%; width: 40px; height: 40px; animation: spin 1s linear infinite; margin: 2rem auto; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .tag-filter { margin-right: 0.3rem; margin-bottom: 0.3rem; }
        .author-filter { margin-right: 0.3rem; margin-bottom: 0.3rem; }
        .blog-controls { margin-top: 1rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.3rem; }
      </style>`,
    );

    function render() {
      listWrapper.innerHTML = '';
      let arr = entries.slice();
      if (currentTag) arr = arr.filter((e) => e.tags.includes(currentTag));
      if (currentAuthor) arr = arr.filter((e) => e.author === currentAuthor);
      arr.sort((a, b) => (sortDir === 'desc' ? b.date - a.date : a.date - b.date));
      if (!currentTag && !currentAuthor && sortDir === 'desc') arr = arr.slice(0, 8);

      const ul = document.createElement('ul');
      ul.className = 'blog-list';
      arr.forEach((entry) => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = entry.image || '/img/nikos.jpg';
        img.alt = '';
        img.className = 'preview-img';
        li.appendChild(img);
        const wrap = document.createElement('div');
        const link = document.createElement('a');
        link.href = entry.url;
        link.textContent = entry.title;

        const metaEl = document.createElement('p');
        metaEl.className = 'minor';
        metaEl.textContent = `${entry.author} - ${entry.date.toDateString()}`;

        const preview = document.createElement('p');
        preview.className = 'preview-text';
        preview.textContent = entry.preview;

        const tagEl = document.createElement('div');
        entry.tags.forEach((t) => {
          const tagBtn = document.createElement('button');
          tagBtn.className = 'wireframe small-button tag-filter';
          tagBtn.textContent = t;
          tagBtn.addEventListener('click', () => {
            currentTag = currentTag === t ? null : t;
            render();
          });
          tagEl.appendChild(tagBtn);
        });
        wrap.append(link, metaEl, preview, tagEl);
        li.appendChild(wrap);
        ul.appendChild(li);
      });
      listWrapper.appendChild(ul);
    }

    render();
  })();
};
