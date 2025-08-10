import { describe, it, expect, beforeEach, vi } from 'vitest';
import themeSwitcher from './theme-switcher';

// Mocking localStorage and document.documentElement for the test environment
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => (store[key] = value),
    clear: () => (store = {}),
  };
})();

beforeEach(() => {
  vi.stubGlobal('localStorage', mockLocalStorage);
  document.documentElement.className = ''; // Reset class list on document element
});

describe('themeSwitcher', () => {
  it('renders theme buttons correctly', () => {
    const hostComponent = document.createElement('div');
    themeSwitcher(hostComponent);

    // Check that each theme button is rendered
    const buttons = hostComponent.querySelectorAll('button[data-theme]');
    expect(buttons.length).toBe(4); // green, red, blue, grey

    const themes = ['Green', 'Red', 'Blue', 'Grey'];
    themes.forEach((theme, index) => {
      expect(buttons[index].textContent).toBe(theme);
    });
  });

  it('applies the theme class to document.documentElement on button click', () => {
    const hostComponent = document.createElement('div');
    themeSwitcher(hostComponent);

    // Simulate clicking the 'red' theme button
    const redButton = hostComponent.querySelector('button[data-theme="red"]');
    redButton.click();

    expect(document.documentElement.classList.contains('red-theme')).toBe(true);

    // Ensure other themes are not active
    expect(document.documentElement.classList.contains('green-theme')).toBe(false);
    expect(document.documentElement.classList.contains('blue-theme')).toBe(false);
    expect(document.documentElement.classList.contains('grey-theme')).toBe(false);
  });

  it('stores the selected theme in localStorage on button click', () => {
    const hostComponent = document.createElement('div');
    themeSwitcher(hostComponent);

    // Click the 'blue' theme button
    const blueButton = hostComponent.querySelector('button[data-theme="blue"]');
    blueButton.click();

    expect(localStorage.getItem('theme')).toBe('blue');
  });

  it('loads and applies the saved theme from localStorage on initialization', () => {
    localStorage.setItem('theme', 'grey'); // Simulate a previously selected theme

    const hostComponent = document.createElement('div');
    themeSwitcher(hostComponent);

    // Ensure the saved theme is applied on load
    expect(document.documentElement.classList.contains('grey-theme')).toBe(true);
  });
});
