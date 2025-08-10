import { twitterIcon, linkedinIcon, facebookIcon, redditIcon } from '../assets/socialIconData.js';
import canonicalUrl from '../utils/canonicalUrl.js';

export default function shareButtons(title) {
  const url = encodeURIComponent(canonicalUrl());
  const text = encodeURIComponent(title);
  const container = document.createElement('div');
  container.className = 'share-buttons';

  const links = [
    {
      href: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      icon: twitterIcon,
      label: 'Twitter',
    },
    {
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${text}&summary=${text}&source=nikoskatsikanis.com`,
      icon: linkedinIcon,
      label: 'LinkedIn',
    },
    {
      href: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      icon: facebookIcon,
      label: 'Facebook',
    },
    {
      href: `https://www.reddit.com/submit?url=${url}&title=${text}`,
      icon: redditIcon,
      label: 'Reddit',
    },
  ];

  links.forEach(({ href, icon, label }) => {
    const a = document.createElement('a');
    a.href = href;
    a.target = '_blank';
    a.rel = 'noopener';
    a.title = `Share on ${label}`;
    a.innerHTML = icon;
    container.appendChild(a);
  });

  return container;
}
