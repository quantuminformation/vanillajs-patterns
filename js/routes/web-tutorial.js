// File: js/routes/web-tutorial.js
// Draws a 25% square that can be toggled between filled and wireframe modes.
// The site’s header and footer remain visible (pure flex layout, no manual pixel math).

import { loadShader } from '../utils/shaderLoader.js';

export default async function WebGPUFlatSquare(host) {
  /* ───────────── 1 · LAYOUT (pure flex, no calculations) ───────────── */
  host.replaceChildren(); // Remove any existing children in the host container
  host.style.cssText =
      'flex:1 0 auto; position:relative; overflow:hidden; background:#000; margin:0; padding:0;';
  // “host” now grows to fill the space between header & footer, and can contain absolutely‐positioned content.

  // ─── Insert a “Wireframe” checkbox at the top‐left corner of the host ───
  const uiContainer = document.createElement('div');
  uiContainer.style.cssText =
      'position:absolute; top:10px; left:10px; z-index:10; color:white; font-family:sans-serif;';
  uiContainer.innerHTML = `
    <label style="font-size:1rem; user-select:none;">
      <input type="checkbox" id="wireframeToggle" style="transform:scale(1.2); margin-right:4px;" />
      Wireframe
    </label>
  `;
  host.appendChild(uiContainer);

  const wireCheckbox = uiContainer.querySelector('#wireframeToggle');

  /* ───────────── 2 · CANVAS CREATION & WEBGPU INIT ───────────── */
  const canvas = Object.assign(document.createElement('canvas'), {
    style: 'position:absolute; width:100%; height:100%; cursor:default;',
  });
  host.appendChild(canvas);

  if (!navigator.gpu) {
    return alert('WebGPU not supported');
  }
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) {
    return alert('No GPU adapter available');
  }
  const device = await adapter.requestDevice();
  const ctx = canvas.getContext('webgpu');
  const format = navigator.gpu.getPreferredCanvasFormat();

  const resize = () => {
    const dpr = devicePixelRatio;
    canvas.width = host.clientWidth * dpr;
    canvas.height = host.clientHeight * dpr;
    ctx.configure({
      device,
      format,
      alphaMode: 'premultiplied',
      size: [canvas.width, canvas.height],
    });
  };
  resize();
  window.addEventListener('resize', resize);

  /* ───────────── 3 · SHADER & GEOMETRY SETUP ───────────── */
  // Load WGSL source from /wgsl/square-flat.wgsl
  const wgsl = await loadShader('square-flat.wgsl');
  const module = device.createShaderModule({ code: wgsl });

  // In NDC, ±0.5 covers 50% of the viewport in both X and Y.
  const s = 0.5;

  // Vertex layout: [x, y, z,    r, g, b]
  const vertices = new Float32Array([
    -s, -s, 0,   0, 0, 1, // bottom-left  (blue)
    s, -s, 0,   0, 1, 0, // bottom-right (green)
    s,  s, 0,   1, 0, 0, // top-right    (red)
    -s,  s, 0,   1, 1, 1, // top-left     (white)
  ]);

  // Filled‐mode indices (two triangles: 0→1→2 and 0→2→3)
  const triIndices = new Uint16Array([
    0, 1, 2,
    0, 2, 3,
  ]);

  // Wireframe indices: draw all four outer edges + the diagonal (0→2)
  const lineIndices = new Uint16Array([
    0, 1, // bottom edge
    1, 2, // right edge
    2, 3, // top edge
    3, 0, // left edge
    0, 2, // diagonal (connect bottom-left ↔ top-right)
  ]);

  // Create and upload the shared vertex buffer
  const vb = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vb, 0, vertices);

  // Create and upload the triangle‐list index buffer
  const ibTriangles = device.createBuffer({
    size: triIndices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(ibTriangles, 0, triIndices);

  // Create and upload the line‐list index buffer
  const ibLines = device.createBuffer({
    size: lineIndices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(ibLines, 0, lineIndices);

  /* ───────────── 4 · PIPELINE CREATION ───────────── */
  // Pipeline for filled triangles
  const pipelineFilled = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module,
      entryPoint: 'vs_main',
      buffers: [
        {
          arrayStride: 24, // 6 floats per vertex (3 position + 3 color) = 24 bytes
          attributes: [
            { shaderLocation: 0, offset: 0,  format: 'float32x3' }, // position
            { shaderLocation: 1, offset: 12, format: 'float32x3' }, // color
          ],
        },
      ],
    },
    fragment: {
      module,
      entryPoint: 'fs_main',
      targets: [{ format }],
    },
    primitive: {
      topology: 'triangle-list',
      cullMode: 'none',
    },
  });

  // Pipeline for wireframe (line-list)
  const pipelineWire = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module,
      entryPoint: 'vs_main',
      buffers: [
        {
          arrayStride: 24,
          attributes: [
            { shaderLocation: 0, offset: 0,  format: 'float32x3' },
            { shaderLocation: 1, offset: 12, format: 'float32x3' },
          ],
        },
      ],
    },
    fragment: {
      module,
      entryPoint: 'fs_main',
      targets: [{ format }],
    },
    primitive: {
      topology: 'line-list',
      cullMode: 'none',
    },
  });

  /* ───────────── 5 · RENDER LOOP ───────────── */
  function frame() {
    const encoder = device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
      colorAttachments: [{
        view: ctx.getCurrentTexture().createView(),
        loadOp: 'clear',
        clearValue: { r: 0, g: 0, b: 0, a: 1 },
        storeOp: 'store',
      }],
    });

    if (wireCheckbox.checked) {
      // Wireframe pipeline: bind line index buffer
      pass.setPipeline(pipelineWire);
      pass.setVertexBuffer(0, vb);
      pass.setIndexBuffer(ibLines, 'uint16');
      // Draw 5 line segments → 10 indices total
      pass.drawIndexed(lineIndices.length, 1, 0, 0, 0);
    } else {
      // Filled pipeline: bind triangle index buffer
      pass.setPipeline(pipelineFilled);
      pass.setVertexBuffer(0, vb);
      pass.setIndexBuffer(ibTriangles, 'uint16');
      // Draw 2 triangles → 6 indices total
      pass.drawIndexed(triIndices.length, 1, 0, 0, 0);
    }

    pass.end();
    device.queue.submit([encoder.finish()]);
    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}
