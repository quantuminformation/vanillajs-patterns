// File: test/config.test.js
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

describe('config.js', () => {
  const originalLocation = window.location;

  beforeEach(() => {
    // @ts-ignore override
    delete window.location;
  });

  afterEach(() => {
    // @ts-ignore restore
    window.location = originalLocation;
  });

  it('should return empty prefix for localhost', async () => {
    // @ts-ignore
    window.location = { hostname: 'localhost' };
    const config = (await import('../js/config.js')).default;
    expect(config.BASE_URL).toBe('/js');
  });

  it('should return /vanillajs-patterns prefix for non-localhost', async () => {
    // @ts-ignore
    window.location = { hostname: 'example.com' };
    const config = (await import('../js/config.js')).default;
    expect(config.BASE_URL).toBe('/vanillajs-patterns/js');
  });
});
