import { describe, it, expect } from 'vitest';
import canonicalUrl from './canonicalUrl.js';

describe('canonicalUrl', () => {
  it('adds index.html when missing', () => {
    const href = 'https://example.com/blog/post';
    const result = canonicalUrl(href);
    expect(result).toBe('https://example.com/blog/post/index.html');
  });

  it('preserves .html extension', () => {
    const href = 'https://example.com/blog/post.html';
    const result = canonicalUrl(href);
    expect(result).toBe('https://example.com/blog/post.html');
  });

  it('preserves existing index.html', () => {
    const href = 'https://example.com/blog/post/index.html';
    const result = canonicalUrl(href);
    expect(result).toBe('https://example.com/blog/post/index.html');
  });
});
