import { describe, it, expect, vi } from 'vitest';
import copyComponent from './copy.js'; // Ensure correct import of copy.js

// Mocking the clipboard API to simulate copy behavior
Object.assign(navigator, {
  clipboard: {
    writeText: vi.fn().mockResolvedValue(), // Mock as a resolved promise
  },
});

describe('copyComponent', () => {
  // Test: Renders the button content correctly
  it('renders button content correctly', () => {
    const hostComponent = document.createElement('button');
    hostComponent.setAttribute('data-text-to-copy', 'someEmail@example.com');
    hostComponent.setAttribute('data-initial-text', 'Copy Email');
    hostComponent.setAttribute('data-success-text', 'Copied!');

    copyComponent(hostComponent); // Pass true to enable immediate updates for testing

    const copyTextElement = hostComponent.querySelector('#copy-text');
    expect(copyTextElement.textContent).toBe('Copy Email'); // Ensure initial text
  });

  // Test: Copies the correct text when clicked
  it('copies the correct text when clicked', async () => {
    const hostComponent = document.createElement('button');
    hostComponent.setAttribute('data-text-to-copy', 'someEmail@example.com');
    hostComponent.setAttribute('data-initial-text', 'Copy Email');
    hostComponent.setAttribute('data-success-text', 'Copied!');

    copyComponent(hostComponent); // Pass true for immediate updates

    // Simulate the button click
    await hostComponent.click();

    // Ensure that the correct text is copied
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('someEmail@example.com');
  });

  // Test: Changes the text and icon after clicking
  it('changes the text and icon after clicking', async () => {
    const hostComponent = document.createElement('button');
    hostComponent.setAttribute('data-text-to-copy', 'someEmail@example.com');
    hostComponent.setAttribute('data-initial-text', 'Copy Email');
    hostComponent.setAttribute('data-success-text', 'Copied!');

    copyComponent(hostComponent, true); // Enable immediate update

    // Simulate the button click
    await hostComponent.click();

    // Check that the button text changes to 'Copied!' immediately
    const copyTextElement = hostComponent.querySelector('#copy-text');
    expect(copyTextElement.textContent).toBe('Copied!');
  });
});
