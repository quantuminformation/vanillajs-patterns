import { describe, it, expect, vi } from 'vitest';
import { loadShader } from './shaderLoader.js';

describe('loadShader', () => {
    it('should load shader text from correct URL', async () => {
        const mockText = 'shader code';
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            text: () => Promise.resolve(mockText),
        });

        const result = await loadShader('test.wgsl');
        expect(result).toBe(mockText);
        expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/wgsl/test.wgsl'));
    });

    it('should throw on bad response', async () => {
        global.fetch = vi.fn().mockResolvedValue({ ok: false });
        await expect(loadShader('fail.wgsl')).rejects.toThrow('Failed to load shader');
    });
});
