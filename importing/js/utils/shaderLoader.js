// File: js/utils/shaderLoader.js
import config from '../config.js';

/**
 * Fetches a WGSL shader from /wgsl/... (honoring your BASE_URL prefix).
 * @param {string} filename e.g. "square-flat.wgsl"
 * @returns {Promise<string>} the WGSL source
 */
export async function loadShader(filename) {
    // config.BASE_URL === '' (localhost) OR '/vanillajs-patterns/js'
    // we need the path up to /vanillajs-patterns, not including /js
    const prefix = config.BASE_URL.replace(/\/js$/, '');
    const url = `${prefix}/wgsl/${filename}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load shader at ${url}: ${res.status}`);
    return await res.text();
}
