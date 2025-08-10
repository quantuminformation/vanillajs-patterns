export default function sanitizePath(path = '/') {
  try {
    // Convert possible full URLs to pathname only
    const url = new URL(path, 'http://dummy');
    path = url.pathname;
  } catch {
    // keep as is for non-URL strings
  }

  // Remove any query string or hash
  path = path.split('#')[0].split('?')[0];

  // Remove trailing /index.html
  path = path.replace(/\/index\.html$/, '');

  // Remove trailing slash (except for root)
  if (path.length > 1 && path.endsWith('/')) {
    path = path.slice(0, -1);
  }

  // Ensure leading slash
  if (!path.startsWith('/')) path = '/' + path;

  return path || '/';
}
