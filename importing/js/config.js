// File: js/config.js

export function getBaseUrl() {
  return window.location.hostname === 'localhost'
    ? '/js'
    : '/js';
}

const config = {
  API_KEY_GOOGLE_MAPS: 'AIzaSyCIS-VZfUUfWRqQWJfIiP8-SW2-EGiVYKs',
  get BASE_URL() {
    return getBaseUrl();
  },
};

export default config;
// set here https://console.cloud.google.com/apis/credentials/key/
