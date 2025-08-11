// File: js/components/code-viewer.js
// Component for displaying code snippets in multiple languages with a selector

export default (hostComponent) => {
  const pres = Array.from(hostComponent.querySelectorAll('pre[data-lang]'));
  if (pres.length === 0) return;

  const selector = document.createElement('select');
  pres.forEach((pre, index) => {
    const { lang } = pre.dataset;
    const code = pre.querySelector('code');
    if (code) {
      code.classList.add(`language-${lang}`);
    }
    const option = document.createElement('option');
    option.value = lang;
    option.textContent = lang;
    selector.appendChild(option);
    pre.style.display = index === 0 ? '' : 'none';
  });

  selector.addEventListener('change', (event) => {
    const lang = event.target.value;
    pres.forEach((pre) => {
      pre.style.display = pre.dataset.lang === lang ? '' : 'none';
    });
  });

  hostComponent.insertBefore(selector, hostComponent.firstChild);

  const ensureHighlight = () =>
    new Promise((resolve) => {
      if (window.hljs) {
        resolve();
        return;
      }
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/default.min.css';
      document.head.appendChild(link);
      const script = document.createElement('script');
      script.src =
        'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
      script.onload = resolve;
      document.head.appendChild(script);
    });

  ensureHighlight().then(() => {
    pres.forEach((pre) => {
      const code = pre.querySelector('code');
      if (code && window.hljs?.highlightElement) {
        window.hljs.highlightElement(code);
      }
    });
  });
};

