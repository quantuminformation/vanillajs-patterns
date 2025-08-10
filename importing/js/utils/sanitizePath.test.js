import { describe, it, expect } from 'vitest';
import sanitizePath from './sanitizePath.js';

describe('sanitizePath', () => {
  it('removes index.html and trailing slashes', () => {
    const input = '/blog/3-how-this-blog-works/index.html';
    expect(sanitizePath(input)).toBe('/blog/3-how-this-blog-works');
  });

  it('handles paths with trailing slash', () => {
    expect(sanitizePath('/blog/3-how-this-blog-works/')).toBe('/blog/3-how-this-blog-works');
  });

  it('returns root for /index.html', () => {
    expect(sanitizePath('/index.html')).toBe('/');
  });

  it('strips query and hash', () => {
    expect(sanitizePath('/blog/3-how-this-blog-works/index.html?foo=1#bar')).toBe(
      '/blog/3-how-this-blog-works',
    );
  });
});
