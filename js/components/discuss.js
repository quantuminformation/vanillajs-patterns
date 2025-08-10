export default (hostComponent) => {
  hostComponent.innerHTML = '';
  const commentsContainer = document.createElement('div');
  commentsContainer.id = 'comments';

  const script = document.createElement('script');
  script.src = 'https://utteranc.es/client.js';
  script.setAttribute('repo', 'quantuminformation/nikoskatsikanis-blog-comments');
  script.setAttribute('issue-term', 'pathname');
  script.setAttribute('theme', 'github-light');
  script.crossOrigin = 'anonymous';
  script.async = true;

  hostComponent.appendChild(commentsContainer);
  hostComponent.appendChild(script);
};
