export default function canonicalUrl(href = location.href) {
  try {
    const url = new URL(href, location.origin);
    if (!url.pathname.endsWith('.html')) {
      if (!url.pathname.endsWith('/')) {
        url.pathname += '/';
      }
      url.pathname += 'index.html';
    }
    return url.toString();
  } catch {
    return href;
  }
}
