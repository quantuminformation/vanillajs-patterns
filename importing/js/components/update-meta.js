export default function updateMeta({ title, description, image, url, author }) {
  const abs = (value) => {
    try {
      return value ? new URL(value, location.origin).href : '';
    } catch {
      return value;
    }
  };

  const set = (property, content) => {
    if (!content) return;
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  const setName = (name, content) => {
    if (!content) return;
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };
  set('og:title', title);
  set('og:description', description);
  set('og:image', abs(image));
  set('og:url', abs(url));
  set('twitter:title', title);
  set('twitter:description', description);
  set('twitter:image', abs(image));
  set('twitter:url', abs(url));
  set('twitter:card', image ? 'summary_large_image' : 'summary');
  setName('author', author);
}
