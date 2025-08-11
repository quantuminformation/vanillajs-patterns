// File: js/config.js

export function getBaseUrl() {
  // Only prefix with /vanillajs-patterns when hosted on GitHub Pages
  if (window.location.hostname === 'quantuminformation.github.io') {
    return '/vanillajs-patterns/js';
  }
  return '/js';
}

const config = {
  API_KEY_GOOGLE_MAPS: 'AIzaSyCIS-VZfUUfWRqQWJfIiP8-SW2-EGiVYKs',
  get BASE_URL() {
    return getBaseUrl();
  },
};

export default config;
// set here https://console.cloud.google.com/apis/credentials/key/
