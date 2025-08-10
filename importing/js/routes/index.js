// Stored in /routes/index.js
import { youtubeIcon, twitterIcon, twitchIcon, podcastIcon, etoroIcon, githubIcon, linkedinIcon } from '../assets/socialIconData.js';
import avatarDataUri from '../assets/avatarDataUri.js';

export default (hostComponent) => {
  hostComponent.innerHTML = '';
  const indexHTML = `
    <style>
      .hero { min-height: 40vh; display: flex; align-items: center; justify-content: center; gap: 2rem; }
      .hero img { width: 200px; height: 200px; border-radius: 50%; }
      .info { display: flex; flex-direction: column; gap: 1rem; }
      .social-links { display: flex; gap: 0.5rem; list-style: none; padding: 0; margin: 0; }
      .social-links a { color: inherit; }
      .social-links svg { width: 24px; height: 24px; fill: currentColor; }
    </style>
    <section class="hero">
    <img src="img/nikos.jpg" alt="Nikos headshot" />

      <div class="info">
        <h1>Hello, I'm Nikos</h1>
        <p>I am using AI with my 17 years of full stack exp using the likes of AWS, Rails and Remix etc to build you apps 20x faster.</p>
        <ul class="social-links">
          <li><a href="https://www.youtube.com/@nikoskatsikanis" target="_blank" rel="noopener">${youtubeIcon}</a></li>
          <li><a href="https://twitter.com/nikoskatsikanis" target="_blank" rel="noopener">${twitterIcon}</a></li>
          <li><a href="https://www.twitch.tv/nikoskatsikanis" target="_blank" rel="noopener">${twitchIcon}</a></li>
          <li><a href="https://github.com/quantuminformation" target="_blank" rel="noopener">${githubIcon}</a></li>
          <li><a href="https://www.linkedin.com/in/nikos-katsikanis-39374724b/" target="_blank" rel="noopener">${linkedinIcon}</a></li>
        </ul>
      </div>
    </section>
    <div data-component="blog-list"></div>
  `;
  hostComponent.innerHTML = indexHTML;
};
