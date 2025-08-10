import { describe, it, expect, vi, beforeEach } from 'vitest';
import { importComponents, runComponents, clearComponentRegistry } from './componentLoader';

// Mock components for testing
vi.mock('./components/user-form.js', () => ({
  default: vi.fn((el) => {
    el.innerHTML = 'User Form Loaded';
  }),
}));

vi.mock('./components/number-changer.js', () => ({
  default: vi.fn((el) => {
    el.innerHTML = 'Number Changer Loaded';
  }),
}));

/**
 * todo write test
 */
vi.mock('./components/broken-component.js', () => ({
  default: undefined, // no default export function
}));

// Clear component registry before each test
beforeEach(() => {
  clearComponentRegistry();
  document.body.innerHTML = ''; // Reset the DOM
});

describe('componentLoader', () => {
  it('should import and run a single component', async () => {
    document.body.innerHTML = `<div data-component="user-form"></div>`;
    const components = document.querySelectorAll('[data-component]');

    const importedComponents = await importComponents(components);
    await runComponents(components);

    expect(importedComponents.has('user-form')).toBe(true);
    expect(document.body.innerHTML).toContain('User Form Loaded');
  });

  it('should import and run multiple components', async () => {
    document.body.innerHTML = `
      <div data-component="user-form"></div>
      <div data-component="number-changer"></div>
    `;

    const components = document.querySelectorAll('[data-component]');

    const importedComponents = await importComponents(components);
    await runComponents(components);

    expect(importedComponents.has('user-form')).toBe(true);
    expect(importedComponents.has('number-changer')).toBe(true);
    expect(document.body.innerHTML).toContain('User Form Loaded');
    expect(document.body.innerHTML).toContain('Number Changer Loaded');
  });
});
