//stored in /env.js
const BASE_URL = window.location.hostname === 'localhost' ? '' : '/vanillajs-patterns';

const config = {
  API_KEY_GOOGLE_MAPS: 'AIzaSyCIS-VZfUUfWRqQWJfIiP8-SW2-EGiVYKs', // non-sensitive client api key restricted to url
  BASE_URL: BASE_URL,
};

export default config;

// set here https://console.cloud.google.com/apis/credentials/key/
