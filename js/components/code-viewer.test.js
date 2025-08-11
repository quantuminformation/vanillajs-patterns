import { describe, it, expect, beforeEach, vi } from 'vitest';
import codeViewer from './code-viewer.js';

beforeEach(() => {
  // Mock hljs to avoid loading external scripts during tests
  vi.stubGlobal('hljs', {
    highlightElement: vi.fn(),
  });
});

describe('code-viewer component', () => {
  it('renders selector and shows only first snippet', () => {
    const host = document.createElement('div');
    host.innerHTML = `
      <pre data-lang="js"><code>console.log('hi')</code></pre>
      <pre data-lang="python"><code>print('hi')</code></pre>
    `;
    codeViewer(host);
    const select = host.querySelector('select');
    expect(select).toBeTruthy();
    const pres = host.querySelectorAll('pre[data-lang]');
    expect(pres[0].style.display).toBe('');
    expect(pres[1].style.display).toBe('none');
  });

  it('switches visible snippet on selector change', () => {
    const host = document.createElement('div');
    host.innerHTML = `
      <pre data-lang="js"><code>console.log('hi')</code></pre>
      <pre data-lang="python"><code>print('hi')</code></pre>
    `;
    codeViewer(host);
    const select = host.querySelector('select');
    select.value = 'python';
    select.dispatchEvent(new Event('change'));
    const jsPre = host.querySelector('pre[data-lang="js"]');
    const pyPre = host.querySelector('pre[data-lang="python"]');
    expect(jsPre.style.display).toBe('none');
    expect(pyPre.style.display).toBe('');
  });
});

