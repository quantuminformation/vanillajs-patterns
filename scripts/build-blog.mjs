import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const { POSTS } = await import(pathToFileURL(path.join(root, 'js', 'routes', 'blog', 'posts.js')));

const extractPreview = (html) => {
  const match = /<div class="preview">([\s\S]*?)<\/div>/i.exec(html);
  const text = match ? match[1].replace(/<[^>]+>/g, '').trim() : '';
  const words = text.split(/\s+/).slice(0, 30);
  return words.join(' ');
};

const extractImage = (html) => {
  const match = /<img[^>]+src=["']([^"']+)["']/i.exec(html);
  return match ? match[1] : '/img/nikos.jpg';
};

const template = ({ title, description, image, url, content }) => `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">
    <meta property="og:url" content="${url}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="${image}">
    <meta property="twitter:url" content="${url}">
    <meta name="twitter:card" content="${image ? 'summary_large_image' : 'summary'}">
    <link rel="icon" href="data:,">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/modern-normalize/2.0.0/modern-normalize.min.css">
    <link rel="stylesheet" href="/css/reset.css">
    <link rel="stylesheet" href="/css/utility.css">
    <link rel="stylesheet" href="/css/common.css">
    <link rel="stylesheet" href="/css/form.css">
    <link rel="stylesheet" href="/css/button-badge.css">
    <link rel="stylesheet" href="/css/typography.css">
    <link rel="stylesheet" href="/css/light.css" media="(prefers-color-scheme: light)">
    <link rel="stylesheet" href="/css/dark.css" media="(prefers-color-scheme: dark)">
    <script src="/js/store.js" defer type="module"></script>
    <script src="/js/componentLoader.js" defer type="module"></script>
  </head>
  <body class="flex flex-col">
    <div class="site-container flex flex-col" style="flex: 1">
      <nav data-component="nav" data-header-bar="true" data-burger-px="400"></nav>
      <main data-component="router" style="padding: 1rem; width: 100%; flex: 1">
        ${content}
      </main>
      <div class="flex justify-center">
        <a href="https://github.com/quantuminformation/vanillajs-patterns" target="_blank">
          Fork me on GitHub
        </a>
      </div>
    </div>
    <footer>
      <span>Copyright Nikos Katsikanis LTD</span>
      <div data-component="theme-switcher"></div>
    </footer>
  </body>
</html>`;

for (const post of POSTS) {
  const rel = post.url.replace(/^\//, '');
  const mod = await import(pathToFileURL(path.join(root, 'js', 'routes', `${rel}.js`)));
  const content = mod.content || '';
  const description = extractPreview(content);
  const image = extractImage(content);
  const html = template({ title: post.title, description, image, url: post.url, content });
  const outDir = path.join(root, rel);
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, 'index.html'), html);
}

const blogIndexHtml = template({
  title: 'Blog',
  description: 'Latest posts',
  image: '',
  url: '/blog',
  content: '<div data-component="blog-list"></div>',
});
await fs.writeFile(path.join(root, 'blog', 'index.html'), blogIndexHtml);
