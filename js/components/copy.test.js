// js/components/copy.test.js
import { describe, it, expect, vi } from 'vitest';
import copy from './copy';

// Mocking the clipboard API
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn(),
  },
});

describe('copyComponent', () => {
  it('renders button content correctly', () => {
    // Create a mock hostComponent (button)
    const hostComponent = document.createElement('button');
    hostComponent.setAttribute('data-text-to-copy', 'someEmail@example.com');
    hostComponent.setAttribute('data-initial-text', 'Copy Email');
    hostComponent.setAttribute('data-success-text', 'Copied!');

    // Initialize the copyComponent
    copy(hostComponent);

    // Check that the button has been rendered with the correct initial text
    const copyTextElement = hostComponent.querySelector('#copy-text');
    expect(copyTextElement.textContent).toBe('Copy Email');
  });

  it('copies the correct text when clicked', async () => {
    // Create a mock hostComponent (button)
    const hostComponent = document.createElement('button');
    hostComponent.setAttribute('data-text-to-copy', 'someEmail@example.com');
    hostComponent.setAttribute('data-initial-text', 'Copy Email');
    hostComponent.setAttribute('data-success-text', 'Copied!');

    // Initialize the copy
    copy(hostComponent);

    // Simulate button click
    await hostComponent.click();

    // Check if the correct text was copied
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('someEmail@example.com');
  });

  it('changes the text and icon after clicking', async () => {
    const hostComponent = document.createElement('button');
    hostComponent.setAttribute('data-text-to-copy', 'someEmail@example.com');
    hostComponent.setAttribute('data-initial-text', 'Copy Email');
    hostComponent.setAttribute('data-success-text', 'Copied!');

    copyComponent(hostComponent);

    await hostComponent.click();

    const copyTextElement = hostComponent.querySelector('#copy-text');
    expect(copyTextElement.textContent).toBe('Copied!'); // Ensure text updates correctly
  });
});
