import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock setup - must be before any imports
vi.mock('../componentLoader', () => ({
  importComponents: vi.fn(),
  runComponents: vi.fn(),
}));

// Now import the mocked functions and 'router.js'
import { importComponents, runComponents } from '../componentLoader';
import router from './router';

// Mock route modules using exact paths
vi.mock('/routes/index.js', () => ({
  default: vi.fn((el) => {
    el.innerHTML = 'Home Route Loaded';
  }),
}));

vi.mock('/routes/form.js', () => ({
  default: vi.fn((el) => {
    el.innerHTML = 'Form Route Loaded';
  }),
}));

beforeEach(() => {
  vi.useFakeTimers(); // Use fake timers for asynchronous control
  vi.clearAllMocks();
  document.body.innerHTML = '';
});

afterEach(() => {
  vi.useRealTimers(); // Restore real timers after tests
});

describe('router', () => {
  it('should load the home route on initial load', async () => {
    document.body.innerHTML = `<div id="app"></div>`;
    const hostComponent = document.getElementById('app');

    await router(hostComponent, '');

    expect(importComponents).toHaveBeenCalled();
    expect(runComponents).toHaveBeenCalled();
    expect(document.body.innerHTML).toContain('Home Route Loaded');
  });

/*
  it('should handle navigation to a route with click event', async () => {
    document.body.innerHTML = `
      <div id="app"></div>
      <a href="/form">Go to Form</a>
    `;
    const hostComponent = document.getElementById('app');

    await router(hostComponent, '');

    const pushStateSpy = vi.spyOn(history, 'pushState');

    const link = document.querySelector('a[href="/form"]');
    link.click();

    // Wait for the event handler and route loading to complete
    await vi.runAllTimersAsync();

    expect(pushStateSpy).toHaveBeenCalledWith(null, null, '/form');
    expect(document.body.innerHTML).toContain('Form Route Loaded');
  });
*/

  it('should ignore links with file extensions', async () => {
    document.body.innerHTML = `
      <div id="app"></div>
      <a href="/example.pdf">Download PDF</a>
    `;
    const hostComponent = document.getElementById('app');

    await router(hostComponent, '');

    const pushStateSpy = vi.spyOn(history, 'pushState');

    const link = document.querySelector('a[href="/example.pdf"]');
    link.click();

    // Wait for any potential asynchronous operations
    await vi.runAllTimersAsync();

    expect(pushStateSpy).not.toHaveBeenCalled();
    expect(document.body.innerHTML).not.toContain('PDF Route Loaded');
  });

/*  it('should handle back/forward navigation using popstate', async () => {
    document.body.innerHTML = `<div id="app"></div>`;
    const hostComponent = document.getElementById('app');

    await router(hostComponent, '');

    // Simulate navigating to a new route
    history.pushState(null, null, '/form');
    window.dispatchEvent(new PopStateEvent('popstate'));

    // Wait for the popstate event to be processed
    await vi.runAllTimersAsync();

    expect(document.body.innerHTML).toContain('Form Route Loaded');
  })*/;
});
